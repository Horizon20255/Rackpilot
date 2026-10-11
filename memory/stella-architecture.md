---
name: stella-architecture
description: Architecture de Stella : PC, ports, services, cockpit, porte d'entrée, Codex, tri courriels
metadata:
  node_type: memory
  type: project
  originSessionId: session_01WJVxmCph7uBKyUiWE2K94Q
  modified: 2026-10-11
---

# Architecture de Stella (système perso de Samuel)

> Reconstruit depuis le tri des sessions (oct. 2026). Stella vit sur **UN PC Windows**
> (`C:\Users\samue`), Python 3.14 + Node. Compagnie « Rayonnage Horizon inc. ».
> `rackinghorizon.com` reste hébergé chez **CrocWeb/LiteSpeed**, intact.

## Services & ports (localhost)

| Port | Service | Rôle |
|---|---|---|
| **8765** | `HORIZON.html` via `serveur_horizon.py` (Cache-Control no-store) | Interface « Stella — L'ensemble de vos opérations » |
| **8766** | `assistant_service.py` + `operations.config.json` | L'assistant **« la bulle »** |
| **4317** | orchestrateur **Node** (cockpit) | Cockpit / outils |
| **8790** | `portail-stella.js` | **Portail Stella** pour les collègues (cible du tunnel) |

- Lanceur : **`demarrer_horizon.py`**. Gardien : **GardeServices = `outils/garde-services.js`**
  (relance tout seul ; PC « jamais en veille »).
- `HORIZON.html` est **reconstruit par `regenerer-horizon.js`** en concaténant
  **`stella_operations_ui.js` (édité par CODEX)** + **`stella_extras_ui.js` (édité par
  CLAUDE)**. Moteur : `horizon.py` / `horizon.config.json`.
- Outils cockpit : `ronde-courriels.js`, `horaire-du-jour.js`, `pont-courriels.js` (pont
  **n8n**, `POST /api/courriel/tries/injecter`), `mon-espace.js`, `portail-stella.js`.
  Données dans `dev\cockpit\data\`.

## Coordination Claude ↔ Codex

**Codex** = agent de codage séparé qui travaille sur Stella en parallèle (style, UI
opérations). **Laisser son travail tranquille, éditer de façon ciblée.** Claude touche
`stella_extras_ui.js`, Codex touche `stella_operations_ui.js`. Coordination via la fiche
[[coordination-claude-codex]].

## Accès distant — « la porte d'entrée »

- **Cloudflare Tunnel (`cloudflared`) + Zero Trust (One-time PIN par courriel)** →
  `stella.<domaine>` vers `127.0.0.1:8790`.
- Domaine dédié visé : **`stella-horizon.com`** (~15 $/an ; pas encore confirmé acheté).
- **Statut : attend le GO de Samuel** (session « Plan gestion mémoire Stella »). Les 15 min
  de Samuel = créer le compte Cloudflare + acheter le domaine (sa carte, ses mots de passe).
- Gratuit jusqu'à 50 personnes. 24/7 réel = migration vers un **serveur loué** plus tard.

## Portail par rôle (`roles.json`)

- **Employé** → Mon espace.
- **Collègue** → Clavardage / Calendrier / Jobs.
- **Direction** → + tableau de bord / Rack Plan Studio / dossiers.
- **Samuel (admin)** → tout.
- (App Next.js parallèle `horizon-app` : rôles `admin | ventes | operations | installateur`.)

## Tri des courriels (ronde Claude */30, 5 h-22 h, modèle Haiku)

Filet par-dessus n8n, via le connecteur **Microsoft 365**. 10 catégories :
`soumission-racking`, `soumission-dome`, `opinion`, `feuille-de-temps`, `rapport-chef`,
`horaire`, `facturation`, `info-client`, `conversation`, `bruit`.

## Projets du dossier `dev\` (les vrais « domaines séparés »)

`cockpit`, `horizon-app` (Next.js + Supabase sur **Vercel**, `app.rackinghorizon.com`,
suspendu/402 au test ; ~35 routes), `horizon-app-horaire`, `horizon-ai-site`,
`horizon-3d-studio`, `story-studio`, `racking-horizon-site`, `horizon-deploy`, `e3-pieces`,
`hockey-stats`, `rocheleau-cogan`, `claude-setup`.

## Mémoire réelle de Stella

- **Fiches `.md`** avec **frontmatter YAML + liens `[[...]]`**, dans
  `C:\Users\samue\.claude\projects\...\memory\`.
- Fiches vues : [[ronde-courriels-30min]], [[stella-mon-espace-employes]],
  [[site-racking-horizon-deploiement]], [[stella-extras-ui]], [[coordination-claude-codex]],
  [[gardien-services-et-quota-n8n]], [[brouillons-outlook-recette-sans-ecrasement]],
  [[mac-migration-username-change]], etc.
- ⚠️ Format à harmoniser : la présente base `memory/` est en markdown simple ; les fiches
  réelles de Stella ont du frontmatter YAML + wikilinks → voir [[a-completer]].

## Identité de marque

- Palette : **NAVY `#0f2a4a`**, **GOLD** (`#c9a227` d'une source, `#C9A24A` d'une autre —
  à confirmer), bloc « Stella : identité commune » / `palette-horizon-v2`.
- Numéros de taxes (gabarits) : **TPS `755539541RT0001`**, **TVQ `1230056541TQ0001`**.
