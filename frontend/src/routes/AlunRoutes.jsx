import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAluno from "../pages/Alunos/DashBoard";
import DesafiosAluno from "../pages/Alunos/Desafios";
import TreinosAluno from "../pages/Alunos/Treinos";
import MensagensAluno from "../pages/Alunos/Mensagens";
import PerfilAluno from "../pages/Alunos/Perfil";
import AlunoLayout from "../layouts/AlunoLayout/AlunoLayout";

import { useEffect, useState } from "react";

export default function AlunoRoutes() {
  ///////////////// validação login ///////////////////
  const [auth, setAuth] = useState(null); // null = carregando

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3000/protected", {
          credentials: "include",
        });
        if (res.status === 401) return setAuth(false);
        const data = await res.json();
        // valida se o usuário logado é aluno
        if (data.user.role === "Aluno") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch {
        setAuth(false);
      }
    }
    checkAuth();
  }, []);

  if (auth === null) {
    return <p>Carregando...</p>; // evita redirecionar cedo demais
  }

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
      </Route>
    </Routes>
  );
}
