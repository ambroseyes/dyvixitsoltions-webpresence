import type { IndustrySlug, IndustryText } from "../types";

export const industriesFr: Record<IndustrySlug, IndustryText> = {
  "financial-services": {
    name: "Services financiers",
    summary: "Banques, microfinance et opérateurs de paiement, où la disponibilité est réglementée.",
    headline: "Ici, disponibilité et intégrité ne sont pas des options. C’est la condition de l’agrément.",
    standfirst:
      "Les établissements financiers portent des obligations qui transforment un incident informatique en problème réglementaire. L’ingénierie doit en tenir compte dès le départ.",
    pressures: [
      "Des exigences réglementaires en matière de disponibilité, de conservation et de traçabilité",
      "Des systèmes transactionnels où chaque interruption se chiffre en pertes directes",
      "Des réseaux d’agences et d’agents qui dépendent de liaisons tombant indépendamment",
      "Des intégrations tierces avec les systèmes de paiement et interbancaires",
    ],
    risks: [
      "Fraude et usurpation de comptes par des contrôles d’identité insuffisants",
      "Un rançongiciel qui atteint les sauvegardes faute de les avoir isolées",
      "Une coupure de connectivité qui isole les agences",
      "Des constats d’audit sur les accès privilégiés et la gestion des changements",
    ],
    faqs: [
      { q: "D’Yvix peut-elle travailler dans le cadre des exigences de notre régulateur ?", a: "Les missions sont cadrées selon les obligations précises qui s’imposent à vous. Lorsqu’un contrôle est imposé, il devient une exigence explicite de la conception plutôt qu’une recommandation, et la documentation produite est rédigée pour servir l’audit." },
      { q: "Comment rendre la connectivité des agences résiliente ?", a: "Avec des liens indépendants qui ne partagent aucun chemin de défaillance, et une bascule automatique configurée et testée. La conception commence par repérer où des liens apparemment distincts convergent vers la même infrastructure physique — un cas bien plus fréquent qu’on ne le pense." },
    ],
  },
  government: {
    name: "Administration & secteur public",
    summary: "Des institutions publiques qui détiennent des données citoyennes et assurent des services essentiels.",
    headline: "Des systèmes dont le public ne peut pas choisir de se passer.",
    standfirst:
      "Les institutions publiques détiennent des données que les citoyens ne peuvent pas retirer et rendent des services qu’ils ne peuvent obtenir ailleurs. La souveraineté sur cette infrastructure compte.",
    pressures: [
      "Des données citoyennes soumises à des obligations de résidence et de confidentialité",
      "Des cycles d’achat et de budget qui contraignent l’architecture",
      "Des systèmes historiques plus anciens que le personnel en poste",
      "Une continuité de service attendue quel que soit le cycle budgétaire",
    ],
    risks: [
      "L’exposition de données citoyennes via des systèmes non maintenus",
      "La dépendance à une infrastructure hors de la juridiction nationale",
      "La perte de savoir au gré des mutations du personnel",
      "Des systèmes non documentés que personne ne peut modifier sans risque",
    ],
    faqs: [
      { q: "Les données peuvent-elles rester sous juridiction nationale ?", a: "Oui. Lorsque la résidence des données est exigée, l’architecture maintient les données concernées sur une infrastructure située et exploitée dans le pays. C’est souvent ce qui oriente vers des conceptions sur site ou hybrides plutôt que vers un cloud entièrement public." },
      { q: "Comment conserver le savoir malgré les mutations du personnel ?", a: "En traitant la documentation et la passation comme des livrables, et non comme des sous-produits. Topologie, procédures et registres de décision sont rédigés pour un lecteur qui n’était pas présent, afin que la capacité d’exploitation ne parte pas avec une personne." },
    ],
  },
  healthcare: {
    name: "Santé",
    summary: "Hôpitaux et cliniques, où la disponibilité du dossier pèse sur les décisions cliniques.",
    headline: "Quand le dossier est indisponible, on soigne sans lui.",
    standfirst:
      "Une panne informatique à l’hôpital n’arrête pas le travail. Elle oblige les soignants à travailler sans les informations qu’ils auraient dû avoir — une défaillance d’un autre ordre, et plus grave.",
    pressures: [
      "Des dossiers patients nécessaires au point de soin, sans délai",
      "Des obligations de confidentialité sur des données personnelles sensibles",
      "Des systèmes cliniques et d’imagerie aux exigences d’infrastructure spécifiques",
      "Un fonctionnement continu, sans période creuse programmée",
    ],
    risks: [
      "Des dossiers indisponibles au moment de la décision clinique",
      "L’exposition de données de patients",
      "Un rançongiciel sur des réseaux cliniques non segmentés",
      "Des dispositifs médicaux connectés impossibles à mettre à jour",
    ],
    faqs: [
      { q: "Que faire des dispositifs médicaux impossibles à mettre à jour ?", a: "Les segmenter. Les appareils qui ne peuvent pas recevoir de correctifs sont isolés pour qu’une compromission ne puisse pas se propager, avec des accès entrants et sortants surveillés et strictement contrôlés." },
      { q: "Comment planifier la maintenance sans fenêtre d’arrêt ?", a: "En construisant une redondance qui permet de retirer les composants un par un tout en gardant le système disponible : la maintenance n’exige alors aucune interruption." },
    ],
  },
  education: {
    name: "Éducation",
    summary: "Universités et écoles, avec une charge d’appareils dense, saisonnière et largement non gérée.",
    headline: "Des milliers d’appareils que vous ne contrôlez pas, sur un réseau que vous contrôlez.",
    standfirst:
      "Les réseaux éducatifs supportent une population d’appareils qu’aucun autre secteur ne tolère : non gérée, de passage, et concentrée en pics saisonniers brutaux.",
    pressures: [
      "Un Wi-Fi haute densité dans tous les bâtiments du campus",
      "Des pics d’inscriptions et d’examens concentrés sur quelques jours",
      "Des appareils d’étudiants et de personnels non gérés sur une infrastructure partagée",
      "Des budgets contraints face à une demande croissante",
    ],
    risks: [
      "Des systèmes d’inscription ou d’examen qui cèdent sous la charge",
      "L’exposition des dossiers étudiants",
      "Des appareils compromis qui se propagent sur un réseau à plat",
      "Des données de recherche ou administratives perdues faute de sauvegarde restaurable",
    ],
    faqs: [
      { q: "Comment absorber les pics saisonniers de façon économique ?", a: "En dimensionnant l’infrastructure possédée pour la charge normale et en recourant à une capacité élastique pour le pic, quand la charge le permet. Dimensionner tout un parc pour quelques jours par an est rarement le bon choix." },
      { q: "Comment éviter que les appareils non gérés deviennent un risque ?", a: "En les plaçant sur leur propre segment réseau, sans aucune route vers les systèmes administratifs ou de gestion des dossiers : un ordinateur d’étudiant infecté n’atteint alors rien d’important." },
    ],
  },
  sme: {
    name: "PME",
    summary: "Des entreprises en croissance qui ont besoin de la rigueur des grands comptes, sans leur budget.",
    headline: "La rigueur d’un grand compte, dimensionnée pour une entreprise sans service informatique.",
    standfirst:
      "Les petites structures font face aux mêmes menaces que les grandes, sans le personnel. La réponse n’est pas moins d’ingénierie. C’est une ingénierie correctement dimensionnée.",
    pressures: [
      "Aucune fonction informatique interne, ou une seule personne qui l’assume de fait",
      "Des contraintes de trésorerie sur l’investissement en infrastructure",
      "Une croissance plus rapide que les systèmes choisis quand l’entreprise était plus petite",
      "Des décisions prises par la direction sans conseil technique",
    ],
    risks: [
      "La perte totale des données, sans sauvegarde restaurable",
      "La compromission de messagerie et la fraude au virement",
      "La dépendance complète envers une seule personne, sans documentation",
      "Un rançongiciel face à un parc sans aucune détection",
    ],
    faqs: [
      { q: "Est-ce abordable pour une petite entreprise ?", a: "Les missions sont dimensionnées selon le parc. Une petite structure a besoin de sauvegardes vérifiées, de correctifs à jour, d’accès maîtrisés et d’un plan de reprise : c’est un travail proportionné, pas un programme de grand compte. Le coût de l’alternative se découvre généralement lors d’un incident." },
      { q: "Par où une petite entreprise doit-elle commencer ?", a: "Par la vérification des sauvegardes et le contrôle des accès. Ce sont les deux mesures qui déterminent le plus sûrement si un incident sera un désagrément ou une menace pour l’entreprise, et toutes deux coûtent peu au regard de leur effet." },
    ],
  },
  "critical-infrastructure": {
    name: "Infrastructures critiques",
    summary: "Opérateurs d’énergie, d’eau, de télécommunications et de transport.",
    headline: "Ici, une panne ne se mesure pas en temps d’arrêt. Elle se mesure en conséquences.",
    standfirst:
      "Les opérateurs de services essentiels ont un profil de défaillance qu’aucun système commercial ne connaît : les effets retombent sur des personnes qui n’ont jamais été leurs clients.",
    pressures: [
      "Des technologies opérationnelles au cycle de vie de plusieurs décennies",
      "La convergence d’une OT autrefois isolée avec l’informatique de gestion",
      "Des sites géographiquement dispersés et souvent sans personnel",
      "Des obligations réglementaires de continuité et de déclaration d’incidents",
    ],
    risks: [
      "Une compromission informatique qui atteint les technologies opérationnelles",
      "Des systèmes de contrôle historiques impossibles à corriger ou à remplacer",
      "Des sites distants sans supervision ni contrôle physique",
      "Des temps de reprise longs sur des équipements spécialisés",
    ],
    faqs: [
      { q: "Comment séparer l’OT de l’informatique de gestion ?", a: "Par une segmentation imposée, avec des points de passage minimaux, contrôlés et surveillés. L’objectif : qu’une compromission de l’informatique de gestion n’ait aucun chemin vers les systèmes opérationnels, et que chaque passage légitime soit délibéré et journalisé." },
      { q: "Comment superviser des sites distants sans personnel ?", a: "Avec une instrumentation locale qui remonte par des chemins redondants, conçue pour que la perte d’un seul lien soit elle-même détectée et signalée, plutôt que de se traduire par un silence." },
    ],
  },
};
