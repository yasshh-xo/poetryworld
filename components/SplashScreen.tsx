'use client'

import { motion } from 'framer-motion'
import { Feather, Sparkles, BookOpen } from 'lucide-react'

export default function SplashScreen() {
  const floatingWords = [
    'Dreams', 'Love', 'Hope', 'Soul', 'Heart', 'Stars', 'Moon', 'Light',
    'Peace', 'Joy', 'Life', 'Time', 'Beauty', 'Grace', 'Wonder', 'Magic'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      }}
    >
      {/* Floating words background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingWords.map((word, index) => (
          <motion.div
            key={index}
            className="absolute text-white/20 font-serif text-2xl md:text-4xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="w-24 h-24 text-yellow-300" />
            </motion.div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-full p-8 border-2 border-white/30">
              <Feather className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl font-serif font-bold text-white mb-4"
        >
          PoetryWorld
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 font-light mb-8"
        >
          Where Words Come Alive
        </motion.p>

        {/* Ink flow animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-white to-transparent"
        />

        {/* Book opening animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-8 flex justify-center"
        >
          <BookOpen className="w-12 h-12 text-white animate-pulse" />
        </motion.div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2.5, duration: 1.5, repeat: Infinity }}
          className="mt-4 text-white/70 text-sm tracking-widest"
        >
          ENTERING THE WORLD OF POETRY...
        </motion.p>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0,
            }}
            animate={{
              y: -20,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
