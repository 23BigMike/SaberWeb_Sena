import React, { useState } from 'react'
import '../styles/questionCard.css'

const DIFICULTAD_CONFIG = {
  Alta:  { color: '#ef4444', bg: 'rgba(239,68,68,.1)',   label: '🔴 Alta' },
  Media: { color: '#f59e0b', bg: 'rgba(245,158,11,.1)', label: '🟡 Media' },
  Baja:  { color: '#22c55e', bg: 'rgba(34,197,94,.1)',   label: '🟢 Baja' },
}

export default function QuestionCard({ pregunta, numeroPregunta, totalPreguntas, onSiguiente }) {
  const [seleccionada, setSeleccionada] = useState(null)
  const [respondida, setRespondida] = useState(false)

  const dif = DIFICULTAD_CONFIG[pregunta.dificultad] || DIFICULTAD_CONFIG.Media
  const esCorrecta = seleccionada === pregunta.respuestaCorrecta

  const handleOpcion = (letra) => {
    if (respondida) return
    setSeleccionada(letra)
    setRespondida(true)
  }

  const getClaseOpcion = (letra) => {
    if (!respondida) return seleccionada === letra ? 'selected' : ''
    if (letra === pregunta.respuestaCorrecta) return 'correcto respuesta-correcta-highlight'
    if (letra === seleccionada && letra !== pregunta.respuestaCorrecta) return 'incorrecto'
    return ''
  }

  const getIconoOpcion = (letra) => {
    if (!respondida) return null
    if (letra === pregunta.respuestaCorrecta) return <span className="check-icon">✅</span>
    if (letra === seleccionada) return <span className="check-icon">❌</span>
    return null
  }

  return (
    <div className="question-card">
      {/* Badges */}
      <div style={{ padding: '1rem 1.5rem .3rem', display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
        <span
          className="prueba-badge"
          style={{ background: pregunta.color }}
        >
          {pregunta.icono} {pregunta.prueba}
        </span>
        <span
          className="dificultad-badge"
          style={{ background: dif.bg, color: dif.color, border: `1px solid ${dif.color}40` }}
        >
          {dif.label}
        </span>
      </div>

      {/* Contexto */}
      {pregunta.contexto && (
        <div className="context-section">
          <div className="context-header">
            <span>📄</span>
            <span>Texto de contexto</span>
            <div className="context-divider" />
          </div>
          <div className="context-text">{pregunta.contexto}</div>
          {pregunta.fuente && (
            <div className="context-fuente">
              📌 {pregunta.fuente}
            </div>
          )}
        </div>
      )}

      {/* Enunciado */}
      <div className="enunciado-section">
        <div className="enunciado-label">
          <span>❓</span> Pregunta {numeroPregunta} de {totalPreguntas}
        </div>
        <div className="enunciado-text">{pregunta.enunciado}</div>
      </div>

      {/* Opciones */}
      <div className="opciones-section">
        {pregunta.opciones.map((op) => (
          <button
            key={op.letra}
            className={`opcion-btn ${getClaseOpcion(op.letra)}`}
            onClick={() => handleOpcion(op.letra)}
            disabled={respondida}
          >
            <div className="opcion-letra">{op.letra}</div>
            <div className="opcion-texto">{op.texto}</div>
            {getIconoOpcion(op.letra)}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {respondida && (
        <>
          <div className={`feedback-panel ${esCorrecta ? 'correcto' : 'incorrecto'}`}>
            <div className={`feedback-header ${esCorrecta ? 'correcto' : 'incorrecto'}`}>
              {esCorrecta ? '✅ ¡Respuesta correcta!' : `❌ Respuesta incorrecta — La correcta era: ${pregunta.respuestaCorrecta}`}
            </div>
            <div className="feedback-explicacion">
              {esCorrecta
                ? pregunta.explicacion
                : pregunta.explicacionOpciones?.[seleccionada]
                  ? `${pregunta.explicacionOpciones[seleccionada]} \n\n✅ ${pregunta.explicacion}`
                  : pregunta.explicacion
              }
            </div>
            {pregunta.evalua && (
              <div className="feedback-evalua">
                <span>🎯</span>
                <span><strong>¿Qué evalúa?</strong> {pregunta.evalua}</span>
              </div>
            )}
          </div>

          <button className="btn-siguiente" onClick={() => onSiguiente(esCorrecta, seleccionada)}>
            {numeroPregunta < totalPreguntas ? (
              <><span>Siguiente pregunta</span><span>→</span></>
            ) : (
              <><span>🏁</span><span>Ver resultados</span></>
            )}
          </button>
        </>
      )}
    </div>
  )
}
