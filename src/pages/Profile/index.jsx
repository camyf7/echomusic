"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import rock from "../../assets/rock.jpg";
import noiteromantica from "../../assets/noiteromantica.jpg";
import domingo from "../../assets/domingo.jpg";

import "./Profile.css";

import placeholderAvatar from "../../assets/users.jpg";
import mariana from "../../assets/usario_mariana.png";
import pedro from "../../assets/usario_pedro.jpeg";

export default function Profile() {
  // ===========================
  // PRIVACIDADE
  // ===========================
  const [privacySettings, setPrivacySettings] = useState({
    perfilPublico: true,
    atividadeVisivel: true,
    playlistsPublicas: false,
  });

  // ===========================
  // DADOS DO USUÁRIO
  // ===========================
  const [userData, setUserData] = useState({
    name: "Usuário",
    username: "@user",
    email: "",
    memberSince: "Membro desde 2025",
    bio: "Adicione uma bio personalizada no seu perfil ✨",
    avatar: "",
    banner: "",
    bannerUpdatedAt: 0,
    stats: { playlists: 0, horasOuvidas: 0, seguidores: 0 },
  });

  const [isLoadingBanner, setIsLoadingBanner] = useState(false);

  // ===========================
  // Storage Key
  // ===========================
  const getProfileKey = () => {
    const googleUserRaw = localStorage.getItem("googleUser");
    if (googleUserRaw) {
      try {
        const googleUser = JSON.parse(googleUserRaw);
        if (googleUser?.email) return `profile_${googleUser.email}`;
      } catch {}
    }
    return "userProfile";
  };

  // ===========================
  // Compressão de imagens
  // ===========================
  const compressImage = async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const compressed = canvas.toDataURL("image/webp", 0.75);
        resolve(compressed);
      };
      img.onerror = () => resolve(dataUrl);
      img.src = dataUrl;
    });
  };

  // ===========================
  // Load inicial do perfil
  // ===========================
  useEffect(() => {
    const key = getProfileKey();
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        setUserData(JSON.parse(saved));
        return;
      } catch {}
    }

    const googleUserRaw = localStorage.getItem("googleUser");
    if (googleUserRaw) {
      try {
        const googleUser = JSON.parse(googleUserRaw);
        const newProfile = {
          name: googleUser.name || "Usuário",
          username: `@${(googleUser.email || "user").split("@")[0]}`,
          email: googleUser.email || "",
          memberSince: "Membro desde 2025",
          bio: "Olá, este é meu perfil 🎧",
          avatar: googleUser.photoURL || "",
          banner: "",
          bannerUpdatedAt: 0,
          stats: { playlists: 12, horasOuvidas: 42, seguidores: 156 },
        };
        setUserData(newProfile);
        localStorage.setItem(key, JSON.stringify(newProfile));
      } catch {}
    }
  }, []);

  // ===========================
  // Sincronização entre abas
  // ===========================
  useEffect(() => {
    const onStorage = (e) => {
      const key = getProfileKey();
      if (e.key === key && e.newValue) {
        try {
          setUserData(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ===========================
  // Persistência do perfil
  // ===========================
  const persistProfile = (updatedProfile) => {
    setUserData(updatedProfile);
    const key = updatedProfile.email ? `profile_${updatedProfile.email}` : getProfileKey();

    try {
      localStorage.setItem(key, JSON.stringify(updatedProfile));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue: JSON.stringify(updatedProfile),
        })
      );
    } catch (err) {
      if (err.name === "QuotaExceededError") {
        try {
          const keys = Object.keys(localStorage);
          keys.forEach((k) => {
            if (k.startsWith("profile_") && k !== key) {
              const stored = JSON.parse(localStorage.getItem(k) || "{}");
              stored.banner = "";
              stored.avatar = "";
              localStorage.setItem(k, JSON.stringify(stored));
            }
          });
          localStorage.setItem(key, JSON.stringify(updatedProfile));
        } catch {}
      }
    }
  };

  // ===========================
  // Avatar update
  // ===========================
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const compressed = await compressImage(reader.result);
        persistProfile({ ...userData, avatar: compressed });
      } catch {
        persistProfile({ ...userData, avatar: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  // ===========================
  // Banner update
  // ===========================
  const handleBannerChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoadingBanner(true);
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const compressed = await compressImage(reader.result);
        persistProfile({
          ...userData,
          banner: compressed,
          bannerUpdatedAt: Date.now(),
        });
      } catch {
        persistProfile({
          ...userData,
          banner: reader.result,
          bannerUpdatedAt: Date.now(),
        });
      } finally {
        setIsLoadingBanner(false);
      }
    };

    reader.onerror = () => setIsLoadingBanner(false);
    reader.readAsDataURL(file);
  };

  // ===========================
  // Privacidade toggle
  // ===========================
  const handlePrivacyToggle = (key) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ===========================
  // Helpers
  // ===========================
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");
  const stats = userData.stats || { playlists: 0, horasOuvidas: 0, seguidores: 0 };

  return (
    <div className="profile-page">
      {/* ================== BANNER ================== */}
      <div
        className={`profile-banner ${isLoadingBanner ? "loading" : ""}`}
        style={{
          backgroundImage: userData.banner
            ? `url(${userData.banner})`
            : "linear-gradient(135deg, #9333ea, #a855f7, #7e22ce)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <label htmlFor="banner-upload" className="banner-edit-btn" title="Trocar banner">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M5 20h14v-2H5v2zm7-18C9.13 2 7 4.13 7 7c0 .87.28 1.68.76 2.35L5 14h14l-2.76-4.65C16.72 8.68 17 7.87 17 7c0-2.87-2.13-5-5-5z"
            />
          </svg>
        </label>

        <input
          id="banner-upload"
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
          style={{ display: "none" }}
          disabled={isLoadingBanner}
        />

        {/* OVERLAY */}
        <div className="profile-banner-overlay">
          <div className="profile-header-inner">
            <div className="profile-left">
              {/* Avatar */}
              <div className="avatar-block">
                <label htmlFor="avatar-upload" className="avatar-label" title="Trocar foto">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Avatar" className="avatar-img" />
                  ) : (
                    <div className="avatar-initial">{getInitial(userData.name)}</div>
                  )}

                  <div className="avatar-edit-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path
                        fill="white"
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34a1.25 1.25 0 0 0 0-1.77l-2-2a1.25 1.25 0 0 0-1.77 0l-1.83 1.83 3.75 3.75 1.85-1.81z"
                      />
                    </svg>
                  </div>
                </label>

                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
              </div>

              {/* Meta */}
              <div className="profile-meta">
                <h1 className="profile-name">{userData.name}</h1>

                <div className="profile-sub">
                  <span className="username">{userData.username}</span>
                  <span className="dot">•</span>
                  <span className="member-since">{userData.memberSince}</span>
                </div>

                <p className="profile-bio">{userData.bio}</p>

                {/* Stats */}
                <div className="profile-stats">
                  <div className="stat">
                    <div className="stat-value">{stats.playlists}</div>
                    <div className="stat-label">Playlists</div>
                  </div>

                  <div className="stat-divider" />

                  <div className="stat">
                    <div className="stat-value">{stats.horasOuvidas}</div>
                    <div className="stat-label">Horas Ouvidas</div>
                  </div>

                  <div className="stat-divider" />

                  <div className="stat">
                    <div className="stat-value">{stats.seguidores}</div>
                    <div className="stat-label">Seguidores</div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÕES */}
            <div className="profile-actions-area">
              <Link to="/editprofile" className="btn btn-edit">
                Editar Perfil
              </Link>
              <button
                className="btn btn-share"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Link copiado!");
                }}
              >
                Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== CONTEÚDO PRINCIPAL ===================== */}
      <div className="container grid">
        {/* LADO ESQUERDO */}
        <div className="left-col">
          {/* ATIVIDADE RECENTE */}
          <section className="card">
            <div className="card-header">
              <h3>Atividade Recente</h3>
              <a href="#" className="link-primary">
                Ver Tudo
              </a>
            </div>

            <div className="activity-list">
              {[
                {
                  id: 1,
                  title: "Criou uma nova playlist",
                  subtitle: "Domingo Chill",
                  time: "há 2 horas",
                  icon: "🎵",
                },
                {
                  id: 2,
                  title: "Curtiu uma música",
                  subtitle: "Papolas - Yago Oproprio",
                  time: "há 5 horas",
                  icon: "❤️",
                },
                {
                  id: 3,
                  title: "Seguiu um novo artista",
                  subtitle: "Baco Exu do Blues",
                  time: "ontem",
                  icon: "👤",
                },
              ].map((a) => (
                <div key={a.id} className="activity-item">
                  <div className="activity-icon">{a.icon}</div>
                  <div className="activity-body">
                    <div className="activity-title">{a.title}</div>
                    <div className="activity-sub">{a.subtitle}</div>
                  </div>
                  <div className="activity-time">{a.time}</div>
                </div>
              ))}
            </div>
          </section>

          {/* MINHAS PLAYLISTS */}
          <section className="card">
            <div className="card-header">
              <h3>Minhas Playlists</h3>
              <Link to="/playlist" className="btn btn-small">
                  Ver Playlists
              </Link>
            </div>
             <div className="playlists-grid">
              {["Domingo Chill", "Rock Nacional", "Noite Romântica"].map((name, i) => {
                let image =
                  name === "Domingo Chill"
                    ? domingo
                    : name === "Rock Nacional"
                    ? rock
                    : noiteromantica;

                return (
                  <div className="playlist-card" key={i}>
                    <div className="cover" style={{ backgroundImage: `url(${image})` }} />
                    <div className="playlist-info">
                      <div className="playlist-name">{name}</div>
                      <div className="playlist-meta">15 músicas • 1h 22min</div>
                    </div>
                  </div>
                );
              })}

              <div className="playlist-card empty">
                <div className="placeholder">Criar nova playlist</div>
              </div>
            </div>
          </section>
        </div>

        {/* LADO DIREITO */}
        <aside className="right-col">
          {/* DNA MUSICAL */}
          <section className="card dna-card">
            <h3>Meu DNA Musical</h3>

            <div className="dna-list">
              {[
                { genre: "Rock Nacional", percentage: 82, color: "#8B5CF6" },
                { genre: "MPB", percentage: 24, color: "#EC4899" },
                { genre: "Sertanejo", percentage: 18, color: "#3B82F6" },
                { genre: "Pop", percentage: 12, color: "#10B981" },
              ].map((g, i) => (
                <div key={i} className="genre-row">
                  <div className="genre-left">
                    <div className="genre-name">{g.genre}</div>
                    <div className="genre-percent">{g.percentage}%</div>
                  </div>
                  <div className="genre-bar">
                    <div
                      className="genre-progress"
                      style={{
                        width: `${g.percentage}%`,
                        background: g.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AMIGOS */}
          <section className="card">
            <h3>Conexões Musicais</h3>

            <div className="friends-list">
              {[
                { name: "Maria Silva", avatar: mariana, info: "2 amigos em comum" },
                { name: "João Santos", avatar: pedro, info: "1 amigo em comum" },
              ].map((f, i) => (
                <div key={i} className="friend-row">
                  <img src={f.avatar || "/placeholder.svg"} alt={f.name} />
                  <div>
                    <div className="friend-name">{f.name}</div>
                    <div className="friend-info">{f.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PRIVACIDADE */}
          <section className="card privacy-card">
            <h3>Configurações de Privacidade</h3>

            <div className="privacy-list">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="privacy-row">
                  <div>
                    <div className="privacy-title">
                      {key === "perfilPublico"
                        ? "Perfil Público"
                        : key === "atividadeVisivel"
                        ? "Atividade Visível"
                        : "Playlists Públicas"}
                    </div>

                    <div className="privacy-desc">
                      {key === "perfilPublico"
                        ? "Permitir que outros vejam seu perfil"
                        : key === "atividadeVisivel"
                        ? "Mostrar o que você está ouvindo"
                        : "Permitir descoberta das suas playlists"}
                    </div>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handlePrivacyToggle(key)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
