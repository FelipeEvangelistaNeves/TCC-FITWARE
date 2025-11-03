import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/configuracoes.scss";

export default function Configuracoes() {
  const [darkMode, setDarkMode] = useState(true);
  const [notificacoes, setNotificacoes] = useState(true);
  const [email, setEmail] = useState("admin@fitware.com");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Simula carregamento inicial de preferências do usuário
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("configFitWare"));
    if (saved) {
      setDarkMode(saved.darkMode);
      setNotificacoes(saved.notificacoes);
      setEmail(saved.email);
    }
  }, []);

  const salvarAlteracoes = () => {
    const data = { darkMode, notificacoes, email };
    localStorage.setItem("configFitWare", JSON.stringify(data));

    setMensagem("✅ Alterações salvas com sucesso!");
    setSenha("");

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="admin-configuracoes">
      <h2 className="page-title">Configurações do Sistema</h2>

      {mensagem && <div className="alert-sucesso">{mensagem}</div>}

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
        <h4>Conta do Administrador</h4>
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
          <input
            type="password"
            placeholder="Nova senha (opcional)"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="btn-salvar" onClick={salvarAlteracoes}>
          💾 Salvar Alterações
        </button>
      </div>
    </div>
  );
}
