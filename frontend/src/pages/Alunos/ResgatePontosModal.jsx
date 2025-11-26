import React, { useState, useEffect } from "react";
import "../../styles/pages/aluno/resgatePontos.scss";

export default function ResgatePontosModal({ onClose, onResgateSucesso }) {
  const [produtos, setProdutos] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [comprovante, setComprovante] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarComprovante, setMostrarComprovante] = useState(false);

  // 🔹 Buscar produtos
  const fetchProdutos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/produtos/all`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setProdutos(data.produtos);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Buscar saldo
  const fetchSaldo = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/aluno`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data && data.pontos !== undefined) {
        setSaldo(data.pontos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProdutos();
    fetchSaldo();
  }, []);

  // 🔹 Clicar em RESGATAR
  const handleResgatarClick = async (produtoId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/produtos/search/${produtoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!data.success) {
        setMensagem("Erro ao buscar produto.");
        return;
      }

      setProdutoSelecionado(data.produto);
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao buscar produto.");
    }
  };

  // 🔹 Confirmar resgate
  const confirmarResgate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/produtos/resgatar`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ produtoId: produtoSelecionado.pd_id }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setMensagem(data.message || "Erro ao confirmar resgate.");
        return;
      }

      // Mensagem de sucesso
      setMensagem(
        `🎉 Resgate realizado! Seu comprovante é: ${data.comprovante.re_hash}`
      );
      setComprovante(data.comprovante);

      // Fecha modal de confirmação e abre modal de comprovante
      setMostrarModal(false);
      setProdutoSelecionado(null);
      setMostrarComprovante(true);

      // Atualiza saldo e produtos
      await fetchProdutos();
      await fetchSaldo();

      // Callback para atualizar comprovantes no perfil
      if (onResgateSucesso) {
        onResgateSucesso();
      }
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

        {mensagem && (
          <div className="mensagem-retorno">
            <p>{mensagem}</p>
          </div>
        )}
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

      {/* 🔹 Modal de Comprovante */}
      {mostrarComprovante && comprovante && (
        <div className="overlay">
          <div className="modal-comprovante">
            <h3>🎉 Resgate Realizado!</h3>
            <div className="comprovante-content">
              <p>Seu resgate foi confirmado com sucesso!</p>
              <div className="hash-box">
                <label>Comprovante:</label>
                <p className="hash">{comprovante.re_hash}</p>
              </div>
            </div>
            <button
              className="fechar"
              onClick={() => {
                setMostrarComprovante(false);
                setComprovante(null);
                setMensagem("");
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
