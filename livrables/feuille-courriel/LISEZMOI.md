# Feuille de temps → Courriel

Bouton **✉ Courriel** à poser à côté d'une feuille de temps. Au clic, il ouvre un
**brouillon Outlook web pré-rempli** (objet, corps, CC). **Rien n'est envoyé** — Samuel envoie.

## Fichiers
- `stella-feuille-courriel.js` — le module à greffer (sans dépendance, aucune réécriture d'Outlook).
- `demo.html` — démo cliquable (publiée en artefact) pour voir le résultat.

## Où ça va
Page **/feuille** du cockpit Stella (port 4317), fichier **`stella_extras_ui.js`** (zone Claude).
Ne pas toucher `stella_operations_ui.js` (zone Codex).

## Greffe
```js
// 1. Charger le module une fois
<script src="stella-feuille-courriel.js"></script>

// 2. À côté de chaque feuille validée
const btn = FeuilleCourriel.creerBouton(
  () => feuilleCourante(),                           // { client, semaine, chef, lignes:[{nom,travail,deplacement,formation}] }
  { to: '', cc: 'logistiques@rackinghorizon.com' }   // destinataire à confirmer
);
ligneFeuille.appendChild(btn);
```

## Règles respectées
- **★ formation** jamais comptée dans le total facturable.
- Total = **travail + déplacement**, jamais le matériel.
- **Aucun envoi** : ouvre un brouillon, c'est tout.
- Destinataire **non inventé** → `[À COMPLÉTER]` tant que Samuel ne confirme pas à qui la feuille part.
- CC par défaut = **logistiques@rackinghorizon.com** (boîte centrale).

## À confirmer avec Samuel
- **À qui** partent les feuilles de temps (Lyna / Alexandre / autre).
- Si une pièce jointe PDF doit s'ajouter (un lien courriel ne peut pas attacher seul → glisser-déposer).
