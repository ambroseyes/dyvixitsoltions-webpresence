import type { Dictionary } from "./en";

/**
 * Dictionnaire d’interface français.
 *
 * Typé contre `Dictionary` : une clé présente en anglais et absente ici est
 * une erreur de compilation. Les espaces insécables de la typographie
 * française sont ajoutées au chargement (i18n/typography) — on écrit ici des
 * espaces ordinaires.
 */
export const fr: Dictionary = {
  meta: {
    skipToContent: "Aller au contenu principal",
    descriptor: "Ingénierie numérique & technologique",
  },
  nav: {
    mainLabel: "Navigation principale",
    mobileLabel: "Navigation mobile",
    footerLabel: "Navigation de pied de page",
    breadcrumbLabel: "Fil d’Ariane",
    home: "Accueil",
    expertise: "Expertises",
    solutions: "Solutions",
    projects: "Réalisations",
    industries: "Secteurs",
    insights: "Insights",
    about: "À propos",
    contact: "Contact",
    allExpertise: "Toutes les expertises",
    allSolutions: "Toutes les solutions",
    bySector: "Par secteur",
    finderLabel: "Vous ne savez pas par où commencer ?",
    search: "Rechercher",
    searchAria: "Rechercher — appuyez sur Commande K ou Contrôle K",
    startProject: "Démarrer un projet",
    requestAssessment: "Demander un audit",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    languageLink: "English",
    languageLinkAria: "Read this site in English",
  },
  theme: {
    light: "Thème clair",
    dark: "Thème sombre",
    system: "Le thème suit le réglage de votre système",
    switchTo: "Activer pour passer au thème {next}.",
    names: { light: "clair", dark: "sombre", system: "système" },
  },
  command: {
    dialogLabel: "Recherche et commandes",
    inputLabel: "Rechercher",
    placeholder: "Rechercher une expertise, une solution, un secteur ou une action…",
    resultsLabel: "Résultats",
    loading: "Chargement…",
    unavailable: "La recherche est indisponible pour le moment. Réessayez dans un instant.",
    noMatch: "Aucun résultat pour « {query} ». Essayez « sécurité », « cloud » ou « audit ».",
    esc: "échap",
    groups: {
      expertise: "Expertises",
      solutions: "Solutions",
      industries: "Secteurs",
      insights: "Insights",
      actions: "Actions",
      pages: "Pages",
    },
    actions: {
      assessment: "Demander un audit",
      project: "Démarrer un projet",
      finder: "Trouver le bon accompagnement",
    },
  },
  footer: {
    serving: "Au service de",
    company: "Entreprise",
    engage: "Travailler avec nous",
    privacy: "Confidentialité",
    legal: "Mentions légales",
  },
  common: {
    questions: "Questions",
    faqTitle: "{name} : questions fréquentes",
    minRead: "{minutes} min de lecture",
    learnMore: "En savoir plus",
  },
  home: {
    hero: {
      since: "Depuis 2012",
      graph: "Le graphe des compétences D’Yvix",
      headline1: "Des systèmes critiques",
      headline2: "sans droit à l’erreur",
      headline3: "Conçus ici.",
      ctaPrimary: "Démarrer un projet",
      ctaSecondary: "Découvrir nos expertises",
      statYears: "{years} ans d’activité",
      statProjects: "Projets livrés",
      statSectors: "Secteurs servis",
      explore: "Explorer ce domaine",
    },
    problems: {
      label: "Les enjeux",
      title: "Votre technologie ne devrait jamais devenir un risque pour votre activité.",
      standfirst:
        "Six défaillances expliquent l’essentiel de ce qui tourne mal. Chacune a un symptôme reconnaissable, un coût, et une réponse éprouvée.",
      tablist: "Risques technologiques fréquents",
      symptom: "Symptôme",
      consequence: "Conséquence",
      response: "Réponse D’Yvix",
      seeHow: "Voir notre approche",
    },
    bso: {
      label: "La proposition",
      heading: "Construire, sécuriser, opérer",
      withUs: "{verb} avec nous",
    },
    finder: {
      label: "Orientation",
      title: "Que cherchez-vous à résoudre ?",
      standfirst:
        "Choisissez l’énoncé le plus proche de votre situation. Vous obtiendrez un accompagnement précis, avec des livrables nommés — pas une brochure.",
      awaiting: "En attente de sélection",
      awaitingBody: "Choisissez un énoncé : une recommandation cadrée s’affiche ici.",
      youSelected: "Votre sélection",
      recommended: "Accompagnement recommandé",
      youReceive: "Vous recevrez",
      reset: "Réinitialiser",
    },
    expertise: {
      label: "Compétences",
      title: "{count} domaines d’ingénierie.",
      standfirst:
        "Conçus, intégrés et industrialisés par une même équipe, avec la même exigence — du logiciel et du cloud jusqu’aux systèmes connectés et autonomes.",
    },
    technology: {
      label: "Technologies",
      title: "Ce avec quoi nous travaillons vraiment.",
      standfirst:
        "Les outils que nous déployons et exploitons. Nos partenariats technologiques sont présentés séparément, sur la page À propos.",
    },
    method: {
      label: "Méthode",
      title: "Notre méthode d’ingénierie.",
      standfirst:
        "Les mêmes huit étapes sur chaque mission, qu’il s’agisse d’une revue de pare-feu ou d’une migration multisite. La profondeur varie. La séquence, jamais.",
    },
    trust: {
      label: "Preuves",
      title: "{years} ans d’activité, et les preuves qui vont avec.",
      standfirst:
        "Chaque chiffre ci-dessous provient de notre propre historique de réalisations. Lorsqu’une affirmation comporte une nuance, la nuance est publiée avec elle.",
      standards: "Normes",
      partnerships: "Partenariats technologiques",
      sectors: "Secteurs couverts",
      seeEngagements: "Voir les missions derrière ces chiffres",
      operatingFrom: "Implantations",
      alignedNote:
        "« Aligné » signifie que les pratiques sont en place et appliquées : accords de confidentialité signés avant tout accès aux systèmes sensibles, accès au moindre privilège limité aux membres affectés à la mission, pratiques de développement sécurisé. Demandez-nous l’état exact de la certification avant de vous en prévaloir dans un appel d’offres : nous ne l’exagérerons pas.",
      qualifiers: { aligned: "aligné", certified: "certifié" },
    },
    answers: {
      label: "Réponses directes",
      title: "Les questions que l’on se pose sur D’Yvix.",
      standfirst:
        "Formulées simplement, pour qu’un lecteur pressé et une machine qui lit cette page obtiennent la même réponse.",
    },
    closing: {
      nextStep: "Prochaine étape",
      title: "Concevons votre prochain système numérique",
      body: "Commencez par un audit si vous voulez savoir où vous en êtes. Commencez par un brief de projet si vous savez déjà ce qu’il faut construire.",
      assessmentTitle: "Demander un audit",
      assessmentBody: "Infrastructure, sécurité, cloud ou continuité d’activité.",
      projectTitle: "Démarrer un projet",
      projectBody: "Dites-nous ce qu’il faut construire ou exploiter.",
      emailTitle: "Nous écrire directement",
    },
  },
  expertise: {
    label: "Expertises",
    title: "{count} domaines. Une seule discipline d’ingénierie.",
    standfirst:
      "Du logiciel et du cloud à la cybersécurité, l’IA, les réseaux et les systèmes connectés : conçus, intégrés et industrialisés par la même équipe, avec la même exigence.",
    listHeading: "Tous les domaines d’expertise",
    techTitle: "Technologies",
    techStandfirst:
      "Ce que nous déployons et exploitons, classé par couche. Nos partenariats technologiques figurent sur la page À propos.",
    sectorsTitle: "Par secteur",
    sectorsStandfirst:
      "Les obligations changent d’un secteur à l’autre. La discipline d’ingénierie, non.",
    ctaTitle: "Vous ne savez pas de quel domaine vous avez besoin ?",
    ctaBody:
      "Décrivez le problème plutôt que la solution. Nous vous dirons quel accompagnement convient — y compris lorsque la réponse est que vous n’en avez pas besoin.",
    finder: "Utiliser l’outil d’orientation",
    detail: {
      label: "Expertise",
      whatThisIs: "De quoi s’agit-il",
      whoNeedsIt: "Pour qui",
      problemsSolved: "Problèmes résolus",
      whatWeProvide: "Ce que nous apportons",
      approach: "Notre approche",
      technologies: "Technologies",
      technologiesNote:
        "Les technologies que nous déployons et exploitons. Nos partenariats technologiques figurent sur la page À propos.",
      outcomes: "Résultats attendus",
      evidence: "Preuves",
      continuity: "Dans la continuité de notre ligne de service historique",
      solutionsBuilt: "Solutions construites sur cette expertise",
      related: "Expertises associées",
      talkToEngineer: "Parler à un ingénieur",
      ctaBody: "Un périmètre défini, un calendrier borné, et un résultat écrit sur lequel agir.",
      allExpertise: "Voir toutes les expertises",
    },
  },
  solutions: {
    label: "Solutions",
    title: "Ce que nous avons construit, pas seulement ce que nous savons faire.",
    standfirst:
      "Des plateformes conçues par D’Yvix. Chacune n’est décrite que dans la mesure où elle peut être vérifiée ; les présentations détaillées suivent au fil de leur documentation.",
    listHeading: "Les plateformes D’Yvix",
    status: {
      production: "En production",
      development: "En développement",
      forthcoming: "Présentation à venir",
    },
    stack: "Technologies",
    builtOn: "S’appuie sur",
    view: "Voir la solution",
    forthcomingBody: "Une présentation détaillée sera publiée dès qu’elle aura été validée.",
    ctaTitle: "Besoin d’une solution de ce type pour votre organisation ?",
    ctaBody:
      "L’équipe qui construit nos plateformes construit les vôtres — avec la même discipline de revue et la même passation.",
    detail: {
      label: "Solution",
      whatItIs: "De quoi s’agit-il",
      capabilities: "Fonctionnalités",
      architecture: "Architecture",
      stage: "Stade",
      builtOn: "S’appuie sur nos expertises en",
      ctaTitle: "{name} vous intéresse ?",
      ctaBody:
        "Dites-nous à quoi elle vous servirait. Nous vous dirons franchement si elle convient déjà.",
      allSolutions: "Toutes les solutions",
    },
  },
  projects: {
    label: "Preuves",
    title: "Des clients nommés. Des chiffres assumés. Rien d’arrondi.",
    standfirst:
      "{count} missions tirées de notre historique, dont plusieurs menées sur cinq ans ou plus. Lorsqu’un client ne peut être nommé, nous indiquons son secteur — et aucun chiffre ne figure ici que nous ne puissions justifier.",
    heading: "Missions réalisées",
    challenge: "Enjeu",
    whatWeDid: "Notre intervention",
    outcome: "Résultat",
    sectorsTitle: "Secteurs dans lesquels nous avons livré",
    ndaNote:
      "Certaines missions sont couvertes par des accords de confidentialité et ne peuvent être détaillées publiquement. Dans ce cas, nous pouvons présenter des travaux comparables lors d’un échange de cadrage sous NDA — la divulgation à un client potentiel n’est pas la même chose que la publication.",
    ctaTitle: "Jugez-nous sur l’audit.",
    ctaBody:
      "Le moyen le plus rapide d’évaluer une société d’ingénierie est de lui confier une mission courte et bornée, puis de lire ce qu’elle rend.",
    seeExpertise: "Voir toutes les expertises",
  },
  industries: {
    label: "Secteurs",
    title: "Les obligations changent. La discipline d’ingénierie, non.",
    standfirst:
      "Chaque secteur a son propre profil de défaillance — ce qui casse, ce que cela coûte, et qui doit en être informé. Nos missions sont cadrées au regard de ces obligations, pas d’une liste de contrôle générique.",
    listHeading: "Tous les secteurs",
    mapped: "{count} domaines associés",
    ctaTitle: "Votre secteur ne figure pas dans la liste ?",
    ctaBody:
      "La liste reflète les secteurs où les obligations propres modifient l’ingénierie. Si le vôtre n’y est pas, le travail de fond reste le même — dites-nous ce que vous exploitez.",
    detail: {
      label: "Secteur",
      pressures: "Contraintes du secteur",
      risks: "Ce qui tourne mal",
      whereWeStart: "Par où nous commençons",
      orderNote:
        "Classé selon ce qui compte généralement le plus dans ce secteur. L’ordre change dès qu’un audit établit votre situation réelle.",
      ctaTitle: "Commencez par un audit adapté à votre secteur.",
      ctaBody:
        "Cadré au regard des obligations qui s’imposent réellement à vous, pas d’une liste générique.",
      allIndustries: "Tous les secteurs",
    },
  },
  about: {
    label: "L’entreprise",
    title: "{years} ans, construits un client à la fois.",
    whatWeAre: "Qui nous sommes",
    history: "Notre parcours",
    team: "L’équipe",
    teamNote:
      "Sept personnes, un accès direct, aucun intermédiaire. Environ 80 % de l’équipe a moins de 35 ans — des personnes investies dans la croissance de l’entreprise, pas des prestataires de passage.",
    founder: "Fondateur",
    certifications: "Certifications et formations",
    languages: "Langues",
    standards: "Normes et partenaires",
    partnerships: "Partenariats technologiques",
    isoNote:
      "L’ISO/IEC 27001 est présentée ici comme « alignée » et non « certifiée ». Les pratiques sont en place et appliquées ; la formulation reste prudente, car surévaluer une norme est le moyen le plus rapide d’échouer au contrôle qu’elle sert à passer. Demandez-nous l’état exact : nous vous le donnerons précisément.",
    deliver: "Ce que nous faisons",
    sectors: "Secteurs et expertises",
    sectorsDelivered: "Secteurs dans lesquels nous avons livré",
    areas: "Domaines d’expertise",
    areasNote:
      "Une liste maîtrisée. Un sujet n’y figure que lorsque notre historique de réalisations le justifie.",
    ctaTitle: "Commençons par une conversation.",
    ctaBody:
      "Dites-nous ce que vous exploitez et ce qui vous inquiète. Nous vous dirons franchement si nous sommes les bonnes personnes.",
    seeProjects: "Voir les réalisations",
  },
  insights: {
    label: "Insights",
    title: "De l’écriture d’ingénieur, pas du marketing de contenu.",
    standfirst:
      "Les articles sont écrits à partir de nos missions et publiés lorsqu’il y a quelque chose de précis à dire. Aucun calendrier éditorial à remplir.",
    published: "Publiés",
    queueTitle: "En cours d’écriture",
    queueNote:
      "Listés pour montrer la direction plutôt qu’une archive vide. Ils ne sont pas encore publiés et ne sont pas liés.",
    ctaTitle: "Un problème qui mériterait un article ?",
    ctaBody:
      "Les articles publiés ici naissent de missions réelles. Si vous êtes confronté à une question précise, parlons-en.",
    article: {
      contents: "Sommaire",
      byline: "D’Yvix Engineering",
      related: "Expertises associées",
      ctaTitle: "Vous voulez faire vérifier cela sur votre propre parc ?",
      ctaBody:
        "Un audit D’Yvix mesure ce qui se passe réellement sur vos systèmes, et non ce que la conception prévoyait.",
      allInsights: "Tous les insights",
    },
  },
  contact: {
    label: "Contact",
    title: "Concevons votre prochain système numérique.",
    standfirst:
      "Trois questions, puis vos coordonnées. Chaque demande est lue par un ingénieur — elle n’atterrit pas dans une file d’attente pour être qualifiée par quelqu’un qui ne peut pas vous répondre.",
    formHeading: "Formulaire de demande",
    directHeading: "Ou contactez-nous directement",
    email: "E-mail",
    phone: "Téléphone",
    whatsapp: "WhatsApp",
    operatingFrom: "Implantations",
    serviceArea: "Zone d’intervention",
    languages: "Langues",
    languagesValue: "Français · English",
    nextTitle: "La suite",
    next: [
      "Un ingénieur lit votre demande.",
      "Nous vous proposons un échange de cadrage — ou nous vous disons que ce n’est pas pour nous.",
      "Vous recevez un périmètre écrit avant tout engagement.",
    ],
  },
  audit: {
    label: "Audit",
    title: "Sachez où vous en êtes avant de dépenser.",
    standfirst:
      "Un audit indépendant établit l’état réel de votre parc — et non ce qu’en dit la documentation — et vous indique quoi corriger en premier.",
    formHeading: "Formulaire de demande d’audit",
    includedHeading: "Chaque audit comprend",
    included: [
      "Un échange de cadrage structuré avant tout devis",
      "Un état des lieux sur le parc réel, pas sur la documentation",
      "Des constats écrits, avec le risque métier de chacun",
      "Une séquence de remédiation ordonnée par risque, pas par facilité",
      "Un rapport transmissible à une direction ou à un auditeur",
      "Aucune obligation de nous confier la remédiation",
    ],
    note: "Un audit qui conclut que votre parc est en bon état est un audit réussi. Nous préférons vous le dire plutôt que de vous vendre une remédiation inutile.",
    faqTitle: "Audits : questions fréquentes",
  },
  notFound: {
    title: "Cette adresse ne mène nulle part.",
    body: "La page demandée n’est pas ici. Elle a peut-être été déplacée, ou le lien est erroné.",
    suggestions: "Essayez plutôt",
    searchHint: "Ou appuyez sur ⌘K pour rechercher.",
  },
  form: {
    steps: ["Besoin", "Contexte", "Coordonnées"],
    progressLabel: "Progression du formulaire",
    step1Legend: "De quoi avez-vous besoin ?",
    step1Hint: "Cochez tout ce qui s’applique. « Je ne sais pas encore » est une réponse valable.",
    step2Legend: "Donnez-nous le contexte.",
    timelineLabel: "Quel est votre calendrier ?",
    timelineGroup: "Calendrier",
    messageLabel: "Que devons-nous savoir ?",
    hintProject:
      "Ce qui ne fonctionne pas, ce que cela coûte, ou ce que vous cherchez à construire.",
    hintAudit:
      "Ce que vous exploitez, approximativement — sites, utilisateurs, serveurs — et ce qui motive la demande.",
    step3Legend: "À qui devons-nous répondre ?",
    name: "Votre nom",
    organisation: "Organisation",
    email: "E-mail professionnel",
    phone: "Téléphone",
    optional: "(facultatif)",
    honeypot: "Site web (laisser vide)",
    privacyBefore:
      "Nous utilisons ces informations pour répondre à cette demande. Nous ne les vendons pas et ne vous inscrivons à aucune liste de diffusion. Consultez notre",
    privacyLink: "politique de confidentialité",
    back: "Retour",
    continue: "Continuer",
    send: "Envoyer la demande",
    sending: "Envoi en cours",
    sentTitle: "Bien reçu. Nous revenons vers vous.",
    sentBody:
      "Chaque demande est lue par un ingénieur — elle ne passe pas par une file d’attente commerciale. Attendez-vous à une réponse proposant un échange de cadrage, ou à un message vous indiquant que ce n’est pas une mission pour nous.",
    reference: "Référence",
    urgent: "Une urgence d’ici là ?",
    scopes: {
      "digital-engineering": "Ingénierie logicielle & numérique",
      "cloud-infrastructure": "Cloud & infrastructure",
      cybersecurity: "Cybersécurité",
      "ai-data": "IA, data & automatisation",
      "networks-telecom": "Réseaux & télécoms",
      "iot-edge": "IoT & edge",
      "product-engineering": "Produit, UX & qualité",
      "consulting-rd": "Conseil, audit & R&D",
      "managed-services": "Services managés",
      audit: "Audit / évaluation",
      discovery: "Je ne sais pas encore",
    },
    timelines: {
      urgent: "Urgent — nous avons un problème en cours",
      quarter: "Ce trimestre",
      "half-year": "D’ici six mois",
      exploring: "Nous étudions les options",
    },
    errors: {
      name: "Indiquez votre nom.",
      nameLong: "Ce nom est trop long.",
      organisation: "Indiquez votre organisation.",
      organisationLong: "Ce nom d’organisation est trop long.",
      email: "Saisissez une adresse e-mail valide.",
      phoneLong: "Ce numéro est trop long.",
      scopes: "Sélectionnez au moins un domaine.",
      timeline: "Choisissez un calendrier.",
      message: "Une ou deux phrases sur la situation nous aident à orienter la demande.",
      messageLong: "Merci de rester sous 4 000 caractères.",
      review: "Vérifiez vos réponses.",
      rateLimited: "Trop d’envois en peu de temps. Réessayez dans une minute.",
      rejected: "Cette demande n’a pas pu être acceptée. Écrivez-nous directement.",
      delivery:
        "Votre demande n’a pas pu être envoyée. Copiez votre message et écrivez-nous directement.",
      generic: "Une erreur est survenue. Écrivez-nous directement.",
      network: "Le serveur est injoignable. Écrivez-nous directement.",
    },
  },
};
