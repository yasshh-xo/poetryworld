'use client'

import { motion } from 'framer-motion'
import { Heart, Bookmark, Share2, Download, Eye } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import PoemModal from './PoemModal'

interface PoemCardProps {
  poem: {
    id: string
    title: string
    content: string
    author: string
    category: string
    likes: number
    views: number
    created_at: string
  }
}

export default function PoemCard({ poem }: PoemCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [localLikes, setLocalLikes] = useState(poem.likes)

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1)
    toast.success(liked ? 'Removed from likes' : 'Added to likes')
  }

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
    toast.success(saved ? 'Removed from saved' : 'Saved to collection')
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem.title,
          text: poem.content.substring(0, 100) + '...',
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const element = document.createElement('a')
    const file = new Blob([`${poem.title}\n\nBy ${poem.author}\n\n${poem.content}`], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(file)
    element.download = `${poem.title.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Poem downloaded!')
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        onClick={() => setShowModal(true)}
        className="poetry-card bg-white rounded-2xl p-6 shadow-lg cursor-pointer overflow-hidden relative group"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full">
            {poem.category}
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2 line-clamp-2">
            {poem.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4">by {poem.author}</p>
          <p className="text-gray-700 line-clamp-4 font-serif leading-relaxed mb-6">
            {poem.content}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{localLikes}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{poem.views}</span>
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors ${
                liked ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`p-2 rounded-full transition-colors ${
                saved ? 'bg-purple-100 text-purple-500' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDownload}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showModal && (
        <PoemModal poem={poem} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
