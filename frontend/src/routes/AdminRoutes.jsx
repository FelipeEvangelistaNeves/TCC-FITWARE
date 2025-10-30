import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./../pages/Admin/Dashboard";
import Alunos from "./../pages/Admin/Alunos";
import Professores from "./../pages/Admin/Professores";
import Desafios from "./../pages/Admin/Desafios";
import Treinos from "./../pages/Admin/Treinos";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Financeiro from "./../pages/Admin/Financeiro";
import Brindes from "./../pages/Admin/Brindes";
import Notificacao from "./../pages/Admin/Notificacoes";
import MeuPerfil from "../pages/Admin/AdmPerf";
import Configuracoes from "../pages/Admin/Configuracoes";
import AdicionarTreino from "../pages/Admin/AddTreinos";
import EnviarTreino from "../pages/Admin/EnviarTreinos";
import TreinoDetalhes from "../pages/Admin/TreinosDetalhes";
import FinanceiroDetalhes from "../pages/Admin/FinanceiroDetalhe";
import AddDesafio from "../pages/Admin/AddDesafios";
import EnviarDesafio from "../pages/Admin/EnviarDesafios";
import DetalhesDesafio from "../pages/Admin/DetalhesDesafios";
import AddBrinde from "../pages/Admin/AddBrindes";
import EditarBrinde from "../pages/Admin/EditarBrinde";
import BrindeDetalhes from "../pages/Admin/DetalhesBrindes";
import AddAluno from "../pages/Admin/AddAluno";
import EditarAluno from "../pages/Admin/EditarAluno";
import AlunoDetalhes from "../pages/Admin/DetalhesAluno";
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
        <Route path="brindes" element={<Brindes />} />
        <Route path="notificacoes" element={<Notificacao />} />
        <Route path="perfil" element={<MeuPerfil />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="treinos/addtreinos" element={<AdicionarTreino />} />
        <Route path="treinos/enviartreino" element={<EnviarTreino />} />
        <Route path="treinos/detalhestreino" element={<TreinoDetalhes />} />
        <Route
          path="financeiro/detalhes/:id"
          element={<FinanceiroDetalhes />}
        />
        <Route path="desafios/adddesafio" element={<AddDesafio />} />
        <Route path="desafios/enviar/:id" element={<EnviarDesafio />} />
        <Route path="desafios/detalhes/:id" element={<DetalhesDesafio />} />
        <Route path="brindes/criar" element={<AddBrinde />} />
        <Route path="brindes/editar/:id" element={<EditarBrinde />} />
        <Route path="brindes/detalhes/:id" element={<BrindeDetalhes />} />
        <Route path="alunos/add" element={<AddAluno />} />
        <Route path="alunos/editar/:id" element={<EditarAluno />} />
        <Route path="alunos/detalhes/:id" element={<AlunoDetalhes />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Route>
    </Routes>
  );
}
