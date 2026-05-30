import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx'
import Result from './components/Result.jsx'
import './App.css'

export default function App() {
  const [pagina, setPagina] = useState('home') // 'home' | 'quiz' | 'result'
  const [estadisticas, setEstadisticas] = useState(null)

  const iniciarSimulacro = () => setPagina('quiz')
  const finalizarSimulacro = (stats) => {
    setEstadisticas(stats)
    setPagina('result')
  }
  const volverAInicio = () => {
    setEstadisticas(null)
    setPagina('home')
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="app-main">
        {pagina === 'home' && <Home onIniciar={iniciarSimulacro} />}
        {pagina === 'quiz' && <Quiz onFinalizar={finalizarSimulacro} onSalir={volverAInicio} />}
        {pagina === 'result' && <Result estadisticas={estadisticas} onReintentar={iniciarSimulacro} onInicio={volverAInicio} />}
      </main>
    </div>
  )
}
