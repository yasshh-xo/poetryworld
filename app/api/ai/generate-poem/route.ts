import { NextRequest, NextResponse } from 'next/server'
import { generatePoem } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, mood, style, form } = body

    if (!topic) {
      return NextResponse.json(
        { success: false, error: 'Topic is required' },
        { status: 400 }
      )
    }

    const poem = await generatePoem({ topic, mood, style, form })

    return NextResponse.json({
      success: true,
      poem,
    })
  } catch (error) {
    console.error('Error generating poem:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate poem' },
      { status: 500 }
    )
  }
}
