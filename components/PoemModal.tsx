'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Bookmark, Share2, Download, Volume2, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import WordMeaningTooltip from './WordMeaningTooltip'
import AIThemeInterpreter from './AIThemeInterpreter'
import CommentSection from './CommentSection'

interface PoemModalProps {
  poem: any
  onClose: () => void
}

export default function PoemModal({ poem, onClose }: PoemModalProps) {
  const [showInterpretation, setShowInterpretation] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleRecite = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(poem.content)
      utterance.rate = 0.8
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white z-10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-serif font-bold mb-2">{poem.title}</h2>
                <p className="text-white/90">by {poem.author}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <WordMeaningTooltip text={poem.content} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecite}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                <span>Recite Aloud</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInterpretation(!showInterpretation)}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
              >
                <span>AI Interpretation</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowComments(!showComments)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comments</span>
              </motion.button>
            </div>

            {/* AI Interpretation */}
            {showInterpretation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <AIThemeInterpreter poem={poem} />
              </motion.div>
            )}

            {/* Comments */}
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <CommentSection poemId={poem.id} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
