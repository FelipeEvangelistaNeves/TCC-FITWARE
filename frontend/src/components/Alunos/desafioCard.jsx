import React, { useState } from "react";
import { Trophy, CheckCircle, PlayCircle } from "react-bootstrap-icons";
import "./../../styles/pages/aluno/desafios.scss";
import { FaTrophy } from "react-icons/fa";

export default function DesafioCard({ titulo, descricao, pontos }) {
  const [status, setStatus] = useState("Inativo");

  const handleAction = () => {
    if (status === "Inativo") setStatus("Ativo");
    else if (status === "Ativo") setStatus("concluido");
  };

  const getButtonText = () => {
    if (status === "Inativo") return "Iniciar";
    if (status === "Ativo") return "Registrar";
    return "Concluído";
  };

  const getButtonClass = () => {
    if (status === "Inativo") return "btn-iniciar";
    if (status === "Ativo") return "btn-registrar";
    return "btn-concluido";
  };

  return (
    <div className={`desafio-card ${status}`}>
      <div className="desafio-header">
        <div className="titulo-wrapper">
          <FaTrophy className="trophy-icon" />
          <h3>{titulo}</h3>
        </div>
        <span className="status-badge">Em andamento</span>
      </div>

      <p className="descricao">{descricao}</p>

      <div className="desafio-footer">
        <div className="pontos">
          <FaTrophy className="pontos-icon" />
          <span>{pontos} pontos</span>
        </div>

        <button className="btn purple">Registrar</button>
      </div>
    </div>
  );
}
