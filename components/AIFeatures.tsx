'use client'

import { motion } from 'framer-motion'
import { Sparkles, GitCompare, BookOpen, Wand2, Palette, Brain } from 'lucide-react'
import { useState } from 'react'
import PoemGenerator from './ai/PoemGenerator'
import PoemComparator from './ai/PoemComparator'
import ThemeInterpreter from './ai/ThemeInterpreter'
import PoemRewriter from './ai/PoemRewriter'
import ArtworkGenerator from './ai/ArtworkGenerator'
import MoodDetector from './ai/MoodDetector'

export default function AIFeatures() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const features = [
    {
      id: 'generator',
      title: 'Poem Generator',
      description: 'Create beautiful poems with AI based on your topic, mood, and style',
      icon: Wand2,
      color: 'from-purple-500 to-pink-500',
      component: PoemGenerator,
    },
    {
      id: 'comparator',
      title: 'Poem Comparator',
      description: 'Compare two poems and analyze their differences in style, theme, and technique',
      icon: GitCompare,
      color: 'from-pink-500 to-orange-500',
      component: PoemComparator,
    },
    {
      id: 'interpreter',
      title: 'Theme Interpreter',
      description: 'Understand the deeper meaning, symbolism, and emotions in any poem',
      icon: Brain,
      color: 'from-orange-500 to-yellow-500',
      component: ThemeInterpreter,
    },
    {
      id: 'rewriter',
      title: 'Style Rewriter',
      description: 'Rewrite poems in different styles - romantic, modern, classical, and more',
      icon: BookOpen,
      color: 'from-green-500 to-teal-500',
      component: PoemRewriter,
    },
    {
      id: 'artwork',
      title: 'Artwork Generator',
      description: 'Generate beautiful artwork inspired by the theme and mood of any poem',
      icon: Palette,
      color: 'from-blue-500 to-purple-500',
      component: ArtworkGenerator,
    },
    {
      id: 'mood',
      title: 'Mood Detector',
      description: 'Detect the emotional tone and mood conveyed by any poem',
      icon: Sparkles,
      color: 'from-indigo-500 to-pink-500',
      component: MoodDetector,
    },
  ]

  const ActiveComponent = activeFeature
    ? features.find((f) => f.id === activeFeature)?.component
    : null

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold gradient-text mb-4">
          AI-Powered Features
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience poetry like never before with cutting-edge AI technology
        </p>
      </motion.div>

      {/* Features Grid */}
      {!activeFeature ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveFeature(feature.id)}
                className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer group overflow-hidden relative"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  <motion.div
                    className="mt-4 flex items-center text-purple-600 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Try it now →
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFeature(null)}
            className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            ← Back to Features
          </motion.button>

          {ActiveComponent && <ActiveComponent />}
        </motion.div>
      )}
    </div>
  )
}
