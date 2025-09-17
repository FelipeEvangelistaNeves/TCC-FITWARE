import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/loginDesk.scss";
import logo from "../../assets/logo.png"; // Certifique-se de ter uma imagem de logo
const LoginDesk = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
          <div className="login-form-container">
            <h2>Bem-vindo de volta</h2>
            <p>Acesse sua conta administrativa</p>

            <form className="login-form">
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
                  value={senha}
                  required
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              <div className="form-options">
                <a href="#" className="forgot-password">
                  Esqueceu a senha?
                </a>
              </div>

              <button type="submit" className="login-button">
                Entrar
              </button>
            </form>

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
