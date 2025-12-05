# Dimensions du Canvas pour le Fond

## Dimensions Totales
- **Largeur (GAME_WIDTH)**: 800 pixels
- **Hauteur (GAME_HEIGHT)**: 600 pixels

## Zones du Canvas

### Zone Village (Haut)
- **Position Y**: 0 à ~150 pixels
- **Description**: Zone où se trouve le village gaulois, Astérix, et le point de pivot du crochet
- **Point de pivot (ORIGIN_X, ORIGIN_Y)**: (400, 50) - Centre horizontal, 50px du haut
- **Astérix**: Positionné à (400, 50) avec une taille de 400x400 pixels (8x plus grand)

### Zone de Jeu / Mine (Milieu)
- **Position Y**: ~150 à 580 pixels
- **Description**: Zone où les pépites d'or (lettres) apparaissent et peuvent être collectées
- **Spawn des objets**: Entre Y = 100 et Y = 580 (éviter les 20px du sol)

### Zone Sol / Terre (Bas)
- **Position Y**: 580 à 600 pixels (20 pixels de hauteur)
- **Description**: Sol où les pépites d'or sont "enterrées"
- **Couleur actuelle**: Vert (#008435)

## Coordonnées Importantes

- **Point de pivot du crochet**: X = 400, Y = 50
- **Longueur maximale du crochet**: 550 pixels
- **Zone de spawn des objets**: 
  - X: 50 à 750 pixels
  - Y: 100 à 580 pixels
- **Taille des pépites d'or**: 50x50 pixels (GOLD_NUGGET_SIZE)

## Recommandations pour le Fond

1. **Village (0-150px)**: Maisons gauloises, Astérix visible, point de pivot visible
2. **Zone de jeu (150-580px)**: Terre/roche où l'or est miné, peut avoir des textures de sol
3. **Sol (580-600px)**: Herbe ou terre visible, 20px de hauteur

## Format d'Image
- **Dimensions**: 800x600 pixels
- **Format recommandé**: PNG avec transparence si nécessaire
- **Nom du fichier**: `canvas_background.png` (à placer dans `/public/`)

