import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAluno from "../pages/Alunos/DashBoard";
import DesafiosAluno from "../pages/Alunos/Desafios";
import TreinosAluno from "../pages/Alunos/Treinos";
import MensagensAluno from "../pages/Alunos/Mensagens";
import PerfilAluno from "../pages/Alunos/Perfil";
import AlunoLayout from "../layouts/AlunoLayout/AlunoLayout";

export default function AlunoRoutes() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    function checkAuth() {
      const role = localStorage.getItem("user-role");

      if (role !== "Aluno") {
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
    window.location.href = "/login/aluno";
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<AlunoLayout />}>
        <Route index element={<DashboardAluno />} />
        <Route path="desafios" element={<DesafiosAluno />} />
        <Route path="treinos" element={<TreinosAluno />} />
        <Route path="mensagens" element={<MensagensAluno />} />
        <Route path="perfil" element={<PerfilAluno />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Route>
    </Routes>
  );
}
