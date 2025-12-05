import React from 'react'

const COLORS = {
  gold: '#ffd700',
  beige: '#f8e0b1',
  dark: '#1a171e',
  green: '#008435',
  red: '#db281c',
}

const StatsCard = ({ icon, title, value, description, color = COLORS.gold }) => {
  const Icon = icon
  
  return (
    <div
      className="bg-white rounded-lg shadow-xl p-6 transform hover:scale-105 transition-all border-4 text-center"
      style={{ 
        background: COLORS.beige,
        borderColor: color,
        boxShadow: `0 8px 16px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,215,0,0.1)`
      }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: color }}>
        <Icon size={32} style={{ color: COLORS.beige }} />
      </div>
      <div className="text-4xl font-black mb-2" style={{ color: color }}>
        {value}
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.dark }}>
        {title}
      </h3>
      <p className="text-sm" style={{ color: COLORS.dark, opacity: 0.8 }}>
        {description}
      </p>
    </div>
  )
}

export default StatsCard

