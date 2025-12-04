# Nuit de l'Info 2025 - Défi Sopra Steria

## BureaucraticMiner - Le Champ de Saisie le Plus Frustrant

Une application web interactive qui transforme la saisie d'un nom en un jeu de type "Gold Miner" où l'utilisateur doit "miner" les lettres de son nom dans l'ordre exact.

### 🎯 Concept

Par mesure de sécurité renforcée (Norme ISO-9999), l'utilisateur doit confirmer son identité en collectant manuellement les fragments de son nom à l'aide d'un crochet qui oscille comme un pendule.

### 🎮 Mécaniques de Frustration

- **Phase 1** : Saisie normale du nom complet
- **Phase 2** : Le joueur doit miner chaque lettre de son nom dans l'ordre exact
- **Crochet oscillant** : Le crochet se balance automatiquement, rendant la visée difficile
- **Vitesse de remontée** : Extrêmement lente quand le crochet transporte un objet (2 pixels par frame)
- **Système de blocage** : Si une mauvaise lettre est collectée, le système se bloque et nécessite un "effaceur" pour débloquer
- **Lettres distractrices** : De nombreuses lettres incorrectes flottent pour confondre l'utilisateur
- **Gestion des espaces** : Même les espaces doivent être minés (représentés par "_")

### 🛠️ Technologies

- **React** 18.2.0
- **Vite** pour le build
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Canvas API** pour le rendu du jeu
- **requestAnimationFrame** pour la boucle de jeu

### 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

### 🎨 Palette de Couleurs

- **Sopra Purple** : #6B46C1
- **Sopra Grey** : #4B5563
- **Admin Blue** : #1E40AF

### 🎯 Fonctionnalités

1. **Saisie initiale** : Champ de texte standard pour entrer le nom
2. **Génération dynamique** : Les lettres du nom sont générées comme objets à collecter
3. **Physique du crochet** :
   - Mouvement pendulaire automatique
   - Extension au clic
   - Remontée lente avec objet, rapide sans objet
4. **Détection de collision** : Détection précise entre le crochet et les objets
5. **Système de validation** :
   - Lettres correctes dans l'ordre → progression
   - Lettres incorrectes → blocage nécessitant un effaceur
6. **Barre de progression** : Affichage visuel de l'avancement
7. **Indicateurs visuels** : 
   - Lettre actuelle surlignée
   - Lettres validées en vert
   - Lettres en attente en gris

### 🚀 Déploiement

L'application doit être en ligne à la fin de la Nuit de l'Info pour être évaluée.

Pour déployer :
1. Build l'application : `npm run build`
2. Déployer le dossier `dist` sur votre hébergeur (Vercel, Netlify, GitHub Pages, etc.)

### 📧 Soumission

Envoyer le lien de la page contenant le champ à : maxime.granjou@soprasteria.com

### 📝 Licence

Ce projet est sous licence libre (conformément aux exigences de la Nuit de l'Info 2025).

### 🎭 Inspiration

Inspiré par l'article : https://qz.com/679782/programmers-imagine-the-most-ridiculous-ways-to-input-a-phone-number

---

**Bonne chance et amusez-vous bien !** 🎉

