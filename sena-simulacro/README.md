# 🎓 Simulacro Saber 11° — SENA

Aplicación web interactiva para preparación de las Pruebas Saber 11° (ICFES).

## 🚀 Instalación y ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 3. Abrir en el navegador
```
http://localhost:5173
```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx        ← Barra de navegación profesional
│   ├── Home.jsx          ← Página de inicio con hero y features
│   ├── Quiz.jsx          ← Lógica del simulacro (timer, progreso, puntaje)
│   ├── questionCard.jsx  ← Tarjeta de pregunta con feedback
│   ├── Result.jsx        ← Resultados con dashboard de estadísticas
│   └── Simulacro.jsx     ← Re-export de Quiz (compatibilidad)
├── styles/
│   ├── Global.css        ← Variables CSS y estilos base
│   ├── index.css         ← Utilidades globales
│   ├── Navbar.css
│   ├── Home.css
│   ├── Quiz.css
│   ├── questionCard.css
│   └── Result.css
├── data/
│   └── questions.js      ← Banco de 16 preguntas explicadas
├── App.jsx               ← Enrutador principal
└── main.jsx              ← Punto de entrada
```

## ✨ Características

- 🎲 **10 preguntas aleatorias** por simulacro del banco de 16
- ⏱️ **Temporizador de 60s** por pregunta
- 📊 **Dashboard de estadísticas** por prueba al finalizar
- 💡 **Retroalimentación inmediata** con explicación completa
- 📱 **Diseño responsive** para móvil y escritorio
- 🎨 **Bootstrap 5** + CSS personalizado

## 📚 Pruebas incluidas

| Prueba | Preguntas | Dificultades |
|--------|-----------|-------------|
| Lectura Crítica | 3 | Baja, Media, Alta |
| Matemáticas | 3 | Media, Media, Alta |
| Sociales y Ciudadanas | 3 | Alta, Media, Media |
| Ciencias Naturales | 3 | Media, Alta, Baja |
| Inglés | 4 | Baja, Baja, Media, Media |

## ➕ Agregar más preguntas

Edita `src/data/questions.js` siguiendo la estructura:

```js
{
  id: 17,                          // Único
  prueba: "Lectura Crítica",       // Nombre de la prueba
  dificultad: "Media",             // "Baja" | "Media" | "Alta"
  color: "#e74c3c",                // Color de la prueba
  icono: "📚",                     // Emoji
  contexto: "Texto de contexto...",
  fuente: "Fuente bibliográfica",  // Opcional
  enunciado: "¿Pregunta?",
  opciones: [
    { letra: "A", texto: "Opción A" },
    { letra: "B", texto: "Opción B" },
    { letra: "C", texto: "Opción C" },
    { letra: "D", texto: "Opción D" },
  ],
  respuestaCorrecta: "B",
  explicacion: "Explicación de por qué B es correcta...",
  explicacionOpciones: {
    A: "Por qué A es incorrecta...",
    C: "Por qué C es incorrecta...",
    D: "Por qué D es incorrecta...",
  },
  evalua: "¿Qué habilidad evalúa esta pregunta?",
}
```
