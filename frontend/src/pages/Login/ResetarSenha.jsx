import React, { useState, useEffect } from "react";
import "../../styles/pages/login/resetarSenha.scss";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ResetarSenha() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [senhaAnterior, setSenhaAnterior] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [tokenValido, setTokenValido] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  // Validar token ao carregar a página
  useEffect(() => {
    const validarToken = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/resetar-senha/validar-token/${token}`
        );

        if (res.ok) {
          setTokenValido(true);
        } else {
          setTokenValido(false);
          setMensagem("Link inválido ou expirado");
        }
      } catch (err) {
        setTokenValido(false);
        setMensagem("Erro ao validar link");
        console.error(err);
      }
    };

    if (token) {
      validarToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!novaSenha || !confirmarSenha) {
      setMensagem("Preencha todos os campos");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não correspondem");
      return;
    }

    if (novaSenha.length < 6) {
      setMensagem("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setCarregando(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resetar-senha/resetar-senha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, novaSenha }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMensagem("✓ Senha alterada com sucesso!");
        setSucesso(true);
        setTimeout(() => {
          navigate("/escolherlogin");
        }, 2000);
      } else {
        setMensagem(data.error || "Erro ao resetar senha");
      }
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  if (tokenValido === null) {
    return (
      <div className="resetar-senha-container">
        <div className="resetar-senha-card">
          <p>Validando link...</p>
        </div>
      </div>
    );
  }

  if (!tokenValido) {
    return (
      <div className="resetar-senha-container">
        <div className="resetar-senha-card">
          <div className="erro-container">
            <h2>❌ Link Inválido ou Expirado</h2>
            <p>{mensagem}</p>
            <Link to="/escolherlogin" className="btn-voltar">
              Voltar ao Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="resetar-senha-container">
      <div className="resetar-senha-card">
        <div className="card-header">
          <h1>🔐 Redefinir Senha</h1>
          <p>Insira sua nova senha</p>
        </div>

        {!sucesso ? (
          <form onSubmit={handleSubmit} className="form-reset">
            <div className="form-group">
              <label htmlFor="novaSenha">Nova Senha</label>
              <input
                type="password"
                id="novaSenha"
                placeholder="Digite sua nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                disabled={carregando}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                placeholder="Confirme sua nova senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                disabled={carregando}
              />
            </div>

            <button type="submit" disabled={carregando} className="btn-submit">
              {carregando ? "Alterando..." : "Alterar Senha"}
            </button>

            {mensagem && (
              <div className={`mensagem ${sucesso ? "sucesso" : "erro"}`}>
                {mensagem}
              </div>
            )}
          </form>
        ) : (
          <div className="sucesso-message">
            <div className="icon">✓</div>
            <h2>Sucesso!</h2>
            <p>Sua senha foi alterada com sucesso.</p>
            <p>Redirecionando para login...</p>
          </div>
        )}
      </div>
    </div>
  );
}
