import { Routes, Route } from "react-router-dom";
import Header from "./../components/Admin/Header";
import Sidebar from "./../components/Admin/SideBar";
import Dashboard from "./../pages/Admin/Dashboard";
import Alunos from "./../pages/Admin/Alunos";
import Professores from "./../pages/Admin/Professores";
import Desafios from "./../pages/Admin/Desafios";
import Treinos from "./../pages/Admin/Treinos";
import Financeiro from "./../pages/Admin/Financeiro";
export default function AdminRoutes() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <main style={{ padding: "1rem", flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="alunos" element={<Alunos />} />
            <Route path="professores" element={<Professores />} />
            <Route path="desafios" element={<Desafios />} />
            <Route path="financeiro" element={<Financeiro />} />
            <Route path="treinos" element={<Treinos />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
