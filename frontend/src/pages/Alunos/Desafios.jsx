import React, { useEffect, useState } from "react";
import "../../styles/pages/aluno/desafios.scss";
import DesafioCard from "../../components/Alunos/desafioCard";
import UploadDesafioModal from "./UploadDesafioModal";

export default function DesafiosAlunoPage() {
  const [desafios, setDesafios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [applied, setApplied] = useState({}); // map: de_id -> ad_status
  const [applyingId, setApplyingId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);

  const abrirModal = (id) => {
    setDesafioSelecionado(id);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setDesafioSelecionado(null);
  };

  // contadores derivadas
  const ativosCount = desafios.filter(
    (d) => String(d.de_status).toLowerCase() === "ativo"
  ).length;
  const concluidosCount = desafios.filter((d) =>
    String(d.de_status).toLowerCase().includes("concl")
  ).length;
  const totalPoints = desafios
    .filter((d) => String(d.de_status).toLowerCase() === "ativo")
    .reduce((sum, d) => sum + (Number(d.de_pontos) || 0), 0);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const base = `${import.meta.env.VITE_BASE_URL}/desafios`;
        const [listRes, meRes] = await Promise.all([
          fetch(base, { method: "GET", credentials: "include", headers: { Accept: "application/json; charset=utf-8" } }),
          fetch(`${base}/me`, { method: "GET", credentials: "include", headers: { Accept: "application/json; charset=utf-8" } }),
        ]);

        if (!listRes.ok) throw new Error("Erro ao buscar dados dos desafios");

        const list = await listRes.json();
        setDesafios(list);

        if (meRes.ok) {
          const my = await meRes.json();
          // convert to map
          const map = {};
          (my || []).forEach((r) => {
            map[r.de_id] = r.ad_status;
          });
          setApplied(map);
        } else {
          // not logged in / no applied
          setApplied({});
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };

    fetchAll();
  }, []);

  // Apply handler
  const aplicar = async (desafioId) => {
    try {
      setApplyingId(desafioId);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios/${desafioId}/aplicar`, {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });

      if (res.status === 401) {
        alert("Você precisa estar logado como aluno para aplicar neste desafio.");
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erro ao aplicar no desafio");
      }

      // success: mark as applied
      setApplied((prev) => ({ ...prev, [desafioId]: "ativo" }));
    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao aplicar no desafio");
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="desafios-container">
      {/* Cards de resumo */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Ativos</h3>
          <div className="card-number">{ativosCount}</div>
          <div className="card-subtitle">Em andamento</div>
        </div>
        <div className="summary-card">
          <h3>Concluídos</h3>
          <div className="card-number">{concluidosCount}</div>
          <div className="card-subtitle">Completos</div>
        </div>
        <div className="summary-card">
          <h3>Pontos</h3>
          <div className="card-number">{totalPoints}</div>
          <div className="card-subtitle">Totais</div>
        </div>
      </section>

      {/* Desafios ativos */}
      {carregando && <p>Carregando desafios...</p>}
      <section className="desafios-section">
        <h2>Desafios Disponíveis</h2>

        {!carregando && desafios.length > 0 ? (
          desafios
            .filter((desafio) => String(desafio.de_status).toLowerCase() === "ativo")
            .filter((desafio) => !applied[desafio.de_id])
            .map((desafio) => (
              <DesafioCard
                key={desafio.de_id}
                titulo={desafio.de_nome}
                descricao={desafio.de_descricao}
                pontos={desafio.de_pontos}
                status={desafio.de_status}
                endDate={desafio.de_end}
                progress={desafio.de_progresso}
                onAplicar={() => aplicar(desafio.de_id)}
                applying={applyingId === desafio.de_id}
              />
            ))
        ) : (
          !carregando && <p>Nenhum desafio ativo encontrado...</p>
        )}

        <hr style={{ margin: "20px 0" }} />

        <h2>Desafios em andamento</h2>

        {!carregando && desafios.length > 0 ? (
          desafios
            .filter((desafio) => String(desafio.de_status).toLowerCase() === "ativo")
            .filter((desafio) => applied[desafio.de_id] && String(applied[desafio.de_id]).toLowerCase() === "ativo")
            .map((desafio) => (
              <DesafioCard
                key={desafio.de_id}
                titulo={desafio.de_nome}
                descricao={desafio.de_descricao}
                pontos={desafio.de_pontos}
                status={desafio.de_status}
                endDate={desafio.de_end}
                progress={desafio.de_progresso}
                onEnviar={() => abrirModal(desafio.de_id)}
                applied={true}
              />
            ))
        ) : (
          !carregando && <p>Nenhum desafio em andamento...</p>
        )}
      </section>

      <UploadDesafioModal
        isOpen={modalOpen}
        onClose={fecharModal}
        desafioId={desafioSelecionado}
      />
    </div>
  );
}
