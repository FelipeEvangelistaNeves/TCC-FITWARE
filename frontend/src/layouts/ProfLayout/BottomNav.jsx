import { NavLink } from "react-router-dom";
import "../../styles/pages/professor/professor.scss";
import { Home, Users, Dumbbell, MessageSquare, User } from "lucide-react";

export default function BottomNavProf() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/professor" end>
        <Home size={22} /> Início
      </NavLink>
      <NavLink to="/professor/alunos">
        <Users size={22} /> Alunos
      </NavLink>
      <NavLink to="/professor/treinos">
        <Dumbbell size={22} /> Treinos
      </NavLink>
      <NavLink to="/professor/mensagens">
        <MessageSquare size={22} /> Msg
      </NavLink>
      <NavLink to="/professor/perfil">
        <User size={22} /> Perfil
      </NavLink>
    </nav>
  );
}
