import React, { useState } from "react";
import "../../styles/pages/admin/tabelas.scss";
import "../../styles/components/admin/modais.scss";

export default function Professores() {
  const [professores, setProfessores] = useState([
    {
      id: "#PROF-102",
      nome: "Maria Souza",
      especialidade: "Treinos Funcionais",
      status: "Ativo",
      avatar: "MS",
      cor: "purple",
    },
    {
      id: "#PROF-103",
      nome: "Lucas Rocha",
      especialidade: "Musculação",
      status: "Ativo",
      avatar: "LR",
      cor: "blue",
    },
    {
      id: "#PROF-104",
      nome: "Juliana Lima",
      especialidade: "Yoga",
      status: "Inativo",
      avatar: "JL",
      cor: "green",
    },
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // termo de busca

  const handleAdd = (novo) => setProfessores([...professores, novo]);
  const handleUpdate = (editado) =>
    setProfessores(professores.map((p) => (p.id === editado.id ? editado : p)));
  const handleDelete = (id) => {
    setProfessores(professores.filter((p) => p.id !== id));
    setShowDelete(false);
  };

  // ===== FILTRO =====
  const professoresFiltrados = professores.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tabela-page">
      <div className="tabela-header">
        <h2>Gerenciar Professores</h2>
        <div className="acoes-header">
          <input
            type="text"
            placeholder="Buscar professor..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <th>Especialidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professoresFiltrados.length > 0 ? (
            professoresFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className="user-info">
                  <div className={`icone ${p.cor}`}>{p.avatar}</div>
                  {p.nome}
                </td>
                <td>{p.especialidade}</td>
                <td>
                  <span className={`status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedProf(p);
                      setShowEdit(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedProf(p);
                      setShowDelete(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  <button
                    className="action-btn"
                    onClick={() => {
                      setSelectedProf(p);
                      setShowInfo(true);
                    }}
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="sem-resultado">
                Nenhum professor encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ====== MODAIS ====== */}
      {showAdd && (
        <ModalAdd onClose={() => setShowAdd(false)} onSave={handleAdd} />
      )}
      {showEdit && selectedProf && (
        <ModalEdit
          professor={selectedProf}
          onClose={() => setShowEdit(false)}
          onSave={handleUpdate}
        />
      )}
      {showInfo && selectedProf && (
        <ModalInfo
          professor={selectedProf}
          onClose={() => setShowInfo(false)}
        />
      )}
      {showDelete && selectedProf && (
        <ModalDelete
          professor={selectedProf}
          onClose={() => setShowDelete(false)}
          onConfirm={() => handleDelete(selectedProf.id)}
        />
      )}
    </div>
  );
}

/* =======================
   COMPONENTES DE MODAL
=========================*/

function ModalAdd({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    status: "Ativo",
  });

  const handleSubmit = () => {
    const novo = {
      id: "#PROF-" + Math.floor(Math.random() * 999),
      nome: form.nome,
      especialidade: form.especialidade,
      status: form.status,
      avatar: form.nome
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      cor: "purple",
    };
    onSave(novo);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Adicionar Professor</h3>
        <div className="form-group">
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Especialidade</label>
          <input
            value={form.especialidade}
            onChange={(e) =>
              setForm({ ...form, especialidade: e.target.value })
            }
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

function ModalEdit({ professor, onClose, onSave }) {
  const [form, setForm] = useState(professor);

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Professor</h3>
        <div className="form-group">
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Especialidade</label>
          <input
            value={form.especialidade}
            onChange={(e) =>
              setForm({ ...form, especialidade: e.target.value })
            }
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

function ModalInfo({ professor, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content info">
        <h3>Detalhes do Professor</h3>
        <p>
          <strong>ID:</strong> {professor.id}
        </p>
        <p>
          <strong>Nome:</strong> {professor.nome}
        </p>
        <p>
          <strong>Especialidade:</strong> {professor.especialidade}
        </p>
        <p>
          <strong>Status:</strong> {professor.status}
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

function ModalDelete({ professor, onClose, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content delete">
        <h3>Excluir Professor</h3>
        <p>
          Tem certeza que deseja excluir <strong>{professor.nome}</strong>?
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
