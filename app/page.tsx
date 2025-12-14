'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SplashScreen from '@/components/SplashScreen'
import HomePage from '@/components/HomePage'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 4000) // Show splash for 4 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : (
          <HomePage key="home" />
        )}
      </AnimatePresence>
    </main>
  )
}
