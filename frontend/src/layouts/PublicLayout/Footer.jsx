import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-5">
      <div className="container">
        <ul className="nav justify-content-center border-bottom border-secondary pb-3 mb-3">
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Início
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Recursos
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Preços
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              FAQ
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-light">
              Sobre
            </a>
          </li>
        </ul>
        <p className="text-center text-secondary mb-0">
          © 2025 Sua Empresa, Inc
        </p>
      </div>
    </footer>
  );
};

export default Footer;
