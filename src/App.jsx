import React, { useState, useEffect, useRef } from 'react'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import BureaucraticMiner from './components/BureaucraticMiner'

const COLORS = {
  gold: '#ffd700',
  beige: '#f8e0b1',
  dark: '#1a171e',
  green: '#008435',
  red: '#db281c',
}

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'challenge', 'quiz', or 'podcast'
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

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

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
          <div className="max-w-6xl mx-auto">
            {/* Header - Always visible */}
            <header className="text-center mb-8 p-6 rounded-lg border-4 shadow-2xl transform hover:scale-105 transition-transform" style={{ 
              background: COLORS.beige, 
              borderColor: COLORS.gold,
              boxShadow: `0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,215,0,0.2)`
            }}>
              <h1 className="text-5xl md:text-6xl font-black mb-2" style={{ 
                color: COLORS.dark, 
                textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 8px rgba(0,0,0,0.3)`,
                transform: 'rotate(-1deg)'
              }}>
                🛡️ Nuit de l'Info 2025 🛡️
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mt-2" style={{ 
                color: COLORS.dark,
                textShadow: `2px 2px 0px ${COLORS.gold}`
              }}>
                Le Village Numérique Résistant
              </h2>
              <p className="text-lg md:text-xl mt-4 font-bold" style={{ 
                color: COLORS.dark,
                textShadow: `1px 1px 0px ${COLORS.gold}`
              }}>
                Astérix contre l'Empire numérique • David contre Goliath
              </p>
              
              {/* Navigation */}
              <nav className="mt-6 flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => handleNavigate('home')}
                  className={`px-5 py-2 rounded-xl font-bold transition-all transform hover:scale-110 hover:rotate-1 ${
                    currentPage === 'home' ? 'scale-110' : ''
                  }`}
                  style={{ 
                    background: currentPage === 'home' ? `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)` : COLORS.beige,
                    color: COLORS.dark,
                    border: `3px solid ${currentPage === 'home' ? COLORS.dark : COLORS.gold}`,
                    boxShadow: currentPage === 'home' ? `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(255,215,0,0.4)` : 'none'
                  }}
                >
                  🏠 Accueil
                </button>
                <button
                  onClick={() => handleNavigate('quiz')}
                  className={`px-5 py-2 rounded-xl font-bold transition-all transform hover:scale-110 hover:rotate-1 ${
                    currentPage === 'quiz' ? 'scale-110' : ''
                  }`}
                  style={{ 
                    background: currentPage === 'quiz' ? `linear-gradient(135deg, ${COLORS.green} 0%, #00a855 100%)` : COLORS.beige,
                    color: currentPage === 'quiz' ? COLORS.beige : COLORS.dark,
                    border: `3px solid ${currentPage === 'quiz' ? COLORS.dark : COLORS.green}`,
                    boxShadow: currentPage === 'quiz' ? `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(0,132,53,0.4)` : 'none'
                  }}
                >
                  🧩 Quiz
                </button>
                <button
                  onClick={() => handleNavigate('podcast')}
                  className={`px-5 py-2 rounded-xl font-bold transition-all transform hover:scale-110 hover:rotate-1 ${
                    currentPage === 'podcast' ? 'scale-110' : ''
                  }`}
                  style={{ 
                    background: currentPage === 'podcast' ? `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)` : COLORS.beige,
                    color: COLORS.dark,
                    border: `3px solid ${currentPage === 'podcast' ? COLORS.dark : COLORS.gold}`,
                    boxShadow: currentPage === 'podcast' ? `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(255,215,0,0.4)` : 'none'
                  }}
                >
                  🎙️ Podcast
                </button>
                <button
                  onClick={() => handleNavigate('challenge')}
                  className={`px-5 py-2 rounded-xl font-bold transition-all transform hover:scale-110 hover:rotate-1 ${
                    currentPage === 'challenge' ? 'scale-110' : ''
                  }`}
                  style={{ 
                    background: currentPage === 'challenge' ? `linear-gradient(135deg, ${COLORS.red} 0%, #b91c1c 100%)` : COLORS.beige,
                    color: currentPage === 'challenge' ? COLORS.beige : COLORS.dark,
                    border: `3px solid ${currentPage === 'challenge' ? COLORS.dark : COLORS.red}`,
                    boxShadow: currentPage === 'challenge' ? `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(219,40,28,0.4)` : 'none'
                  }}
                >
                  🎮 Défi Sopra Steria
                </button>
              </nav>
            </header>

            {/* Page Content */}
            {currentPage === 'home' && (
              <HomePage onNavigate={handleNavigate} />
            )}
            {currentPage === 'quiz' && (
              <div className="max-w-4xl mx-auto">
                <QuizPage onNavigate={handleNavigate} />
              </div>
            )}
            {currentPage === 'podcast' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300" style={{ 
                  background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
                  border: `8px solid ${COLORS.gold}`,
                  boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(255,215,0,0.2)`
                }}>
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-6 transform hover:scale-125 hover:rotate-12 transition-all">🎙️</div>
                    <h2 className="text-4xl font-black mb-4 transform hover:scale-110 transition-transform" style={{ 
                      color: COLORS.dark,
                      textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.4)`
                    }}>
                      Podcast & Vidéos
                    </h2>
                    <p className="text-lg mb-6" style={{ color: COLORS.dark }}>
                      Découvrez nos vidéos sur NIRD et la résistance numérique !
                    </p>
                  </div>
                  
                  {/* Video Player - Prêt pour la vidéo */}
                  <div className="rounded-2xl overflow-hidden border-4 shadow-xl" style={{ borderColor: COLORS.gold }}>
                    <video 
                      controls 
                      className="w-full"
                      style={{ 
                        display: 'block',
                        background: COLORS.dark
                      }}
                    >
                      <source src="/podcast-video.mp4" type="video/mp4" />
                      <source src="/podcast-video.webm" type="video/webm" />
                      <p style={{ color: COLORS.beige, padding: '2rem', textAlign: 'center' }}>
                        Votre navigateur ne supporte pas la lecture de vidéos HTML5.
                        <br />
                        Téléchargez la vidéo : <a href="/podcast-video.mp4" style={{ color: COLORS.gold }}>podcast-video.mp4</a>
                      </p>
                    </video>
                  </div>
                  
                  <p className="text-sm mt-4 text-center" style={{ color: COLORS.dark, opacity: 0.7 }}>
                    💡 Pour ajouter votre vidéo, placez-la dans le dossier <code style={{ background: COLORS.beige, padding: '2px 6px', borderRadius: '4px' }}>public/</code> sous le nom <code style={{ background: COLORS.beige, padding: '2px 6px', borderRadius: '4px' }}>podcast-video.mp4</code>
                  </p>
                </div>
              </div>
            )}
            {currentPage === 'challenge' && (
              <div className="max-w-4xl mx-auto">
                <BureaucraticMiner />
              </div>
            )}
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
