"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import rock from "../../assets/rock.jpg"
import noiteromantica from "../../assets/noiteromantica.jpg"
import domingo from "../../assets/domingo.jpg"

import "./Profile.css"
import mariana from "../../assets/usario_mariana.png"
import pedro from "../../assets/usario_pedro.jpeg"

export default function Profile() {
  // ===========================
  // ESTADOS
  // ===========================
  const [privacySettings, setPrivacySettings] = useState({
    perfilPublico: true,
    atividadeVisivel: true,
    playlistsPublicas: false,
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoadingBanner, setIsLoadingBanner] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

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
  })

  // ===========================
  // Storage Key - AGORA MAIS CONFIÁVEL
  // ===========================
  const getProfileKey = () => {
    // Primeiro tenta pegar pelo token
    const token = localStorage.getItem("token")
    if (token) {
      try {
        // Decodifica o token JWT para pegar o email (parte simples)
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload?.email) return `profile_${payload.email}`
      } catch {}
    }
    
    // Fallback para googleUser
    const googleUserRaw = localStorage.getItem("googleUser")
    if (googleUserRaw) {
      try {
        const googleUser = JSON.parse(googleUserRaw)
        if (googleUser?.email) return `profile_${googleUser.email}`
      } catch {}
    }
    
    return "userProfile"
  }

  // ===========================
  // Compressão de imagens
  // ===========================
  const compressImage = async (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Define tamanho máximo para otimização
        const maxWidth = 1200
        const maxHeight = 600
        
        let width = img.width
        let height = img.height
        
        // Redimensiona mantendo proporção
        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        
        if (height > maxHeight) {
          width = (maxHeight / height) * width
          height = maxHeight
        }
        
        canvas.width = width
        canvas.height = height
        
        ctx.drawImage(img, 0, 0, width, height)
        
        // Compressão otimizada
        const quality = width > 800 ? 0.7 : 0.8
        const compressed = canvas.toDataURL('image/webp', quality)
        resolve(compressed)
      }
      img.onerror = () => resolve(dataUrl)
      img.src = dataUrl
    })
  }

  // ===========================
  // Load inicial do perfil - CORRIGIDO
  // ===========================
  useEffect(() => {
    const loadUserData = async () => {
      const profileKey = getProfileKey()
      
      // 1. PRIMEIRO CARREGA DO LOCALSTORAGE (se existir)
      const savedProfile = localStorage.getItem(profileKey)
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile)
          setUserData(parsedProfile)
        } catch (error) {
          console.error("Erro ao carregar perfil salvo:", error)
        }
      }

      // 2. DEPOIS ATUALIZA COM DADOS DO SERVER (se houver token)
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const res = await fetch("http://localhost:3000/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        })

        if (!res.ok) throw new Error("Falha ao carregar usuário")
        const data = await res.json()
        const user = data.user || data

        // Prepara os dados do usuário
        const formattedUserData = {
          name: user.username || "Usuário",
          username: user.username ? `@${user.username}` : "@user",
          email: user.email || "",
          memberSince: "Membro desde 2025",
          bio: user.bio || "Adicione uma bio personalizada no seu perfil ✨",
          avatar: user.avatar_url || "",
          banner: user.banner_url || "",
          bannerUpdatedAt: Date.now(),
          stats: { playlists: 12, horasOuvidas: 42, seguidores: 156 },
        }

        // MANTÉM AS IMAGENS LOCAIS se o usuário não tiver atualizado no server
        const currentProfile = JSON.parse(savedProfile || '{}')
        if (currentProfile.avatar && !formattedUserData.avatar) {
          formattedUserData.avatar = currentProfile.avatar
        }
        if (currentProfile.banner && !formattedUserData.banner) {
          formattedUserData.banner = currentProfile.banner
        }

        // Atualiza o estado e salva
        persistProfile(formattedUserData)

      } catch (err) {
        console.error("Erro ao buscar dados do servidor:", err)
        // Se falhar, mantém os dados locais
      }
    }

    loadUserData()
  }, [])

  // ===========================
  // Sincronização entre abas - MELHORADO
  // ===========================
  useEffect(() => {
    const handleStorageChange = (e) => {
      const profileKey = getProfileKey()
      if (e.key === profileKey) {
        try {
          if (e.newValue) {
            const updatedProfile = JSON.parse(e.newValue)
            setUserData(updatedProfile)
          }
        } catch (error) {
          console.error("Erro ao processar alteração de storage:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // ===========================
  // Persistência do perfil local - MELHORADO
  // ===========================
  const persistProfile = (updatedProfile) => {
    const profileKey = getProfileKey()
    
    // Adiciona timestamp para controle de versão
    const profileWithTimestamp = {
      ...updatedProfile,
      lastUpdated: Date.now(),
      profileVersion: "1.0"
    }
    
    try {
      // Salva no localStorage
      localStorage.setItem(profileKey, JSON.stringify(profileWithTimestamp))
      
      // Atualiza o estado
      setUserData(profileWithTimestamp)
      
      // Dispara evento para sincronizar outras abas
      window.dispatchEvent(
        new StorageEvent("storage", { 
          key: profileKey, 
          newValue: JSON.stringify(profileWithTimestamp) 
        })
      )
      
      console.log("Perfil salvo com sucesso:", profileKey)
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
      // Tenta limpar storage se estiver cheio
      if (error.name === 'QuotaExceededError') {
        alert("Armazenamento cheio. Limpe alguns dados.")
      }
    }
  }

  // ===========================
  // Avatar update - CORRIGIDO
  // ===========================
  // Na função handleAvatarChange, após persistir o perfil:
const handleAvatarChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const compressed = await compressImage(reader.result)
      
      // Atualiza IMEDIATAMENTE no estado/localStorage
      const updatedProfile = { 
        ...userData, 
        avatar: compressed,
        lastUpdated: Date.now()
      }
      persistProfile(updatedProfile)
      
      // ====== ADICIONE ESTA PARTE ======
      // Dispara eventos para atualizar o topo
      window.dispatchEvent(new Event("profileUpdated"));
      localStorage.setItem("user_avatar_updated", Date.now().toString());
      // ================================
      
      // Tenta sincronizar com o servidor (opcional)
      const token = localStorage.getItem("token")
      if (token) {
        await fetch("http://localhost:3000/user/avatar", {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ avatar: compressed }),
        })
      }
      
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error)
      // Mesmo em caso de erro, salva localmente
      persistProfile({ 
        ...userData, 
        avatar: reader.result,
        lastUpdated: Date.now()
      })
      
      // Dispara evento mesmo em caso de erro
      window.dispatchEvent(new Event("profileUpdated"));
    }
  }
  reader.readAsDataURL(file)
}

  // ===========================
  // Banner update - CORRIGIDO
  // ===========================
  const handleBannerChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Verifica tamanho do arquivo (max 10MB para banner)
    if (file.size > 10 * 1024 * 1024) {
      alert("O banner deve ter no máximo 10MB")
      return
    }

    setIsLoadingBanner(true)
    const reader = new FileReader()

    reader.onload = async () => {
      try {
        const compressed = await compressImage(reader.result)
        const timestamp = Date.now()
        
        // Atualiza IMEDIATAMENTE no estado/localStorage
        const updatedProfile = { 
          ...userData, 
          banner: compressed, 
          bannerUpdatedAt: timestamp,
          lastUpdated: timestamp
        }
        persistProfile(updatedProfile)
        
        // Tenta sincronizar com o servidor (opcional)
        const token = localStorage.getItem("token")
        if (token) {
          await fetch("http://localhost:3000/user/banner", {
            method: "PUT",
            headers: { 
              "Content-Type": "application/json", 
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ banner: compressed }),
          })
        }
        
      } catch (error) {
        console.error("Erro ao atualizar banner:", error)
        // Mesmo em caso de erro, salva localmente
        persistProfile({ 
          ...userData, 
          banner: reader.result, 
          bannerUpdatedAt: Date.now(),
          lastUpdated: Date.now()
        })
      } finally { 
        setIsLoadingBanner(false) 
      }
    }

    reader.onerror = () => {
      setIsLoadingBanner(false)
      alert("Erro ao carregar a imagem")
    }
    
    reader.readAsDataURL(file)
  }

  const handlePrivacyToggle = (key) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Você precisa estar autenticado")
      window.location.href = "/signin"
      return
    }

    setIsDeletingAccount(true)
    try {
      const res = await fetch("http://localhost:3000/user/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      if (!res.ok) throw new Error("Falha ao deletar conta")
      
      // Limpa dados locais
      const profileKey = getProfileKey()
      localStorage.removeItem(profileKey)
      localStorage.clear()
      sessionStorage.clear()
      
      setShowDeleteModal(false)
      alert("Conta deletada com sucesso!")
      setTimeout(() => { window.location.href = "/" }, 1000)
    } catch (err) {
      alert(`Erro: ${err.message}`)
      setIsDeletingAccount(false)
    }
  }

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?")
  const stats = userData.stats || { playlists: 0, horasOuvidas: 0, seguidores: 0 }

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
          backgroundAttachment: "fixed"
        }}
      >
        {/* ==== BANNER/AVATAR/HEADER ==== */}
        <label htmlFor="banner-upload" className="banner-edit-btn" title="Trocar banner">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="white" d="M5 20h14v-2H5v2zm7-18C9.13 2 7 4.13 7 7c0 .87.28 1.68.76 2.35L5 14h14l-2.76-4.65C16.72 8.68 17 7.87 17 7c0-2.87-2.13-5-5-5z"/>
          </svg>
        </label>
        <input id="banner-upload" type="file" accept="image/*" onChange={handleBannerChange} style={{ display: "none" }} disabled={isLoadingBanner} />
        <div className="profile-banner-overlay">
          <div className="profile-header-inner">
            <div className="profile-left">
              <div className="avatar-block">
                <label htmlFor="avatar-upload" className="avatar-label" title="Trocar foto">
                  {userData.avatar ? (
                    <img 
                      src={userData.avatar} 
                      alt="Avatar" 
                      className="avatar-img" 
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentNode.querySelector('.avatar-initial').style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div className="avatar-initial" style={{ display: userData.avatar ? 'none' : 'flex' }}>
                    {getInitial(userData.name)}
                  </div>
                  <div className="avatar-edit-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="white" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34a1.25 1.25 0 0 0 0-1.77l-2-2a1.25 1.25 0 0 0-1.77 0l-1.83 1.83 3.75 3.75 1.85-1.81z"/>
                    </svg>
                  </div>
                </label>
                <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              </div>
              <div className="profile-meta">
                <h1 className="profile-name">{userData.name}</h1>
                <div className="profile-sub">
                  <span className="username">{userData.username}</span>
                  <span className="dot">•</span>
                  <span className="member-since">{userData.memberSince}</span>
                </div>
                <p className="profile-bio">{userData.bio}</p>
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
            <div className="profile-actions-area">
              <Link to="/editprofile" className="btn btn-edit">Editar Perfil</Link>
              <button className="btn btn-share" onClick={() => { navigator.clipboard?.writeText(window.location.href); alert("Link copiado!") }}>Compartilhar</button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== CONTEÚDO PRINCIPAL ===================== */}
      <div className="container grid">
        {/* LEFT COL: ATIVIDADE E PLAYLISTS */}
        <div className="left-col">
          {/* Atividade Recente */}
          <section className="card">
            <div className="card-header">
              <h3>Atividade Recente</h3>
              <a href="#" className="link-primary">Ver Tudo</a>
            </div>
            <div className="activity-list">
              {[{ id:1,title:"Criou uma nova playlist",subtitle:"Domingo Chill",time:"há 2 horas",icon:"🎵"},
                { id:2,title:"Curtiu uma música",subtitle:"Papolas - Yago Oproprio",time:"há 5 horas",icon:"❤"},
                { id:3,title:"Seguiu um novo artista",subtitle:"Baco Exu do Blues",time:"ontem",icon:"👤"}].map(a=>(
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

          {/* Playlists */}
          <section className="card">
            <div className="card-header">
              <h3>Minhas Playlists</h3>
              <Link to="/playlist" className="btn btn-small">Ver Playlists</Link>
            </div>
            <div className="playlists-grid">
            {["Domingo Chill","Rock Nacional","Noite Romântica"].map((name,i)=>{
                const image = 
                  name === "Domingo Chill" ? domingo :
                  name === "Rock Nacional" ? rock :
                  noiteromantica

                // Se for Rock Nacional → envia para /playlist
                const Wrapper = name === "Rock Nacional" ? Link : "div"
                const wrapperProps = name === "Rock Nacional" ? { to: "/playlist" } : {}

                return (
                  <Wrapper className="playlist-card" key={i} {...wrapperProps}>
                    <div className="cover" style={{backgroundImage:`url(${image})`}}/>
                    <div className="playlist-info">
                      <div className="playlist-name">{name}</div>
                      <div className="playlist-meta">15 músicas • 1h 22min</div>
                    </div>
                  </Wrapper>
                )
            })}
              <div className="playlist-card empty"><div className="placeholder">Criar nova playlist</div></div>
            </div>
          </section>
        </div>

        {/* RIGHT COL: DNA, Amigos e Privacidade */}
        <aside className="right-col">
          {/* DNA Musical */}
          <section className="card dna-card">
            <h3>Meu DNA Musical</h3>
            <div className="dna-list">
              {[{genre:"Rock Nacional",percentage:82,color:"#8B5CF6"},
                {genre:"MPB",percentage:24,color:"#EC4899"},
                {genre:"Sertanejo",percentage:18,color:"#3B82F6"},
                {genre:"Pop",percentage:12,color:"#10B981"}].map((g,i)=>(
                <div key={i} className="genre-row">
                  <div className="genre-left">
                    <div className="genre-name">{g.genre}</div>
                    <div className="genre-percent">{g.percentage}%</div>
                  </div>
                  <div className="genre-bar">
                    <div className="genre-progress" style={{width:`${g.percentage}%`,background:g.color}}/>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amigos */}
          <section className="card">
            <h3>Conexões Musicais</h3>
            <div className="friends-list">
              {[{name:"Maria Silva",avatar:mariana,info:"2 amigos em comum"},
                {name:"João Santos",avatar:pedro,info:"1 amigo em comum"}].map((f,i)=>(
                <div key={i} className="friend-row">
                  <img src={f.avatar} alt={f.name}/>
                  <div>
                    <div className="friend-name">{f.name}</div>
                    <div className="friend-info">{f.info}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Privacidade */}
          <section className="card privacy-card">
            <h3>Configurações de Privacidade</h3>
            <div className="privacy-list">
              {Object.entries(privacySettings).map(([key,value])=>(
                <div key={key} className="privacy-row">
                  <div>
                    <div className="privacy-title">
                      {key==="perfilPublico"?"Perfil Público":key==="atividadeVisivel"?"Atividade Visível":"Playlists Públicas"}
                    </div>
                    <div className="privacy-desc">
                      {key==="perfilPublico"?"Permitir que outros vejam seu perfil":key==="atividadeVisivel"?"Mostrar o que você está ouvindo":"Permitir descoberta das suas playlists"}
                    </div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={value} onChange={()=>handlePrivacyToggle(key)}/>
                    <span className="slider"></span>
                  </label>
                </div>
              ))}
            </div>
          </section>

          {/* Deletar Conta */}
          <section className="card danger-card">
            <h3>Zona de Perigo</h3>
            <div className="danger-section">
              <div className="danger-text">
                <p className="danger-title">Deletar Conta</p>
                <p className="danger-desc">Esta ação é irreversível.</p>
              </div>
              <button className="btn btn-danger" onClick={()=>setShowDeleteModal(true)}>Deletar Conta</button>
            </div>
          </section>
        </aside>
      </div>

      {/* MODAL DE CONFIRMAÇÃO */}
     {showDeleteModal && (
  <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3 className="modal-title">Confirmar Exclusão</h3>
      <p className="modal-desc">
        Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.
      </p>
      <div className="modal-actions">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="btn-modal-cancel"
        >
          Cancelar
        </button>
        <button
          onClick={handleDeleteAccount}
          className="btn-modal-danger"
          disabled={isDeletingAccount}
        >
          {isDeletingAccount ? "Deletando..." : "Deletar Conta"}
        </button>
      </div>
    </div>
  </div>

      )}
    </div>
  )
}
