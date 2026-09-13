import type { ArticleSlug, ArticleText } from "../types";

export const articlesEn: Record<ArticleSlug, ArticleText> = {
  "multi-wan-failover-that-actually-fails-over": {
    title: "Multi-WAN failover that actually fails over",
    description:
      "Most dual-link setups fail over on cable cut and nothing else. A practical guide to designing failover that survives the failure modes that actually occur — grey failures, shared upstream paths and stale sessions.",
    topics: ["Networking", "SD-WAN", "Business continuity", "Infrastructure"],
    body: [
      {
        type: "p",
        text: "A second internet link is one of the most common resilience investments an organisation makes, and one of the most commonly wasted. The link is bought, plugged in, configured as a backup route, and then never validated against the failures that actually happen. When the outage arrives, the failover either does not trigger or triggers into something equally broken.",
      },
      {
        type: "p",
        text: "The gap is almost always the same: the design was tested against the one failure mode that is easy to simulate — unplugging the cable — and against none of the ones that occur in practice.",
      },

      { type: "h2", id: "grey-failures", text: "The failure you tested for is the rarest one" },
      {
        type: "p",
        text: "A clean link-down event is the easiest failure to detect and the least common in the field. Far more frequent is the grey failure: the interface stays up, the route stays in the table, packets still flow — and the link is unusable. Severe packet loss, latency spikes into the seconds, an upstream device black-holing traffic, or a captive portal intercepting sessions after a billing lapse.",
      },
      {
        type: "p",
        text: "Interface state tells you nothing about any of these. A design that fails over on link-down alone will sit on a dead primary indefinitely, because from the router’s perspective nothing is wrong.",
      },
      {
        type: "ul",
        items: [
          "Link up, high packet loss — voice unusable, TCP crawling, interface green",
          "Link up, upstream black hole — traffic leaves and never returns",
          "Link up, DNS resolver failing — everything looks broken to users, nothing looks broken to the router",
          "Link up, captive portal injected — HTTPS breaks in ways that read as a certificate problem",
        ],
      },
      {
        type: "callout",
        title: "The rule",
        text: "Failover must be driven by a health probe that measures reachability through the link to something beyond the provider’s edge — never by interface state alone.",
      },

      { type: "h2", id: "probe-design", text: "Designing the probe" },
      {
        type: "p",
        text: "A health probe answers one question: can real traffic complete a round trip through this link right now? Three decisions determine whether it answers that question honestly.",
      },
      { type: "h3", text: "Probe the right target" },
      {
        type: "p",
        text: "Probing the provider’s gateway confirms only that the last mile is up — which is precisely the part that is still working during an upstream failure. Probe a target beyond the provider’s network, and probe more than one so that the failure of the target itself is not mistaken for the failure of the link.",
      },
      { type: "h3", text: "Measure quality, not just reachability" },
      {
        type: "p",
        text: "A probe that only checks whether a reply came back will keep a link with forty percent loss in service. Track loss and latency across a rolling window and fail over on degradation, not only on absence.",
      },
      { type: "h3", text: "Set thresholds against the application, not the link" },
      {
        type: "p",
        text: "The threshold that matters is the one at which your actual workload stops working. Voice degrades badly at around one percent loss and 150ms of jitter. A file sync tolerates far worse. Pick the number from the application you cannot afford to lose.",
      },
      {
        type: "code",
        lang: "text",
        code: `Probe design, minimum viable:

  targets      2+ hosts beyond the provider edge, different networks
  interval     1s
  window       5 consecutive failures to declare down
  recovery     30s of health before declaring up
  metrics      loss %, latency p95, jitter
  thresholds   derived from the most sensitive workload`,
      },
      {
        type: "p",
        text: "The asymmetry between the down threshold and the recovery threshold matters. Failing over quickly limits the outage; failing back quickly on a flapping link converts one outage into a series of them. Recovery should be slow and deliberate.",
      },

      { type: "h2", id: "shared-path", text: "Two links, one failure" },
      {
        type: "p",
        text: "The most expensive mistake in multi-WAN design is buying two links that share a failure path. This is easy to do accidentally and common in markets where a small number of operators own the underlying infrastructure and resell to each other.",
      },
      {
        type: "p",
        text: "Two contracts with two different companies can still be one fibre in one duct, one upstream transit provider, one building entry point, or one power feed to the cabinet where both terminate. When that shared element fails, both links fail together and the entire investment returns nothing.",
      },
      {
        type: "ol",
        items: [
          "Ask each provider for the physical path into the building and the entry point used.",
          "Ask who supplies their upstream transit, and check whether the answers match.",
          "Trace both links to their termination and confirm they are not on the same power feed or UPS.",
          "Where genuine diversity is unavailable, use a different medium — fibre plus fixed wireless or cellular — so a duct cut cannot take both.",
        ],
      },
      {
        type: "callout",
        title: "Test that proves it",
        text: "Ask both providers, independently and in writing, to describe the physical path. Diverse paths produce different answers. Matching answers mean you bought one link twice.",
      },

      { type: "h2", id: "sessions", text: "Failover is not the same as continuity" },
      {
        type: "p",
        text: "Routing over to the secondary link changes the source address that outbound traffic carries. Every established TCP session breaks. Every VPN tunnel renegotiates. Every application holding a long-lived connection reconnects, and any that does not reconnect gracefully will simply stop.",
      },
      {
        type: "p",
        text: "Users experience this as an outage even though failover worked exactly as designed, which is why so many correctly configured setups are still reported as failures.",
      },
      {
        type: "ul",
        items: [
          "Terminate VPNs on an address that does not move, or run tunnels over both links concurrently rather than switching between them",
          "Publish DNS records with TTLs short enough to be useful during a failover event, set before you need them",
          "Test that line-of-business applications reconnect on their own, and fix the ones that do not",
          "Keep the resolver reachable over both paths — DNS failing over more slowly than routing is a very common cause of a failover that appears not to have worked",
        ],
      },

      { type: "h2", id: "testing", text: "Test it the way it will break" },
      {
        type: "p",
        text: "Unplugging the primary tests the one scenario least likely to occur. A meaningful test schedule exercises the grey failures, during working hours, with users on the system.",
      },
      {
        type: "ol",
        items: [
          "Introduce packet loss on the primary link and confirm failover triggers at the intended threshold.",
          "Black-hole traffic upstream of your edge while leaving the interface up.",
          "Fail the primary DNS resolver alone and confirm resolution continues.",
          "Run the failover during business hours and record what users report — that is the real result.",
          "Fail back and confirm sessions recover without manual intervention.",
          "Record the measured failover time. It is now a number you can state, not an assumption.",
        ],
      },
      {
        type: "callout",
        title: "The only meaningful metric",
        text: "Not whether failover works, but how long the workload was unusable and what a user had to do to recover. If nobody has measured that, the failover is untested.",
      },

      { type: "h2", id: "summary", text: "In short" },
      {
        type: "ul",
        items: [
          "Interface state is not a health signal — probe through the link to targets beyond the provider edge",
          "Fail over on degradation, not only on absence; recover slowly to avoid flapping",
          "Verify physical path diversity in writing before assuming two links are two links",
          "Plan for session breakage — failover is a routing event, not a continuity guarantee",
          "Test the grey failures, in business hours, and record the measured recovery time",
        ],
      },
      {
        type: "p",
        text: "None of this requires expensive equipment. It requires deciding what a healthy link means for your workload, measuring it continuously, and testing the result against the failures that actually happen rather than the one that is convenient to simulate.",
      },
    ],
  },
};
