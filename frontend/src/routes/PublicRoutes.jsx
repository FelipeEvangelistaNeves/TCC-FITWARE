import { Routes, Route } from "react-router-dom";
import PublicLayout from "./../layouts/PublicLayout/PublicLayout";
import PublicHome from "../pages/Public/PublicHome";
import Modalidades from "../pages/Public/Modalidades";
import Planos from "../pages/Public/Planos";
import Sobre from "../pages/Public/Sobre";
import Suporte from "../pages/Public/Suporte";
import EscolherLogin from "../pages/Login/EscolherLogin";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="modalidades" element={<Modalidades />} />
        <Route path="planos" element={<Planos />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="suporte" element={<Suporte />} />
        <Route path="escolherlogin" element={<EscolherLogin />} />
        <Route path="*" element={<h2>Página não encontrada</h2>} />
      </Route>
    </Routes>
  );
}
