import React, { useState } from "react";
import "../../styles/pages/admin/addTreino.scss";

export default function AddTreinoModal({ onClose, onSave }) {
  const [treino, setTreino] = useState({
    nome: "",
    descricao: "",
    tipo: "Força",
    duracao: 45,
    nivel: "Intermediário",
    visibilidade: "Público",
    imagem: null,
  });

  const [exercicios, setExercicios] = useState([
    { nome: "", series: 3, repeticoes: 10, descanso: 60, instrucoes: "" },
  ]);

  const handleAddExercicio = () => {
    setExercicios([
      ...exercicios,
      { nome: "", series: 3, repeticoes: 10, descanso: 60, instrucoes: "" },
    ]);
  };

  const handleChangeExercicio = (index, campo, valor) => {
    const novos = [...exercicios];
    novos[index][campo] = valor;
    setExercicios(novos);
  };

  const handleRemoveExercicio = (index) => {
    setExercicios(exercicios.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!treino.nome.trim()) {
      alert("Dê um nome ao treino!");
      return;
    }
    const novo = { ...treino, exercicios };
    onSave(novo);
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content add-treino"
          onClick={(e) => e.stopPropagation()}>
          <h3>Criar Novo Treino</h3>

          {/* ======= INFORMAÇÕES BÁSICAS ======= */}
          <div className="card-info">
            <div className="form-grid">
              <div className="form-group">
                <label>Nome do Treino</label>
                <input
                  value={treino.nome}
                  onChange={(e) =>
                    setTreino({ ...treino, nome: e.target.value })
                  }
                  placeholder="Ex: Treino de Força"
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  rows="2"
                  value={treino.descricao}
                  onChange={(e) =>
                    setTreino({ ...treino, descricao: e.target.value })
                  }
                  placeholder="Descreva o objetivo do treino..."
                />
              </div>

              <div className="form-inline">
                <div className="form-group">
                  <label>Tipo</label>
                  <select
                    value={treino.tipo}
                    onChange={(e) =>
                      setTreino({ ...treino, tipo: e.target.value })
                    }>
                    <option>Força</option>
                    <option>Cardio</option>
                    <option>Funcional</option>
                    <option>Flexibilidade</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duração (min)</label>
                  <input
                    type="number"
                    value={treino.duracao}
                    onChange={(e) =>
                      setTreino({ ...treino, duracao: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Nível</label>
                  <select
                    value={treino.nivel}
                    onChange={(e) =>
                      setTreino({ ...treino, nivel: e.target.value })
                    }>
                    <option>Iniciante</option>
                    <option>Intermediário</option>
                    <option>Avançado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ======= EXERCÍCIOS ======= */}
          <div className="card-exercicios">
            <div className="cabecalho">
              <h4>Exercícios</h4>
              <button onClick={handleAddExercicio}>
                <i className="bi bi-plus-circle"></i> Adicionar Exercício
              </button>
            </div>

            {exercicios.map((ex, index) => (
              <div key={index} className="exercicio-item">
                <div className="header-item">
                  <span>{index + 1}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveExercicio(index)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                <div className="form-inline">
                  <div className="form-group">
                    <label>Nome</label>
                    <input
                      value={ex.nome}
                      onChange={(e) =>
                        handleChangeExercicio(index, "nome", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Séries</label>
                    <input
                      type="number"
                      value={ex.series}
                      onChange={(e) =>
                        handleChangeExercicio(index, "series", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Repetições</label>
                    <input
                      type="number"
                      value={ex.repeticoes}
                      onChange={(e) =>
                        handleChangeExercicio(
                          index,
                          "repeticoes",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Descanso (s)</label>
                    <input
                      type="number"
                      value={ex.descanso}
                      onChange={(e) =>
                        handleChangeExercicio(index, "descanso", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Instruções</label>
                  <textarea
                    rows="2"
                    value={ex.instrucoes}
                    onChange={(e) =>
                      handleChangeExercicio(index, "instrucoes", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ======= CONFIGURAÇÕES ======= */}
          <div className="configuracoes">
            <h4>Configurações</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  checked={treino.visibilidade === "Público"}
                  onChange={() =>
                    setTreino({ ...treino, visibilidade: "Público" })
                  }
                />
                Público (todos os alunos)
              </label>
              <label>
                <input
                  type="radio"
                  checked={treino.visibilidade === "Privado"}
                  onChange={() =>
                    setTreino({ ...treino, visibilidade: "Privado" })
                  }
                />
                Privado (apenas por atribuição)
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-salvar" onClick={handleSubmit}>
              Salvar Treino
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
