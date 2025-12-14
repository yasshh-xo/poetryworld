'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { GitCompare, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function PoemComparator() {
  const [loading, setLoading] = useState(false)
  const [comparison, setComparison] = useState<any>(null)
  const [poem1, setPoem1] = useState('')
  const [poem2, setPoem2] = useState('')

  const handleCompare = async () => {
    if (!poem1.trim() || !poem2.trim()) {
      toast.error('Please enter both poems')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/compare-poems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem1, poem2 }),
      })

      const data = await response.json()
      if (data.success) {
        setComparison(data.comparison)
        toast.success('Comparison complete!')
      } else {
        toast.error('Failed to compare poems')
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
          AI Poem Comparator
        </h2>
        <p className="text-gray-600">
          Compare two poems and analyze their differences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Poem
          </label>
          <textarea
            value={poem1}
            onChange={(e) => setPoem1(e.target.value)}
            placeholder="Paste or type the first poem here..."
            className="w-full h-64 px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors font-serif resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Poem
          </label>
          <textarea
            value={poem2}
            onChange={(e) => setPoem2(e.target.value)}
            placeholder="Paste or type the second poem here..."
            className="w-full h-64 px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none transition-colors font-serif resize-none"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCompare}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Comparing...</span>
          </>
        ) : (
          <>
            <GitCompare className="w-5 h-5" />
            <span>Compare Poems</span>
          </>
        )}
      </motion.button>

      {comparison && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 space-y-4"
        >
          <h3 className="text-2xl font-serif font-bold text-gray-800">
            Comparison Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-purple-600 mb-2">Style Analysis</h4>
              <p className="text-gray-700">{comparison.style}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-pink-600 mb-2">Theme Differences</h4>
              <p className="text-gray-700">{comparison.theme}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-orange-600 mb-2">Literary Techniques</h4>
              <p className="text-gray-700">{comparison.techniques}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-green-600 mb-2">Similarity Score</h4>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all"
                    style={{ width: `${comparison.similarity}%` }}
                  />
                </div>
                <span className="font-bold text-gray-800">{comparison.similarity}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h4 className="font-bold text-blue-600 mb-2">Overall Analysis</h4>
            <p className="text-gray-700 leading-relaxed">{comparison.summary}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
