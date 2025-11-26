import React, { useState } from "react";
import "../../styles/pages/login/esqueceuSenha.scss";
import { Link } from "react-router-dom";

export default function EsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMensagem("Por favor, insira seu e-mail");
      return;
    }

    setCarregando(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resetar-senha/esqueci-senha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMensagem(
          "✓ E-mail enviado com sucesso! Verifique sua caixa de entrada"
        );
        setEnviado(true);
        setEmail("");
      } else {
        setMensagem(data.error || "Erro ao enviar e-mail");
      }
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="esqueceu-senha-container">
      <div className="esqueceu-senha-card">
        <div className="card-header">
          <h1>🔑 Recuperar Senha</h1>
          <p>Insira seu e-mail para receber um link de redefinição</p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="form-reset">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
              />
            </div>

            <button type="submit" disabled={carregando} className="btn-submit">
              {carregando ? "Enviando..." : "Enviar Link"}
            </button>

            {mensagem && (
              <div className={`mensagem ${enviado ? "sucesso" : "erro"}`}>
                {mensagem}
              </div>
            )}
          </form>
        ) : (
          <div className="sucesso-message">
            <div className="icon">✓</div>
            <h2>E-mail Enviado!</h2>
            <p>
              Verifique sua caixa de entrada (incluindo spam) para o link de
              recuperação.
            </p>

            <div className="instrucoes">
              <strong>Próximos passos:</strong>
              <ol>
                <li>Procure pelo email da FITWARE</li>
                <li>Clique no link "Redefinir Senha"</li>
                <li>Insira sua nova senha</li>
                <li>Pronto! Você pode fazer login novamente</li>
              </ol>
            </div>

            <p style={{ fontSize: "12px", color: "#999", marginTop: "20px" }}>
              O link expira em 1 hora
            </p>
          </div>
        )}

        <div className="login-links">
          <p>Lembrou sua senha?</p>
          <Link to="/login/professor" className="link-voltar">
            Voltar ao Login
          </Link>
        </div>
      </div>
    </div>
  );
}
