# 🚀 Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer l'application "Le Village Numérique Résistant" sur Vercel.

## 📋 Prérequis

1. Un compte GitHub (gratuit)
2. Un compte Vercel (gratuit, connectez-vous avec GitHub)
3. Node.js installé localement (pour tester avant le déploiement)

## 📁 Structure des Fichiers Requis

Assurez-vous que votre projet contient tous ces fichiers dans le dossier `public/` :

```
public/
├── asterix_character.png    ✅ Image d'Astérix (requis)
├── gold_nugget.png          ✅ Image des pépites d'or (requis)
├── pickaxe.png              ✅ Image de la pioche (requis)
├── background.png            ✅ Fond du canvas de jeu (requis)
└── world.jpg                ✅ Fond global de l'application (requis)
```

## 🎬 Étapes de Déploiement

### Étape 1 : Préparer le Projet

1. **Vérifier que tous les fichiers sont présents** :
   ```bash
   # Dans le dossier du projet
   ls public/
   ```
   Vous devriez voir :
   - `asterix_character.png`
   - `gold_nugget.png`
   - `pickaxe.png`
   - `background.png`
   - `world.jpg`

2. **Tester localement** (optionnel mais recommandé) :
   ```bash
   npm install
   npm run dev
   ```
   Ouvrez `http://localhost:5173` et vérifiez que tout fonctionne.

3. **Tester le build** :
   ```bash
   npm run build
   npm run preview
   ```
   Vérifiez que le build fonctionne sans erreurs.

### Étape 2 : Créer un Repository GitHub

1. **Créer un nouveau repository sur GitHub** :
   - Allez sur [github.com](https://github.com)
   - Cliquez sur "New repository"
   - Nommez-le (ex: `nuit-info-2025`)
   - Ne cochez PAS "Initialize with README" (si vous avez déjà des fichiers)
   - Cliquez sur "Create repository"

2. **Pousser votre code sur GitHub** :
   ```bash
   # Dans le dossier du projet
   git init
   git add .
   git commit -m "Initial commit - Nuit de l'Info 2025"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/nuit-info-2025.git
   git push -u origin main
   ```

### Étape 3 : Déployer sur Vercel

1. **Se connecter à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up" ou "Log In"
   - Choisissez "Continue with GitHub"
   - Autorisez Vercel à accéder à votre GitHub

2. **Importer le projet** :
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre repository `nuit-info-2025`
   - Vercel détectera automatiquement que c'est un projet Vite

3. **Configuration du projet** :
   - **Framework Preset** : Vite (détecté automatiquement)
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (déjà configuré)
   - **Output Directory** : `dist` (déjà configuré)
   - **Install Command** : `npm install` (déjà configuré)

4. **Variables d'environnement** :
   - Aucune variable d'environnement nécessaire pour ce projet
   - Cliquez sur "Deploy"

### Étape 4 : Vérifier le Déploiement

1. **Attendre la fin du build** :
   - Vercel va automatiquement :
     - Installer les dépendances (`npm install`)
     - Builder le projet (`npm run build`)
     - Déployer sur leur CDN

2. **Vérifier les images** :
   - Une fois déployé, visitez votre URL (ex: `https://nuit-info-2025.vercel.app`)
   - Vérifiez que toutes les images s'affichent :
     - ✅ Astérix dans le jeu
     - ✅ Pépites d'or
     - ✅ Pioche
     - ✅ Fond du canvas
     - ✅ Fond global (world.jpg)

3. **Tester toutes les pages** :
   - 🏠 Page d'accueil
   - 🧩 Quiz
   - 🎙️ Podcast (placeholder)
   - 🎮 Défi Sopra Steria

## 🎥 Ajouter une Vidéo au Podcast

Quand vous voulez ajouter une vidéo :

1. **Placer la vidéo dans `public/`** :
   ```
   public/
   └── podcast-video.mp4  (ou .webm, .ogg)
   ```

2. **Modifier `src/App.jsx`** (section podcast) :
   ```jsx
   {currentPage === 'podcast' && (
     <div className="max-w-4xl mx-auto">
       <div className="bg-white rounded-3xl shadow-2xl p-8">
         <video 
           controls 
           className="w-full rounded-2xl"
           style={{ border: `4px solid ${COLORS.gold}` }}
         >
           <source src="/podcast-video.mp4" type="video/mp4" />
           Votre navigateur ne supporte pas la vidéo.
         </video>
       </div>
     </div>
   )}
   ```

3. **Commit et push** :
   ```bash
   git add .
   git commit -m "Add podcast video"
   git push
   ```
   Vercel redéploiera automatiquement !

## 🔧 Résolution de Problèmes

### Les images ne s'affichent pas

1. **Vérifier les chemins** :
   - Les images doivent être dans `public/`
   - Les chemins dans le code doivent commencer par `/` (ex: `/world.jpg`)

2. **Vérifier les noms de fichiers** :
   - Respectez la casse exacte : `world.jpg` ≠ `World.jpg`
   - Pas d'espaces dans les noms

3. **Vérifier la console du navigateur** :
   - Ouvrez les DevTools (F12)
   - Onglet "Console" pour voir les erreurs
   - Onglet "Network" pour voir les requêtes d'images

### Le build échoue

1. **Vérifier les erreurs dans Vercel** :
   - Allez dans votre projet sur Vercel
   - Cliquez sur "Deployments"
   - Cliquez sur le dernier déploiement
   - Regardez les logs pour voir l'erreur

2. **Tester localement** :
   ```bash
   npm run build
   ```
   Si ça échoue localement, ça échouera sur Vercel.

### Les routes ne fonctionnent pas

- Le fichier `vercel.json` est déjà configuré avec les rewrites nécessaires
- Toutes les routes pointent vers `index.html` (SPA)

## 📝 Checklist de Déploiement

Avant de déployer, vérifiez :

- [ ] Toutes les images sont dans `public/`
- [ ] `package.json` contient les scripts `build` et `dev`
- [ ] `vercel.json` est présent à la racine
- [ ] Le projet build sans erreurs localement (`npm run build`)
- [ ] Le code est poussé sur GitHub
- [ ] Le repository est connecté à Vercel

## 🌐 URLs et Domaines

- **URL par défaut** : `https://votre-projet.vercel.app`
- **Domaine personnalisé** : Vous pouvez ajouter votre propre domaine dans les paramètres Vercel

## 🔄 Mises à Jour

Chaque fois que vous poussez du code sur GitHub :
- Vercel détecte automatiquement les changements
- Il rebuild et redéploie automatiquement
- Vous recevez une notification par email

## 📞 Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Documentation Vite** : [vitejs.dev](https://vitejs.dev)

---

**Bon déploiement ! 🚀**

