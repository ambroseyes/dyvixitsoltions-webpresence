import type { PagesContent } from "../types";

/** Placeholders are marked "À COMPLÉTER —" in French. */
export const pagesFr: PagesContent = {
  privacy: {
    label: "Confidentialité",
    metaTitle: "Politique de confidentialité",
    description: "Comment {legalName} traite les données personnelles transmises par ce site.",
    title: "Ce que nous collectons, et ce que nous en faisons.",
    standfirst:
      "Cette page décrit ce que fait ce site aujourd’hui. Si cela change — mesure d’audience, CRM, liste de diffusion —, elle changera avec lui.",
    sections: [
      {
        label: "Ce que nous collectons",
        paragraphs: [
          "Uniquement ce que vous saisissez dans le formulaire de contact : votre nom, votre organisation, votre adresse e-mail, votre numéro de téléphone (facultatif), les domaines sélectionnés, votre calendrier et votre message.",
          "Nous n’utilisons ni traceurs publicitaires, ni outil tiers de mesure d’audience, ni cookies de profilage. Le site ne dépose aucun cookie pour son propre usage. Votre préférence de thème est enregistrée dans le stockage local de votre navigateur et ne nous est jamais transmise.",
        ],
      },
      {
        label: "Pourquoi nous les conservons",
        paragraphs: [
          "Pour répondre à votre demande et, si elle aboutit, cadrer la mission. Nous ne les vendons pas et ne les partageons pas avec des tiers pour leurs propres besoins, et nous ne vous inscrivons à aucune liste de diffusion parce que vous nous avez contactés.",
        ],
      },
      {
        label: "Durée de conservation",
        paragraphs: [
          "Les demandes qui n’aboutissent pas à une mission sont supprimées une fois l’échange clairement terminé. Lorsqu’une mission suit, les données sont conservées aussi longtemps que l’exigent la relation commerciale et les obligations légales ou comptables.",
        ],
      },
      {
        label: "Journaux serveur",
        paragraphs: [
          "L’infrastructure d’hébergement enregistre les journaux de requêtes habituels, adresse IP comprise, à des fins d’exploitation et de prévention des abus. Le contenu des formulaires n’est volontairement pas écrit dans les journaux applicatifs.",
        ],
      },
      {
        label: "Vos droits",
        paragraphs: [
          "Vous pouvez nous demander quelles données nous détenons à votre sujet, les faire corriger ou les faire supprimer. Écrivez à {email} et nous vous répondrons.",
        ],
        placeholder:
          "À COMPLÉTER — l’identité du responsable de traitement, la base légale applicable et l’autorité de contrôle compétente doivent être confirmées au regard du droit camerounais de la protection des données et de toute autre juridiction où D’Yvix intervient, avant la mise en ligne.",
      },
    ],
  },

  legal: {
    label: "Mentions légales",
    metaTitle: "Mentions légales",
    description: "Informations sur l’éditeur et mentions légales de {url}.",
    title: "Mentions légales.",
    standfirst: "Informations sur l’éditeur de ce site.",
    publisherLabels: { name: "Nom", email: "E-mail", phone: "Téléphone", location: "Localisation" },
    sections: [
      {
        label: "Éditeur",
        paragraphs: [],
        placeholder:
          "À COMPLÉTER — la dénomination sociale, le numéro d’immatriculation, l’identifiant fiscal, l’adresse du siège, le capital social et le nom de la personne responsable de la publication doivent être fournis par D’Yvix et ajoutés ici avant la mise en ligne.",
      },
      {
        label: "Hébergement",
        paragraphs: [],
        placeholder:
          "À COMPLÉTER — nom, adresse et coordonnées de l’hébergeur, à ajouter une fois la cible de déploiement confirmée.",
      },
      {
        label: "Propriété intellectuelle",
        paragraphs: [
          "Le contenu, la conception et le code source de ce site sont la propriété de {legalName}, sauf mention contraire. Les noms de technologies tierces sont des marques de leurs propriétaires respectifs. Leur présence sur ce site indique une pratique professionnelle, ou un partenariat lorsqu’il est expressément mentionné — jamais une recommandation, une certification ou un statut de revendeur agréé.",
        ],
      },
    ],
  },

  auditFaqs: [
    {
      q: "Combien coûte un audit ?",
      a: "Cela dépend de la taille du parc et du nombre de sites : le montant est donc chiffré après un court échange de cadrage plutôt qu’estimé ici. Le périmètre, les livrables et le prix sont validés par écrit avant le démarrage, et le prix ne bouge pas tant que le périmètre ne bouge pas.",
    },
    {
      q: "Combien de temps faut-il ?",
      a: "Pour un site unique, généralement une à deux semaines entre le lancement et le rapport écrit. Les parcs multisites prennent plus de temps, surtout en raison du nombre de sites plutôt que de la complexité de chacun.",
    },
    {
      q: "L’audit va-t-il perturber notre activité ?",
      a: "Non. Un audit est par défaut en lecture seule : revue de configuration, analyse passive et entretiens avec votre équipe. Toute intervention intrusive — scan actif en production ou test de restauration réel — est planifiée et validée par écrit au préalable.",
    },
    {
      q: "Que recevons-nous concrètement ?",
      a: "Un rapport écrit : ce qui a été examiné, ce qui a été constaté, le risque métier associé à chaque constat, et une séquence de remédiation ordonnée par risque. Il est rédigé pour être remis à une direction ou à un cabinet d’audit, et il vous appartient, que vous nous confiiez ou non la remédiation.",
    },
    {
      q: "Sommes-nous obligés de confier la remédiation à D’Yvix ?",
      a: "Non. Le rapport est un livrable à part entière, rédigé pour qu’un autre prestataire puisse s’en servir. Si la bonne réponse est que votre prestataire actuel doit corriger, le rapport le dit.",
    },
  ],

  insightsPlanned: [
    "Bascule SD-WAN FortiGate : architecture et dépannage",
    "Concevoir des applications FastAPI sécurisées pour l’entreprise",
    "Architecture de continuité pour des systèmes qui ne peuvent pas s’arrêter",
    "Migrer vers le cloud quand la contrainte est la bande passante, pas le calcul",
    "Segmenter un réseau à plat sans arrêter l’activité",
  ],
};
