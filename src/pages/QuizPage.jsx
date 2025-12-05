import React, { useState } from 'react'
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowLeft } from 'lucide-react'

const COLORS = {
  gold: '#ffd700',
  beige: '#f8e0b1',
  dark: '#1a171e',
  green: '#008435',
  red: '#db281c',
}

const QuizPage = ({ onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      question: "Que signifie NIRD dans le contexte de cet événement ?",
      options: [
        "A. Institut National de Recherche et Développement",
        "B. Nuit de l'Innovation, de la Recherche et du Développement",
        "C. Réseau pour la Conception Intelligente des Ressources",
        "D. Nouvelle Journée de la Révolution Internet"
      ],
      correct: 1, // B
    },
    {
      question: "Quel est l'objectif principal de NIRD ?",
      options: [
        "A. Promouvoir des tournois de jeux",
        "B. Encourager l'innovation, la créativité et la résolution de problèmes",
        "C. Célébrer les réalisations historiques",
        "D. Former les gens aux emplois en cybersécurité"
      ],
      correct: 1, // B
    },
    {
      question: "Quel type de projets sont généralement présentés à NIRD ?",
      options: [
        "A. Des recettes de cuisine",
        "B. Des dessins artistiques",
        "C. Des prototypes techniques, créatifs et innovants",
        "D. Des campagnes politiques"
      ],
      correct: 2, // C
    },
    {
      question: "Quelle compétence est LA PLUS importante lors d'un défi NIRD ?",
      options: [
        "A. Copier du code depuis internet",
        "B. La chance pure",
        "C. La pensée critique et la créativité",
        "D. Mémoriser les anciennes technologies"
      ],
      correct: 2, // C
    },
    {
      question: "Qu'est-ce qui rend les défis NIRD uniques ?",
      options: [
        "A. Ils sont réservés aux ingénieurs professionnels",
        "B. Ils mélangent créativité, technologie et thèmes amusants",
        "C. Ils ne nécessitent aucune explication ou présentation",
        "D. Ils concernent uniquement la programmation compétitive"
      ],
      correct: 1, // B
    },
    {
      question: "Que recherchent généralement les juges dans NIRD ?",
      options: [
        "A. Le code le plus long",
        "B. L'interface la plus confuse",
        "C. L'originalité, la clarté et une justification solide",
        "D. L'utilisation du plus grand nombre de bibliothèques"
      ],
      correct: 2, // C
    },
    {
      question: "Lequel de ces projets pourrait être un projet NIRD valide ?",
      options: [
        "A. Une interface de formulaire étrange mais ergonomique",
        "B. Une calculatrice copiée-collée depuis Google",
        "C. Un formulaire sans fonctionnalité",
        "D. Un site web vide"
      ],
      correct: 0, // A
    },
    {
      question: "NIRD encourage les participants à…",
      options: [
        "A. Briser les conventions quand c'est justifié",
        "B. Toujours suivre les règles UX classiques",
        "C. Éviter d'essayer de nouvelles idées",
        "D. N'utiliser qu'un seul langage de programmation"
      ],
      correct: 0, // A
    },
    {
      question: "Qu'est-ce qui est LE PLUS important lors de la présentation d'une soumission NIRD ?",
      options: [
        "A. Faire en sorte que ça ressemble à un jeu AAA",
        "B. Justifier clairement vos décisions de conception",
        "C. Ajouter autant d'animations que possible",
        "D. Rédiger une documentation extrêmement longue"
      ],
      correct: 1, // B
    },
    {
      question: "Quel comportement est encouragé lors des événements NIRD ?",
      options: [
        "A. Créativité, expérimentation, travail d'équipe",
        "B. Travailler seul et cacher son écran",
        "C. Copier les projets des concurrents",
        "D. Refuser les retours"
      ],
      correct: 0, // A
    },
  ]

  const handleAnswerSelect = (answerIndex) => {
    if (showResults) return
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        correct++
      }
    })
    setScore(correct)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const getOptionStyle = (optionIndex) => {
    const isSelected = selectedAnswers[currentQuestion] === optionIndex
    const isCorrect = optionIndex === questions[currentQuestion].correct
    
    if (showResults && currentQuestion < questions.length) {
      if (isCorrect) {
        return {
          background: `linear-gradient(135deg, ${COLORS.green} 0%, #00a855 100%)`,
          borderColor: COLORS.dark,
          color: COLORS.beige,
          boxShadow: `0 8px 16px rgba(0,132,53,0.4), inset 0 2px 4px rgba(255,255,255,0.3), 0 0 20px ${COLORS.green}80`,
          transform: 'scale(1.05)',
        }
      } else if (isSelected && !isCorrect) {
        return {
          background: `linear-gradient(135deg, ${COLORS.red} 0%, #b91c1c 100%)`,
          borderColor: COLORS.dark,
          color: COLORS.beige,
          boxShadow: `0 8px 16px rgba(219,40,28,0.4), inset 0 2px 4px rgba(255,255,255,0.3), 0 0 20px ${COLORS.red}80`,
        }
      }
    }
    
    if (isSelected) {
      return {
        background: `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)`,
        borderColor: COLORS.dark,
        color: COLORS.dark,
        boxShadow: `0 8px 16px rgba(255,215,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3), 0 0 20px ${COLORS.gold}80`,
        transform: 'scale(1.05)',
      }
    }
    
    return {
      background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`,
      borderColor: COLORS.gold,
      color: COLORS.dark,
    }
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300" style={{ 
          background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
          border: `8px solid ${COLORS.gold}`,
          boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(255,215,0,0.2)`
        }}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 transform hover:scale-125 hover:rotate-12 transition-all" style={{
              background: `radial-gradient(circle, ${COLORS.gold} 0%, #ffed4e 100%)`,
              boxShadow: `0 12px 24px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,255,255,0.3), 0 0 30px ${COLORS.gold}80`
            }}>
              <Trophy size={64} style={{ color: COLORS.dark, filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.3))' }} />
            </div>
            
            <h2 className="text-5xl font-black mb-4 transform hover:scale-110 transition-transform" style={{ 
              color: COLORS.dark,
              textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.4)`
            }}>
              🎉 Résultats du Quiz 🎉
            </h2>
            
            {percentage === 100 && (
              <p className="text-2xl font-bold mb-4 transform hover:scale-110 transition-transform" style={{ 
                color: COLORS.green,
                textShadow: `3px 3px 0px ${COLORS.dark}, 0 0 15px ${COLORS.green}80`
              }}>
                🏆 Parfait ! Vous êtes un vrai résistant numérique ! 🏆
              </p>
            )}
            {percentage >= 70 && percentage < 100 && (
              <p className="text-2xl font-bold mb-4 transform hover:scale-110 transition-transform" style={{ 
                color: COLORS.gold,
                textShadow: `3px 3px 0px ${COLORS.dark}, 0 0 15px ${COLORS.gold}80`
              }}>
                ⚔️ Excellent ! Vous maîtrisez bien NIRD ! ⚔️
              </p>
            )}
            {percentage >= 50 && percentage < 70 && (
              <p className="text-2xl font-bold mb-4 transform hover:scale-110 transition-transform" style={{ 
                color: COLORS.gold,
                textShadow: `3px 3px 0px ${COLORS.dark}, 0 0 15px ${COLORS.gold}80`
              }}>
                🛡️ Bien joué ! Continuez à apprendre ! 🛡️
              </p>
            )}
            {percentage < 50 && (
              <p className="text-2xl font-bold mb-4 transform hover:scale-110 transition-transform" style={{ 
                color: COLORS.red,
                textShadow: `3px 3px 0px ${COLORS.dark}, 0 0 15px ${COLORS.red}80`
              }}>
                💪 Ne vous découragez pas ! Relisez les informations et réessayez ! 💪
              </p>
            )}
            
            <div className="text-6xl font-black mb-4" style={{ 
              color: percentage >= 70 ? COLORS.green : percentage >= 50 ? COLORS.gold : COLORS.red,
              textShadow: `4px 4px 0px ${COLORS.dark}, 0 0 20px ${percentage >= 70 ? COLORS.green : percentage >= 50 ? COLORS.gold : COLORS.red}80`
            }}>
              {score} / {questions.length}
            </div>
            
            <div className="text-3xl font-bold mb-6" style={{ color: COLORS.dark }}>
              {percentage.toFixed(0)}% de bonnes réponses
            </div>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleRestart}
                className="px-8 py-4 rounded-2xl font-black text-xl transition-all transform hover:scale-125 hover:rotate-3 inline-flex items-center gap-3"
                style={{ 
                  background: `radial-gradient(circle, ${COLORS.gold} 0%, #ffed4e 100%)`,
                  color: COLORS.dark,
                  border: `5px solid ${COLORS.dark}`,
                  boxShadow: `6px 6px 0px ${COLORS.dark}, 0 0 20px rgba(255,215,0,0.5)`,
                  textShadow: `2px 2px 0px rgba(0,0,0,0.2)`
                }}
              >
                <RotateCcw size={24} />
                Recommencer
              </button>
              
              <button
                onClick={() => onNavigate('home')}
                className="px-8 py-4 rounded-2xl font-black text-xl transition-all transform hover:scale-125 hover:rotate-3 inline-flex items-center gap-3"
                style={{ 
                  background: `radial-gradient(circle, ${COLORS.green} 0%, #00a855 100%)`,
                  color: COLORS.beige,
                  border: `5px solid ${COLORS.dark}`,
                  boxShadow: `6px 6px 0px ${COLORS.dark}, 0 0 20px rgba(0,132,53,0.5)`,
                  textShadow: `2px 2px 0px rgba(0,0,0,0.2)`
                }}
              >
                <ArrowLeft size={24} />
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border-4" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`,
        borderColor: COLORS.gold,
        boxShadow: `0 10px 20px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,215,0,0.2)`
      }}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg" style={{ color: COLORS.dark }}>
            Question {currentQuestion + 1} / {questions.length}
          </span>
          <span className="font-bold text-lg" style={{ color: COLORS.dark }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full rounded-full h-6 border-4" style={{ 
          background: COLORS.beige, 
          borderColor: COLORS.gold,
          boxShadow: `inset 0 2px 4px rgba(0,0,0,0.1)`
        }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${COLORS.gold} 0%, ${COLORS.green} 100%)`,
              boxShadow: `0 2px 8px rgba(255,215,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)`
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
        border: `8px solid ${COLORS.gold}`,
        boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(255,215,0,0.2)`
      }}>
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-center transform hover:scale-110 transition-transform" style={{ 
          color: COLORS.dark,
          textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.4)`
        }}>
          {currentQ.question}
        </h2>

        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className="w-full p-5 rounded-2xl border-4 text-left font-bold text-lg transition-all transform hover:scale-105 hover:rotate-1 cursor-pointer"
                style={getOptionStyle(index)}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isSelected && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                      background: COLORS.dark,
                      boxShadow: `0 4px 8px rgba(0,0,0,0.3)`
                    }}>
                      <CheckCircle2 size={20} style={{ color: COLORS.gold }} />
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl font-black text-lg transition-all transform hover:scale-110 hover:rotate-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0"
            style={{ 
              background: currentQuestion === 0 ? COLORS.beige : `linear-gradient(135deg, ${COLORS.gold} 0%, #ffed4e 100%)`,
              color: COLORS.dark,
              border: `4px solid ${COLORS.dark}`,
              boxShadow: currentQuestion === 0 ? 'none' : `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(255,215,0,0.4)`,
            }}
          >
            ← Précédent
          </button>
          
          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-3 rounded-xl font-black text-lg transition-all transform hover:scale-110 hover:rotate-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0"
            style={{ 
              background: selectedAnswers[currentQuestion] === undefined ? COLORS.beige : `linear-gradient(135deg, ${COLORS.green} 0%, #00a855 100%)`,
              color: selectedAnswers[currentQuestion] === undefined ? COLORS.dark : COLORS.beige,
              border: `4px solid ${COLORS.dark}`,
              boxShadow: selectedAnswers[currentQuestion] === undefined ? 'none' : `4px 4px 0px ${COLORS.dark}, 0 0 15px rgba(0,132,53,0.4)`,
            }}
          >
            {currentQuestion === questions.length - 1 ? 'Voir les résultats' : 'Suivant →'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage

