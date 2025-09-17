import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/loginmob.scss";
import Logo from "../../assets/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function Executar() {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // necessário para cookies de sessão
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login realizado com sucesso!");
        console.log(data);
        navigate("/aluno");
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
        <img src={Logo} alt="logo fitware" className="login-avatar" />
        <h2 className="login-title">FitWare</h2>
        <p className="login-subtitle">Logue em sua conta e seja Fitware!</p>

        <div className="input-group">
          <label>Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <button onClick={Executar}>Logar</button>
      </div>
    </div>
  );
}
