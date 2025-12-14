import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Poem {
  id: string
  title: string
  content: string
  author: string
  category: string
  likes: number
  views: number
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  poem_id: string
  user_name: string
  content: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  created_at: string
}
