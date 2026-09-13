import type { ProductSlug, ProductText } from "../types";

/**
 * Back-Node is described from its own repository (README, service layout,
 * deployment manifests). The others carry only the facts the company deck
 * states; `description: null` keeps them as cards until a description is
 * supplied — nothing is inferred from a product's name.
 */
export const productsEn: Record<ProductSlug, ProductText> = {
  "back-node": {
    tagline: "Business process automation — iPaaS, visual workflows, RPA and AI in one no-code interface.",
    description:
      "Back-Node is a business process automation platform developed by D’Yvix. It brings together integration (iPaaS), visual workflow design, robotic process automation and artificial intelligence in a no-code interface, so that operational teams can automate processes across their systems without writing code.",
    capabilities: [
      { title: "Visual workflows", description: "Processes designed as workflows in a no-code interface, then executed and traced step by step." },
      { title: "Integration (iPaaS)", description: "Connectors that let workflows read from and act on the systems an organisation already runs." },
      { title: "Robotic process automation", description: "An RPA service for the repetitive steps that systems cannot yet do through an API." },
      { title: "AI in the workflow", description: "AI capabilities available as workflow steps, including recommendation." },
      { title: "Resilient execution", description: "Queued execution with retries and exponential back-off on transient failures, and an immediate stop on business errors." },
      { title: "Operated like a service", description: "Authentication, rate limiting, monitoring and billing built into the platform." },
    ],
    architecture: [
      "Microservices behind an API gateway with JWT authentication and rate limiting",
      "Asynchronous orchestration through a Celery task queue, with an event bus on Redis Streams between services",
      "PostgreSQL, Redis and MongoDB, each for the data it suits",
      "Client and administration interfaces in React",
      "Containerised, with Kubernetes manifests and a GitLab CI pipeline",
      "Observability through Prometheus and Grafana",
    ],
    stack: ["Python", "FastAPI", "Celery", "PostgreSQL", "Redis", "MongoDB", "React", "Docker", "Kubernetes", "GitLab CI", "Prometheus", "Grafana"],
  },
  sacrecheici: {
    tagline: "A real-time web platform with a geospatial backend, in production.",
    description: null,
    capabilities: [],
    architecture: [],
    stack: ["React", "WebSocket", "PostgreSQL", "PostGIS"],
  },
  "lexora-ai": {
    tagline: "An API estate of ten FastAPI microservices.",
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
