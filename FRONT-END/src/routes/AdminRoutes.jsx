import { Routes, Route } from "react-router-dom";
import Dashboard from "./../pages/Admin/Dashboard";
import Alunos from "./../pages/Admin/Alunos";
import Professores from "./../pages/Admin/Professores";
import Desafios from "./../pages/Admin/Desafios";
import Treinos from "./../pages/Admin/Treinos";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Financeiro from "./../pages/Admin/Financeiro";
import Brindes from "./../pages/Admin/Brindes";
export default function AdminRoutes() {
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
      </Route>
    </Routes>
  );
}
