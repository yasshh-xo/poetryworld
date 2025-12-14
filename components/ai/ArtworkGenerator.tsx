'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Palette, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Image from 'next/image'

export default function ArtworkGenerator() {
  const [loading, setLoading] = useState(false)
  const [artwork, setArtwork] = useState('')
  const [poem, setPoem] = useState('')

  const handleGenerate = async () => {
    if (!poem.trim()) {
      toast.error('Please enter a poem')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai/generate-artwork', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ poem }),
      })

      const data = await response.json()
      if (data.success) {
        setArtwork(data.imageUrl)
        toast.success('Artwork generated successfully!')
      } else {
        toast.error('Failed to generate artwork')
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
          AI Artwork Generator
        </h2>
        <p className="text-gray-600">
          Create beautiful artwork inspired by poetry
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
              placeholder="Paste or type the poem to visualize..."
              className="w-full h-96 px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors font-serif resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Artwork...</span>
              </>
            ) : (
              <>
                <Palette className="w-5 h-5" />
                <span>Generate Artwork</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 flex items-center justify-center min-h-[400px]">
          {artwork ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full space-y-4"
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={artwork}
                  alt="Generated artwork"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = artwork
                    link.download = 'poetry-artwork.png'
                    link.click()
                    toast.success('Artwork downloaded!')
                  }}
                  className="flex-1 px-4 py-2 bg-white rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                >
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  className="flex-1 px-4 py-2 bg-white rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                >
                  Generate New
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-400">
              <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-serif">
                Generated artwork will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
