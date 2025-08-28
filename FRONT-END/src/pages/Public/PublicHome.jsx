import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/public.scss";

const Home = () => {
  return (
    <div className="home-container text-light">
      {/* Hero Section */}
      <section className="hero d-flex flex-column align-items-center justify-content-center text-center">
        <h1 className="fw-bold display-4">
          Transforme seu corpo, <br /> transforme sua vida
        </h1>
        <p className="lead mt-3">Sistema completo de gestão fitness</p>

        <div className="mt-4">
          <button className="btn btn-purple me-2">Experimente Grátis</button>
          <button className="btn btn-outline-purple">Ver Demo</button>
        </div>

        <div className="d-flex justify-content-center mt-5 gap-5 stats">
          <div>
            <h3 className="fw-bold">10K+</h3>
            <p>Usuários Ativos</p>
          </div>
          <div>
            <h3 className="fw-bold">500+</h3>
            <p>Academias</p>
          </div>
          <div>
            <h3 className="fw-bold">99%</h3>
            <p>Satisfação</p>
          </div>
        </div>
      </section>

      {/* Recursos Section */}
      <section className="features text-center py-5">
        <h6 className="text-warning">Recursos Principais</h6>
        <h2 className="fw-bold mb-5">
          Tudo que você precisa em um só lugar
        </h2>

        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card p-4 rounded">
                <i className="bi bi-phone fs-2 text-purple"></i>
                <h5 className="mt-3">App Mobile</h5>
                <p className="text-muted">
                  Acesse de qualquer lugar com nosso aplicativo mobile completo
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded">
                <i className="bi bi-people fs-2 text-purple"></i>
                <h5 className="mt-3">Gestão de Alunos</h5>
                <p className="text-muted">
                  Controle completo de membros, treinos e acompanhamento
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4 rounded">
                <i className="bi bi-bar-chart fs-2 text-purple"></i>
                <h5 className="mt-3">Relatórios</h5>
                <p className="text-muted">
                  Análises detalhadas e insights para seu negócio crescer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
