import React, { useEffect, useState } from 'react'
import '../styles/Result.css'

const PRUEBA_CONFIG = {
  'Lectura Crítica':       { icono: '📚', color: '#e74c3c', bg: 'rgba(231,76,60,.12)' },
  'Matemáticas':           { icono: '🔢', color: '#8e44ad', bg: 'rgba(142,68,173,.12)' },
  'Sociales y Ciudadanas': { icono: '🌍', color: '#16a085', bg: 'rgba(22,160,133,.12)' },
  'Ciencias Naturales':    { icono: '🔬', color: '#27ae60', bg: 'rgba(39,174,96,.12)' },
  'Inglés':                { icono: '🇬🇧', color: '#2980b9', bg: 'rgba(41,128,185,.12)' },
}

function getMedalla(pct) {
  if (pct >= 90) return { emoji: '🏆', titulo: '¡Excelente!',    bg: 'linear-gradient(135deg,#f59e0b,#d97706)', sub: 'Rendimiento sobresaliente' }
  if (pct >= 70) return { emoji: '🥇', titulo: '¡Muy bien!',     bg: 'linear-gradient(135deg,#22c55e,#16a34a)', sub: 'Buen desempeño' }
  if (pct >= 50) return { emoji: '🥈', titulo: 'Bien hecho',     bg: 'linear-gradient(135deg,#3b82f6,#2563eb)', sub: 'Sigue practicando' }
  return         { emoji: '📖', titulo: '¡Sigue adelante!', bg: 'linear-gradient(135deg,#64748b,#475569)', sub: 'Más práctica, mejores resultados' }
}

export default function Result({ estadisticas, onReintentar, onInicio }) {
  const [animated, setAnimated] = useState(false)
  const { total, correctas, incorrectas, porcentaje, respuestas } = estadisticas

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100)
    return () => clearTimeout(t)
  }, [])

  const medalla = getMedalla(porcentaje)

  // Stats por prueba
  const porPrueba = respuestas.reduce((acc, r) => {
    if (!acc[r.prueba]) acc[r.prueba] = { correctas: 0, total: 0 }
    acc[r.prueba].total++
    if (r.correcta) acc[r.prueba].correctas++
    return acc
  }, {})

  // SVG circle progress
  const radio = 58
  const circunferencia = 2 * Math.PI * radio
  const offset = animated ? circunferencia - (porcentaje / 100) * circunferencia : circunferencia
  const scoreColor = porcentaje >= 70 ? '#22c55e' : porcentaje >= 50 ? '#3b82f6' : '#f59e0b'

  return (
    <div className="result-page">
      <div className="container-simulacro">

        {/* Card principal */}
        <div className="result-hero-card animate-fade">
          <div className="result-hero-header" style={{ background: medalla.bg }}>
            <span className="result-emoji">{medalla.emoji}</span>
            <div className="result-titulo">{medalla.titulo}</div>
            <div className="result-subtitulo">{medalla.sub}</div>
          </div>

          {/* Círculo de puntuación */}
          <div className="score-circle-wrapper">
            <div className="score-circle">
              <svg viewBox="0 0 136 136">
                <circle className="score-bg-circle" cx="68" cy="68" r={radio} />
                <circle
                  className="score-progress-circle"
                  cx="68" cy="68" r={radio}
                  stroke={scoreColor}
                  strokeDasharray={circunferencia}
                  strokeDashoffset={offset}
                  style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }}
                />
              </svg>
              <div className="score-inner">
                <div className="score-number" style={{ color: scoreColor }}>{porcentaje}%</div>
                <div className="score-label">Puntaje</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#22c55e' }}>{correctas}</div>
              <div className="stat-label">✅ Correctas</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#ef4444' }}>{incorrectas}</div>
              <div className="stat-label">❌ Incorrectas</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ color: '#3b82f6' }}>{total}</div>
              <div className="stat-label">📋 Total</div>
            </div>
          </div>
        </div>

        {/* Dashboard por prueba */}
        <div className="result-dashboard animate-fade" style={{ animationDelay: '.1s' }}>
          <div className="dashboard-title">
            <span>📊</span> Desempeño por prueba
          </div>
          {Object.entries(porPrueba).map(([prueba, stats]) => {
            const cfg = PRUEBA_CONFIG[prueba] || { icono: '📌', color: '#64748b', bg: '#f1f5f9' }
            const pct = Math.round((stats.correctas / stats.total) * 100)
            return (
              <div className="prueba-stat-row" key={prueba}>
                <div className="prueba-stat-icon" style={{ background: cfg.bg }}>
                  {cfg.icono}
                </div>
                <div className="prueba-stat-info">
                  <div className="prueba-stat-name">
                    {prueba}
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '.75rem', marginLeft: '.4rem' }}>
                      ({stats.correctas}/{stats.total})
                    </span>
                  </div>
                  <div className="prueba-stat-bar-track">
                    <div
                      className="prueba-stat-bar-fill"
                      style={{
                        width: animated ? `${pct}%` : '0%',
                        background: cfg.color,
                      }}
                    />
                  </div>
                </div>
                <div className="prueba-stat-pct" style={{ color: cfg.color }}>{pct}%</div>
              </div>
            )
          })}
        </div>

        {/* Detalle respuestas */}
        <div className="result-detail animate-fade" style={{ animationDelay: '.2s' }}>
          <div className="dashboard-title" style={{ marginBottom: '.75rem' }}>
            <span>📋</span> Detalle de respuestas
          </div>
          {respuestas.map((r, i) => {
            const cfg = PRUEBA_CONFIG[r.prueba] || { icono: '📌', color: '#64748b', bg: '#f1f5f9' }
            return (
              <div className="detail-item" key={i}>
                <div
                  className="detail-num"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {i + 1}
                </div>
                <div className="detail-info">
                  <div className="detail-enunciado">{r.enunciado}</div>
                  <div className="detail-respuestas">
                    {r.seleccionada
                      ? `Tu respuesta: ${r.seleccionada} · Correcta: ${r.respuestaCorrecta}`
                      : `Sin responder · Correcta: ${r.respuestaCorrecta}`
                    }
                    {' · '}{r.prueba} · {r.dificultad}
                  </div>
                </div>
                <div className="detail-check">{r.correcta ? '✅' : '❌'}</div>
              </div>
            )
          })}
        </div>

        {/* Acciones */}
        <div className="result-actions animate-fade" style={{ animationDelay: '.3s' }}>
          <button className="btn-reintentar" onClick={onReintentar}>
            <span>🔄</span> Nuevo simulacro
          </button>
          <button className="btn-inicio" onClick={onInicio}>
            <span>🏠</span> Inicio
          </button>
        </div>

      </div>
    </div>
  )
}
