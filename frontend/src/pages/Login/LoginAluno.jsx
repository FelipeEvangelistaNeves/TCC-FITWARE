import { useState } from "react";
import "../../styles/pages/login/loginmob.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function LoginAluno() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function Executar() {
    setErrorMsg(""); // limpa mensagens anteriores

    try {
      const response = await fetch("http://localhost:3000/login/aluno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // garante envio/recebimento de cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        navigate("/aluno");
      } else {
        setErrorMsg(data.message || "Email ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
      setErrorMsg("Erro no servidor. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={Logo} alt="logo fitware" className="login-avatar" />
        <h2 className="login-title">FitWare</h2>
        <p className="login-subtitle">Logue em sua conta e seja Fitware!</p>

        <p className="error-msg">{errorMsg}</p>

        <div className="input-group">
          <label>Usuário</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>

        <button onClick={Executar} className="button-log-mob">
          Logar
        </button>
      </div>
    </div>
  );
}
