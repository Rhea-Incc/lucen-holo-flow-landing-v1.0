import { Boxes, CalendarRange, CalendarClock, LineChart, Megaphone, Sparkles, type LucideIcon } from 'lucide-react';

export interface Integration {
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  icon: LucideIcon;
  cta: string;
  conversionLabel: string;
  highlights: string[];
  requirements: string[];
  nextSteps: string[];
  timeline: string;
  bestFor: string[];
}

export const integrations: Integration[] = [
  {
    slug: 'hardware-purchase',
    title: 'Hardware Purchase',
    tagline: 'Own the Lucen stack outright.',
    shortDesc:
      'Own the full Lucen holographic stack — displays, controllers, and the Lucen Engine analytics suite — deployed and calibrated for your space.',
    longDesc:
      'A complete capital purchase of the Lucen holographic system: display hardware, edge controller, content pipeline, and a perpetual Lucen Engine analytics seat. Includes site survey, on-site installation, calibration, staff training, and a 24-month hardware warranty with optional extended service plans.',
    icon: Boxes,
    cta: 'Request a quote',
    conversionLabel: 'hardware_quote_request',
    highlights: [
      'Full ownership of hardware and content pipeline',
      'Perpetual Lucen Engine analytics seat included',
      'On-site installation, calibration, and staff training',
      'Extended service and content programs available',
    ],
    requirements: [
      'A defined install location with mains power and network connectivity',
      'Site survey access (45–90 minutes per location)',
      'Procurement contact authorised to issue capex purchase orders',
      'Brand or content assets, or a content production engagement with Lucen',
    ],
    nextSteps: [
      'Submit a quote request with planned locations and timeline',
      'Lucen completes a remote feasibility review within 3 business days',
      'On-site survey, technical specification, and fixed-price proposal',
      'Order, manufacture, install, calibrate, and go live',
    ],
    timeline: '6–10 weeks from signed proposal to first activation',
    bestFor: ['Flagship retail', 'Corporate lobbies', 'Permanent showrooms', 'Long-term DOOH owners'],
  },
  {
    slug: 'long-term-rentals',
    title: 'Long-Term Rentals',
    tagline: 'Operate Lucen as an opex line.',
    shortDesc:
      'Scale into holographic retail without the capex. Multi-month and multi-year deployment plans with maintenance, content updates, and analytics included.',
    longDesc:
      'A managed long-term rental of the Lucen holographic system on contracts from 6 months upward. Hardware, maintenance, content refreshes, software updates, and Lucen Engine analytics are bundled into a single monthly fee, with the option to upgrade hardware mid-term as the platform evolves.',
    icon: CalendarRange,
    cta: 'Plan a rollout',
    conversionLabel: 'long_term_rental_request',
    highlights: [
      'Single monthly fee — no capex, no service surprises',
      'Quarterly content refresh and software updates included',
      'Hardware swap pathway as new generations release',
      'Multi-site fleet management through the Lucen Engine',
    ],
    requirements: [
      'Minimum 6-month commitment per unit',
      'Confirmed install sites with power and network',
      'A nominated operations contact per location',
      'Content brief, or scoped content production engagement',
    ],
    nextSteps: [
      'Share locations, contract length, and content cadence',
      'Receive a fleet plan with monthly pricing and SLAs',
      'Sign master rental agreement and schedule installs',
      'Launch with bundled training and Lucen Engine onboarding',
    ],
    timeline: '4–8 weeks from agreement to first install',
    bestFor: ['Retail chains', 'Real-estate sales centers', 'Multi-site brands', 'Property operators'],
  },
  {
    slug: 'short-term-rentals',
    title: 'Short-Term Rentals',
    tagline: 'Plug-and-play for a moment in time.',
    shortDesc:
      'Plug-and-play holographic units for launches, pop-ups, and seasonal moments. Delivered, installed, and supported on event timelines.',
    longDesc:
      'Event-grade Lucen units rented from a single day up to 90 days. Delivery, install, on-site technician support during showtime, and de-rig are included. Ideal for launches, trade shows, premieres, and seasonal pop-ups where the experience must be flawless and the timeline is fixed.',
    icon: CalendarClock,
    cta: 'Book a unit',
    conversionLabel: 'short_term_rental_request',
    highlights: [
      'Day, week, and month-long booking windows',
      'On-site technician support included',
      'Express content production track for tight timelines',
      'Live engagement metrics delivered post-event',
    ],
    requirements: [
      'Confirmed venue with load-in/out access and rigging clearances',
      'Power, network, and ambient light brief',
      'Final creative brief at least 10 business days before showtime',
      'Insurance and venue compliance contacts',
    ],
    nextSteps: [
      'Submit dates, venue, and creative concept',
      'Receive availability hold and fixed event quote',
      'Lock content production sprint and logistics plan',
      'Lucen crew installs, runs the show, and delivers a wrap report',
    ],
    timeline: '2–4 weeks lead time recommended; rush bookings considered',
    bestFor: ['Product launches', 'Trade shows', 'Premieres', 'Seasonal pop-ups'],
  },
  {
    slug: 'lucen-engine-dooh',
    title: 'Lucen Engine for DOOH',
    tagline: 'Subscribe the intelligence layer onto screens you already own.',
    shortDesc:
      'Subscribe the Lucen Engine analytics layer onto your existing DOOH network — footfall, dwell time, attention, and conversion intelligence on screens you already operate.',
    longDesc:
      'A SaaS subscription that adds Lucen Engine measurement, attribution, and audience intelligence to your existing DOOH inventory. Integrates with your CMS and SSP, supplies an attention and dwell-time SDK for the player, and exposes a measurement API and dashboard for sales, ad ops, and reporting.',
    icon: LineChart,
    cta: 'Connect a network',
    conversionLabel: 'engine_dooh_subscription',
    highlights: [
      'Footfall, dwell, attention, and conversion metrics per screen',
      'CMS and SSP integrations (broadsign, vistar, hivestack, custom)',
      'Open measurement API for buyer reporting',
      'Per-screen pricing with volume tiers',
    ],
    requirements: [
      'Network of 10+ DOOH screens (smaller pilots considered)',
      'Player capable of running the Lucen measurement SDK or sensor module',
      'CMS access for schedule + proof-of-play ingestion',
      'Technical contact for integration kickoff',
    ],
    nextSteps: [
      'Share network size, player stack, and CMS/SSP details',
      'Receive an integration plan and per-screen pricing tier',
      'Run a 30-day instrumented pilot on a screen sample',
      'Roll out fleet-wide and expose Lucen-verified metrics to buyers',
    ],
    timeline: '2 weeks to pilot, 6–10 weeks to full network rollout',
    bestFor: ['DOOH network owners', 'Media owners', 'Retail media networks', 'Out-of-home agencies'],
  },
  {
    slug: 'campaign-deployments',
    title: 'Campaign Deployments',
    tagline: 'Turnkey holographic campaigns across the Lucen network.',
    shortDesc:
      'Turnkey holographic campaigns across the Lucen network — creative, media planning, deployment, and live performance reporting in one engagement.',
    longDesc:
      'A managed campaign across Lucen-operated and Lucen-instrumented locations. Includes creative concept and 3D content production, media planning across the holographic network, deployment and QA, and a live Lucen Engine performance dashboard with weekly readouts and an end-of-campaign attribution report.',
    icon: Megaphone,
    cta: 'Launch a campaign',
    conversionLabel: 'campaign_deployment_brief',
    highlights: [
      'Creative + 3D content production handled end to end',
      'Media plan across Lucen sites and partner networks',
      'Live performance dashboard during campaign flight',
      'Attribution and incrementality readout at wrap',
    ],
    requirements: [
      'Brand brief with KPIs, target audiences, and markets',
      'Approved campaign budget envelope',
      'Brand assets and any mandatory legal/compliance constraints',
      'Single decision-maker for creative approvals',
    ],
    nextSteps: [
      'Submit a brief with markets, dates, and KPIs',
      'Receive a campaign blueprint with media plan and pricing',
      'Approve creative and book inventory',
      'Go live with a live dashboard and weekly performance reviews',
    ],
    timeline: '3–6 weeks from brief to go-live for standard campaigns',
    bestFor: ['Brand marketing teams', 'Agencies', 'Launch & always-on campaigns'],
  },
  {
    slug: 'product-activations',
    title: 'Product Activations',
    tagline: 'Bespoke holographic product reveals.',
    shortDesc:
      'Premium product reveal experiences engineered around your brand — bespoke holographic content, choreography, and on-site capture.',
    longDesc:
      'A bespoke production engagement built around a specific product moment — keynote reveal, in-store launch, immersive press preview. Includes concept, 3D content, holographic choreography, on-site direction, capture for social and PR, and a Lucen Engine engagement report on dwell, capture rate, and earned media.',
    icon: Sparkles,
    cta: 'Activate a product',
    conversionLabel: 'product_activation_brief',
    highlights: [
      'Concept-to-stage holographic art direction',
      'Custom 3D content built for the product hero moment',
      'On-site capture for PR, social, and post-event amplification',
      'Engagement and earned-media report on Lucen Engine',
    ],
    requirements: [
      'Confirmed product, audience, and reveal date',
      'CAD, 3D, or hi-res reference assets for the product',
      'Venue or shoot location secured (Lucen can advise)',
      'Brand and PR leads available for creative reviews',
    ],
    nextSteps: [
      'Brief the product, audience, and moment',
      'Receive a creative treatment and production quote',
      'Production sprint with weekly creative checkpoints',
      'On-site delivery and post-event engagement report',
    ],
    timeline: '4–8 weeks production sprint, depending on scope',
    bestFor: ['Product launches', 'Press previews', 'Brand keynote moments'],
  },
];

export function getIntegration(slug: string | undefined): Integration | undefined {
  if (!slug) return undefined;
  return integrations.find((i) => i.slug === slug);
}
