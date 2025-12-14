# LoginReact

Aplicación desarrollada con **React Native y Expo** que implementa un sistema básico de **inicio de sesión (Login)** con validación de credenciales conectado a una API externa que integra un flujo de frontend-backend mediante el uso de **tokens JWT** utilizando una interfaz moderna y navegación estructurada.  
Además, contempla un módulo de **To Do List** donde cada tarea puede incluir **imagen** y **georeferencia**.
El proyecto forma parte de una evaluación académica de la asignatura **Desarrollo de Aplicaciones Móviles** del **Instituto Profesional San Sebastián**.

---

## Características principales

- Pantalla de **login funcional** con validación local de usuario y contraseña.  
- **To Do List**
    - Creación de tareas con título
    - Posibilidad de **adjuntar una foto** tomada con la cámara
    - Obtención de la **ubicación actual** del dispositivo (georreferencia) para asociarla a la tarea
    - Visualización de las tareas en una lista
- Diseño adaptable a **plataformas web y móviles** (Expo Web / Android).  
- Navegación estructurada mediante **Expo Router**.    
- Estilos personalizados con `StyleSheet` (borde dinámico, colores y diseño centrado).  
- Compatible con el flujo de trabajo de **Expo CLI**, **Android Studio** y **VS Code**.

---

## Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|----------------|
| **React Native** | Framework base para la app móvil |
| **Expo** | Entorno de desarrollo y ejecución multiplataforma |
| **TypeScript** | Tipado estático para componentes y funciones |
| **React Navigation (Expo Router)** | Navegación entre pantallas |
| **Context API** | Manejo de sesión (login/logout) |
| **expo-image-picker** | Captura de imagen para las tareas |
| **expo-location** | Obtención de la ubicación del dispositi |
| **Git & GitHub** | Control de versiones y repositorio remoto |
| **Android Studio + Emulador** | Pruebas en entorno Android virtual |

---

## API utilizada

El frontend se conecta a la siguiente API: https://todo-list.dobleb.cl/

Esta API fue desarrollada y desplegada sobre Cloudflare Workers, utilizando Cloudflare D1 como base de datos y Cloudflare R2 para almacenamiento de archivos.

## Pruebas de la API

Antes de integrar el frontend, la API fue probada utilizando Swagger (OpenApi) https://todo-list.dobleb.cl/docs , lo que permitió:
- Verificar correctamente los endpoints disponibles
- Probar el registro y login de usuarios
- Validar respuestas y manejo de errores
- Confirmar la generación y uso de tokens JWT

Swagger facilitó la validación del contrato entre el frontend y el backend antes de la integración final

---

## Autenticación y seguridad

La comunicación entre el frontend y la API se realiza mediante tokens JWT, los cuales:
- Se obtienen al iniciar sesión correctamente
- Se envían en las solicitudes protegidas al backend
- Permiten autenticar al usuario sin exponer credenciales sensibles

---

### Flujo de uso

1. El usuario inicia sesión en la aplicación.
2. Accede a la pestaña de **To Do List**.
3. Para crear una nueva tarea:
   - Ingresa el **título** de la tarea.
   - (Opcional) Toma una **foto** con la cámara o elige una imagen desde la galería mediante `expo-image-picker`.
   - (Opcional) Solicita la **ubicación actual**; la app pide permiso y obtiene las coordenadas mediante `expo-location`.
4. La tarea se guarda en memoria junto a:
   - `id` único.
   - `title`.
   - `completed` (estado).
   - `imageUri` (cuando se adjunta foto).
   - `location` (latitud / longitud cuando se autoriza la geolocalización).

### Permisos

- Cuando se utiliza la cámara por primera vez, la app solicita permisos a través de **`expo-image-picker`**.
- Para la georreferencia, la app solicita permisos de ubicación mediante **`expo-location`**.
- Si el usuario deniega los permisos, la app muestra mensajes informativos y la funcionalidad asociada (foto o ubicación) se desactiva para esa operación.

---

## Estructura del proyecto

