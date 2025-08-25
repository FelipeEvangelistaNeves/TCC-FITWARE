import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardAluno from "../pages/Alunos/Dashboard";
import DesafiosAluno from "../pages/Alunos/Desafios";
import TreinosAluno from "../pages/Alunos/Treinos";
import MensagensAluno from "../pages/Alunos/Mensagens";
import PerfilAluno from "../pages/Alunos/Perfil";

import BottomNavAluno from "../layouts/AlunoLayout/BottomNavAluno";

export default function AlunRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AlunoLayout />}>
          <Route index element={<DashboardAluno />} />
          <Route path="/desafios" element={<DesafiosAluno />} />
          <Route path="/treinos" element={<TreinosAluno />} />
          <Route path="/mensagens" element={<MensagensAluno />} />
          <Route path="/perfil" element={<PerfilAluno />} />
        </Route>
      </Routes>
    </>
  );
}
