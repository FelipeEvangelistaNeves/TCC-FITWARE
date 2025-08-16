import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";
const LoginDesk = () => {
  return (
    <div>
      <main className="bg-dark text-white d-flex align-items-center justify-content-center vh-100">
        <section className="d-flex flex-row">
          <section className="p-5 bg-success">
            <div className="d-flex flex-row">
              <div>
                <img src={Logo} className="logo" />
              </div>
              <div>
                <h2>Fitware</h2>
                <p className="text-muted ">
                  Plataforma de Gerenciamento Fitness
                </p>
              </div>
            </div>
            <div>
              <h3>Painel Admnistrativo </h3>
              <ul className="listalogin listinha">
                <li className="d-flex">
                  <i className="bi bi-arrow-down-right-circle-fill  "></i>
                  <p className="text-white">aaaa</p>
                </li>
                <li>
                  <i className="bi bi-arrow-down-right-circle-fill"></i>
                  <p className="text-white">aaaa</p>
                </li>
                <li>
                  <i className="bi bi-arrow-down-right-circle-fill"></i>
                  <p className="text-white">aaaa</p>
                </li>
              </ul>
            </div>
          </section>
          <section className="p-5 bg-transparent">
            <div>Bem-vindo ao seu Painel</div>
            <Link to="/admin">aaa</Link>
            <div></div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default LoginDesk;
