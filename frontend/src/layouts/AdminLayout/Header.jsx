import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/admhead.scss";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  async function handleLogout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.clear();
        window.location.href = "/"; // redireciona pro login
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  return (
    <header className="admin-header">
      <div className="container-fluid">
        <div className="row align-items-center h-100">
          <div className="col-auto">
            <h1 className="header-title mb-0">FitWare Admin</h1>
          </div>

          <div className="col"></div>

          <div className="col-auto">
            <div className="user-section">
              <div
                className={`fw-dropdown ${showDropdown ? "fw-show" : ""}`}
                ref={dropdownRef}
              >
                <button
                  className="btn user-profile-btn"
                  type="button"
                  onClick={toggleDropdown}
                  onAbort={toggleDropdown}
                  aria-expanded={showDropdown}
                >
                  <div className="user-avatar">
                    <span>JP</span>
                  </div>
                </button>

                <ul
                  className={`fw-dropdown-menu ${
                    showDropdown ? "fw-show" : ""
                  }`}
                >
                  <li>
                    <h6 className="fw-dropdown-header">João Paulo</h6>
                  </li>

                  <li>
                    <Link className="fw-dropdown-item" to="configuracoes">
                      <i className="bi bi-gear me-2"></i>
                      Configurações
                    </Link>
                  </li>
                  <li>
                    <Link className="fw-dropdown-item" to="notificacoes">
                      <i className="bi bi-bell me-2"></i>
                      Notificações
                    </Link>
                  </li>
                  <li>
                    <div className="theme-switch-wrapper fw-dropdown-item">
                      <i
                        className={`bi ${
                          isLight ? "bi-sun-fill" : "bi-moon-stars-fill"
                        }`}
                      ></i>
                      <span>{isLight ? "Modo Claro" : "Modo Escuro"}</span>
                      <div className="theme-switch" onClick={toggleTheme}>
                        <div
                          className={`switch-track ${isLight ? "light" : ""}`}
                        >
                          <div className="switch-handle"></div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <button
                      className="fw-dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Sair
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
