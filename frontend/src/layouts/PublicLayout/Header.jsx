import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/pages/public/publichead.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-public">
      <nav className="navbar container-fluid">
        {/* Brand */}
        <div className="d-flex align-items-center">
          <div className="brand ">
            <div className="logo ">
              <img
                src="/src/assets/logo.png"
                className="login-avatar"
                alt="logo fitware"
              />
            </div>
            <span className="brand-text">FitWare</span>
          </div>
        </div>

        {/* Links Desktop */}
        <div className="nav-links d-none d-lg-flex">
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/planos">Planos</NavLink>
          <NavLink to="/modalidades">Modalidades</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/suporte">Suporte</NavLink>
          <Link to="/escolherlogin" className="btn btn-warning btn-enter">
            Login
          </Link>
        </div>

        {/* CTA Desktop */}

        {/* Botão Hamburguer */}
        <button
          className="menu-toggle d-lg-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list"></i>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>

          <div className="nav-links">
            <NavLink to="/" onClick={() => setMenuOpen(false)} end>
              Início
            </NavLink>
            <NavLink to="/planos" onClick={() => setMenuOpen(false)}>
              Planos
            </NavLink>
            <NavLink to="/modalidades" onClick={() => setMenuOpen(false)}>
              Modalidades
            </NavLink>
            <NavLink to="/sobre" onClick={() => setMenuOpen(false)}>
              Sobre
            </NavLink>
            <NavLink to="/suporte" onClick={() => setMenuOpen(false)}>
              Suporte
            </NavLink>
          </div>

          <div className="login-area">
            <Link
              to="/escolherlogin"
              className="btn btn-purple"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
