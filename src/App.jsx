import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "./firebase";
import { cerrarSesion, obtenerPerfil } from "./services";
import AuthForm from "./components/AuthForm.jsx";
import PostForm from "./components/PostForm.jsx";
import PostCard from "./components/PostCard.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [posts, setPosts] = useState([]);
  const [cargandoPosts, setCargandoPosts] = useState(true);
  const [mostrarAuth, setMostrarAuth] = useState(false);

  // Sesión actual
  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setPerfil(u ? await obtenerPerfil(u.uid) : null);
      if (u) setMostrarAuth(false);
      setCargandoAuth(false);
    });
  }, []);

  // Publicaciones en tiempo real (públicas, sin autenticación)
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (snap) => {
        setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setCargandoPosts(false);
      },
      () => setCargandoPosts(false)
    );
  }, []);

  return (
    <div className="app">
      <header className="barra">
        <h1 className="logo">Muro</h1>
        <nav>
          {cargandoAuth ? null : user ? (
            <>
              <span className="saludo">@{perfil?.usuario}</span>
              <button className="btn btn-claro" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              className="btn btn-claro"
              onClick={() => setMostrarAuth((v) => !v)}
            >
              {mostrarAuth ? "Cerrar" : "Entrar o crear cuenta"}
            </button>
          )}
        </nav>
      </header>

      <main className="contenido">
        {!user && mostrarAuth && <AuthForm />}

        {user && perfil && <PostForm uid={user.uid} perfil={perfil} />}

        {!user && !mostrarAuth && (
          <p className="aviso">
            Estás leyendo como visitante.{" "}
            <button className="enlace" onClick={() => setMostrarAuth(true)}>
              Inicia sesión
            </button>{" "}
            para publicar en el muro.
          </p>
        )}

        {cargandoPosts ? (
          <p className="vacio">Cargando publicaciones…</p>
        ) : posts.length === 0 ? (
          <p className="vacio">El muro está vacío. Escribe el primer mensaje.</p>
        ) : (
          <section className="muro" aria-label="Publicaciones">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} propio={p.uid === user?.uid} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
