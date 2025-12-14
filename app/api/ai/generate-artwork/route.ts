import { NextRequest, NextResponse } from 'next/server'
import { generateArtworkPrompt, openai } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { poem } = body

    if (!poem) {
      return NextResponse.json(
        { success: false, error: 'Poem is required' },
        { status: 400 }
      )
    }

    // Generate image prompt from poem
    const imagePrompt = await generateArtworkPrompt(poem)

    // Generate image using DALL-E
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt || '',
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    })

    const imageUrl = response.data[0].url

    return NextResponse.json({
      success: true,
      imageUrl,
    })
  } catch (error) {
    console.error('Error generating artwork:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate artwork' },
      { status: 500 }
    )
  }
}
