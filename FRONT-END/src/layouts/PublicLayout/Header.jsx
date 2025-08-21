// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// import "../../styles/publichead.scss";

// const Header = () => {
//   return (
//     <header className="p-3 text-bg-dark">
//       <div className="container">
//         <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
//           <Link
//             to={"/admin"}
//             className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
//           >            <span className="fs-4 fw-bold">MeuLogo</span>
//           </Link>

//           <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//             <li>
//               <a className="nav-link px-2 text-white">
//                 Sobre
//               </a>
//             </li>
//             <li>
//               <a href="#" className="nav-link px-2 text-white">
//                 Por que se juntar?
//               </a>
//             </li>
//             <li>
//               <a href="#" className="nav-link px-2 text-white">
//                 Planos
//               </a>
//             </li>
//             <li>
//               <a href="#" className="nav-link px-2 text-white">
//                 Modalidades
//               </a>
//             </li>
//             <li>
//               <a href="#" className="nav-link px-2 text-white">
//                 Suporte
//               </a>
//             </li>
//           </ul>
//           <div className="text-end">
//             <button type="button" className="btn btn-outline-light me-2 login">
//               Entrar
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// export default Header;

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* Logo + texto */}
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img
          src={Logo}
          alt="FitWare Logo"
          width="40"
          height="40"
          className="d-inline-block align-top rounded-circle me-2"
        />
        <div className="d-flex flex-column">
          <span className="fw-bold text-warning">FitWare</span>
          <p className="text-white fs6">Plataforma de Gestão Fitness</p>
        </div>
      </a>

      {/* Botão responsivo (hamburger) */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link text-warning" href="#sobre">
              Sobre
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="#pq">
              Por que se juntar?
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="#planos">
              Planos
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="#modalidades">
              Modalidades
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-warning" href="#suporte">
              Suporte
            </a>
          </li>
        </ul>

        {/* Botão Registrar */}
        <div>
          <a href="#registrar" className="btn btn-sm btn-primary px-3">
            Registrar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
