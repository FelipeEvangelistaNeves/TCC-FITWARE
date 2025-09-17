import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavAluno from "./BottomNavAluno";
import HeaderAluno from "./Header";
const AlunoLayout = () => {
  return (
    <div>
      <HeaderAluno />
      <Outlet />
      <BottomNavAluno />
    </div>
  );
};

export default AlunoLayout;
