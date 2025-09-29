import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavAluno from "./BottomNavAluno";
import HeaderAluno from "./Header";
const AlunoLayout = () => {
  const location = useLocation();
  let title = "Inicio";
  if (location.pathname.includes("treinos")) title = "Treinos";
  else if (location.pathname.includes("desafios")) title = "Desafios";
  else if (location.pathname.includes("mensagens")) title = "Mensagens";
  else if (location.pathname.includes("perfil")) title = "Perfil";
  // Adicione outros títulos conforme necessário
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderAluno title={title} />
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
      <BottomNavAluno />
    </div>
  );
};

export default AlunoLayout;
