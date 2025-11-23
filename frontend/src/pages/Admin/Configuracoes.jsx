import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/configuracoes.scss";

export default function Configuracoes() {
  const [aba, setAba] = useState("conta");
  const [email, setEmail] = useState("admin@fitware.com");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState({});
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    // Try to fetch admin profile from backend; fallback to localStorage
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/profile`,
          {
            method: "GET",
            credentials: "include",
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Falha ao buscar perfil");
        }

        const data = await res.json();
        // API returns fields like fu_nome, fu_email, fu_cpf, fu_telefone, fu_dtnasc, fu_cargo, fu_cref
        setEmail(data.fu_email || email);
        setPerfil((p) => ({
          ...p,
          nome: data.fu_nome || p.nome,
          cpf: data.fu_cpf || p.cpf,
          telefone: data.fu_telefone || p.telefone,
          dtNasc: data.fu_dtnasc || p.dtNasc,
          cargo: data.fu_cargo || p.cargo,
          cref: data.fu_cref || p.cref,
        }));
      } catch (err) {
        // fallback to stored local config
        const saved = JSON.parse(localStorage.getItem("configFitWare"));
        if (saved) setEmail(saved.email || email);
      }
    };

    fetchProfile();
  }, []);

  const salvarAlteracoes = () => {
    const payload = { email };

    const doSave = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/profile`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          throw new Error("Falha ao salvar alterações");
        }

        setMensagem("✅ Alterações salvas com sucesso!");
      } catch (err) {
        // fallback: save to localStorage
        localStorage.setItem("configFitWare", JSON.stringify({ email }));
        setMensagem("✅ Alterações salvas localmente (offline)");
      } finally {
        setTimeout(() => setMensagem(""), 3000);
      }
    };

    doSave();
  };

  const salvarPerfil = () => {
    const payload = {
      nome: perfil.nome,
      cpf: perfil.cpf,
      telefone: perfil.telefone,
      dtNasc: perfil.dtNasc,
      cref: perfil.cref,
      senha: senha || undefined,
    };

    const doSave = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/admin/profile`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Falha ao atualizar perfil");
        }

        const data = await res.json();
        // update local state with returned funcionario
        const f = data.funcionario || data;
        setPerfil((p) => ({
          ...p,
          nome: f.fu_nome || p.nome,
          cpf: f.fu_cpf || p.cpf,
          telefone: f.fu_telefone || p.telefone,
          dtNasc: f.fu_dtnasc || p.dtNasc,
          cref: f.fu_cref || p.cref,
        }));

        setEditando(false);
        setSenha("");
        setMensagem("✅ Perfil atualizado!");
      } catch (err) {
        console.error(err);
        setMensagem("❌ Erro ao atualizar perfil");
      } finally {
        setTimeout(() => setMensagem(""), 3000);
      }
    };

    doSave();
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
            Salvar Alterações
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
                Editar Perfil
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
