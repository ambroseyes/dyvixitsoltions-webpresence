import type { ArticleSlug, ArticleText } from "../types";

export const articlesFr: Record<ArticleSlug, ArticleText> = {
  "multi-wan-failover-that-actually-fails-over": {
    title: "Une bascule multi-WAN qui bascule vraiment",
    description:
      "La plupart des installations à double lien ne basculent que sur coupure de câble. Un guide pratique pour concevoir une bascule qui résiste aux pannes réelles — défaillances grises, chemins amont partagés et sessions figées.",
    topics: ["Réseaux", "SD-WAN", "Continuité d’activité", "Infrastructure"],
    body: [
      {
        type: "p",
        text: "Un second lien internet est l’un des investissements de résilience les plus courants — et l’un des plus souvent gaspillés. Le lien est acheté, branché, configuré comme route de secours, puis jamais confronté aux pannes qui se produisent réellement. Le jour de la coupure, la bascule ne se déclenche pas, ou se déclenche vers quelque chose d’aussi cassé.",
      },
      {
        type: "p",
        text: "L’écart est presque toujours le même : la conception a été testée contre le seul mode de défaillance facile à simuler — débrancher le câble — et contre aucun de ceux qui surviennent en pratique.",
      },

      { type: "h2", id: "grey-failures", text: "La panne que vous avez testée est la plus rare" },
      {
        type: "p",
        text: "Une coupure franche du lien est la défaillance la plus facile à détecter, et la moins fréquente sur le terrain. Bien plus courante est la défaillance grise : l’interface reste active, la route reste dans la table, les paquets passent encore — et le lien est inutilisable. Perte de paquets massive, latence qui grimpe à plusieurs secondes, équipement amont qui absorbe le trafic, ou portail captif qui intercepte les sessions après un impayé.",
      },
      {
        type: "p",
        text: "L’état de l’interface ne dit rien de tout cela. Une conception qui ne bascule que sur perte de lien restera indéfiniment sur un lien principal mort, puisque du point de vue du routeur, tout va bien.",
      },
      {
        type: "ul",
        items: [
          "Lien actif, forte perte de paquets — voix inutilisable, TCP au ralenti, interface au vert",
          "Lien actif, trou noir en amont — le trafic part et ne revient jamais",
          "Lien actif, résolveur DNS en panne — tout semble cassé pour les utilisateurs, rien ne l’est pour le routeur",
          "Lien actif, portail captif injecté — le HTTPS casse d’une manière qui ressemble à un problème de certificat",
        ],
      },
      {
        type: "callout",
        title: "La règle",
        text: "La bascule doit être pilotée par une sonde de santé qui mesure la joignabilité à travers le lien, vers une cible située au-delà du réseau de l’opérateur — jamais par le seul état de l’interface.",
      },

      { type: "h2", id: "probe-design", text: "Concevoir la sonde" },
      {
        type: "p",
        text: "Une sonde de santé répond à une seule question : un trafic réel peut-il faire l’aller-retour par ce lien, maintenant ? Trois choix déterminent si elle y répond honnêtement.",
      },
      { type: "h3", text: "Sonder la bonne cible" },
      {
        type: "p",
        text: "Sonder la passerelle de l’opérateur confirme seulement que le dernier kilomètre fonctionne — c’est-à-dire précisément la partie qui marche encore lors d’une panne en amont. Sondez une cible au-delà du réseau de l’opérateur, et sondez-en plusieurs, pour que la panne de la cible elle-même ne soit pas prise pour celle du lien.",
      },
      { type: "h3", text: "Mesurer la qualité, pas seulement la joignabilité" },
      {
        type: "p",
        text: "Une sonde qui vérifie seulement qu’une réponse revient maintiendra en service un lien qui perd quarante pour cent des paquets. Suivez la perte et la latence sur une fenêtre glissante, et basculez sur dégradation, pas seulement sur absence.",
      },
      { type: "h3", text: "Fixer les seuils selon l’application, pas selon le lien" },
      {
        type: "p",
        text: "Le seuil qui compte est celui à partir duquel votre charge réelle cesse de fonctionner. La voix se dégrade fortement vers un pour cent de perte et 150 ms de gigue. Une synchronisation de fichiers tolère bien pire. Choisissez la valeur d’après l’application que vous ne pouvez pas vous permettre de perdre.",
      },
      {
        type: "code",
        lang: "text",
        code: `Conception de sonde, minimum viable :

  cibles       2+ hôtes au-delà du réseau de l'opérateur, sur des réseaux différents
  intervalle   1 s
  fenêtre      5 échecs consécutifs pour déclarer le lien tombé
  reprise      30 s de bonne santé avant de le déclarer rétabli
  mesures      perte %, latence p95, gigue
  seuils       déduits de la charge la plus sensible`,
      },
      {
        type: "p",
        text: "L’asymétrie entre le seuil de panne et le seuil de reprise compte. Basculer vite limite la coupure ; revenir vite sur un lien instable transforme une coupure en une série de coupures. La reprise doit être lente et délibérée.",
      },

      { type: "h2", id: "shared-path", text: "Deux liens, une seule panne" },
      {
        type: "p",
        text: "L’erreur la plus coûteuse en multi-WAN consiste à acheter deux liens qui partagent un chemin de défaillance. C’est facile à faire sans le vouloir, et fréquent sur les marchés où quelques opérateurs possèdent l’infrastructure et se la revendent entre eux.",
      },
      {
        type: "p",
        text: "Deux contrats avec deux sociétés différentes peuvent tout de même reposer sur une seule fibre dans un seul fourreau, un seul fournisseur de transit amont, un seul point d’entrée dans le bâtiment, ou une seule alimentation électrique pour la baie où les deux aboutissent. Quand cet élément commun lâche, les deux liens tombent ensemble et tout l’investissement ne sert à rien.",
      },
      {
        type: "ol",
        items: [
          "Demandez à chaque opérateur le chemin physique jusqu’au bâtiment et le point d’entrée utilisé.",
          "Demandez qui leur fournit le transit amont, et vérifiez si les réponses concordent.",
          "Suivez les deux liens jusqu’à leur terminaison et vérifiez qu’ils ne partagent ni alimentation ni onduleur.",
          "Lorsqu’une vraie diversité est impossible, changez de support — fibre plus radio fixe ou cellulaire — pour qu’une coupure de fourreau ne puisse pas emporter les deux.",
        ],
      },
      {
        type: "callout",
        title: "Le test qui le prouve",
        text: "Demandez aux deux opérateurs, séparément et par écrit, de décrire le chemin physique. Des chemins distincts donnent des réponses différentes. Des réponses identiques signifient que vous avez acheté deux fois le même lien.",
      },

      { type: "h2", id: "sessions", text: "Basculer n’est pas assurer la continuité" },
      {
        type: "p",
        text: "Router le trafic vers le lien secondaire change l’adresse source du trafic sortant. Chaque session TCP établie se rompt. Chaque tunnel VPN se renégocie. Chaque application qui maintient une connexion longue se reconnecte — et celles qui ne savent pas le faire proprement s’arrêtent, tout simplement.",
      },
      {
        type: "p",
        text: "Les utilisateurs vivent cela comme une coupure alors même que la bascule a fonctionné exactement comme prévu. C’est pourquoi tant d’installations correctement configurées sont malgré tout signalées comme défaillantes.",
      },
      {
        type: "ul",
        items: [
          "Terminez les VPN sur une adresse qui ne change pas, ou faites passer les tunnels sur les deux liens en même temps plutôt que de basculer de l’un à l’autre",
          "Publiez des enregistrements DNS avec des TTL assez courts pour être utiles lors d’une bascule, fixés avant d’en avoir besoin",
          "Vérifiez que les applications métiers se reconnectent seules, et corrigez celles qui ne le font pas",
          "Gardez le résolveur joignable par les deux chemins — un DNS qui bascule plus lentement que le routage est une cause très fréquente de bascule qui semble ne pas avoir fonctionné",
        ],
      },

      { type: "h2", id: "testing", text: "Testez-la comme elle cassera" },
      {
        type: "p",
        text: "Débrancher le lien principal teste le scénario le moins probable. Un vrai programme de tests exerce les défaillances grises, pendant les heures ouvrées, avec des utilisateurs sur le système.",
      },
      {
        type: "ol",
        items: [
          "Introduisez de la perte de paquets sur le lien principal et vérifiez que la bascule se déclenche au seuil prévu.",
          "Créez un trou noir en amont de votre équipement de bordure en laissant l’interface active.",
          "Mettez en panne le seul résolveur DNS principal et vérifiez que la résolution continue.",
          "Lancez la bascule pendant les heures ouvrées et notez ce que signalent les utilisateurs — c’est le vrai résultat.",
          "Revenez sur le lien principal et vérifiez que les sessions reprennent sans intervention manuelle.",
          "Notez le temps de bascule mesuré. C’est désormais un chiffre que vous pouvez annoncer, pas une supposition.",
        ],
      },
      {
        type: "callout",
        title: "La seule mesure qui compte",
        text: "Non pas si la bascule fonctionne, mais combien de temps la charge a été inutilisable et ce qu’un utilisateur a dû faire pour s’en remettre. Si personne ne l’a mesuré, la bascule n’a pas été testée.",
      },

      { type: "h2", id: "summary", text: "En résumé" },
      {
        type: "ul",
        items: [
          "L’état de l’interface n’est pas un signal de santé — sondez à travers le lien, vers des cibles au-delà du réseau de l’opérateur",
          "Basculez sur dégradation, pas seulement sur absence ; revenez lentement pour éviter les oscillations",
          "Vérifiez par écrit la diversité des chemins physiques avant de supposer que deux liens sont bien deux liens",
          "Anticipez la rupture des sessions — une bascule est un événement de routage, pas une garantie de continuité",
          "Testez les défaillances grises, pendant les heures ouvrées, et notez le temps de reprise mesuré",
        ],
      },
      {
        type: "p",
        text: "Rien de tout cela n’exige d’équipement coûteux. Il faut décider ce qu’est un lien sain pour votre charge de travail, le mesurer en continu, et tester le résultat contre les pannes qui se produisent réellement — et non contre celle qu’il est commode de simuler.",
      },
    ],
  },
};
