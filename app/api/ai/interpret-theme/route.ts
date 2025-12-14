import { NextRequest, NextResponse } from 'next/server'
import { interpretTheme } from '@/lib/openai'

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

    const interpretation = await interpretTheme(poem)

    return NextResponse.json({
      success: true,
      interpretation,
    })
  } catch (error) {
    console.error('Error interpreting theme:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to interpret theme' },
      { status: 500 }
    )
  }
}
