import React, { useState } from "react";

// ====== ESTILOS ======
import "../../styles/pages/admin/tabelas.scss";
import "../../styles/pages/admin/forms.scss";

// ====== MODAIS ======
import AddDesafio from "./AddDesafios";
import EditarDesafio from "./EditarDesafio";
import DetalhesDesafio from "./DetalhesDesafios";
import ExcluirDesafio from "./ExcluirDesafio";

export default function Desafios() {
  const [activeTab, setActiveTab] = useState("ativos");
  const [busca, setBusca] = useState("");
  const [pagina, setPagina] = useState(1);
  const [itensPagina, setItensPagina] = useState(10);

  // ====== MODAIS ======
  const [showAdd, setShowAdd] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [showExcluir, setShowExcluir] = useState(false);
  const [selecionado, setSelecionado] = useState(null);

  // ====== DADOS ======
  const [desafios, setDesafios] = useState([
    {
      id: "#DS-1001",
      nome: "Desafio 7 Dias",
      descricao: "Treinar todos os dias por uma semana",
      tipo: "Frequência",
      duracao: "7 dias",
      participantes: 42,
      pontos: 100,
      status: "ativo",
      icone: "📅",
    },
    {
      id: "#DS-1002",
      nome: "Desafio 10K",
      descricao: "Correr 10km em uma semana",
      tipo: "Cardio",
      duracao: "7 dias",
      participantes: 28,
      pontos: 150,
      status: "ativo",
      icone: "🏃",
    },
    {
      id: "#DS-1003",
      nome: "Desafio de Nutrição",
      descricao: "Seguir plano nutricional por 14 dias",
      tipo: "Nutrição",
      duracao: "14 dias",
      participantes: 35,
      pontos: 200,
      status: "concluido",
      icone: "🥗",
    },
  ]);

  // ====== FILTROS ======
  const filtrados = desafios.filter((d) => {
    const termo = busca.toLowerCase();

    const matchBusca =
      d.nome.toLowerCase().includes(termo) ||
      d.tipo.toLowerCase().includes(termo) ||
      d.descricao.toLowerCase().includes(termo);

    const matchAba =
      activeTab === "ativos"
        ? d.status === "ativo"
        : activeTab === "concluidos"
        ? d.status === "concluido"
        : activeTab === "programados"
        ? d.status === "programado"
        : true;

    return matchBusca && matchAba;
  });

  // ====== PAGINAÇÃO ======
  const totalPaginas = Math.ceil(filtrados.length / itensPagina);
  const inicio = (pagina - 1) * itensPagina;
  const exibidos = filtrados.slice(inicio, inicio + itensPagina);

  const mudarPagina = (p) => {
    if (p >= 1 && p <= totalPaginas) setPagina(p);
  };

  // ===== CRUD HANDLERS =====
  const adicionar = (novo) => {
    const novoId = "#DS-" + Math.floor(1000 + Math.random() * 9000);
    setDesafios([{ ...novo, id: novoId }, ...desafios]);
    setShowAdd(false);
  };

  const atualizar = (editado) => {
    setDesafios((prev) => prev.map((d) => (d.id === editado.id ? editado : d)));
    setShowEditar(false);
  };

  const deletar = () => {
    setDesafios((prev) => prev.filter((d) => d.id !== selecionado.id));
    setShowExcluir(false);
  };

  return (
    <div className="tabela-page admin-modal">
      {/* HEADER */}
      <div className="tabela-header">
        <h2>Desafios</h2>
        <div className="acoes-header">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar desafio..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="add-btn" onClick={() => setShowAdd(true)}>
            + Criar Desafio
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "ativos" ? "active" : ""}`}
          onClick={() => setActiveTab("ativos")}
        >
          Ativos
        </button>
        <button
          className={`tab ${activeTab === "concluidos" ? "active" : ""}`}
          onClick={() => setActiveTab("concluidos")}
        >
          Concluídos
        </button>
        <button
          className={`tab ${activeTab === "programados" ? "active" : ""}`}
          onClick={() => setActiveTab("programados")}
        >
          Programados
        </button>
      </div>

      {/* TABELA */}
      <table className="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Desafio</th>
            <th>Tipo</th>
            <th>Duração</th>
            <th>Pontos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {exibidos.length > 0 ? (
            exibidos.map((d, index) => (
              <tr key={d.id}>
                <td>{inicio + index + 1}</td>

                <td className="user-info">
                  <div className="icone purple">{d.icone}</div>
                  <div>
                    <strong>{d.nome}</strong>
                    <small>{d.descricao}</small>
                  </div>
                </td>

                <td>{d.tipo}</td>
                <td>{d.duracao}</td>
                <td>⭐ {d.pontos}</td>

                <td>
                  <span
                    className={`status ${
                      d.status === "ativo"
                        ? "pago"
                        : d.status === "programado"
                        ? "pendente"
                        : "cancelado"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>

                <td>
                  {/* EDITAR */}
                  <button
                    className="action-btn"
                    title="Editar Desafio"
                    onClick={() => {
                      setSelecionado(d);
                      setShowEditar(true);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  {/* EXCLUIR */}
                  <button
                    className="action-btn"
                    title="Excluir"
                    onClick={() => {
                      setSelecionado(d);
                      setShowExcluir(true);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  {/* DETALHES */}
                  <button
                    className="action-btn"
                    title="Detalhes"
                    onClick={() => {
                      setSelecionado(d);
                      setShowDetalhes(true);
                    }}
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="sem-resultado">
                Nenhum desafio encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* === PAGINAÇÃO === */}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <span>Itens por página:</span>
          <select
            value={itensPagina}
            onChange={(e) => {
              setItensPagina(Number(e.target.value));
              setPagina(1);
            }}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>

          <div className="pages">
            <button
              className="page"
              disabled={pagina === 1}
              onClick={() => mudarPagina(pagina - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={`page ${pagina === i + 1 ? "active" : ""}`}
                onClick={() => mudarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page"
              disabled={pagina === totalPaginas}
              onClick={() => mudarPagina(pagina + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* ===== MODAIS ===== */}
      {showAdd && (
        <AddDesafio onClose={() => setShowAdd(false)} onSave={adicionar} />
      )}
      {showEditar && selecionado && (
        <EditarDesafio
          desafio={selecionado}
          onClose={() => setShowEditar(false)}
          onSave={atualizar}
        />
      )}
      {showDetalhes && selecionado && (
        <DetalhesDesafio
          desafio={selecionado}
          onClose={() => setShowDetalhes(false)}
        />
      )}
      {showExcluir && selecionado && (
        <ExcluirDesafio
          desafio={selecionado}
          onClose={() => setShowExcluir(false)}
          onConfirm={deletar}
        />
      )}
    </div>
  );
}
