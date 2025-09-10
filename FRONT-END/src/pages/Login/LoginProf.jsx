import { useState } from "react";
import "../../styles/pages/login/loginmob.scss";
import Logo from "../../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function Executar() {
    console.log("aloiu");
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* Esqueceu senha */}
        <div className="forgot-password">
          <a href="#">Esqueceu a senha?</a>
        </div>

        {/* Botão */}
        <button onClick={() => Executar()}>Logar</button>
      </div>
    </div>
  );
}
