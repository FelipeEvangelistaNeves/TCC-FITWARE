import React from "react";
import "../../styles/pages/public/planos.scss";

export default function Planos() {
  const planos = [
    {
      id: 1,
      titulo: "Básico",
      preco: "R$49/mês",
      beneficios: ["App Mobile", "Treinos básicos"],
      destaque: false,
    },
    {
      id: 2,
      titulo: "Profissional",
      preco: "R$99/mês",
      beneficios: [
        "Gestão de alunos",
        "Relatórios detalhados",
        "Suporte padrão",
      ],
      destaque: true,
    },
    {
      id: 3,
      titulo: "Premium",
      preco: "R$149/mês",
      beneficios: [
        "Tudo incluso",
        "Suporte prioritário",
        "Relatórios avançados",
      ],
      destaque: false,
    },
  ];

  return (
    <div className="planos-page">
      <header className="text-center my-5">
        <h1 className="fw-bold">Nossos Planos</h1>
        <p className="text-muted">Escolha o ideal para sua jornada fitness</p>
      </header>

      <div className="container">
        <div className="row g-4">
          {planos.map((plano) => (
            <div className="col-md-4" key={plano.id}>
              <div className={`plan-card ${plano.destaque ? "destaque" : ""}`}>
                <h3>{plano.titulo}</h3>
                <p className="preco">{plano.preco}</p>
                <ul>
                  {plano.beneficios.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button className="btn btn-purple w-100 mt-3">Escolher</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
