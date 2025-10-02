import React from "react";
import "../../styles/pages/public/modalidades.scss";

const Modalidades = () => {
  const modalidades = [
    {
      icon: "bi-heart-pulse",
      titulo: "Cardio",
      descricao:
        "Corrida, bike, esteira e exercícios aeróbicos para melhorar o condicionamento físico.",
    },
    {
      icon: "bi-lightning-charge",
      titulo: "Força",
      descricao:
        "Treinos de musculação focados em hipertrofia, resistência e potência muscular.",
    },
    {
      icon: "bi-person-walking",
      titulo: "Funcional",
      descricao:
        "Exercícios dinâmicos que trabalham várias partes do corpo de forma integrada.",
    },
    {
      icon: "bi-flower3",
      titulo: "Yoga",
      descricao:
        "Práticas de relaxamento, alongamento e respiração para corpo e mente.",
    },
  ];

  return (
    <div className="modalidades-page">
      <section className="intro">
        <h2>Nossas Modalidades</h2>
        <p>
          Oferecemos treinos completos para atender diferentes perfis e
          objetivos.
        </p>
      </section>

      <div className="modalidades-grid">
        {modalidades.map((m, idx) => (
          <div key={idx} className="modalidade-card">
            <i className={`bi ${m.icon} icone`}></i>
            <h4>{m.titulo}</h4>
            <p>{m.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modalidades;
