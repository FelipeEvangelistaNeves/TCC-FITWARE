import { Routes, Route } from "react-router-dom";
import ProfLayout from "../layouts/ProfLayout/ProfLayout";
import DashboardProf from "../pages/Professor/Dashboard";
import AlunosProf from "../pages/Professor/Alunos";
import TreinosProf from "../pages/Professor/Treinos";
import MensagensProf from "../pages/Professor/Mensagens";
import PerfilProf from "../pages/Professor/Perfil";

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
