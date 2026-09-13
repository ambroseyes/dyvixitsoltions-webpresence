import type { PagesContent } from "../types";

/**
 * Long-form page copy. `{email}` in a paragraph renders as a mailto link;
 * `{legalName}` and `{url}` are filled from lib/site. Placeholders are marked
 * "PLACEHOLDER —" and rendered visibly until D’Yvix supplies the facts.
 */
export const pagesEn: PagesContent = {
  privacy: {
    label: "Privacy",
    metaTitle: "Privacy Notice",
    description: "How {legalName} handles personal data submitted through this website.",
    title: "What we collect, and what we do with it.",
    standfirst:
      "This describes what this website does today. If that changes — analytics, a CRM, a mailing list — this page changes with it.",
    sections: [
      {
        label: "What we collect",
        paragraphs: [
          "Only what you type into the enquiry form: your name, organisation, email address, optional phone number, the areas you selected, your timeline and your message.",
          "We do not use advertising trackers, third-party analytics or profiling cookies. The site sets no cookies for its own purposes. Your theme preference is stored in your browser’s local storage and is never sent to us.",
        ],
      },
      {
        label: "Why we hold it",
        paragraphs: [
          "To reply to your enquiry and, if it proceeds, to scope the work. We do not sell or share it with third parties for their own purposes, and we do not add you to a mailing list because you contacted us.",
        ],
      },
      {
        label: "How long we keep it",
        paragraphs: [
          "Enquiries that do not lead to an engagement are deleted once the conversation has clearly ended. Where an engagement follows, records are retained for as long as the commercial relationship and any legal or accounting obligation requires.",
        ],
      },
      {
        label: "Server logs",
        paragraphs: [
          "The hosting infrastructure records standard request logs, including IP address, for operational and abuse-prevention purposes. Submission contents are deliberately not written to application logs.",
        ],
      },
      {
        label: "Your rights",
        paragraphs: [
          "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to {email} and we will respond.",
        ],
        placeholder:
          "PLACEHOLDER — the identity of the data controller, the applicable legal basis and the competent supervisory authority must be confirmed against Cameroonian data protection law and any other jurisdiction in which D’Yvix operates, before launch.",
      },
    ],
  },

  legal: {
    label: "Legal",
    metaTitle: "Legal Notice",
    description: "Publisher and legal information for {url}.",
    title: "Legal notice.",
    standfirst: "Publisher information for this website.",
    publisherLabels: { name: "Name", email: "Email", phone: "Phone", location: "Location" },
    sections: [
      {
        label: "Publisher",
        paragraphs: [],
        placeholder:
          "PLACEHOLDER — registered company name, registration number, tax identifier, registered address, share capital and the name of the publication director must be supplied by D’Yvix and added here before launch.",
      },
      {
        label: "Hosting",
        paragraphs: [],
        placeholder:
          "PLACEHOLDER — hosting provider name, address and contact details to be added once the deployment target is confirmed.",
      },
      {
        label: "Intellectual property",
        paragraphs: [
          "The content, design and source code of this site are the property of {legalName} unless stated otherwise. Third-party technology names are the trademarks of their respective owners. Their appearance on this site indicates working familiarity, or a partnership where one is expressly stated — never endorsement, certification or authorised-reseller status.",
        ],
      },
    ],
  },

  auditFaqs: [
    {
      q: "What does an assessment cost?",
      a: "It depends on estate size and number of sites, so a figure is quoted after a short scoping conversation rather than guessed here. Scope, deliverables and price are agreed in writing before work starts, and the price does not move unless the scope does.",
    },
    {
      q: "How long does it take?",
      a: "A single-site estate is typically one to two weeks from kick-off to written report. Multi-site estates take longer, driven mainly by the number of locations rather than the complexity of any one of them.",
    },
    {
      q: "Will it disrupt our operations?",
      a: "No. Assessment work is read-only by default: configuration review, passive analysis and interviews with your team. Anything intrusive — active scanning against production, or a live restore test — is scheduled and agreed in writing in advance.",
    },
    {
      q: "What do we actually receive?",
      a: "A written report: what was examined, what was found, the business risk attached to each finding, and a remediation sequence ordered by risk. It is written to be handed to a board or an auditor, and it is yours whether or not you engage us for the remediation.",
    },
    {
      q: "Are we obliged to use D’Yvix for the remediation?",
      a: "No. The report is a deliverable in its own right and is written so another provider could act on it. If the right answer is that your incumbent should fix it, the report says so.",
    },
  ],

  /** Planned, not published — listed openly rather than implied by an empty page. */
  insightsPlanned: [
    "FortiGate SD-WAN failover: architecture and troubleshooting",
    "Designing secure FastAPI applications for enterprise environments",
    "Business continuity architecture for systems that cannot stop",
    "Cloud migration when bandwidth is the constraint, not compute",
    "Segmenting a flat network without stopping the business",
  ],
};
