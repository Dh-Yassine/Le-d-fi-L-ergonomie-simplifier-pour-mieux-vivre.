import React, { useEffect, useRef } from 'react'
import BureaucraticMiner from './components/BureaucraticMiner'

const COLORS = {
  gold: '#ffd700',
  beige: '#f8e0b1',
  dark: '#1a171e',
  green: '#008435',
  red: '#db281c',
}

function App() {
  const worldBgRef = useRef(null)

  useEffect(() => {
    // Load world background image
    if (worldBgRef.current) {
      const img = new Image()
      img.src = '/world.jpg'
      img.onload = () => {
        worldBgRef.current.style.backgroundImage = `url(${img.src})`
      }
    }
  }, [])

  try {
    return (
    <div 
      ref={worldBgRef}
      className="min-h-screen relative"
      style={{ 
        backgroundImage: 'url(/world.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0" style={{ background: 'rgba(248, 224, 177, 0.3)' }}></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8 p-6 rounded-lg border-4 shadow-2xl transform hover:scale-105 transition-transform" style={{ 
            background: COLORS.beige, 
            borderColor: COLORS.gold,
            boxShadow: `0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,215,0,0.2)`
          }}>
            <h1 className="text-5xl font-black mb-2" style={{ 
              color: COLORS.dark, 
              textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 8px rgba(0,0,0,0.3)`,
              transform: 'rotate(-1deg)'
            }}>
              🛡️ Nuit de l'Info 2025 🛡️
            </h1>
            <h2 className="text-2xl font-bold mt-2" style={{ 
              color: COLORS.dark,
              textShadow: `2px 2px 0px ${COLORS.gold}`
            }}>
              Défi Sopra Steria - L'Ergonomie
            </h2>
            <p className="text-lg mt-4 font-bold" style={{ 
              color: COLORS.dark,
              textShadow: `1px 1px 0px ${COLORS.gold}`
            }}>
              Le Village Numérique Résistant
            </p>
          </header>

          <BureaucraticMiner />
        </div>
      </div>
    </div>
    )
  } catch (error) {
    console.error('Error in App:', error)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.beige }}>
        <div className="text-center p-8 rounded-lg border-4" style={{ borderColor: COLORS.red, background: COLORS.beige }}>
          <h1 className="text-2xl font-bold mb-4" style={{ color: COLORS.red }}>Erreur de chargement</h1>
          <p style={{ color: COLORS.dark }}>{error.message}</p>
        </div>
      </div>
    )
  }
}

export default App

