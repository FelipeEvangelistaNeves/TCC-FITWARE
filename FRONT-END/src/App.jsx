import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AlunoRoutes from "./routes/AlunRoutes";
import ProfRoutes from "./routes/ProfRoutes";
import LoginDesk from "./pages/Login/LoginDesk";
import LoginProf from "./pages/Login/LoginProf";
import LoginAluno from "./pages/Login/LoginAluno";
import PublicRoutes from "./routes/PublicRoutes";
export default function App() {
  return (
    <>
      <Routes>
        {/* Página inicial estática */}
        <Route path="/" element={<PublicRoutes />} />

        {/* Páginas de login */}
        <Route path="/login/admin" element={<LoginDesk />} />
        <Route path="/login/professor" element={<LoginProf />} />
        <Route path="/login/aluno" element={<LoginAluno />} />

        {/* Rotas internas de cada tipo de usuário */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/professor/*" element={<ProfRoutes />} />
        <Route path="/aluno/*" element={<AlunoRoutes />} />
      </Routes>
    </>
  );
}
