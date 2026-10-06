# Muro Interactivo

Proyecto final de Programación WEB (ITLA), Opción 1.
Tecnologías: JavaScript ES6, React (Vite) y Firebase (Authentication + Firestore).

## Funcionalidades
1. Ver todas las publicaciones de todos los usuarios, sin autenticación (tiempo real).
2. Crear cuenta: usuario, clave, nombre y apellido.
3. Iniciar sesión / cerrar sesión.
4. Publicar nuevos posts (solo usuarios autenticados, máx. 280 caracteres).

## Configuración de Firebase
1. Crea un proyecto en https://console.firebase.google.com
2. **Authentication > Sign-in method**: activa **Correo electrónico/contraseña**.
3. **Firestore Database**: crea la base de datos.
4. **Firestore > Reglas**: pega el contenido de `firestore.rules` y publica.
5. **Configuración del proyecto > Tus apps > Web (</>)**: registra la app y copia la configuración.
6. Copia `.env.example` a `.env` y completa los valores.

## Ejecutar
```bash
npm install
npm run dev
```
Abre http://localhost:5173

## Notas de diseño
- Firebase Auth exige correo, por lo que el *usuario* se convierte internamente en `usuario@muro.app`.
  Así el usuario es único y la clave queda cifrada por Firebase (nunca se guarda en Firestore).
- Colección `users/{uid}`: `usuario`, `nombre`, `apellido`.
- Colección `posts/{id}`: `texto`, `uid`, `usuario`, `nombre`, `apellido`, `createdAt`.
- Las reglas de seguridad permiten leer posts a cualquiera, pero crearlos solo a usuarios autenticados.

## Estructura
```
src/
  firebase.js          Inicialización de Firebase
  services.js          Registro, login, perfil y publicaciones
  App.jsx              Estado global y vista principal
  components/
    AuthForm.jsx       Login / registro
    PostForm.jsx       Formulario de nuevo post
    PostCard.jsx       Tarjeta de cada publicación
```
