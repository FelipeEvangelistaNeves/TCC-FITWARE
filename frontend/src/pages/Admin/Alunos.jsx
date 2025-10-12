import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";
import "../../styles/components/admin/modais.scss";

export default function Alunos() {
  const [alunos, setAlunos] = useState([
    {
      id: "#AL-2305",
      nome: "Maria Silva",
      turma: "Funcional",
      status: "Ativo",
      avatar: "MS",
      cor: "blue",
    },
    {
      id: "#AL-2304",
      nome: "Pedro Alves",
      turma: "Cardio",
      status: "Ativo",
      avatar: "PA",
      cor: "green",
    },
    {
      id: "#AL-2303",
      nome: "Carlos Mendes",
      turma: "Força",
      status: "Inativo",
      avatar: "CM",
      cor: "orange",
    },
    {
      id: "#AL-2302",
      nome: "Ana Santos",
      turma: "Yoga",
      status: "Ativo",
      avatar: "AS",
      cor: "red",
    },
  ]);

  // Estados de controle dos modais
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState(null);

  // Handlers simples
  const handleAdd = (novo) => setAlunos([...alunos, novo]);
  const handleUpdate = (editado) =>
    setAlunos(alunos.map((a) => (a.id === editado.id ? editado : a)));
  const handleDelete = (id) => {
    setAlunos(alunos.filter((a) => a.id !== id));
    setShowDelete(false);
  };

  return (
    <div className="tabela-page">
      <div className="tabela-header">
        <h2>Gerenciar Alunos</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar aluno..."
            className="search-input"
          />
          <button className="add-btn" onClick={() => setShowAdd(true)}>
            + Adicionar
          </button>
        </div>
      </div>

      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Turma</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((a, i) => (
            <tr key={i}>
              <td>{a.id}</td>
              <td className="user-info">
                <div className={`icone ${a.cor}`}>{a.avatar}</div>
                {a.nome}
              </td>
              <td>{a.turma}</td>
              <td>
                <span className={`status ${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => {
                    setSelectedAluno(a);
                    setShowEdit(true);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </button>

                <button
                  className="action-btn"
                  onClick={() => {
                    setSelectedAluno(a);
                    setShowDelete(true);
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>

                <button
                  className="action-btn"
                  onClick={() => {
                    setSelectedAluno(a);
                    setShowInfo(true);
                  }}
                >
                  <i className="bi bi-three-dots"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== MODAIS ===== */}
      {showAdd && (
        <ModalAdd onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
      {showEdit && selectedAluno && (
        <ModalEdit
          aluno={selectedAluno}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      )}
      {showInfo && selectedAluno && (
        <ModalInfo aluno={selectedAluno} onClose={() => setShowInfo(false)} />
      )}
      {showDelete && selectedAluno && (
        <ModalDelete
          aluno={selectedAluno}
          onClose={() => setShowDelete(false)}
          onConfirm={() => handleDelete(selectedAluno.id)}
        />
      )}
    </div>
  );
}

/* =======================
   COMPONENTES DOS MODAIS
=========================*/
function ModalAdd({ onClose, onSave }) {
  const [form, setForm] = useState({ nome: "", turma: "", status: "Ativo" });

  const handleSubmit = () => {
    const novo = {
      id: "#AL-" + Math.floor(Math.random() * 9999),
      nome: form.nome,
      turma: form.turma,
      status: form.status,
      avatar: form.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      cor: "blue",
    };
    onSave(novo);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Adicionar Aluno</h3>
        <div className="form-group">
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Turma</label>
          <input
            value={form.turma}
            onChange={(e) => setForm({ ...form, turma: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn-salvar">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalEdit({ aluno, onClose, onSave }) {
  const [form, setForm] = useState(aluno);

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Aluno</h3>
        <div className="form-group">
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Turma</label>
          <input
            value={form.turma}
            onChange={(e) => setForm({ ...form, turma: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="btn-salvar">
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalInfo({ aluno, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content info">
        <h3>Detalhes do Aluno</h3>
        <p>
          <strong>ID:</strong> {aluno.id}
        </p>
        <p>
          <strong>Nome:</strong> {aluno.nome}
        </p>
        <p>
          <strong>Turma:</strong> {aluno.turma}
        </p>
        <p>
          <strong>Status:</strong> {aluno.status}
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancelar">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalDelete({ aluno, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content delete">
        <h3>Excluir Aluno</h3>
        <p>
          Tem certeza que deseja excluir <strong>{aluno.nome}</strong>?
        </p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancelar">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn-delete">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
