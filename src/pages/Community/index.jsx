import { useState } from "react"
import "./Community.css"
import { Heart, MessageCircle, Share2, Play, Plus, Search, Star, TrendingUp, Music, Users, Calendar, ChevronRight } from "lucide-react"

const Communities = () => {
  const [likedPosts, setLikedPosts] = useState({})
  const [playing, setPlaying] = useState(null)
  const [activeTab, setActiveTab] = useState("recentes")

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const togglePlay = (id) => {
    setPlaying(playing === id ? null : id)
  }

  const posts = [
    {
      id: 1,
      user: "João Santos",
      avatar: "🎸",
      time: "1h",
      type: "music",
      title: "Metamorfose",
      artist: "Banda Alternativa",
      cover: "🔥",
      likes: 23,
      comments: 8,
    },
    {
      id: 2,
      user: "Maria Silva",
      avatar: "🎤",
      time: "2h",
      type: "text",
      content: "Qual foi o último show que vocês foram que mudou completamente sua perspectiva musical?",
      replies: [
        { user: "Lucas Ferreira", text: "O show do Tash Sultana no Rock in Rio 2019. Nunca tinha ouvido nada igual!", time: "1h" }
      ],
      likes: 45,
      comments: 12,
    },
    {
      id: 3,
      user: "MPB & Samba",
      avatar: "🥁",
      time: "3h",
      type: "event",
      title: "Roda de Samba Virtual – Quinta-feira às 20h",
      description: "Vamos nos reunir para uma roda de samba especial com participação do sambista João de Volta! Tragam seus instrumentos e vozes para uma noite inesquecível.",
      date: "Quinta, 29 Ago",
      participants: 47,
    }
  ]

  const communities = [
    { id: 1, name: "Rock Brasileiro", icon: "🎸", members: "12.5K membros" },
    { id: 2, name: "Indie & Alternativo", icon: "🌙", members: "8.2K membros" },
    { id: 3, name: "MPB & Samba", icon: "🎶", members: "11.3K membros" },
  ]

  const discoverCommunities = [
    { name: "Eletrônica Brasil", icon: "🎧", description: "Sons eletrônicos, techno, ambient e a cena eletrônica brasileira" },
    { name: "Hip Hop Nacional", icon: "🎤", description: "Rap, trap e toda a cultura hip hop brasileira" },
  ]

  const trending = [
    "#NovoAlbumCaetano", "#RockInRio2025", "#IndieDescoberta", "#SambaModerno"
  ]

  return (
    <div className="communities-container">
      {/* Header */}
      <div className="communities-header">
        <div className="header-background">
          <div className="bg-blob bg-blob1"></div>
          <div className="bg-blob bg-blob2"></div>
          <div className="bg-blob bg-blob3"></div>
        </div>
        <div className="header-content">
          <div className="header-info">
            <h1 className="header-title gradient-text">Suas Comunidades Musicais</h1>
            <p className="header-description">
              Conecte-se com pessoas apaixonadas pelos mesmos sons que você. Descubra, discuta e compartilhe músicas em comunidades vibrantes.
            </p>
          </div>
          <div className="header-actions cta-buttons">
            <button className="btn btn-primary">
              <Plus size={18} /> Criar Nova Comunidade
            </button>
            <button className="btn btn-secondary">
              <Search size={18} /> Explorar Comunidades
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="communities-content section-container">
        {/* Lado Esquerdo - Feed */}
        <div className="content-left">
          <section className="feed-section">
            <div className="section-header">
              <h2 className="section-title"><Music size={24} /> Feed das Comunidades</h2>
              <div className="feed-tabs category-tabs">
                <button
                  className={`category-tab ${activeTab === "recentes" ? "category-tab-active" : ""}`}
                  onClick={() => setActiveTab("recentes")}
                >
                  Recentes
                </button>
                <button
                  className={`category-tab ${activeTab === "populares" ? "category-tab-active" : ""}`}
                  onClick={() => setActiveTab("populares")}
                >
                  Populares
                </button>
              </div>
            </div>

            <div className="posts featured-grid">
              {posts.map(post => (
                <div key={post.id} className="post-card featured-card">
                  <div className="card-gradient gradient-blue-purple"></div>
                  <div className="post-header card-header">
                    <div className="user-info host-info">
                      <span className="avatar host-avatar">{post.avatar}</span>
                      <div className="host-details">
                        <strong className="host-name">{post.user}</strong>
                        <span className="time host-label"> · {post.time}</span>
                      </div>
                    </div>
                  </div>

                  {post.type === "music" && (
                    <div className="music-player current-track">
                      <div className="track-info">
                        <div className="music-cover track-icon">{post.cover}</div>
                        <div className="music-info track-details">
                          <h4 className="track-song">{post.title}</h4>
                          <p className="track-artist">{post.artist}</p>
                        </div>
                        <button
                          className={`play-btn`}
                          onClick={() => togglePlay(post.id)}
                        >
                          <Play size={20} fill={playing === post.id ? "white" : "none"} />
                        </button>
                      </div>
                    </div>
                  )}

                  {post.type === "text" && (
                    <div className="post-content card-description">
                      <p>{post.content}</p>
                      {post.replies && post.replies.map((r, i) => (
                        <div key={i} className="reply">
                          <strong>{r.user}</strong>: {r.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {post.type === "event" && (
                    <div className="event-card">
                      <h4 className="card-title">{post.title}</h4>
                      <p className="card-description">{post.description}</p>
                      <div className="event-meta card-footer">
                        <span><Calendar size={14} /> {post.date}</span>
                        <span><Users size={14} /> {post.participants} confirmados</span>
                      </div>
                    </div>
                  )}

                  <div className="post-actions card-footer">
                    <button
                      className={`action-btn heart-icon ${likedPosts[post.id] ? 'heart-hovered' : ''}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart size={18} fill={likedPosts[post.id] ? "#ff4444" : "none"} />
                      <span>{post.likes + (likedPosts[post.id] ? 1 : 0)}</span>
                    </button>
                    <button className="action-btn">
                      <MessageCircle size={18} />
                      <span>{post.comments}</span>
                    </button>
                    <button className="action-btn">
                      <Share2 size={18} />
                    </button>
                    {post.type === "event" && (
                      <>
                        <button className="btn-participate enter-btn gradient-blue-purple">Participar</button>
                        <button className="btn-listen enter-btn gradient-purple-pink">
                          <Music size={16} /> Escutar ao Vivo
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="load-more-container">
              <button className="load-more load-more-btn">Carregar Mais Posts</button>
            </div>
          </section>
        </div>

        {/* Lado Direito - Sidebar */}
        <div className="content-right">
          {/* Minhas Comunidades */}
          <section className="sidebar-section category-section">
            <h3 className="section-title"><Users size={20} /> Minhas Comunidades</h3>
            <div className="category-grid">
              {communities.map(c => (
                <div key={c.id} className="community-item category-card">
                  <span className="community-icon category-card-header">{c.icon}</span>
                  <div>
                    <div className="community-name category-card-title">{c.name}</div>
                    <div className="community-members category-card-description">{c.members}</div>
                  </div>
                  <ChevronRight size={16} />
                </div>
              ))}
            </div>
            <button className="view-all view-all-btn">Ver Todas</button>
          </section>

          {/* Descubra Comunidades */}
          <section className="sidebar-section">
            <h3 className="section-title"><Search size={20} /> Descubra Comunidades</h3>
            {discoverCommunities.map((dc, i) => (
              <div key={i} className="discover-item category-card">
                <div className="discover-icon">{dc.icon}</div>
                <div>
                  <div className="category-card-title">{dc.name}</div>
                  <div className="category-card-description">{dc.description}</div>
                </div>
                <button className="join-btn category-enter-btn">Entrar</button>
              </div>
            ))}
          </section>

          {/* Tópicos em Alta */}
          <section className="sidebar-section">
            <h3 className="section-title"><TrendingUp size={20} /> Tópicos em Alta</h3>
            <div className="trending-list">
              {trending.map((topic, i) => (
                <div key={i} className="trending-item">
                  <TrendingUp size={14} />
                  <span>{topic}</span>
                  <span className="posts-count">{Math.floor(Math.random() * 1000) + 100} posts</span>
                </div>
              ))}
            </div>
          </section>

          {/* Desafio da Semana */}
          <section className="challenge-section feature-card">
            <div className="challenge-header">
              <Star size={20} />
              <h3 className="feature-title">Desafio da Semana</h3>
            </div>
            <p className="feature-description">Compartilhe uma música que representa seu estado emocional atual</p>
            <button className="btn-challenge enter-btn gradient-cyan-blue">Participar</button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Communities