const COLORES = ["#F6E7A8", "#CFE8D5", "#F4CFC4", "#CBDDF2", "#E3D4EE"];

// Mismo color siempre para el mismo autor
const colorDe = (usuario = "") =>
  COLORES[[...usuario].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORES.length];

function formatearFecha(ts) {
  if (!ts) return "Ahora mismo";
  return ts.toDate().toLocaleString("es-DO", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function PostCard({ post, propio }) {
  return (
    <article
      className={`nota${propio ? " nota-propia" : ""}`}
      style={{ background: colorDe(post.usuario) }}
    >
      <p className="nota-texto">{post.texto}</p>
      <footer className="nota-pie">
        <strong>
          {post.nombre} {post.apellido}
        </strong>
        <span>
          @{post.usuario} · {formatearFecha(post.createdAt)}
        </span>
      </footer>
    </article>
  );
}
