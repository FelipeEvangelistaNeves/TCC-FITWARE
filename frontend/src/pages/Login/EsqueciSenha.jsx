import { useState } from "react";
import "../../styles/pages/login/loginmob.scss";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const backPath = location.state?.from || "/login/aluno";

  async function handleSendCode() {
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Por favor, digite seu email.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/login/recuperar-senha`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg("Código enviado com sucesso! Verifique seu email.");
        // Opcional: navegar para uma tela de inserir código após um tempo
        // setTimeout(() => navigate("/inserir-codigo"), 2000);
      } else {
        setErrorMsg(data.message || "Erro ao enviar código. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao enviar código:", err);
      setErrorMsg("Erro no servidor. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={Logo} alt="logo fitware" className="login-avatar" />
        <h2 className="login-title">FitWare</h2>
        <p className="login-subtitle">Recupere sua senha</p>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        {successMsg && (
          <p className="success-msg" style={{ color: "green" }}>
            {successMsg}
          </p>
        )}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={handleSendCode} className="button-log-mob">
          Enviar Código
        </button>

        <div className="forgot-password">
          <a href="#" onClick={() => navigate(backPath)}>
            Voltar para Login
          </a>
        </div>
      </div>
    </div>
  );
}
