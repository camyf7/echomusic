// src/pages/Rooms/index.jsx
import React, { useState, useEffect } from "react";
import { Music, Users, Sparkles, Radio, Mic2, Heart, Play, Volume2 } from "lucide-react";
import { Button } from "../../components/button";

import "./Rooms.css";

const categories = ["Todas", "Rock", "Eletrônica", "MPB", "Hip Hop", "Indie", "Jazz"]

const featuredRooms = [
  {
    id: 1,
    title: "🎸 Rock Nacional dos Anos 80",
    description: "Uma viagem nostálgica pelos clássicos do rock brasileiro",
    category: "Rock",
    tag: "DESTAQUE",
    tagColor: "purple",
    host: { name: "RockMaster", avatar: "🎸" },
    listeners: 127,
    currentTrack: { name: "Legião Urbana", song: "Será" },
    gradient: "blue-purple",
  },
  {
    id: 2,
    title: "🎵 Lançamento: Novo Álbum Indie",
    description: "Primeira audição do novo álbum com o artista presente",
    category: "Indie",
    tag: "EVENTO",
    tagColor: "pink",
    host: { name: "Luna Silva", avatar: "🎤" },
    listeners: 89,
    currentTrack: { name: "Midnight Dreams", song: "Luna Silva" },
    gradient: "purple-pink",
  },
  {
    id: 3,
    title: "💿 Deep House Vibes",
    description: "Set exclusivo de deep house para relaxar e curtir",
    category: "Eletrônica",
    tag: "DJ SET",
    tagColor: "cyan",
    host: { name: "DJ Cosmos", avatar: "🎧" },
    listeners: 203,
    currentTrack: { name: "Ocean Waves", song: "DJ Cosmos" },
    gradient: "cyan-blue",
  },
]

const categoryRooms = [
  {
    id: 4,
    title: "🎤 Sertanejo Universitário",
    description: "Os maiores hits do momento",
    host: "CarlosMusic",
    listeners: 45,
    category: "Todas",
  },
  {
    id: 5,
    title: "🎹 Indie Brasileiro",
    description: "Descobrindo novos talentos",
    host: "Marlinde",
    listeners: 23,
    category: "Indie",
  },
  {
    id: 6,
    title: "🎸 Karaokê Virtual",
    description: "Cante junto com a galera",
    host: "ArthurSing",
    listeners: 67,
    category: "Todas",
  },
  {
    id: 7,
    title: "🎷 Jazz & Blues",
    description: "Clássicos atemporais",
    host: "RichardMaster",
    listeners: 12,
    category: "Jazz",
  },
]

