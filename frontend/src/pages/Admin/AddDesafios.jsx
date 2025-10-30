import React, { useState } from "react";
import "../../styles/pages/admin/forms.scss";

export default function AddDesafio() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    duracao: "",
    pontos: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(`✅ Desafio "${form.nome}" criado com sucesso!`);
  };

  return (
    <div className="form-page">
      <h2>Criar Novo Desafio</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Nome do Desafio</label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Desafio 7 Dias"
          />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <input
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            placeholder="Ex: Cardio, Força..."
          />
        </div>

        <div className="form-group">
          <label>Duração</label>
          <input
            name="duracao"
            value={form.duracao}
            onChange={handleChange}
            placeholder="Ex: 7 dias"
          />
        </div>

        <div className="form-group">
          <label>Pontos</label>
          <input
            name="pontos"
            type="number"
            value={form.pontos}
            onChange={handleChange}
            placeholder="Ex: 100"
          />
        </div>

        <div className="form-group descricao">
          <label>Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Explique o desafio..."
          />
        </div>
      </div>

      <div className="actions">
        <button
          className="btn btn-outline"
          onClick={() => window.history.back()}
        >
          Cancelar
        </button>
        <button className="btn btn-purple" onClick={handleSubmit}>
          Salvar Desafio
        </button>
      </div>
    </div>
  );
}
