'use client'

import { motion } from 'framer-motion'
import { Feather, Home, Sparkles, User, Search, Heart, BookMarked } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { id: 'poems', label: 'Poems', icon: Home },
    { id: 'ai-features', label: 'AI Features', icon: Sparkles },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'saved', label: 'Saved', icon: BookMarked },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveSection('poems')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50" />
              <div className="relative bg-white p-2 rounded-full">
                <Feather className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <span className="text-2xl font-serif font-bold gradient-text">
              PoetryWorld
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-full hover:bg-purple-50 transition-colors"
            >
              <Search className="w-6 h-6 text-gray-700" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              <User className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pb-4"
          >
            <input
              type="text"
              placeholder="Search poems, themes, or poets..."
              className="w-full px-6 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors"
              autoFocus
            />
          </motion.div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 shadow-lg z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center space-y-1 ${
                  activeSection === item.id ? 'text-purple-600' : 'text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
