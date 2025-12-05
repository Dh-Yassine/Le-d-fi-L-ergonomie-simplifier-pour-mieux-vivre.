import React, { useState } from 'react'
import { Shield, Users, Leaf, ArrowRight, Play, ExternalLink, TrendingUp, Recycle, DollarSign } from 'lucide-react'
import StatsCard from '../components/StatsCard'

const COLORS = {
  gold: '#ffd700',
  beige: '#f8e0b1',
  dark: '#1a171e',
  green: '#008435',
  red: '#db281c',
}

const HomePage = ({ onNavigate }) => {
  const pillars = [
    {
      title: 'Inclusion',
      icon: Users,
      description: 'Un numérique accessible à tous, sans discrimination technologique',
      color: COLORS.green,
    },
    {
      title: 'Responsabilité',
      icon: Shield,
      description: 'Des choix éthiques et transparents pour un numérique citoyen',
      color: COLORS.gold,
    },
    {
      title: 'Durabilité',
      icon: Leaf,
      description: 'Lutter contre l\'obsolescence programmée et réduire l\'impact environnemental',
      color: COLORS.green,
    },
  ]

  const activities = [
    'Sensibiliser les équipes éducatives et les élèves à la sobriété numérique',
    'Encourager la réemploi et le reconditionnement du matériel',
    'Promouvoir l\'usage de Linux afin de lutter contre l\'obsolescence programmée',
    'Mutualiser les ressources et outils libres via la Forge des communs numériques éducatifs',
    'Accompagner les établissements et collectivités dans une transition numérique écoresponsable',
    'Favoriser la co-construction de solutions numériques locales, ouvertes et autonomes',
  ]

  const resources = [
    {
      title: 'Site officiel NIRD',
      url: 'https://nird.forge.apps.education.fr/',
      description: 'La Forge des communs numériques éducatifs',
    },
    {
      title: 'Windows 11 : l\'alternative des logiciels libres',
      url: 'https://linuxfr.org/news/adieu-windows-bonjour-le-libre',
      description: 'Article - Adieu Windows, bonjour le Libre !',
    },
    {
      title: 'Mises à jour de Windows face à l\'obsolescence programmée',
      url: 'https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495',
      description: 'Audio 4 min - France Inter',
    },
    {
      title: 'Logiciel obsolète : l\'État obligé de jeter des milliers d\'ordinateurs ?',
      url: 'https://www.youtube.com/watch?v=76T8oubek-c',
      description: 'Vidéo 3 min - Reportage France Info',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-2xl p-8 transform hover:scale-[1.01] transition-transform" style={{ 
        background: COLORS.beige, 
        border: `6px solid ${COLORS.gold}`,
        boxShadow: `0 10px 30px rgba(0,0,0,0.3), inset 0 2px 5px rgba(255,215,0,0.2)`
      }}>
        <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-black mb-4" style={{ 
            color: COLORS.dark, 
            textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 8px rgba(0,0,0,0.3)`,
            transform: 'rotate(-1deg)'
          }}>
            🛡️ Le Village Numérique Résistant 🛡️
          </h1>
          <p className="text-xl md:text-2xl font-bold mb-4" style={{ 
            color: COLORS.dark,
            textShadow: `2px 2px 0px ${COLORS.gold}`
          }}>
            Comment les établissements scolaires peuvent tenir tête aux Big Tech ?
          </p>
          <p className="text-lg mb-6" style={{ color: COLORS.dark }}>
            Face au Goliath numérique, l'École peut devenir un village résistant, ingénieux, autonome et créatif, 
            à l'image du célèbre village d'Astérix.
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border-4 shadow-lg" style={{ borderColor: COLORS.gold }}>
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: COLORS.dark }}>
            🌟 Qu'est-ce que NIRD ? 🌟
          </h2>
          <p className="text-lg mb-4" style={{ color: COLORS.dark }}>
            <strong>NIRD</strong> (Numérique Inclusif, Responsable et Durable) est une démarche qui permet 
            aux établissements scolaires d'adopter progressivement un numérique libre, responsable et écocitoyen, 
            en redonnant du pouvoir d'agir aux équipes éducatives et en renforçant leur autonomie technologique.
          </p>
          <p className="text-lg" style={{ color: COLORS.dark }}>
            C'est une initiative <strong>de bas</strong> qui cherche à montrer <strong>en haut</strong> qu'il y a 
            urgence à agir pour changer la situation.
          </p>
        </div>
      </div>

      {/* Three Pillars - More Cartoonish */}
      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-110 hover:rotate-2 transition-all duration-300 border-4 cursor-pointer"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`,
                borderColor: pillar.color,
                boxShadow: `0 12px 24px rgba(0,0,0,0.3), inset 0 3px 6px rgba(255,215,0,0.2), 0 0 20px ${pillar.color}40`,
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="text-center mb-4">
                <div 
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 transform hover:scale-125 hover:rotate-12 transition-all shadow-lg"
                  style={{ 
                    background: `radial-gradient(circle, ${pillar.color} 0%, ${pillar.color}dd 100%)`,
                    boxShadow: `0 8px 16px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3), 0 0 20px ${pillar.color}80`
                  }}
                >
                  <Icon size={48} style={{ color: COLORS.beige, filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />
                </div>
                <h3 className="text-2xl font-black mb-2 transform hover:scale-110 transition-transform" style={{ 
                  color: COLORS.dark,
                  textShadow: `3px 3px 0px ${pillar.color}, 0 0 10px ${pillar.color}60`
                }}>
                  {pillar.title}
                </h3>
              </div>
              <p className="text-center leading-relaxed" style={{ color: COLORS.dark }}>
                {pillar.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Impact Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          icon={DollarSign}
          title="Économies"
          value="550€"
          description="Par ordinateur reconditionné"
          color={COLORS.green}
        />
        <StatsCard
          icon={Recycle}
          title="Réduction CO₂"
          value="300kg"
          description="Par ordinateur sauvé"
          color={COLORS.green}
        />
        <StatsCard
          icon={TrendingUp}
          title="Autonomie"
          value="100%"
          description="Contrôle total de votre infrastructure"
          color={COLORS.gold}
        />
      </div>

      {/* Activities Section - More Cartoonish */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] hover:rotate-1 transition-all duration-300" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
        border: `8px solid ${COLORS.gold}`,
        boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(255,215,0,0.2)`
      }}>
        <h2 className="text-4xl font-black mb-6 text-center transform hover:scale-110 transition-transform" style={{ 
          color: COLORS.dark,
          textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.4)`
        }}>
          ⚔️ Les Activités de la Démarche NIRD ⚔️
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-5 rounded-2xl border-4 transform hover:scale-105 hover:rotate-1 transition-all cursor-pointer"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`,
                borderColor: COLORS.gold,
                boxShadow: `0 6px 12px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,215,0,0.2), 0 0 15px rgba(255,215,0,0.2)`
              }}
            >
              <span className="text-3xl transform hover:rotate-12 transition-transform" style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }}>🛡️</span>
              <p className="flex-1 font-medium leading-relaxed" style={{ color: COLORS.dark }}>
                {activity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section - More Cartoonish */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] hover:rotate-1 transition-all duration-300" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
        border: `8px solid ${COLORS.gold}`,
        boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(255,215,0,0.2)`
      }}>
        <h2 className="text-4xl font-black mb-6 text-center transform hover:scale-110 transition-transform" style={{ 
          color: COLORS.dark,
          textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.4)`
        }}>
          📚 Ressources et Documentation 📚
        </h2>
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-2xl border-4 transform hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-pointer"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`,
                borderColor: COLORS.gold,
                boxShadow: `0 6px 12px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,215,0,0.2), 0 0 15px rgba(255,215,0,0.2)`,
                textDecoration: 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-black text-lg mb-1 transform hover:scale-105 transition-transform" style={{ 
                    color: COLORS.dark,
                    textShadow: `2px 2px 0px ${COLORS.gold}`
                  }}>
                    {resource.title}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: COLORS.dark, opacity: 0.9 }}>
                    {resource.description}
                  </p>
                </div>
                <ExternalLink size={28} className="transform hover:rotate-45 transition-transform" style={{ 
                  color: COLORS.gold,
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                }} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.03] hover:rotate-2 transition-all duration-300 border-4" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
        borderColor: COLORS.green,
        boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(0,132,53,0.4)`
      }}>
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4 transform hover:scale-110 transition-transform" style={{ 
            color: COLORS.dark,
            textShadow: `4px 4px 0px ${COLORS.green}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(0,132,53,0.5)`
          }}>
            🧩 Testez vos Connaissances sur NIRD 🧩
          </h2>
          <p className="text-lg mb-6 font-medium" style={{ color: COLORS.dark }}>
            Découvrez notre quiz interactif sur NIRD ! Testez vos connaissances sur le Numérique Inclusif, 
            Responsable et Durable et découvrez si vous êtes un vrai résistant numérique.
          </p>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-10 py-5 rounded-2xl font-black text-2xl transition-all transform hover:scale-125 hover:rotate-3 inline-flex items-center gap-4 shadow-2xl"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.green} 0%, #00a855 100%)`, 
              color: COLORS.beige,
              border: `6px solid ${COLORS.dark}`,
              boxShadow: `8px 8px 0px ${COLORS.dark}, 0 0 30px rgba(0,132,53,0.6), inset 0 2px 4px rgba(255,255,255,0.3)`,
              textShadow: `3px 3px 0px rgba(0,0,0,0.3)`
            }}
          >
            <Play size={28} className="transform hover:scale-125 transition-transform" />
            Commencer le Quiz
            <ArrowRight size={28} className="transform hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Podcast Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.03] hover:rotate-2 transition-all duration-300 border-4" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
        borderColor: COLORS.gold,
        boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(255,215,0,0.4)`
      }}>
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4 transform hover:scale-110 transition-transform" style={{ 
            color: COLORS.dark,
            textShadow: `4px 4px 0px ${COLORS.gold}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(255,215,0,0.5)`
          }}>
            🎙️ Podcast & Vidéos 🎙️
          </h2>
          <p className="text-lg mb-6 font-medium" style={{ color: COLORS.dark }}>
            Plongez dans l'univers de NIRD à travers nos podcasts et vidéos ! Découvrez des témoignages, 
            des retours d'expérience et des explications détaillées sur la résistance numérique.
          </p>
          <button
            onClick={() => onNavigate('podcast')}
            className="px-10 py-5 rounded-2xl font-black text-2xl transition-all transform hover:scale-125 hover:rotate-3 inline-flex items-center gap-4 shadow-2xl"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.gold} 0%, #ffed4e 100%)`, 
              color: COLORS.dark,
              border: `6px solid ${COLORS.dark}`,
              boxShadow: `8px 8px 0px ${COLORS.dark}, 0 0 30px rgba(255,215,0,0.6), inset 0 2px 4px rgba(255,255,255,0.3)`,
              textShadow: `3px 3px 0px rgba(0,0,0,0.3)`
            }}
          >
            <Play size={28} className="transform hover:scale-125 transition-transform" />
            Voir les Vidéos
            <ArrowRight size={28} className="transform hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Call to Action - Secondary Challenge - More Cartoonish */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-[1.03] hover:rotate-2 transition-all duration-300 border-4" style={{ 
        background: `linear-gradient(135deg, ${COLORS.beige} 0%, #fff8e1 100%)`, 
        borderColor: COLORS.red,
        boxShadow: `0 15px 40px rgba(0,0,0,0.4), inset 0 3px 8px rgba(255,215,0,0.3), 0 0 30px rgba(219,40,28,0.4)`
      }}>
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4 transform hover:scale-110 transition-transform" style={{ 
            color: COLORS.dark,
            textShadow: `4px 4px 0px ${COLORS.red}, 6px 6px 12px rgba(0,0,0,0.3), 0 0 20px rgba(219,40,28,0.5)`
          }}>
            🎮 Défi Secondaire : L'Ergonomie Infernale 🎮
          </h2>
          <p className="text-lg mb-6 font-medium" style={{ color: COLORS.dark }}>
            Découvrez notre défi Sopra Steria : un champ de saisie volontairement frustrant à utiliser !
            Une expérience qui illustre l'importance de l'ergonomie dans le design.
          </p>
          <button
            onClick={() => onNavigate('challenge')}
            className="px-10 py-5 rounded-2xl font-black text-2xl transition-all transform hover:scale-125 hover:rotate-3 inline-flex items-center gap-4 shadow-2xl"
            style={{ 
              background: `radial-gradient(circle, ${COLORS.red} 0%, #b91c1c 100%)`, 
              color: COLORS.beige,
              border: `6px solid ${COLORS.dark}`,
              boxShadow: `8px 8px 0px ${COLORS.dark}, 0 0 30px rgba(219,40,28,0.6), inset 0 2px 4px rgba(255,255,255,0.3)`,
              textShadow: `3px 3px 0px rgba(0,0,0,0.3)`
            }}
          >
            <Play size={28} className="transform hover:scale-125 transition-transform" />
            Tenter le Défi
            <ArrowRight size={28} className="transform hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage

