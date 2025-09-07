import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAluno from "../pages/Alunos/DashBoard";
import DesafiosAluno from "../pages/Alunos/Desafios";
import TreinosAluno from "../pages/Alunos/Treinos";
import MensagensAluno from "../pages/Alunos/Mensagens";
import PerfilAluno from "../pages/Alunos/Perfil";
import AlunoLayout from "../layouts/AlunoLayout/AlunoLayout";
export default function AlunoRoutes() {
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
