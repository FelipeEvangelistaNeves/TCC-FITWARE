import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/base/style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
// Global fetch wrapper: redireciona para login em 401
const _originalFetch = window.fetch.bind(window);
window.fetch = async (...args) => {
  const res = await _originalFetch(...args);
  if (res && res.status === 401) {
    try {
      localStorage.removeItem("user-role");
      localStorage.removeItem("token");
    } catch (e) {
      // ignore
    }
    // Redireciona para a página inicial de login
    window.location.href = "/";
    // Lança erro para abortar qualquer lógica subsequente
    throw new Error("Unauthorized");
  }
  return res;
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
