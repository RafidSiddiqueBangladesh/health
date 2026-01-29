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

    const { image, testType } = JSON.parse(event.body);

    if (!image) {
      throw new Error('No image data provided');
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`Processing ${testType} eye test analysis`);

    // Create appropriate prompt based on test type
    let systemPrompt = '';
    let userPrompt = '';

    switch (testType) {
      case 'distance':
        systemPrompt = 'You are an expert optometrist analyzing vision test results.';
        userPrompt = `Analyze this eye chart image captured during a vision test. The user is viewing this from a standard distance (around 3-6 feet). 

Please provide:
1. Estimated visual acuity (e.g., 20/20, 20/40, etc.)
2. Which line the person can likely read clearly
3. Estimated refractive error in diopters (e.g., -2.00D for myopia, +1.50D for hyperopia)
4. Recommendations (glasses needed, eye exam suggested, etc.)
5. Confidence level in your assessment (low/medium/high)

Be specific but also note this is a preliminary assessment and recommend professional examination.`;
        break;

      case 'near':
        systemPrompt = 'You are an expert optometrist analyzing near vision and reading ability.';
        userPrompt = `Analyze this near vision test image (reading card or text) captured at typical reading distance (14-16 inches).

Please provide:
1. Near vision acuity assessment
2. Reading capability evaluation
3. Estimated presbyopia degree if applicable
4. Recommendations for reading glasses if needed
5. Confidence level in assessment

Note this is preliminary and recommend professional eye examination.`;
        break;

      case 'astigmatism':
        systemPrompt = 'You are an expert optometrist analyzing astigmatism tests.';
        userPrompt = `Analyze this astigmatism test chart (sunburst/clock dial pattern). The user should see lines of varying darkness if astigmatism is present.

Please provide:
1. Astigmatism detection (present/absent)
2. Estimated axis and degree if present
3. Severity assessment (mild/moderate/severe)
4. Impact on vision quality
5. Recommendations
6. Confidence level

Note limitations of self-testing and recommend professional examination.`;
        break;

      default:
        userPrompt = `Analyze this eye test image and provide a general vision assessment with recommendations.`;
    }

    // Call OpenAI Vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: userPrompt },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                  detail: 'high',
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    console.log('Analysis completed successfully');

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis }),
    };
  } catch (error) {
    console.error('Error in analyze-eye-test function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: errorMessage }),
    };
  }
};

export { handler };
