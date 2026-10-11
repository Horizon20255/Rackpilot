---
name: horizon-plans
description: Règles de dessin des plans de rayonnage, livrables, style de référence
metadata:
  node_type: memory
  type: project
  originSessionId: session_01WJVxmCph7uBKyUiWE2K94Q
  modified: 2026-10-11
---

# Plans de rayonnage — la manière de Samuel

**Toujours partir des outils de Samuel** : skill plans, Rack Plan Studio, job-analyzer,
bibliothèque 3D, repo `horizon-3d-studio` (voir [[horizon-3d]]). **Jamais un croquis
brouillon.** Style de référence : **ITC/AREIC, Pedlex, E3**.

## Règles de dessin (perfection au millimètre)

- Le **contour de la salle du client** est reproduit **exactement**.
- Les **cotes partent du mur de la bâtisse** jusqu'au rayonnage.
- **Colonnes de bâtisse placées exactement.** Le rayonnage est **entre** les colonnes,
  **jamais dedans**.
- **8" de dégagement minimum** entre un rack et un mur.
- **Montants de 3" comptés dans toute longueur.**
- **Cote de travée = clairance** (ex. 8'-0"), **jamais l'entraxe**.
- **Lisses standard 8' et 12'.**
- **Longueur écrite dans chaque section.**
- **Légende : une couleur par grandeur de travée.**
- **Lettres A, B, C = ordre d'installation.**
- **Sens de chargement au chariot indiqué.**
- **Nombre de barres de sécurité par niveau.**
- **Toutes les pièces nommées.**

## Livrables pour chaque plan

1. Le plan.
2. La **fiche matériel**, quantités **à la lettre**.
3. Un **plan de niveaux** si utile.
4. Une **vue 3D mécaniquement exacte** : rien ne traverse les montants ni les poutres.

## Vérification avant de montrer

Contrôler le plan contre le **plan client / la photo / le fichier réel**. Vérifier cotes
et dégagements. Quand Samuel corrige un point → **appliquer la correction partout.**

## Outils de génération (voir [[horizon-3d]])

- Générateur de plans : `cockpit/outils/visuel-plans/` (`gen-visuel.js`, `_cartouche.js`,
  `lire-plan.js`…). Schéma **cantilever / porte-à-faux** dans `gen-visuel.js`.
- Détail des pièces : `horizon-3d-studio/horizon-3d-lib` (`rackfeet.js` = cœur de Rack Plan
  Studio). THREE **r128 inliné**, viewers autonomes. Vérif « conforme (**tolérance 1/16 po**) ».
- [`job-analyzer` cité dans le guide, pas retrouvé dans les sessions → [[a-completer]].]

## Dessin de pièces (fabrication)

Pour un cadre de palettier soudé ou une pièce de fabrication (ex. **RH-ECH-4214**),
produire les **dessins d'atelier** avec cotes complètes. Les dessins de pièces physiques
(session « Retravail des objets ») = PDF **reportlab**, couleurs de marque, réf. Pedlex /
Konstant / Ridg-U-Rak / Damotech / Uline, Guide CSST.

## Normes & formation

Syllabus de formation installation/réparation de rayonnage, avec mises à jour normatives :
**CSA A344:24**, **CSA S345**, cadre **LSST / CNESST / ASP Construction**. Conformité des
mezzanines près des colonnes : séparation sismique, **CNB**.
