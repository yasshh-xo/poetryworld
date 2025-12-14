'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import PoemCard from './PoemCard'
import { supabase } from '@/lib/supabase'

export default function PoemGrid() {
  const [poems, setPoems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPoems()
  }, [filter])

  const fetchPoems = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('poems')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== 'all') {
        query = query.eq('category', filter)
      }

      const { data, error } = await query

      if (error) throw error
      setPoems(data || [])
    } catch (error) {
      console.error('Error fetching poems:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'love', 'nature', 'life', 'sadness', 'hope', 'inspiration']

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold gradient-text mb-4">
          Explore Poetry
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Dive into a world of emotions, thoughts, and beautiful verses
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full font-medium capitalize transition-all ${
              filter === category
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Poems Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-96 bg-white rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : poems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-2xl text-gray-500 font-serif">
            No poems found. Check back soon!
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {poems.map((poem, index) => (
            <motion.div
              key={poem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PoemCard poem={poem} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
