import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/login/escolherlogin.scss";

const EscolherLogin = () => {
  return (
    <div className="escolher-login-container">
      <div className="login-card">
        <h2>Onde deseja logar?</h2>
        <p>Escolha abaixo o seu tipo de acesso</p>

        <div className="botoes-login">
          <Link to="/login/admin" className="btn btn-admin">
            Login Admin
          </Link>
          <Link to="/login/professor" className="btn btn-professor">
            Login Professor
          </Link>
          <Link to="/login/aluno" className="btn btn-aluno">
            Login Aluno
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EscolherLogin;
