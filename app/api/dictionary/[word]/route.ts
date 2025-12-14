import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { word: string } }
) {
  try {
    const word = params.word

    // Using Free Dictionary API
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Word not found' },
        { status: 404 }
      )
    }

    const data = await response.json()
    const firstEntry = data[0]
    const firstMeaning = firstEntry.meanings[0]

    const wordData = {
      word: firstEntry.word,
      meaning: firstMeaning.definitions[0].definition,
      synonyms: firstMeaning.synonyms || [],
      example: firstMeaning.definitions[0].example || '',
      partOfSpeech: firstMeaning.partOfSpeech,
    }

    return NextResponse.json({
      success: true,
      data: wordData,
    })
  } catch (error) {
    console.error('Error fetching word meaning:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch word meaning' },
      { status: 500 }
    )
  }
}
