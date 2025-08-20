import React from "react";
import { useState } from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Lógica de logout aqui
    console.log("Logout");
  };
  return (
    <header className="admin-header">
      <div className="container-fluid">
        <div className="row align-items-center h-100">
          {/* Logo/Title */}
          <div className="col-auto">
            <h1 className="header-title mb-0 ">FitWare Admin</h1>
          </div>

          {/* Spacer */}
          <div className="col"></div>

          {/* User Profile Section */}
          <div className="col-auto">
            <div className="user-section">
              {/* Notification Badge */}
              <div className="notification-badge me-3">
                <span className="badge bg-purple">3</span>
              </div>

              {/* User Profile Dropdown */}
              <div className={`dropdown ${showDropdown ? "show" : ""}`}>
                <button
                  className="btn user-profile-btn"
                  type="button"
                  onClick={toggleDropdown}
                  aria-expanded={showDropdown}
                >
                  <div className="user-avatar">
                    <span>JP</span>
                  </div>
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    showDropdown ? "show" : ""
                  }`}
                >
                  <li>
                    <h6 className="dropdown-header">João Paulo</h6>
                  </li>
                  <li>
                    <span className="dropdown-item-text text-muted small">
                      Administrator
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-person me-2"></i>
                      Meu Perfil
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-gear me-2"></i>
                      Configurações
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-bell me-2"></i>
                      Notificações
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
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

// Componente de exemplo para demonstração
