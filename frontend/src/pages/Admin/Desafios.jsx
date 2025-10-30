import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/admin/tabelas.scss";

export default function Desafios() {
  const [activeTab, setActiveTab] = useState("ativos");
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);
  const navigate = useNavigate();

  const desafios = [
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
    {
      id: "#DS-1004",
      nome: "Desafio de Força",
      descricao: "Aumentar carga em 10% em 30 dias",
      tipo: "Força",
      duracao: "30 dias",
      participantes: 18,
      pontos: 250,
      status: "programado",
      icone: "💪",
    },
  ];

  // ======== FILTROS ========
  const desafiosFiltrados = desafios.filter((d) => {
    const termo = busca.toLowerCase();
    const correspondeBusca =
      d.nome.toLowerCase().includes(termo) ||
      d.tipo.toLowerCase().includes(termo) ||
      d.descricao.toLowerCase().includes(termo);

    const correspondeAba =
      activeTab === "ativos"
        ? d.status === "ativo"
        : activeTab === "concluidos"
        ? d.status === "concluido"
        : activeTab === "programados"
        ? d.status === "programado"
        : true;

    return correspondeBusca && correspondeAba;
  });

  // ======== PAGINAÇÃO ========
  const totalPaginas = Math.ceil(desafiosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const desafiosPaginados = desafiosFiltrados.slice(inicio, fim);

  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas)
      setPaginaAtual(novaPagina);
  };

  const mudarItensPorPagina = (valor) => {
    setItensPorPagina(Number(valor));
    setPaginaAtual(1);
  };

  return (
    <div className="tabela-page">
      <div className="tabela-header">
        <h2>Desafios</h2>
        <div className="acoes-header">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar desafio..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPaginaAtual(1);
            }}
          />
          <button className="add-btn" onClick={() => navigate("adddesafio")}>
            + Criar Desafio
          </button>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "ativos" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("ativos");
            setPaginaAtual(1);
          }}
        >
          Ativos
        </button>
        <button
          className={`tab ${activeTab === "concluidos" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("concluidos");
            setPaginaAtual(1);
          }}
        >
          Concluídos
        </button>
        <button
          className={`tab ${activeTab === "programados" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("programados");
            setPaginaAtual(1);
          }}
        >
          Programados
        </button>
      </div>

      {/* ===== Tabela ===== */}
      <table className="tabela">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Duração</th>
            <th>Participantes</th>
            <th>Pontos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {desafiosPaginados.length > 0 ? (
            desafiosPaginados.map((d, index) => (
              <tr key={d.id}>
                <td>{inicio + index + 1}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="icone purple">{d.icone}</div>
                    <div>
                      <div>{d.nome}</div>
                      <small className="text-muted">{d.descricao}</small>
                    </div>
                  </div>
                </td>
                <td>{d.tipo}</td>
                <td>{d.duracao}</td>
                <td>{d.participantes}</td>
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
                    {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </span>
                </td>
                <td>
                  {/* Enviar Desafio */}
                  <button
                    className="action-btn"
                    title="Enviar Desafio"
                    onClick={() =>
                      navigate(
                        `enviar/${encodeURIComponent(d.id.replace(/^#/, ""))}`
                      )
                    }
                  >
                    <i className="bi bi-send"></i>
                  </button>

                  {/* Excluir */}
                  <button
                    className="action-btn"
                    title="Excluir"
                    onClick={() => alert(`Excluir ${d.nome}?`)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  {/* Detalhes */}
                  <button
                    className="action-btn"
                    title="Ver detalhes"
                    onClick={() =>
                      navigate(
                        `detalhes/${encodeURIComponent(d.id.replace(/^#/, ""))}`
                      )
                    }
                  >
                    <i className="bi bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#aaa" }}>
                Nenhum desafio encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ===== Paginação ===== */}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <span>Itens por página:</span>
          <select
            value={itensPorPagina}
            onChange={(e) => mudarItensPorPagina(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <div className="pages">
            <button
              className="page"
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {[...Array(totalPaginas)].map((_, i) => (
              <button
                key={i}
                className={`page ${paginaAtual === i + 1 ? "active" : ""}`}
                onClick={() => mudarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page"
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
