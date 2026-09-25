-- Run this SQL in your Supabase SQL Editor to set up the database

CREATE TABLE IF NOT EXISTS public.songs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  artist text not null,
  album text,
  cover_url text,
  audio_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to songs
CREATE POLICY "Allow public read access"
  ON public.songs
  FOR SELECT
  USING (true);

-- Allow public insert access to songs (since we don't have auth implemented for admin, just for simplicity in this project)
CREATE POLICY "Allow public insert access"
  ON public.songs
  FOR INSERT
  WITH CHECK (true);

-- Allow public delete access
CREATE POLICY "Allow public delete access"
  ON public.songs
  FOR DELETE
  USING (true);

-- Allow public update access
CREATE POLICY "Allow public update access"
  ON public.songs
  FOR UPDATE
  USING (true);
