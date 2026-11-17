export type Article = {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  author: string
  readTime: string
  image: string
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: 7,
    slug: 'assemblee-generale-2026-nouveau-bureau-nfx-rouen-pkba',
    title: 'Assemblée générale, nouveau bureau et NFX à Rouen : un mois de novembre chargé au PKBA',
    excerpt:
      "AG du 6 novembre, nouveau bureau, deux juges de niveau 2 au club et une 4e place en finale internationale à Rouen : retour sur un mois de novembre chargé au Parkour Bassin d'Arcachon.",
    content: `
      <p class="mb-6">On vous l'avait annoncé dans <a href="/actualites/saison-2026-2027-stages-ete-rentree-toussaint-pkba" class="text-primary hover:underline font-semibold">notre article de rentrée</a> : novembre allait être chargé. Il l'a été. En dix jours, le <strong>Parkour Bassin d'Arcachon</strong> a tenu son <strong>assemblée générale</strong>, élu un <strong>nouveau bureau</strong>, envoyé deux de ses membres en <strong>formation de juges</strong> à Paris, puis pris la route de <strong>Rouen</strong> pour le premier grand rendez-vous compétitif de la saison. On vous raconte.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Une assemblée générale au hangar</h2>

      <p class="mb-6">Le <strong>vendredi 6 novembre</strong>, adhérents et parents se sont retrouvés au hangar de Gujan-Mestras pour l'assemblée générale annuelle du club. Merci à tous ceux qui sont venus ou qui ont confié leur pouvoir, et merci à <strong>M. André Moustié</strong>, adjoint aux sports de Gujan-Mestras, d'avoir pris le temps d'être parmi nous.</p>

      <p class="mb-6">David Andro a ouvert la soirée en rappelant d'où l'on vient. Le club est parti de rien en 2025, sans salle et sans matériel. Les premiers cours ont eu lieu dans la petite yourte du cirque Komono à La Teste-de-Buch, avec trois modules, puis l'hiver s'est passé dans le hangar de <strong>Vertical T'Air</strong>, que l'on remercie encore pour leur accueil, avant l'arrivée dans notre propre hangar en avril 2026.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "On revient de loin, mais aujourd'hui on peut travailler."
        </p>
        <p class="text-gray-700 font-montserrat mt-2">David Andro</p>
      </div>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Une première saison dans le top 6 national</h2>

      <p class="mb-6">Le bilan de la saison 2025/2026 a été présenté chiffres à l'appui. Au 30 juin, le club comptait <strong>66 licenciés</strong>, avec un encadrement entièrement bénévole. Côté compétition, nos <strong>15 compétiteurs</strong> ont disputé trois compétitions fédérales, à Thouars, <a href="/actualites/nouveau-local-gujan-mestras-circuit-national-rennes-pkba" class="text-primary hover:underline font-semibold">Rennes</a> et <a href="/actualites/championnat-france-parkour-bourges-podiums-gala-pkba" class="text-primary hover:underline font-semibold">Bourges</a>. <strong>Dix athlètes</strong> se sont qualifiés pour le Championnat de France, et le club s'est aussi qualifié pour la finale par équipe.</p>

      <p class="mb-6">Résultat : dans le classement des clubs publié par la FFGym le 9 octobre 2026, le PKBA se classe <strong>6e sur 75 clubs</strong> de parkour en France, dès sa première saison. Ce classement tient compte notamment du nombre de licenciés, des résultats sportifs et du nombre de formateurs diplômés. L'objectif pour cette saison est posé : <strong>le top 5, voire le top 3</strong>.</p>

      <p class="mb-6">Autre chiffre dont on est fiers : les filles représentent <strong>17 % de nos licenciés</strong>, contre environ 5 % dans le parkour au niveau national. Les entraînements sont mixtes, et on voit un vrai effet de groupe cette année : quelques filles s'inscrivent, elles amènent leurs copines, et tout le monde s'entraîne ensemble.</p>

      <p class="mb-6">Le rapport moral et d'activité, les comptes de la saison 2025/2026 et le budget de la saison 2026/2027 ont tous été <strong>approuvés à l'unanimité</strong>. Merci pour votre confiance.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">103 licenciés, et ce n'est pas fini</h2>

      <p class="mb-6">La rentrée a dépassé nos attentes. Les forums de septembre ont permis de recueillir 140 contacts pour une séance d'essai, et le club est passé de 66 licenciés en fin de saison dernière à <strong>103 licenciés au 5 novembre</strong>. L'objectif est d'atteindre 115 d'ici la fin de la saison. Le PKBA reste un club ancré sur le Bassin : <strong>84 % de nos licenciés habitent la COBAS</strong>, et près de trois sur quatre ont moins de 13 ans.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "C'est un plaisir de côtoyer des sportifs, mais là je vois une passion et une détermination rares. J'ai rarement vu cela dans une AG."
        </p>
        <p class="text-gray-700 font-montserrat mt-2">André Moustié, adjoint aux sports de Gujan-Mestras</p>
      </div>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un nouveau bureau pour le club</h2>

      <p class="mb-6">L'assemblée s'est terminée par l'élection d'un nouveau bureau. <strong>David Andro</strong>, qui porte le club depuis sa création, passe la main à la présidence. Comme annoncé en assemblée générale, le club prévoit de l'embaucher au 1er juillet 2027, et on ne peut pas être à la fois salarié du club et président. Il reste bien sûr aux commandes de l'entraînement. Les trois candidats ont été élus à l'unanimité.</p>

      <div class="bg-gray-50 border-l-4 border-gray-300 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">Le bureau 2026/2027</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li><strong>Président</strong> : Maxime Mansiet</li>
          <li><strong>Secrétaire</strong> : Lorraine Millot</li>
          <li><strong>Trésorière</strong> : Gwendoline Berchoux</li>
        </ul>
      </div>

      <p class="mb-6">Maxime était jusque-là trésorier du club, et Lorraine reste secrétaire. Bienvenue à <strong>Gwendoline</strong>, qui reprend la trésorerie. Et un immense merci à <strong>David</strong> pour tout ce qu'il a construit comme président.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "On a déjà fait une bonne partie de la route ensemble, et pour moi, c'est une aventure humaine extraordinaire. Il faut qu'on continue à offrir le meilleur environnement et le meilleur cadre, pour que tout le monde puisse progresser dans ce magnifique sport, dans les meilleures conditions."
        </p>
        <p class="text-gray-700 font-montserrat mt-2">Maxime Mansiet, président du PKBA</p>
      </div>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Familles, entreprises : le club a besoin de vous</h2>

      <p class="mb-6">Un hangar, des déplacements en compétition, du matériel : un club qui grandit, ça coûte. La commission <strong>« Des fonds pour PKBA »</strong> lance un appel aux familles. Vous pouvez présenter le club à votre employeur, nous mettre en relation avec une entreprise qui aimerait soutenir un club sportif du Bassin, ou donner un coup de main lors des compétitions, de la fête de Noël et du gala. On cherche aussi un <strong>minibus aux couleurs d'un partenaire</strong> pour emmener nos traceurs en compétition.</p>

      <p class="mb-6">Une piste, une idée, un contact ? Écrivez-nous via la <a href="/contact" class="text-primary hover:underline font-semibold">page contact</a>, ou soutenez directement le club sur la <a href="/donations" class="text-primary hover:underline font-semibold">page dons</a>.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Deux juges de niveau 2 au club</h2>

      <p class="mb-6">Dès le lendemain de l'AG, les <strong>7 et 8 novembre</strong>, Maxime et <strong>Viktor Terrou</strong> étaient à Paris pour la formation de juges de parkour de la FFGym. Ils en reviennent tous les deux avec le <strong>niveau 2 de juge parkour</strong>.</p>

      <p class="mb-6">Pour valider un niveau, il faut passer un QCM sur le règlement, puis juger des runs en vidéo, en difficulté comme en exécution, avec un minimum à atteindre dans chaque épreuve. Avoir des juges formés au club, c'est mieux comprendre ce qui est attendu en compétition, et pouvoir le transmettre à nos traceurs dès l'entraînement.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Rouen : la NFX et la première étape du Circuit national</h2>

      <p class="mb-6">Du <strong>12 au 15 novembre</strong>, Rouen accueillait la toute première édition de la <strong>Normandie Freestyle Xperience (NFX)</strong>, un open international de parkour organisé à la halle Saint-Exupéry, avec 25 nations annoncées. En parallèle, les <strong>14 et 15 novembre</strong>, s'y tenait la <strong>première étape du Circuit national FFGym 2026/2027</strong>, qualificative pour le Championnat de France : le freestyle le samedi, le speed le dimanche.</p>

      <p class="mb-6">Une semaine à peine après sa formation, Maxime y a jugé l'exécution sur l'étape du Circuit national, et a pu suivre nos traceurs depuis le bord du parcours.</p>

      <p class="mb-6">Quatre traceurs du club étaient de la partie, répartis entre les deux compétitions, puisqu'un athlète ne peut pas disputer la même discipline sur les deux. Sur la NFX, en catégorie Junior (14-17 ans), <strong>Esaya Kety</strong> et <strong>Tilio Ferreira</strong> se sont mesurés à un plateau international. Sur l'étape du Circuit national, <strong>Antoine Pressler</strong> et <strong>Samuel Fuchs</strong> ont disputé le Parkour Freestyle des 18 ans et plus.</p>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">🏆 Sur la NFX, l'open international</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li>🏅 <strong>Esaya Kety</strong>, 4e de la finale Freestyle Junior hommes avec 61,65</li>
          <li><strong>Esaya Kety</strong>, en tête des qualifications Skill Comp Junior hommes, épreuve sans finale junior</li>
          <li><strong>Tilio Ferreira</strong>, qualifié pour la finale Freestyle Junior hommes, mais sorti sur une talonnade</li>
        </ul>
      </div>

      <div class="bg-gray-50 border-l-4 border-gray-300 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">Sur l'étape 1 du Circuit national FFGym</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li><strong>Antoine Pressler</strong>, 6e sur 28 en Parkour Freestyle 18 ans et plus hommes (fédéral) avec 60,250</li>
          <li><strong>Samuel Fuchs</strong>, 16e en Parkour Freestyle 18 ans et plus hommes (performance) avec 55,300</li>
        </ul>
      </div>

      <p class="mb-6">Le week-end a été électrique, tout le monde était à fond : un très beau plateau, une organisation géniale et un setup en modules Brick extrêmement varié et très dense, parfait pour le freestyle. Une 4e place en finale internationale pour Esaya, pour le premier rendez-vous de la saison, c'est un très bon départ avant les prochaines étapes du Circuit national. Et on souhaite un bon rétablissement à Tilio.</p>

      <p class="mb-6">Merci à David et aux familles qui ont fait la route jusqu'en Normandie pour encourager nos traceurs.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Les prochains rendez-vous</h2>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">📌 À noter dans vos agendas</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li>❤️ <strong>Samedi 5 décembre</strong> : Téléthon de Gujan-Mestras, de 10h à 16h avec le club de pentathlon, et un speed run à 2 € reversés au Téléthon [À COMPLÉTER : lieu]</li>
          <li>🎄 <strong>Samedi 12 décembre</strong> : challenge interne PKBA et fête de Noël, groupe par groupe</li>
          <li>🏆 <strong>12 et 13 décembre, 30 et 31 janvier, 20 et 21 mars</strong> : étapes suivantes du Circuit national, lieux à préciser</li>
          <li>⛄ <strong>Du 21 au 23 et du 28 au 30 décembre</strong> : stage de parkour des vacances de Noël au hangar</li>
          <li>🇫🇷 <strong>5 et 6 juin 2027</strong> : finale du Championnat de France, lieu à confirmer</li>
          <li>🎉 <strong>Samedi 12 juin 2027</strong> : gala de fin de saison</li>
        </ul>
      </div>

      <p class="mb-6">Pour le <strong>stage de Noël</strong>, deux formules : la journée complète dès 8 ans pour les licenciés et les initiés, à 25 € la journée, et la séance découverte dès 6 ans. Les inscriptions sont ouvertes sur la <a href="/stage" class="text-primary hover:underline font-semibold">page stage</a>. D'autres stages suivront en février, en avril et cet été, les dates arriveront bientôt.</p>

      <p class="mb-6">Pour la finale de juin, l'objectif est de qualifier à nouveau <strong>une dizaine d'athlètes</strong>. Le calendrier complet est sur la <a href="/planning" class="text-primary hover:underline font-semibold">page planning</a>, et toute la vie du club se suit sur <a href="https://www.instagram.com/parkourbassindarcachon/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">Instagram</a> et sur notre <a href="https://www.facebook.com/parkourbassindarcachon" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">page Facebook</a>.</p>

      <p class="mb-6 mt-8">À tous les adhérents, parents, coachs, bénévoles et partenaires : <strong>merci</strong>. Une deuxième saison commence avec un nouveau bureau et beaucoup d'envie. On se retrouve au hangar. 🚀</p>
    `,
    category: 'club',
    date: '2026-11-16',
    author: 'Équipe PKBA',
    readTime: '7 min',
    image: '/images/ag-2026-nouveau-bureau-nfx-rouen-pkba.jpg',
    featured: true,
  },
  {
    id: 6,
    slug: 'saison-2026-2027-stages-ete-rentree-toussaint-pkba',
    title: 'Saison 2026/2027 : l\'été au PKBA, la rentrée et le stage de parkour de la Toussaint',
    excerpt:
      "Deux sessions de stages d'été, des enfants de 6 à 14 ans venus du Bassin et d'ailleurs, une reprise le 7 septembre à Gujan-Mestras et un stage de la Toussaint du 23 au 30 octobre : retour sur l'été et tout ce qui attend le club de parkour du Bassin d'Arcachon cette saison.",
    content: `
      <p class="mb-6">Ça y est, la <strong>saison 2026/2027</strong> est lancée. Les cours ont repris le <strong>lundi 7 septembre</strong>, et pour la première fois on démarre une année entière chez nous, dans notre local de Gujan-Mestras, avec les modules déjà en place le premier jour. Plus besoin de tout monter et démonter avant chaque séance : ça paraît anodin, mais après des mois passés à plier et déplier les tapis, ça change tout.</p>

      <p class="mb-6">Pour ceux qui nous découvrent : le <strong>Parkour Bassin d'Arcachon</strong> (PKBA) est un club de parkour associatif affilié à la <a href="https://www.ffgym.fr/La_FFGYM/Les_disciplines/Parkour" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">Fédération Française de Gymnastique</a>, qui accueille les enfants dès 3 ans, du loisir jusqu'à la compétition. Avant de regarder devant, petit retour sur l'été.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un été au hangar</h2>

      <p class="mb-6">Notre toute première saison s'était refermée en juin sur <a href="/actualites/championnat-france-parkour-bourges-podiums-gala-pkba" class="text-primary hover:underline font-semibold">quatre podiums au Championnat de France à Bourges</a>. On aurait pu fermer les portes et partir en vacances. On a préféré garder le hangar ouvert, avec deux sessions de <strong>stages</strong> : du <strong>6 au 16 juillet</strong>, du lundi au jeudi, puis du <strong>17 au 28 août</strong>, du lundi au vendredi.</p>

      <p class="mb-6">Et vous avez répondu présent. Des enfants de <strong>6 à 14 ans</strong>, venus de Gujan-Mestras, de La Teste-de-Buch, du Teich, de Mios, de Pessac, de Sanguinet, et même d'Aix-en-Provence. Au programme, la journée complète de 10h à 16h pour ceux qui avaient déjà des bases, à enchaîner passements, sauts de précision et parcours sur les modules <a href="https://brickparkour.com/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">Brick Parkour</a>. Et la séance découverte de 16h à 17h30 pour ceux qui voulaient simplement voir à quoi ressemble le parkour.</p>

      <p class="mb-6">C'est exactement pour ce genre d'été qu'on voulait un local : un endroit ouvert, où un enfant de Sanguinet et un autre de Gujan se retrouvent sur les mêmes modules, avec les mêmes coachs.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Merci à ceux qui ont fait tourner l'été</h2>

      <p class="mb-6">Rien de tout ça ne se fait tout seul. Merci à nos coachs, <strong>David, Victor et Antoine</strong>, et à toute l'équipe qui a encadré les stages en juillet et en août pendant que beaucoup étaient à la plage. Leur encadrement diplômé FFGym, c'est ce qui permet aux parents de déposer leurs enfants le matin l'esprit tranquille.</p>

      <p class="mb-6">Merci aussi aux <strong>bénévoles du bureau</strong>, qui gèrent dans l'ombre les inscriptions, les factures, les dossiers et les relations avec les mairies. Et merci aux parents qui nous confient leurs enfants et qui parlent du club autour d'eux. Un club associatif, c'est d'abord ça.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Une rentrée sur les forums</h2>

      <p class="mb-6">Début septembre, on a tenu un stand aux deux <strong>forums des associations</strong> : à <a href="https://www.latestedebuch.fr/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">La Teste-de-Buch</a> le samedi 5, puis à <a href="https://ville-gujanmestras.fr/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">Gujan-Mestras</a> le dimanche 6. Merci à toutes les familles venues nous rencontrer et poser leurs questions sur les groupes et les horaires, et à celles qui ont rempli la préinscription dans la foulée.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Les groupes de la saison 2026/2027</h2>

      <p class="mb-6">Le planning a été repensé pour accueillir tout le monde dès 3 ans. Le loisir est ouvert à tous, sans niveau requis. La prépa compétition et le groupe compétition se font sur sélection.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">🗓️ Les créneaux de la semaine</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li><strong>Loisir 3-5 ans</strong> : mercredi, 11h à 11h45</li>
          <li><strong>Loisir 6-8 ans</strong> : mercredi de 13h à 14h (complet), ou vendredi de 17h à 18h</li>
          <li><strong>Loisir 8-12 ans</strong> : mercredi, 14h à 15h30</li>
          <li><strong>Loisir 9-12 ans</strong> : lundi, 17h à 18h30</li>
          <li><strong>Loisir +12 ans</strong> : mercredi, 17h30 à 19h</li>
          <li><strong>Prépa compétition 8-12 ans</strong> : mardi et jeudi, 17h à 18h30</li>
          <li><strong>Prépa compétition +12 ans</strong> : lundi et jeudi, 18h30 à 20h</li>
          <li><strong>Compétition</strong> : mardi, mercredi et vendredi</li>
          <li><strong>Samedi après-midi</strong> : anniversaires et cours privés</li>
        </ul>
      </div>

      <p class="mb-6">Les tarifs et le détail des horaires sont sur la <a href="/horaires" class="text-primary hover:underline font-semibold">page horaires</a>. Le loisir 6-8 ans du mercredi affiche déjà complet, mais il reste de la place dans plusieurs groupes : remplissez la <a href="/inscription" class="text-primary hover:underline font-semibold">préinscription</a> en ligne, et on vous recontacte pour trouver le bon créneau.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Vacances de la Toussaint : le stage de parkour</h2>

      <p class="mb-6">Le prochain stage arrive vite : rendez-vous le <strong>vendredi 23 octobre</strong>, puis du <strong>lundi 26 au vendredi 30 octobre</strong>, au local de Gujan-Mestras. Pas de stage du 19 au 22, nos animateurs sont en formation ces jours-là.</p>

      <p class="mb-6">Mêmes formules que cet été. La journée complète de 10h à 16h, dès 8 ans, pour les licenciés et les initiés : 25 € la journée, ou 100 € la semaine du 26. La séance découverte de 16h à 17h30, dès 6 ans : 15 €. Les inscriptions se font sur la <a href="/stage" class="text-primary hover:underline font-semibold">page stage</a>.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Les dates à noter dès maintenant</h2>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">📌 Le calendrier de la saison</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li>📋 <strong>Vendredi 6 novembre, 19h</strong> : assemblée générale du club, au local</li>
          <li>🏆 <strong>Du 12 au 15 novembre</strong> : NFX 2026, l'open international de Rouen, avec le groupe compétition</li>
          <li>🎄 <strong>Samedi 12 décembre</strong> : challenge interne PKBA et fête de Noël, groupe par groupe, avec les familles</li>
          <li>🇫🇷 <strong>5 et 6 juin 2027</strong> : finale du Championnat de France de Parkour (lieu à confirmer)</li>
          <li>🎉 <strong>Samedi 12 juin 2027</strong> : gala de fin de saison au local</li>
        </ul>
      </div>

      <p class="mb-6">L'<strong>assemblée générale</strong> est ouverte aux adhérents et aux parents des adhérents mineurs. Le bureau y présente le bilan de la première saison et les projets de celle qui commence, et c'est le bon moment pour dire ce que vous aimeriez voir évoluer au club. Les convocations partent au moins quinze jours avant.</p>

      <p class="mb-6">Côté compétition, Rouen sera le premier déplacement de la saison pour nos traceurs. Viendront ensuite les étapes du circuit national, avec la finale de juin en ligne de mire, un an après <a href="/actualites/nouveau-local-gujan-mestras-circuit-national-rennes-pkba" class="text-primary hover:underline font-semibold">les cinq podiums de Rennes</a> et ceux de Bourges. Le calendrier complet est sur la <a href="/planning" class="text-primary hover:underline font-semibold">page planning</a>, et on partage la vie du club sur notre <a href="https://www.instagram.com/parkourbassindarcachon/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">compte Instagram</a>.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Et en dehors des cours</h2>

      <p class="mb-6">Le local vit aussi en dehors des créneaux : <a href="/anniversaires" class="text-primary hover:underline font-semibold">anniversaires</a> le samedi, <a href="/cours-prive" class="text-primary hover:underline font-semibold">cours privés</a> pour progresser en individuel, et <a href="/privatisation" class="text-primary hover:underline font-semibold">privatisation de la salle</a> pour vos évènements.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Questions fréquentes</h2>

      <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-2 mt-6">À partir de quel âge peut-on faire du parkour au PKBA ?</h3>
      <p class="mb-6">Dès 3 ans en cours de loisir. Pendant les stages, la séance découverte est ouverte dès 6 ans et la journée complète dès 8 ans.</p>

      <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-2 mt-6">Où se trouve le club ?</h3>
      <p class="mb-6">Au <a href="https://share.google/UrLrtmfeh45d819kt" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">4 avenue de l'Actipôle, 33470 Gujan-Mestras</a>, à une dizaine de minutes de La Teste-de-Buch, un quart d'heure d'Arcachon et une cinquantaine de minutes de Bordeaux.</p>

      <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-2 mt-6">Faut-il être licencié pour participer au stage de la Toussaint ?</h3>
      <p class="mb-6">Non. La séance découverte de 16h à 17h30 est pensée pour les enfants qui n'ont jamais pratiqué. La journée complète demande d'avoir déjà des bases.</p>

      <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-2 mt-6">Peut-on encore s'inscrire pour la saison 2026/2027 ?</h3>
      <p class="mb-6">Oui, il reste de la place dans plusieurs groupes. La <a href="/inscription" class="text-primary hover:underline font-semibold">préinscription</a> se fait en ligne et le club vous recontacte.</p>

      <p class="mb-6 mt-8">À tous les athlètes, parents, coachs, bénévoles et partenaires : <strong>merci</strong> pour cette première année, et bienvenue aux nouveaux. On se retrouve au hangar. 🚀</p>
    `,
    category: 'club',
    date: '2026-10-10',
    author: 'Équipe PKBA',
    readTime: '6 min',
    image: '/images/stage-parkour-gujan-mestras-pkba.jpg',
    featured: true,
  },
  {
    id: 5,
    slug: 'championnat-france-parkour-bourges-podiums-gala-pkba',
    title: 'Championnat de France à Bourges : quatre podiums pour clôturer la saison',
    excerpt:
      "Les 13 et 14 juin, nos traceurs étaient à Bourges pour la finale du Championnat de France de Parkour. Ils en reviennent avec quatre podiums, dont un tout premier podium par équipe. Retour sur ce week-end, et rendez-vous le 27 juin pour le gala de fin d'année du club.",
    content: `
      <p class="mb-6">La saison 2025-2026 du <strong>Parkour Bassin d'Arcachon</strong> se referme en beauté. Les <strong>13 et 14 juin 2026</strong>, une dizaine de nos traceurs étaient à <strong>Bourges</strong> pour la finale nationale, le <strong>Championnat de France de Parkour</strong>, face à environ 200 athlètes venus de toute la France. Ils en sont revenus avec <strong>quatre podiums</strong>, dont un tout premier podium par équipe. Retour sur ce week-end, et rendez-vous le 27 juin pour clôturer la saison tous ensemble au gala du club.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un week-end au sommet, à Bourges</h2>

      <p class="mb-6">Après une première sortie à Thouars en décembre 2025, puis les cinq podiums de l'étape de Rennes en mars, ce déplacement à Bourges, c'était l'aboutissement d'une saison entière de travail. La finale réunissait le <strong>gratin du parkour français</strong> en Parkour Speed et en Parkour Freestyle, et nos jeunes y ont défendu les couleurs du Bassin d'Arcachon avec un sang-froid impressionnant.</p>

      <p class="mb-6">Sur un plateau aussi relevé, chaque place se mérite. Et nos traceurs ont répondu présents, avec quatre podiums ramenés sur le Bassin.</p>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">🏆 Les podiums PKBA à Bourges</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li>🥈 <strong>Antoine Duverger</strong>, 2e en Parkour Freestyle 18 ans et plus hommes (performance)</li>
          <li>🥉 <strong>Esaya Kety</strong>, 3e en Parkour Speed 12-14 ans hommes (performance)</li>
          <li>🥉 <strong>Tilio Ferreira</strong>, 3e en Parkour Freestyle 15-17 ans hommes élite</li>
          <li>🥉 <strong>Antoine Duverger, Tilio Ferreira et Esaya Kety</strong>, 3e de la nouvelle finale Freestyle par équipe</li>
        </ul>
      </div>

      <p class="mb-6">Une belle <strong>médaille d'argent pour Antoine</strong> chez les plus de 18 ans, et deux <strong>bronzes</strong> avec Esaya en Speed et Tilio dans une catégorie élite particulièrement disputée. Cerise sur le gâteau, le Championnat inaugurait cette année une <strong>épreuve Freestyle par équipe</strong>, et le trio Antoine, Tilio et Esaya est monté sur la 3e marche pour ce tout premier format collectif. Voir le club représenté à la fois en individuel et en équipe, c'est exactement la dynamique qu'on construit depuis nos débuts.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Toute l'équipe au rendez-vous</h2>

      <p class="mb-6">Un podium ne dit jamais tout d'une compétition. Derrière les médailles, <strong>tout le groupe a tiré son niveau vers le haut</strong> et signé de belles places en finale nationale.</p>

      <div class="bg-gray-50 border-l-4 border-gray-300 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">Les autres résultats PKBA</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li><strong>Esaya Kety</strong>, 4e en Parkour Freestyle 12-14 ans hommes (performance)</li>
          <li><strong>Noann Le Borgne</strong>, 9e en Parkour Freestyle 12-14 ans hommes (performance)</li>
          <li><strong>Viktor Terrou</strong>, 9e en Parkour Freestyle 18 ans et plus hommes (fédéral)</li>
          <li><strong>Arthur Tisserand</strong>, 9e et <strong>Matéo Colantuano</strong>, 11e en Parkour Freestyle 12-14 ans hommes (fédéral)</li>
          <li><strong>Julian Quattrocchi</strong>, 11e et <strong>Mathys Puyo Shumann</strong>, 12e en Parkour Speed 10-11 ans hommes (fédéral)</li>
        </ul>
      </div>

      <p class="mb-6">Se qualifier pour une finale de Championnat de France et y tenir son rang face aux meilleurs Français, à 10, 12 ou 15 ans, c'est déjà une réussite en soi. <strong>Bravo à eux</strong>, et merci aux familles et aux coachs qui ont fait le déplacement jusqu'à Bourges pour les encourager.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "Pour notre toute première saison, on est passés des premiers entraînements à une finale de Championnat de France avec des podiums individuels et par équipe. C'est toute la progression du club qui se lit dans ces résultats."
        </p>
      </div>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">On clôture la saison ensemble : gala et tombola le 27 juin</h2>

      <p class="mb-6">Quoi de mieux qu'un grand moment de fête pour refermer cette saison ? Le <strong>samedi 27 juin, de 18h à 20h</strong>, on vous attend au <strong>local du club</strong> (4 Av. de L'actipôle, Gujan-Mestras) pour le <strong>gala de fin d'année du PKBA</strong>. Démonstrations, mise à l'honneur de nos compétiteurs et un moment convivial pour toute la communauté du club.</p>

      <p class="mb-6">La soirée est <strong>ouverte à tous, athlètes, familles et grand public, et l'entrée est gratuite</strong>. Une <strong>grande tombola</strong> sera organisée au profit du club, avec des <strong>tickets à 3€</strong> et de superbes lots à gagner.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">🎟️ La tombola du gala</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li>🪂 Le gros lot : un <strong>saut en parachute</strong>, offert par <strong>Vertical T'Air</strong></li>
          <li>⛺ Un séjour au <strong>camping Huttopia</strong></li>
          <li>🍽️ Des <strong>bons restaurants</strong>, des <strong>paniers gourmands</strong> et de nombreux autres lots</li>
        </ul>
        <p class="mt-3 text-gray-800 font-montserrat">Tickets à <strong>3€</strong>.</p>
      </div>

      <p class="mb-6">Compétitions, premier local, reportage France 3, et maintenant un gala pour réunir tout le monde : la saison aura été <strong>intense et pleine de fierté</strong>. Merci à nos traceurs, à leurs familles, à nos coachs et à nos partenaires d'en faire partie.</p>

      <p class="mb-6">On vous donne rendez-vous le <strong>27 juin</strong> pour fêter tout ça comme il se doit. Et si l'envie de vous lancer dans le parkour vous titille, c'est le moment idéal pour venir pousser la porte du club. 🚀</p>
    `,
    category: 'bilan',
    date: '2026-06-18',
    author: 'Équipe PKBA',
    readTime: '5 min',
    image: '/images/bourges-championnat-france-pkba.jpg',
    featured: true,
  },
  {
    id: 4,
    slug: 'nouveau-local-gujan-mestras-circuit-national-rennes-pkba',
    title: 'Nouveau local à Gujan-Mestras et cinq podiums à l\'étape de Rennes',
    excerpt:
      "Le club PKBA vit une saison qui s'accélère. En avril 2026, nous avons emménagé dans notre tout premier local fixe à Gujan-Mestras, un hangar de 200 m² entièrement aménagé. Et le mois précédent, nos traceurs sont rentrés de Rennes avec cinq podiums sur la 3e étape du Circuit National de Parkour. Retour sur ces moments forts.",
    content: `
      <p class="mb-6">Cette saison restera comme une étape charnière dans l'histoire du <strong>Parkour Bassin d'Arcachon</strong>. En quelques mois, le club a franchi deux caps majeurs : un <strong>premier local fixe</strong> à Gujan-Mestras, et une vraie reconnaissance sur la scène nationale avec <strong>cinq podiums à Rennes</strong> sur l'étape 3 du Circuit National de Parkour. Deux belles aventures qu'on avait envie de partager.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un local rien que pour nous, à Gujan-Mestras</h2>

      <p class="mb-6">Depuis <strong>avril 2026</strong>, PKBA dispose enfin de son propre lieu d'entraînement, au 4 Av. de L'actipôle à Gujan-Mestras. <strong>200 m² dans un beau hangar</strong>, avec parking, accueil aménagé, toilettes, et surtout du matériel pensé pour notre discipline : trampolines, parcours techniques, et des <strong>modules dernier cri signés <a href="https://brickparkour.com" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-semibold">Brick Parkour</a></strong>, l'une des références du secteur. Et même une PlayStation pour décompresser entre deux sessions.</p>

      <p class="mb-6">Disposer de notre propre salle, c'est un changement complet. Plus besoin de plier et déplier le matériel à chaque cours, plus de contraintes horaires liées au partage d'une salle, nos modules et nos équipements de sécurité sont désormais <strong>installés à demeure</strong> et pensés pour la pratique du parkour.</p>

      <p class="mb-6">Concrètement, cela nous permet d'offrir aux athlètes un cadre stable et progressif. Les parcours peuvent évoluer entre chaque séance, les défis sont plus ambitieux, et les coachs gagnent un temps précieux pour se concentrer sur ce qui compte vraiment : <strong>la pédagogie, la sécurité et la progression</strong> de chaque pratiquant. C'est aussi un endroit chaleureux pour souder la communauté du club, où les traceurs se croisent, partagent leurs idées et encouragent les plus jeunes.</p>

      <p class="mb-6">Ce local représente bien plus qu'un simple changement d'adresse, c'est l'aboutissement d'un travail collectif (bénévoles, parents, coachs) et le point de départ de nouvelles ambitions. Stages de vacances, anniversaires, privatisations, séminaires d'entreprise, beaucoup de projets deviennent enfin possibles dans ce nouvel espace.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg my-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "Avoir notre propre salle, c'est offrir aux athlètes un cadre digne de ce qu'ils méritent et permettre au club de viser plus haut sur le long terme."
        </p>
      </div>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Cinq podiums à Rennes, sur le Circuit National</h2>

      <p class="mb-6">Les 14 et 15 mars 2026, Rennes accueillait la <strong>3e étape du Circuit National de Parkour</strong>, qui rassemblait les meilleurs traceurs et traceuses de France en Parkour Speed et Parkour Freestyle. Une <strong>quinzaine d'athlètes PKBA</strong> ont fait le déplacement, accompagnés par l'équipe technique. Après une première sortie compétitive à Thouars les 6 et 7 décembre 2025, c'était l'occasion de confirmer la dynamique du groupe au plus haut niveau national.</p>

      <p class="mb-6">Et le résultat est au rendez-vous : <strong>cinq podiums</strong> ramenés sur le Bassin, dans cinq catégories différentes.</p>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg my-8">
        <h3 class="text-xl font-cheddar font-bold text-gray-900 mb-3">🏆 Les podiums PKBA à Rennes</h3>
        <ul class="space-y-2 text-gray-800 font-montserrat">
          <li>🥇 <strong>Antoine Duverger</strong>, 1er en Parkour Freestyle 18 ans et plus hommes (performance) avec 69.400</li>
          <li>🥇 <strong>Milan Terrade-Prior</strong>, 1er en Parkour Freestyle 15-17 ans hommes fédérale</li>
          <li>🥈 <strong>Tilio Ferreira</strong>, 2e en Parkour Freestyle 15-17 ans hommes élite avec 69.800</li>
          <li>🥉 <strong>Esaya Kety</strong>, 3e en Parkour Speed 12-14 ans hommes (performance) en 24.080</li>
          <li>🥉 <strong>Julian Quattrocchi</strong>, 3e en Parkour Speed 10-12 ans hommes fédérale</li>
        </ul>
      </div>

      <p class="mb-6">Deux <strong>victoires</strong> (Antoine chez les seniors, Milan en 15-17 fédérale), un <strong>argent pour Tilio</strong> dans une catégorie élite particulièrement relevée, et deux <strong>bronzes</strong> (Esaya en Speed 12-14, Julian en Speed 10-12 fédérale) chez les plus jeunes : plusieurs générations du club représentées sur cinq podiums, c'est exactement le signal qu'on espérait. Le travail réalisé à l'entraînement paie, et la profondeur du groupe se confirme.</p>

      <p class="mb-6">Au-delà des médailles, ce déplacement a aussi été une grande leçon pour tous. Découvrir un nouveau spot, échanger avec les meilleurs clubs français, observer les enchaînements des traceurs élites, et apprendre à gérer la pression d'une compétition nationale : autant de moments qui font grandir un athlète. Et la maturité dont ont fait preuve nos jeunes nous a impressionnés.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Cap sur la finale de Bourges</h2>

      <p class="mb-6">La saison n'est pas terminée, et la suite s'annonce intense. Après les étapes du Circuit National, place à la <strong>finale nationale, qui se tiendra à Bourges les 13 et 14 juin 2026</strong>. Plusieurs de nos traceurs ont validé leur ticket et iront défendre les couleurs du Bassin d'Arcachon face aux meilleurs de la discipline.</p>

      <p class="mb-6">L'objectif est clair : continuer à <strong>progresser, prendre du plaisir et représenter le club</strong> au plus haut niveau. Quel que soit le résultat, ce rendez-vous sera une nouvelle marche dans la construction d'une vraie culture compétitive à PKBA. Et croyez-nous, on a hâte d'y être.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Une dynamique qui s'accélère</h2>

      <p class="mb-6">Local fixe en avril, podiums à Rennes en mars : ce sont deux <strong>jalons majeurs</strong> qui ouvrent une nouvelle phase pour PKBA. Désormais, on peut planifier sereinement les stages d'été (juillet et août), préparer le gala de fin d'année du 27 juin, accueillir des évènements privés dans notre salle, et continuer à viser haut sur la scène nationale.</p>

      <p class="mb-6">À tous les athlètes, parents, partenaires et amis du club : <strong>merci</strong>. Sans vous, rien de tout cela ne serait possible. Et à ceux qui hésitent encore à pousser la porte du parkour, c'est le bon moment pour nous rejoindre. Venez essayer, on a (enfin !) la place pour vous accueillir comme il se doit. 🚀</p>
    `,
    category: 'club',
    date: '2026-05-03',
    author: 'Équipe PKBA',
    readTime: '5 min',
    image: '/images/blog-open-rennes-local.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'reportage-france-3-pkba-parkour-bassin-arcachon',
    title: 'PKBA sur France 3 : le Parkour Bassin d\'Arcachon à l\'honneur',
    excerpt:
      "France 3 Nouvelle-Aquitaine a consacré un reportage au club PKBA, mettant en lumière la dynamique du parkour sur le Bassin d'Arcachon. Découvrez le reportage complet.",
    content: `
      <p class="mb-6">Le club <strong>PKBA - Parkour Bassin d'Arcachon</strong> a eu l'honneur d'être mis en lumière par <strong>France 3 Nouvelle-Aquitaine</strong>. Ce reportage témoigne de la reconnaissance grandissante du parkour comme discipline sportive à part entière et de la place que PKBA a su se faire sur le territoire du Bassin d'Arcachon.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Le reportage</h2>

      <p class="mb-6">Découvrez le reportage complet de France 3 ci-dessous :</p>

      <div class="relative w-full mb-8" style="padding-bottom: 56.25%;">
        <iframe
          src="https://www.youtube-nocookie.com/embed/Pkow2GmHfCk"
          title="Reportage France 3 - PKBA Parkour Bassin d'Arcachon"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="absolute top-0 left-0 w-full h-full rounded-xl"
          loading="lazy"
        ></iframe>
      </div>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un club en pleine croissance</h2>

      <p class="mb-6">Ce passage sur France 3 illustre le travail accompli depuis la création du club. Avec <strong>66 adhérents</strong>, une pédagogie adaptée à tous les âges et un encadrement diplômé FFGym, PKBA s'impose comme une référence du parkour en Nouvelle-Aquitaine.</p>

      <p class="mb-6">Le reportage met en avant les valeurs qui font la force du club : <strong>l'accessibilité, la sécurité, la progression et l'esprit de communauté</strong>. Des enfants aux adultes, chacun trouve sa place et progresse à son rythme sous l'œil bienveillant d'éducateurs diplômés.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Le parkour, bien plus qu'un sport</h2>

      <p class="mb-6">Comme le montre le reportage, le parkour tel que pratiqué à PKBA dépasse la simple activité physique. C'est une discipline qui développe la <strong>confiance en soi, la gestion du risque, la créativité</strong> et le dépassement personnel. Chaque obstacle devient une opportunité d'apprentissage.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "Merci à France 3 Nouvelle-Aquitaine pour ce beau reportage qui met en lumière notre passion et notre engagement pour le parkour sur le Bassin d'Arcachon !"
        </p>
      </div>

      <p class="mb-6 mt-8">Envie de découvrir le parkour ? <strong>Rejoignez-nous</strong> pour un cours d'essai et vivez l'expérience PKBA ! 🚀</p>
    `,
    category: 'médias',
    date: '2026-01-15',
    author: 'Équipe PKBA',
    readTime: '3 min',
    image: '/images/hero_background.webp',
    featured: true,
  },
  {
    id: 2,
    slug: 'bilan-premier-mois-pkba-60-adherents-septembre-2025',
    title: 'Un Premier Mois Exceptionnel : PKBA Décolle avec 60 Adhérents',
    excerpt:
      "Un mois après son ouverture le 16 septembre 2025, le club PKBA - Parkour Bassin d'Arcachon affiche déjà une belle réussite avec environ 60 adhérents et des retours enthousiastes. Retour sur un démarrage prometteur qui pose les bases d'un projet sportif ambitieux et structuré.",
    content: `
      <p class="mb-6">Le <strong>16 septembre 2025</strong> restera une date marquante dans l'histoire du parkour sur le Bassin d'Arcachon. Ce jour-là, PKBA - Parkour Bassin d'Arcachon ouvrait officiellement ses portes pour la nouvelle saison sportive. Un mois plus tard, le bilan dépasse toutes nos espérances : <strong>environ 60 adhérents</strong> ont déjà rejoint l'aventure, et les retours de la communauté sont exceptionnellement positifs.</p>

      <p class="mb-6">Cette réussite n'est pas le fruit du hasard. Elle reflète un travail de préparation minutieux, une vision claire et surtout l'enthousiasme d'une communauté qui attendait un club de parkour structuré et professionnel sur le territoire. Aujourd'hui, nous souhaitons partager avec vous ce premier bilan et vous présenter les valeurs qui guident notre action au quotidien.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un démarrage qui dépasse nos attentes</h2>
      
      <p class="mb-6">Lorsque nous avons lancé les inscriptions, nous espérions une bonne dynamique, mais la réalité a dépassé nos projections les plus optimistes. En seulement quatre semaines, <strong>60 pratiquants</strong> ont franchi les portes de PKBA, représentant tous les âges et tous les niveaux. Des enfants découvrant le parkour pour la première fois aux adultes souhaitant se perfectionner, notre communauté est déjà riche et diverse.</p>

      <p class="mb-6">Ce qui nous touche particulièrement, ce sont les <strong>retours très positifs</strong> que nous recevons quotidiennement. Les familles saluent la qualité de l'encadrement, la pédagogie adaptée à chaque niveau, et l'attention constante portée à la sécurité. Les pratiquants apprécient l'ambiance conviviale, l'exigence technique et la progression visible dès les premières séances. Ces témoignages nous confortent dans notre approche et nous motivent à maintenir ce niveau d'excellence.</p>

      <p class="mb-6">L'atmosphère lors des entraînements est exactement celle que nous voulions créer : <strong>bienveillante mais exigeante, ludique mais structurée, accessible mais ambitieuse</strong>. Chaque séance est l'occasion de progresser techniquement, de repousser ses limites en toute sécurité, et de tisser des liens avec d'autres passionnés de parkour.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Les valeurs qui nous portent : une culture sportive au service de tous</h2>

      <p class="mb-6">Dès la création de PKBA, nous avons voulu construire bien plus qu'un simple club de parkour. Notre ambition est de <strong>promouvoir une véritable culture sportive</strong>, ancrée dans des valeurs fortes qui dépassent la simple pratique physique.</p>

      <p class="mb-6">Au cœur de notre projet se trouvent les valeurs fondamentales du sport : <strong>l'éducation, la santé, le dépassement de soi et le lien social</strong>. Chaque entraînement est pensé pour développer ces quatre piliers. Nous ne formons pas seulement des athlètes techniquement compétents, mais des individus capables de se dépasser, de respecter les autres et de comprendre l'importance du sport dans une vie équilibrée.</p>

      <p class="mb-6">Le respect des règles et la compréhension du cadre sont également essentiels à nos yeux. C'est pourquoi nous accordons une importance particulière au <strong>développement de l'arbitrage</strong> et à la sensibilisation aux règles de pratique. Nous voulons que chaque adhérent comprenne non seulement comment pratiquer le parkour, mais aussi pourquoi certaines règles existent et comment elles contribuent à la sécurité et au progrès de tous.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">L'excellence sportive comme moteur de progression</h2>

      <p class="mb-6">PKBA s'est donné pour mission de construire un <strong>projet sportif basé sur l'excellence</strong>. Cette ambition se traduit concrètement dans notre organisation et nos objectifs à moyen et long terme.</p>

      <p class="mb-6">Notre premier engagement est de créer une <strong>école de sport labellisée</strong>. Cela signifie garantir la qualité de notre encadrement, tant en nombre qu'en compétences. Tous nos éducateurs sont diplômés et nous investissons dans leur formation continue pour qu'ils restent à la pointe des meilleures pratiques pédagogiques. Cette certification de qualité est un gage de sérieux et de professionnalisme pour les familles qui nous confient leurs enfants.</p>

      <p class="mb-6">Nous croyons fermement qu'un club de qualité doit offrir des <strong>niveaux de compétition adaptés à tous les licenciés</strong>. Que vous soyez débutant cherchant à découvrir le parkour ou pratiquant confirmé visant des compétitions régionales ou nationales, PKBA vous accompagnera dans votre progression. Notre objectif est de créer des parcours de formation clairs, permettant à chacun d'évoluer à son rythme tout en étant challengé et stimulé.</p>

      <p class="mb-6">Le <strong>développement de la pratique féminine</strong> est également une priorité absolue. Le parkour a longtemps été perçu comme une discipline majoritairement masculine, mais les temps changent. Nous mettons tout en œuvre pour créer un environnement inclusif où les femmes et les filles se sentent accueillies, encouragées et valorisées. Notre ambition est de constituer des équipes féminines compétitives qui pourront représenter le club lors de compétitions.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Former les champions de demain</h2>

      <p class="mb-6">Au-delà de la pratique hebdomadaire, PKBA se positionne comme une véritable <strong>école de formation</strong>. Notre devoir est de former des jeunes et de présenter des équipes ou des individuels capables de briller à différents niveaux de compétition, du départemental au national.</p>

      <p class="mb-6">Cette ambition ne se limite pas à la performance sportive. Nous voulons créer des <strong>passerelles entre les générations</strong> en incorporant progressivement les jeunes issus de notre formation dans les équipes seniors engagées en championnat. Cette approche permet aux jeunes talents de se confronter à un niveau supérieur tout en bénéficiant de l'expérience des pratiquants plus aguerris.</p>

      <p class="mb-6">La formation à l'arbitrage fait également partie intégrante de notre projet éducatif. Nous considérons qu'un bon pratiquant doit comprendre les règles de sa discipline et être capable de les faire respecter. Former des arbitres, c'est former des citoyens sportifs responsables et engagés.</p>

      <p class="mb-6">À terme, notre ambition est de développer une <strong>vitrine sportive de haut niveau</strong>. Nous voulons que PKBA soit reconnu pour la qualité de ses équipes et de ses athlètes, au minimum au niveau régional, avec l'objectif de viser plus haut encore. Cette visibilité servira de modèle inspirant pour nos jeunes pratiquants et contribuera au rayonnement du parkour sur le Bassin d'Arcachon.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Un club ancré dans son territoire</h2>

      <p class="mb-6">PKBA n'existe pas en vase clos. Nous sommes profondément convaincus qu'un club sportif doit être <strong>ancré dans son territoire</strong> et contribuer au dynamisme local. C'est pourquoi nous cultivons une approche collaborative avec les autres acteurs du sport sur le Bassin d'Arcachon.</p>

      <p class="mb-6">Nous croyons en la force du <strong>regroupement et de la coopération entre clubs</strong> d'une même discipline sportive. Plutôt que de nous positionner en concurrents, nous cherchons à nouer des partenariats avec les clubs de proximité, à mutualiser nos ressources et à créer des synergies pour atteindre ensemble des objectifs ambitieux. Cette approche collaborative bénéficie à tous : elle permet de partager les infrastructures, de co-organiser des événements et de créer une véritable dynamique territoriale autour du parkour.</p>

      <p class="mb-6">En portant haut la <strong>marque territoriale</strong> du Bassin d'Arcachon, nous contribuons au rayonnement de notre région. Chaque compétition, chaque événement, chaque succès de nos athlètes met en lumière notre territoire et renforce son attractivité sportive.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Les grandes étapes à venir</h2>

      <p class="mb-6">Ce premier mois n'est que le début d'une longue aventure. Nous avons déjà identifié plusieurs <strong>grandes étapes</strong> pour les mois à venir, qui structureront le développement du club.</p>

      <p class="mb-6">Notre priorité immédiate est de finaliser la <strong>structuration de notre école de sport labellisée</strong>. Cela implique de mettre en place tous les processus de certification, de documenter nos méthodes pédagogiques et de garantir que chaque aspect de notre fonctionnement répond aux standards les plus élevés. Cette labellisation sera une reconnaissance officielle de la qualité de notre travail.</p>

      <p class="mb-6">Nous travaillons également à la création de <strong>parcours de progression clairs et motivants</strong> pour tous nos adhérents. Chaque pratiquant doit pouvoir visualiser son évolution, comprendre les étapes à franchir et célébrer ses progrès. Ces parcours seront accompagnés d'évaluations régulières et de feedbacks personnalisés.</p>

      <p class="mb-6">L'organisation d'<strong>événements réguliers</strong> est également dans nos cartons. Nous voulons créer des moments forts qui rassemblent notre communauté, attirent de nouveaux pratiquants et donnent de la visibilité au parkour sur le territoire. Stages, démonstrations, compétitions amicales... les idées ne manquent pas !</p>

      <p class="mb-6">Enfin, nous allons progressivement ouvrir la porte de la <strong>compétition</strong> à celles et ceux qui le souhaitent. Participer à des compétitions est une expérience formatrice qui permet de se mesurer à d'autres, de gérer le stress et de repousser ses limites. Nous accompagnerons nos athlètes dans cette démarche avec un encadrement adapté et un suivi personnalisé.</p>

      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Merci pour votre confiance</h2>

      <p class="mb-6">Ce premier mois exceptionnel n'aurait pas été possible sans <strong>votre confiance et votre enthousiasme</strong>. Chaque adhérent qui franchit nos portes, chaque parent qui nous confie son enfant, chaque pratiquant qui s'investit dans les entraînements contribue à faire vivre ce projet.</p>

      <p class="mb-6">Les retours positifs que nous recevons sont notre plus belle récompense. Ils nous confirment que nous sommes sur la bonne voie et nous donnent l'énergie pour continuer à nous améliorer chaque jour. Nous sommes conscients de la responsabilité qui est la nôtre et nous nous engageons à maintenir ce niveau d'exigence et de qualité.</p>

      <p class="mb-6">L'aventure PKBA ne fait que commencer. Les fondations sont solides, la dynamique est lancée, et l'avenir s'annonce passionnant. Nous avons de <strong>grandes ambitions</strong> pour ce club : en faire une référence du parkour en Nouvelle-Aquitaine, former des athlètes de haut niveau, créer une communauté soudée et bienveillante, et contribuer au rayonnement sportif du Bassin d'Arcachon.</p>

      <p class="mb-6">Mais au-delà des objectifs sportifs, notre mission première reste <strong>éducative</strong>. Nous voulons permettre à chaque jeune de s'exprimer au plus haut niveau de ses capacités, dans le respect, la sécurité et l'exigence. Nous voulons transmettre des valeurs qui dépassent le cadre du parkour et qui accompagneront nos adhérents tout au long de leur vie.</p>

      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
        <p class="text-gray-800 font-montserrat italic text-lg">
          "Un mois de réussite, 60 adhérents conquis, des retours enthousiastes et une vision claire : PKBA construit aujourd'hui le parkour de demain sur le Bassin d'Arcachon. L'aventure ne fait que commencer, et nous sommes fiers de la vivre avec vous !"
        </p>
      </div>

      <p class="mb-6 mt-8">Rendez-vous très bientôt pour de nouvelles actualités, et surtout... <strong>continuez à progresser, à vous dépasser et à faire vivre la communauté PKBA</strong> ! 🚀</p>
    `,
    category: 'bilan',
    date: '2025-10-16',
    author: 'Équipe PKBA',
    readTime: '12 min',
    image: '/images/handstand-pkba-antoine.png',
    featured: true,
  },
  {
    id: 1,
    slug: 'lancement-site-web-pkba-15-aout-2025',
    title: "Nouveau Site Web PKBA - Une Évolution Numérique pour la Communauté Parkour",
    excerpt:
      "Le club PKBA - Parkour Bassin d'Arcachon lance son nouveau site web moderne et interactif pour connecter la communauté et faciliter l'accès aux informations essentielles.",
    content: `
      <p class="mb-6">Nous sommes ravis d'annoncer le lancement officiel de notre nouveau site web PKBA ! Après plusieurs mois de développement et de tests, notre plateforme numérique est enfin en ligne depuis le 15 août 2025, marquant une étape importante dans l'évolution de notre club.</p>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Une refonte complète pour une meilleure expérience</h2>
      <p class="mb-6">Ce nouveau site web représente bien plus qu'une simple mise à jour. Il s'agit d'une refonte complète pensée et conçue pour répondre aux besoins de notre communauté grandissante. Notre objectif était de créer une plateforme moderne, intuitive et accessible qui facilite l'accès à toutes les informations essentielles du club.</p>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Fonctionnalités principales du nouveau site</h2>
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">🎯 Préinscriptions simplifiées</h3>
      <p class="mb-4">Le processus de préinscription est maintenant entièrement digitalisé. Les nouveaux adhérents peuvent se préinscrire en ligne en quelques clics, avec un formulaire intuitif qui guide chaque étape. Plus besoin de se déplacer au club pour les démarches administratives !</p>
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">🛒 Boutique en ligne intégrée</h3>
      <p class="mb-4">Notre boutique en ligne est désormais directement accessible depuis le site principal. Les membres peuvent commander leurs équipements, vêtements aux couleurs du club et accessoires sans quitter notre plateforme. Le système de panier et de commande est sécurisé et facile à utiliser.</p>
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">💳 Système de donations et paiements</h3>
      <p class="mb-4">Pour soutenir le développement du club, nous avons intégré un système de donations sécurisé. Les sympathisants et membres peuvent contribuer financièrement au projet PKBA via des paiements sécurisés en ligne.</p>
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">📱 Design responsive et moderne</h3>
      <p class="mb-4">Le site s'adapte parfaitement à tous les appareils : ordinateurs, tablettes et smartphones. L'interface utilisateur a été pensée pour offrir une expérience fluide et agréable, quel que soit l'appareil utilisé.</p>
      <h3 class="text-xl font-cheddar font-bold text-gray-800 mb-3 mt-6">🔍 Navigation intuitive</h3>
      <p class="mb-4">La structure du site a été repensée pour une navigation plus logique et intuitive. Les informations sont organisées de manière claire, permettant aux visiteurs de trouver rapidement ce qu'ils cherchent.</p>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Pourquoi ce nouveau site ?</h2>
      <p class="mb-6">L'évolution numérique était devenue nécessaire pour plusieurs raisons :</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Simplifier les démarches administratives pour nos membres</li>
        <li>Améliorer la communication avec la communauté</li>
        <li>Faciliter l'accès aux informations du club</li>
        <li>Moderniser notre image et notre présence en ligne</li>
        <li>Créer une plateforme centralisée pour tous nos services</li>
      </ul>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Technologies et sécurité</h2>
      <p class="mb-6">Notre nouveau site utilise les technologies web les plus récentes pour garantir performance, sécurité et fiabilité :</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Framework Next.js pour des performances optimales</li>
        <li>Paiements sécurisés via Stripe</li>
        <li>Protection des données personnelles (RGPD)</li>
        <li>Certificat SSL pour la sécurité des échanges</li>
        <li>Optimisation SEO pour une meilleure visibilité</li>
      </ul>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Ce qui change pour les membres</h2>
      <p class="mb-6">Avec ce nouveau site, l'expérience des membres PKBA s'améliore significativement :</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-50 p-6 rounded-lg">
          <h4 class="font-cheddar font-bold text-gray-900 mb-3">✅ Avant</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Préinscriptions uniquement sur place</li>
            <li>• Informations dispersées</li>
            <li>• Communication limitée</li>
            <li>• Boutique physique uniquement</li>
          </ul>
        </div>
        <div class="bg-green-50 p-6 rounded-lg">
          <h4 class="font-cheddar font-bold text-gray-900 mb-3">🚀 Maintenant</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Préinscriptions 100% en ligne</li>
            <li>• Toutes les infos centralisées</li>
            <li>• Communication instantanée</li>
            <li>• Boutique en ligne intégrée</li>
          </ul>
        </div>
      </div>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Prochaines étapes et évolutions</h2>
      <p class="mb-6">Ce lancement n'est qu'une première étape. Nous prévoyons déjà plusieurs améliorations et nouvelles fonctionnalités :</p>
      <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700">
        <li>Espace membre personnalisé</li>
        <li>Blog et actualités régulières</li>
        <li>Galerie photos et vidéos</li>
      </ul>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Comment utiliser le nouveau site</h2>
      <p class="mb-6">Pour tirer le meilleur parti de notre nouvelle plateforme :</p>
      <ol class="list-decimal list-inside mb-6 space-y-2 text-gray-700">
        <li><strong>Explorez les différentes sections</strong> pour découvrir toutes les fonctionnalités</li>
        <li><strong>Utilisez la boutique en ligne</strong> pour vos équipements</li>
        <li><strong>Restez informés</strong> via notre section actualités</li>
        <li><strong>Partagez le site</strong> avec votre entourage</li>
      </ol>
      <h2 class="text-2xl font-cheddar font-bold text-gray-900 mb-4 mt-8">Remerciements</h2>
      <p class="mb-6">Ce projet n'aurait pas été possible sans l'engagement de toute l'équipe PKBA et le soutien de notre communauté. Un grand merci à tous ceux qui ont contribué à cette évolution numérique.</p>
      <p class="mb-6">Nous sommes convaincus que ce nouveau site web marquera un tournant positif dans l'histoire de notre club et contribuera à renforcer les liens au sein de notre communauté parkour.</p>
      <div class="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mt-8">
        <p class="text-gray-800 font-montserrat italic">
          "L'innovation numérique au service de la passion parkour - Bienvenue dans l'ère moderne de PKBA !"
        </p>
      </div>
    `,
    category: 'annonces',
    date: '2025-08-15',
    author: 'Équipe PKBA',
    readTime: '8 min',
    image: '/images/hero_background.webp',
    featured: false,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}


