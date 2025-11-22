import React, { useEffect, useState } from "react";
import "../../styles/pages/aluno/desafios.scss";
import DesafioCard from "../../components/Alunos/desafioCard";

export default function DesafiosAlunoPage() {
  const [desafios, setDesafios] = useState([]);
  const [carregando, setCarregando] = useState(true);

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
        if (Array.isArray(data)) {
          setDesafios(data);
        } else {
          console.error(
            "A API retornou dados não esperados (não é um array).",
            data
          );
          setDesafios([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    fetchDesafios();
  }, []);

  return (
    <div className="desafios-container">
      {/* Cards de resumo */}
      <section className="summary-cards">
        <div className="summary-card">
          <h3>Ativos</h3>
          <div className="card-number">3</div>
          <div className="card-subtitle">Em andamento</div>
        </div>
        <div className="summary-card">
          <h3>Concluídos</h3>
          <div className="card-number">12</div>
          <div className="card-subtitle">Completos</div>
        </div>
        <div className="summary-card">
          <h3>Pontos</h3>
          <div className="card-number">850</div>
          <div className="card-subtitle">Totais</div>
        </div>
      </section>

      {/* Desafios ativos */}
      <section className="desafios-section">
        <h2>Desafios Ativos</h2>
        {carregando && <p>Carregando desafios...</p>}

        {!carregando && desafios.length > 0
          ? desafios.map((desafio) =>
              desafio.de_status === "Ativo" ? (
                <DesafioCard
                  key={desafio.de_id}
                  titulo={desafio.de_nome}
                  descricao={desafio.de_descricao}
                  pontos={desafio.de_pontos}
                />
              ) : null
            )
          : !carregando && <p>Nenhum desafio ativo encontrado...</p>}
      </section>

      {/* Desafios disponíveis */}
      <section className="desafios-section">
        <h2>Desafios Disponíveis</h2>
        {!carregando && desafios.some((d) => d.de_status === "Inativo")
          ? desafios
              .filter((d) => d.de_status === "Inativo")
              .map((desafio) => (
                <DesafioCard
                  key={desafio.de_id}
                  titulo={desafio.de_nome}
                  descricao={desafio.de_descricao}
                  pontos={desafio.de_pontos}
                />
              ))
          : !carregando && <p>Nenhum desafio disponível...</p>}
      </section>
    </div>
  );
}
