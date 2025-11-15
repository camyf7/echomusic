import './footer.css';
import React, { useState } from 'react';
import { Music, Radio, TrendingUp, Users, User, Heart, Mail, Instagram, Twitter, Github, Headphones, UserCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="footer-minimal">
      {/* Animated Sound Wave Bars Background */}
      <div className="sound-wave-bg">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="wave-bar"
            style={{
              left: `${i * 2}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <div className="logo-wrapper">
           
            <span className="logo-text">ECHOMUSIC</span>
          </div>
          <p className="tagline">Transformando a experiência musical através de conexões sociais autênticas. A música soa melhor juntos.</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links-group">
          <div className="links-column">
            <h4><Radio size={16} /> Explorar</h4>
            <a href="/"><Radio size={14} /> Início</a>
            <a href="/descobrir"><TrendingUp size={14} /> Descobrir</a>
            <a href="/salas"><Headphones size={14} /> Salas ao Vivo</a>
            <a href="/comunidades"><Users size={14} /> Comunidades</a>
          </div>

          <div className="links-column">
            <h4><User size={16} /> Conta</h4>
            <a href="/profile"><UserCircle size={14} /> Perfil</a>
            <a href="/editprofile"><User size={14} /> Editar Perfil</a>
            <a href="/signin"><User size={14} /> Entrar</a>
            <a href="/signup"><User size={14} /> Criar Conta</a>
          </div>

          <div className="links-column">
            <h4><Heart size={16} /> Sobre</h4>
            <a href="/sobre"><Heart size={14} /> Sobre Nós</a>
            <a href="#contact"><Mail size={14} /> Contato</a>
            <a href="#privacy"><User size={14} /> Privacidade</a>
            <a href="#terms"><User size={14} /> Termos de Uso</a>
          </div>
        </div>

        {/* Newsletter Compact */}
        <div className="newsletter-compact">
          <h4><Mail size={16} /> Newsletter</h4>
          <p className="newsletter-desc">Receba as últimas novidades musicais</p>
          <form onSubmit={handleSubscribe} className="newsletter-form-inline">
            <input 
              type="email" 
              placeholder="seu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              required
            />
            <button type="submit" className="subscribe-btn">
              {subscribed ? '✓' : '→'}
            </button>
          </form>
          {subscribed && <span className="success-msg">✓ Inscrito com sucesso!</span>}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span className="copyright">© 2025 EchoMusic. Todos os direitos reservados.</span>
        <div className="legal-links">
          <a href="#privacy">Privacidade</a>
          <span className="separator">•</span>
          <a href="#terms">Termos</a>
          <span className="separator">•</span>
          <a href="#cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
