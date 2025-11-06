import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/resgatePontos.scss";

export default function ResgatePontosModal({ onClose }) {
  const [produtos, setProdutos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // 🔹 Buscar produtos e saldo
  const fetchProdutos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/produtos/all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setProdutos(data.produtos);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSaldo = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/alunos", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setSaldo(data.al_pontos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchSaldo();
  }, []);

  // 🔹 Quando clica em "Resgatar"
  const handleResgatarClick = async (produtoId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/produtos/search/${produtoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error("Produto não encontrado.");

      // Abre modal de confirmação
      setProdutoSelecionado(data.produto);
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao buscar o produto para resgate.");
    }
  };

  // 🔹 Confirmar resgate (POST + atualização)
  const confirmarResgate = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/produtos/resgatar", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produtoId: produtoSelecionado.pd_id }),
      });

      const data = await res.json();

      if (!data.success) throw new Error("Erro ao registrar resgate.");

      setMensagem(`Resgate de "${produtoSelecionado.pd_nome}" realizado!`);
      setMostrarModal(false);
      setProdutoSelecionado(null);

      // Atualiza dados na tela
      await fetchProdutos();
      await fetchSaldo();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao confirmar resgate.");
    }
  };

  return (
    <div className="resgate-modal">
      <div className="resgate-header">
        <button className="back-btn" onClick={onClose}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2>Resgate de Pontos</h2>
        <span className="saldo">Saldo: {saldo} pontos</span>
      </div>

      <div className="resgate-opcoes">
        <h3>Opções de Resgate</h3>

        {produtos && produtos.length > 0 ? (
          produtos.map((produto) => {
            let estoqueStatus = "";
            if (produto.pd_estoque <= 0) estoqueStatus = "indisponível";
            else if (produto.pd_estoque <= 5) estoqueStatus = "acabando";
            else estoqueStatus = "disponível";

            return (
              <div key={produto.pd_id} className="resgate-card purple">
                <div className="info">
                  <h4>{produto.pd_nome}</h4>
                  <p>{produto.pd_descricao}</p>
                  <span className="pontos-custo">
                    {produto.pd_valor} pontos
                  </span>
                </div>

                <div className="acoes">
                  <button
                    className="resgatar"
                    disabled={produto.pd_estoque <= 0}
                    onClick={() => handleResgatarClick(produto.pd_id)}
                  >
                    Resgatar
                  </button>
                  <p className={`status ${estoqueStatus}`}>{estoqueStatus}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>Nenhum produto disponível para resgate.</p>
        )}

        {mensagem && <div className="mensagem-retorno">{mensagem}</div>}
      </div>

      {/* 🔹 Modal de confirmação */}
      {mostrarModal && produtoSelecionado && (
        <div className="overlay">
          <div className="modal-confirmacao">
            <h3>Confirmar Resgate</h3>
            <p>
              Deseja realmente resgatar{" "}
              <strong>{produtoSelecionado.pd_nome}</strong> por{" "}
              {produtoSelecionado.pd_valor} pontos?
            </p>
            <div className="botoes">
              <button className="confirmar" onClick={confirmarResgate}>
                Confirmar
              </button>
              <button
                className="cancelar"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
