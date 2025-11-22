import "../../styles/pages/public/sobre.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
const Sobre = () => {
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
      <div className="sobre-page">
        <section className="sobre-intro">
          <h2>Sobre a FitWare</h2>
          <p>
            A FitWare nasceu com o propósito de transformar academias e estúdios
            em negócios mais organizados, modernos e conectados com seus alunos.
          </p>
        </section>

        <section className="sobre-missao">
          <div className="sobre-card">
            <h3>Nossa Missão</h3>
            <p>
              Fornecer tecnologia de ponta para simplificar a gestão fitness,
              conectando professores, alunos e administradores em um só lugar.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Nosso Diferencial</h3>
            <p>
              Combinamos inovação e experiência do usuário, oferecendo
              relatórios completos, gestão simplificada e aplicativo mobile
              intuitivo.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Nosso Futuro</h3>
            <p>
              Estamos sempre evoluindo, ouvindo nossos parceiros e trazendo
              novas funcionalidades para acompanhar o crescimento do seu
              negócio.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Nosso Compromisso </h3>
            <p>
              Promovemos uma cultura de aprendizado constante, incentivando o
              desenvolvimento profissional de cada membro. Agimos com ética e
              responsabilidade em todas as nossas interações com clientes e
              parceiros.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Nosso Impacto</h3>
            <p>
              Utilizar nossa tecnologia e influência para promover um impacto
              positivo na sociedade, apoiando causas ligadas ao bem-estar, saúde
              e inclusão digital.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Nossa Equipe</h3>
            <p>
              Nossa equipe de suporte está disponível 24/7 para resolver
              qualquer desafio. Vamos além do produto, atuando como parceiros
              estratégicos para ajudar nossos clientes a alcançar seus objetivos
              de negócio.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Nossa Tendência</h3>
            <p>
              Continuar a aprimorar nosso canal de feedback, transformando as
              sugestões dos clientes em novas funcionalidades e elevando o
              padrão de excelência no atendimento do nosso setor.
            </p>
          </div>
          <div className="sobre-card">
            <h3>Muito mais</h3>
            <p>O objetivo é melhorar sempre! Acompanhe nossa jornada.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sobre;
