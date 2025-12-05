import React, { useState, useRef, useEffect, useCallback } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

// Astérix color palette
const COLORS = {
  gold: '#ffd700',
  beige: '#f8e0b1',
  dark: '#1a171e',
  green: '#008435',
  red: '#db281c',
}

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
  const backgroundImageRef = useRef(null)
  
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
  const ORIGIN_Y = 100 // Lowered from 50 to bring hook down
  const MAX_LENGTH = 500 // Slightly reduced to match new origin
  const SWING_SPEED = 0.03
  const SHOOT_SPEED = 5
  const RETRACT_SPEED_EMPTY = 8
  const RETRACT_SPEED_FULL = 1
  const OBJECT_RADIUS = 25
  const GOLD_NUGGET_SIZE = OBJECT_RADIUS * 2
  const HOOK_TIP_RADIUS = 8

  // Load images
  useEffect(() => {
    asterixImageRef.current = new Image()
    asterixImageRef.current.src = '/asterix_character.png'
    
    goldNuggetImageRef.current = new Image()
    goldNuggetImageRef.current.onload = () => {
      console.log('✅ Gold Nugget loaded successfully, dimensions:', goldNuggetImageRef.current.width, 'x', goldNuggetImageRef.current.height)
    }
    goldNuggetImageRef.current.onerror = () => {
      console.error('❌ Failed to load Gold Nugget image from /gold_nugget.png')
    }
    goldNuggetImageRef.current.src = '/gold_nugget.png'
    
    pickaxeImageRef.current = new Image()
    pickaxeImageRef.current.src = '/pickaxe.png'
    
    // Background image for canvas
    backgroundImageRef.current = new Image()
    backgroundImageRef.current.src = '/background.png'
  }, [])

  // Helper function to check if two objects overlap
  const checkOverlap = (obj1, obj2) => {
    const dx = obj1.x - obj2.x
    const dy = obj1.y - obj2.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const minDistance = obj1.radius + obj2.radius + 10 // 10px padding
    return distance < minDistance
  }

  // Helper function to find a non-overlapping position
  const findNonOverlappingPosition = (objects, minX, maxX, minY, maxY, radius, maxAttempts = 50) => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const x = minX + Math.random() * (maxX - minX)
      const y = minY + Math.random() * (maxY - minY)
      const newObj = { x, y, radius }
      
      // Check if this position overlaps with any existing object
      const overlaps = objects.some(existingObj => checkOverlap(newObj, existingObj))
      
      if (!overlaps) {
        return { x, y }
      }
    }
    // If we can't find a non-overlapping position after maxAttempts, return a random position anyway
    return {
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY)
    }
  }

  // Generate objects - ALWAYS include all letters from name, in random positions (NO OVERLAP)
  const generateObjects = useCallback(() => {
    const objects = []
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    
    // ALWAYS add ALL correct letters from target name - placed at TOP for easy access (NO OVERLAP)
    targetName.forEach((letter, index) => {
      const position = findNonOverlappingPosition(
        objects,
        50, GAME_WIDTH - 50, // X range
        220, 280, // Y range (top area, easy to reach)
        GOLD_NUGGET_SIZE / 2
      )
      
      if (letter !== ' ') {
        objects.push({
          id: `correct-${index}-${Date.now()}`,
          type: 'letter',
          letter: letter,
          isCorrect: true,
          targetIndex: index,
          x: position.x,
          y: position.y,
          radius: GOLD_NUGGET_SIZE / 2,
        })
      } else {
        objects.push({
          id: `correct-${index}-${Date.now()}`,
          type: 'space',
          letter: '_',
          isCorrect: true,
          targetIndex: index,
          x: position.x,
          y: position.y,
          radius: GOLD_NUGGET_SIZE / 2,
        })
      }
    })

    // Add wrong letters (distractors) - NO OVERLAP
    for (let i = 0; i < 15; i++) {
      const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)]
      if (!targetName.includes(randomLetter)) {
        const position = findNonOverlappingPosition(
          objects,
          50, GAME_WIDTH - 50, // X range
          220, GAME_HEIGHT - 20, // Y range (below Astérix)
          GOLD_NUGGET_SIZE / 2
        )
        
        objects.push({
          id: `wrong-${i}-${Date.now()}`,
          type: 'letter',
          letter: randomLetter,
          isCorrect: false,
          x: position.x,
          y: position.y,
          radius: GOLD_NUGGET_SIZE / 2,
        })
      }
    }

    // Always ensure at least 3 erasers are available (guaranteed minimum) - NO OVERLAP
    for (let i = 0; i < 3; i++) {
      const position = findNonOverlappingPosition(
        objects,
        50, GAME_WIDTH - 50, // X range
        220, GAME_HEIGHT - 20, // Y range (below Astérix)
        GOLD_NUGGET_SIZE / 2
      )
      
      objects.push({
        id: `eraser-${i}-${Date.now()}`,
        type: 'eraser',
        x: position.x,
        y: position.y,
        radius: GOLD_NUGGET_SIZE / 2,
      })
    }

    return objects
  }, [targetName])

  // Refresh objects - regenerate all correct letters with random positions
  const refreshObjects = useCallback(() => {
    // Remove all correct letters, keep wrong letters and erasers
    const wrongObjects = gameStateRef.current.objects.filter(obj => !obj.isCorrect)
    
    // Check if we have at least one eraser, if not add one
    const hasEraser = wrongObjects.some(obj => obj.type === 'eraser')
    if (!hasEraser) {
      wrongObjects.push({
        id: `eraser-guaranteed-${Date.now()}`,
        type: 'eraser',
        x: 50 + Math.random() * (GAME_WIDTH - 100),
        y: 220 + Math.random() * (GAME_HEIGHT - 320), // Moved down to be below Astérix
        radius: GOLD_NUGGET_SIZE / 2,
      })
    }
    
    // Regenerate all correct letters with new random positions
    const newCorrectObjects = []
    targetName.forEach((letter, index) => {
      if (letter !== ' ') {
        newCorrectObjects.push({
          id: `correct-${index}-${Date.now()}`,
          type: 'letter',
          letter: letter,
          isCorrect: true,
          targetIndex: index,
          x: 50 + Math.random() * (GAME_WIDTH - 100),
          y: 220 + Math.random() * (GAME_HEIGHT - 320), // Moved down to be below Astérix (who is at Y ~70-220)
          radius: GOLD_NUGGET_SIZE / 2,
        })
      } else {
        newCorrectObjects.push({
          id: `correct-${index}-${Date.now()}`,
          type: 'space',
          letter: '_',
          isCorrect: true,
          targetIndex: index,
          x: 50 + Math.random() * (GAME_WIDTH - 100),
          y: 220 + Math.random() * (GAME_HEIGHT - 320), // Moved down to be below Astérix (who is at Y ~70-220)
          radius: GOLD_NUGGET_SIZE / 2,
        })
      }
    })
    
    gameStateRef.current.objects = [...wrongObjects, ...newCorrectObjects]
  }, [targetName])

  // Check if required letters still exist in objects
  const checkRequiredLettersExist = useCallback(() => {
    const currentIdx = currentLetterIndexRef.current
    const requiredLetter = targetName[currentIdx]
    
    if (!requiredLetter) return true
    
    const letterExists = gameStateRef.current.objects.some(obj => 
      obj.isCorrect && 
      obj.targetIndex === currentIdx && 
      ((requiredLetter === ' ' && obj.type === 'space') || 
       (requiredLetter !== ' ' && obj.letter === requiredLetter))
    )
    
    return letterExists
  }, [targetName])

  // Refresh objects only if required letters don't exist - regenerate all correct letters
  const refreshObjectsIfNeeded = useCallback(() => {
    if (!checkRequiredLettersExist()) {
      refreshObjects()
    }
  }, [targetName, checkRequiredLettersExist, refreshObjects])

  // Ensure eraser is always available (NO OVERLAP)
  const ensureEraserAvailable = useCallback(() => {
    const hasEraser = gameStateRef.current.objects.some(o => o.type === 'eraser')
    if (!hasEraser) {
      const position = findNonOverlappingPosition(
        gameStateRef.current.objects,
        50, GAME_WIDTH - 50,
        220, GAME_HEIGHT - 20,
        GOLD_NUGGET_SIZE / 2
      )
      gameStateRef.current.objects.push({
        id: `eraser-guaranteed-${Date.now()}`,
        type: 'eraser',
        x: position.x,
        y: position.y,
        radius: GOLD_NUGGET_SIZE / 2,
      })
    }
  }, [])

  // Handle object returned from hook
  const handleObjectReturned = useCallback((obj) => {
    if (obj.type === 'eraser') {
      if (isJammedRef.current) {
        setIsJammed(false)
        setErrorMessage('')
        // Generate 3 more erasers when one is caught
        for (let i = 0; i < 3; i++) {
          gameStateRef.current.objects.push({
            id: `eraser-generated-${Date.now()}-${i}`,
            type: 'eraser',
            x: 50 + Math.random() * (GAME_WIDTH - 100),
            y: 220 + Math.random() * (GAME_HEIGHT - 320),
            radius: GOLD_NUGGET_SIZE / 2,
          })
        }
        refreshObjectsIfNeeded()
      }
    } else {
      if (isJammedRef.current) {
        // Ensure eraser is available when jammed
        ensureEraserAvailable()
        refreshObjectsIfNeeded()
        return
      }

      const currentIdx = currentLetterIndexRef.current
      const validated = validatedLettersRef.current

      if (obj.isCorrect && obj.targetIndex === currentIdx) {
        const newValidated = [...validated, obj.letter]
        setValidatedLetters(newValidated)
        validatedLettersRef.current = newValidated
        
        const newIndex = currentIdx + 1
        setCurrentLetterIndex(newIndex)
        currentLetterIndexRef.current = newIndex
        
        refreshObjectsIfNeeded()
        
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
        setIsJammed(true)
        isJammedRef.current = true
        setErrorMessage('Erreur de saisie ! Veuillez supprimer.')
        // Always ensure eraser is available when jammed
        ensureEraserAvailable()
        refreshObjectsIfNeeded()
      }
    }
  }, [targetName, refreshObjectsIfNeeded, ensureEraserAvailable])

  // Initialize game objects
  useEffect(() => {
    if (phase === 2 && targetName.length > 0) {
      const newObjects = generateObjects()
      gameStateRef.current.objects = newObjects
      gameStateRef.current.animationTime = 0
      console.log('✅ Objects generated:', newObjects.length, 'objects')
      if (newObjects.length > 0) {
        console.log('First object:', newObjects[0])
      }
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

      // Draw background image if available, otherwise use gradient
      // IMPORTANT: Background is drawn FIRST, then objects are drawn on top
      // TEMPORARY: Comment out background image to test if it's hiding objects
      const DRAW_BACKGROUND = true // Set to false to test
      
      if (DRAW_BACKGROUND && backgroundImageRef.current && backgroundImageRef.current.complete) {
        // Draw background with full opacity
        ctx.globalAlpha = 1.0
        ctx.drawImage(backgroundImageRef.current, 0, 0, GAME_WIDTH, GAME_HEIGHT)
        // Reset alpha for objects to ensure they're visible
        ctx.globalAlpha = 1.0
      } else {
        // Draw background (village style) - fallback gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT)
        gradient.addColorStop(0, COLORS.beige)
        gradient.addColorStop(1, '#d4a574')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

        // Draw ground (grass)
        ctx.fillStyle = COLORS.green
        ctx.fillRect(0, GAME_HEIGHT - 20, GAME_WIDTH, 20)
      }

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

      // Update animation time
      state.animationTime += 0.02

      // Draw hook line (rope) with slight animation
      ctx.strokeStyle = '#8B4513'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(ORIGIN_X, ORIGIN_Y)
      ctx.lineTo(hookX, hookY)
      ctx.stroke()

      // Draw Astérix at pivot (FIXED, not swinging) - on top of gold dot
      ctx.save()
      ctx.translate(ORIGIN_X, ORIGIN_Y)
      
      // Draw hook base (pivot) - gold color (NO animation)
      ctx.fillStyle = COLORS.gold
      ctx.beginPath()
      ctx.arc(0, 0, 12, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = COLORS.dark
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw Astérix on top of pivot (FIXED position, NO animation)
      const asterixSize = 150 // Good size for cartoon effect
      const asterixY = -30 // Above the pivot (moved down more)
      
      if (asterixImageRef.current && asterixImageRef.current.complete) {
        ctx.save()
        ctx.translate(0, asterixY)
        // NO scaling animation - fixed size
        ctx.drawImage(asterixImageRef.current, -asterixSize/2, -asterixSize/2, asterixSize, asterixSize)
        ctx.restore()
      } else {
        // Placeholder
        ctx.fillStyle = COLORS.gold
        ctx.beginPath()
        ctx.arc(0, asterixY, asterixSize/2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = COLORS.dark
        ctx.font = 'bold 24px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('A', 0, asterixY)
      }
      
      ctx.restore()

      // Draw pickaxe on hook tip (swinging and collecting gold)
      ctx.save()
      ctx.translate(hookX, hookY)
      ctx.rotate(-state.hookAngle)
      
      if (pickaxeImageRef.current && pickaxeImageRef.current.complete) {
        // NO rotation animation on pickaxe
        ctx.drawImage(pickaxeImageRef.current, -30, -30, 60, 60)
      } else {
        ctx.fillStyle = '#8B4513'
        ctx.fillRect(-5, -5, 10, 40)
        ctx.fillStyle = '#654321'
        ctx.fillRect(-15, 30, 30, 5)
      }
      
      // Draw caught item near hook
      if (state.caughtItem) {
        const offsetY = -60
        const imageLoaded = goldNuggetImageRef.current && 
                           (goldNuggetImageRef.current.complete || goldNuggetImageRef.current.naturalWidth > 0)
        
        if (imageLoaded) {
          try {
            ctx.globalAlpha = 1.0 // Ensure full opacity
            ctx.drawImage(goldNuggetImageRef.current, -GOLD_NUGGET_SIZE/2, offsetY - GOLD_NUGGET_SIZE/2, GOLD_NUGGET_SIZE, GOLD_NUGGET_SIZE)
          } catch (e) {
            // Fallback if drawImage fails
            ctx.fillStyle = state.caughtItem.type === 'eraser' ? COLORS.red : COLORS.gold
            ctx.beginPath()
            ctx.arc(0, offsetY, GOLD_NUGGET_SIZE/2, 0, Math.PI * 2)
            ctx.fill()
            if (state.caughtItem.type !== 'eraser') {
              ctx.strokeStyle = COLORS.dark
              ctx.lineWidth = 2
              ctx.stroke()
            }
          }
        } else {
          ctx.fillStyle = state.caughtItem.type === 'eraser' ? COLORS.red : COLORS.gold
          ctx.beginPath()
          ctx.arc(0, offsetY, GOLD_NUGGET_SIZE/2, 0, Math.PI * 2)
          ctx.fill()
          if (state.caughtItem.type !== 'eraser') {
            ctx.strokeStyle = COLORS.dark
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }
        
        ctx.fillStyle = COLORS.dark
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

      // Draw objects (with gold nugget images) - with animations
      // Objects are drawn AFTER background so they appear on top
      state.objects.forEach((obj, index) => {
        const isCurrentTarget = obj.isCorrect && 
          obj.targetIndex === currentLetterIndexRef.current && 
          !isJammedRef.current
        
        // NO animation - fixed position and size
        const drawX = obj.x
        const drawY = obj.y
        const scaledSize = GOLD_NUGGET_SIZE
        
        ctx.save()
        ctx.translate(drawX, drawY)
        
        // Always draw gold nugget image or fallback
        const imageLoaded = goldNuggetImageRef.current && 
                           goldNuggetImageRef.current.complete && 
                           goldNuggetImageRef.current.naturalWidth > 0
        
        if (imageLoaded) {
          try {
            // Draw image at scaled size - ensure full opacity and quality
            ctx.globalAlpha = 1.0
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
            // Draw the gold nugget image
            ctx.drawImage(goldNuggetImageRef.current, -scaledSize/2, -scaledSize/2, scaledSize, scaledSize)
          } catch (e) {
            // If drawImage fails, fall back to circle
            console.warn('Failed to draw gold nugget image, using fallback:', e)
            if (obj.type === 'eraser') {
              ctx.fillStyle = COLORS.red
            } else {
              ctx.fillStyle = isCurrentTarget ? COLORS.green : 
                            obj.isCorrect ? COLORS.gold : '#F59E0B'
            }
            ctx.beginPath()
            ctx.arc(0, 0, scaledSize/2, 0, Math.PI * 2)
            ctx.fill()
            
            if (obj.type !== 'eraser') {
              ctx.strokeStyle = isCurrentTarget ? COLORS.green : COLORS.dark
              ctx.lineWidth = 2 + (isCurrentTarget ? Math.sin(state.animationTime * 4) * 1 : 0)
              ctx.stroke()
            }
          }
        } else {
          // Fallback: draw colored circle
          if (obj.type === 'eraser') {
            ctx.fillStyle = COLORS.red
          } else {
            ctx.fillStyle = isCurrentTarget ? COLORS.green : 
                          obj.isCorrect ? COLORS.gold : '#F59E0B'
          }
          ctx.beginPath()
          ctx.arc(0, 0, scaledSize/2, 0, Math.PI * 2)
          ctx.fill()
          
          if (obj.type !== 'eraser') {
            ctx.strokeStyle = isCurrentTarget ? COLORS.green : COLORS.dark
            ctx.lineWidth = 2 // NO animation
            ctx.stroke()
          }
        }
        
        // Draw letter/icon (NO animation - fixed)
        ctx.fillStyle = COLORS.dark
        ctx.font = 'bold 22px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        if (obj.type === 'eraser') {
          // NO rotation animation
          ctx.fillText('🗑️', 0, 0)
        } else {
          // NO scale animation
          ctx.fillText(obj.letter, 0, 0)
        }
        
        ctx.restore()
      })

      // Draw instruction overlay with animation
      if (state.hookState === 'SWINGING') {
        const textPulse = 0.7 + Math.sin(state.animationTime * 3) * 0.3
        ctx.fillStyle = `rgba(26, 23, 30, ${textPulse})`
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
      // Nom d'abord, puis prénom (comme demandé)
      const fullName = `${lastName} ${firstName}`
      setFormData(prev => ({ ...prev, fullName, firstName, lastName }))
      setShowSecurityPopup(true)
    } else {
      alert('Veuillez remplir votre prénom et nom pour continuer.')
    }
  }

  const handleStartVerification = () => {
    setShowSecurityPopup(false)
    // Nom d'abord, puis prénom (comme demandé)
    const fullName = `${formData.lastName} ${formData.firstName}`.trim()
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
    alert('Formulaire soumis avec succès !')
  }

  const handleRefreshLetters = () => {
    // Regenerate all objects with new positions (no overlap)
    gameStateRef.current.objects = generateObjects()
  }

  const getCurrentTargetLetter = () => {
    if (currentLetterIndex < targetName.length) {
      return targetName[currentLetterIndex] === ' ' ? '_' : targetName[currentLetterIndex]
    }
    return ''
  }

  // Phase 1: Initial Form
  if (phase === 1) {
    return (
      <>
        {/* Security Popup */}
        {showSecurityPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4" style={{ background: COLORS.beige, border: `4px solid ${COLORS.gold}` }}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold" style={{ color: COLORS.dark }}>Vérification de Sécurité</h3>
                <button
                  onClick={handleStartVerification}
                  style={{ color: COLORS.dark }}
                  className="hover:opacity-70"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="mb-6" style={{ color: COLORS.dark }}>
                Par mesure de sécurité renforcée (Norme ISO-9999), nous devons vérifier 
                que vous n'êtes pas un robot. Veuillez confirmer votre identité en collectant 
                manuellement les fragments de votre nom.
              </p>
              <button
                onClick={handleStartVerification}
                className="w-full py-4 rounded-xl font-black text-lg transition-all transform hover:scale-110 hover:rotate-1"
                style={{ 
                  background: COLORS.gold, 
                  color: COLORS.dark,
                  border: `5px solid ${COLORS.dark}`,
                  boxShadow: `6px 6px 0px ${COLORS.dark}, 0 0 20px rgba(255,215,0,0.5)`,
                  textShadow: `2px 2px 0px rgba(0,0,0,0.2)`
                }}
              >
                ⚔️ Commencer la Vérification ⚔️
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-2xl p-8 transform hover:scale-[1.01] transition-transform" style={{ 
          background: COLORS.beige, 
          border: `6px solid ${COLORS.gold}`,
          boxShadow: `0 10px 30px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,215,0,0.2)`
        }}>
          <h3 className="text-3xl font-bold mb-6 text-center" style={{ 
            color: COLORS.dark, 
            textShadow: `3px 3px 0px ${COLORS.gold}, 5px 5px 10px rgba(0,0,0,0.2)`,
            transform: 'rotate(-0.5deg)'
          }}>
            🏛️ Formulaire du Village Gaulois 🏛️
          </h3>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                  Prénom <span style={{ color: COLORS.red }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                  Nom <span style={{ color: COLORS.red }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                  style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
                placeholder="06 12 34 56 78"
              />
            </div>
            
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
                placeholder="exemple@email.com"
              />
            </div>
            
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                Âge
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
                min="1"
                max="120"
                placeholder="Votre âge"
              />
            </div>
            
            <div className="p-4 rounded-lg border-l-4" style={{ background: COLORS.beige, borderColor: COLORS.gold }}>
              <p className="text-sm font-bold" style={{ color: COLORS.dark }}>
                💡 <strong>Note :</strong> Remplissez votre nom et prénom, puis cliquez sur "Vérifier mon Identité" 
                pour commencer la vérification. Vous pourrez compléter les autres champs après la vérification.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={!formData.firstName.trim() || !formData.lastName.trim()}
              className="w-full py-4 rounded-xl font-black text-xl transition-all transform hover:scale-110 hover:rotate-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0"
              style={{ 
                background: COLORS.gold, 
                color: COLORS.dark,
                border: `5px solid ${COLORS.dark}`,
                boxShadow: `6px 6px 0px ${COLORS.dark}, 0 0 20px rgba(255,215,0,0.5)`,
                textShadow: `2px 2px 0px rgba(0,0,0,0.2)`
              }}
            >
              ⚔️ Vérifier mon Identité ⚔️
            </button>
          </form>
        </div>
      </>
    )
  }

  // Phase 3: Complete Form (after verification)
  if (phase === 3) {
    return (
      <div className="bg-white rounded-lg shadow-2xl p-8 transform hover:scale-[1.01] transition-transform" style={{ 
        background: COLORS.beige, 
        border: `6px solid ${COLORS.gold}`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,215,0,0.2)`
      }}>
        <div className="mb-4 p-4 rounded-lg flex items-center gap-2 border-3 shadow-lg" style={{ 
          background: COLORS.beige, 
          borderColor: COLORS.green,
          boxShadow: `0 4px 8px rgba(0,132,53,0.3)`
        }}>
          <CheckCircle2 style={{ color: COLORS.green }} size={24} />
          <span className="font-bold" style={{ color: COLORS.green }}>
            Identité vérifiée avec succès ! Veuillez compléter et soumettre le formulaire.
          </span>
        </div>
        
        <h3 className="text-3xl font-bold mb-6 text-center" style={{ 
          color: COLORS.dark, 
          textShadow: `3px 3px 0px ${COLORS.gold}, 5px 5px 10px rgba(0,0,0,0.2)`,
          transform: 'rotate(-0.5deg)'
        }}>
          🏛️ Compléter votre Inscription 🏛️
        </h3>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                Prénom <span style={{ color: COLORS.red }}>*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none bg-gray-100"
                style={{ borderColor: COLORS.gold, color: COLORS.dark }}
                readOnly
              />
            </div>
            <div>
              <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
                Nom <span style={{ color: COLORS.red }}>*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none bg-gray-100"
                style={{ borderColor: COLORS.gold, color: COLORS.dark }}
                readOnly
              />
            </div>
          </div>
          
          <div>
            <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
              Téléphone <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
              placeholder="06 12 34 56 78"
              required
            />
          </div>
          
          <div>
            <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
              Email <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
              placeholder="exemple@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block font-bold mb-2" style={{ color: COLORS.dark }}>
              Âge <span style={{ color: COLORS.red }}>*</span>
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
              style={{ borderColor: COLORS.gold, background: COLORS.beige, color: COLORS.dark }}
              min="1"
              max="120"
              placeholder="Votre âge"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            style={{ 
              background: COLORS.gold, 
              color: COLORS.dark,
              border: `3px solid ${COLORS.dark}`,
              boxShadow: `4px 4px 0px ${COLORS.dark}`
            }}
          >
            🛡️ Soumettre le Formulaire
          </button>
        </form>
      </div>
    )
  }

  // Phase 2: Verification Game
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6 transform hover:scale-[1.01] transition-transform" style={{ 
      background: COLORS.beige, 
      border: `6px solid ${COLORS.gold}`,
      boxShadow: `0 10px 30px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,215,0,0.2)`
    }}>
       <div className="flex justify-between items-center mb-4 gap-4">
         <h3 className="text-2xl font-bold text-center flex-1" style={{ 
           color: COLORS.dark, 
           textShadow: `3px 3px 0px ${COLORS.gold}, 5px 5px 10px rgba(0,0,0,0.2)`,
           transform: 'rotate(-0.5deg)'
         }}>
           ⚔️ Vérification d'Identité ⚔️
         </h3>
         <button
           onClick={handleRefreshLetters}
           className="px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-110 hover:rotate-1 whitespace-nowrap"
           style={{ 
             background: COLORS.gold, 
             color: COLORS.dark,
             border: `3px solid ${COLORS.dark}`,
             boxShadow: `3px 3px 0px ${COLORS.dark}`,
             textShadow: `1px 1px 0px rgba(0,0,0,0.2)`
           }}
         >
           🔄 Rafraîchir
         </button>
       </div>

      {/* Target Name Display */}
      <div className="mb-4 p-4 rounded-lg" style={{ background: COLORS.beige, border: `3px solid ${COLORS.gold}` }}>
        <div className="text-sm font-bold mb-2" style={{ color: COLORS.dark }}>
          Nom à valider :
        </div>
        <div className="flex gap-2 justify-center flex-wrap">
          {targetName.map((letter, index) => {
            const isCompleted = index < validatedLetters.length
            const isCurrent = index === currentLetterIndex && !isJammed
            
            return (
              <div
                key={index}
                className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl border-2"
                style={{
                  background: isCompleted ? COLORS.green : isCurrent ? COLORS.gold : COLORS.beige,
                  color: isCompleted ? COLORS.beige : COLORS.dark,
                  borderColor: isCurrent ? COLORS.dark : COLORS.gold,
                  boxShadow: isCurrent ? `0 0 10px ${COLORS.gold}` : 'none'
                }}
              >
                {letter === ' ' ? '_' : letter}
              </div>
            )
          })}
        </div>
        {currentLetterIndex < targetName.length && (
          <div className="mt-3 text-center text-sm font-bold" style={{ color: COLORS.dark }}>
            Lettre actuelle : <span className="text-2xl" style={{ color: COLORS.gold }}>{getCurrentTargetLetter()}</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {isJammed && (
        <div className="mb-4 p-4 rounded-lg flex items-center gap-2 border-2" style={{ background: COLORS.beige, borderColor: COLORS.red }}>
          <AlertCircle style={{ color: COLORS.red }} size={24} />
          <span className="font-bold" style={{ color: COLORS.red }}>{errorMessage}</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm font-bold mb-1" style={{ color: COLORS.dark }}>
          <span>Progression</span>
          <span>{validatedLetters.length} / {targetName.length}</span>
        </div>
        <div className="w-full rounded-full h-4 border-2" style={{ background: COLORS.beige, borderColor: COLORS.gold }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${(validatedLetters.length / targetName.length) * 100}%`,
              background: COLORS.green
            }}
          />
        </div>
      </div>

      {/* Game Canvas */}
      <div className="mb-4 rounded-lg overflow-hidden border-4 shadow-2xl transform hover:scale-[1.01] transition-transform" style={{ 
        borderColor: COLORS.gold,
        boxShadow: `0 8px 20px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,215,0,0.1)`
      }}>
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
      <div className="p-4 rounded-lg border-l-4" style={{ background: COLORS.beige, borderColor: COLORS.gold }}>
        <p className="text-sm font-bold mb-2" style={{ color: COLORS.dark }}>
          <strong>Instructions :</strong>
        </p>
        <ul className="text-sm space-y-1 list-disc list-inside" style={{ color: COLORS.dark }}>
          <li>Cliquez sur la zone de jeu pour lancer la pioche</li>
          <li>Collectez les lettres dans l'ordre exact</li>
          <li>Si vous collectez une mauvaise lettre, utilisez l'effaceur (🗑️) pour débloquer</li>
          <li>Astérix vous aide depuis le haut !</li>
        </ul>
      </div>
    </div>
  )
}

export default BureaucraticMiner
