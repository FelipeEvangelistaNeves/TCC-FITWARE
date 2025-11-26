import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./../pages/Admin/Dashboard";
import Alunos from "./../pages/Admin/Alunos";
import Professores from "./../pages/Admin/Professores";
import Desafios from "./../pages/Admin/Desafios";
import Treinos from "./../pages/Admin/Treinos";
import Exercicios from "./../pages/Admin/Exercicios";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Financeiro from "./../pages/Admin/Financeiro";
import Brindes from "./../pages/Admin/Brindes";
import Notificacao from "./../pages/Admin/Notificacoes";
import MeuPerfil from "../pages/Admin/AdmPerf";
import Configuracoes from "../pages/Admin/Configuracoes";
import Resgates from "../pages/Admin/Resgates";

export default function AdminRoutes() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    function checkAuth() {
      const role = localStorage.getItem("user-role");

      if (role !== "Secretario") {
        setAuth(false);
      } else {
        setAuth(true);
      }
    }

    checkAuth();

    const interval = setInterval(checkAuth, 2000);

    window.addEventListener("storage", checkAuth);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  if (auth === null) return <p>Carregando...</p>;

  if (auth === false) {
    window.location.href = "/login/admin";
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="alunos" element={<Alunos />} />
        <Route path="professores" element={<Professores />} />
        <Route path="desafios" element={<Desafios />} />
        <Route path="financeiro" element={<Financeiro />} />
        <Route path="treinos" element={<Treinos />} />
        <Route path="exercicios" element={<Exercicios />} />
        <Route path="brindes" element={<Brindes />} />
        <Route path="notificacoes" element={<Notificacao />} />
        <Route path="perfil" element={<MeuPerfil />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="resgates" element={<Resgates />} />

        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Route>
    </Routes>
  );
}
