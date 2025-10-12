import React, { useState } from "react";
import "../../styles/pages/admin/configuracoes.scss";

export default function Configuracoes() {
  const [darkMode, setDarkMode] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);
  const [email, setEmail] = useState("admin@fitware.com");

  return (
    <div className="admin-configuracoes">
      <h2 className="page-title">Configurações</h2>

      <div className="config-section">
        <h4>Preferências Gerais</h4>

        <div className="config-item">
          <label>Tema Escuro</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="darkmode"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label htmlFor="darkmode"></label>
          </div>
        </div>

        <div className="config-item">
          <label>Notificações do Sistema</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="notificacoes"
              checked={notificacoes}
              onChange={() => setNotificacoes(!notificacoes)}
            />
            <label htmlFor="notificacoes"></label>
          </div>
        </div>
      </div>

      <div className="config-section">
        <h4>Conta</h4>
        <div className="config-item">
          <label>Email de Acesso</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="config-item">
          <label>Alterar Senha</label>
          <input type="password" placeholder="Nova senha" />
        </div>

        <button className="btn-salvar">Salvar Alterações</button>
      </div>
    </div>
  );
}
