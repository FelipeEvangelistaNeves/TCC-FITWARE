import React, { useEffect, useState } from "react";
import "../../styles/pages/aluno/desafios.scss";
import DesafioCard from "../../components/Alunos/desafioCard";
import UploadDesafioModal from "./UploadDesafioModal";

export default function DesafiosAlunoPage() {
  const [desafios, setDesafios] = useState([]);
  const [carregando, setCarregando] = useState(true);

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
    const fetchDesafios = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/desafios`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar dados dos desafios");

        const data = await res.json();
        setDesafios(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    fetchDesafios();
  }, []);

  console.log(desafios);
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
      <section className="desafios-section">
        <h2>Desafios Ativos</h2>
        {carregando && <p>Carregando desafios...</p>}

        {!carregando && desafios.length > 0
          ? desafios
              .filter(
                (desafio) => String(desafio.de_status).toLowerCase() === "ativo"
              )
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
                />
              ))
          : !carregando && <p>Nenhum desafio ativo encontrado...</p>}
      </section>

      <UploadDesafioModal
        isOpen={modalOpen}
        onClose={fecharModal}
        desafioId={desafioSelecionado}
      />
    </div>
  );
}
