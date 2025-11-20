import React, { useState, useEffect } from "react";
import "../../styles/pages/admin/forms.scss";

export default function EditarProfessor({ professor, onClose, onSave }) {
  const [form, setForm] = useState({
    fu_id: professor.fu_id,
    fu_nome: professor.fu_nome || "",
    fu_email: professor.fu_email || "",
    fu_cpf: professor.fu_cpf || "",
    fu_telefone: professor.fu_telefone || "",
    fu_dtnasc: professor.fu_dtnasc || "",
    fu_cargo: "Professor",
    fu_cref: professor.fu_cref || "",
    fu_senha: "", // opcional: só enviar se o admin quiser alterar
  });

  // quando professor mudar (por segurança) atualiza o estado
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fu_id: professor.fu_id,
      fu_nome: professor.fu_nome || "",
      fu_email: professor.fu_email || "",
      fu_cpf: professor.fu_cpf || "",
      fu_telefone: professor.fu_telefone || "",
      fu_dtnasc: professor.fu_dtnasc || "",
      fu_cargo: "Professor",
      fu_cref: professor.fu_cref || "",
    }));
  }, [professor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // prepara payload (não enviar senha vazia)
    const payload = {
      fu_nome: form.fu_nome,
      fu_email: form.fu_email,
      fu_cpf: form.fu_cpf,
      fu_telefone: form.fu_telefone,
      fu_dtnasc: form.fu_dtnasc,
      fu_cref: form.fu_cref,
    };
    if (form.fu_senha && form.fu_senha.trim() !== "")
      payload.fu_senha = form.fu_senha;
    onSave({ ...payload, fu_id: form.fu_id });
  };

  return (
    <div className="admin-modal">
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content form-card"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Editar Professor</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome *</label>
              <input
                name="fu_nome"
                value={form.fu_nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="fu_email"
                value={form.fu_email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CPF *</label>
              <input
                name="fu_cpf"
                value={form.fu_cpf}
                onChange={handleChange}
                maxLength={11}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                name="fu_telefone"
                value={form.fu_telefone}
                onChange={handleChange}
                maxLength={11}
              />
            </div>

            <div className="form-group">
              <label>Data de Nascimento *</label>
              <input
                type="date"
                name="fu_dtnasc"
                value={form.fu_dtnasc}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CREF</label>
              <input
                name="fu_cref"
                value={form.fu_cref}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Nova senha (opcional)</label>
              <input
                type="password"
                name="fu_senha"
                value={form.fu_senha}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
