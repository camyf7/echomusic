import React, { useState, useEffect, useRef } from "react";
import "./Topo.css";
import { Menu, X, Search, Bell, Music } from "lucide-react";
import { Link } from "react-router-dom";

import luana from "../../assets/host_luana.jpeg";
import starboy from "../../assets/musica_starboy.png";
import after from "../../assets/after.jpeg";
import Blinding from "../../assets/blinding.jpeg";

const logo = "/logo.png"; // certifique-se que tem essa imagem na pasta public

export default function Topo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef(null);

  const searchResults = [
    { type: "artist", name: "The Weeknd", image: starboy },
    { type: "song", name: "Blinding Lights", artist: "The Weeknd", image: Blinding },
    { type: "album", name: "After Hours", artist: "The Weeknd", image: after },
  ];

  const notifications = [
    { id: 1, text: "Nova música adicionada: The Weeknd lançou um novo single" },
    { id: 2, text: "Playlist atualizada: Sua playlist favorita tem novas músicas" },
  ];

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/descobrir", label: "Descobrir" },
    { to: "/salas", label: "Salas ao vivo" },
    { to: "/comunidades", label: "Comunidades" },
    { to: "/sobre", label: "Sobre" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
        setIsSearchFocused(false);
      }
      if (!event.target.closest(".notifications-container")) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowSearchResults(searchQuery.length > 0 && isSearchFocused);
  }, [searchQuery, isSearchFocused]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="EchoMusic Logo" />
        </div>

        {/* Links Desktop */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Direita */}
        <div className="nav-right">
          {/* Search */}
          <div ref={searchRef} className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar músicas, artistas, álbuns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            {showSearchResults && (
              <div className="search-results">
                {searchResults.map((result, i) => (
                  <div
                    key={i}
                    className="result-item"
                    onClick={() => setSearchQuery("")}
                  >
                    {result.image && <img src={result.image} alt={result.name} />}
                    <div>
                      <div>{result.name}</div>
                      <div>{result.type === "song" ? result.artist : result.type}</div>
                    </div>
                    <Music className="result-icon" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="notifications-container">
            <div
              className="notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell />
              {notifications.length > 0 && (
                <span className="notification-dot">{notifications.length}</span>
              )}
            </div>
            {showNotifications && (
              <div className="notifications-dropdown">
                {notifications.map((note) => (
                  <div key={note.id} className="notification-item">
                    {note.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="avatar">
            <img src={luana} alt="Perfil" />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
