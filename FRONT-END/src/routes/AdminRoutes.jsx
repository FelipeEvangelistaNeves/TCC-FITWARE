import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./../pages/Admin/Dashboard";
import Alunos from "./../pages/Admin/Alunos";
import Professores from "./../pages/Admin/Professores";
import Desafios from "./../pages/Admin/Desafios";
import Treinos from "./../pages/Admin/Treinos";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Financeiro from "./../pages/Admin/Financeiro";

export default function AdminRoutes() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:3000/protected", {
          credentials: "include",
        });
        if (res.status === 401) return setAuth(false);
        const data = await res.json();
        // valida se o usuário logado é secretario
        if (data.user.role === "Secretario") {
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
      </Route>
    </Routes>
  );
}
