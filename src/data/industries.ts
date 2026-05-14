export interface IndustryMetric { value: string; label: string }

export interface Industry {
  slug: string;
  name: string;
  value: string;
  icon: string;
  heroImage: string;
  images: string[];
  videos: string[];
  description: string;
  services: string[];
  /** Headline KPIs surfaced on cards & detail pages */
  metrics?: IndustryMetric[];
  /** Sector context blurbs */
  insights?: string[];
  /** Typical deployment formats / surfaces */
  deployments?: string[];
}

export const industries: Industry[] = [
  {
    slug: 'retail-luxury',
    name: 'Retail & Luxury',
    value: 'Drives in-store engagement and sales',
    icon: '◇',
    heroImage: '/media/Innovative-Brands-and-Event-Organisers.jpg',
    images: ['/media/Innovative-Brands-and-Event-Organisers.jpg', '/media/Starbucks.jpg'],
    videos: ['/media/Comp-1_10-2.mp4', '/media/demo.mp4'],
    description: 'Lucen transforms retail and luxury spaces with holographic displays that captivate shoppers, increase dwell time, and drive measurable sales lift. Our systems create immersive product experiences that blend the physical and digital worlds.',
    services: [
      'In-store holographic product showcases',
      'Interactive window displays',
      'Personalized shopping experiences via gesture control',
      'Real-time analytics on shopper engagement',
      'Campaign-driven holographic activations',
    ],
    metrics: [
      { value: '+38%', label: 'Avg. dwell time' },
      { value: '4.7×', label: 'Recall vs. flat signage' },
      { value: '+22%', label: 'Conversion uplift' },
    ],
    insights: [
      'Luxury buyers respond to scarcity and theatre — holograms compress both into a 30-second visual hook.',
      'Window-side activations average 12 seconds of attention vs. 1.4 seconds for static print.',
      'Lucen Engine attributes in-store impressions back to POS for closed-loop ROI.',
    ],
    deployments: ['Flagship windows', 'Pop-ups', 'Counter-top product reveals', 'VIP suites'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    value: 'Accelerates property sales',
    icon: '⬡',
    heroImage: '/media/hologram-for-real-estate.jpg',
    images: ['/media/hologram-for-real-estate.jpg', '/media/real-estate-hologram.jpg', '/media/real-estate-hologram-2.jpg'],
    videos: ['/media/real-estate-vid.mp4', '/media/4.mp4'],
    description: 'Lucen enables real estate developers to showcase properties through stunning 3D holographic simulations. Buyers experience buildings before they exist — walking through spaces, exploring finishes, and visualizing entire developments.',
    services: [
      '3D holographic property walkthroughs',
      'Sales center interactive installations',
      'Neighborhood and amenity visualization',
      'Off-plan project presentations',
      'Investor-grade immersive pitch systems',
    ],
    metrics: [
      { value: '−41%', label: 'Time to deposit' },
      { value: '2.3×', label: 'Buyer site visits' },
      { value: '92%', label: 'Off-plan recall' },
    ],
    insights: [
      'Buyers commit faster when they can see, walk and orbit a unit instead of reading floor plans.',
      'Hologram-led sales centers compress decision cycles for off-plan inventory by months.',
      'Same physical sales suite can host multiple developments — content swapped per appointment.',
    ],
    deployments: ['Sales galleries', 'Investor previews', 'Roadshows', 'Brokerage offices'],
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    value: 'Enhances product discovery',
    icon: '◎',
    heroImage: '/media/auto-showroom_holo-3.jpg',
    images: ['/media/auto-showroom_holo-3.jpg', '/media/auto-4.png', '/media/auto-showroom_holo-2.jpg', '/media/auto-showroom-2.jpg'],
    videos: ['/media/demo-2.mp4', '/media/autoshowroom_vid-2.mp4'],
    description: 'Lucen brings vehicles to life in showrooms with holographic displays that let customers explore every detail — from exterior design to internal mechanics — without needing a physical model present.',
    services: [
      'Holographic vehicle showcases',
      'Interactive feature exploration',
      'Configurator-driven color and trim selection',
      'Launch event holograms',
      'Showroom analytics and visitor tracking',
    ],
    metrics: [
      { value: '+57%', label: 'Test-drive bookings' },
      { value: '12 m²', label: 'Floor space saved per model' },
      { value: '3.1×', label: 'Configurator engagement' },
    ],
    insights: [
      'A single hologram pod can showcase the full lineup — letting dealers monetize floor space.',
      'Customers explore trims, colors and powertrains without needing physical inventory on-site.',
      'Launch events broadcast the same holographic asset across regions on the same evening.',
    ],
    deployments: ['Dealership showrooms', 'Mall pop-ups', 'Auto shows', 'Brand experience centers'],
  },
  {
    slug: 'universities',
    name: 'Universities',
    value: 'Boosts student acquisition',
    icon: '◈',
    heroImage: '/media/gizmo-holograms-rotator-4_1920x850.jpg',
    images: ['/media/gizmo-holograms-rotator-4_1920x850.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Lucen helps universities stand out in competitive recruitment landscapes with immersive campus tours, interactive program showcases, and holographic faculty presentations that captivate prospective students.',
    services: [
      'Holographic campus tours',
      'Interactive program exploration kiosks',
      'Open day immersive experiences',
      'Remote enrollment holographic presentations',
      'Student engagement analytics',
    ],
    metrics: [
      { value: '+44%', label: 'Open-day capture rate' },
      { value: '6×', label: 'Brochure-to-application lift' },
      { value: '85%', label: 'Recall after 30 days' },
    ],
    insights: [
      'Open days are the single highest-yield enrollment moment — holograms turn them into a destination.',
      'International applicants engage with holographic campus tours from regional roadshows.',
      'Departmental content can be rotated by hour to match incoming visitor cohorts.',
    ],
    deployments: ['Admissions lobbies', 'Open days', 'Recruitment roadshows', 'Innovation labs'],
  },
  {
    slug: 'telecom',
    name: 'Telecom',
    value: 'Simplifies complex offerings',
    icon: '◉',
    heroImage: '/media/gizmo-holograms-events-3_1440x900.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/Comp-1_10-2.mp4'],
    description: 'Lucen transforms telecom retail with holographic device visualizations and network demonstrations that make complex technology tangible and exciting for consumers.',
    services: [
      'Device holographic showcases',
      'Network coverage 3D visualization',
      'Plan comparison interactive displays',
      'In-store engagement systems',
      'Campaign analytics and footfall tracking',
    ],
    metrics: [
      { value: '+33%', label: 'Plan upgrade attach' },
      { value: '−28%', label: 'Staff explain time' },
      { value: '2.1×', label: 'Device interactions' },
    ],
    insights: [
      'Holographic plan comparisons turn pricing tables into a 10-second visual decision.',
      'Coverage maps rendered as 3D terrain demystify "5G", "fiber" and "satellite" instantly.',
    ],
    deployments: ['Flagship stores', 'Mall kiosks', 'Enterprise demo rooms'],
  },
  {
    slug: 'banking',
    name: 'Banking',
    value: 'Turns waiting into interaction',
    icon: '◆',
    heroImage: '/media/gizmo-holograms-rotator-4_1920x850.jpg',
    images: ['/media/gizmo-holograms-rotator-4_1920x850.jpg'],
    videos: ['/media/2.mp4'],
    description: 'Lucen converts dead time in bank branches into engaging, informative experiences. Holographic displays in waiting areas educate customers about products, reduce perceived wait times, and drive cross-sell opportunities.',
    services: [
      'Branch holographic information displays',
      'Product visualization systems',
      'Queue management with interactive content',
      'VIP lounge immersive experiences',
      'Customer behavior analytics',
    ],
    metrics: [
      { value: '−35%', label: 'Perceived wait time' },
      { value: '+19%', label: 'Cross-sell conversion' },
      { value: '4.6/5', label: 'Branch CSAT lift' },
    ],
    insights: [
      'Idle minutes become onboarding minutes — wealth, lending and cards explained holographically.',
      'Premium-tier lobbies use the same hardware to host bespoke client briefings.',
    ],
    deployments: ['Retail branches', 'Wealth lounges', 'HQ visitor centers'],
  },
  {
    slug: 'airports-malls',
    name: 'Airports & Malls',
    value: 'Monetizes high footfall',
    icon: '◇',
    heroImage: '/media/Innovative-Brands-and-Event-Organisers.jpg',
    images: ['/media/Innovative-Brands-and-Event-Organisers.jpg', '/media/Starbucks.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Lucen creates DOOH holographic advertising networks in high-footfall public spaces. Airports and malls become premium media channels with measurable engagement data.',
    services: [
      'DOOH holographic ad networks',
      'Wayfinding holographic displays',
      'Brand activation zones',
      'Passenger engagement systems',
      'Footfall monetization analytics',
    ],
    metrics: [
      { value: '8.2×', label: 'CPM premium vs. flat DOOH' },
      { value: '14 s', label: 'Avg. attention per spot' },
      { value: '92%', label: 'Visual recall' },
    ],
    insights: [
      'Holographic DOOH consistently out-bills flat LCD on the same footprint.',
      'Programmatic ad swaps deliver hour-of-day relevance — coffee am, fragrance pm.',
    ],
    deployments: ['Departure halls', 'Mall atriums', 'Premium lounges', 'Curbside arrivals'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    value: 'Improves training precision',
    icon: '⬡',
    heroImage: '/media/medical-imaging.jpg',
    images: ['/media/medical-imaging.jpg'],
    videos: ['/media/4.mp4'],
    description: 'Lucen enables medical institutions to train with holographic anatomy simulations, surgical planning visualizations, and patient education displays that improve precision and outcomes.',
    services: [
      'Holographic anatomy training',
      'Surgical planning 3D visualization',
      'Patient education displays',
      'Medical device showcases',
      'Research visualization systems',
    ],
    metrics: [
      { value: '+29%', label: 'Training retention' },
      { value: '−40%', label: 'Patient explain time' },
      { value: '1:1', label: 'Anatomical scale fidelity' },
    ],
    insights: [
      'Surgical planning shifts from 2D scans to manipulable 3D anatomy — pre-op confidence rises.',
      'Patient education holograms shorten consent conversations without losing detail.',
    ],
    deployments: ['Teaching hospitals', 'Med-tech demo suites', 'Pre-op consult rooms'],
  },
  {
    slug: 'events-exhibitions',
    name: 'Events & Exhibitions',
    value: 'Creates unforgettable experiences',
    icon: '◎',
    heroImage: '/media/events-hologram.jpg',
    images: ['/media/events-hologram.jpg', '/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/exhibitions.mp4', '/media/2-3.mp4'],
    description: 'Lucen transforms events and exhibitions with show-stopping holographic installations that draw crowds, generate social buzz, and create memorable brand moments.',
    services: [
      'Trade show holographic booths',
      'Product launch holographic reveals',
      'Concert and performance holograms',
      'Exhibition interactive installations',
      'Event analytics and ROI tracking',
    ],
    metrics: [
      { value: '5.4×', label: 'Booth dwell vs. peers' },
      { value: '+210%', label: 'Social mentions' },
      { value: '+62%', label: 'Qualified leads' },
    ],
    insights: [
      'Holographic booths become the show photo — every passer-by becomes a free distribution channel.',
      'Repeatable rigs travel between cities — amortizing across an annual event calendar.',
    ],
    deployments: ['Trade shows', 'Brand launches', 'Festivals', 'Award ceremonies'],
  },
  {
    slug: 'industrial',
    name: 'Industrial',
    value: 'Simplifies complex systems',
    icon: '◈',
    heroImage: '/media/gizmo-holograms-rotator-4_1920x850.jpg',
    images: ['/media/gizmo-holograms-rotator-4_1920x850.jpg'],
    videos: ['/media/4.mp4'],
    description: 'Lucen helps industrial companies visualize complex machinery, production processes, and engineering systems through holographic simulations that simplify training and sales.',
    services: [
      'Machine holographic simulations',
      'Production line visualization',
      'Safety training holograms',
      'Sales engineering presentations',
      'Maintenance procedure displays',
    ],
    metrics: [
      { value: '−47%', label: 'Onboarding time' },
      { value: '+33%', label: 'Sales-cycle close' },
      { value: '0', label: 'Physical prototypes shipped' },
    ],
    insights: [
      'Heavy machinery sells faster when buyers can orbit and cross-section the unit on a tabletop.',
      'Safety procedures rehearsed in 3D outperform PDF training on retention and incident rates.',
    ],
    deployments: ['Factory tours', 'Trade shows', 'Field-sales kits', 'Safety classrooms'],
  },
  {
    slug: 'airlines',
    name: 'Airlines',
    value: 'Elevates passenger experience',
    icon: '✈',
    heroImage: '/media/gizmo-holograms-events-3_1440x900.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Lucen enhances the airline experience from lounge to gate with holographic wayfinding, immersive brand experiences, and premium advertising networks that captivate high-value travelers.',
    services: [
      'Airport lounge holographic experiences',
      'Gate area interactive displays',
      'In-flight service visualization',
      'Duty-free holographic showcases',
      'Passenger flow analytics',
    ],
    metrics: [
      { value: '+41%', label: 'Lounge NPS' },
      { value: '7.8×', label: 'Duty-free attention' },
      { value: '−22%', label: 'Wayfinding queries' },
    ],
    insights: [
      'High-value travelers respond to theatre, not signage — holograms anchor the premium tier.',
      'Lounge installations double as monetizable media surfaces between flights.',
    ],
    deployments: ['Premium lounges', 'Gate areas', 'Duty-free zones', 'Wayfinding nodes'],
  },
];
