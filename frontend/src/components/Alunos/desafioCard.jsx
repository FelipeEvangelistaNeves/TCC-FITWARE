// src/components/DesafioCard.jsx

import React, { useState } from "react";
import { Trophy, CheckCircle, PlayCircle } from "react-bootstrap-icons";
import "./../../styles/pages/aluno/desafios.scss";

// Este componente recebe as props do desafio individual
export default function DesafioCard({ titulo, descricao, pontos }) { 
    
    // Mantenha os estados de controle do desafio individual
    const [status, setStatus] = useState("disponivel"); 

    const handleAction = () => {
        if (status === "disponivel") setStatus("ativo");
        else if (status === "ativo") setStatus("concluido");
    };

    const getButtonText = () => {
        if (status === "disponivel") return "Iniciar";
        if (status === "ativo") return "Registrar";
        return "Concluído";
    };

    const getButtonClass = () => {
        if (status === "disponivel") return "btn-iniciar";
        if (status === "ativo") return "btn-registrar";
        return "btn-concluido";
    };

    return (
        // O card de um único desafio
        <div className={`desafio-card ${status}`}>
            <div className="icon-section">
                <Trophy className="trophy-icon" />
            </div>

            <div className="text-section">
                <h3>{titulo}</h3>
                <p>{descricao}</p>
                <span className="pontos">+{pontos} pts</span>
            </div>

            <div className="action-section">
                {status !== "concluido" ? (
                    <button
                        className={`action-btn ${getButtonClass()}`}
                        onClick={handleAction}
                    >
                        {status === "disponivel" ? <PlayCircle /> : <CheckCircle />}
                        {getButtonText()}
                    </button>
                ) : (
                    <span className="status-final">✅ Concluído</span>
                )}
            </div>
        </div>
    );
}