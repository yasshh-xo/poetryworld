import { NextRequest, NextResponse } from 'next/server'
import { comparePoems } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { poem1, poem2 } = body

    if (!poem1 || !poem2) {
      return NextResponse.json(
        { success: false, error: 'Both poems are required' },
        { status: 400 }
      )
    }

    const comparison = await comparePoems(poem1, poem2)

    return NextResponse.json({
      success: true,
      comparison,
    })
  } catch (error) {
    console.error('Error comparing poems:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to compare poems' },
      { status: 500 }
    )
  }
}
