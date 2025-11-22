import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/pages/login/loginDesk.scss";
import logo from "../../assets/logo.png"; // Certifique-se de ter uma imagem de logo
const LoginDesk = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  async function Executar() {
    setErrorMsg("");
    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        navigate("/admin");
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  }
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-left">
          <div className="brand">
            <img src={logo} alt="zzz" className="brand-icon" />

            <div className="brand-text">
              <h1>FitWare</h1>
              <p>Plataforma de Gestão Fitness</p>
            </div>
          </div>

          <div className="admin-panel-info">
            <h2>Painel Administrativo</h2>
            <div className="features">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Gerenciamento completo de usuários</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Controle de treinos e programas</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Relatórios e análises avançadas</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Gestão financeira integrada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <Link to="/" className="back-link">
            <i className="bi bi-arrow-left"></i>
          </Link>
          <div className="login-form-container">
            <h2>Bem-vindo de volta</h2>
            <p>Acesse sua conta administrativa</p>
            <p className="error-msg">{errorMsg}</p>
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-options">
                <a href="#" className="forgot-password">
                  Esqueceu a senha?
                </a>
              </div>

              <button className="login-button" onClick={() => Executar()}>
                Entrar
              </button>
            </div>

            <div className="login-footer">
              <p>© 2023 FitWare. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDesk;
