'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { BookOpen, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function PoemRewriter() {
  const [loading, setLoading] = useState(false)
  const [rewritten, setRewritten] = useState('')
  const [poem, setPoem] = useState('')
  const [targetStyle, setTargetStyle] = useState('romantic')

  const styles = [
    'romantic', 'modern', 'classical', 'tragic', 'humorous', 
    'minimalist', 'epic', 'pastoral', 'gothic', 'surreal'
  ]

  const handleRewrite = async () => {
    if (!poem.trim()) {
      toast.error('Please enter a poem')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/rewrite-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem, targetStyle }),
      })

      const data = await response.json()
      if (data.success) {
        setRewritten(data.rewritten)
        toast.success('Poem rewritten successfully!')
      } else {
        toast.error('Failed to rewrite poem')
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
          AI Style Rewriter
        </h2>
        <p className="text-gray-600">
          Transform poems into different literary styles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Poem
            </label>
            <textarea
              value={poem}
              onChange={(e) => setPoem(e.target.value)}
              placeholder="Paste or type the poem you want to rewrite..."
              className="w-full h-64 px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors font-serif resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Style
            </label>
            <select
              value={targetStyle}
              onChange={(e) => setTargetStyle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors capitalize"
            >
              {styles.map((style) => (
                <option key={style} value={style} className="capitalize">
                  {style}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRewrite}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Rewriting...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                <span>Rewrite Poem</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6">
          {rewritten ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-serif font-bold text-gray-800">
                Rewritten in {targetStyle.charAt(0).toUpperCase() + targetStyle.slice(1)} Style
              </h3>
              <div className="prose prose-lg">
                <pre className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed">
                  {rewritten}
                </pre>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(rewritten)
                  toast.success('Copied to clipboard!')
                }}
                className="px-4 py-2 bg-white rounded-lg text-green-600 font-medium hover:bg-green-50 transition-colors"
              >
                Copy
              </motion.button>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-serif">
                  Rewritten poem will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
