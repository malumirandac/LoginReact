# LoginReact

Aplicación desarrollada con **React Native y Expo** que implementa un sistema básico de **inicio de sesión (Login)** con validación de credenciales, interfaz moderna y navegación estructurada.  
El proyecto forma parte de una evaluación académica de la asignatura **Desarrollo de Aplicaciones Móviles** del **Instituto Profesional San Sebastián**.

---

## 🚀 Características principales

- Pantalla de **login funcional** con validación local de usuario y contraseña.  
- Diseño adaptable a **plataformas web y móviles** (Expo Web / Android).  
- Navegación estructurada mediante **Expo Router**.  
- Manejo de autenticación con **Context API**.  
- Estilos personalizados con `StyleSheet` (borde dinámico, colores y diseño centrado).  
- Compatible con el flujo de trabajo de **Expo CLI** y **VS Code**.

---

## 🧩 Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **React Native** | Framework base para la app móvil |
| **Expo** | Entorno de desarrollo y ejecución multiplataforma |
| **TypeScript** | Tipado estático para componentes y funciones |
| **React Navigation (Expo Router)** | Navegación entre pantallas |
| **Context API** | Manejo de sesión (login/logout) |
| **Git & GitHub** | Control de versiones y repositorio remoto |

---

## 🗂️ Estructura del proyecto

```text
EVA1/
  app/
    (tabs)/                 # Pantallas con navegación tipo tabs
      _layout.tsx           # Layout principal de pestañas
      index.tsx             # Pantalla principal
      explore.tsx           # Pantalla secundaria

    _layout.tsx             # Layout global de la app
    login.tsx               # Pantalla de Login
    modal.tsx               # Pantalla Modal

  components/               # Componentes reutilizables (UI)
  constants/                # Colores, temas, variables globales
  assets/                   # Imágenes y recursos estáticos
  scripts/                  # Scripts adicionales

  package.json              # Dependencias y configuración
  app.json                  # Configuración de Expo
  tsconfig.json             # Configuración de TypeScript
  README.md                 # Este documento
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
git clone https://github.com/malumirandac/LoginReact.git
cd LoginReact

### 2️⃣ Instalar dependencias
npm install

### 3️⃣ Iniciar la aplicación
npx expo start

Esto abrirá el panel de Expo en tu navegador.  

Desde ahí puedes:
- Presionar **w** para ejecutar la app en modo **web**.  
- Presionar **a** para abrirla en un emulador o dispositivo **Android** (si tienes Android Studio configurado).

---

## 🧠 Credenciales de prueba

Usuario | Contraseña
---------|------------
user | 1234
admin | admin

---

## 🧩 Lógica principal

- Las credenciales se validan en memoria mediante un arreglo `EXPECTED_USERS`.  
- Si los datos son correctos, se actualiza el contexto global (`AuthContext`) con la información del usuario.  
- En caso de error, se muestra una alerta nativa (`Alert.alert` en móvil o `window.alert` en web).  

---

## 🎨 Estilos

- Implementados con **StyleSheet**.  
- Borde de input personalizable (rosa/morado según estado).  
- Botones con color destacado `#ff00f2ff` y texto blanco.  
- Fuentes limpias y centrado de elementos.

---

## 🧰 Scripts útiles

Comando | Descripción
---------|-------------
npm start | Inicia el servidor de desarrollo de Expo
npm run web | Ejecuta la app en el navegador
npm run android | Ejecuta la app en Android (requiere emulador)
git push | Sube los cambios a GitHub

---

## 🧾 Autor

**Malú Miranda Cortés**  
Estudiante del **Instituto Profesional San Sebastián**  
Carrera: *Ingeniería en Informática*  
Asignatura: *Desarrollo de Aplicaciones Móviles*

---

## 📄 Licencia

Este proyecto se distribuye con fines educativos.  
El código puede ser reutilizado o modificado con fines académicos o de aprendizaje.