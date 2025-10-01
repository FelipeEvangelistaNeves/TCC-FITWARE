import { NavLink } from "react-router-dom";
import "../../styles/professor.scss"; // reaproveitando estilo
import { Home, Dumbbell, Target, MessageSquare, User } from "lucide-react";

export default function BottomNavAluno() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/aluno" end>
        <Home size={22} /> Início
      </NavLink>
      <NavLink to="/aluno/treinos">
        <Dumbbell size={22} /> Treinos
      </NavLink>
      <NavLink to="/aluno/desafios">
        <Target size={22} /> Desafios
      </NavLink>
      <NavLink to="/aluno/mensagens">
        <MessageSquare size={22} /> Msg
      </NavLink>
      <NavLink to="/aluno/perfil">
        <User size={22} /> Perfil
      </NavLink>
    </nav>
  );
}
