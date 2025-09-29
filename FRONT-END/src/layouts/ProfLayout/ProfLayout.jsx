import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BottomNavProf from "./BottomNav";

const ProfLayout = () => {
  const location = useLocation();
  let title = "Inicio";
  if (location.pathname.includes("alunos")) title = "Alunos";
  else if (location.pathname.includes("perfil")) title = "Perfil";
  else if (location.pathname.includes("mensagens")) title = "Mensagens";
  else if (location.pathname.includes("detalhes")) title = "Detalhes do Treino";
  else if (location.pathname.includes("treinos")) title = "Treinos";
  // Adicione outros títulos conforme necessário

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header title={title} />
      <main
        style={{
          flex: 1,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </main>

      <BottomNavProf />
    </div>
  );
};
export default ProfLayout;
