import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <div className="footer-content">
        {/* Logo + texto */}
        <div className="footer-brand">
          <h2 className="logo">ECHOMUSIC</h2>
          <p>
            Transformando a experiência musical através de conexões sociais autênticas.
            A música soa melhor juntos.
          </p>
          <div className="socials">
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-pinterest"></i></a>
          </div>
        </div>

        {/* Links Produto */}
        <div className="footer-links">
          <h3>Produto</h3>
          <ul>
            <li><a href="#">Salas ao Vivo</a></li>
            <li><a href="#">Comunidades</a></li>
            <li><a href="#">Descobrir</a></li>
            <li><a href="#">Perfil</a></li>
          </ul>
        </div>

        {/* Links Empresa */}
        <div className="footer-links">
          <h3>Empresa</h3>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Carreira</a></li>
            <li><a href="#">Imprensa</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Echo Music. Todos os direitos reservados.</p>
        <div className="footer-legal">
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}


    
