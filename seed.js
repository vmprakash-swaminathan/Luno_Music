import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gborvkzmdhlfmwhtcvis.supabase.co';
const supabaseKey = 'sb_publishable_QYPT6GCon7jgxU1LE4FRyg_gLOdWJ__';
const supabase = createClient(supabaseUrl, supabaseKey);

const songs = [
  {
    title: 'Kan Irrandil',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311377/Kan-Irrandil.mp3'
  },
  {
    title: 'New York Nagaram',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311376/New_York_Nagaram.mp3'
  },
  {
    title: 'Pazhangalla Vishamulla',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311374/Pazhangalla-Vishamulla.mp3'
  },
  {
    title: 'Nenjukkul Peidhidum',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311366/Nenjukkul-Peidhidum-MassTamilan.com.mp3'
  },
  {
    title: 'En Fuse Pochu',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1493225457124-a1a2a5956093?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311360/En-Fuse-Pochu.mp3'
  },
  {
    title: 'Bum Baa Diga Diga',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311298/Bum_Baa_Diga_Diga_-_Music_Video_DC_Lokesh_Sun_Pictures_Anirudh_Arun_Matheswaran_-_Sun_TV.mp3'
  },
  {
    title: 'God Mode',
    artist: 'Luno Music',
    album: 'Luno Picks',
    cover_url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=400&q=80',
    audio_url: 'https://res.cloudinary.com/ow1rkoko/video/upload/v1790311296/God_Mode.mp3'
  }
];

async function seed() {
  console.log('Starting to seed database...');
  const { data, error } = await supabase.from('songs').insert(songs);
  if (error) {
    console.error('Error seeding data:', error);
  } else {
    console.log('Successfully seeded database with all songs!');
  }
}

seed();
