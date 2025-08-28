import { Routes, Route } from "react-router-dom";
import PublicLayout from "./../layouts/PublicLayout/PublicLayout";
import PublicHome from "../pages/Public/PublicHome";
// import Desafios from "./../pages/Admin/Desafios";
// import Treinos from "./../pages/Admin/Treinos";
// import PublicLayout from "../layouts/PublicLayout/PublicLayout";
// import Financeiro from "./../pages/Admin/Financeiro";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        {/* <Route path="alunos" element={<Alunos />} /> */}
        {/* <Route path="professores" element={<Professores />} /> */}
        {/* <Route path="desafios" element={<Desafios />} /> */}
        {/* <Route path="financeiro" element={<Financeiro />} /> */}
        {/* <Route path="treinos" element={<Treinos />} /> */}
      </Route>
    </Routes>
  );
}
