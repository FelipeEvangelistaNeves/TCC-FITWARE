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
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3000/protected", {
          credentials: "include",
        });
        if (res.status === 401) return setAuth(false);
        const data = await res.json();
        // valida se o usuário logado é professor
        if (data.user.role === "Professor") {
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
      </Route>
    </Routes>
  );
}
