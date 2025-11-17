
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { 
  FaBell, 
  FaMusic, 
  FaCog, 
  FaSignOutAlt, 
  FaUser, 
  FaBars, 
  FaTimes, 
  FaSearch,
  FaHome,
  FaCompass,
  FaMicrophone,
  FaUsers
} from 'react-icons/fa';
import { auth } from '../../firebase.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Topo.css';

export default function TopoResponsivo() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({
    name: "",
    photoURL: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLogged(true);
        setUser({
          name: currentUser.displayName || currentUser.email || "User",
          photoURL: currentUser.photoURL || ""
        });
      } else {
        setLogged(false);
        setUser({ name: "", photoURL: "" });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fecha menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;

      if (!target.closest('.profileContainer') && !target.closest('.notificationContainer')) {
        setMenuOpen(false);
        setNotificationOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Previne scroll quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogged(false);
      setUser({ name: "", photoURL: "" });
      setMobileMenuOpen(false);
      setMenuOpen(false);
      setNotificationOpen(false);
      router.push('/signin');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false);
    setMenuOpen(false);
    setNotificationOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMobileMenuOpen(false);
  };

  // Função para gerar initials com cor baseada no nome
  const getInitials = (name) => {
    return name?.charAt(0)?.toUpperCase() || "U";
  };

  if (loading) {
    return (
      <header className="header-dark">
        <div className="logo">
          <a href="/">
            <div className="logo-container">
              <FaMusic className="logo-icon" />
              <span className="logo-text">EchoMusic</span>
            </div>
          </a>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="header-dark">
        {/* LOGO */}
        <div className="logo">
          <a href="/">
            <div className="logo-container">
              <span className="logo-text">EchoMusic</span>
            </div>
          </a>
        </div>

        {/* NAVBAR DESKTOP */}
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/descobrir">Descobrir</a></li>
            <li><a href="/salas">Salas ao vivo</a></li>
            <li><a href="/comunidades">Comunidades</a></li>
            <li><a href="/sobre">Sobre</a></li>
          </ul>
        </nav>

        {/* BARRA DE PESQUISA DESKTOP */}
        <div className="search-bar-dark desktop-search">
          <input type="text" placeholder="Buscar músicas, artistas..." />
          <button className="search-btn-dark">
            <FaSearch />
          </button>
        </div>

        {/* AÇÕES DO TOPO */}
        <div className="header-actions-dark">
          {/* Botão de busca mobile */}
          <button className="mobile-search-btn" onClick={toggleSearch} aria-label="Buscar">
            <FaSearch size={20} />
          </button>

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
                        <p>João curtiu sua música</p>
                        <span className="time">há 2 horas</span>
                      </div>
                      <div className="notification-item-dark">
                        <p>Nova sala ao vivo começou</p>
                        <span className="time">há 1 hora</span>
                      </div>
                      <div className="notification-item-dark">
                        <p>Você tem um novo seguidor</p>
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
                  <a href="/profile" className="profileLink">
                    {user?.photoURL ? (
                      <img src={user.photoURL || "/placeholder.svg"} alt={user?.name} className="profileImg" />
                    ) : (
                      <div className="profileImg-placeholder-dark">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <span>{user?.name?.split(" ")[0]}</span>
                  </a>

                  <button className="profileArrowBtn" onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(!menuOpen);
                    setNotificationOpen(false);
                  }} aria-label="Menu do perfil">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className={`arrow ${menuOpen ? 'open' : ''}`}>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                {menuOpen && (
                  <div className="profile-dropdown-dark">
                    <ul>
                      <li>
                        <a href="/profile" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                          <FaUser size={16} /> Perfil
                        </a>
                      </li>
                      <li>
                        <a href="/minhas-musicas" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                          <FaMusic size={16} /> Minhas músicas
                        </a>
                      </li>
                      <li>
                        <a href="/configuracoes" className="dropdown-link" onClick={() => setMenuOpen(false)}>
                          <FaCog size={16} /> Configurações
                        </a>
                      </li>
                      <li onClick={handleLogout} className="logout-item" style={{cursor: 'pointer'}}>
                        <FaSignOutAlt size={16} /> Sair
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-links desktop-auth">
              <a href="/signin" className="btn-login-dark">Entrar</a>
              <a href="/signup" className="btn-register-dark">Registrar</a>
            </div>
          )}

          {/* MENU HAMBÚRGUER - Sempre disponível */}
          <button 
            className="hamburger-btn" 
            onClick={toggleMobileMenu}
            aria-label="Menu"
            style={{zIndex: 1001}}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* BARRA DE PESQUISA MOBILE */}
      <div className={`mobile-search-bar ${searchOpen ? 'active' : ''}`}>
        <div className="mobile-search-content">
          <input type="text" placeholder="Buscar músicas, artistas..." autoFocus />
          <button className="search-btn-dark">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* MENU MOBILE FULLSCREEN */}
      {mobileMenuOpen && (
        <>
          <div className="menu-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className={`mobile-menu-overlay active`}>
            <div className="mobile-menu-content">
              {/* Perfil no topo do menu mobile */}
              {logged && (
                <div className="mobile-profile-section">
                  <a href="/profile" className="mobile-profile-link" onClick={() => setMobileMenuOpen(false)}>
                    {user?.photoURL ? (
                      <img src={user.photoURL || "/placeholder.svg"} alt={user?.name} className="mobile-profile-img" />
                    ) : (
                      <div className="mobile-profile-placeholder">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <div className="mobile-profile-info">
                      <span className="mobile-profile-name">{user?.name}</span>
                      <span className="mobile-profile-action">Ver perfil</span>
                    </div>
                  </a>
                </div>
              )}

              {/* Links de navegação */}
              <nav className="mobile-nav">
                <a href="/" onClick={() => setMobileMenuOpen(false)}>
                  <FaHome size={18} /> Home
                </a>
                <a href="/descobrir" onClick={() => setMobileMenuOpen(false)}>
                  <FaCompass size={18} /> Descobrir
                </a>
                <a href="/salas" onClick={() => setMobileMenuOpen(false)}>
                  <FaMicrophone size={18} /> Salas ao vivo
                </a>
                <a href="/comunidades" onClick={() => setMobileMenuOpen(false)}>
                  <FaUsers size={18} /> Comunidades
                </a>
                <a href="/sobre" onClick={() => setMobileMenuOpen(false)}>
                  <FaMusic size={18} /> Sobre
                </a>
              </nav>

              {logged ? (
                <>
                  <div className="mobile-menu-divider"></div>
                  
                  {/* Ações do usuário */}
                  <div className="mobile-user-actions">
                    <a href="/minhas-musicas" onClick={() => setMobileMenuOpen(false)}>
                      <FaMusic size={16} /> Minhas músicas
                    </a>
                    <a href="/configuracoes" onClick={() => setMobileMenuOpen(false)}>
                      <FaCog size={16} /> Configurações
                    </a>
                    <button onClick={handleLogout} className="mobile-logout-btn">
                      <FaSignOutAlt size={16} /> Sair
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mobile-menu-divider"></div>
                  <div className="mobile-auth-section">
                    <a href="/signin" className="mobile-btn-login" onClick={() => setMobileMenuOpen(false)}>
                      Entrar
                    </a>
                    <a href="/signup" className="mobile-btn-register" onClick={() => setMobileMenuOpen(false)}>
                      Criar conta
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
