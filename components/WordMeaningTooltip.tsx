'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WordMeaningTooltipProps {
  text: string
}

export default function WordMeaningTooltip({ text }: WordMeaningTooltipProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [wordData, setWordData] = useState<any>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleWordClick = async (word: string, event: React.MouseEvent) => {
    const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase()
    if (cleanWord.length < 3) return

    setSelectedWord(cleanWord)
    setPosition({ x: event.clientX, y: event.clientY })

    try {
      const response = await fetch(`/api/dictionary/${cleanWord}`)
      const data = await response.json()
      if (data.success) {
        setWordData(data.data)
      }
    } catch (error) {
      console.error('Error fetching word meaning:', error)
    }
  }

  const words = text.split(/(\s+)/)

  return (
    <div className="relative">
      <div className="font-serif text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
        {words.map((word, index) => {
          if (word.trim().length === 0) return word
          return (
            <span
              key={index}
              onClick={(e) => handleWordClick(word, e)}
              className="cursor-pointer hover:text-purple-600 hover:underline transition-colors"
            >
              {word}
            </span>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedWord && wordData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: 'fixed',
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -100%)',
              marginTop: '-10px',
            }}
            className="bg-white rounded-lg shadow-2xl p-4 max-w-sm z-50 border-2 border-purple-200"
            onClick={() => setSelectedWord(null)}
          >
            <h4 className="font-bold text-purple-600 text-lg mb-2 capitalize">
              {selectedWord}
            </h4>
            
            {wordData.meaning && (
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700">Meaning:</p>
                <p className="text-sm text-gray-600">{wordData.meaning}</p>
              </div>
            )}

            {wordData.synonyms && wordData.synonyms.length > 0 && (
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700">Synonyms:</p>
                <p className="text-sm text-gray-600">{wordData.synonyms.join(', ')}</p>
              </div>
            )}

            {wordData.example && (
              <div>
                <p className="text-sm font-medium text-gray-700">Example:</p>
                <p className="text-sm text-gray-600 italic">{wordData.example}</p>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-2">Click anywhere to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
