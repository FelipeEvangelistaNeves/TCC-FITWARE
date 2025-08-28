// src/components/Main.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import heroImg from "../../assets/logo.png"; // substitua pelo caminho correto da imagem
import aboutImg from "../../assets/logo.png"; // substitua pelo caminho correto da imagem
import { FaDumbbell, FaHeartbeat, FaUserFriends, FaSpa } from "react-icons/fa";

const PublicHome = () => {
  return (
    <main className="bg-dark">
      {/* HERO */}
      <section className="hero-section d-flex align-items-center text-white">
        <div className="container">
          <div className="row align-items-center">
            {/* Texto */}
            <div className="col-md-6">
              <h2 className="fw-bold">Comece uma melhor versão de você!</h2>
              <h3 className="fw-bold highlight">Venha se juntar a nós!</h3>
              <button className="btn btn-warning mt-3">Saiba Mais</button>
            </div>
            {/* Imagem */}
            <div className="col-md-6 text-center">
              <img
                src={heroImg}
                alt="Treinando"
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="about-section py-5 text-center text-white">
        <div className="container">
          <small className="text-warning">Sobre</small>
          <h2 className="fw-bold mt-2">FITWARE UM SISTEMA DE ACADEMIAS</h2>
          <p className="mt-3">
            A FitWare é um sistema inovador criado para transformar a forma como
            academias e alunos interagem. Nosso foco é oferecer treinamentos
            personalizados, acompanhamento profissional e uma experiência
            completa de evolução física através da tecnologia.
          </p>

          <div className="row mt-5 g-4">
            <div className="col-md-3">
              <div className="card feature-card h-100 align-items-center justify-content-center p-3">
                <FaUserFriends size={40} className="mb-3 text-warning" />
                <h5>Crie com profissionais</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card feature-card h-100 align-items-center justify-content-center p-3">
                <FaDumbbell size={40} className="mb-3 text-warning" />
                <h5>Treinamento</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card feature-card h-100 align-items-center justify-content-center p-3">
                <FaHeartbeat size={40} className="mb-3 text-warning" />
                <h5>Recompensas</h5>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card feature-card h-100 align-items-center justify-content-center p-3">
                <FaSpa size={40} className="mb-3 text-warning" />
                <h5>Bem-estar</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PublicHome;
