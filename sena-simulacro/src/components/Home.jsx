import React from 'react'
import '../styles/Home.css'

const pruebas = [
  { nombre: 'Lectura Crítica',    icono: '📚', color: '#e74c3c', preguntas: 3 },
  { nombre: 'Matemáticas',        icono: '🔢', color: '#8e44ad', preguntas: 3 },
  { nombre: 'Sociales y Ciudadanas', icono: '🌍', color: '#16a085', preguntas: 3 },
  { nombre: 'Ciencias Naturales', icono: '🔬', color: '#27ae60', preguntas: 3 },
  { nombre: 'Inglés',             icono: '🇬🇧', color: '#2980b9', preguntas: 4 },
]

const features = [
  { icono: '🎲', bg: 'rgba(245,166,35,.12)', color: '#d4891a',   titulo: 'Preguntas Aleatorias',   desc: 'Cada simulacro selecciona 10 preguntas al azar del banco de preguntas.' },
  { icono: '⏱️', bg: 'rgba(239,68,68,.1)',  color: '#dc2626',   titulo: 'Temporizador',            desc: '60 segundos por pregunta para simular las condiciones reales del ICFES.' },
  { icono: '📊', bg: 'rgba(59,130,246,.1)', color: '#2563eb',   titulo: 'Dashboard',              desc: 'Estadísticas detalladas por prueba y nivel de dificultad al finalizar.' },
  { icono: '💡', bg: 'rgba(34,197,94,.1)',  color: '#16a34a',   titulo: 'Retroalimentación',      desc: 'Explicación completa de cada respuesta correcta e incorrecta.' },
]

export default function Home({ onIniciar }) {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-pattern" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>🏆</span>
            Preparación Oficial Pruebas Saber 11°
          </div>
          <h1 className="hero-title">
            Domina tu <span>Saber 11°</span><br />con práctica real
          </h1>
          <p className="hero-desc">
            Simulacros interactivos con preguntas explicadas del ICFES. 
            Practica las 5 pruebas, analiza tus resultados y mejora tu puntaje.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">16</div>
              <div className="hero-stat-label">Preguntas Aleatorias</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">5</div>
              <div className="hero-stat-label">Pruebas</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">10</div>
              <div className="hero-stat-label">Por simulacro</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">60s</div>
              <div className="hero-stat-label">Por pregunta</div>
            </div>
          </div>

          <button className="btn-start-main" onClick={onIniciar}>
            <span>🚀</span>
            Comenzar Simulacro
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <div className="container-simulacro">
          <h2 className="section-title">¿Qué encontrarás?</h2>
          <p className="section-subtitle">Todo lo que necesitas para prepararte para el ICFES</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card animate-fade" key={i} style={{ animationDelay: `${i * .08}s` }}>
                <div className="feature-icon" style={{ background: f.bg }}>
                  {f.icono}
                </div>
                <div className="feature-title">{f.titulo}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pruebas */}
      <section className="home-pruebas">
        <div className="container-simulacro">
          <h2 className="section-title">Pruebas incluidas</h2>
          <p className="section-subtitle">Preguntas de dificultad baja, media y alta</p>
          <div className="pruebas-grid">
            {pruebas.map((p, i) => (
              <div
                className="prueba-chip animate-fade"
                key={i}
                style={{ borderLeftColor: p.color, animationDelay: `${i * .07}s` }}
              >
                <span>{p.icono}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '.85rem' }}>{p.nombre}</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                    {p.preguntas} preguntas
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
