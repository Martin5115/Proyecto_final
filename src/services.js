import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// Firebase Auth exige un correo, así que el "usuario" se convierte en uno interno.
const aCorreo = (usuario) => `${usuario.trim().toLowerCase()}@muro.app`;

const ERRORES = {
  "auth/email-already-in-use": "Ese nombre de usuario ya existe.",
  "auth/invalid-credential": "Usuario o clave incorrectos.",
  "auth/user-not-found": "Usuario o clave incorrectos.",
  "auth/wrong-password": "Usuario o clave incorrectos.",
  "auth/weak-password": "La clave debe tener al menos 6 caracteres.",
  "auth/too-many-requests": "Demasiados intentos. Espera un momento.",
};
export const mensajeError = (e) =>
  ERRORES[e.code] || "Ocurrió un error. Intenta de nuevo.";

export async function registrar({ usuario, clave, nombre, apellido }) {
  const cred = await createUserWithEmailAndPassword(
    auth,
    aCorreo(usuario),
    clave
  );
  // La clave la guarda Firebase Auth (cifrada); en Firestore solo va el perfil.
  await setDoc(doc(db, "users", cred.user.uid), {
    usuario: usuario.trim().toLowerCase(),
    nombre: nombre.trim(),
    apellido: apellido.trim(),
  });
}

export const iniciarSesion = ({ usuario, clave }) =>
  signInWithEmailAndPassword(auth, aCorreo(usuario), clave);

export const cerrarSesion = () => signOut(auth);

export async function obtenerPerfil(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export const publicar = (texto, uid, perfil) =>
  addDoc(collection(db, "posts"), {
    texto: texto.trim(),
    uid,
    usuario: perfil.usuario,
    nombre: perfil.nombre,
    apellido: perfil.apellido,
    createdAt: serverTimestamp(),
  });
