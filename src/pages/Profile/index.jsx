"use client";

import { useState } from "react";
import "./Profile.css";
import users from "../../assets/users.jpg";
import ocean from "../../assets/musica_ocean.jpeg";
import pedro from "../../assets/usario_pedro.jpeg";
import isabelle from "../../assets/usario_isabelle.png";
import papoulas from "../../assets/musica_papoulas.png";
import sera from "../../assets/musica_sera.jpeg";
import { Link } from "react-router-dom";


const Profile = () => {
  const [activeTab, setActiveTab] = useState("atividade");
  const [privacySettings, setPrivacySettings] = useState({
    perfilPublico: true,
    atividadeVisivel: true,
    playlistsPublicas: false,
  });

  // Dados do usuário (agora com estado para foto editável)
  const [userData, setUserData] = useState({
    name: "User@07",
    username: "@user.com",
    memberSince: "Membro desde x",
    bio: "altere sua bio nas configurações de edição de perfil.",
    avatar: users,
    stats: {
      playlists: "1.2K",
      horasOuvidas: "23",
      seguidores: "156",
    },
  });

  // Função para trocar foto de perfil
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacySettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  // Atividades recentes
  const recentActivities = [
    { id: 1, type: "playlist", title: "Criou uma nova playlist", subtitle: "Domingo Chill", time: "há 2 horas", details: "15 músicas • 1h 30min", icon: "🎵" },
    { id: 2, type: "like", title: "Curtiu uma música", subtitle: "EudiRicris", time: "há 5 horas", details: "Chillsteps & Xanax", icon: "❤️" },
    { id: 3, type: "follow", title: "Seguiu um novo artista", subtitle: "Luisa Sonza", time: "há 1 dia", details: "Artista • 2.3M ouvintes mensais", icon: "👤" },
  ];

  // DNA Musical
  const musicalDNA = [
    { genre: "Rock Nacional", percentage: 92, color: "#8B5CF6" },
    { genre: "MPB", percentage: 78, color: "#EC4899" },
    { genre: "Sertanejo", percentage: 65, color: "#3B82F6" },
    { genre: "Pop", percentage: 51, color: "#10B981" },
  ];

  // Conexões Musicais
  const musicalConnections = {
    friends: [
      { name: "Maria Silva", avatar: isabelle, commonGenres: "Amiga em comum" },
      { name: "João Santos", avatar: pedro, commonGenres: "Amigo em comum" },
    ],
    collaborativePlaylists: [
      { name: "Road Trip 2024", creator: "Você e Maria • 45 músicas", avatar: papoulas },
      { name: "Festa de Aniversário", creator: "Você e 3 amigos • 67 músicas", avatar: sera },
    ],
  };

  // Conquistas
  const achievements = [
    { id: 1, name: "Descobridor Musical", description: "Criou 5 playlists diferentes", icon: "🎧", unlocked: true },
    { id: 2, name: "Fã Assíduo", description: "Ouviu 10 artistas diferentes em uma semana", icon: "⭐", unlocked: true },
    { id: 3, name: "Curador de Hits", description: "Compartilhou 20 músicas com amigos", icon: "📱", unlocked: false },
    { id: 4, name: "Maratonista Musical", description: "Ouviu música por 24h seguidas", icon: "🎵", unlocked: false },
  ];

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="wave-background"></div>
        <div className="profile-header-content">
          <div className="profile-info">
            <div className="profile-avatar-wrapper">
              <label htmlFor="avatar-upload" className="profile-avatar">
                <img src={userData.avatar} alt="Avatar do usuário" />
                <div className="change-avatar-overlay">Trocar foto</div>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
              <div className="online-indicator"></div>
            </div>

            <div className="profile-details">
              <h1 className="profile-name">{userData.name}</h1>
              <p className="profile-username">
                {userData.username} • {userData.memberSince}
              </p>
              <p className="profile-bio">{userData.bio}</p>

              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-value">{userData.stats.playlists}</span>
                  <span className="stat-label">Playlists</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">{userData.stats.horasOuvidas}</span>
                  <span className="stat-label">Horas Ouvidas</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-value">{userData.stats.seguidores}</span>
                  <span className="stat-label">Seguidores</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions">
  <Link to="/editprofile" className="btn-primary">
    Editar Perfil
  </Link>
  <button className="btn-secondary">Compartilhar</button>
</div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="profile-content">
        {/* Lado Esquerdo */}
        <div className="content-left">
          {/* Atividade Recente */}
          <section className="section">
            <div className="section-header">
              <h2>Atividade Recente</h2>
              <a href="#" className="link-primary">Ver Tudo</a>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <div className="activity-main">
                      <span className="activity-title">{activity.title}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    <p className="activity-subtitle">{activity.subtitle}</p>
                    <p className="activity-details">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conexões Musicais */}
          <section className="section">
            <div className="section-header">
              <h2>Conexões Musicais</h2>
              <a href="#" className="link-primary">Ver Todos</a>
            </div>
            <div className="connections-section">
              <h3 className="subsection-title">AMIGOS EM COMUM</h3>
              <div className="friends-list">
                {musicalConnections.friends.map((friend, index) => (
                  <div key={index} className="friend-item">
                    <div className="friend-avatar">
                      <img src={friend.avatar} alt={friend.name} />
                    </div>
                    <div className="friend-info">
                      <p className="friend-name">{friend.name}</p>
                      <p className="friend-common">{friend.commonGenres}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="subsection-title">PLAYLISTS COLABORATIVAS</h3>
              <div className="collaborative-playlists">
                {musicalConnections.collaborativePlaylists.map((playlist, index) => (
                  <div key={index} className="collaborative-item">
                    <div className="collaborative-cover">
                      <img src={playlist.avatar} alt={playlist.name} />
                    </div>
                    <div className="collaborative-info">
                      <p className="collaborative-name">{playlist.name}</p>
                      <p className="collaborative-creator">{playlist.creator}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Lado Direito */}
        <div className="content-right">
          {/* Meu DNA Musical */}
          <section className="dna-section">
            <h2>Meu DNA Musical</h2>
            {musicalDNA.map((item, index) => (
              <div key={index} className="genre-item">
                <div className="genre-info">
                  <span className="genre-name">{item.genre}</span>
                  <span className="genre-percentage">{item.percentage}%</span>
                </div>
                <div className="genre-bar">
                  <div
                    className="genre-progress"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </section>

          {/* Conquistas */}
          <section className="achievements-section">
            <h2>Conquistas</h2>
            <div className="achievements-grid">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`achievement-item ${achievement.unlocked ? "unlocked" : "locked"}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-info">
                    <p className="achievement-name">{achievement.name}</p>
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Configurações de Privacidade */}
          <section className="privacy-section">
            <h2>Configurações de Privacidade</h2>
            <div className="privacy-settings">
              {Object.entries(privacySettings).map(([key, value]) => {
                const titleMap = {
                  perfilPublico: "Perfil Público",
                  atividadeVisivel: "Atividade Visível",
                  playlistsPublicas: "Playlists Públicas",
                };
                const descriptionMap = {
                  perfilPublico: "Permitir que outros vejam seu perfil",
                  atividadeVisivel: "Mostrar o que você está ouvindo",
                  playlistsPublicas: "Permitir descoberta das suas playlists",
                };
                return (
                  <div key={key} className="privacy-item">
                    <div className="privacy-info">
                      <p className="privacy-title">{titleMap[key]}</p>
                      <p className="privacy-description">{descriptionMap[key]}</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handlePrivacyToggle(key)}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
