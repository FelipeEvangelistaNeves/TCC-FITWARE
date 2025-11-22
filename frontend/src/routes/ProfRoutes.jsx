import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProfLayout from "../layouts/ProfLayout/ProfLayout";
import DashboardProf from "../pages/Professor/Dashboard";
import AlunosProf from "../pages/Professor/Alunos";
import TreinosProf from "../pages/Professor/Treinos";
import MensagensProf from "../pages/Professor/Mensagens";
import PerfilProf from "../pages/Professor/Perfil";

export default function ProfRoutes() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem("user-role");
    if (role === "Professor") {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  if (auth === null) return <p>Carregando...</p>;
  if (!auth) {
    window.location.href = "/login/professor";
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={<ProfLayout />}>
        <Route index element={<DashboardProf />} />
        <Route path="alunos" element={<AlunosProf />} />
        <Route path="treinos" element={<TreinosProf />} />
        <Route path="mensagens" element={<MensagensProf />} />
        <Route path="perfil" element={<PerfilProf />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Route>
    </Routes>
  );
}