```text
EVA1/
  app/
    (tabs)/                 # Pantallas con navegación tipo tabs
      _layout.tsx           # Layout principal de pestañas
      index.tsx             # Pantalla principal
      explore.tsx           # Pantalla secundaria
      profile.tsx           # Pantalla de perfil / To Do List

    _layout.tsx             # Layout global de la app
    login.tsx               # Pantalla de Login

  components/               # Componentes reutilizables (UI)
      context/              # Contextos globales de la aplicación (estado compartido)
        auth-context.tsx/   # Contexto de autenticación (usuario, token, login/logout)

      ui/                   # Componentes UI reutilizables

      external-link.tsx     # Componente para abrir enlaces externos de forma segura
      haptic-tab.tsx        # Componente de tab con feedback háptico
      new-task.tsx          # Componente para crear una nueva tarea
      task-item.tsx         # Componente que representa una tarea individual

  constants/                # Colores, temas, variables globales
  assets/                   # Imágenes y recursos estáticos
  scripts/                  # Scripts adicionales
  services/                 # Capa de servicios para comunicación con la API
    auth-service.ts         # Funciones de autenticación (login, register, manejo de errores)
    todo-service.ts         # Funciones CRUD para tareas (crear, listar, eliminar)

  utils/                    # Funciones auxiliares (por ejemplo, generación de IDs)

  env.example               # Ejemplo de variables de entorno requeridas por la app
  env.local                 # Variables de entorno locales (no versionadas)
  config.ts                 # Configuración global de la aplicación (API URL, constantes)
  package.json              # Dependencias y configuración
  app.json                  # Configuración de Expo
  tsconfig.json             # Configuración de TypeScript
  README.md                 # Este documento
```

---

## Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/malumirandac/LoginReact.git
cd LoginReact
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Iniciar la aplicación
```bash
npx expo start
```

Esto abrirá el panel de **Expo** en tu navegador.  

Desde ahí puedes:
- Presionar **w** para ejecutar la app en modo **web**.  
- Presionar **a** para abrirla en un emulador o dispositivo **Android** (si tienes Android Studio configurado).

## Otras dependencias:
```bash
npm install axios jose
```

- axios se utiliza para realizar solicitudes HTTP a la API y facilita el manejo de headers, respuestas y errores
- jose se utiliza para el manejo y la validación de JWT y permite decodificar y trabajar con tokens de forma segura en el frontend

---

## Emulación en Android

La aplicación fue probada en un **emulador Android** creado con **Android Studio**, y ejecutado directamente desde **Visual Studio Code** mediante la extensión **"Android iOS Emulator"**.  

Para iniciar el proyecto y abrirlo en el emulador se utiliza:

```bash
npx expo start
```

Luego, con el emulador ya encendido, se presiona la tecla:
```bash
a
```
Esto lanza la aplicación automáticamente dentro del entorno Android virtual.

---

## Detalles técnicos de la emulación

- **Plataforma utilizada:** Android Studio (Virtual Device Manager)  
- **Extensión en VSCode:** *Android iOS Emulator*  
- **Comando de ejecución:** `npx expo start` + `a`  
- **Framework:** Expo + React Native  
- **Resultado:** la aplicación abre correctamente en el dispositivo virtual Android, mostrando primero la pantalla de login.

---

## Credenciales de prueba

Usuario | Contraseña
---------|------------
hola@mail.com | 123456
chao@mail.com | 123456

Estas credenciales se crearon mediante Swagger

---


## Estilos

- Implementados con **StyleSheet**.  
- Borde de input personalizable (rosa/morado según estado).  
- Botones con color destacado `#ff00f2ff` y texto blanco.  
- Fuentes limpias y centrado de elementos.
- Estilos específicos para indicadores de tareas completadas y botones de acción.

---

## Video demostrativo

Puedes ver el funcionamiento de la aplicación en el siguiente video:

[Ver video de demostración](https://ipciisa-my.sharepoint.com/:v:/g/personal/francisca_miranda_cortes_estudiante_ipss_cl/IQAmT0WuDBP5RKSGkJZsYKz6AXrgcHTIfV2I4HiiZLml5qU?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=JgHW7o)



---

## Capturas de pantalla

| Pantalla        | Descripción                          |
|-----------------|--------------------------------------|
| ![Login Screen](assets/images/screens/pantalla_login.png) | Pantalla de Login |
| ![Tabs Screen](assets/images/screens/pantalla_inicio.png) | Pantalla de Inicio |
| ![Modal Screen](assets/images/screens/pantalla_todolist.png) | Pantalla de To Do List |
| ![Modal Screen](assets/images/screens/pantalla_crear_tarea.png) | Pantalla Crear Tarea |
| ![Modal Screen](assets/images/screens/pantalla_login_failed.png) | Pantalla Error Login |


---

## Scripts útiles

Comando | Descripción
---------|-------------
npm start | Inicia el servidor de desarrollo de Expo
npm run web | Ejecuta la app en el navegador
npm run android | Ejecuta la app en Android (requiere emulador)
git push | Sube los cambios a GitHub

---

## Autores

**Malú Miranda Cortés, Matías Marques Ferrada**  
Estudiante del **Instituto Profesional San Sebastián**  
Carrera: *Ingeniería en Informática*  
Asignatura: *Desarrollo de Aplicaciones Móviles*

---

## Licencia

Este proyecto se distribuye con fines educativos.  
El código puede ser reutilizado o modificado con fines académicos o de aprendizaje.