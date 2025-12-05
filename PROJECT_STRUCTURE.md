# Structure du Projet - Nuit de l'Info 2025

## 📁 Organisation des Fichiers

```
nuit d'info/
├── public/
│   ├── asterix_character.png      # Image d'Astérix pour le jeu
│   ├── gold_nugget.png            # Image des pépites d'or
│   ├── pickaxe.png                # Image de la pioche
│   ├── background.png              # Fond du canvas de jeu
│   └── world.jpg                   # Fond global de l'application
│
├── src/
│   ├── pages/
│   │   └── HomePage.jsx           # Page principale NIRD (défi principal)
│   │
│   ├── components/
│   │   ├── BureaucraticMiner.jsx  # Jeu secondaire (défi Sopra Steria)
│   │   └── StatsCard.jsx          # Composant de statistiques
│   │
│   ├── App.jsx                     # Composant principal avec navigation
│   ├── main.jsx                    # Point d'entrée React
│   └── index.css                   # Styles globaux
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Pages et Navigation

### Page Principale (`HomePage.jsx`)
- **Objectif** : Présenter la démarche NIRD
- **Contenu** :
  - Hero section avec présentation de NIRD
  - Les trois piliers (Inclusion, Responsabilité, Durabilité)
  - Statistiques d'impact
  - Activités de la démarche
  - Ressources et documentation
  - Lien vers le défi secondaire

### Page Secondaire (`BureaucraticMiner.jsx`)
- **Objectif** : Défi Sopra Steria - L'Ergonomie Infernale
- **Contenu** : Jeu de saisie frustrant pour illustrer l'importance de l'ergonomie
- **Accès** : Via le bouton "Tenter le Défi" sur la page principale

## 🎨 Style et Thème

### Palette de Couleurs Astérix
```javascript
const COLORS = {
  gold: '#ffd700',      // Or
  beige: '#f8e0b1',    // Beige
  dark: '#1a171e',     // Noir foncé
  green: '#008435',    // Vert
  red: '#db281c',      // Rouge
}
```

### Style Visuel
- Style cartoon inspiré d'Astérix
- Animations et transitions fluides
- Boutons avec effets hover (scale, rotate)
- Ombres et bordures prononcées
- Fond `world.jpg` avec overlay beige

## 🚀 Fonctionnalités

### Navigation
- Navigation simple basée sur l'état React (pas de router externe)
- Boutons de navigation dans le header
- Scroll automatique en haut lors du changement de page

### Composants Réutilisables
- `StatsCard` : Carte de statistiques avec icône
- Style cohérent à travers toute l'application

## 📝 Notes Importantes

1. **Défi Principal** : La page d'accueil présente NIRD (conforme à l'énoncé)
2. **Défi Secondaire** : Le jeu BureaucraticMiner est sur une page séparée (conforme à la demande Sopra Steria)
3. **Licence Libre** : Toutes les ressources utilisées sont libres de droit
4. **Responsive** : Design adaptatif pour mobile et desktop

## 🔗 Ressources Externes

- Site officiel NIRD : https://nird.forge.apps.education.fr/
- Vidéos et articles référencés dans `HomePage.jsx`

