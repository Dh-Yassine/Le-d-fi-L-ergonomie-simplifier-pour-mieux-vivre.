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
  // Initialize from hash or default to 'home'
  const getPageFromHash = () => {
    const hash = window.location.hash.slice(1) // Remove the '#'
    return ['home', 'challenge', 'quiz', 'podcast'].includes(hash) ? hash : 'home'
  }
  
  const [currentPage, setCurrentPage] = useState(getPageFromHash())
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

  // Handle hash changes (for direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash()
      setCurrentPage(page)
      window.scrollTo(0, 0)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (page) => {
    setCurrentPage(page)
    window.location.hash = page // Update URL hash for direct linking
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
              <div className="inline-block px-4 py-2 rounded-xl mb-2 transform hover:scale-110 transition-transform" style={{
                background: `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)`,
                border: `3px solid ${COLORS.dark}`,
                boxShadow: `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(255,215,0,0.4)`
              }}>
                <span className="text-xl md:text-2xl font-black" style={{ 
                  color: COLORS.dark,
                  textShadow: `2px 2px 0px rgba(255,255,255,0.3)`
                }}>
                  ⚔️ Équipe Assatir ⚔️
                </span>
              </div>
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
                  🎮 Défi simplifier pour mieux vivre
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
              <div className="max-w-6xl mx-auto space-y-8">
                {/* Podcast Section */}
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
                      Les Femmes dans le Numérique
                    </h2>
                    <p className="text-lg mb-6" style={{ color: COLORS.dark }}>
                      D'Ada Lovelace à Margaret Hamilton, découvrez comment les femmes ont façonné l'informatique et continuent d'innover dans le numérique. Un podcast de 5 minutes pour célébrer leur contribution essentielle et promouvoir la mixité dans les métiers du numérique.
                    </p>
                  </div>

                  {/* PDF Document Section */}
                  <div className="mb-6 p-6 rounded-2xl border-4 shadow-xl transform hover:scale-[1.02] transition-all" style={{ 
                    borderColor: COLORS.gold,
                    background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`,
                    boxShadow: `0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,215,0,0.1)`
                  }}>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="text-5xl">📄</div>
                      <div className="flex-1 min-w-[200px]">
                        <h3 className="text-2xl font-black mb-2" style={{ 
                          color: COLORS.dark,
                          textShadow: `2px 2px 0px ${COLORS.gold}`
                        }}>
                          Document de Présentation
                        </h3>
                        <p className="text-sm mb-4" style={{ color: COLORS.dark, opacity: 0.8 }}>
                          Téléchargez le document décrivant notre podcast sur les femmes dans le numérique
                        </p>
                        <a
                          href="/Les femmes dans le numérique.pdf"
                          download="Les femmes dans le numérique.pdf"
                          className="inline-block px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-110 hover:rotate-1"
                          style={{
                            background: `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)`,
                            color: COLORS.dark,
                            border: `3px solid ${COLORS.dark}`,
                            boxShadow: `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(255,215,0,0.4)`,
                            textDecoration: 'none'
                          }}
                        >
                          📥 Télécharger le PDF
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Player - Google Drive */}
                  <div className="rounded-2xl overflow-hidden border-4 shadow-xl" style={{ borderColor: COLORS.gold }}>
                    <div className="relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                      <iframe
                        src="https://drive.google.com/file/d/1hMLfZSxKOKYMgIZeFqgb5haiONKsQNDr/preview"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="autoplay"
                        style={{ border: 'none' }}
                        title="Podcast - Les femmes dans le numérique"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300" style={{ 
                  background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
                  border: `8px solid ${COLORS.green}`,
                  boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(0,132,53,0.3), 0 0 30px rgba(0,132,53,0.2)`
                }}>
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4 transform hover:scale-125 hover:rotate-12 transition-all">⚔️</div>
                    <h2 className="text-4xl font-black mb-4 transform hover:scale-110 transition-transform" style={{ 
                      color: COLORS.dark,
                      textShadow: `4px 4px 0px ${COLORS.green}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(0,132,53,0.4)`
                    }}>
                      Notre Équipe Assatir
                    </h2>
                    <p className="text-lg" style={{ color: COLORS.dark }}>
                      Les résistants du village numérique
                    </p>
                  </div>

                  {/* Team Members Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Yassine Dhouibi', email: 'yassinedhouibi@gmail.com', photo: 'yassine.jpg' },
                      { name: 'Ranim Bouraoui', email: 'ranimbouraoui3@gmail.com', photo: 'ranim.jpg' },
                      { name: 'Chakroun Oussama', email: 'chakroun.oussama003@gmail.com', photo: 'oussama.jpg' },
                      { name: 'Fares Aloulou', email: 'faresaloulou01@gmail.com', photo: 'fares.jpg' },
                      { name: 'Braiek Rayen', email: 'braiekrayen5@gmail.com', photo: 'rayen.jpg' },
                      { name: 'Mariem Boughizene', email: 'mariemboughizene99@gmail.com', photo: 'mariem.jpg' },
                      { name: 'Mohsen Allani', email: 'mohsenallani2004@gmail.com', photo: 'Mohsen.jpg' },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-2xl p-6 transform hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer"
                        style={{
                          border: `4px solid ${COLORS.gold}`,
                          boxShadow: `0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,215,0,0.1)`,
                          background: `linear-gradient(135deg, ${COLORS.beige} 0%, #ffffff 100%)`
                        }}
                      >
                        <div className="text-center">
                          {/* Photo */}
                          <div className="mb-4 flex justify-center">
                            <div
                              className="rounded-full overflow-hidden border-4 transform hover:scale-110 transition-transform"
                              style={{
                                borderColor: COLORS.gold,
                                width: '120px',
                                height: '120px',
                                boxShadow: `0 4px 8px rgba(0,0,0,0.3), 0 0 15px rgba(255,215,0,0.3)`
                              }}
                            >
                              <img
                                src={`/${member.photo}`}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none'
                                  e.target.parentElement.innerHTML = `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${COLORS.gold}, ${COLORS.beige}); display: flex; align-items: center; justify-content: center; font-size: 48px;">👤</div>`
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Name */}
                          <h3 className="text-xl font-black mb-2" style={{ 
                            color: COLORS.dark,
                            textShadow: `2px 2px 0px ${COLORS.gold}`
                          }}>
                            {member.name}
                          </h3>
                          
                          {/* Formation */}
                          <p className="text-sm font-bold mb-2" style={{ 
                            color: COLORS.dark,
                            textShadow: `1px 1px 0px rgba(255,255,255,0.5)`
                          }}>
                            🎓 Étudiant cycle ingénieur génie logiciel
                          </p>
                          
                          {/* Email */}
                          <a
                            href={`mailto:${member.email}`}
                            className="text-sm font-bold break-all hover:underline transition-all"
                            style={{ 
                              color: COLORS.green,
                              textShadow: `1px 1px 0px rgba(255,255,255,0.5)`
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            📧 {member.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Team Info */}
                  <div className="mt-8 p-6 rounded-2xl text-center" style={{
                    background: `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)`,
                    border: `4px solid ${COLORS.dark}`,
                    boxShadow: `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(255,215,0,0.4)`
                  }}>
                    <p className="text-lg font-black" style={{ color: COLORS.dark, textShadow: `2px 2px 0px rgba(255,255,255,0.3)` }}>
                      🛡️ Responsable de l'équipe : Ranim Bouraoui
                      <br />
                      <span className="text-base font-bold">ranimbouraoui3@gmail.com</span>
                    </p>
                  </div>
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
