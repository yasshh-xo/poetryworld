'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from './Navbar'
import PoemGrid from './PoemGrid'
import AIFeatures from './AIFeatures'
import Footer from './Footer'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('poems')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    >
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'poems' && <PoemGrid />}
        {activeSection === 'ai-features' && <AIFeatures />}
      </main>

      <Footer />
    </motion.div>
  )
}
