# Défi Sopra Steria - L'Ergonomie : Simplifier pour mieux vivre

## 🎯 Concept du Défi

**"Si une machine doit être notre servante, elle doit être conçue pour être facile à utiliser."** - Donald Norman

**Exceptionnellement, nous faisons l'inverse !**

## 🎮 Notre Solution : BureaucraticMiner

Un champ de saisie **volontairement frustrant** qui transforme la saisie d'un nom en un jeu de type "Gold Miner" où l'utilisateur doit collecter manuellement chaque lettre de son nom.

### 📍 Localisation du Champ

Le champ de saisie frustrant se trouve dans le **formulaire d'inscription** :
- **Phase 1** : Formulaire initial avec Prénom et Nom
- **Phase 2** : Vérification d'identité via le jeu (le champ frustrant)
- **Phase 3** : Formulaire complet après vérification

**Lien direct vers le champ** : Après avoir rempli Prénom et Nom, cliquez sur "Vérifier mon Identité" → Le jeu de vérification s'affiche.

## 🎨 Caractéristiques de Frustration

### 1. **Mécanique de Jeu Complexe**
- Crochet oscillant automatiquement (pendule)
- Clic sur le canvas pour lancer le crochet
- Vitesse de remontée **extrêmement lente** avec objet (1 pixel/frame)
- Vitesse de remontée rapide sans objet

### 2. **Système de Blocage**
- Si une mauvaise lettre est collectée → **BLOCAGE COMPLET**
- Impossible de continuer sans utiliser l'effaceur (🗑️)
- Message d'erreur : "Erreur de saisie ! Veuillez supprimer."

### 3. **Frustrations Multiples**
- Lettres flottantes avec animations (difficile à viser)
- Nombreuses lettres distractrices
- Nécessité de collecter dans l'ordre exact
- Même les espaces doivent être minés (représentés par "_")
- Rafraîchissement des positions après chaque action

### 4. **Thème Astérix & Obélix**
- Style cartoon avec palette de couleurs gauloises
- Astérix sur le crochet (personnage qui mine)
- Pioche qui oscille
- Fond de village gaulois
- Pépites d'or 2x plus grandes avec lettres

## 🎯 Originalité

1. **Concept unique** : Transformation d'un champ de saisie en mini-jeu
2. **Thème narratif** : Intégration du thème Astérix vs l'Empire numérique
3. **Mécaniques multiples** : Oscillation, collision, blocage, rafraîchissement
4. **Expérience complète** : Formulaire → Vérification → Formulaire complet

## ✅ Théoriquement Possible

Le champ est **théoriquement possible** à remplir :
- Toutes les lettres nécessaires sont toujours disponibles
- Un effaceur est toujours disponible pour débloquer
- Instructions claires
- Feedback visuel (progression, lettres validées)
- Pas de soft-lock possible

## 📧 Soumission

**Lien de la page** : [URL de votre déploiement]

**Champ concerné** : Le champ de vérification d'identité (Phase 2) qui apparaît après avoir rempli Prénom et Nom dans le formulaire initial.

**Email** : maxime.granjou@soprasteria.com

## 🛠️ Technologies

- React 18.2.0
- Canvas API pour le rendu du jeu
- requestAnimationFrame pour animations fluides (60 FPS)
- Tailwind CSS pour le styling
- Lucide React pour les icônes
- Images personnalisées (Astérix, pioche, pépites d'or, fond)

## 🎨 Palette de Couleurs Astérix

- **Or** : #ffd700
- **Beige** : #f8e0b1
- **Noir foncé** : #1a171e
- **Vert** : #008435
- **Rouge** : #db281c

## 🚀 Déploiement

1. Build : `npm run build`
2. Déployer le dossier `dist/` sur votre hébergeur
3. S'assurer que les images sont dans `/public/` :
   - `asterix_character.png`
   - `pickaxe.png`
   - `gold_nugget.png`
   - `background.png`
   - `world.jpg`

---

**Bonne chance pour le défi ! 🛡️⚔️**

