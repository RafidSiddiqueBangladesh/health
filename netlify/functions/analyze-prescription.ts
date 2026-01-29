import { Handler } from '@netlify/functions';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler: Handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const { imageUrl, existingMedicines } = JSON.parse(event.body);
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;

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
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
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

Format your response clearly with sections. Be accurate but note this is informational only - always consult a doctor.${existingMedsContext}`,
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Please analyze this prescription image and extract all medicine information.' },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);

      if (response.status === 429) {
        return {
          statusCode: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        };
      }
      if (response.status === 402) {
        return {
          statusCode: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Service temporarily unavailable.' }),
        };
      }
      throw new Error('Failed to analyze prescription');
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    console.log('Prescription analysis complete');

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis }),
    };
  } catch (error) {
    console.error('Error in analyze-prescription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };
