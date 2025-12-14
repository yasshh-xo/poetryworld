'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MessageCircle, Send, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

interface CommentSectionProps {
  poemId: string
}

export default function CommentSection({ poemId }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [poemId])

  const fetchComments = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('poem_id', poemId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Error fetching comments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setSubmitting(true)
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            poem_id: poemId,
            content: newComment,
            user_name: 'Anonymous', // Replace with actual user data
          },
        ])
        .select()

      if (error) throw error
      
      setComments([data[0], ...comments])
      setNewComment('')
      toast.success('Comment added!')
    } catch (error) {
      console.error('Error adding comment:', error)
      toast.error('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-serif font-bold text-gray-800 flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-orange-600" />
        <span>Comments</span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={submitting || !newComment.trim()}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </form>

      {/* Comments List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center text-white font-bold">
                  {comment.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-800">{comment.user_name}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
