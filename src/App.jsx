import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, Search, Home, Book, Heart, Settings, LogOut, MoreHorizontal, Edit2, Trash2, Check, X, Shuffle } from 'lucide-react';
import { supabase } from './supabaseClient';
import './index.css';

const LineSidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="brand">Luno Music</div>
      
      <div className="nav-section">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <Home size={18} /> Home
        </Link>
        <Link to="/search" className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}>
          <Search size={18} /> Search
        </Link>
        <Link to="/library" className={`nav-link ${location.pathname === '/library' ? 'active' : ''}`}>
          <Book size={18} /> My library
        </Link>
      </div>

      <div className="nav-section">
        <Link to="/liked" className={`nav-link ${location.pathname === '/liked' ? 'active' : ''}`}>
          <Heart size={18} /> Liked songs
        </Link>
      </div>

      <div className="nav-section bottom-nav">
        <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
          <Settings size={18} /> Admin Panel
        </Link>
        <Link to="/" className="nav-link">
          <LogOut size={18} /> Log out
        </Link>
      </div>
    </div>
  );
};

const UserPage = ({ songs, currentSong, setCurrentSong, togglePlay, isPlaying, likedSongs, toggleLike }) => {
  const topHits = songs.slice(0, 3);
  const featuring = songs.slice(3, 7);
  // Change hero image dynamically based on current playing song
  const artistImage = currentSong ? currentSong.cover_url : (songs.length > 0 ? songs[0].cover_url : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80");

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div className="hero-section">
        <img src={artistImage} alt="Hero Cover" className="hero-image" />
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <div>
            <h1 className="hero-title">{currentSong ? currentSong.title : 'Luno Music'}</h1>
            <p className="hero-subtitle">
              <Heart size={14} color="var(--accent-purple)" fill="var(--accent-purple)" />
              {currentSong ? currentSong.artist : '3,123,354 monthly listeners'}
              <MoreHorizontal size={20} style={{ marginLeft: '1rem', color: 'var(--text-secondary)' }} />
            </p>
          </div>
          <button className="hero-play-btn" onClick={() => {
            if (songs.length > 0 && !currentSong) setCurrentSong(songs[0]);
            togglePlay();
          }}>
            {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" style={{ marginLeft: '6px' }}/>}
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <h2 className="section-title">Top Hits</h2>
        <div className="song-list">
          {topHits.map(song => (
            <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'playing' : ''}`} onClick={() => setCurrentSong(song)}>
              <img src={song.cover_url} className="song-list-cover" alt="cover"/>
              <div className="song-info">
                <h3 className="song-info-title">{song.title}</h3>
                <p className="song-info-artist">2,238,244 listeners</p>
              </div>
              <div className="song-actions" onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}>
                <Heart size={16} className="action-icon" fill={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'none'} color={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '3rem' }}>Featuring</h2>
        <div className="song-list">
          {featuring.map(song => (
            <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'playing' : ''}`} onClick={() => setCurrentSong(song)}>
              <img src={song.cover_url} className="song-list-cover" alt="cover"/>
              <div className="song-info">
                <h3 className="song-info-title">{song.title}</h3>
                <p className="song-info-artist">1,878,231 listeners</p>
              </div>
              <div className="song-actions" onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}>
                <Heart size={16} className="action-icon" fill={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'none'} color={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SearchPage = ({ songs, currentSong, setCurrentSong, likedSongs, toggleLike }) => {
  const [search, setSearch] = useState('');
  const filtered = songs.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="content-wrapper" style={{ paddingTop: '3rem' }}>
      <h2 className="section-title" style={{ fontSize: '2rem' }}>Search</h2>
      <input 
        type="text" 
        placeholder="What do you want to listen to?" 
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '1rem', borderRadius: '2rem', border: 'none', background: '#282828', color: 'white', marginBottom: '2rem', fontSize: '1.1rem', outline: 'none' }}
      />
      <div className="song-list">
        {filtered.map(song => (
          <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'playing' : ''}`} onClick={() => setCurrentSong(song)}>
            <img src={song.cover_url} className="song-list-cover" alt="cover"/>
            <div className="song-info">
              <h3 className="song-info-title">{song.title}</h3>
              <p className="song-info-artist">{song.artist}</p>
            </div>
            <div className="song-actions" onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}>
              <Heart size={16} className="action-icon" fill={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'none'} color={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No songs found.</p>}
      </div>
    </div>
  );
};

const LibraryPage = ({ songs, currentSong, setCurrentSong, likedSongs, toggleLike }) => {
  return (
    <div className="content-wrapper" style={{ paddingTop: '3rem' }}>
      <h2 className="section-title" style={{ fontSize: '2rem' }}>My Library</h2>
      <div className="song-list">
        {songs.map(song => (
          <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'playing' : ''}`} onClick={() => setCurrentSong(song)}>
            <img src={song.cover_url} className="song-list-cover" alt="cover"/>
            <div className="song-info">
              <h3 className="song-info-title">{song.title}</h3>
              <p className="song-info-artist">{song.artist}</p>
            </div>
            <div className="song-actions" onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}>
              <Heart size={16} className="action-icon" fill={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'none'} color={likedSongs.includes(song.id) ? 'var(--accent-purple)' : 'var(--text-secondary)'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LikedSongsPage = ({ songs, currentSong, setCurrentSong, likedSongs, toggleLike }) => {
  const favoriteSongs = songs.filter(s => likedSongs.includes(s.id));

  return (
    <div className="content-wrapper" style={{ paddingTop: '3rem' }}>
      <h2 className="section-title" style={{ fontSize: '2rem' }}>Liked Songs</h2>
      <div className="song-list">
        {favoriteSongs.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>You haven't liked any songs yet. Click the heart icon to add favorites!</p>
        ) : (
          favoriteSongs.map(song => (
            <div key={song.id} className={`song-list-item ${currentSong?.id === song.id ? 'playing' : ''}`} onClick={() => setCurrentSong(song)}>
              <img src={song.cover_url} className="song-list-cover" alt="cover"/>
              <div className="song-info">
                <h3 className="song-info-title">{song.title}</h3>
                <p className="song-info-artist">{song.artist}</p>
              </div>
              <div className="song-actions" onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}>
                <Heart size={16} className="action-icon" fill="var(--accent-purple)" color="var(--accent-purple)" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AdminPage = ({ fetchSongs, songs }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({ title: '', artist: '', cover_url: '', audio_url: '' });
  const [editingId, setEditingId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('Incorrect password!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('songs').update(formData).eq('id', editingId);
      setEditingId(null);
    } else {
      await supabase.from('songs').insert([formData]);
    }
    fetchSongs();
    setFormData({ title: '', artist: '', cover_url: '', audio_url: '' });
  };

  const handleEdit = (song) => {
    setEditingId(song.id);
    setFormData({ title: song.title, artist: song.artist, cover_url: song.cover_url, audio_url: song.audio_url });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this song?")) {
      await supabase.from('songs').delete().eq('id', id);
      fetchSongs();
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
        <h2>Admin Access</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Admin Password" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: '#282828', color: 'white' }} />
          <button type="submit" style={{ padding: '0.75rem', borderRadius: '0.5rem', border: 'none', background: 'var(--accent-purple)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem', paddingBottom: '120px' }}>
      <h2 style={{ fontSize: '2rem' }}>{editingId ? 'Edit Song' : 'Add New Song'}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display:'block', marginBottom:'.5rem', color: 'var(--text-secondary)' }}>Title</label>
          <input required style={{ width:'100%', padding:'0.75rem', borderRadius:'0.5rem' }} className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display:'block', marginBottom:'.5rem', color: 'var(--text-secondary)' }}>Artist</label>
          <input required style={{ width:'100%', padding:'0.75rem', borderRadius:'0.5rem' }} className="form-input" value={formData.artist} onChange={e => setFormData({...formData, artist: e.target.value})} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display:'block', marginBottom:'.5rem', color: 'var(--text-secondary)' }}>Cover URL</label>
          <input required type="url" style={{ width:'100%', padding:'0.75rem', borderRadius:'0.5rem' }} className="form-input" value={formData.cover_url} onChange={e => setFormData({...formData, cover_url: e.target.value})} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display:'block', marginBottom:'.5rem', color: 'var(--text-secondary)' }}>Audio URL</label>
          <input required type="url" style={{ width:'100%', padding:'0.75rem', borderRadius:'0.5rem' }} className="form-input" value={formData.audio_url} onChange={e => setFormData({...formData, audio_url: e.target.value})} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', color: 'white', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="btn-submit">
            {editingId ? <><Check size={18}/> Update</> : 'Add Song'}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', artist: '', cover_url: '', audio_url: '' }) }} style={{ padding: '0.75rem 2rem', borderRadius: '0.5rem', color: 'white', border: '1px solid #444', background: 'transparent', cursor: 'pointer' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="section-title" style={{ marginTop: '3rem' }}>Manage Songs</h2>
      <div className="song-list">
        {songs.map(song => (
          <div key={song.id} className="song-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={song.cover_url} className="song-list-cover" alt="cover"/>
              <div className="song-info">
                <h3 className="song-info-title">{song.title}</h3>
                <p className="song-info-artist">{song.artist}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => handleEdit(song)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><Edit2 size={18} /></button>
              <button onClick={() => handleDelete(song.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [likedSongs, setLikedSongs] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(new Audio());

  const fetchSongs = async () => {
    let { data } = await supabase.from('songs').select('*').order('created_at', { ascending: false });
    if (data) setSongs(data);
  };

  useEffect(() => { 
    fetchSongs(); 
    // load liked songs from local storage
    const saved = localStorage.getItem('luno_liked');
    if (saved) {
      try {
        const parsedLikes = JSON.parse(saved);
        setLikedSongs(Array.isArray(parsedLikes) ? parsedLikes : []);
      } catch {
        localStorage.removeItem('luno_liked');
      }
    }
  }, []);

  const toggleLike = (id) => {
    let updatedLikes = [...likedSongs];
    if(updatedLikes.includes(id)) {
      updatedLikes = updatedLikes.filter(l => l !== id);
    } else {
      updatedLikes.push(id);
    }
    setLikedSongs(updatedLikes);
    localStorage.setItem('luno_liked', JSON.stringify(updatedLikes));
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (currentSong) {
      audio.src = currentSong.audio_url;
      audio.volume = volume;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentSong]);

  useEffect(() => { audioRef.current.volume = volume; }, [volume]);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;
    let nextIdx;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * songs.length);
    } else {
      const idx = songs.findIndex(s => s.id === currentSong.id);
      nextIdx = (idx + 1) % songs.length;
    }
    setCurrentSong(songs[nextIdx]);
  };

  const handlePrev = () => {
    if (!currentSong || songs.length === 0) return;
    const idx = songs.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIdx]);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * audioRef.current.duration;
    setProgress(pos * 100);
  };

  return (
    <Router>
      <div className="app-container">
        <LineSidebar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<UserPage songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} togglePlay={togglePlay} isPlaying={isPlaying} likedSongs={likedSongs} toggleLike={toggleLike} />} />
            <Route path="/search" element={<SearchPage songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} likedSongs={likedSongs} toggleLike={toggleLike} />} />
            <Route path="/library" element={<LibraryPage songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} likedSongs={likedSongs} toggleLike={toggleLike} />} />
            <Route path="/liked" element={<LikedSongsPage songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} likedSongs={likedSongs} toggleLike={toggleLike} />} />
            <Route path="/admin" element={<AdminPage fetchSongs={fetchSongs} songs={songs} />} />
          </Routes>
        </main>

        {currentSong && (
          <div className="player">
            <div className="player-info">
              <img src={currentSong.cover_url} alt="cover" className="player-cover" />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{currentSong.title}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{currentSong.artist}</p>
              </div>
            </div>
            
            <div className="player-controls">
              <div className="control-buttons">
                <button className="btn-icon" onClick={() => setIsShuffle(!isShuffle)}><Shuffle size={18} color={isShuffle ? 'var(--accent-purple)' : 'var(--text-secondary)'} /></button>
                <button className="btn-icon" onClick={handlePrev}><SkipBack size={20} fill="currentColor" /></button>
                <button className="btn-play" onClick={togglePlay}>
                  {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" style={{ marginLeft: '2px' }} />}
                </button>
                <button className="btn-icon" onClick={handleNext}><SkipForward size={20} fill="currentColor" /></button>
              </div>
              <div className="progress-container">
                <div className="progress-bar" onClick={handleProgressClick}>
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="player-volume">
              <Volume2 size={16} color="var(--text-secondary)" />
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="volume-slider" />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
