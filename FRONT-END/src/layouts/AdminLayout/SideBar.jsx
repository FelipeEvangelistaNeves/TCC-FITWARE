import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: "bi-speedometer2",
    },
    {
      path: "/admin/alunos",
      label: "Alunos",
      icon: "bi-people",
    },
    {
      path: "/admin/professores",
      label: "Professores",
      icon: "bi-person-badge",
    },
    {
      path: "/admin/treinos",
      label: "Treinos",
      icon: "bi-activity",
    },
    {
      path: "/admin/financeiro",
      label: "Financeiro",
      icon: "bi-graph-up",
    },
    {
      path: "/admin/desafios",
      label: "Desafios",
      icon: "bi-trophy",
    },
  ];

  return (
    <aside className="sidebar-admin d-flex flex-column flex-shrink-0 p-3">
      {/* Logo/Brand */}
      <Link
        to="/admin"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none brand-link"
      >
        <div className="brand-icon me-2">
          <i className="bi bi-lightning-charge"></i>
        </div>
        <span className="fs-5 brand-text">FitWare</span>
      </Link>

      <hr className="sidebar-divider" />

      {/* Navigation Menu */}
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
            >
              <i className={`bi ${item.icon} pe-none me-2`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="sidebar-divider" />

      {/* User Profile Dropdown */}
      <div className={`dropdown ${showUserDropdown ? "show" : ""}`}>
        <button
          className="btn d-flex align-items-center text-decoration-none dropdown-toggle user-dropdown-btn w-100"
          type="button"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          aria-expanded={showUserDropdown}
        >
          <div className="user-avatar me-2">
            <span>JP</span>
          </div>
          <div className="user-info">
            <strong className="user-name">João Paulo</strong>
            <small className="user-role">Administrator</small>
          </div>
        </button>

        <ul
          className={`dropdown-menu text-small shadow w-100 ${
            showUserDropdown ? "show" : ""
          }`}
        >
          <li>
            <Link className="dropdown-item" to="/admin/profile">
              <i className="bi bi-person me-2"></i>
              Meu Perfil
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/settings">
              <i className="bi bi-gear me-2"></i>
              Configurações
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/preferences">
              <i className="bi bi-sliders me-2"></i>
              Preferências
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={() => console.log("Logout")}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Sair
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
