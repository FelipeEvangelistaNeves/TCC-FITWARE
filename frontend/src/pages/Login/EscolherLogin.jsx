import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaMoon, FaSun } from "react-icons/fa";
import "../../styles/pages/login/escolherlogin.scss";

const EscolherLogin = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("fitware-theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
      setIsLight(true);
    }
  }, []);

  const toggleTheme = (mode) => {
    const isLightMode = mode === "light";
    setIsLight(isLightMode);

    if (isLightMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("fitware-theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("fitware-theme", "dark");
    }
  };
  return (
    <div className="home-container">
      <div className="theme-switch">
        <div className="container-theme">
          <button
            className={!isLight ? "active" : ""}
            onClick={() => toggleTheme("dark")}
          >
            <FaMoon />
          </button>

          <button
            className={isLight ? "active" : ""}
            onClick={() => toggleTheme("light")}
          >
            <FaSun />
          </button>
        </div>
      </div>
      <div className="escolher-login-container">
        <div className="login-card">
          <h2 className="title">Onde deseja logar?</h2>
          <p className="subtitle">Escolha abaixo o seu tipo de acesso</p>

          <div className="botoes-login">
            <Link to="/login/aluno" className="btn btn-aluno">
              Acesso como Aluno
            </Link>
            <Link to="/login/professor" className="btn btn-professor">
              Acesso como Professor
            </Link>
            <Link to="/login/admin" className="btn btn-admin">
              Acesso como Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscolherLogin;
