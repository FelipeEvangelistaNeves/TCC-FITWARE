import React from "react";
import "../../styles/pages/public/suporte.scss";

const Suporte = () => {
  return (
    <div className="suporte-container">
      {/* Header da Página */}
      <header className="suporte-header text-center">
        <h1>Central de Suporte</h1>
        <p>Encontre respostas ou entre em contato com nossa equipe</p>
      </header>

      {/* Seções de Suporte */}
      <section className="suporte-sections container">
        <div className="suporte-card">
          <i className="bi bi-question-circle"></i>
          <h3>Perguntas Frequentes</h3>
          <p>
            Acesse nossa base de conhecimento e encontre respostas rápidas para
            as dúvidas mais comuns.
          </p>
          <button className="botaosup">Ver FAQs</button>
        </div>

        <div className="suporte-card">
          <i className="bi bi-envelope"></i>
          <h3>Contato por E-mail</h3>
          <p>
            Não encontrou o que precisava? Envie uma mensagem para nossa equipe
            de suporte.
          </p>
          <button className="botaosup">Enviar Mensagem</button>
        </div>

        <div className="suporte-card">
          <i className="bi bi-chat-dots"></i>
          <h3>Atendimento Online</h3>
          <p>
            Converse com um de nossos atendentes em tempo real pelo chat de
            suporte.
          </p>
          <button className="botaosup">Abrir Chat</button>
        </div>
      </section>

      {/* FAQ Expandível */}
      <section className="suporte-faq container">
        <h2>Perguntas Frequentes</h2>
        <div className="faq-item">
          <h4>Como redefinir minha senha?</h4>
          <p>
            Vá até a página de login, clique em "Esqueci minha senha" e siga as
            instruções enviadas por e-mail.
          </p>
        </div>
        <div className="faq-item">
          <h4>Como alterar meu plano?</h4>
          <p>
            Acesse o painel do usuário, vá até "Planos" e selecione o novo plano
            desejado.
          </p>
        </div>
        <div className="faq-item">
          <h4>Posso cancelar quando quiser?</h4>
          <p>
            Sim, você pode cancelar sua assinatura a qualquer momento sem custos
            adicionais.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Suporte;
