import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/resgatePontos.scss";
import { use } from "react";

export default function ResgatePontosModal({ onClose }) {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/produtos", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        });
        const data = await res.json();
        if (data.sucess) {
          setProdutos(data.produtos);
        }
        if (!res.ok) throw new Error("Erro ao buscar dados dos produtos");
      } catch (error) {
        console.error(error);
      }
    };
    fetchProdutos();
  }, []);
  return (
    <div className="resgate-modal">
      <div className="resgate-header">
        <button className="back-btn" onClick={onClose}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2>Resgate de Pontos</h2>
      </div>
      <div className="resgate-opcoes">
        <h3>Opções de Resgate</h3>
        {produtos && produtos.length > 0 ? (
          produtos.map((produto) => (
            <div className="resgate-card purple">
              <div className="info">
                <h4>{produto.pd_nome}</h4>
                <p>{produto.pd_descricao}</p>
                <span className="pontos-custo">{produto.pd_valor} pontos</span>
              </div>
              <button className="resgatar">Resgatar</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível para resgate no momento.</p>
        )}
      </div>
    </div>
  );
}
