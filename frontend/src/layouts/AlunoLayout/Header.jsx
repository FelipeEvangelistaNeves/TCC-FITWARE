import React from "react";
import { Bell } from "lucide-react";
import "../../styles/layout/mobHeader.scss";
import { LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function HeaderAluno({ title }) {
  const [iniciais, setIniciais] = useState("");

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/alunos", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar dados do aluno");

        const data = await res.json();
        setIniciais(data.iniciais);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlunos();
  }, []); // executa apenas 1x ao montar o componente
  async function handleLogout() {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/"; // redireciona pro login
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  }

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
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
  return (
    <header className="header-professor py-3 px-4 border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h5 className="page-title m-0">{title}</h5>
        <div className="d-flex align-items-center gap-3">
          <div className="profile-avatar"> {iniciais} </div>

          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
