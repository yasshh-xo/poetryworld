-- PoetryWorld Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#8B5CF6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Poems table
CREATE TABLE IF NOT EXISTS poems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(poem_id, user_id)
);

-- Saved poems table
CREATE TABLE IF NOT EXISTS saved_poems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  collection_name TEXT DEFAULT 'Favorites',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(poem_id, user_id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('new_poem', 'comment', 'like', 'system')),
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_poems_category ON poems(category);
CREATE INDEX IF NOT EXISTS idx_poems_created_at ON poems(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_poems_likes ON poems(likes DESC);
CREATE INDEX IF NOT EXISTS idx_poems_views ON poems(views DESC);
CREATE INDEX IF NOT EXISTS idx_comments_poem_id ON comments(poem_id);
CREATE INDEX IF NOT EXISTS idx_likes_poem_id ON likes(poem_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_poems_user_id ON saved_poems(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- Insert default categories
INSERT INTO categories (name, description, color) VALUES
  ('love', 'Poems about love and romance', '#EC4899'),
  ('nature', 'Poems celebrating the beauty of nature', '#10B981'),
  ('life', 'Reflections on life and existence', '#8B5CF6'),
  ('sadness', 'Melancholic and sorrowful verses', '#3B82F6'),
  ('hope', 'Inspirational and hopeful poetry', '#F59E0B'),
  ('inspiration', 'Motivational and uplifting poems', '#EF4444')
ON CONFLICT (name) DO NOTHING;

-- Insert sample poems (optional)
INSERT INTO poems (title, content, author, category) VALUES
  (
    'Whispers of Dawn',
    E'In the quiet hours before the sun,\nWhen darkness slowly comes undone,\nThe world awakens, soft and new,\nPainted in morning''s golden hue.\n\nBirds begin their gentle song,\nAs shadows fade where they belong,\nA promise whispered on the breeze,\nOf hope that dances through the trees.',
    'Admin',
    'nature'
  ),
  (
    'Eternal Flame',
    E'Your love, a fire that never dies,\nBurns bright beneath the starlit skies,\nA warmth that melts the coldest night,\nA beacon, pure and shining bright.\n\nThrough storms and trials, it remains,\nA constant through life''s joys and pains,\nForever burning, strong and true,\nMy heart belongs forever to you.',
    'Admin',
    'love'
  ),
  (
    'The Journey Within',
    E'Life is not a destination,\nBut a path of transformation,\nEach step we take, a lesson learned,\nEach bridge we cross, a page we''ve turned.\n\nIn valleys low and mountains high,\nWe find ourselves, we learn to fly,\nThe journey inward, deep and vast,\nReveals the truths that always last.',
    'Admin',
    'life'
  )
ON CONFLICT DO NOTHING;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_poems_updated_at BEFORE UPDATE ON poems
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment poem views
CREATE OR REPLACE FUNCTION increment_poem_views(poem_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE poems SET views = views + 1 WHERE id = poem_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update poem likes count
CREATE OR REPLACE FUNCTION update_poem_likes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE poems SET likes = likes + 1 WHERE id = NEW.poem_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE poems SET likes = likes - 1 WHERE id = OLD.poem_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for likes
CREATE TRIGGER update_poem_likes_trigger
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_poem_likes();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: Everyone can read, only users can update their own data
CREATE POLICY "Users are viewable by everyone" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Poems: Everyone can read, only admins can insert/update/delete
CREATE POLICY "Poems are viewable by everyone" ON poems
  FOR SELECT USING (published = true OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Only admins can insert poems" ON poems
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Only admins can update poems" ON poems
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

CREATE POLICY "Only admins can delete poems" ON poems
  FOR DELETE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Comments: Everyone can read, authenticated users can insert, only admins can delete
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (approved = true);

CREATE POLICY "Authenticated users can insert comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Only admins can delete comments" ON comments
  FOR DELETE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Likes: Users can manage their own likes
CREATE POLICY "Users can view all likes" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" ON likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" ON likes
  FOR DELETE USING (auth.uid() = user_id);

-- Saved poems: Users can manage their own saved poems
CREATE POLICY "Users can view their own saved poems" ON saved_poems
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved poems" ON saved_poems
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved poems" ON saved_poems
  FOR DELETE USING (auth.uid() = user_id);

-- Notifications: Users can view and update their own notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'PoetryWorld database schema created successfully!';
  RAISE NOTICE 'You can now start using the application.';
  RAISE NOTICE 'Remember to set up your admin user by updating the role in the users table.';
END $$;
