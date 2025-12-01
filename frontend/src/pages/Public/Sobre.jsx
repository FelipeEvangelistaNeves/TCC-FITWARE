import "../../styles/pages/public/sobre.scss";
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaPlus, FaMinus } from "react-icons/fa";
import Logo from "../../assets/logo.png"; // ajuste o nome se necessário

const Sobre = () => {
  const [isLight, setIsLight] = useState(false);

  const [open, setOpen] = useState({
    missao: true,
    visao: false,
    valores: false,
  });

  const toggleBox = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    <div className="home-container sobre-wrapper">
      {/* SWITCH TEMA */}
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
        {/* INTRO COM LOGO */}
        <section className="sobre-intro">
          <div className="sobre-left">
            <h2>Sobre a FitWare</h2>
            <p className="intro-text">
              A FitWare é uma plataforma inteligente desenvolvida para facilitar
              a gestão de academias, estúdios e personal trainers — conectando
              alunos, professores e administradores em um único sistema moderno,
              organizado e intuitivo.
            </p>

            <p className="intro-text">
              Nosso objetivo é elevar o nível da gestão fitness no Brasil,
              trazendo tecnologia de verdade para o dia a dia de quem precisa
              ganhar tempo, performance e estabilidade.
            </p>
          </div>

          <div className="sobre-right">
            <img src={Logo} alt="FitWare Logo" className="sobre-logo" />
          </div>
        </section>

        {/* CARDS */}
        <section className="sobre-cards">
          {/* MISSÃO */}
          <div className="sobre-card">
            <h3>MISSÃO</h3>
            <p className="sub">clique em ver mais</p>

            <button className="toggle" onClick={() => toggleBox("missao")}>
              {open.missao ? <FaMinus /> : <FaPlus />} Ver mais
            </button>

            {open.missao && (
              <div className="content">
                <p>
                  Facilitar e profissionalizar a gestão fitness, oferecendo um
                  sistema completo que centraliza treinos, desafios, pagamentos,
                  alunos, professores e relatórios — tudo de forma simples e
                  eficiente.
                </p>
              </div>
            )}
          </div>

          {/* VISÃO */}
          <div className="sobre-card">
            <h3>VISÃO</h3>
            <p className="sub">clique em ver mais</p>

            <button className="toggle" onClick={() => toggleBox("visao")}>
              {open.visao ? <FaMinus /> : <FaPlus />} Ver mais
            </button>

            {open.visao && (
              <div className="content">
                <p>
                  Ser reconhecida como a principal plataforma de tecnologia
                  fitness do país — unindo design, inovação e ferramentas reais
                  que ajudam negócios a crescer com segurança e organização.
                </p>
              </div>
            )}
          </div>

          {/* VALORES */}
          <div className="sobre-card">
            <h3>VALORES</h3>
            <p className="sub">clique em ver mais</p>

            <button className="toggle" onClick={() => toggleBox("valores")}>
              {open.valores ? <FaMinus /> : <FaPlus />} Ver mais
            </button>

            {open.valores && (
              <div className="content">
                <p>
                  Simplicidade, inovação contínua, transparência, estabilidade e
                  foco absoluto no usuário. Acreditamos que tecnologia só faz
                  sentido quando facilita a vida de quem usa.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* TEXTO FINAL */}
        <section className="sobre-extra">
          <h3>Nossa História</h3>
          <p>
            A FitWare surgiu da necessidade real de criar um sistema que fosse
            prático, rápido, organizado e fácil para qualquer academia — desde
            pequenos estúdios até unidades maiores.
          </p>

          <p>
            Unimos experiência no mercado fitness e conhecimento em
            desenvolvimento de software para construir uma plataforma completa,
            segura e constantemente atualizada.
          </p>

          <p>
            Evoluímos ouvindo diariamente alunos, professores e gestores. Cada
            nova funcionalidade nasce de uma necessidade real — e é assim que a
            FitWare se mantém moderna, leve e eficiente.
          </p>

          <p className="final-text">
            O futuro da gestão fitness é digital, e nós estamos preparando o
            caminho. Vamos crescer juntos?
          </p>
        </section>
      </div>
    </div>
  );
};

export default Sobre;
