'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Wand2, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function PoemGenerator() {
  const [loading, setLoading] = useState(false)
  const [generatedPoem, setGeneratedPoem] = useState('')
  const [formData, setFormData] = useState({
    topic: '',
    mood: 'romantic',
    style: 'free-verse',
    form: 'any',
  })

  const moods = ['romantic', 'sad', 'happy', 'inspirational', 'melancholic', 'peaceful', 'dramatic']
  const styles = ['free-verse', 'rhyming', 'modern', 'classical', 'haiku', 'sonnet', 'limerick']
  const forms = ['any', 'short', 'medium', 'long']

  const handleGenerate = async () => {
    if (!formData.topic.trim()) {
      toast.error('Please enter a topic')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        setGeneratedPoem(data.poem)
        toast.success('Poem generated successfully!')
      } else {
        toast.error('Failed to generate poem')
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
          AI Poem Generator
        </h2>
        <p className="text-gray-600">
          Create beautiful, unique poems tailored to your preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic / Theme
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g., sunset, love, dreams, nature..."
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mood / Emotion
            </label>
            <select
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors capitalize"
            >
              {moods.map((mood) => (
                <option key={mood} value={mood} className="capitalize">
                  {mood}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Style
            </label>
            <select
              value={formData.style}
              onChange={(e) => setFormData({ ...formData, style: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors capitalize"
            >
              {styles.map((style) => (
                <option key={style} value={style} className="capitalize">
                  {style.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length
            </label>
            <select
              value={formData.form}
              onChange={(e) => setFormData({ ...formData, form: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors capitalize"
            >
              {forms.map((form) => (
                <option key={form} value={form} className="capitalize">
                  {form}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Poem</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Generated Poem Display */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 min-h-[400px]">
          {generatedPoem ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-serif font-bold text-gray-800">
                Your Generated Poem
              </h3>
              <div className="prose prose-lg">
                <pre className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed">
                  {generatedPoem}
                </pre>
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPoem)
                    toast.success('Copied to clipboard!')
                  }}
                  className="px-4 py-2 bg-white rounded-lg text-purple-600 font-medium hover:bg-purple-50 transition-colors"
                >
                  Copy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  className="px-4 py-2 bg-white rounded-lg text-purple-600 font-medium hover:bg-purple-50 transition-colors"
                >
                  Generate Another
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-serif">
                  Your generated poem will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
