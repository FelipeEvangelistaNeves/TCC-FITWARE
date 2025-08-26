import { Routes, Route } from "react-router-dom";
import ProfLayout from "../layouts/ProfLayout/ProfLayout";
import DashboardProf from "../pages/professor/Dashboard";
import AlunosProf from "../pages/professor/Alunos";
import TreinosProf from "../pages/professor/Treinos";
import MensagensProf from "../pages/professor/Mensagens";
import PerfilProf from "../pages/professor/Perfil";

export default function ProfRoutes() {
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
