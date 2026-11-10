/* Agenda : dates à venir et passées, calculées à l'heure de Paris (le lieu), jamais à celle du visiteur.
   Le même calcul tourne au chargement dans assets/js/agenda.js : la page générée est juste au jour de la génération,
   le JavaScript la remet à jour à l'heure réelle. */
import { html, brut } from '../../outils/gabarit.mjs';

const JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const JOURS_COURTS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
const MOIS_COURTS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/* « Maintenant » à Paris, en minutes depuis l'époque, pour comparer avec les dates de l'agenda (heure locale du lieu). */
export function maintenantParis(d = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(d).map((x) => [x.type, x.value]));
  return { jour: `${p.year}-${p.month}-${p.day}`, minutes: Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) / 60000 };
}
const minutes = (date, heure) => { const [a, m, j] = date.split('-').map(Number); const [h, mi] = heure.split(':').map(Number); return Date.UTC(a, m - 1, j, h, mi) / 60000; };
export function bornes(e) {
  if (e.mois) {
    const [a, m] = e.date.split('-').map(Number);
    const fin = new Date(Date.UTC(a, m, 0)).toISOString().slice(0, 10);
    return { debut: minutes(e.date, '00:00'), fin: minutes(fin, e.fin) };
  }
  return { debut: minutes(e.date, e.debut), fin: minutes(e.date, e.fin) };
}
export function statut(e, n = maintenantParis()) {
  const b = bornes(e);
  if (e.mardis) { if (e.mardis.includes(n.jour) && minutes(n.jour, e.fin) >= n.minutes) return 'aujourdhui'; }
  if (b.fin < n.minutes) return 'passe';
  if (!e.mois && e.date === n.jour) return 'aujourdhui';
  return 'avenir';
}
export const prochaines = (liste, n = maintenantParis(), nb = 4, filtre = () => true) => liste.filter((e) => filtre(e) && statut(e, n) !== 'passe').slice(0, nb);

const heureFr = (h) => { const [a, b] = h.split(':'); return `${+a} h${b === '00' ? '' : ` ${b}`}`; };
export function quand(e) {
  const [a, m, j] = e.date.split('-').map(Number);
  if (e.mois) return { jour: MOIS[m - 1], jourCourt: MOIS_COURTS[m - 1], num: '', moisCourt: String(a), ligne: `${MOIS[m - 1]} ${a} · ${heureFr(e.debut)} – ${heureFr(e.fin)}` };
  const d = new Date(Date.UTC(a, m - 1, j));
  return { jour: JOURS[d.getUTCDay()], jourCourt: JOURS_COURTS[d.getUTCDay()], num: String(j), moisCourt: MOIS_COURTS[m - 1], ligne: `${JOURS[d.getUTCDay()]} ${j} ${MOIS[m - 1]} · ${heureFr(e.debut)} – ${heureFr(e.fin)}` };
}
export function libelleProchaine(e, n = maintenantParis()) {
  if (!e) return '';
  /* Mois de méditation en ligne : la prochaine séance est le prochain de ses mardis. */
  if (e.mardis) {
    const j = e.mardis.find((d) => minutes(d, e.fin) >= n.minutes);
    if (j) return libelleProchaine({ ...e, date: j, mois: false, mardis: null }, n);
  }
  const q = quand(e);
  if (statut(e, n) === 'aujourdhui') return `${+e.debut.split(':')[0] >= 18 ? 'Ce soir' : 'Aujourd’hui'}, ${heureFr(e.debut)} · ${e.titre}`;
  return `${q.jour[0].toUpperCase() + q.jour.slice(1)} ${q.num} ${e.mois ? q.moisCourt : MOIS[+e.date.slice(5, 7) - 1]}, ${heureFr(e.debut)} · ${e.titre}`;
}
/* Début et fin (minutes, heure de Paris) de la prochaine séance d'une date : pour un mois en ligne, le prochain mardi. */
export function seanceProchaine(e, n = maintenantParis()) {
  if (e.mardis) {
    const j = e.mardis.find((d) => minutes(d, e.fin) >= n.minutes);
    if (j) return { debut: minutes(j, e.debut), fin: minutes(j, e.fin) };
  }
  if (e.mois) { const b = bornes(e); return { debut: Math.max(b.debut, n.minutes), fin: b.fin }; }
  return bornes(e);
}
/* Compte à rebours écrit à la génération (le JavaScript le tient ensuite à jour, à la minute). */
export function compte(debut, fin, n = maintenantParis()) {
  const d = debut - n.minutes;
  if (d <= 0) return fin > n.minutes ? html`<b>en ce moment</b>` : '';
  const j = Math.floor(d / 1440), h = Math.floor((d % 1440) / 60), m = d % 60;
  if (j >= 14) return html`dans <b data-u="j">${String(j)}</b> jours`;
  return html`dans ${j ? html`<b data-u="j">${String(j)}</b> j ` : ''}<b data-u="h">${String(h)}</b> h <b data-u="m">${String(m).padStart(2, '0')}</b>`;
}
export const moisDe = (e) => { const [a, m] = e.date.split('-').map(Number); return `${MOIS[m - 1]} ${a}`; };

/* Une ligne de l'agenda. Le bouton ouvre la vraie billetterie dans un nouvel onglet ; data-grille="retour" :
   une goutte part du bouton et tombe dans la cloche (assets/js/site.js). */
export function ligne(c, e, { n = maintenantParis(), titreNiveau = 'h3' } = {}) {
  const st = statut(e, n), q = quand(e), b = bornes(e);
  const lieu = c.donnees.lieux[e.lieu];
  const t = c.donnees.types[e.type];
  return html`<li class="date date--${e.type} date--${st}" data-date data-type="${e.type}" data-debut="${b.debut}" data-fin="${b.fin}" data-jour="${e.date}" data-mardis="${(e.mardis || []).join(' ')}" data-heure="${e.debut}" data-heure-fin="${e.fin}" data-depart="${lieu.depart}"${e.mois ? brut(' data-mois="1"') : ''}>
  <p class="date-jour" aria-hidden="true"><span>${q.jourCourt}</span><strong>${q.num || '✦'}</strong><span>${q.moisCourt}</span></p>
  <div class="date-corps">
    ${brut(`<${titreNiveau} class="date-titre">`)}${e.titre}${brut(`</${titreNiveau}>`)}
    <p class="date-sous">${e.sous}</p>
    <p class="date-meta">${q.ligne} · ${lieu.nom}</p>
  </div>
  <p class="date-fin"><span class="date-prix" data-prix>${e.prix}</span><span class="date-type">${t.court}</span>
    <span class="date-etat date-etat--aujourdhui">${c.t('accueil.datesAujourdhui')}</span><span class="date-etat date-etat--passe">${c.t('accueil.datesPasse')}</span>
    <a class="bouton bouton--petit date-reserver" href="${e.lien}" target="_blank" rel="noopener" data-retour aria-label="${c.s('accueil.datesReserver')} : ${e.titre}, ${q.ligne} (${c.s('commun.nouvelOnglet')})">${c.t('accueil.datesReserver')}</a></p>
</li>`;
}
