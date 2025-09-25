import React from "react";
import "../../styles/pages/public/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Marca */}
        <div className="footer-brand">
          <div className="brand-icon">F</div>
          <span className="brand-text">FitWare</span>
        </div>

        {/* Links */}
        <div className="footer-links">
          <a href="/planos">Planos</a>
          <a href="/modalidades">Modalidades</a>
          <a href="/sobre">Sobre</a>
          <a href="/suporte">Suporte</a>
        </div>

        {/* Social */}
        <div className="footer-social">
          <a href="#">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} FitWare - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
