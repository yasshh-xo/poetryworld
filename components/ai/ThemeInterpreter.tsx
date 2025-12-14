'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Brain, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ThemeInterpreter() {
  const [loading, setLoading] = useState(false)
  const [interpretation, setInterpretation] = useState<any>(null)
  const [poem, setPoem] = useState('')

  const handleInterpret = async () => {
    if (!poem.trim()) {
      toast.error('Please enter a poem')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/interpret-theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem }),
      })

      const data = await response.json()
      if (data.success) {
        setInterpretation(data.interpretation)
        toast.success('Interpretation complete!')
      } else {
        toast.error('Failed to interpret poem')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
          AI Theme Interpreter
        </h2>
        <p className="text-gray-600">
          Understand the deeper meaning and symbolism in poetry
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Poem
        </label>
        <textarea
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          placeholder="Paste or type the poem you want to interpret..."
          className="w-full h-64 px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors font-serif resize-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleInterpret}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Interpreting...</span>
          </>
        ) : (
          <>
            <Brain className="w-5 h-5" />
            <span>Interpret Theme</span>
          </>
        )}
      </motion.button>

      {interpretation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-orange-600 mb-3">Main Theme</h3>
            <p className="text-gray-700 leading-relaxed">{interpretation.mainTheme}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-purple-600 mb-3">Poet's Perspective</h3>
            <p className="text-gray-700 leading-relaxed">{interpretation.perspective}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-3">Symbolism & Hidden Meanings</h3>
            <p className="text-gray-700 leading-relaxed">{interpretation.symbolism}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-green-600 mb-3">Emotional Expression</h3>
            <p className="text-gray-700 leading-relaxed">{interpretation.emotion}</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-3">Key Lines Analysis</h3>
            <p className="text-gray-700 leading-relaxed">{interpretation.keyLines}</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Simple Explanation</h3>
            <p className="text-gray-700 leading-relaxed">{interpretation.simpleExplanation}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
