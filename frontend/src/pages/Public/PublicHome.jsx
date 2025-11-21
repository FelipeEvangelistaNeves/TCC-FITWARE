import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/public/public.scss";

export default function PublicHome() {
  return (
    <div className="home-container ">
      {/* ================= HERO ================= */}
      <section className="hero d-flex flex-column align-items-center justify-content-center text-center">
        <h1 className="fw-bold display-4">
          Transforme seu corpo, <br /> transforme sua vida
        </h1>
        <p className="lead mt-3">Sistema completo de gestão fitness</p>

        <div className="mt-4 d-flex gap-3">
          <Link to="/planos" className="btn btn-purple">
            Experimente Grátis
          </Link>
          <Link to="/sobre" className="btn btn-outline-purple">
            Ver Demo
          </Link>
        </div>

        <div className="d-flex justify-content-center mt-5 gap-5 stats flex-wrap">
          <div>
            <h3 className="fw-bold text-warning">10K+</h3>
            <p>Usuários Ativos</p>
          </div>
          <div>
            <h3 className="fw-bold text-warning">500+</h3>
            <p>Academias</p>
          </div>
          <div>
            <h3 className="fw-bold text-warning">99%</h3>
            <p>Satisfação</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features text-center py-5">
        <h6 className="text-warning">Recursos Principais</h6>
        <h2 className="fw-bold mb-5">Tudo que você precisa em um só lugar</h2>

        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 rounded">
                <i className="bi bi-phone fs-2 pubicon"></i>
                <h5 className="mt-3 text-purple">App Mobile</h5>
                <p>Acesse de qualquer lugar com nosso app completo</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded">
                <i className="bi bi-people fs-2 pubicon"></i>
                <h5 className="mt-3">Gestão de Alunos</h5>
                <p>Controle de membros, treinos e acompanhamento</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded">
                <i className="bi bi-bar-chart fs-2 pubicon"></i>
                <h5 className="mt-3">Relatórios</h5>
                <p>Análises e insights para seu negócio crescer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PLANOS ================= */}
      <section className="planos text-center py-5">
        <h6 className="text-warning">Nossos Planos</h6>
        <h2 className="fw-bold mb-5">Escolha o plano ideal para você</h2>

        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="plan-card p-4 rounded">
                <h4 className="fw-bold">Básico</h4>
                <p className="price pubicon">R$49/mês</p>
                <p>Acesso ao app e treinos básicos</p>
                <Link to="/planos" className="btn botaoplano mt-3">
                  Escolher
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-card p-4 rounded">
                <h4 className="fw-bold">Profissional</h4>
                <p className="price pubicon">R$99/mês</p>
                <p>Gestão de alunos + relatórios avançados</p>
                <Link to="/planos" className="btn botaoplano  mt-3">
                  Escolher
                </Link>
              </div>
            </div>
            <div className="col-md-4">
              <div className="plan-card p-4 rounded">
                <h4 className="fw-bold">Premium</h4>
                <p className="price pubicon">R$149/mês</p>
                <p>Tudo incluso + suporte prioritário</p>
                <Link to="/planos" className="btn botaoplano  mt-3">
                  Escolher
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOBRE ================= */}
      <section className="sobre text-center py-5">
        <div className="container">
          <h6 className="text-warning">Sobre Nós</h6>
          <h2 className="fw-bold mb-4">Por que escolher o FitWare?</h2>
          <p className="mx-auto col-md-8">
            Criado para academias, treinadores e alunos que querem simplificar a
            gestão e potencializar resultados. Nossa plataforma une tecnologia e
            performance para transformar sua jornada fitness.
          </p>
          <Link to="/pqjuntar" className="btn botaoplano  mt-3">
            Saiba Mais
          </Link>
        </div>
      </section>

      {/* ================= SUPORTE ================= */}
      <section className="suporte text-center py-5 ">
        <div className="container">
          <h6 className="text-warning">Precisa de Ajuda?</h6>
          <h2 className="fw-bold mb-4">Nosso time está disponível para você</h2>
          <Link to="/suporte" className="btn botaoplano2 ">
            Fale com o Suporte
          </Link>
        </div>
      </section>
    </div>
  );
}
