import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

const BureaucraticMiner = () => {
  const [phase, setPhase] = useState(1) // 1: Form, 2: Verification, 3: Complete Form
  const [showSecurityPopup, setShowSecurityPopup] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    phone: '',
    email: '',
    age: '',
  })
  
  // Game state
  const [targetName, setTargetName] = useState([])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [validatedLetters, setValidatedLetters] = useState([])
  const [isJammed, setIsJammed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  // Refs for state accessed in animation loop
  const currentLetterIndexRef = useRef(0)
  const validatedLettersRef = useRef([])
  const isJammedRef = useRef(false)
  
  // Update refs when state changes
  useEffect(() => {
    currentLetterIndexRef.current = currentLetterIndex
  }, [currentLetterIndex])
  
  useEffect(() => {
    validatedLettersRef.current = validatedLetters
  }, [validatedLetters])
  
  useEffect(() => {
    isJammedRef.current = isJammed
  }, [isJammed])
  
  // Game state
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const asterixImageRef = useRef(null)
  const goldNuggetImageRef = useRef(null)
  const pickaxeImageRef = useRef(null)
  
  const gameStateRef = useRef({
    hookAngle: 0,
    hookLength: 50,
    hookState: 'SWINGING',
    caughtItem: null,
    swingDirection: 1,
    objects: [],
  })

  const GAME_WIDTH = 800
  const GAME_HEIGHT = 600
  const ORIGIN_X = GAME_WIDTH / 2
  const ORIGIN_Y = 50
  const MAX_LENGTH = 550
  const SWING_SPEED = 0.03
  const SHOOT_SPEED = 5
  const RETRACT_SPEED_EMPTY = 8
  const RETRACT_SPEED_FULL = 1
  const OBJECT_RADIUS = 25
  const GOLD_NUGGET_SIZE = OBJECT_RADIUS * 2 // Double size for gold nuggets
  const HOOK_TIP_RADIUS = 8

  // Load images
  useEffect(() => {
    asterixImageRef.current = new Image()
    asterixImageRef.current.src = '/asterix_character.png'
    
    goldNuggetImageRef.current = new Image()
    goldNuggetImageRef.current.src = '/gold_nugget.png'
    
    pickaxeImageRef.current = new Image()
    pickaxeImageRef.current.src = '/pickaxe.png'
  }, [])

  // Generate objects - ALWAYS include all letters from name, in easy positions
  const generateObjects = useCallback(() => {
    const objects = []
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    // ALWAYS add ALL correct letters from target name (even if already collected)
    // Position them in easier-to-reach areas (top-middle section)
    targetName.forEach((letter, index) => {
      if (letter !== ' ') {
        // Position in easier areas (top 60% of screen, avoiding edges)
        const easyX = 150 + (index % 4) * 150 + Math.random() * 50
        const easyY = 120 + Math.floor(index / 4) * 80 + Math.random() * 40
        
        objects.push({
          id: `correct-${index}-${Date.now()}`,
          type: 'letter',
          letter: letter,
          isCorrect: true,
          targetIndex: index,
          x: Math.min(easyX, GAME_WIDTH - 50),
          y: Math.min(easyY, GAME_HEIGHT - 100),
          radius: GOLD_NUGGET_SIZE / 2,
        })
      } else {
        // Space character
        const easyX = 150 + (index % 4) * 150 + Math.random() * 50
        const easyY = 120 + Math.floor(index / 4) * 80 + Math.random() * 40
        
        objects.push({
          id: `correct-${index}-${Date.now()}`,
          type: 'space',
          letter: '_',
          isCorrect: true,
          targetIndex: index,
          x: Math.min(easyX, GAME_WIDTH - 50),
          y: Math.min(easyY, GAME_HEIGHT - 100),
          radius: GOLD_NUGGET_SIZE / 2,
        })
      }
    })

    // Add wrong letters (distractors) - fewer and in harder positions
    for (let i = 0; i < 15; i++) {
      const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)]
      if (!targetName.includes(randomLetter)) {
        objects.push({
          id: `wrong-${i}-${Date.now()}`,
          type: 'letter',
          letter: randomLetter,
          isCorrect: false,
          x: 50 + Math.random() * (GAME_WIDTH - 100),
          y: 200 + Math.random() * (GAME_HEIGHT - 250), // Lower, harder positions
          radius: GOLD_NUGGET_SIZE / 2,
        })
      }
    }

    // Always ensure erasers are available
    for (let i = 0; i < 3; i++) {
        objects.push({
          id: `eraser-${i}-${Date.now()}`,
          type: 'eraser',
          x: 50 + Math.random() * (GAME_WIDTH - 100),
          y: 150 + Math.random() * (GAME_HEIGHT - 200),
          radius: GOLD_NUGGET_SIZE / 2,
        })
    }

    return objects
  }, [targetName])

  // Check if required letters still exist in objects
  const checkRequiredLettersExist = useCallback(() => {
    const currentIdx = currentLetterIndexRef.current
    const requiredLetter = targetName[currentIdx]
    
    if (!requiredLetter) return true // No more letters needed
    
    // Check if the required letter exists in current objects
    const letterExists = gameStateRef.current.objects.some(obj => 
      obj.isCorrect && 
      obj.targetIndex === currentIdx && 
      ((requiredLetter === ' ' && obj.type === 'space') || 
       (requiredLetter !== ' ' && obj.letter === requiredLetter))
    )
    
    return letterExists
  }, [targetName])

  // Refresh objects only if required letters don't exist
  const refreshObjectsIfNeeded = useCallback(() => {
    if (!checkRequiredLettersExist()) {
      // Add only the missing required letters, keep existing objects
      const currentIdx = currentLetterIndexRef.current
      const requiredLetter = targetName[currentIdx]
      
      if (requiredLetter) {
        const easyX = 150 + (currentIdx % 4) * 150 + Math.random() * 50
        const easyY = 120 + Math.floor(currentIdx / 4) * 80 + Math.random() * 40
        
        if (requiredLetter === ' ') {
          gameStateRef.current.objects.push({
            id: `correct-${currentIdx}-${Date.now()}`,
            type: 'space',
            letter: '_',
            isCorrect: true,
            targetIndex: currentIdx,
            x: Math.min(easyX, GAME_WIDTH - 50),
            y: Math.min(easyY, GAME_HEIGHT - 100),
            radius: GOLD_NUGGET_SIZE / 2,
          })
        } else {
          gameStateRef.current.objects.push({
            id: `correct-${currentIdx}-${Date.now()}`,
            type: 'letter',
            letter: requiredLetter,
            isCorrect: true,
            targetIndex: currentIdx,
            x: Math.min(easyX, GAME_WIDTH - 50),
            y: Math.min(easyY, GAME_HEIGHT - 100),
            radius: GOLD_NUGGET_SIZE / 2,
          })
        }
      }
    }
  }, [targetName, checkRequiredLettersExist])

  // Handle object returned from hook
  const handleObjectReturned = useCallback((obj) => {
    if (obj.type === 'eraser') {
      // Eraser clears jam
      if (isJammedRef.current) {
        setIsJammed(false)
        setErrorMessage('')
        // Only refresh if required letter doesn't exist
        refreshObjectsIfNeeded()
      }
    } else {
      // Letter returned
      if (isJammedRef.current) {
        // Can't process letters while jammed
        // Only refresh if required letter doesn't exist
        refreshObjectsIfNeeded()
        return
      }

      const currentIdx = currentLetterIndexRef.current
      const validated = validatedLettersRef.current

      if (obj.isCorrect && obj.targetIndex === currentIdx) {
        // Correct letter!
        const newValidated = [...validated, obj.letter]
        setValidatedLetters(newValidated)
        validatedLettersRef.current = newValidated
        
        const newIndex = currentIdx + 1
        setCurrentLetterIndex(newIndex)
        currentLetterIndexRef.current = newIndex
        
        // Only refresh if next required letter doesn't exist
        refreshObjectsIfNeeded()
        
        // Check if complete
        if (newIndex >= targetName.length) {
          // All letters collected!
          setTimeout(() => {
            // Return to form to complete
            setPhase(3)
            setValidatedLetters([])
            setCurrentLetterIndex(0)
            setIsJammed(false)
            setErrorMessage('')
          }, 1000)
        }
      } else {
        // Wrong letter - JAM!
        setIsJammed(true)
        isJammedRef.current = true
        setErrorMessage('Erreur de saisie ! Veuillez supprimer.')
        
        // Only refresh if required letter doesn't exist
        refreshObjectsIfNeeded()
      }
    }
  }, [targetName, refreshObjectsIfNeeded])

  // Initialize game objects
  useEffect(() => {
    if (phase === 2 && targetName.length > 0) {
      gameStateRef.current.objects = generateObjects()
    }
  }, [phase, targetName, generateObjects])

  // Main animation loop
  useEffect(() => {
    if (phase !== 2 || targetName.length === 0) return

    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      const state = gameStateRef.current

      // Clear canvas
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Draw background
      ctx.fillStyle = '#1F2937'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Draw ground
      ctx.fillStyle = '#374151'
      ctx.fillRect(0, GAME_HEIGHT - 20, GAME_WIDTH, 20)

      // Update hook state
      if (state.hookState === 'SWINGING') {
        let newAngle = state.hookAngle + (SWING_SPEED * state.swingDirection)
        if (newAngle > 1.2) {
          state.swingDirection = -1
          newAngle = 1.2
        }
        if (newAngle < -1.2) {
          state.swingDirection = 1
          newAngle = -1.2
        }
        state.hookAngle = newAngle
      } else if (state.hookState === 'SHOOTING') {
        const nextLength = state.hookLength + SHOOT_SPEED
        const hookX = ORIGIN_X + nextLength * Math.sin(state.hookAngle)
        const hookY = ORIGIN_Y + nextLength * Math.cos(state.hookAngle)

        if (nextLength >= MAX_LENGTH || hookX < 0 || hookX > GAME_WIDTH || hookY > GAME_HEIGHT - 20) {
          state.hookState = 'RETRACTING'
          state.hookLength = nextLength
        } else {
          state.hookLength = nextLength
        }
      } else if (state.hookState === 'RETRACTING') {
        const speed = state.caughtItem ? RETRACT_SPEED_FULL : RETRACT_SPEED_EMPTY
        const nextLength = state.hookLength - speed
        
        if (nextLength <= 50) {
          state.hookState = 'SWINGING'
          state.hookLength = 50
          
          if (state.caughtItem) {
            handleObjectReturned(state.caughtItem)
            state.caughtItem = null
          }
        } else {
          state.hookLength = nextLength
        }
      }

      // Calculate hook tip position
      const hookX = ORIGIN_X + state.hookLength * Math.sin(state.hookAngle)
      const hookY = ORIGIN_Y + state.hookLength * Math.cos(state.hookAngle)

      // Check collisions
      if (state.hookState === 'SHOOTING' && !state.caughtItem) {
        const hit = state.objects.find(obj => {
          const dx = obj.x - hookX
          const dy = obj.y - hookY
          const distance = Math.sqrt(dx * dx + dy * dy)
          return distance < obj.radius + HOOK_TIP_RADIUS
        })

        if (hit) {
          state.caughtItem = hit
          state.hookState = 'RETRACTING'
          state.objects = state.objects.filter(o => o.id !== hit.id)
        }
      }

      // Draw hook line
      ctx.strokeStyle = '#9CA3AF'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(ORIGIN_X, ORIGIN_Y)
      ctx.lineTo(hookX, hookY)
      ctx.stroke()

      // Draw Astérix at pivot (on top of purple dot, like he's mining)
      ctx.save()
      ctx.translate(ORIGIN_X, ORIGIN_Y)
      
      // Draw hook base (pivot) - purple dot
      ctx.fillStyle = '#6B46C1'
      ctx.beginPath()
      ctx.arc(0, 0, 10, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw Astérix on top of pivot
      if (asterixImageRef.current && asterixImageRef.current.complete) {
        ctx.drawImage(asterixImageRef.current, -25, -35, 50, 50)
      } else {
        // Placeholder for Astérix
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(0, -20, 15, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#000'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('A', 0, -15)
      }
      
      ctx.restore()

      // Draw pickaxe on hook tip (swinging and collecting gold)
      ctx.save()
      ctx.translate(hookX, hookY)
      ctx.rotate(-state.hookAngle)
      
      if (pickaxeImageRef.current && pickaxeImageRef.current.complete) {
        // Draw pickaxe image on hook tip
        ctx.drawImage(pickaxeImageRef.current, -30, -30, 60, 60)
      } else {
        // Placeholder for pickaxe
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(-5, -5, 10, 40)
        ctx.fillStyle = '#654321'
        ctx.fillRect(-15, 30, 30, 5)
      }
      
      // Draw caught item near hook
      if (state.caughtItem) {
        const offsetY = -60
        if (goldNuggetImageRef.current && goldNuggetImageRef.current.complete) {
          ctx.drawImage(goldNuggetImageRef.current, -GOLD_NUGGET_SIZE/2, offsetY - GOLD_NUGGET_SIZE/2, GOLD_NUGGET_SIZE, GOLD_NUGGET_SIZE)
        } else {
          ctx.fillStyle = state.caughtItem.type === 'eraser' ? '#EF4444' : 
                         state.caughtItem.isCorrect ? '#3B82F6' : '#F59E0B'
          ctx.beginPath()
          ctx.arc(0, offsetY, GOLD_NUGGET_SIZE/2, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Draw letter on nugget (dark color for visibility)
        ctx.fillStyle = '#1F2937' // Dark gray/black for better visibility on gold
        ctx.font = 'bold 20px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        if (state.caughtItem.type === 'eraser') {
          ctx.fillText('🗑️', 0, offsetY)
        } else {
          ctx.fillText(state.caughtItem.letter, 0, offsetY)
        }
      }
      
      ctx.restore()

      // Draw objects (with gold nugget images - double size)
      state.objects.forEach(obj => {
        const isCurrentTarget = obj.isCorrect && 
          obj.targetIndex === currentLetterIndexRef.current && 
          !isJammedRef.current
        
        // Draw gold nugget image if available (double size)
        if (goldNuggetImageRef.current && goldNuggetImageRef.current.complete) {
          ctx.drawImage(goldNuggetImageRef.current, obj.x - GOLD_NUGGET_SIZE/2, obj.y - GOLD_NUGGET_SIZE/2, GOLD_NUGGET_SIZE, GOLD_NUGGET_SIZE)
        } else {
          // Fallback: draw colored circle
          if (obj.type === 'eraser') {
            ctx.fillStyle = '#EF4444'
          } else {
            ctx.fillStyle = isCurrentTarget ? '#10B981' : 
                          obj.isCorrect ? '#3B82F6' : '#F59E0B'
          }
          ctx.beginPath()
          ctx.arc(obj.x, obj.y, GOLD_NUGGET_SIZE/2, 0, Math.PI * 2)
          ctx.fill()
          
          if (obj.type !== 'eraser') {
            ctx.strokeStyle = isCurrentTarget ? '#059669' : '#1F2937'
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }
        
        // Draw letter on nugget (dark color for better visibility on gold)
        ctx.fillStyle = '#1F2937' // Dark gray/black for better visibility
        ctx.font = 'bold 22px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        if (obj.type === 'eraser') {
          ctx.fillText('🗑️', obj.x, obj.y)
        } else {
          ctx.fillText(obj.letter, obj.x, obj.y)
        }
      })

      // Draw instruction overlay
      if (state.hookState === 'SWINGING') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
        ctx.font = 'bold 16px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('CLIQUEZ POUR ATTRAPER UNE LETTRE', GAME_WIDTH / 2, GAME_HEIGHT - 10)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [phase, targetName, currentLetterIndex, isJammed, handleObjectReturned])

  // Launch hook on canvas click
  const handleCanvasClick = (e) => {
    if (phase !== 2) return
    
    const state = gameStateRef.current
    if (state.hookState === 'SWINGING') {
      state.hookState = 'SHOOTING'
    }
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    const firstName = formData.firstName.trim()
    const lastName = formData.lastName.trim()
    
    if (firstName && lastName) {
      const fullName = `${firstName} ${lastName}`
      setFormData(prev => ({ ...prev, fullName, firstName, lastName }))
      setShowSecurityPopup(true)
    } else {
      alert('Veuillez remplir votre prénom et nom pour continuer.')
    }
  }

  const handleStartVerification = () => {
    setShowSecurityPopup(false)
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()
    const nameArray = fullName.toUpperCase().trim().split('')
    setTargetName(nameArray)
    setPhase(2)
    setValidatedLetters([])
    setCurrentLetterIndex(0)
    setIsJammed(false)
    setErrorMessage('')
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Handle final form submission
    alert('Formulaire soumis avec succès !')
  }

  const getCurrentTargetLetter = () => {
    if (currentLetterIndex < targetName.length) {
      return targetName[currentLetterIndex] === ' ' ? '_' : targetName[currentLetterIndex]
    }
    return ''
  }

  // Phase 1: Initial Form (Full form, but verification needed for name)
  if (phase === 1) {
    return (
      <>
        {/* Security Popup */}
        {showSecurityPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-sopra-purple">Vérification de Sécurité</h3>
                <button
                  onClick={handleStartVerification}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-gray-700 mb-6">
                Par mesure de sécurité renforcée (Norme ISO-9999), nous devons vérifier 
                que vous n'êtes pas un robot. Veuillez confirmer votre identité en collectant 
                manuellement les fragments de votre nom.
              </p>
              <button
                onClick={handleStartVerification}
                className="w-full bg-sopra-purple text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Commencer la Vérification
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-sopra-purple mb-6 text-center">
            Formulaire d'Inscription
          </h3>
          <form onSubmit={handleNameSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
              placeholder="06 12 34 56 78"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
              placeholder="exemple@email.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Âge <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
              min="1"
              max="120"
              placeholder="Votre âge"
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-800">
              <strong>Note :</strong> Remplissez votre nom et prénom, puis cliquez sur "Vérifier mon Identité" 
              pour commencer la vérification. Vous pourrez compléter les autres champs après la vérification.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={!formData.firstName.trim() || !formData.lastName.trim()}
            className="w-full bg-sopra-purple text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Vérifier mon Identité
          </button>
        </form>
      </div>
      </>
    )
  }

  // Phase 3: Complete Form (after verification)
  if (phase === 3) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-4 p-4 bg-green-100 border-2 border-green-500 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="text-green-600" size={24} />
          <span className="text-green-800 font-semibold">
            Identité vérifiée avec succès ! Veuillez compléter et soumettre le formulaire.
          </span>
        </div>
        
        <h3 className="text-2xl font-semibold text-sopra-purple mb-6 text-center">
          Compléter votre Inscription
        </h3>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple bg-gray-50"
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple bg-gray-50"
                required
                readOnly
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
              placeholder="06 12 34 56 78"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
              placeholder="exemple@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Âge <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-sopra-purple rounded-lg focus:outline-none focus:ring-2 focus:ring-sopra-purple"
              min="1"
              max="120"
              placeholder="Votre âge"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-sopra-purple text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Soumettre le Formulaire
          </button>
        </form>
      </div>
    )
  }

  // Phase 2: Verification Game
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-sopra-purple mb-4 text-center">
          Phase 2 : Vérification d'Identité
        </h3>

        {/* Target Name Display */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Nom à valider :</div>
          <div className="flex gap-2 justify-center flex-wrap">
            {targetName.map((letter, index) => {
              const isCompleted = index < validatedLetters.length
              const isCurrent = index === currentLetterIndex && !isJammed
              
              return (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white ring-4 ring-blue-300'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {letter === ' ' ? '_' : letter}
                </div>
              )
            })}
          </div>
          {currentLetterIndex < targetName.length && (
            <div className="mt-3 text-center text-sm text-blue-600 font-medium">
              Lettre actuelle à collecter : <span className="text-2xl font-bold">{getCurrentTargetLetter()}</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {isJammed && (
          <div className="mb-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-600" size={24} />
            <span className="text-red-800 font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progression</span>
            <span>{validatedLetters.length} / {targetName.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(validatedLetters.length / targetName.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Game Canvas */}
        <div className="mb-4 border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-50">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="w-full cursor-crosshair select-none"
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
            onClick={handleCanvasClick}
          />
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Instructions :</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Cliquez sur la zone de jeu pour lancer le crochet</li>
            <li>Le crochet oscille automatiquement - attendez le bon moment !</li>
            <li>Collectez les lettres dans l'ordre exact de votre nom</li>
            <li>Les lettres correctes sont surlignées en vert/bleu</li>
            <li>Si vous collectez une mauvaise lettre, vous devez utiliser l'effaceur (🗑️) pour débloquer</li>
            <li>Le crochet remonte très lentement quand il transporte un objet</li>
          </ul>
        </div>
      </div>
  )
}

export default BureaucraticMiner
