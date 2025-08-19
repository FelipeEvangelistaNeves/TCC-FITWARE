import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header style={{ padding: "1rem", backgroundColor: "#f5f5f5" }}>
      <h1>Pintaaaao</h1>
      <Link to={"/login/admin"}>admin</Link>
      <Link to={"/login/professor"}>professor</Link>
      <Link to={"/login/aluno"}>aluno</Link>
    </header>
  );
}
