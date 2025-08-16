import React from "react";
import {Link} from 'react-router-dom';
import Logo from '../../img/logo.png';

const LoginAluno = () => {
  return (
  <div>
    <main className="bg-black text-white d-flex align-items-center justify-content-center vh-100">
      <section className="d-flex flex-column">
          <section className="p-5 bg-dark">
            <div>
              <img src={Logo} className="logo" alt="logo" style={{ width: "150px", height: "150px", borderRadius: "50%" }}  />
            </div>
            <h3>Bem-vindo</h3>
            <p className="text-white">
                Logue em sua conta e seja FitWare!
            </p>
            <p className="text-white">
                Email
            </p>
            <input type="text" className="form-control" placeholder="Digite seu email..."
              style={{
                borderRadius: "12px",
                backgroundColor: "#d9d9d9",
                width: "300px"
              }}
            />
            <input type="text" className="form-control" placeholder="Digite sua senha..."
              style={{
                borderRadius: "12px",
                backgroundColor: "#d9d9d9",
                width: "300px"
              }}
            />
            
            <Link to="/admin">Esqueceu sua senha?</Link>
            
          </section>
      </section>
    </main>

  </div>);
};

export default LoginAluno;
