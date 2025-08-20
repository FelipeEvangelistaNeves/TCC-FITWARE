import React, { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Buscando por: ${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to={"/admin"}
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            {/* Substituindo o SVG por um logo textual */}
            <span className="fs-4 fw-bold">MeuLogo</span>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a className="nav-link px-2 text-secondary">Home</a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Recursos
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Preços
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                Sobre
              </a>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Pesquisar..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Entrar
            </button>
            <button type="button" className="btn btn-warning">
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
