import React from "react";
import "./../../styles/pages/aluno/configModal.scss";

export default function TermosModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="aluno-prof-config-modal">
        <div className="modal-overlay" onClick={onClose}></div>

        <div className="config-modal termos-modal">
          <h2>Termos de Uso</h2>

          <div className="termos-content">
            <p>
              Bem-vindo ao nosso aplicativo de acompanhamento de treinos. 
              Ao utilizar nossos serviços, você concorda plenamente com os seguintes Termos de Uso.
            </p>

            <h3>1. Uso da Plataforma</h3>
            <p>
              O usuário se compromete a utilizar o sistema de forma ética, 
              sem tentativa de fraude, acesso indevido ou uso abusivo das funcionalidades.
            </p>

            <h3>2. Informações e Privacidade</h3>
            <p>
              As informações fornecidas no cadastro serão usadas exclusivamente 
              para personalização do treino e funcionamento da plataforma.
            </p>

            <h3>3. Responsabilidade sobre Treinos</h3>
            <p>
              As orientações de treino fornecidas são de caráter instrutivo. 
              O usuário é responsável por avaliar suas condições físicas 
              e buscar orientação profissional quando necessário.
            </p>

            <h3>4. Modificações no Serviço</h3>
            <p>
              Podemos atualizar recursos, layout ou funcionalidades sem aviso prévio,
              visando melhorias constantes na experiência do usuário.
            </p>

            <h3>5. Encerramento da Conta</h3>
            <p>
              O usuário pode solicitar encerramento da conta a qualquer momento. 
              A exclusão dos dados será feita conforme legislação vigente.
            </p>

            <h3>6. Aceitação dos Termos</h3>
            <p>
              Ao continuar usando o aplicativo, você declara estar ciente 
              e de acordo com todos os pontos descritos neste documento.
            </p>
          </div>
        
          <button className="btn-fechar" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </>
  );
}
