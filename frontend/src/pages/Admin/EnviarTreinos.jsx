import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss"; // usa o mesmo forms.scss que você já tem

export default function EnviarTreinoModal({ treino, onClose, onSent }) {
  const [buscaAluno, setBuscaAluno] = useState("");
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [mensagem, setMensagem] = useState("");

  // exemplo estático de alunos (troque para sua fonte real)
  const alunos = [
    { id: "MS", nome: "Maria Silva", cor: "purple" },
    { id: "PA", nome: "Pedro Alves", cor: "green" },
    { id: "CM", nome: "Carlos Mendes", cor: "orange" },
    { id: "AS", nome: "Ana Santos", cor: "red" },
    { id: "RL", nome: "Ricardo Lima", cor: "blue" },
  ];

  const toggleAluno = (id) => {
    setAlunosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const enviar = () => {
    if (!alunosSelecionados.length) {
      alert("Selecione pelo menos um aluno.");
      return;
    }
    onSent({ treino, destinatarios: alunosSelecionados, mensagem });
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}>
          <h3>Enviar: {treino.nome}</h3>

          <div className="form-group">
            <label>Pesquisar alunos</label>
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={buscaAluno}
              onChange={(e) => setBuscaAluno(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Alunos</label>
            <div
              style={{
                maxHeight: 180,
                overflow: "auto",
                display: "grid",
                gap: 8,
              }}>
              {alunos
                .filter((a) =>
                  a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
                )
                .map((a) => (
                  <label
                    key={a.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                    }}>
                    <input
                      type="checkbox"
                      checked={alunosSelecionados.includes(a.id)}
                      onChange={() => toggleAluno(a.id)}
                    />
                    <div
                      className={`icone ${a.cor}`}
                      style={{
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                      }}>
                      {a.id}
                    </div>
                    <div>{a.nome}</div>
                  </label>
                ))}
            </div>
          </div>

          <div className="form-group">
            <label>Mensagem (opcional)</label>
            <textarea
              placeholder="Ex: Boa sorte no treino de hoje!"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-salvar" onClick={enviar}>
              → Enviar Treino
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
