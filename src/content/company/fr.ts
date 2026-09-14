import type { CompanyContent } from "../types";

/**
 * Roles are written as functions ("Direction générale", "Développement
 * front-end") rather than gendered job titles: the sources do not state
 * anyone’s pronouns, and a function noun never guesses.
 */
export const companyFr: CompanyContent = {
  entityStatement:
    "D’Yvix IT Solutions est une société d’ingénierie numérique et technologique fondée en 2012 à Yaoundé, au Cameroun, qui conçoit, développe, sécurise et exploite des logiciels, des infrastructures cloud, des réseaux, des systèmes de données et d’IA et des technologies connectées pour des organisations publiques, diplomatiques, internationales et privées en Afrique centrale.",
  tagline: "Ingénierie numérique et technologique, depuis 2012 en Afrique centrale",
  description:
    "Nous concevons, construisons, sécurisons et exploitons les logiciels, infrastructures, réseaux, données et systèmes d’IA des organisations qui ne peuvent pas se permettre qu’ils tombent.",
  countryName: "Cameroun",
  areaServed: ["Cameroun", "Afrique centrale", "Afrique"],

  intro: [
    "D’Yvix IT Solutions a été fondée à Yaoundé en 2012 sur une conviction : l’Afrique centrale mérite la même rigueur technique que l’Europe. L’entreprise compte aujourd’hui une équipe technique permanente de sept personnes, intervient dans neuf domaines d’ingénierie et a mené à bien plus de soixante projets pour des ministères, des missions diplomatiques, des organisations internationales, des institutions financières, des établissements de santé, des opérateurs télécoms et des entreprises privées.",
    "Notre métier est l’ingénierie, pas la revente. Nous ne sommes le canal de distribution d’aucun catalogue de fournisseur, et la recommandation qui conclut un audit consiste souvent à modifier une configuration plutôt qu’à acheter quoi que ce soit. En parallèle des missions clients, l’équipe conçoit et développe ses propres plateformes — dont Back-Node.",
    "Être africain n’est pas ici un argument marketing : cela change l’ingénierie. Le coût de la bande passante, la fiabilité des liaisons, la latence vers la région cloud la plus proche et les obligations de résidence des données sont des contraintes autour desquelles nous concevons, pas des notes de bas de page. C’est aussi ce qu’un prestataire européen ou asiatique ne peut structurellement pas offrir : une vraie capacité d’exécution sur le terrain, à l’heure de l’Afrique de l’Ouest.",
  ],

  timeline: [
    {
      period: "2012",
      title: "Les fondations",
      detail:
        "Fondée à Yaoundé sur une conviction : l’Afrique centrale mérite la même rigueur technique que l’Europe.",
    },
    {
      period: "2015",
      title: "Les premières réalisations marquantes",
      detail:
        "Ministères, santé publique et assurance — une discipline de livraison qui n’a pas varié depuis.",
    },
    {
      period: "2017–19",
      title: "L’ouverture à l’international",
      detail:
        "Une mission diplomatique européenne et des agences des Nations unies nous confient leur infrastructure.",
    },
    {
      period: "2020–21",
      title: "La consolidation",
      detail:
        "Toutes les missions en cours maintenues sans exception, malgré l’incertitude mondiale.",
    },
    {
      period: "2022–25",
      title: "La diversification",
      detail:
        "Plateformes e-commerce, infrastructures de sécurité et vidéosurveillance à grande échelle.",
    },
  ],

  team: [
    { name: "Ambrose-Yves Touko Ngaunji", role: "Direction générale — IT & cybersécurité" },
    { name: "NTCHYNGOUDOU Me Ntoule", role: "Sécurité & cryptographie, back-end" },
    { name: "Nassice Nana", role: "Ingénierie systèmes & réseaux" },
    { name: "Loïc Azeme Bekono", role: "Développement back-end" },
    { name: "Mforbesi Ntohnwi Bih", role: "Développement front-end" },
    { name: "KENFACK MEGOUHOU Vanelle", role: "Développement front-end" },
  ],

  founder: {
    role: "Fondation & direction générale",
    title: "Ingénierie infrastructure & systèmes",
    bio: "{years} ans d’expérience de terrain en déploiement réseau, administration de serveurs, virtualisation et sécurité informatique, auprès d’institutions publiques, d’organisations internationales et d’entreprises privées en Afrique centrale. A fondé D’Yvix en 2012 et en dirige depuis l’orientation technique.",
    certifications: [
      "Cisco Certified Network Associate (CCNA) — Routing & Switching",
      "Microsoft Certified Solutions Associate (MCSA) — Windows Server 2012 & SQL Server 2012",
      "VMware vSphere 5.5",
      "FreeNAS — installation et configuration de NAS",
      "Ubiquiti UniFi Access Point — intérieur / extérieur",
      "Dokmee Enterprise & Dokmee Web — déploiement de GED",
    ],
    languages: ["Français — langue maternelle", "Anglais — niveau professionnel"],
  },

  standards: [
    {
      name: "ISO/IEC 27001",
      qualifier: "aligned",
      note: "Pratiques de gestion de la sécurité de l’information alignées sur la norme.",
    },
    { name: "ITIL Foundation", qualifier: "certified", note: "Gestion des services." },
    {
      name: "AWS Certified Cloud Practitioner",
      qualifier: "certified",
      note: "Fondamentaux du cloud.",
    },
  ],

  sectors: [
    "Ministères",
    "Missions diplomatiques",
    "Organisations internationales",
    "Institutions financières",
    "Établissements de santé",
    "Opérateurs télécoms",
    "Entreprises privées",
  ],

  knowsAbout: [
    "Infrastructures informatiques",
    "Déploiement et câblage réseau",
    "Administration des systèmes",
    "Administration Windows Server",
    "Administration Linux",
    "Virtualisation de serveurs",
    "VMware ESXi",
    "Solutions de sauvegarde et de stockage",
    "Stockage en réseau (NAS)",
    "Reprise après sinistre",
    "Continuité d’activité",
    "Cybersécurité",
    "Sécurité des réseaux",
    "Administration de pare-feu",
    "Sécurité des postes de travail",
    "Supervision des opérations de sécurité",
    "Réseaux sans fil",
    "Génie logiciel",
    "Développement d’applications web",
    "Développement d’API",
    "Architecture microservices",
    "Systèmes de données géospatiales",
    "PostgreSQL et PostGIS",
    "Gestion électronique des documents",
    "Archivage numérique",
    "Cloud computing",
    "DevOps",
    "Kubernetes",
    "Automatisation des processus métier",
    "Automatisation robotisée des processus",
    "Intelligence artificielle appliquée",
    "Grands modèles de langage auto-hébergés",
    "Vidéosurveillance IP",
    "Téléphonie IP",
    "Services managés",
    "Formation technique",
  ],

  trust: [
    { label: "Années d’activité", value: "{years}", source: "Fondée en mai 2012" },
    { label: "Projets livrés", value: "60+", source: "Profil technique de l’entreprise" },
    { label: "Secteurs servis", value: "7", source: "Registres de l’entreprise" },
    { label: "Équipe technique permanente", value: "7", source: "Présentation de l’entreprise" },
  ],
};
