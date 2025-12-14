'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function MoodDetector() {
  const [loading, setLoading] = useState(false)
  const [moodData, setMoodData] = useState<any>(null)
  const [poem, setPoem] = useState('')

  const handleDetect = async () => {
    if (!poem.trim()) {
      toast.error('Please enter a poem')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/detect-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem }),
      })

      const data = await response.json()
      if (data.success) {
        setMoodData(data.mood)
        toast.success('Mood detected successfully!')
      } else {
        toast.error('Failed to detect mood')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getMoodColor = (mood: string) => {
    const colors: any = {
      happy: 'from-yellow-400 to-orange-400',
      sad: 'from-blue-400 to-indigo-400',
      romantic: 'from-pink-400 to-rose-400',
      peaceful: 'from-green-400 to-teal-400',
      angry: 'from-red-400 to-orange-600',
      melancholic: 'from-purple-400 to-blue-400',
      hopeful: 'from-cyan-400 to-blue-400',
      nostalgic: 'from-amber-400 to-orange-400',
    }
    return colors[mood.toLowerCase()] || 'from-gray-400 to-gray-600'
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
          AI Mood Detector
        </h2>
        <p className="text-gray-600">
          Discover the emotional tone and mood of any poem
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Poem
            </label>
            <textarea
              value={poem}
              onChange={(e) => setPoem(e.target.value)}
              placeholder="Paste or type the poem to analyze..."
              className="w-full h-96 px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors font-serif resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDetect}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Detecting Mood...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Detect Mood</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-lg p-6">
          {moodData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getMoodColor(moodData.primary)} flex items-center justify-center shadow-lg mb-4`}
                >
                  <Sparkles className="w-16 h-16 text-white" />
                </motion.div>
                <h3 className="text-3xl font-serif font-bold text-gray-800 mb-2">
                  {moodData.primary}
                </h3>
                <p className="text-gray-600">Primary Mood</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-800">Emotional Breakdown</h4>
                {moodData.emotions && moodData.emotions.map((emotion: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium capitalize">{emotion.name}</span>
                      <span className="text-gray-600">{emotion.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${emotion.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${getMoodColor(emotion.name)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">Analysis</h4>
                <p className="text-gray-700 leading-relaxed">{moodData.analysis}</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-2">Tone</h4>
                <p className="text-gray-700">{moodData.tone}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-serif">
                  Mood analysis will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
