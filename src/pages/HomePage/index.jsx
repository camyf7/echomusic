"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GiSoundWaves } from "react-icons/gi";
import { BiVolumeFull } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";

import Karen from "../../assets/usario_karen.png";
import usuarioAna from "../../assets/usuario_ana_vitoria.png";
import usuarioLarissa from "../../assets/usuario_larissa.png";
import usuarioMariana from "../../assets/usario_mariana.png";
import usuarioCarlos from "../../assets/usuario_carlos.jpeg";
import usuarioArthur from "../../assets/usuario_arthur.jpeg";
import Die from "../../assets/musica_die.png";

import { usePlayer } from "../../contexts/PlayerContext";

export default function HomePage() {
 const {
  isPlaying,
  setIsPlaying,
  volume,
  setVolume,
  progress,
  audioRef,
  tracks,
  currentTrackIndex,
  playTrack,
} = usePlayer();

// Track atual
const currentTrack = tracks[currentTrackIndex];

// Funções para avançar/voltar
const nextTrack = () => {
  if (currentTrackIndex + 1 < tracks.length) playTrack(currentTrackIndex + 1);
};

const prevTrack = () => {
  if (currentTrackIndex - 1 >= 0) playTrack(currentTrackIndex - 1);
};


  const [liked, setLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detecta o tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const toggleLike = () => setLiked(!liked);

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  };

  const handleMobileProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* BACKGROUND ELEMENTS */}
      <div className="hero-blur blur-1"></div>
      <div className="hero-blur blur-2"></div>

      {/* HERO SECTION WITH INTEGRATED PLAYER */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              A Música Soa
              <br />
              <span className="gradient-text">Melhor Juntos</span>
            </h1>
            <p className="hero-subtitle">
              Descubra, compartilhe e aproveite a música com uma comunidade apaixonada.
              <br />
              Conecte-se com outros amantes da música e explore novos sons juntos.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">Começar Agora</button>
              <button className="btn btn-secondary"onClick={() => navigate("/comunidades")}>
                Explorar Comunidades
              </button>
            </div>
          </div>

          {/* DESKTOP/TABLET MUSIC PLAYER - Hidden on mobile */}
          {!isMobile && (
            <div className="hero-player-container">
              <div className="player-card">
                <div className="player-header">
                  <h3>Tocando agora</h3>
                  <span className="playing-indicator">
                    <GiSoundWaves className="sound-wave" size={20} />
                  </span>
                </div>

                <div className="album-cover">
                  <img src={currentTrack.cover} alt={currentTrack.title} />
                  <div className="playing-anim"></div>
                </div>

                <div className="track-info">
                  <h4>{currentTrack.title}</h4>
                  <p>{currentTrack.artist}</p>
                </div>

                {/* PROGRESS BAR */}
                <div className="progress-container">
                  <span className="time">
                    {formatTime(audioRef.current?.currentTime)}
                  </span>

                  <div className="progress-bar" onClick={handleProgressClick}>
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>

                  <span className="time">
                    {formatTime(audioRef.current?.duration)}
                  </span>
                </div>

                {/* CONTROLS */}
                <div className="player-controls">
                  <button className="control-btn like-btn" onClick={toggleLike}>
                    {liked ? (
                      <FaHeart size={20} style={{ color: "#ec4899" }} />
                    ) : (
                      <FaRegHeart size={20} />
                    )}
                  </button>

                  <button className="control-btn" onClick={prevTrack}>
                    <MdSkipPrevious size={24} />
                  </button>

                  <button className="control-btn play-btn" onClick={togglePlayPause}>
                    {isPlaying ? <IoMdPause size={28} /> : <IoMdPlay size={28} />}
                  </button>

                  <button className="control-btn" onClick={nextTrack}>
                    <MdSkipNext size={24} />
                  </button>

                  <button className="control-btn">
                    <BiVolumeFull size={20} />
                  </button>
                </div>

                {/* VOLUME CONTROL */}
                <div className="volume-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="volume-slider"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MOBILE PLAYER - Fixed at bottom */}
      <div className={`mobile-player-container ${isMobile ? 'active' : ''}`}>
        <div className="mobile-player-content">
          <div className="mobile-album-cover">
            <img src={currentTrack.cover} alt={currentTrack.title} />
          </div>
          
          <div className="mobile-track-info">
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.artist}</p>
          </div>
          
          <div className="mobile-controls">
            <button className="mobile-control-btn like-btn" onClick={toggleLike}>
              {liked ? (
                <FaHeart size={16} style={{ color: "#ec4899" }} />
              ) : (
                <FaRegHeart size={16} />
              )}
            </button>
            
            <button className="mobile-control-btn mobile-play-btn" onClick={togglePlayPause}>
              {isPlaying ? <IoMdPause size={18} /> : <IoMdPlay size={18} />}
            </button>
            
            <button className="mobile-control-btn" onClick={nextTrack}>
              <MdSkipNext size={18} />
            </button>
          </div>
        </div>

        {/* MOBILE PROGRESS BAR */}
        <div className="mobile-progress-container">
          <span className="mobile-time">
            {formatTime(audioRef.current?.currentTime)}
          </span>
          <div className="mobile-progress-bar" onClick={handleMobileProgressClick}>
            <div className="mobile-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="mobile-time">
            {formatTime(audioRef.current?.duration)}
          </span>
        </div>
      </div>

      {/* ACONTECENDO AGORA */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Acontecendo Agora</h2>
          <p className="section-description">Veja o que sua comunidade está ouvindo e descobrindo no momento</p>

          <div className="posts-grid">
            {/* POST 1 - ANA VITÓRIA */}
            <div className="post-card">
              <div className="post-header">
                <div className="avatar">
                  <img src={usuarioAna || "/placeholder.svg"} alt="Ana Vitória" />
                </div>
                <div className="user-info">
                  <h4 className="username">Ana Vitória</h4>
                  <p className="handle">@anavii</p>
                </div>
              </div>
              <p className="post-content">
                Criei uma playlist colaborativa com meus amigos! Qual é sua música favorita para adicionar?
              </p>
              <div className="post-actions">
                <span className="action">
                  <FcLike /> 89
                </span>
                <span className="action">
                  <FaComment /> 34
                </span>
                <span className="action">📤 51</span>
              </div>
            </div>

            {/* POST 2 - LARISSA */}
            <div className="post-card">
              <div className="post-header">
                <div className="avatar">
                  <img src={usuarioLarissa || "/placeholder.svg"} alt="Larissa Camargo" />
                </div>
                <div className="user-info">
                  <h4 className="username">Larissa Camargo</h4>
                  <p className="handle">@lahcamargo</p>
                </div>
              </div>
              <p className="post-content">
                Descobri uma artista incrível no Echo hoje! As composições dela me deixaram sem palavras! 🎶✨
              </p>
              <div className="post-actions">
                <span className="action">
                  <FcLike /> 156
                </span>
                <span className="action">
                  <FaComment /> 67
                </span>
                <span className="action">📤 89</span>
              </div>
            </div>

            {/* POST 3 - MARIANA */}
            <div className="post-card">
              <div className="post-header">
                <div className="avatar">
                  <img src={usuarioMariana || "/placeholder.svg"} alt="Mariana Silva" />
                </div>
                <div className="user-info">
                  <h4 className="username">Mariana Silva</h4>
                  <p className="handle">@masilva</p>
                </div>
              </div>
              <p className="post-content">
                Essa comunidade é sensacional! Conheci pessoas com os mesmos gostos musicais que eu 🎵❤️
              </p>
              <div className="post-actions">
                <span className="action">
                  <FcLike /> 234
                </span>
                <span className="action">
                  <FaComment /> 102
                </span>
                <span className="action">📤 156</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Como Funciona</h2>
          <p className="section-description">Três passos simples para transformar sua experiência musical</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <h3 className="feature-title">Stream & Descubra</h3>
              <p className="feature-description">
                Acesse milhões de músicas com qualidade premium e descubra novos artistas através de recomendações
                inteligentes e sociais.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                </svg>
              </div>
              <h3 className="feature-title">Compartilhe & Conecte</h3>
              <p className="feature-description">
                Compartilhe suas descobertas, crie playlists colaborativas e conecte-se com amigos que têm os mesmos
                gostos musicais.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V11h2.5c.83 0 1.5.67 1.5 1.5V18h2v4H4v-4z" />
                </svg>
              </div>
              <h3 className="feature-title">Experimente Juntos</h3>
              <p className="feature-description">
                Participe de salas de escuta em grupo, sessões de descoberta e viva experiências musicais únicas com a
                comunidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMUNIDADES EM DESTAQUE */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Comunidades em Destaque</h2>
          <p className="section-description">
            Encontre sua tribo musical e descubra novos sons através de comunidades apaixonadas
          </p>

          <div className="communities-grid">
            <div
              className="community-card"
              style={{ background: "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(249, 115, 22, 0.2))" }}
            >
              <div className="community-icon" style={{ background: "linear-gradient(135deg, #dc2626, #f97316)" }}>
                <span>🎸</span>
              </div>
              <h3 className="community-name">Rock Brasileiro</h3>
              <p className="community-members">12.8k membros</p>
              <p className="community-description">Dos clássicos aos novos talentos</p>
              <button className="btn btn-community">Entrar</button>
            </div>

            <div
              className="community-card"
              style={{ background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(168, 85, 247, 0.2))" }}
            >
              <div className="community-icon" style={{ background: "linear-gradient(135deg, #9333ea, #a855f7)" }}>
                <span>🎹</span>
              </div>
              <h3 className="community-name">Indie & Alternativo</h3>
              <p className="community-members">8.3k membros</p>
              <p className="community-description">Descobrindo a próxima geração independente</p>
              <button className="btn btn-community">Entrar</button>
            </div>

            <div
              className="community-card"
              style={{ background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))" }}
            >
              <div className="community-icon" style={{ background: "linear-gradient(135deg, #22c55e, #10b981)" }}>
                <span>🎷</span>
              </div>
              <h3 className="community-name">MPB & Samba</h3>
              <p className="community-members">15.2k membros</p>
              <p className="community-description">A riqueza da música brasileira</p>
              <button className="btn btn-community">Entrar</button>
            </div>

            <div
              className="community-card"
              style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(34, 197, 94, 0.2))" }}
            >
              <div className="community-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
                <span>🎧</span>
              </div>
              <h3 className="community-name">Eletrônica</h3>
              <p className="community-members">9.8k membros</p>
              <p className="community-description">Beats futuristas e sintetizadores</p>
              <button className="btn btn-community">Entrar</button>
            </div>
          </div>

          <div className="section-cta">
            <button className="btn btn-outline">Ver Todas as Comunidades →</button>
          </div>
        </div>
      </section>

      {/* MOMENTOS MUSICAIS COMPARTILHADOS */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Momentos Musicais Compartilhados</h2>
          <p className="section-description">Veja como nossa comunidade está criando conexões através da música</p>

          <div className="testimonials-grid">
            {/* TESTIMONIAL 1 */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">
                  <img src={usuarioCarlos || "/placeholder.svg"} alt="Carlos Abreu" />
                </div>
                <div className="user-info">
                  <h4 className="username">Carlos Abreu</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "Descobrir minha banda favorita através da comunidade do Echo foi incrível! A música realmente soa
                melhor quando compartilhada. Adorei!"
              </p>
            </div>

            {/* TESTIMONIAL 2 */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">
                  <img src={usuarioArthur || "/placeholder.svg"} alt="Rafael Costa" />
                </div>
                <div className="user-info">
                  <h4 className="username">Rafael Costa</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "As sessões colaborativas mudaram completamente como eu ouço música. Conheci amigos incríveis e cada dia
                descubro algo novo!"
              </p>
            </div>

            {/* TESTIMONIAL 3 */}
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="avatar">
                  <img src={Karen || "/placeholder.svg"} alt="Karen Costa" />
                </div>
                <div className="user-info">
                  <h4 className="username">Karen Costa</h4>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="testimonial-text">
                "Como artista independente, encontrei um espaço perfeito para compartilhar minha música e conectar com
                fãs genuínos. Simplesmente maravilhoso!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Pronto para uma Experiência Premium?</h2>
          <p>Desbloqueie músicas ilimitadas, sem anúncios e qualidade de áudio superior</p>
          <button className="btn btn-primary btn-lg">Experimentar Grátis</button>
        </div>
      </section>
    </>
  );
}