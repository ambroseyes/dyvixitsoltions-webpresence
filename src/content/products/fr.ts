import type { ProductSlug, ProductText } from "../types";

export const productsFr: Record<ProductSlug, ProductText> = {
  "back-node": {
    tagline:
      "L’automatisation des processus métier — iPaaS, workflows visuels, RPA et IA dans une interface sans code.",
    description:
      "Back-Node est une plateforme d’automatisation des processus métier développée par D’Yvix. Elle réunit l’intégration (iPaaS), la conception visuelle de workflows, l’automatisation robotisée des processus et l’intelligence artificielle dans une interface sans code, pour que les équipes opérationnelles automatisent leurs processus entre systèmes sans écrire de code.",
    capabilities: [
      {
        title: "Workflows visuels",
        description:
          "Des processus conçus comme des workflows dans une interface sans code, puis exécutés et tracés étape par étape.",
      },
      {
        title: "Intégration (iPaaS)",
        description:
          "Des connecteurs qui permettent aux workflows de lire et d’agir sur les systèmes que l’organisation exploite déjà.",
      },
      {
        title: "Automatisation robotisée (RPA)",
        description:
          "Un service de RPA pour les étapes répétitives que les systèmes ne savent pas encore réaliser par API.",
      },
      {
        title: "L’IA dans le workflow",
        description:
          "Des capacités d’IA disponibles comme étapes de workflow, dont la recommandation.",
      },
      {
        title: "Une exécution résiliente",
        description:
          "Exécution en file d’attente, avec nouvelles tentatives et temporisation exponentielle sur les erreurs passagères, et arrêt immédiat sur les erreurs métier.",
      },
      {
        title: "Exploitée comme un service",
        description:
          "Authentification, limitation de débit, supervision et facturation intégrées à la plateforme.",
      },
    ],
    architecture: [
      "Des microservices derrière une passerelle d’API avec authentification JWT et limitation de débit",
      "Une orchestration asynchrone par file de tâches Celery, avec un bus d’événements sur Redis Streams entre les services",
      "PostgreSQL, Redis et MongoDB, chacun pour les données qui lui conviennent",
      "Des interfaces client et d’administration en React",
      "Conteneurisée, avec des manifestes Kubernetes et une chaîne CI GitLab",
      "Une observabilité assurée par Prometheus et Grafana",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Celery",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "React",
      "Docker",
      "Kubernetes",
      "GitLab CI",
      "Prometheus",
      "Grafana",
    ],
  },
  sacrecheici: {
    tagline: "Une plateforme web temps réel adossée à une base géospatiale, en production.",
    description: null,
    capabilities: [],
    architecture: [],
    stack: ["React", "WebSocket", "PostgreSQL", "PostGIS"],
  },
  "lexora-ai": {
    tagline: "Une architecture d’API de dix microservices FastAPI.",
    description: null,
    capabilities: [],
    architecture: [],
    stack: ["Python", "FastAPI", "Microservices"],
  },
  aegis: {
    tagline: null,
    description: null,
    capabilities: [],
    architecture: [],
    stack: [],
  },
};
