"use client"

import "./Topo.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  FaAngleDown,
  FaBell,
  FaHeart,
  FaMusic,
  FaCog,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa"
import { isLogged, doLogout, getUser } from "../../lib/authHandler"
import { useAuth } from "../../contexts/AuthContext"
import logo from "../../assets/logo.png"

export default function Topo() {
  const { logged, user, setLogged, setUser } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const navigate = useNavigate()

  // 🔐 Verifica login e atualiza dados
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = isLogged()
      setLogged(loggedIn)
      if (loggedIn) {
        const userData = getUser()
        setUser(userData)
      } else {
        setUser(null)
      }
    }

    checkLogin()
    const handleStorageChange = (e) => {
      if (e.key === "token" || e.key === "user") checkLogin()
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [setLogged, setUser])

  // 🚪 Logout
  const handleLogout = () => {
    doLogout()
    setLogged(false)
    setUser(null)
    navigate("/signin")
  }

  // 🔔 Notificações
  const handleNotificationClick = (e) => {
    e.stopPropagation()
    setNotificationOpen(!notificationOpen)
    setMenuOpen(false)
  }

  // 👤 Menu do perfil
  const handleProfileClick = (e) => {
    e.stopPropagation()
    setMenuOpen(!menuOpen)
    setNotificationOpen(false)
  }

  // ❌ Fecha menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".profileContainer") &&
        !e.target.closest(".notificationContainer")
      ) {
        setMenuOpen(false)
        setNotificationOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <header className="header-dark">
      {/* LOGO */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="EchoMusic" className="logo-img" />
        </Link>
      </div>

      {/* NAVBAR */}
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/descobrir">Descobrir</Link></li>
          <li><Link to="/salas">Salas ao vivo</Link></li>
          <li><Link to="/comunidades">Comunidades</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </nav>

      {/* BARRA DE PESQUISA */}
      <div className="search-bar-dark">
        <input type="text" placeholder="Buscar músicas, artistas..." />
        <button className="search-btn-dark">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </div>

      {/* AÇÕES DO TOPO */}
      <div className="header-actions-dark">
        {logged ? (
          <>
            {/* 🔔 NOTIFICAÇÕES */}
            <div className="notificationContainer">
              <button
                className="notification-btn-dark"
                onClick={handleNotificationClick}
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
                  <button className="notification-footer-dark">
                    Ver todas
                  </button>
                </div>
              )}
            </div>

            {/* 👤 Perfil */}
<div className="profileContainer">
  <div className="profileBtn-dark">
    <Link to="/profile" className="profileLink">
      {user?.photoURL ? (
        <img src={user.photoURL} alt={user?.name} className="profileImg" />
      ) : (
        <div className="profileImg-placeholder-dark">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      )}
      <span>{user?.name?.split(" ")[0]}</span>
    </Link>

    <button className="profileArrowBtn" onClick={() => setMenuOpen(!menuOpen)}>
      <FaAngleDown size={16} className="arrow" />
    </button>
  </div>

  {menuOpen && (
    <div className="profile-dropdown-dark">
      <ul>
        <li>
        <Link to="/profile" className="profileLink">
            <FaUser style={{ marginRight: "8px" }} /> Perfil
          </Link>
        </li>
       
        <li>
          <Link to="/minhas-musicas">
            <FaMusic style={{ marginRight: "8px" }} /> Minhas músicas
          </Link>
        </li>
        <li>
          <Link to="/configuracoes">
            <FaCog style={{ marginRight: "8px" }} /> 404
          </Link>
        </li>
        <li onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Sair
        </li>
      </ul>
    </div>
  )}
</div>

          </>
        ) : (
          // 🔐 Links de login/registro
          <div className="auth-links">
            <Link to="/signin" className="btn-login-dark">
              Entrar
            </Link>
            <Link to="/signup" className="btn-register-dark">
              Registrar
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
