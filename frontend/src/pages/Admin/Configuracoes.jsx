import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/configuracoes.scss";

export default function Configuracoes() {
  const [aba, setAba] = useState("conta");
  const [email, setEmail] = useState("admin@fitware.com");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState({
    nome: "Fernanda Lima",
    cpf: "987.654.321-99",
    telefone: "(11) 95555-4444",
    dtNasc: "1990-08-20",
    cargo: "Secretário",
    cref: "123456-G/SP",
  });
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("configFitWare"));
    if (saved) {
      setEmail(saved.email);
    }
  }, []);

  const salvarAlteracoes = () => {
    localStorage.setItem(
      "configFitWare",
      JSON.stringify({ email })
    );
    setMensagem("✅ Alterações salvas com sucesso!");
    setTimeout(() => setMensagem(""), 3000);
  };

  const salvarPerfil = () => {
    setEditando(false);
    setMensagem("✅ Perfil atualizado!");
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="config-page">
      <h2 className="page-title">Configurações do Sistema</h2>

      {/* Tabs */}
      <div className="config-tabs">
        <button
          className={`tab ${aba === "conta" ? "active" : ""}`}
          onClick={() => setAba("conta")}
        >
          Conta
        </button>
        <button
          className={`tab ${aba === "perfil" ? "active" : ""}`}
          onClick={() => setAba("perfil")}
        >
          Perfil do Administrador
        </button>
      </div>

      {mensagem && <div className="alert-sucesso">{mensagem}</div>}

      {/* ===== ABA 2 - Conta ===== */}
      {aba === "conta" && (
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
      )}

      {/* ===== ABA 3 - Perfil ===== */}
      {aba === "perfil" && (
        <div className="config-section perfil-section">
          <h4>Perfil do Administrador</h4>

          {!editando ? (
            <>
              {Object.entries(perfil).map(([k, v]) => (
                <div className="info-row" key={k}>
                  <span className="label">{k.toUpperCase()}:</span>
                  <span>{v}</span>
                </div>
              ))}
              <button className="btn-edit" onClick={() => setEditando(true)}>
                ✏️ Editar Perfil
              </button>
            </>
          ) : (
            <>
              {Object.entries(perfil).map(([k, v]) => (
                <div className="info-row" key={k}>
                  <span className="label">{k.toUpperCase()}:</span>
                  <input
                    type={k === "dtNasc" ? "date" : "text"}
                    value={v}
                    onChange={(e) =>
                      setPerfil({ ...perfil, [k]: e.target.value })
                    }
                  />
                </div>
              ))}
              <div className="perfil-actions">
                <button
                  className="btn-cancelar"
                  onClick={() => setEditando(false)}
                >
                  Cancelar
                </button>
                <button className="btn-salvar" onClick={salvarPerfil}>
                  Salvar
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
