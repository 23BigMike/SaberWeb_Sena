import React, { useState, useEffect, useCallback } from 'react'
import QuestionCard from './questionCard.jsx'
import questions from '../data/questions.js'
import '../styles/Quiz.css'

const TIEMPO_POR_PREGUNTA = 60
const PREGUNTAS_POR_SIMULACRO = 10

function mezclar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function seleccionarPreguntas() {
  const mezcladas = mezclar(questions)
  return mezcladas.slice(0, Math.min(PREGUNTAS_POR_SIMULACRO, mezcladas.length))
}

export default function Quiz({ onFinalizar, onSalir }) {
  const [preguntas] = useState(() => seleccionarPreguntas())
  const [indice, setIndice]         = useState(0)
  const [correctas, setCorrectas]   = useState(0)
  const [tiempo, setTiempo]         = useState(TIEMPO_POR_PREGUNTA)
  const [respuestas, setRespuestas] = useState([]) // {preguntaId, correcta, seleccionada}
  const [tiempoAgotado, setTiempoAgotado] = useState(false)

  const preguntaActual = preguntas[indice]
  const progreso = ((indice) / preguntas.length) * 100

  // Timer
  useEffect(() => {
    setTiempo(TIEMPO_POR_PREGUNTA)
    setTiempoAgotado(false)
  }, [indice])

  useEffect(() => {
    if (tiempo <= 0) {
      setTiempoAgotado(true)
      return
    }
    const id = setTimeout(() => setTiempo(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [tiempo])

  // Cuando el tiempo se agota, auto-pasar como incorrecta
  useEffect(() => {
    if (tiempoAgotado) {
      const timeout = setTimeout(() => {
        handleSiguiente(false, null)
      }, 1800)
      return () => clearTimeout(timeout)
    }
  }, [tiempoAgotado])

  const handleSiguiente = useCallback((esCorrecta, seleccionada) => {
    const nuevaRespuesta = {
      preguntaId: preguntaActual.id,
      enunciado: preguntaActual.enunciado,
      prueba: preguntaActual.prueba,
      dificultad: preguntaActual.dificultad,
      correcta: esCorrecta,
      seleccionada,
      respuestaCorrecta: preguntaActual.respuestaCorrecta,
    }
    const nuevasRespuestas = [...respuestas, nuevaRespuesta]

    if (esCorrecta) setCorrectas(c => c + 1)

    if (indice + 1 >= preguntas.length) {
      const totalCorrectas = nuevasRespuestas.filter(r => r.correcta).length
      onFinalizar({
        total: preguntas.length,
        correctas: totalCorrectas,
        incorrectas: preguntas.length - totalCorrectas,
        respuestas: nuevasRespuestas,
        preguntas,
        porcentaje: Math.round((totalCorrectas / preguntas.length) * 100),
      })
    } else {
      setRespuestas(nuevasRespuestas)
      setIndice(i => i + 1)
    }
  }, [indice, preguntas, preguntaActual, respuestas, onFinalizar])

  const timerClass = tiempo <= 10 ? 'danger' : tiempo <= 20 ? 'warning' : ''

  return (
    <div className="quiz-page">
      <div className="container-simulacro">
        {/* Header con progreso y timer */}
        <div className="quiz-header">
          <div className="quiz-pregunta-num">
            {indice + 1} / {preguntas.length}
          </div>

          <div className="quiz-progress-bar">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progreso}%` }} />
            </div>
          </div>

          <div className={`quiz-timer ${timerClass}`}>
            <span className="timer-icon">⏱</span>
            {String(tiempo).padStart(2, '0')}s
          </div>

          <div className="quiz-score-live">
            ✅ {correctas}
          </div>

          <button className="btn-salir" onClick={onSalir}>
            ✕ Salir
          </button>
        </div>

        {/* Aviso tiempo agotado */}
        {tiempoAgotado && (
          <div
            className="animate-fade"
            style={{
              background: 'rgba(239,68,68,.1)',
              border: '1.5px solid rgba(239,68,68,.3)',
              borderRadius: 'var(--radius-md)',
              padding: '.75rem 1.1rem',
              marginBottom: '1rem',
              color: '#dc2626',
              fontWeight: 700,
              fontSize: '.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
            }}
          >
            ⏰ ¡Tiempo agotado! Pasando a la siguiente pregunta...
          </div>
        )}

        {/* Card de pregunta */}
        <QuestionCard
          key={preguntaActual.id + '-' + indice}
          pregunta={preguntaActual}
          numeroPregunta={indice + 1}
          totalPreguntas={preguntas.length}
          onSiguiente={handleSiguiente}
          tiempoAgotado={tiempoAgotado}
        />
      </div>
    </div>
  )
}
