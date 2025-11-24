import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/pages/login/loginDesk.scss";
import logo from "../../assets/logo.png";
const LoginDesk = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  async function Executar() {
    setErrorMsg("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/login/admin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user-nome", data.user.nome);
        localStorage.setItem("user-role", data.user.role);
        localStorage.setItem("user-id", data.user.id);
        localStorage.setItem("user-email", data.user.email);
        navigate("/admin");
      } else {
        setErrorMsg(data.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    console.log("Recover password for:", forgotEmail);
    alert(`recuperar senha ebaaaaa${forgotEmail} `);
  };

  return (
    <div className="login-container">
      <div className={`login-content ${isFlipped ? "flipped" : ""}`}>
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
          <Link to="/escolherlogin" className="back-link">
            <i className="bi bi-arrow-left"></i>
          </Link>

          {!isFlipped ? (
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
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={() => setIsFlipped(true)}
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <button className="login-button" onClick={() => Executar()}>
                  Entrar
                </button>
              </div>

              <div className="login-footer">
                <p>© 2023 FitWare. Todos os direitos reservados.</p>
              </div>
            </div>
          ) : (
            <div className="login-form-container">
              <h2>Recuperar Senha</h2>
              <p>Informe seu email para receber o link de recuperação</p>
              <div className="login-form">
                <div className="form-group">
                  <label htmlFor="forgot-email">Email</label>
                  <input
                    type="email"
                    id="forgot-email"
                    value={forgotEmail}
                    required
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <button className="login-button" onClick={handleForgotSubmit}>
                  Enviar Link
                </button>

                <div
                  className="form-options"
                  style={{ marginTop: "1rem", textAlign: "center" }}
                >
                  <button
                    type="button"
                    className="forgot-password-btn"
                    onClick={() => setIsFlipped(false)}
                  >
                    Voltar para Login
                  </button>
                </div>
              </div>
              <div className="login-footer">
                <p>© 2023 FitWare. Todos os direitos reservados.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDesk;
