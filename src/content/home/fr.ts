import type { HomeContent } from "../types";

export const homeFr: HomeContent = {
  problems: [
    {
      id: "downtime",
      label: "Interruptions",
      symptom: "Les systèmes tombent sans prévenir, et la reprise dépend de qui est disponible.",
      consequence:
        "Le travail s’arrête. Le chiffre d’affaires s’arrête. La confiance met plus de temps à revenir que les systèmes.",
      response:
        "Supprimer les points de défaillance uniques, vérifier les sauvegardes en les restaurant, et instrumenter les chemins critiques pour que la dégradation apparaisse avant de devenir une panne.",
      expertise: "cloud-infrastructure",
    },
    {
      id: "threats",
      label: "Cybermenaces",
      symptom: "Aucune vision actuelle de l’exposition, et aucun moyen de détecter une intrusion en cours.",
      consequence:
        "La compromission se découvre par ses conséquences — fichiers chiffrés, virement frauduleux, appel du régulateur.",
      response:
        "Établir l’exposition réelle, fermer ce qui est exploitable par ordre de risque, et mettre de la détection là où il n’y en avait pas.",
      expertise: "cybersecurity",
    },
    {
      id: "connectivity",
      label: "Connectivité instable",
      symptom: "Les sites perdent le contact, et le lien de secours tombe en même temps que le lien principal.",
      consequence:
        "Les agences s’arrêtent, les appels coupent, et le second lien que vous payez partage en réalité le chemin du premier.",
      response:
        "Mesurer le trafic et les chemins réels, concevoir pour la panne de chaque lien, et tester la bascule sur de vraies pannes plutôt qu’en débranchant un câble.",
      expertise: "networks-telecom",
    },
    {
      id: "software-limits",
      label: "Limites logicielles",
      symptom: "Les mêmes données ressaisies dans des systèmes qui ne savent pas les échanger.",
      consequence:
        "Le temps du personnel part en recopie, et chaque copie est une occasion pour les chiffres de diverger.",
      response:
        "Intégrer l’existant là où c’est possible, et ne développer que ce qui doit vraiment l’être.",
      expertise: "digital-engineering",
    },
    {
      id: "manual-ops",
      label: "Inefficacité opérationnelle",
      symptom: "Des tâches répétitives, régies par des règles, absorbent des heures qui devraient aller ailleurs.",
      consequence:
        "La capacité est consommée par un travail qui ne crée aucun avantage, et elle croît au rythme des effectifs.",
      response:
        "Automatiser les étapes régies par des règles, mesurer face au processus manuel, et laisser les décisions importantes à une personne.",
      expertise: "ai-data",
    },
    {
      id: "no-owner",
      label: "Personne n’est responsable",
      symptom: "L’informatique est traitée quand quelque chose casse, par qui a le temps.",
      consequence:
        "La maintenance est repoussée jusqu’à devenir un incident, et chaque incident commence par chercher comment les choses ont été configurées.",
      response:
        "Convenir d’un niveau de service, instrumenter le parc, et placer derrière un responsable nommé et un circuit d’escalade.",
      expertise: "managed-services",
    },
  ],

  finder: [
    {
      id: "unreliable",
      prompt: "Mon infrastructure n’est pas fiable.",
      recommendation: "Audit de résilience de l’infrastructure",
      rationale:
        "Une instabilité récurrente vient presque toujours d’un petit nombre de dépendances non documentées, plutôt que d’une faiblesse générale. L’audit les identifie.",
      deliverables: [
        "Revue de l’infrastructure et de la topologie",
        "Évaluation des chemins réseau et de la redondance",
        "Analyse de disponibilité et des points de défaillance",
        "Test d’intégrité et de restauration des sauvegardes",
        "Revue de sécurité",
        "Plan de remédiation priorisé",
      ],
      ctaLabel: "Demander un audit",
      ctaHref: "/request-audit?scope=cloud-infrastructure",
      expertise: "cloud-infrastructure",
    },
    {
      id: "security",
      prompt: "J’ai besoin d’une meilleure cybersécurité.",
      recommendation: "Audit de posture de sécurité",
      rationale:
        "Acheter des protections avant d’avoir établi l’exposition revient souvent à défendre ce qui l’était déjà. L’audit fixe l’ordre des priorités.",
      deliverables: [
        "Revue du réseau et de la segmentation",
        "Revue de la configuration des pare-feu et du périmètre",
        "Analyse de la couverture des postes",
        "Revue des identités et des privilèges",
        "Évaluation du niveau de correctifs",
        "Constats écrits et remédiation ordonnée par risque",
      ],
      ctaLabel: "Demander un audit de sécurité",
      ctaHref: "/request-audit?scope=cybersecurity",
      expertise: "cybersecurity",
    },
    {
      id: "cloud",
      prompt: "Je veux migrer vers le cloud.",
      recommendation: "Audit de migration cloud",
      rationale:
        "La question n’est pas de migrer ou non, mais de savoir quelles charges migrer. Certaines doivent rester, et l’audit dit lesquelles.",
      deliverables: [
        "Inventaire des charges et cartographie des dépendances",
        "Comparaison des coûts totaux selon trois scénarios",
        "Mesure de la latence et de la bande passante",
        "Analyse de la résidence des données",
        "Plan de migration par vagues",
        "Stratégie de retour arrière pour chaque vague",
      ],
      ctaLabel: "Demander un audit de migration",
      ctaHref: "/request-audit?scope=cloud-infrastructure",
      expertise: "cloud-infrastructure",
    },
    {
      id: "connectivity",
      prompt: "Je dois interconnecter mes sites.",
      recommendation: "Relevé réseau et connectivité",
      rationale:
        "La connectivité lâche d’abord aux extrémités, et sur des chemins qui semblent indépendants sans l’être. Le relevé les repère avant qu’ils ne tombent ensemble.",
      deliverables: [
        "Relevé des sites et inventaire des usages",
        "Mesure du trafic et des chemins",
        "Analyse des chemins partagés et des points de défaillance uniques",
        "Évaluation de la couverture sans fil",
        "Conception de la bascule et plan de test",
        "Plan de remédiation priorisé",
      ],
      ctaLabel: "Planifier votre réseau",
      ctaHref: "/contact?scope=networks-telecom",
      expertise: "networks-telecom",
    },
    {
      id: "software",
      prompt: "J’ai besoin d’un logiciel sur mesure.",
      recommendation: "Mission de cadrage logiciel",
      rationale:
        "L’erreur coûteuse, c’est de bien construire la mauvaise chose. Le cadrage établit d’abord ce que le travail exige réellement.",
      deliverables: [
        "Observation et analyse des processus",
        "Recommandation : développer ou acheter",
        "Définition du périmètre fonctionnel",
        "Proposition d’architecture",
        "Plan de livraison par incréments",
        "Estimation indicative de la charge",
      ],
      ctaLabel: "Parler de votre projet logiciel",
      ctaHref: "/contact?scope=digital-engineering",
      expertise: "digital-engineering",
    },
    {
      id: "automate",
      prompt: "Je veux automatiser nos opérations.",
      recommendation: "Revue des opportunités d’automatisation",
      rationale:
        "L’automatisation est rentable là où le travail est volumineux et régi par des règles. La revue identifie ces tâches et écarte les autres.",
      deliverables: [
        "Inventaire des tâches, avec mesure des volumes et des temps",
        "Évaluation de l’adéquation, tâche par tâche",
        "Vérification de la disponibilité des données",
        "Périmètre du pilote et critères de succès",
        "Estimation de la charge et du retour sur investissement",
      ],
      ctaLabel: "Parler d’un pilote d’automatisation",
      ctaHref: "/contact?scope=ai-data",
      expertise: "ai-data",
    },
    {
      id: "ai",
      prompt: "J’ai besoin de capacités d’IA.",
      recommendation: "Cadrage d’un pilote d’IA ancrée",
      rationale:
        "Une IA utile en entreprise est ciblée et ancrée dans vos propres sources. Le cadrage identifie où c’est réellement le cas.",
      deliverables: [
        "Identification et priorisation des cas d’usage",
        "Évaluation des sources et de la disponibilité des données",
        "Définition du niveau de précision requis",
        "Décision sur le traitement et la résidence des données",
        "Périmètre de pilote ciblé",
        "Méthode d’évaluation",
      ],
      ctaLabel: "Parler d’un pilote d’IA",
      ctaHref: "/contact?scope=ai-data",
      expertise: "ai-data",
    },
    {
      id: "field",
      prompt: "Je dois superviser des équipements sur le terrain.",
      recommendation: "Cadrage de systèmes connectés",
      rationale:
        "Un système de terrain réussit ou échoue sur l’énergie, la connectivité et ce qui doit continuer à fonctionner hors ligne. Le cadrage tranche ces contraintes avant de choisir le moindre appareil.",
      deliverables: [
        "Inventaire des équipements et des sites",
        "Contraintes d’énergie et de connectivité",
        "Conception du chemin des données",
        "Arbitrage entre edge et centre",
        "Cadre réglementaire, lorsque des drones ou des liaisons radio sont en jeu",
        "Périmètre du pilote et critères de succès",
      ],
      ctaLabel: "Parler d’un projet de systèmes connectés",
      ctaHref: "/contact?scope=iot-edge",
      expertise: "iot-edge",
    },
    {
      id: "recovery",
      prompt: "J’ai besoin d’un plan de reprise.",
      recommendation: "Audit de continuité d’activité",
      rationale:
        "La capacité de reprise est une mesure, pas un plan. Cet audit établit où en est la vôtre.",
      deliverables: [
        "Audit de la couverture et de l’intégrité des sauvegardes",
        "Test de restauration réel et chronométré",
        "Définition des objectifs de reprise",
        "Analyse des écarts de continuité",
        "Procédure de reprise documentée",
        "Plan de test de bascule",
      ],
      ctaLabel: "Demander un audit de continuité",
      ctaHref: "/request-audit?scope=cloud-infrastructure",
      expertise: "cloud-infrastructure",
    },
    {
      id: "unsure",
      prompt: "Je ne sais pas par où commencer.",
      recommendation: "Séance de découverte",
      rationale:
        "Un échange structuré sur le fonctionnement de l’organisation, ce qui casse et ce que cela coûte — avant de proposer quoi que ce soit.",
      deliverables: [
        "Échange de découverte structuré",
        "Synthèse de l’existant",
        "Identification des risques et des priorités",
        "Première mission recommandée",
        "Sans engagement",
      ],
      ctaLabel: "Réserver une séance de découverte",
      ctaHref: "/contact?scope=discovery",
      expertise: "consulting-rd",
    },
  ],

  pillars: [
    {
      verb: "Construire",
      lede: "Nous construisons",
      items: [
        "Logiciels, plateformes et API",
        "Infrastructures cloud et hybrides",
        "Réseaux et connectivité",
        "Systèmes de données et d’IA",
        "Automatisation et workflows",
        "Systèmes connectés et edge",
      ],
      href: "/expertise/digital-engineering",
    },
    {
      verb: "Sécuriser",
      lede: "Nous sécurisons",
      items: [
        "Réseaux et périmètres",
        "Postes de travail",
        "Identités et privilèges",
        "Applications et API",
        "Environnements cloud",
        "Données et sauvegardes",
      ],
      href: "/expertise/cybersecurity",
    },
    {
      verb: "Opérer",
      lede: "Nous opérons",
      items: [
        "Infrastructures et cloud",
        "Réseaux et sites",
        "Supervision et alertes",
        "Sauvegarde et reprise",
        "Contrôles de sécurité",
        "Support de niveau 1 à 3",
      ],
      href: "/expertise/managed-services",
    },
  ],

  method: [
    { title: "Découvrir", description: "Comprendre l’organisation, le travail et ce que coûte réellement une panne." },
    { title: "Évaluer", description: "Mesurer l’existant. Documenter ce qui existe, et non ce que l’on croit qu’il existe." },
    { title: "Concevoir", description: "Définir l’état cible et l’ordre des changements qui vous permet de continuer à fonctionner tout du long." },
    { title: "Construire", description: "Mettre en œuvre par incréments réversibles, chacun validé avant le suivant." },
    { title: "Sécuriser", description: "Durcir, revoir les accès, et vérifier que les contrôles se comportent comme prévu." },
    { title: "Déployer", description: "Passer en production avec un chemin de retour arrière déjà éprouvé." },
    { title: "Exploiter", description: "Superviser, maintenir et assurer le support selon un niveau convenu." },
    { title: "Optimiser", description: "Faire le point, chiffres à l’appui, et réinjecter les constats dans le cycle suivant." },
  ],

  answers: [
    {
      q: "Que fait D’Yvix IT Solutions ?",
      a: "{entity} Elle a mené à bien plus de 60 projets depuis 2012 et intervient dans neuf domaines d’ingénierie : ingénierie numérique et logicielle ; cloud, infrastructure et DevOps ; cybersécurité et résilience numérique ; IA, data et automatisation ; réseaux, télécoms et connectivité ; IoT, edge et systèmes autonomes ; produit, UX et qualité logicielle ; conseil, audit, R&D et innovation ; services managés et support.",
    },
    {
      q: "Où D’Yvix IT Solutions est-elle basée ?",
      a: "D’Yvix IT Solutions opère depuis Yaoundé et Douala, au Cameroun, et accompagne des organisations au Cameroun, en Afrique centrale et sur l’ensemble du continent. Elle est joignable à {email} ou au {phone}, en français ou en anglais, à l’heure de l’Afrique de l’Ouest (UTC+1).",
    },
    {
      q: "Depuis quand D’Yvix existe-t-elle ?",
      a: "Depuis mai 2012 — soit {years} ans. L’entreprise a grandi jusqu’à compter une équipe technique permanente de sept personnes, avec plusieurs relations clients de huit ans ou plus, dont une plateforme de stockage gérée sans interruption de 2015 à 2023 et un parc sans fil maintenu de 2013 à 2021.",
    },
    {
      q: "Qu’a développé D’Yvix en propre ?",
      a: "En parallèle des missions clients, D’Yvix développe ses propres plateformes. Back-Node, une plateforme d’automatisation des processus métier qui réunit iPaaS, workflows visuels, RPA et IA dans une interface sans code, est en développement. SaCrècheIci, une plateforme web temps réel adossée à une base géospatiale, est en production. Lexora AI et AEGIS seront documentées ici au fil de leur publication.",
    },
    {
      q: "Quels services de cybersécurité D’Yvix propose-t-elle ?",
      a: "Audit et évaluation de sécurité, sécurité des pare-feu et du périmètre, notamment FortiGate, protection des postes et EDR, surveillance de sécurité dans un contexte SOC, gestion des identités et du moindre privilège, pratiques de développement sécurisé, et plans de continuité d’activité. D’Yvix assure sans interruption la sécurité réseau d’une mission diplomatique européenne depuis 2019.",
    },
    {
      q: "Quels secteurs D’Yvix accompagne-t-elle ?",
      a: "Ministères, missions diplomatiques, organisations internationales, institutions financières, établissements de santé, opérateurs télécoms et entreprises privées. Parmi les réalisations : un système de gestion électronique des documents pour un ministère, la virtualisation d’institutions publiques nationales et une infrastructure de stockage pour un opérateur télécom.",
    },
    {
      q: "D’Yvix est-elle certifiée ISO 27001 ?",
      a: "Les pratiques de sécurité de l’information de l’entreprise sont alignées sur l’ISO/IEC 27001 : accords de confidentialité signés avant tout accès aux systèmes sensibles, accès au moindre privilège limité aux membres affectés, pratiques de développement sécurisé. Elle détient également les certifications ITIL Foundation et AWS Certified Cloud Practitioner. Demandez-nous l’état exact de la certification avant de vous en prévaloir dans un appel d’offres.",
    },
    {
      q: "Avec quelles technologies D’Yvix travaille-t-elle ?",
      a: "VMware ESXi, Windows Server et Red Hat Enterprise Linux ; le stockage TrueNAS et FreeNAS ; les réseaux Cisco, MikroTik et Ubiquiti ; la sécurité FortiGate et Kaspersky ; Docker, Kubernetes, GitLab CI, Grafana, Prometheus et Zabbix ; Python, FastAPI, Laravel, React et TypeScript ; PostgreSQL avec PostGIS ; et des modèles de langage auto-hébergés servis avec vLLM. Les partenariats technologiques incluent Microsoft, Cisco, Fortinet, Google Cloud, AWS, Oracle, Kaspersky et OVH.",
    },
    {
      q: "D’Yvix travaille-t-elle avec des drones ?",
      a: "Les drones et technologies autonomes relèvent du domaine IoT, edge et systèmes autonomes de D’Yvix, sous réserve des autorisations, certifications et réglementations applicables à chaque déploiement. Tout projet de ce type commence par l’établissement du cadre réglementaire, avant le cadre technique.",
    },
    {
      q: "Comment demander un audit à D’Yvix ?",
      a: "Par le formulaire de demande d’audit de ce site, par e-mail à {email}, ou par téléphone. Un audit commence par un échange de cadrage, se poursuit par l’état des lieux et les mesures, et se conclut par un rapport écrit : constats, risque métier de chacun, et séquence de remédiation ordonnée par risque.",
    },
  ],

  techCategories: [
    {
      id: "infrastructure",
      label: "Infrastructure",
      note: "Calcul, stockage et les systèmes sur lesquels tout repose",
      items: ["VMware ESXi", "Windows Server", "Red Hat Enterprise Linux", "Dell PowerEdge", "HP ProLiant", "TrueNAS", "FreeNAS"],
    },
    {
      id: "network",
      label: "Réseaux & télécoms",
      note: "Routage, sans-fil et liaisons entre sites",
      items: ["Cisco", "MikroTik", "Ubiquiti UniFi", "Ubiquiti NanoBeam", "Fibre optique", "PBX TrixBox", "SIP", "Passerelles GSM"],
    },
    {
      id: "security",
      label: "Sécurité",
      note: "Périmètre, postes, identités et détection",
      items: ["FortiGate", "Kaspersky EDR", "Kaspersky Endpoint", "G-Data EndPoint", "SIEM", "EDR", "IAM", "VPN"],
    },
    {
      id: "cloud",
      label: "Cloud & DevOps",
      note: "Public, privé et hybride — et les chaînes qui y livrent",
      items: ["AWS", "Google Cloud", "OVH", "Docker", "Kubernetes", "GitLab CI", "Prometheus", "Grafana", "Zabbix"],
    },
    {
      id: "software",
      label: "Logiciel",
      note: "Ingénierie d’applications et d’API",
      items: ["Python", "FastAPI", "Celery", "Laravel", "PHP", "React", "TypeScript", "WebSocket", "PostgreSQL", "PostGIS", "MySQL", "MongoDB", "Redis"],
    },
    {
      id: "ai",
      label: "IA & data",
      note: "Des systèmes ancrés et les chaînes qui les alimentent",
      items: ["DeepSeek", "vLLM", "Génération augmentée par la recherche (RAG)", "RPA", "SQL Server", "Dokmee"],
    },
    {
      id: "edge",
      label: "IoT & edge",
      note: "Des équipements connectés sur le terrain",
      items: ["Caméras IP", "Maillage sans fil", "Liaisons radio longue portée", "Supervision à distance", "Géolocalisation PostGIS"],
    },
  ],
};
