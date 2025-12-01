import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "../../styles/pages/public/modalidades.scss";
import "../../styles/pages/public/public.scss";

const Modalidades = () => {
  const [isLight, setIsLight] = useState(false);

  // Carregar tema salvo
  useEffect(() => {
    const saved = localStorage.getItem("fitware-theme");
    if (saved === "light") {
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

  // ============================
  //   MODALIDADES OFICIAIS
  // ============================

  const modalidades = [
    {
      titulo: "Cardio",
      intensidade: "Moderada",
      complexidade: "Baixa",
      img: "/img/modalidades/cardio.jpg",
      descricao:
        "Atividades como corrida, bike e exercícios aeróbicos que estimulam o sistema cardiorrespiratório, melhorando resistência e condicionamento.",
    },
    {
      titulo: "Força",
      intensidade: "Alta",
      complexidade: "Média",
      img: "/img/modalidades/forca.jpg",
      descricao:
        "Treinos de musculação voltados para hipertrofia, potência e resistência muscular, utilizando cargas variadas e movimentos amplos.",
    },
    {
      titulo: "Funcional",
      intensidade: "Alta",
      complexidade: "Média",
      img: "/img/modalidades/funcional.jpg",
      descricao:
        "Exercícios dinâmicos que trabalham grupos musculares de forma integrada, melhorando equilíbrio, coordenação, força e explosão.",
    },
    {
      titulo: "Yoga",
      intensidade: "Leve",
      complexidade: "Baixa",
      img: "/img/modalidades/yoga.jpg",
      descricao:
        "Prática que combina técnicas de respiração, alongamento e foco mental para relaxamento, consciência corporal e bem-estar geral.",
    },
  ];

  return (
    <div className="home-container">
      {/* THEME SWITCH */}
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

      {/* PÁGINA */}
      <div className="modalidades-page">
        <section className="intro">
          <h2>Conheça nossas Modalidades</h2>
          <p>Treinos completos para diferentes objetivos e perfis.</p>
        </section>

        {/* GRID */}
        <div className="modalidades-grid">
          {modalidades.map((m, index) => (
            <div key={index} className="modalidade-card">
              {/* IMAGEM */}
              <img src={m.img} alt={m.titulo} className="card-img" />

              {/* BARRA DO TÍTULO */}
              <div className="card-title-bar">
                <h3>{m.titulo}</h3>
              </div>

              {/* CONTEÚDO */}
              <div className="card-content">
                <div className="card-infos">
                  <div className="info-block">
                    <i className="bi bi-activity"></i>
                    <span>Intensidade</span>
                    <small>{m.intensidade}</small>
                  </div>

                  <div className="info-block">
                    <i className="bi bi-lightning-charge"></i>
                    <span>Complexidade</span>
                    <small>{m.complexidade}</small>
                  </div>
                </div>

                <p className="descricao">{m.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modalidades;