export default function SalasAoVivo() {
  const [activeCategory, setActiveCategory] = useState("Todas")
  const [liveStats, setLiveStats] = useState({ rooms: 1247, listeners: 23891 })
  const [hoveredRoom, setHoveredRoom] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        rooms: prev.rooms + Math.floor(Math.random() * 3) - 1,
        listeners: prev.listeners + Math.floor(Math.random() * 20) - 10,
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filteredRooms = categoryRooms.filter((room) => activeCategory === "Todas" || room.category === activeCategory)

  return (
    <div className="rooms-container">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Animated background elements */}
        <div className="hero-background">
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
        </div>

        <div className="hero-content">
          <div className="live-badge">
            <Radio className="live-icon" />
            <span>Ao Vivo Agora</span>
          </div>

          <h1 className="hero-title">
            Salas ao <span className="gradient-text">Vivo</span>
          </h1>

          <p className="hero-description">
            Experimente música junto com amigos e comunidades do mundo todo. Ouça, converse e descubra em tempo real.
          </p>

          {/* Live Stats */}
          <div className="live-stats">
            <div className="stat-item">
              <div className="pulse-dot" />
              <span className="stat-number">{liveStats.rooms.toLocaleString()}</span>
              <span className="stat-label">salas ativas</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <Users className="stat-icon" />
              <span className="stat-number stat-number-secondary">{liveStats.listeners.toLocaleString()}</span>
              <span className="stat-label">ouvintes online</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="btn btn-primary">
              <Sparkles className="btn-icon" />
              Criar Sala Agora
            </button>
            <button className="btn btn-secondary">
              <Radio className="btn-icon" />
              Entrar Aleatoriamente
            </button>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              <Sparkles className="title-icon" />
              Salas em Destaque
            </h2>
            <button className="view-all-btn">Ver Todas →</button>
          </div>

          <div className="featured-grid">
            {featuredRooms.map((room, index) => (
              <div
                key={room.id}
                className={`featured-card featured-card-${index + 1}`}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <div className={`card-gradient gradient-${room.gradient}`} />

                <div className="card-header">
                  <span className={`room-tag tag-${room.tagColor}`}>
                    <Radio className="tag-icon" />
                    {room.tag}
                  </span>
                  <Heart className={`heart-icon ${hoveredRoom === room.id ? "heart-hovered" : ""}`} />
                </div>

                <h3 className="card-title">{room.title}</h3>
                <p className="card-description">{room.description}</p>

                <div className="current-track">
                  <div className="track-info">
                    <div className="track-icon">
                      <Music />
                    </div>
                    <div className="track-details">
                      <div className="track-song">{room.currentTrack.song}</div>
                      <div className="track-artist">{room.currentTrack.name}</div>
                    </div>
                    <Volume2 className="volume-icon" />
                  </div>
                </div>

                <div className="card-footer">
                  <div className="host-info">
                    <div className="host-avatar">{room.host.avatar}</div>
                    <div className="host-details">
                      <div className="host-label">Host</div>
                      <div className="host-name">{room.host.name}</div>
                    </div>
                  </div>
                  <div className="listeners-count">
                    <Users className="listeners-icon" />
                    <span>{room.listeners}</span>
                  </div>
                </div>

                <button className={`enter-btn gradient-${room.gradient}`}>
                  <Play className="enter-icon" />
                  Entrar na Sala
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="category-section">
        <div className="section-container">
          <h2 className="section-title-center">Explore por Categoria</h2>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-tab ${activeCategory === category ? "category-tab-active" : ""}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="category-grid">
            {filteredRooms.map((room, index) => (
              <div key={room.id} className={`category-card category-card-${index + 1}`}>
                <div className="category-card-header">
                  <div className="active-badge">
                    <div className="active-dot" />
                    <span>ATIVA</span>
                  </div>
                  <Users className="card-users-icon" />
                </div>

                <h3 className="category-card-title">{room.title}</h3>
                <p className="category-card-description">{room.description}</p>

                <div className="category-card-footer">
                  <div className="host-mini">
                    <Mic2 className="mic-icon" />
                    <span>{room.host}</span>
                  </div>
                  <span className="listeners-mini">{room.listeners}</span>
                </div>

                <button className="category-enter-btn">Entrar</button>
              </div>
            ))}
          </div>

          <div className="load-more-container">
            <button className="load-more-btn">Carregar Mais Salas</button>
          </div>
        </div>
      </section>

      {/* Create Your Own Room */}
      <section className="create-section">
        <div className="create-container">
          <h2 className="create-title">Crie Sua Própria Sala</h2>
          <p className="create-description">
            Seja o host da sua experiência musical. Crie uma sala personalizada, convide amigos e compartilhe suas
            músicas favoritas em tempo real.
          </p>

          <div className="features-grid">
            <div className="feature-card feature-card-1">
              <div className="feature-icon feature-icon-blue">
                <Music />
              </div>
              <h3 className="feature-title">Controle Total</h3>
              <p className="feature-description">Gerencie a playlist, moderação e configurações da sala</p>
            </div>

            <div className="feature-card feature-card-2">
              <div className="feature-icon feature-icon-purple">
                <Users />
              </div>
              <h3 className="feature-title">Convide Amigos</h3>
              <p className="feature-description">Compartilhe facilmente e construa sua comunidade musical</p>
            </div>

            <div className="feature-card feature-card-3">
              <div className="feature-icon feature-icon-pink">
                <Sparkles />
              </div>
              <h3 className="feature-title">Temas Personalizados</h3>
              <p className="feature-description">Escolha temas, cores e configure a experiência perfeita</p>
            </div>
          </div>

          <button className="create-cta-btn">
            <Sparkles className="create-icon" />
            Criar Minha Sala Agora
          </button>
        </div>
      </section>
    </div>
  )
}
