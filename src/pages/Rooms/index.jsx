// src/pages/Rooms/index.jsx
import React, { useState, useEffect } from "react";
import { Music, Users, Sparkles, Radio, Mic2, Heart, Play, Volume2 } from "lucide-react";
import { Button } from "../../components/button";


import styles from "./Rooms.module.css"

const RadioIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="2" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
  </svg>
)

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const SparklesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4M3 5h4M6 17v4M4 19h4" />
  </svg>
)

const MusicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const PlayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const Volume2Icon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
)

const Mic2Icon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
  </svg>
)

const SlidersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="2" x2="6" y1="14" y2="14" />
    <line x1="10" x2="14" y1="8" y2="8" />
    <line x1="18" x2="22" y1="16" y2="16" />
  </svg>
)

const PaletteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
)

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
    <div className={styles.roomsContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Animated background elements */}
        <div className={styles.heroBackground}>
          <div className={`${styles.bgBlob} ${styles.bgBlob1}`} />
          <div className={`${styles.bgBlob} ${styles.bgBlob2}`} />
          <div className={`${styles.bgBlob} ${styles.bgBlob3}`} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.liveBadge}>
            <RadioIcon />
            <span>Ao Vivo Agora</span>
          </div>

          <h1 className={styles.heroTitle}>
            Salas ao <span className={styles.gradientText}>Vivo</span>
          </h1>

          <p className={styles.heroDescription}>
            Experimente música junto com amigos e comunidades do mundo todo. Ouça, converse e descubra em tempo real.
          </p>

          {/* Live Stats */}
          <div className={styles.liveStats}>
            <div className={styles.statItem}>
              <div className={styles.pulseDot} />
              <span className={styles.statNumber}>{liveStats.rooms.toLocaleString()}</span>
              <span className={styles.statLabel}>salas ativas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <UsersIcon />
              <span className={`${styles.statNumber} ${styles.statNumberSecondary}`}>
                {liveStats.listeners.toLocaleString()}
              </span>
              <span className={styles.statLabel}>ouvintes online</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <button className={`${styles.btn} ${styles.btnPrimary}`}>
              <SparklesIcon />
              Criar Sala Agora
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>
              <RadioIcon />
              Entrar Aleatoriamente
            </button>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <SparklesIcon />
              Salas em Destaque
            </h2>
            <button className={styles.viewAllBtn}>Ver Todas →</button>
          </div>

          <div className={styles.featuredGrid}>
            {featuredRooms.map((room, index) => (
              <div
                key={room.id}
                className={`${styles.featuredCard} ${styles[`featuredCard${index + 1}`]}`}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
              >
                <div
                  className={`${styles.cardGradient} ${
                    styles[
                      `gradient${room.gradient
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join("")}`
                    ]
                  }`}
                />

                <div className={styles.cardHeader}>
                  <span
                    className={`${styles.roomTag} ${styles[`tag${room.tagColor.charAt(0).toUpperCase() + room.tagColor.slice(1)}`]}`}
                  >
                    <RadioIcon />
                    {room.tag}
                  </span>
                  <div className={`${styles.heartIcon} ${hoveredRoom === room.id ? styles.heartHovered : ""}`}>
                    <HeartIcon filled={hoveredRoom === room.id} />
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{room.title}</h3>
                <p className={styles.cardDescription}>{room.description}</p>

                <div className={styles.currentTrack}>
                  <div className={styles.trackInfo}>
                    <div className={styles.trackIcon}>
                      <MusicIcon />
                    </div>
                    <div className={styles.trackDetails}>
                      <div className={styles.trackSong}>{room.currentTrack.song}</div>
                      <div className={styles.trackArtist}>{room.currentTrack.name}</div>
                    </div>
                    <Volume2Icon />
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.hostInfo}>
                    <div className={styles.hostAvatar}>{room.host.avatar}</div>
                    <div className={styles.hostDetails}>
                      <div className={styles.hostLabel}>Host</div>
                      <div className={styles.hostName}>{room.host.name}</div>
                    </div>
                  </div>
                  <div className={styles.listenersCount}>
                    <UsersIcon />
                    <span>{room.listeners}</span>
                  </div>
                </div>

                <button
                  className={`${styles.enterBtn} ${
                    styles[
                      `gradient${room.gradient
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join("")}`
                    ]
                  }`}
                >
                  <PlayIcon />
                  Entrar na Sala
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className={styles.categorySection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitleCenter}>Explore por Categoria</h2>

          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`${styles.categoryTab} ${activeCategory === category ? styles.categoryTabActive : ""}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.categoryGrid}>
            {filteredRooms.map((room, index) => (
              <div key={room.id} className={`${styles.categoryCard} ${styles[`categoryCard${index + 1}`]}`}>
                <div className={styles.categoryCardHeader}>
                  <div className={styles.activeBadge}>
                    <div className={styles.activeDot} />
                    <span>ATIVA</span>
                  </div>
                  <UsersIcon />
                </div>

                <h3 className={styles.categoryCardTitle}>{room.title}</h3>
                <p className={styles.categoryCardDescription}>{room.description}</p>

                <div className={styles.categoryCardFooter}>
                  <div className={styles.hostMini}>
                    <Mic2Icon />
                    <span>{room.host}</span>
                  </div>
                  <span className={styles.listenersMini}>{room.listeners}</span>
                </div>

                <button className={styles.categoryEnterBtn}>Entrar</button>
              </div>
            ))}
          </div>

          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreBtn}>Carregar Mais Salas</button>
          </div>
        </div>
      </section>

      {/* Create Your Own Room */}
      <section className={styles.createSection}>
        <div className={styles.createContainer}>
          <h2 className={styles.createTitle}>Crie Sua Própria Sala</h2>
          <p className={styles.createDescription}>
            Seja o host da sua experiência musical. Crie uma sala personalizada, convide amigos e compartilhe suas
            músicas favoritas em tempo real.
          </p>

          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} ${styles.featureCard1}`}>
              <div className={`${styles.featureIcon} ${styles.featureIconBlue}`}>
                <SlidersIcon />
              </div>
              <h3 className={styles.featureTitle}>Controle Total</h3>
              <p className={styles.featureDescription}>Gerencie a playlist, moderação e configurações da sala</p>
            </div>

            <div className={`${styles.featureCard} ${styles.featureCard2}`}>
              <div className={`${styles.featureIcon} ${styles.featureIconPurple}`}>
                <UsersIcon />
              </div>
              <h3 className={styles.featureTitle}>Convide Amigos</h3>
              <p className={styles.featureDescription}>Compartilhe facilmente e construa sua comunidade musical</p>
            </div>

            <div className={`${styles.featureCard} ${styles.featureCard3}`}>
              <div className={`${styles.featureIcon} ${styles.featureIconPink}`}>
                <PaletteIcon />
              </div>
              <h3 className={styles.featureTitle}>Temas Personalizados</h3>
              <p className={styles.featureDescription}>Escolha temas, cores e configure a experiência perfeita</p>
            </div>
          </div>

          <button className={styles.createCtaBtn}>
            <SparklesIcon />
            Criar Minha Sala Agora
          </button>
        </div>
      </section>
    </div>
  )
}
