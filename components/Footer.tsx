'use client'

import { motion } from 'framer-motion'
import { Feather, Heart, Github, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Feather className="w-8 h-8" />
              <span className="text-2xl font-serif font-bold">PoetryWorld</span>
            </div>
            <p className="text-purple-200">
              Where words come alive and emotions find their voice
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Explore Poems</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-purple-200">
              <li><a href="#" className="hover:text-white transition-colors">Love</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nature</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Life</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Inspiration</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-pink-400 fill-current" />
            <span>by PoetryWorld Team</span>
          </p>
          <p className="mt-2 text-sm">© 2024 PoetryWorld. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
