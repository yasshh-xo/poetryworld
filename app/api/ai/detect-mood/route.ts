import { NextRequest, NextResponse } from 'next/server'
import { detectMood } from '@/lib/openai'

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

    const mood = await detectMood(poem)

    return NextResponse.json({
      success: true,
      mood,
    })
  } catch (error) {
    console.error('Error detecting mood:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to detect mood' },
      { status: 500 }
    )
  }
}
