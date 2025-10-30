import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/admin/treinos.scss";

export default function TreinoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [treino, setTreino] = useState({
    nome: "Treino de Força",
    duracao: "45 min",
    nivel: "Intermediário",
    tipo: "Força",
    descricao:
      "Treino de força focado em membros superiores e inferiores, ideal para ganho de massa muscular e resistência.",
    exercicios: [
      { nome: "Agachamento", series: 3, repeticoes: 12, descanso: 60 },
      { nome: "Supino", series: 3, repeticoes: 10, descanso: 90 },
      { nome: "Remada", series: 3, repeticoes: 10, descanso: 60 },
      { nome: "Leg Press", series: 3, repeticoes: 12, descanso: 60 },
      { nome: "Elevação Lateral", series: 3, repeticoes: 15, descanso: 45 },
      { nome: "Abdominal", series: 3, repeticoes: 20, descanso: 45 },
    ],
  });

  const handleInputChange = (field, value) => {
    setTreino({ ...treino, [field]: value });
  };

  const handleExercicioChange = (index, field, value) => {
    const novos = [...treino.exercicios];
    novos[index][field] = value;
    setTreino({ ...treino, exercicios: novos });
  };

  const handleSave = () => {
    console.log("Treino atualizado:", treino);
    setIsEditing(false);
    alert("Treino atualizado com sucesso!");
  };

  return (
    <div className="detalhes-treino">
      <h2>
        {isEditing ? (
          <input
            type="text"
            value={treino.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
            className="input-editavel"
          />
        ) : (
          treino.nome
        )}
      </h2>

      <div className="info">
        {isEditing ? (
          <>
            <input
              value={treino.tipo}
              onChange={(e) => handleInputChange("tipo", e.target.value)}
              className="input-editavel pequeno"
            />
            •
            <input
              value={treino.duracao}
              onChange={(e) => handleInputChange("duracao", e.target.value)}
              className="input-editavel pequeno"
            />
            •
            <input
              value={treino.nivel}
              onChange={(e) => handleInputChange("nivel", e.target.value)}
              className="input-editavel pequeno"
            />
          </>
        ) : (
          <>
            <span>{treino.tipo}</span> • <span>{treino.duracao}</span> •{" "}
            <span>{treino.nivel}</span>
          </>
        )}
      </div>

      {isEditing ? (
        <textarea
          className="input-editavel descricao"
          value={treino.descricao}
          onChange={(e) => handleInputChange("descricao", e.target.value)}
        />
      ) : (
        <p className="descricao">{treino.descricao}</p>
      )}

      <h4>Exercícios</h4>
      <table className="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Exercício</th>
            <th>Séries</th>
            <th>Repetições</th>
            <th>Descanso (s)</th>
          </tr>
        </thead>
        <tbody>
          {treino.exercicios.map((ex, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {isEditing ? (
                  <input
                    value={ex.nome}
                    onChange={(e) =>
                      handleExercicioChange(i, "nome", e.target.value)
                    }
                    className="input-editavel"
                  />
                ) : (
                  ex.nome
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={ex.series}
                    onChange={(e) =>
                      handleExercicioChange(i, "series", e.target.value)
                    }
                    className="input-editavel pequeno"
                  />
                ) : (
                  ex.series
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={ex.repeticoes}
                    onChange={(e) =>
                      handleExercicioChange(i, "repeticoes", e.target.value)
                    }
                    className="input-editavel pequeno"
                  />
                ) : (
                  ex.repeticoes
                )}
              </td>
              <td>
                {isEditing ? (
                  <input
                    type="number"
                    value={ex.descanso}
                    onChange={(e) =>
                      handleExercicioChange(i, "descanso", e.target.value)
                    }
                    className="input-editavel pequeno"
                  />
                ) : (
                  ex.descanso
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions">
        {isEditing ? (
          <>
            <button
              className="btn btn-outline"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
            <button className="btn btn-purple" onClick={handleSave}>
              Salvar Alterações
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => navigate(-1)}>
              Voltar
            </button>
            <button
              className="btn btn-purple"
              onClick={() => setIsEditing(true)}
            >
              Editar Treino
            </button>
          </>
        )}
      </div>
    </div>
  );
}
