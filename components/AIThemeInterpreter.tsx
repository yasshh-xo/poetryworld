'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Brain, Loader2 } from 'lucide-react'

interface AIThemeInterpreterProps {
  poem: any
}

export default function AIThemeInterpreter({ poem }: AIThemeInterpreterProps) {
  const [loading, setLoading] = useState(true)
  const [interpretation, setInterpretation] = useState<any>(null)

  useEffect(() => {
    fetchInterpretation()
  }, [poem.id])

  const fetchInterpretation = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/interpret-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem: poem.content }),
      })

      const data = await response.json()
      if (data.success) {
        setInterpretation(data.interpretation)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!interpretation) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Unable to generate interpretation</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-2xl font-serif font-bold text-gray-800 flex items-center space-x-2">
        <Brain className="w-6 h-6 text-purple-600" />
        <span>AI Interpretation</span>
      </h3>

      <div className="space-y-3">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
          <h4 className="font-bold text-purple-600 mb-2">Main Theme</h4>
          <p className="text-gray-700">{interpretation.mainTheme}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-600 mb-2">Symbolism</h4>
          <p className="text-gray-700">{interpretation.symbolism}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4">
          <h4 className="font-bold text-green-600 mb-2">Emotional Expression</h4>
          <p className="text-gray-700">{interpretation.emotion}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4">
          <h4 className="font-bold text-orange-600 mb-2">Simple Explanation</h4>
          <p className="text-gray-700">{interpretation.simpleExplanation}</p>
        </div>
      </div>
    </motion.div>
  )
}
