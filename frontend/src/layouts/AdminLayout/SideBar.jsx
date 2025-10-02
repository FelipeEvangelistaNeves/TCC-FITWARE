import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/layout/sidebar.scss";
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
      icon: "bi-watch",
    },
    {
      path: "/admin/brindes",
      label: "brindes",
      icon: "bi-trophy",
    },
  ];

  return (
    <aside className="sidebar-admin ">
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
              className={`nav-link-adm ${isActive(item.path) ? "active" : ""}`}
            >
              <i className={`bi ${item.icon} pe-none me-2`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
