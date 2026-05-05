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

      <p class="mb-6">Ce passage sur France 3 illustre le travail accompli depuis la création du club. Avec plus de <strong>65 adhérents</strong>, une pédagogie adaptée à tous les âges et un encadrement professionnel, PKBA s'impose comme une référence du parkour en Nouvelle-Aquitaine.</p>

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


