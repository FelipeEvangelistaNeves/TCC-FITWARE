import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/public/planos.scss";

export default function Planos() {
  return (
    <div className="planos-page">
      {/* Cabeçalho */}
      <section className="planos-header text-center py-5">
        <h6 className="text-warning">Nossos Planos</h6>
        <h2 className="fw-bold mb-4">Escolha o plano ideal para você</h2>
        <p className="lead text-white mx-auto mb-4">
          Planos flexíveis para alunos, professores e administradores. Pague
          apenas pelo que precisa e tenha controle total da sua academia.
        </p>
      </section>

      {/* Cards de Planos */}
      <section className="planos container py-5">
        <div className="row g-4">
          {/* Básico */}
          <div className="col-md-4">
            <div className="plan-card p-4 rounded">
              <h4 className="fw-bold">Básico</h4>
              <p className="price pubicon">R$49/mês</p>
              <ul className="beneficios">
                <li>Acesso ao app</li>
                <li>Treinos básicos</li>
                <li>Suporte padrão</li>
              </ul>
              <Link to="/escolherlogin" className="btn botaoplano mt-3">
                Escolher
              </Link>
            </div>
          </div>

          {/* Profissional */}
          <div className="col-md-4">
            <div className="plan-card p-4 rounded">
              <h4 className="fw-bold">Profissional</h4>
              <p className="price pubicon">R$99/mês</p>
              <ul className="beneficios">
                <li>Gestão de alunos</li>
                <li>Relatórios avançados</li>
                <li>Treinos personalizados</li>
              </ul>
              <Link to="/escolherlogin" className="btn botaoplano2 mt-3">
                Escolher
              </Link>
            </div>
          </div>

          {/* Premium */}
          <div className="col-md-4">
            <div className="plan-card p-4 rounded">
              <h4 className="fw-bold">Premium</h4>
              <p className="price pubicon">R$149/mês</p>
              <ul className="beneficios">
                <li>Tudo incluso</li>
                <li>Suporte prioritário</li>
                <li>Relatórios ilimitados</li>
              </ul>
              <Link to="/escolherlogin" className="btn botaoplano mt-3">
                Escolher
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
