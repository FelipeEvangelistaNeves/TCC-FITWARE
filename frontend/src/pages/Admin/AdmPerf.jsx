import React, { useState } from "react";
import "../../styles/pages/admin/meuperfil.scss";

export default function MeuPerfil() {
  const [editando, setEditando] = useState(false);
  const [user, setUser] = useState({
    nome: "Ana Leonel",
    email: "ana@fitware.com",
    cpf: "987.654.321-99",
    telefone: "(11) 95555-4444",
    dtNasc: "1990-08-20",
    cargo: "Secretário",
    cref: "123456-G/SP",
  });

  const [form, setForm] = useState(user);
  const [mensagem, setMensagem] = useState("");

  const salvarAlteracoes = () => {
    setUser(form);
    setEditando(false);
    setMensagem("✅ Perfil atualizado com sucesso!");

    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Meu Perfil</h2>

      {mensagem && <div className="alert-sucesso">{mensagem}</div>}

      <div className="perfil-card">
        {!editando ? (
          <>
            <div className="perfil-info">
              <h4>Informações Pessoais</h4>
              <div className="info-row">
                <span className="label">Nome:</span> <span>{user.nome}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span> <span>{user.email}</span>
              </div>
              <div className="info-row">
                <span className="label">CPF:</span> <span>{user.cpf}</span>
              </div>
              <div className="info-row">
                <span className="label">Telefone:</span>{" "}
                <span>{user.telefone}</span>
              </div>
              <div className="info-row">
                <span className="label">Data de Nascimento:</span>{" "}
                <span>
                  {new Date(user.dtNasc).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Cargo:</span> <span>{user.cargo}</span>
              </div>
              <div className="info-row">
                <span className="label">CREF:</span> <span>{user.cref}</span>
              </div>
            </div>

            <div className="perfil-actions">
              <button className="btn-edit" onClick={() => setEditando(true)}>
                ✏️ Editar Perfil
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="perfil-info">
              <h4>Editar Informações</h4>
              {Object.keys(form).map((key) => (
                <div className="info-row" key={key}>
                  <span className="label">{key.toUpperCase()}:</span>
                  <input
                    type={key === "dtNasc" ? "date" : "text"}
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>

            <div className="perfil-actions">
              <button className="btn-cancel" onClick={() => setEditando(false)}>
                Cancelar
              </button>
              <button className="btn-save" onClick={salvarAlteracoes}>
                Salvar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
