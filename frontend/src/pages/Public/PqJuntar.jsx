import "../../styles/pages/public/pqjuntar.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
const PqJuntar = () => {
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
      <div className="pqjuntar-page">
        <section className="sobre-intro">
          <h2>Junte-se a Nós e Transforme Sua Gestão Fitness</h2>
          <p>
            Integração de professores, administradores e alunos em um
            ecossistema único e eficiente. Alcance a excelência operacional,
            maximize sua receita e proporcione uma experiência inesquecível aos
            seus clientes.
          </p>
        </section>

        <section className="sobre-missao">
          <div className="sobre-card">
            <h3>Tecnologia que Pensa no Amanhã</h3>
            <p>
              Nossa plataforma não é apenas um sistema de gestão; é o futuro do
              seu negócio fitness. Investimos continuamente em Inteligência
              Artificial e funcionalidades mobile de ponta para garantir que
              você sempre ofereça a melhor experiência. Junte-se a nós para ter
              acesso imediato a ferramentas que a concorrência só terá daqui a
              alguns anos.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Opere com Eficiência Máxima</h3>
            <p>
              Diga adeus às planilhas e à papelada. Centralize tudo: criação de
              desafios e brinde, controle de pessoas, gestão de serviçoes e
              comunicação com o aluno em um só lugar. Nossa interface intuitiva
              reduz drasticamente o tempo gasto em tarefas administrativas,
              permitindo que sua equipe se dedique ao que é mais importante:
              cuidar dos seus alunos.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Construa Clientes para a Vida</h3>
            <p>
              Oferecemos um aplicativo exclusivo para o aluno que é um
              verdadeiro centro de engajamento. Com ele, seus clientes podem
              acompanhar treinos, dar feedback ao professor e participar de
              desafios. Uma experiência personalizada e motivadora resulta em
              maior satisfação, melhor retenção e mais indicações orgânicas para
              o seu negócio.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PqJuntar;
