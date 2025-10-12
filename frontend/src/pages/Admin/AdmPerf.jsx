import React from "react";
import "../../styles/pages/admin/meuperfil.scss";

export default function MeuPerfil() {
  const user = {
    nome: "Fernanda Lima",
    email: "fernanda@fitware.com",
    cpf: "98765432199",
    telefone: "11 95555-4444",
    dtNasc: "20/08/1990",
    cargo: "Secretário",
    cref: "-",
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Meu Perfil</h2>

      <div className="perfil-card">
        <div className="perfil-info">
          <h4>Informações Pessoais</h4>
          <div className="info-row">
            <span className="label">Nome:</span>
            <span>{user.nome}</span>
          </div>
          <div className="info-row">
            <span className="label">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="info-row">
            <span className="label">CPF:</span>
            <span>{user.cpf}</span>
          </div>
          <div className="info-row">
            <span className="label">Telefone:</span>
            <span>{user.telefone}</span>
          </div>
          <div className="info-row">
            <span className="label">Data de Nascimento:</span>
            <span>{user.dtNasc}</span>
          </div>
          <div className="info-row">
            <span className="label">Cargo:</span>
            <span>{user.cargo}</span>
          </div>
          <div className="info-row">
            <span className="label">CREF:</span>
            <span>{user.cref}</span>
          </div>
        </div>

        <div className="perfil-actions">
          <button className="btn-edit">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}
