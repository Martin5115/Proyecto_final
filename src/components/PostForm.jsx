import { useState } from "react";
import { publicar } from "../services";

const MAX = 280;

export default function PostForm({ uid, perfil }) {
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return setError("Escribe algo antes de publicar.");
    setEnviando(true);
    setError("");
    try {
      await publicar(texto, uid, perfil);
      setTexto("");
    } catch {
      setError("No se pudo publicar. Intenta de nuevo.");
    }
    setEnviando(false);
  };

  return (
    <form className="panel" onSubmit={enviar}>
      <label>
        Nuevo mensaje, {perfil.nombre}
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={MAX}
          rows={3}
          placeholder="¿Qué quieres dejar en el muro?"
        />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="acciones">
        <button className="btn" disabled={enviando}>
          {enviando ? "Publicando…" : "Publicar"}
        </button>
        <span className="contador">{texto.length}/{MAX}</span>
      </div>
    </form>
  );
}
