/*
 * Stella — bouton « Envoyer la feuille de temps par courriel »
 * À greffer dans la page /feuille (cockpit, port 4317), fichier stella_extras_ui.js.
 * Ouvre un NOUVEAU brouillon pré-rempli dans Outlook web. N'ENVOIE RIEN, n'écrase rien.
 *
 * Usage :
 *   const feuille = {
 *     client: 'NS-26-401 — Palmarolle',   // nom du client / job
 *     semaine: '2026-10-12',              // date absolue YYYY-MM-DD
 *     chef: 'Maxime Adam',
 *     lignes: [
 *       { nom: 'Maxime Adam', travail: 40, deplacement: 6, formation: false },
 *       { nom: 'Vincent Lebrun', travail: 38, deplacement: 6, formation: false },
 *       { nom: 'Recrue', travail: 8, deplacement: 0, formation: true }  // ★ non facturée
 *     ]
 *   };
 *   FeuilleCourriel.ouvrirBrouillon(feuille, {
 *     to: '',                                        // destinataire — à confirmer, ne rien inventer
 *     cc: 'logistiques@rackinghorizon.com'           // boîte centrale en CC
 *   });
 */
(function (global) {
  'use strict';

  // Adresses connues — Samuel choisit/complète. NE RIEN INVENTER.
  var CONTACTS = {
    lyna:        'lfortin@gestionjgp.ca',            // Lyna Fortin (compta / paie)
    alexandre:   'a.chevrier@operationpc.ca',        // Alexandre Chevrier (PDG)
    logistiques: 'logistiques@rackinghorizon.com',   // boîte centrale — toujours en CC
    horaire:     'horaire@rackinghorizon.com'        // calendrier d'équipe
  };

  function fmtHeures(n) {
    var v = Math.round((Number(n) || 0) * 2) / 2;    // arrondi au ½ h
    return Number.isInteger(v) ? String(v) : v.toFixed(1);
  }

  function totalFacturable(f) {
    return (f.lignes || []).reduce(function (t, l) {
      if (l.formation) return t;                      // ★ formation : jamais facturée
      return t + (Number(l.travail) || 0) + (Number(l.deplacement) || 0);
    }, 0);
  }

  function construireSujet(f) {
    var client = f.client || '[À COMPLÉTER — client/job]';
    var sem = f.semaine ? 'semaine du ' + f.semaine : '[semaine À COMPLÉTER]';
    return 'Feuille de temps — ' + client + ' — ' + sem;
  }

  function construireCorps(f) {
    var client = f.client || '[À COMPLÉTER — client/job]';
    var sem = f.semaine || '[À COMPLÉTER]';
    var chef = f.chef || '[équipe À COMPLÉTER]';
    var total = fmtHeures(totalFacturable(f));
    var lignes = (f.lignes || []).map(function (l) {
      var h = fmtHeures((Number(l.travail) || 0) + (Number(l.deplacement) || 0));
      return '  • ' + (l.nom || '[nom]') + ' : ' + h + ' h' +
             (l.formation ? '  (★ formation — non facturée)' : '');
    }).join('\n');

    return [
      'Bonjour,',
      '',
      'Feuille de temps — ' + client + ', semaine du ' + sem + '.',
      'Équipe : ' + chef + '.',
      '',
      lignes,
      '',
      'Total facturable : ' + total + ' h (travail + déplacement). Formation (★) non facturée.',
      '',
      'Feuille de temps en pièce jointe (PDF).',
      '',
      'Merci,',
      'Samuel — Rayonnage Horizon'
    ].join('\n');
  }

  function qs(obj) {
    return Object.keys(obj)
      .filter(function (k) { return obj[k] != null && obj[k] !== ''; })
      .map(function (k) { return k + '=' + encodeURIComponent(obj[k]); })
      .join('&');
  }

  // Lien de composition Outlook web — ouvre un nouveau brouillon (recommandé).
  function lienOutlook(f, opts) {
    opts = opts || {};
    return 'https://outlook.office.com/mail/deeplink/compose?' + qs({
      to: opts.to, cc: opts.cc,
      subject: construireSujet(f),
      body: construireCorps(f)
    });
  }

  // Lien mailto — ouvre l'application mail par défaut (si Samuel préfère).
  function lienMailto(f, opts) {
    opts = opts || {};
    var query = qs({ cc: opts.cc, subject: construireSujet(f), body: construireCorps(f) });
    return 'mailto:' + (opts.to || '') + '?' + query;
  }

  function ouvrirBrouillon(f, opts) {
    window.open(lienOutlook(f, opts), '_blank', 'noopener');
  }

  // Crée le bouton ✉ à poser à côté d'une feuille. onFeuille() doit retourner l'objet feuille.
  function creerBouton(onFeuille, opts) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn-feuille-courriel';
    b.title = 'Ouvrir un brouillon Outlook pré-rempli (n\'envoie rien)';
    b.textContent = '✉ Courriel';
    b.addEventListener('click', function () {
      ouvrirBrouillon(onFeuille(), opts || {});
    });
    return b;
  }

  global.FeuilleCourriel = {
    CONTACTS: CONTACTS,
    fmtHeures: fmtHeures,
    totalFacturable: totalFacturable,
    construireSujet: construireSujet,
    construireCorps: construireCorps,
    lienOutlook: lienOutlook,
    lienMailto: lienMailto,
    ouvrirBrouillon: ouvrirBrouillon,
    creerBouton: creerBouton
  };
})(typeof window !== 'undefined' ? window : this);
