import { useState } from "react";
import { iniciarSesion, mensajeError, registrar } from "../services";

const VACIO = { usuario: "", clave: "", nombre: "", apellido: "" };

export default function AuthForm() {
  const [modo, setModo] = useState("login"); // "login" | "registro"
  const [datos, setDatos] = useState(VACIO);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const cambiar = (e) =>
    setDatos((d) => ({ ...d, [e.target.name]: e.target.value }));

  const enviar = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(datos.usuario.trim())) {
      return setError(
        "El usuario debe tener de 3 a 20 caracteres: letras, números o guion bajo."
      );
    }
    if (modo === "registro" && (!datos.nombre.trim() || !datos.apellido.trim())) {
      return setError("Escribe tu nombre y apellido.");
    }

    setEnviando(true);
    try {
      if (modo === "registro") await registrar(datos);
      else await iniciarSesion(datos);
    } catch (err) {
      setError(mensajeError(err));
      setEnviando(false);
    }
  };

  const registro = modo === "registro";

  return (
    <form className="panel" onSubmit={enviar}>
      <h2>{registro ? "Crear cuenta" : "Iniciar sesión"}</h2>

      {registro && (
        <div className="fila">
          <label>
            Nombre
            <input name="nombre" value={datos.nombre} onChange={cambiar} required />
          </label>
          <label>
            Apellido
            <input name="apellido" value={datos.apellido} onChange={cambiar} required />
          </label>
        </div>
      )}

      <label>
        Usuario
        <input
          name="usuario"
          value={datos.usuario}
          onChange={cambiar}
          autoComplete="username"
          required
        />
      </label>

      <label>
        Clave
        <input
          type="password"
          name="clave"
          value={datos.clave}
          onChange={cambiar}
          autoComplete={registro ? "new-password" : "current-password"}
          minLength={6}
          required
        />
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <div className="acciones">
        <button className="btn" disabled={enviando}>
          {enviando ? "Un momento…" : registro ? "Crear cuenta" : "Iniciar sesión"}
        </button>
        <button
          type="button"
          className="enlace"
          onClick={() => {
            setModo(registro ? "login" : "registro");
            setError("");
          }}
        >
          {registro ? "Ya tengo cuenta" : "No tengo cuenta"}
        </button>
      </div>
    </form>
  );
}
