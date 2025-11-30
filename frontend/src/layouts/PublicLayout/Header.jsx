import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/pages/public/publichead.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("fitware-theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsLight(!isLight);

    if (!isLight) {
      document.body.classList.add("light-mode");
      localStorage.setItem("fitware-theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("fitware-theme", "dark");
    }
  };
  return (
    <header className="header-public">
      <nav className="navbar container-fluid">
        {/* Brand */}
        <div className="d-flex align-items-center">
          <div className="brand ">
            <div className="logo ">
              <Link to="/">
                <img
                  src="/src/assets/logo.png"
                  className="login-avatar"
                  alt="logo fitware"
                />
              </Link>
            </div>
            <Link to="/">
              <span className="brand-text">FitWare</span>
            </Link>
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
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              end
              className="linkes"
            >
              Início
            </NavLink>
            <NavLink
              to="/planos"
              onClick={() => setMenuOpen(false)}
              className="linkes"
            >
              Planos
            </NavLink>
            <NavLink
              to="/modalidades"
              onClick={() => setMenuOpen(false)}
              className="linkes"
            >
              Modalidades
            </NavLink>
            <NavLink
              to="/sobre"
              onClick={() => setMenuOpen(false)}
              className="linkes"
            >
              Sobre
            </NavLink>
            <NavLink
              to="/suporte"
              onClick={() => setMenuOpen(false)}
              className="linkes"
            >
              Suporte
            </NavLink>
            <button className="btn btn-purple">
              <Link to="/escolherlogin" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
