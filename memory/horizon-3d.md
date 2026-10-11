# Moteur 3D, générateur de plans & catalogue — Rayonnage Horizon

**Toujours partir des outils de Samuel. Ne pas réinventer.** THREE **r128 INLINÉ**, jamais
de CDN (les générateurs lisent `vendor/three-r128-inline.html`). Viewers HTML **autonomes**
(~2,6 Mo), repli `#nowebgl`. Captures 2400×1500 (ANGLE/RTX 3050), vérif « conforme
(**tolérance 1/16 po**) ».

## Deux dépôts

**1. `cockpit` → générateur de PLANS** (`outils/visuel-plans/`) :
`gen-visuel.js`, `capturer.js`, `types/dome.js`, `dome-accessoires.js`, `dome-pieces.js`,
`_cartouche.js`, `lire-plan.js`, `gen-accessoires.js`. Schéma **cantilever / porte-à-faux**
dans `gen-visuel.js`.

**2. `horizon-3d-studio/horizon-3d-lib` → lib `H3D`** :
`horizon3d.js`, `gen_catalog.py`, `gen_viewer.py`, `gen_vue_piece.py`, `planche.py`,
**`rackfeet.js`** (= le détail réel des pièces de palettier, cœur de « Rack Plan Studio »),
`catalog-detail.js`, `catalog.html`, `INVENTAIRE-3D.html`, `ext-reach/girafe/charges.js`,
`filmer.js`.

## Catalogue (confirmé : **77 pièces**, `H3D.catalog.length → 77`)

Catégories : Protecteurs Camrack · Palettier · Mezzanine & escaliers · Bâtiment · Machines ·
Sécurité au sol · Charges · Accessoires de levage · Chariots.
- Chariot élévateur à mât rétractable : **Raymond 7500-R45TT** (`ext-reach.js`,
  `H3D.reachTruck v1.4.0`) — allée min 108 po `[À COMPLÉTER / à confirmer]`.
- Porte-à-faux : **Cogan 561001** (artefact « Porte-à-faux Cogan 561001 »).
- Cadre/échelle de fabrication : **RH-ECH-4214** (exemple du guide ; dessins d'atelier cotés).
- [Détail complet des 77 pièces + table de charge poutres **CL** : vit dans `catalog.html` /
  `INVENTAIRE-3D.html` du système réel ; CL non retrouvée dans les sessions → `a-completer.md`.]

## Qualité des viewers

Priorité : **détail des pièces** (montants + perforations, lisses + angles, barres de
sécurité, ancrages, trous, quincaillerie) **avant** rendu/éclairage. Tolérances et
annotations utiles. **Simulation d'assemblage** = ordre A/B/C. 3D mécaniquement exacte :
rien ne traverse les montants ni les poutres.

## Dômes (fournisseur **Norseman**, séries QL / QC / QP / ARCH)

- Pour **J.P. Binette** (forfait). Jobs au format **NS-26-XXX**.
- **Pharand = NS-26-324** (dessins SO19562 / 20782, client J.P. Binette Victoriaville,
  **QL40×80**). Modèle **EW-1** exact : 2 poteaux, 1 lisse HZ-1, 3 tubes 2×3, 4 treuils.
- Accessoires de bout cotés (n° Norseman) : poteau de vent **HSS 4×4** (embase 33300212,
  14'-4" c/c) · lisse **HZ-1** (32000060 + 330550, à 10'-0") · tube 2×3 **FT-1/FT-2** ·
  toile de bout **SO19562-400** · selle 33100810 / 330182 · jambages 4×6 / 4×8 · évent
  30000455 · fermes QL40 30003020 / 30003025, pieds 30003350 / 30003355 / 30003360.
- **7 types de portes** + persienne + **ventilateur 36 po** + luminaire **DEL**.
- Autres jobs dômes vus : NS-26-991 (conteneurs), NS-26-124 (Favreau), NS-25-688 (Ultratec).

> Les **règles de dessin de palettier** (cotes mur→rack, 8", montants 3", clairance vs
> entraxe, lisses 8'/12', légende, A/B/C, barres de sécurité) sont dans `horizon-plans.md`
> (source : guide/préf. ; pas revues dans les sessions dômes minées).
