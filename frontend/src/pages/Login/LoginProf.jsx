import { useState } from "react";
import "../../styles/pages/login/loginmob.scss";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function LoginProfessor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  async function Executar() {
    setErrorMsg("");
    try {
      const response = await fetch("http://localhost:3000/professor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/professor");
      } else {
        setErrorMsg(
          data.message || "Falha ao realizar login. Verifique seus dados."
        );
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
        <p className="login-subtitle">
          Logue em sua conta professor e seja Fitware!
        </p>

        <p className="error-msg">{errorMsg}</p>

        <div className="input-group">
          <label>Email</label>
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
