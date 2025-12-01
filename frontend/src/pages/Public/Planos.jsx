import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../../styles/pages/public/planos.scss";

export default function Planos() {
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

  const planos = [
    {
      nome: "FitWare START",
      tipo: "Mensal",
      cor: "start",
      precoAntigo: "69,90",
      precoNovo: "39,90",
      icone: "🔥",
      beneficios: [
        "Acesso ao aplicativo",
        "Treinos básicos",
        "Suporte via chat",
        "Relatórios simples",
      ],
    },
    {
      nome: "FitWare PRO",
      tipo: "Mensal",
      cor: "pro",
      precoAntigo: "119,90",
      precoNovo: "69,90",
      icone: "⚡",
      beneficios: [
        "Todos os recursos do START",
        "Treinos personalizados",
        "Agenda inteligente",
        "Gestão de alunos",
        "Relatórios avançados",
      ],
    },
    {
      nome: "FitWare ELITE",
      tipo: "Mensal",
      cor: "elite",
      precoAntigo: "199,90",
      precoNovo: "129,90",
      icone: "👑",
      beneficios: [
        "Todos os recursos do PRO",
        "Suporte prioritário",
        "Automação completa",
        "Relatórios ilimitados",
        "Ferramentas exclusivas",
      ],
    },
  ];

  return (
    <div className="home-container planos-page">
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

      <section className="titulo">
        <h2 className="fw-title">Planos FitWare</h2>
        <p className="fw-subtitle">
          Escolha o plano ideal para sua rotina de treinos e gestão.
        </p>
      </section>

      <div className="planos-container">
        {planos.map((p, i) => (
          <div key={i} className={`plano-card ${p.cor}`}>
            <div className="icone">
              <span>{p.icone}</span>
            </div>

            <h3>{p.nome}</h3>
            <span className="tipo">{p.tipo}</span>

            <ul className="beneficios">
              {p.beneficios.map((b, j) => (
                <li key={j}>✔ {b}</li>
              ))}
            </ul>

            <div className="precos">
              <p className="antigo">de R${p.precoAntigo}</p>
              <p className="novo">R${p.precoNovo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
