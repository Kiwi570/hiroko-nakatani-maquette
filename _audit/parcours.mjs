/* Parcours propres à la maquette d'Hiroko Nakatani :
   - agenda : filtres gardés dans l'adresse, dates passées hors de la liste à venir, prochaine séance non passée ;
   - contact : formulaire en trois temps (étape refusée si vide, sujet prérempli par ?sujet=, message « simulé »,
     pas de double envoi) ;
   - accueil : la cloche se frappe au clavier sans erreur. */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  const { ctx, page } = await contexte({ taille: T('390×844') });
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  try {
    /* Agenda : filtre « Marches » par l'adresse, puis « Tout » au clic. */
    await page.goto(BASE + '/agenda?type=marche', { waitUntil: 'load' });
    await attendrePret(page);
    const etat = await page.evaluate(() => {
      const visibles = [...document.querySelectorAll('[data-agenda] .date')].filter((l) => !l.classList.contains('est-masquee'));
      return { n: visibles.length, autres: visibles.filter((l) => l.dataset.type !== 'marche').length, presse: document.querySelector('[data-filtre="marche"]').getAttribute('aria-pressed') };
    });
    if (etat.autres > 0 || etat.presse !== 'true') R.echec('agenda', `filtre ?type=marche mal appliqué (${etat.autres} autre(s) type(s) visible(s), bouton pressé : ${etat.presse})`, { page: '/agenda', taille: '390×844' });
    await page.click('[data-filtre="tout"]');
    await attendre(700);
    const apres = await page.evaluate(() => ({ url: location.search, n: [...document.querySelectorAll('[data-agenda] .date')].filter((l) => !l.classList.contains('est-masquee')).length }));
    if (apres.url.includes('type=')) R.echec('agenda', 'le filtre « Tout » ne retire pas le paramètre de l’adresse', { page: '/agenda' });
    if (apres.n <= etat.n) R.regarder('agenda', `« Tout » montre ${apres.n} dates, pas plus que « Marches » (${etat.n})`, { page: '/agenda' });
    const passeesAVenir = await page.evaluate(() => {
      const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).reduce((o, x) => (o[x.type] = x.value, o), {});
      const maintenant = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) / 60000;
      return [...document.querySelectorAll('[data-agenda] .date')].filter((l) => +l.dataset.fin < maintenant).length;
    });
    if (passeesAVenir) R.echec('agenda', `${passeesAVenir} date(s) passée(s) encore dans la liste à venir`, { page: '/agenda' });

    /* Contact : étape vide refusée, puis parcours complet, message simulé, pas de double envoi. */
    await page.goto(BASE + '/contact', { waitUntil: 'load' });
    await attendrePret(page);
    await page.click('[data-etape-form="0"] [data-suivant]');
    await attendre(200);
    if (!(await page.locator('#erreur-etape-sujet').textContent() || '').trim()) R.echec('contact', 'étape « sujet » acceptée sans choix', { page: '/contact' });
    await page.check('input[name="sujet"][value="marche"]');
    await page.click('[data-etape-form="0"] [data-suivant]');
    await page.fill('textarea[name="message"]', 'Bonjour, je voudrais venir à la prochaine marche du dimanche.');
    await page.click('[data-etape-form="1"] [data-suivant]');
    await page.fill('input[name="nom"]', 'Test Audit');
    await page.fill('input[name="email"]', 'test@exemple.fr');
    await page.click('[data-etape-form="2"] [type="submit"]');
    await attendre(400);
    const fin = await page.evaluate(() => ({ msg: !document.querySelector('[data-message-envoi]').hidden, desactive: document.querySelector('[data-etape-form="2"] [type="submit"]').disabled }));
    if (!fin.msg) R.echec('contact', 'pas de message de confirmation (simulé) après l’envoi', { page: '/contact' });
    if (!fin.desactive) R.echec('contact', 'le bouton Envoyer reste actif : double envoi possible', { page: '/contact' });
    await page.goto(BASE + '/contact?sujet=mbsr', { waitUntil: 'load' });
    await attendrePret(page);
    const prerempli = await page.evaluate(() => ({ coche: document.querySelector('input[name="sujet"]:checked')?.value, etape: document.querySelector('.etape.est-active')?.dataset.etapeForm }));
    if (prerempli.coche !== 'mbsr') R.echec('contact', `?sujet=mbsr ne préremplit pas le sujet (${prerempli.coche})`, { page: '/contact' });

    /* Accueil : la cloche se frappe au clavier. */
    await page.goto(BASE + '/', { waitUntil: 'load' });
    await attendrePret(page);
    await page.focus('.cloche-frapper');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowRight');
    await attendre(300);
    if (erreurs.length) R.echec('erreurs JavaScript', erreurs.slice(0, 3).join(' | '), { page: 'parcours du projet' });
  } finally { await ctx.close(); }
}
