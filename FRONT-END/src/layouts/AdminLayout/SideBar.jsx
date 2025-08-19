import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sidebar.scss";

export default function SideBar() {
  return (
    <aside className="sidebar-admin">
      <nav>
        <ul>
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/alunos">Alunos</Link>
          </li>
          <li>
            <Link to="/admin/professores">Professores</Link>
          </li>
          <li>
            <Link to="/admin/treinos">Treinos</Link>
          </li>
          <li>
            <Link to="/admin/financeiro">Financeiro</Link>
          </li>
          <li>
            <Link to="/admin/desafios">Desafios</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
