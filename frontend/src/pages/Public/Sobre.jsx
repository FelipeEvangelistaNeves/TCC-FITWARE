import React from "react";
import "../../styles/pages/public/sobre.scss";

const Sobre = () => {
  return (
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
            Combinamos inovação e experiência do usuário, oferecendo relatórios
            completos, gestão simplificada e aplicativo mobile intuitivo.
          </p>
        </div>
        <div className="sobre-card">
          <h3>Nosso Futuro</h3>
          <p>
            Estamos sempre evoluindo, ouvindo nossos parceiros e trazendo novas
            funcionalidades para acompanhar o crescimento do seu negócio.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
