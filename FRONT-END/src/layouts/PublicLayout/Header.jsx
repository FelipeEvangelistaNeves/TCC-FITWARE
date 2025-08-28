import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom"; // Import Bootstrap JS for dropdowns
import Logo from "../../assets/logo.png";
import "../../styles/publicHead.scss";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Logo + texto */}
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img
          src={Logo}
          alt="FitWare Logo"
          width="40"
          height="40"
          className="d-inline-block align-top rounded-circle me-2"
        />
        <div className="d-flex flex-column">
          <span className="fw-bold text-warning">FitWare</span>
          <small className="text-white fs-6">
            Plataforma de Gestão Fitness
          </small>
        </div>
      </a>

      {/* Botão responsivo (hamburger) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/sobre">
              Sobre
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/Por-que-se-juntar">
              Por que se juntar?
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/planos">
              Planos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/modalidades">
              Modalidades
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-warning" to="/suporte">
              Suporte
            </Link>
          </li>
        </ul>
      </div>

      {/* Botão Registrar */}
      <div className="dropdown me-5">
        <button
          className="btn btn-sm btn-purple px-3 dropdown-toggle me-3"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Login
        </button>

        <ul
          className="dropdown-menu dropdown-menu-start"
          aria-labelledby="dropdownMenuButton"
          // style={{ left: "auto", right: 0 }}
        >
          <li>
            <Link className="dropdown-item" to="/login/admin">
              Administrador
            </Link>
          </li>

          <li>
            <Link className="dropdown-item" to="/login/aluno">
              Aluno
            </Link>
          </li>
          <li></li>
          <li>
            <Link className="dropdown-item" to="/login/professor">
              Professor
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
