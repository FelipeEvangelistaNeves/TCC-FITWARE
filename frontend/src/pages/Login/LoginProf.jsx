import { useState } from "react";
import "../../styles/pages/login/loginmob.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function Executar() {
    try {
      const response = await fetch("http://localhost:3000/login/professor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // necessário para cookies de sessão
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login realizado com sucesso!");
        console.log(data);
        navigate("/professor");
      } else {
        alert("Erro: " + data.message);
      }
    } catch (err) {
      console.error("Erro ao logar:", err);
    }
  }
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Avatar */}
        <img src={Logo} alt="logo fitware" className="login-avatar" />

        {/* Empresa */}
        <h2 className="login-title">FitWare</h2>
        <p className="login-subtitle">Logue em sua conta e seja Fitware!</p>

        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Senha */}
        <div className="input-group">
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Esqueceu senha */}
        <div className="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>

        {/* Botão */}
        <button onClick={() => Executar()} className="button-log-mob">
          Logar
        </button>
      </div>
    </div>
  );
}
