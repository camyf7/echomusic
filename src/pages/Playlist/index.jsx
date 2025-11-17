"use client";

import { useState } from "react";
import "./Playlist.css";
import { IoMdPlay, IoMdPause, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdShare, MdPlaylistAdd } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

export default function PlaylistPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlistLiked, setPlaylistLiked] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);

  const playlist = {
    title: "Vibes Brasileiras",
    description: "As melhores músicas para relaxar e curtir o momento. Uma seleção especial com os maiores hits do Brasil.",
    creator: "Echo Music",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    totalTracks: 8,
    duration: "32 min",
    followers: "1.2k"
  };

  const tracks = [
    {
      id: 1,
      number: 1,
      title: "Aquarela",
      artist: "Toquinho",
      album: "Clássicos Brasileiros",
      duration: "3:45",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      number: 2,
      title: "Mas Que Nada",
      artist: "Jorge Ben Jor",
      album: "Samba Esquema Novo",
      duration: "2:58",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      number: 3,
      title: "Águas de Março",
      artist: "Elis Regina & Tom Jobim",
      album: "Elis & Tom",
      duration: "4:12",
      cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      number: 4,
      title: "Chega de Saudade",
      artist: "João Gilberto",
      album: "Chega de Saudade",
      duration: "3:30",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      number: 5,
      title: "Construção",
      artist: "Chico Buarque",
      album: "Construção",
      duration: "4:05",
      cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=100&h=100&fit=crop"
    },
    {
      id: 6,
      number: 6,
      title: "Garota de Ipanema",
      artist: "Tom Jobim & Vinicius de Moraes",
      album: "Getz/Gilberto",
      duration: "3:18",
      cover: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=100&h=100&fit=crop"
    },
    {
      id: 7,
      number: 7,
      title: "É Preciso Saber Viver",
      artist: "Titãs",
      album: "Cabeça Dinossauro",
      duration: "3:52",
      cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=100&h=100&fit=crop"
    },
    {
      id: 8,
      number: 8,
      title: "Sampa",
      artist: "Caetano Veloso",
      album: "Muito",
      duration: "4:28",
      cover: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=100&h=100&fit=crop"
    }
  ];

  const togglePlay = (trackId) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
    }
  };

  const toggleTrackLike = (trackId) => {
    if (likedTracks.includes(trackId)) {
      setLikedTracks(likedTracks.filter(id => id !== trackId));
    } else {
      setLikedTracks([...likedTracks, trackId]);
    }
  };

  return (
    <div className="pl-page">
      <div className="pl-container">
        {/* Header da Playlist */}
        <div className="pl-header">
          <div className="pl-cover">
            <img src={playlist.cover} alt={playlist.title} />
          </div>
          <div className="pl-info">
            <div className="pl-type">Playlist Pública</div>
            <h1 className="pl-title">{playlist.title}</h1>
            <p className="pl-description">{playlist.description}</p>
            <div className="pl-meta">
              <span>{playlist.creator}</span>
              <div className="pl-separator" />
              <span>{playlist.totalTracks} músicas</span>
              <div className="pl-separator" />
              <span>{playlist.duration}</span>
              <div className="pl-separator" />
              <span>{playlist.followers} seguidores</span>
            </div>
            <div className="pl-actions">
              <button className="pl-action-btn pl-play-btn" onClick={() => togglePlay(1)}>
                {isPlaying ? <IoMdPause size={20} /> : <IoMdPlay size={20} />}
                {isPlaying ? 'Pausar' : 'Reproduzir'}
              </button>
              <button
                className={`pl-icon-btn ${playlistLiked ? 'liked' : ''}`}
                onClick={() => setPlaylistLiked(!playlistLiked)}
              >
                {playlistLiked ? <IoMdHeart size={20} /> : <IoMdHeartEmpty size={20} />}
              </button>
              <button className="pl-icon-btn">
                <MdShare size={20} />
              </button>
              <button className="pl-icon-btn">
                <BsThreeDots size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Músicas */}
        <div className="pl-tracks-section">
          <div className="pl-tracks-header">
            <div>#</div>
            <div>Título</div>
            <div>Álbum</div>
            <div style={{ textAlign: 'center' }}>
              <FiClock size={16} />
            </div>
            <div></div>
          </div>

          {tracks.map((track) => (
            <div
              key={track.id}
              className={`pl-track-item ${currentTrack === track.id ? 'playing' : ''}`}
              onClick={() => togglePlay(track.id)}
            >
              <div className="pl-track-number">
                <span className="number">{track.number}</span>
                <span className="play-indicator">
                  {currentTrack === track.id && isPlaying ? (
                    <IoMdPause size={20} />
                  ) : (
                    <IoMdPlay size={20} />
                  )}
                </span>
              </div>
              <div className="pl-track-info">
                <div className="pl-track-cover">
                  <img src={track.cover} alt={track.title} />
                </div>
                <div className="pl-track-details">
                  <h4>{track.title}</h4>
                  <p>{track.artist}</p>
                </div>
              </div>
              <div className="pl-track-album">{track.album}</div>
              <div className="pl-track-duration">{track.duration}</div>
              <div className="pl-track-actions">
                <button
                  className={`pl-track-action-btn ${likedTracks.includes(track.id) ? 'liked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTrackLike(track.id);
                  }}
                >
                  {likedTracks.includes(track.id) ? (
                    <IoMdHeart size={18} />
                  ) : (
                    <IoMdHeartEmpty size={18} />
                  )}
                </button>
                <button
                  className="pl-track-action-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdPlaylistAdd size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}