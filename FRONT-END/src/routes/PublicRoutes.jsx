import { Routes, Route } from "react-router-dom";
import PublicLayout from "./../layouts/PublicLayout/PublicLayout";
import PublicHome from "../pages/Public/PublicHome";
import Modalidades from "../pages/Public/Modalidades";
import Planos from "../pages/Public/Planos";
import PqJuntar from "../pages/Public/PqJuntar";
import Sobre from "../pages/Public/Sobre";
import Suporte from "../pages/Public/PublicHome";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="modalidades" element={<Modalidades />} />
        <Route path="planos" element={<Planos />} />
        <Route path="Por-que-se-juntar" element={<PqJuntar />} />
        <Route path="Sobre" element={<Sobre />} />
        <Route path="Suporte" element={<Suporte />} />
      </Route>
    </Routes>
  );
}
