import { useState } from "react";
import "../../styles/pages/aluno/uploadDesafios.scss";

export default function UploadDesafioModal({ isOpen, onClose, desafioId }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const handleCancelar = () => {
    setFile(null);
    setPreview(null);
    setShowSuccess(false);
    onClose();
  };

  const handleEnviar = async () => {
    if (!file) {
      alert("Selecione uma imagem!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/desafios/${desafioId}/imagem`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setShowSuccess(true);
      setTimeout(() => {
        handleCancelar();
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Imagem enviada com sucesso!</h3>
            <p>Sua comprovação foi recebida.</p>
          </div>
        ) : (
          <>
            <h2>Enviar Comprovação</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {preview && (
              <img src={preview} alt="Preview" className="preview-img" />
            )}

            <div className="actions">
              <button className="cancel" onClick={handleCancelar}>
                Cancelar
              </button>

              <button
                className="send"
                onClick={handleEnviar}
                disabled={loading || !file}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
