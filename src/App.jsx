import React from 'react'
import BureaucraticMiner from './components/BureaucraticMiner'

function App() {
  try {
    return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-sopra-purple mb-2">
              Nuit de l'Info 2025
            </h1>
            <h2 className="text-2xl text-sopra-grey">
              Défi Sopra Steria - L'Ergonomie
            </h2>
          </header>

          <BureaucraticMiner />
        </div>
      </div>
    </div>
    )
  } catch (error) {
    console.error('Error in App:', error)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur de chargement</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
  }
}

export default App

