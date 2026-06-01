export interface UseCaseMetric { value: string; label: string }

export interface UseCase {
  slug: string;
  title: string;
  image: string;
  /** Optional desktop-only hero image (e.g. landscape variant). */
  imageDesktop?: string;
  /** Optional video to use as the homepage tile media (preferred over image when set). */
  homeVideo?: string;
  images: string[];
  videos: string[];
  description: string;
  highlights: string[];
  /** How the homepage hero image should fit. Defaults to 'cover'. Use 'contain' when the source must be shown in full. */
  imageFit?: 'cover' | 'contain';
  /** Headline KPIs surfaced on the use case page. */
  metrics?: UseCaseMetric[];
  /** Sector context blurbs surfaced as "Why it works". */
  insights?: string[];
  /** Operational footprint required to deploy this use case. */
  requirements?: string[];
  /** Industry slug used to pre-fill the contact CTA. */
  industrySlug?: string;
}

export const useCases: UseCase[] = [
  {
    slug: 'retail-product-launch',
    title: 'Retail Product Launch',
    image: '/media/affinity-shoe-ad.jpg',
    images: ['/media/affinity-shoe-ad.jpg', '/media/Innovative-Brands-and-Event-Organisers.jpg', '/media/Starbucks.jpg'],
    videos: ['/media/scale-your-message.mp4', '/media/Comp-1_10-2.mp4', '/media/Comp-1_7.mp4'],
    description: 'Transform product launches into immersive holographic events that generate buzz, drive foot traffic, and create viral social media moments.',
    highlights: ['3D holographic product reveal', 'Interactive feature exploration', 'Real-time audience analytics', 'Social media integration'],
    industrySlug: 'retail-luxury',
    metrics: [
      { value: '+38%', label: 'In-store dwell' },
      { value: '4.7×', label: 'Brand recall' },
      { value: '+22%', label: 'Conversion lift' },
      { value: '210%', label: 'Social mentions' },
    ],
    insights: [
      'Holographic reveals collapse weeks of teaser marketing into a single in-store moment.',
      'Every visitor becomes a free distribution channel — phones come out without prompting.',
      'Same rig redeploys across cities for sequential market launches.',
    ],
    requirements: ['12 m² floor footprint', '3.5 m vertical clearance', 'Single 32A power feed', 'Wired uplink for live analytics'],
  },
  {
    slug: 'real-estate-sales-center',
    title: 'Real Estate Sales Center',
    image: '/media/hologram-for-real-estate.jpg',
    imageDesktop: '/media/real-estate-hologram.jpg',
    images: ['/media/hologram-for-real-estate.jpg', '/media/real-estate-hologram.jpg', '/media/real-estate-hologram-2.jpg'],
    videos: ['/media/real-estate-vid.mp4', '/media/4.mp4'],
    description: 'Convert sales centers into immersive visualization experiences where buyers walk through unbuilt properties and explore entire developments.',
    highlights: ['3D property walkthroughs', 'Interactive floor plans', 'Neighborhood visualization', 'Buyer engagement tracking'],
    industrySlug: 'real-estate',
    metrics: [
      { value: '−41%', label: 'Time to deposit' },
      { value: '2.3×', label: 'Repeat site visits' },
      { value: '92%', label: 'Off-plan recall' },
    ],
    insights: [
      'Replaces scale models that take weeks to build and cannot show finishes or daylight cycles.',
      'One sales suite hosts every project in the developer portfolio — content swaps per appointment.',
      'Investor-grade walkthroughs travel to roadshows on a single hardware kit.',
    ],
    requirements: ['Approved BIM/3D model', '20 m² footprint with neutral backdrop', 'Concierge or sales agent on rotation'],
  },
  {
    slug: 'automotive-showroom',
    title: 'Automotive Showroom',
    image: '/media/auto-showroom_holo-3.jpg',
    homeVideo: '/media/demo-2.mp4',
    images: ['/media/auto-hypergram.jpg', '/media/auto-4.png', '/media/auto-showroom_holo-3.jpg', '/media/auto-showroom_holo-2.jpg', '/media/auto-showroom-2.jpg', '/media/auto-showroom-holo.jpg'],
    videos: ['/media/demo-2.mp4', '/media/autoshowroom_vid-2.mp4'],
    description: 'Bring vehicles to life with holographic displays that showcase every angle, feature, and configuration possibility.',
    highlights: ['360° vehicle visualization', 'Feature deep-dives', 'Color and trim configurator', 'Showroom traffic analytics'],
    industrySlug: 'automotive',
    metrics: [
      { value: '+57%', label: 'Test-drive bookings' },
      { value: '12 m²', label: 'Floor space saved per model' },
      { value: '3.1×', label: 'Configurator engagement' },
    ],
    insights: [
      'A single pod replaces multiple physical units — every trim, color and powertrain on demand.',
      'Launch nights broadcast the same hologram across markets simultaneously.',
      'Lucen Engine attributes showroom dwell to test-drive booking and dealer CRM.',
    ],
    requirements: ['8–14 m² showroom footprint', '4 m vertical clearance', 'Vehicle CAD or photogrammetry assets'],
  },
  {
    slug: 'trade-show-booth',
    title: 'Trade Show Immersive Booth',
    image: '/media/events-hologram.jpg',
    homeVideo: '/media/2-3.mp4',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg', '/media/events-hologram.jpg'],
    videos: ['/media/2-3.mp4', '/media/2-2.mp4', '/media/exhibitions.mp4'],
    description: 'Stand out at trade shows with holographic installations that draw crowds and create unforgettable brand impressions.',
    highlights: ['Crowd-stopping holograms', 'Interactive product demos', 'Lead capture integration', 'Event ROI analytics'],
    industrySlug: 'events-exhibitions',
    metrics: [
      { value: '5.4×', label: 'Booth dwell vs. peers' },
      { value: '+62%', label: 'Qualified leads' },
      { value: '+210%', label: 'Social mentions' },
    ],
    insights: [
      'Becomes the show’s most photographed booth — earned media compounds your ad spend.',
      'Travels between cities on one rig for an annual event circuit.',
      'Lead capture integrates directly with Salesforce, HubSpot or your CRM.',
    ],
    requirements: ['9–18 m² island footprint', 'Rigging point or truss', 'On-site brand ambassador'],
  },
  {
    slug: 'events',
    title: 'Events & Live Productions',
    image: '/media/Events-2.jpg',
    homeVideo: '/media/2-2.mp4',
    images: ['/media/hospitality.jpg', '/media/Events-2.jpg'],
    videos: ['/media/2-2.mp4', '/media/exhibitions.mp4'],
    description: 'Elevate concerts, galas, festivals and live productions with show-stopping volumetric holograms that transform venues into immersive worlds.',
    highlights: ['Stage-scale volumetric visuals', 'Synchronized lighting & audio', 'Headline-act activations', 'Audience capture & analytics'],
    industrySlug: 'events-exhibitions',
    metrics: [
      { value: '+74%', label: 'Audience recall' },
      { value: '3.8×', label: 'Press mentions' },
      { value: '+45%', label: 'Sponsor uplift' },
    ],
    insights: [
      'Turns the stage into the headline asset — every camera angle is a marketing surface.',
      'Sync directly to lighting and audio cues via DMX, OSC and timecode.',
      'Volumetric assets reusable across tour dates and broadcast feeds.',
    ],
    requirements: ['Stage with rigging access', 'Show-control integration', 'On-site technical director'],
  },
  {
    slug: 'mall-advertising-network',
    title: 'Mall Advertising Network',
    image: '/media/Starbucks.jpg',
    images: ['/media/Starbucks.jpg', '/media/Innovative-Brands-and-Event-Organisers.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Deploy holographic advertising networks across malls to monetize high footfall with premium, measurable ad placements.',
    highlights: ['DOOH holographic network', 'Programmatic ad delivery', 'Footfall measurement', 'Revenue share model'],
    industrySlug: 'airports-malls',
    metrics: [
      { value: '8.2×', label: 'CPM premium vs. flat DOOH' },
      { value: '14 s', label: 'Avg. attention per spot' },
      { value: '92%', label: 'Visual recall' },
    ],
    insights: [
      'Premium placements bill at multiples of flat-LCD inventory on the same footprint.',
      'Daypart targeting ties creative to footfall mix — coffee am, fragrance pm.',
      'Revenue-share model removes capex from the landlord side.',
    ],
    requirements: ['High-traffic atrium or court', 'Three-phase power', 'Network connectivity for SSP integration'],
  },
  {
    slug: 'airport-brand-campaigns',
    title: 'Airport Brand Campaigns',
    image: '/media/gizmo-holograms-events-3_1440x900.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Capture the attention of high-value travelers with holographic brand activations in premium airport locations.',
    highlights: ['Lounge holographic displays', 'Gate area activations', 'Duty-free showcases', 'Traveler engagement data'],
    industrySlug: 'airlines',
    metrics: [
      { value: '+41%', label: 'Lounge NPS' },
      { value: '7.8×', label: 'Duty-free attention' },
      { value: '14 s', label: 'Average dwell' },
    ],
    insights: [
      'Travelers have idle minutes between gate and lounge — holograms convert that to brand exposure.',
      'Ideal for luxury, automotive, finance and travel categories targeting affluent segments.',
    ],
    requirements: ['Airport authority approval', 'Premium-zone placement', 'Compliant AV power & cabling'],
  },
  {
    slug: 'corporate-lobby',
    title: 'Corporate Lobby Installation',
    image: '/media/corporate_lobby.jpg',
    homeVideo: '/media/corporate_lobby-2.mp4',
    images: ['/media/corporate_lobby.jpg'],
    videos: ['/media/corporate_lobby-2.mp4', '/media/corporate_lobby.mp4', '/media/Track-overlay_1.mp4'],
    description: 'Transform corporate lobbies into brand showcases with holographic installations that impress visitors and reinforce brand identity.',
    highlights: ['Brand storytelling holograms', 'Visitor experience design', 'Real-time content management', 'Visitor analytics'],
    industrySlug: 'banking',
    metrics: [
      { value: '+58%', label: 'Visitor brand recall' },
      { value: '4.8/5', label: 'Reception CSAT' },
      { value: '24/7', label: 'Always-on uptime' },
    ],
    insights: [
      'First impression engineered — visitors meet the brand before they meet a person.',
      'Content swaps for VIP visits, investor briefings and cultural moments without rebuilding hardware.',
      'Doubles as an internal-comms surface for staff broadcasts and town halls.',
    ],
    requirements: ['6–10 m² alcove or pedestal', 'Ambient light control', 'CMS access for marketing team'],
  },
  {
    slug: 'airline-experience',
    title: 'Airline Experience',
    image: '/media/gizmo-holograms-events-3_1440x900.jpg',
    images: ['/media/gizmo-holograms-events-3_1440x900.jpg'],
    videos: ['/media/demo.mp4'],
    description: 'Elevate the airline passenger journey with holographic wayfinding, lounge experiences, and gate entertainment that create premium brand moments.',
    highlights: ['Lounge immersive experiences', 'Gate area entertainment', 'Wayfinding holograms', 'Passenger flow optimization'],
    industrySlug: 'airlines',
    metrics: [
      { value: '+41%', label: 'Lounge NPS' },
      { value: '−22%', label: 'Wayfinding queries' },
      { value: '+18%', label: 'Tier-upgrade attach' },
    ],
    insights: [
      'Premium lounges become brand theatres — defending tier value beyond seat-pitch arms races.',
      'Wayfinding holograms reduce staffing pressure during peak boarding windows.',
    ],
    requirements: ['Airport authority approval', 'Lounge or gate placement', 'Network for live flight data'],
  },
];
