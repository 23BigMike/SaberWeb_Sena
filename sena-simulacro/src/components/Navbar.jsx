import React from 'react'
import '../styles/Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar-simulacro">
      <div className="navbar-brand-wrapper">
        <div className="navbar-logo">🎓</div>
        <div>
          <div className="navbar-title">Simulacro Saber 11°</div>
          <div className="navbar-subtitle">ICFES · Preparación Oficial</div>
        </div>
      </div>

      <div className="navbar-badges">
        <div className="navbar-badge hide-mobile">
          <span>📚</span> 4 Pruebas
        </div>
        <div className="navbar-badge hide-mobile">
          <span>❓</span> 16 Preguntas
        </div>
        <div className="navbar-badge navbar-icfes-badge">
          SENA
        </div>
      </div>
    </nav>
  )
}
