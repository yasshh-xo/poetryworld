import { NextRequest, NextResponse } from 'next/server'
import { rewritePoem } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { poem, targetStyle } = body

    if (!poem || !targetStyle) {
      return NextResponse.json(
        { success: false, error: 'Poem and target style are required' },
        { status: 400 }
      )
    }

    const rewritten = await rewritePoem(poem, targetStyle)

    return NextResponse.json({
      success: true,
      rewritten,
    })
  } catch (error) {
    console.error('Error rewriting poem:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to rewrite poem' },
      { status: 500 }
    )
  }
}
