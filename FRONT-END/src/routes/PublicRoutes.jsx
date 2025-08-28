import { Routes, Route } from "react-router-dom";
import PublicLayout from "./../layouts/PublicLayout/PublicLayout";
import PublicHome from "../pages/Public/PublicHome";
import PublicHome from "../pages/Public/PublicHome";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="modalidades" element={<placeholder />} />
        <Route path="planos" element={<placeholder />} />
        <Route path="PorQueSeJuntar" element={<placeholder />} />
        <Route path="Sobre" element={<placeholder />} />
        <Route path="Suporte" element={<placeholder />} />
      </Route>
    </Routes>
  );
}
