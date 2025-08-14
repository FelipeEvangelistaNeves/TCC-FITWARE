import { Routes, Route } from "react-router-dom";
import DashboardProf from "../pages/professor/Dashboard";
import AlunosProf from "../pages/professor/Alunos";
import TreinosProf from "../pages/professor/Treinos";
import MensagensProf from "../pages/professor/Mensagens";
import PerfilProf from "../pages/professor/Perfil";
import BottomNavProf from "../components/prof/BottomNavProf";

export default function ProfRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardProf />} />
        <Route path="/alunos" element={<AlunosProf />} />
        <Route path="/treinos" element={<TreinosProf />} />
        <Route path="/mensagens" element={<MensagensProf />} />
        <Route path="/perfil" element={<PerfilProf />} />
      </Routes>
      <BottomNavProf />
    </>
  );
}
