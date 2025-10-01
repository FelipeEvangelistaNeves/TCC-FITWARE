import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNavProf from "./BottomNav";
const ProfLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
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
