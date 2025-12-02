import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCaretDown,
  FaBars,
  FaTimes,
  FaHome,
  FaCompass,
  FaMicrophone,
  FaUsers,
  FaUser,
  FaMusic,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { isLogged, doLogout, getUser } from "../../lib/authHandler";
import { useAuth } from "../../contexts/AuthContext";
import "./Topo.css";

export default function TopoResponsivo() {
  const { logged, user, setLogged, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  // ===========================
  // FUNÇÃO PARA OBTER CHAVE DO PERFIL
  // ===========================
  const getProfileKey = () => {
    // Tenta pegar pelo token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload?.email) return `profile_${payload.email}`;
      } catch {}
    }
    
    // Fallback para googleUser
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
  // CARREGAR DADOS DO PERFIL DO LOCALSTORAGE
  // ===========================
  const loadProfileData = () => {
    const profileKey = getProfileKey();
    const savedProfile = localStorage.getItem(profileKey);
    
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        // Atualiza a foto do perfil se existir
        if (parsedProfile.avatar) {
          setProfilePhoto(parsedProfile.avatar);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil do localStorage:", error);
      }
    }
  };

  // ===========================
  // VERIFICAR LOGIN E CARREGAR DADOS
  // ===========================
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = isLogged();
      setLogged(loggedIn);
      if (loggedIn) {
        const userData = getUser();
        setUser(userData);
        // Carrega foto do perfil do localStorage
        loadProfileData();
      } else {
        setUser(null);
        setProfilePhoto(null);
      }
    };

    checkLogin();
    
    // ===========================
    // OBSERVADOR DE MUDANÇAS NO LOCALSTORAGE
    // ===========================
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "userData" || e.key === "user") {
        checkLogin();
      }
      
      // Observa mudanças no perfil do usuário
      const profileKey = getProfileKey();
      if (e.key === profileKey) {
        if (e.newValue) {
          try {
            const updatedProfile = JSON.parse(e.newValue);
            if (updatedProfile.avatar) {
              setProfilePhoto(updatedProfile.avatar);
            }
          } catch {}
        }
      }
      
      // Observa mudanças específicas de avatar
      if (e.key === "user_avatar_updated") {
        loadProfileData();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    // ===========================
    // OBSERVADOR PERSONALIZADO (para mudanças na mesma aba)
    // ===========================
    const handleProfileUpdate = () => {
      loadProfileData();
    };
    
    // Adiciona listener para evento personalizado
    window.addEventListener("profileUpdated", handleProfileUpdate);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, [setLogged, setUser]);

  // ===========================
  // ATUALIZAR PERFIL QUANDO USER MUDAR
  // ===========================
  useEffect(() => {
    if (user) {
      // Tenta carregar foto do perfil salva
      loadProfileData();
    }
  }, [user]);

  // ===========================
  // FECHAR MENUS AO CLICAR FORA
  // ===========================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".profileContainer") &&
        !e.target.closest(".notificationContainer")
      ) {
        setMenuOpen(false);
        setNotificationOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ===========================
  // PREVENIR SCROLL QUANDO MENU MOBILE ESTÁ ABERTO
  // ===========================
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // ===========================
  // LOGOUT
  // ===========================
  const handleLogout = () => {
    doLogout();
    setLogged(false);
    setUser(null);
    setProfilePhoto(null);
    setMenuOpen(false);
    setNotificationOpen(false);
    setMobileMenuOpen(false);
    navigate("/signin");
  };

  // ===========================
  // TOGGLE MENU MOBILE
  // ===========================
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMenuOpen(false);
    setNotificationOpen(false);
  };

  // ===========================
  // BUSCA
  // ===========================
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    const q = searchText.trim();
    if (!q) return;
    
    try {
      const backend = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${backend}/music/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) return;
      const data = await res.json();
      navigate("/buscar", { state: { results: data, query: q } });
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  // ===========================
  // GERAR INICIAIS DO NOME
  // ===========================
  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  // ===========================
  // OBTER URL DA FOTO DE PERFIL (PRIORIDADE: localStorage > backend)
  // ===========================
  const getPhotoURL = () => {
    // 1. Foto do perfil salva no localStorage (mais recente)
    if (profilePhoto) {
      return profilePhoto;
    }
    
    // 2. Foto do usuário do backend/contexto
    if (!user) return null;
    
    // Verifica diferentes possíveis propriedades
    return user.photoURL || user.avatar_url || user.avatar || user.photo || null;
  };

  // ===========================
  // OBTER NOME DO USUÁRIO
  // ===========================
  const getUserName = () => {
    if (!user) return "Usuário";
    return user.name || user.username || user.displayName || user.email || "Usuário";
  };

  // ===========================
  // FORÇAR ATUALIZAÇÃO DA FOTO (para testes)
  // ===========================
  const forcePhotoUpdate = () => {
    loadProfileData();
    // Dispara evento personalizado para outras instâncias do componente
    window.dispatchEvent(new Event("profileUpdated"));
  };

  return (
    <>
      <header className="header-dark">
        {/* LOGO */}
        <Link to="/" className="logo-container">
          <span className="logo-text">EchoMusic</span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/descobrir">Descobrir</Link></li>
            <li><Link to="/salas">Salas</Link></li>
            <li><Link to="/comunidades">Comunidades</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
        </nav>

        {/* SEARCH DESKTOP */}
        <form className="search-bar-dark desktop-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Buscar músicas, artistas..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="search-btn-dark">
            <FaSearch />
          </button>
        </form>

        {/* AÇÕES HEADER */}
        <div className="header-actions-dark">
          {logged ? (
            <>
              {/* NOTIFICAÇÕES */}
              <div className="notificationContainer">
                <button
                  className="notification-btn-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotificationOpen(!notificationOpen);
                    setMenuOpen(false);
                  }}
                  aria-label="Notificações"
                >
                  <FaBell size={20} />
                  <span className="notification-badge-dark">3</span>
                </button>

                {notificationOpen && (
                  <div className="notification-dropdown-dark">
                    <div className="notification-header-dark">
                      <h3>Notificações</h3>
                    </div>
                    <div className="notification-list-dark">
                      <div className="notification-item-dark">
                        <p>João curtiu sua música 🎧</p>
                        <span className="time">há 2 horas</span>
                      </div>
                      <div className="notification-item-dark">
                        <p>Nova sala ao vivo começou 🔥</p>
                        <span className="time">há 1 hora</span>
                      </div>
                      <div className="notification-item-dark">
                        <p>Você tem um novo seguidor 👋</p>
                        <span className="time">há 30 minutos</span>
                      </div>
                    </div>
                    <button className="notification-footer-dark">Ver todas</button>
                  </div>
                )}
              </div>

              {/* PERFIL DESKTOP */}
              <div className="profileContainer desktop-profile">
                <div className="profileBtn-dark">
                  <Link to="/profile" className="profileLink">
                    {getPhotoURL() ? (
                      <img
                        src={getPhotoURL()}
                        alt={getUserName()}
                        className="profileImg"
                        onError={(e) => {
                          e.target.style.display = "none";
                          // Encontra o placeholder e mostra
                          const placeholder = e.target.parentElement.querySelector('.profileImg-placeholder-dark');
                          if (placeholder) placeholder.style.display = "flex";
                        }}
                        onLoad={() => {
                          // Esconde o placeholder quando a imagem carrega
                          const placeholder = document.querySelector('.profileImg-placeholder-dark');
                          if (placeholder) placeholder.style.display = "none";
                        }}
                      />
                    ) : null}
                    <div
                      className="profileImg-placeholder-dark"
                      style={{ display: getPhotoURL() ? "none" : "flex" }}
                    >
                      {getInitials(getUserName())}
                    </div>
                    <span>{getUserName().split(" ")[0]}</span>
                  </Link>
                  <button
                    className="profileArrowBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(!menuOpen);
                      setNotificationOpen(false);
                    }}
                  >
                    <FaCaretDown />
                  </button>
                  
                  {/* Botão para forçar atualização (opcional, para testes) */}
                  <button 
                    className="refresh-photo-btn" 
                    onClick={forcePhotoUpdate}
                    style={{
                      position: 'absolute',
                      right: '-30px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#8b5cf6',
                      cursor: 'pointer',
                      fontSize: '12px',
                      display: 'none' // Oculta em produção
                    }}
                    title="Atualizar foto"
                  >
                    ⟳
                  </button>
                </div>

                {menuOpen && (
                  <div className="profile-dropdown-dark">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="dropdown-link"
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaUser /> Perfil
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/playlist"
                          className="dropdown-link"
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaMusic /> Minhas músicas
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/configuracoes"
                          className="dropdown-link"
                          onClick={() => setMenuOpen(false)}
                        >
                          <FaCog /> Configurações
                        </Link>
                      </li>

                      <li className="logout-item" onClick={handleLogout}>
                        <FaSignOutAlt /> Sair
                      </li>
                    </ul>
                  </div>
                )}

              </div>
            </>
          ) : (
            // Links de login/registro quando NÃO logado
            <div className="auth-links desktop-auth">
              <Link to="/signin" className="btn-login-dark">
                Entrar
              </Link>
              <Link to="/signup" className="btn-register-dark">
                Registrar
              </Link>
            </div>
          )}

          {/* MENU HAMBÚRGUER */}
          <button className="hamburger-btn" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            {logged && (
              <div className="mobile-profile-section">
                <Link
                  to="/profile"
                  className="mobile-profile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getPhotoURL() ? (
                    <img
                      src={getPhotoURL()}
                      alt={getUserName()}
                      className="mobile-profile-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="mobile-profile-placeholder"
                    style={{ display: getPhotoURL() ? "none" : "flex" }}
                  >
                    {getInitials(getUserName())}
                  </div>
                  <div className="mobile-profile-info">
                    <span className="mobile-profile-name">{getUserName()}</span>
                    <span className="mobile-profile-action">Ver perfil</span>
                  </div>
                </Link>
              </div>
            )}

            <nav className="mobile-nav">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <FaHome /> Home
              </Link>
              <Link to="/descobrir" onClick={() => setMobileMenuOpen(false)}>
                <FaCompass /> Descobrir
              </Link>
              <Link to="/salas" onClick={() => setMobileMenuOpen(false)}>
                <FaMicrophone /> Salas
              </Link>
              <Link to="/comunidades" onClick={() => setMobileMenuOpen(false)}>
                <FaUsers /> Comunidades
              </Link>
            </nav>

            <div className="mobile-user-actions">
              {logged ? (
                <>
                  <Link to="/minhas-musicas" onClick={() => setMobileMenuOpen(false)}>
                    <FaMusic /> Minhas músicas
                  </Link>
                  <Link to="/configuracoes" onClick={() => setMobileMenuOpen(false)}>
                    <FaCog /> Configurações
                  </Link>
                  <button className="mobile-logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="mobile-btn-login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/signup"
                    className="mobile-btn-register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Registrar
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}