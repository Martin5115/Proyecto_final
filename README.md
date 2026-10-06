# Muro Interactivo

Proyecto final de Programación WEB, Opción 1.
Tecnologías: JavaScript ES6, React Vite y Firebase Authentication + Firestore

## Capturas de pantallas:
<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/70c458c1-e586-4fc0-85bc-fe58570b908e" />

<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/925b2b0a-1a8a-4f1c-94a5-7bb3b86359fa" />

<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/aac1b199-d3a2-4d21-9e69-f561532b7d0f" />

<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/12bb7881-2e2d-4bb0-88e2-ff73ad92abcd" />

<img width="583" height="257" alt="image" src="https://github.com/user-attachments/assets/ed2afd75-3b4e-4a0b-9fa5-019c5dcb0926" />

<img width="354" height="170" alt="image" src="https://github.com/user-attachments/assets/de4795d1-d272-4cbc-a57e-82807d9b9fa2" />

<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/e432c3f1-5665-4bac-9972-96c843ea1af5" />

<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/50900a65-28c0-4f2b-b864-ff6959d297a6" />

<img width="979" height="560" alt="image" src="https://github.com/user-attachments/assets/c4e05336-38fe-45ef-9eaa-79ae9795106a" />

<img width="404" height="210" alt="image" src="https://github.com/user-attachments/assets/9582fa7d-5ce7-4ade-8790-598df23b476e" />

<img width="1600" height="860" alt="image" src="https://github.com/user-attachments/assets/995a80eb-77c8-4418-98ff-2c2f2d98e436" />

<img width="1184" height="447" alt="image" src="https://github.com/user-attachments/assets/3edb88a1-ee09-4fd7-8f5d-d968e3eb3b4d" />

<img width="1104" height="449" alt="image" src="https://github.com/user-attachments/assets/888ec30b-59a2-42f0-b9d7-eeee5562c213" />

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
