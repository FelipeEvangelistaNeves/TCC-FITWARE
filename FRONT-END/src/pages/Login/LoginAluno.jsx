import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const LoginAluno = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [focusField, setFocusField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Aluno:", { email, senha });
    // navigate('/aluno');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-header">
          <img src={Logo} className="logo" alt="FitWare Logo" />
          <h1 className="app-title">FitWare</h1>
          <p className="app-subtitle">Logue em sua conta e seja FitWare!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={focusField === "email" ? "focused" : ""}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField("")}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={focusField === "senha" ? "focused" : ""}
              onFocus={() => setFocusField("senha")}
              onBlur={() => setFocusField("")}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className="login-btn">
            Login Aluno
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem uma conta?
            <Link to="/register"> Cadastre-se</Link>
          </p>
          <Link to="/login/admin" className="admin-access">
            Acesso Administrativo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAluno;
