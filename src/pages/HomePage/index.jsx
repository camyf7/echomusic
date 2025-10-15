import React from 'react';
import './HomePage.css';
import usarioKaren from '../../assets/usario_karen.png';
import usuarioAna from '../../assets/usuario_ana_vitoria.png';
import usuarioLarissa from '../../assets/usuario_larissa.png';
import usuarioMariana from '../../assets/usario_mariana.png';
import usuarioCarlos from '../../assets/usuario_carlos.jpeg';
import usuarioArthur from '../../assets/usuario_arthur.jpeg';




export default function HomePage() {
    return (
      <div className="main-container">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">
            A Música Soa Melhor
            <br />
            <span className="hero-title-accent">Juntos</span>
          </h1>
  
          <p className="hero-description">
            Descubra, compartilhe e aproveite a música com uma comunidade apaixonada. Conecte-se com outros amantes da
            música e explore novos sons juntos.
          </p>
  
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large">Começar Agora</button>
            <button className="btn btn-outline btn-large">Explorar Comunidades</button>
          </div>
  
          {/* Music Player */}
          <div className="music-player">
            <div className="player-info">
              <div className="album-cover">
                <svg className="album-icon" fill="currentColor" viewBox="0 0 24 24">
                  
                </svg>
              </div>
              <div className="song-info">
                <h3 className="song-title">Die With A Smile</h3>
                <p className="song-artist">Lady Gaga, Bruno Mars</p>
              </div>
              <svg className="heart-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
  
            <div className="player-controls">
              <svg className="control-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
              <div className="play-button">
                <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <svg className="control-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </div>
  
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
  
            <div className="time-info">
              <span>1:23</span>
              <span>3:45</span>
            </div>
          </div>
        </section>
  
        {/* Acontecendo Agora */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Acontecendo Agora</h2>
            <p className="section-description">Veja o que nossa comunidade está ouvindo e compartilhando neste momento</p>
  
            <div className="posts-grid">
              <div className="post-card">
                <div className="post-header">
                  <div className="avatar">
                  <img src={usuarioAna} alt="Ana" />
                  </div>
                  <div className="user-info">
                    <h4 className="username">Ana Vitória</h4>
                    <p className="handle">@anavii</p>
                  </div>
                </div>
                <p className="post-content">Acabei de descobrir essa música incrível! 🎵</p>
                <div className="post-actions">
                  <span className="action">
                    <svg className="action-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>24</span>
                  </span>
                  <span className="action">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>8</span>
                  </span>
                  <span className="action">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    <span>3</span>
                  </span>
                </div>
              </div>
  
              <div className="post-card">
                <div className="post-header">
                  <div className="avatar">
                  <img src={usuarioLarissa} alt="Larissa" />
                  </div>
                  <div className="user-info">
                    <h4 className="username">Larissa Camargo</h4>
                    <p className="handle">@lahcamargo</p>
                  </div>
                </div>
                <p className="post-content">Playlist perfeita para estudar 📚✨</p>
                <div className="post-actions">
                  <span className="action">
                    <svg className="action-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>18</span>
                  </span>
                  <span className="action">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>5</span>
                  </span>
                  <span className="action">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    <span>2</span>
                  </span>
                </div>
              </div>
  
              <div className="post-card">
                <div className="post-header">
                  <div className="avatar">
                  <img src={usuarioMariana} alt="Mariana" />
                  </div>
                  <div className="user-info">
                    <h4 className="username">Mariana Silva</h4>
                    <p className="handle">@masilva</p>
                  </div>
                </div>
                <p className="post-content">Novo álbum saiu hoje! Quem mais está ouvindo? 🎶</p>
                <div className="post-actions">
                  <span className="action">
                    <svg className="action-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>32</span>
                  </span>
                  <span className="action">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span>12</span>
                  </span>
                  <span className="action">
                    <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    <span>7</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Como Funciona */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Como Funciona</h2>
            <p className="section-description">Três passos simples para começar sua jornada musical conosco</p>
  
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon purple-blue">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-.83.67-1.5 1.5-1.5S12 9.67 12 10.5V11h2.5c.83 0 1.5.67 1.5 1.5V18h2v4H4v-4z" />
                  </svg>
                </div>
                <h3 className="feature-title">Junte-se à Comunidade</h3>
                <p className="feature-description">
                  Crie sua conta e conecte-se com milhares de amantes da música ao redor do mundo
                </p>
              </div>
  
              <div className="feature-card">
                <div className="feature-icon pink-purple">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <h3 className="feature-title">Compartilhe Música</h3>
                <p className="feature-description">
                  Descubra novas músicas, crie playlists e compartilhe suas descobertas com a comunidade
                </p>
              </div>
  
              <div className="feature-card">
                <div className="feature-icon blue-cyan">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
                  </svg>
                </div>
                <h3 className="feature-title">Ouça Juntos</h3>
                <p className="feature-description">
                  Participe de sessões de escuta em grupo e descubra música através dos outros
                </p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Comunidades em Destaque */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Comunidades em Destaque</h2>
            <p className="section-description">Junte-se às comunidades mais ativas e descubra novos gêneros musicais</p>
  
            <div className="communities-grid">
              <div className="community-card purple-blue-bg">
                <div className="community-icon purple-blue">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <h3 className="community-name">Pop</h3>
                <p className="community-members">15.2k membros</p>
                <p className="community-description">Os maiores hits do pop mundial</p>
              </div>
  
              <div className="community-card red-orange-bg">
                <div className="community-icon red-orange">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <h3 className="community-name">Rock</h3>
                <p className="community-members">12.8k membros</p>
                <p className="community-description">Do clássico ao moderno</p>
              </div>
  
              <div className="community-card green-teal-bg">
                <div className="community-icon green-teal">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <h3 className="community-name">Hip Hop</h3>
                <p className="community-members">9.5k membros</p>
                <p className="community-description">Cultura urbana e beats</p>
              </div>
  
              <div className="community-card yellow-orange-bg">
                <div className="community-icon yellow-orange">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
                <h3 className="community-name">Jazz</h3>
                <p className="community-members">7.3k membros</p>
                <p className="community-description">Improvisação e sofisticação</p>
              </div>
            </div>
  
            <div className="section-cta">
              <button className="btn btn-outline">Ver Todas as Comunidades</button>
            </div>
          </div>
        </section>
  
        {/* Momentos Musicais Compartilhados */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Momentos Musicais Compartilhados</h2>
            <p className="section-description">
              Veja o que nossa comunidade está dizendo sobre suas experiências musicais
            </p>
  
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar">
                  <img src={usuarioCarlos} alt="Carlos" />
                  </div>
                  <div className="user-info">
                    <h4 className="username">Carlos Abreu</h4>
                    <div className="stars">
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Incrível como consegui descobrir tantas músicas novas através da comunidade. A experiência de ouvir
                  música junto com outras pessoas é única!"
                </p>
              </div>
  
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar">
                  <img src={usuarioArthur} alt="Arthur" />
                  </div>
                  <div className="user-info">
                    <h4 className="username">Rafael Costa</h4>
                    <div className="stars">
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">
                  "As playlists colaborativas são fantásticas! Consegui conhecer pessoas com gostos musicais similares e
                  fazer grandes amizades."
                </p>
              </div>
  
              <div className="testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar">
                  <img src={usarioKaren} alt="Karen Costa" />
                  </div>
                  <div className="user-info">
                    <h4 className="username">Karen Costa</h4>
                    <div className="stars">
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <svg className="star" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="testimonial-text">
                  "Como artista independente, encontrei aqui um espaço incrível para compartilhar minha música e receber
                  feedback genuíno da comunidade."
                </p>
              </div>
            </div>
          </div>
        </section>
  
      </div>
    )
  }