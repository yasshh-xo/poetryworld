import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePoem(params: {
  topic: string
  mood: string
  style: string
  form: string
}) {
  const prompt = `Write a ${params.form} ${params.style} poem about ${params.topic} with a ${params.mood} mood. 
  Make it beautiful, emotional, and meaningful. Use vivid imagery and poetic devices.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a master poet who creates beautiful, emotional, and meaningful poetry.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.9,
    max_tokens: 500,
  })

  return completion.choices[0].message.content
}

export async function comparePoems(poem1: string, poem2: string) {
  const prompt = `Compare these two poems and provide:
  1. Style differences
  2. Theme differences
  3. Literary techniques used
  4. A similarity percentage (0-100)
  5. Overall comparative analysis
  
  Poem 1:
  ${poem1}
  
  Poem 2:
  ${poem2}
  
  Provide the response in JSON format with keys: style, theme, techniques, similarity, summary`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a literary analyst expert in comparing and analyzing poetry.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 800,
  })

  return JSON.parse(completion.choices[0].message.content || '{}')
}

export async function interpretTheme(poem: string) {
  const prompt = `Analyze this poem and provide:
  1. Main theme
  2. Poet's perspective
  3. Symbolism and hidden meanings
  4. Emotional expression
  5. Key lines analysis
  6. Simple explanation for students
  
  Poem:
  ${poem}
  
  Provide the response in JSON format with keys: mainTheme, perspective, symbolism, emotion, keyLines, simpleExplanation`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a poetry interpretation expert who explains poems in depth.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  })

  return JSON.parse(completion.choices[0].message.content || '{}')
}

export async function rewritePoem(poem: string, targetStyle: string) {
  const prompt = `Rewrite this poem in ${targetStyle} style while maintaining its core message and emotion:
  
  ${poem}
  
  Make it authentic to the ${targetStyle} style with appropriate language, structure, and tone.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a versatile poet who can write in any style.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  })

  return completion.choices[0].message.content
}

export async function detectMood(poem: string) {
  const prompt = `Analyze the mood and emotions in this poem:
  
  ${poem}
  
  Provide:
  1. Primary mood
  2. Emotional breakdown with percentages (array of {name, percentage})
  3. Detailed analysis
  4. Overall tone
  
  Provide the response in JSON format with keys: primary, emotions, analysis, tone`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an emotion and mood analysis expert for poetry.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 600,
  })

  return JSON.parse(completion.choices[0].message.content || '{}')
}

export async function generateArtworkPrompt(poem: string) {
  const prompt = `Based on this poem, create a detailed image generation prompt that captures its essence, mood, theme, and imagery:
  
  ${poem}
  
  The prompt should be vivid, artistic, and suitable for AI image generation.`

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert at creating image generation prompts from poetry.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 200,
  })

  return completion.choices[0].message.content
}

export { openai }
