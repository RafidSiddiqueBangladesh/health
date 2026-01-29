import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, existingMedicines } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing prescription image...');

    const existingMedsContext = existingMedicines?.length 
      ? `\n\nUser's existing medicines: ${existingMedicines.join(', ')}. Check for duplicates or interactions.`
      : '';

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a medical prescription reader assistant. Analyze handwritten prescriptions and provide:
1. **Extracted Text**: Convert handwritten prescription to readable text
2. **Medicines List**: List each medicine with:
   - Name
   - Dosage
   - Timing (morning/afternoon/night, before/after meals)
   - Duration
3. **Purpose**: Brief explanation of what each medicine is for
4. **Warnings**: Any important warnings or side effects
5. **Duplicate Check**: If existing medicines provided, warn about duplicates or potential interactions

Format your response clearly with sections. Be accurate but note this is informational only - always consult a doctor.${existingMedsContext}`
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Please analyze this prescription image and extract all medicine information.' },
              { type: 'image_url', image_url: { url: imageUrl } }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Service temporarily unavailable.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error('Failed to analyze prescription');
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    console.log('Prescription analysis complete');

    return new Response(JSON.stringify({ analysis }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-prescription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
