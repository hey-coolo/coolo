
import { Project, TeamMember, JournalPost, ServiceLeg, ProjectCategory, Drop, FirepowerTier, ClarityTier, Script, Resource, Workbook, CourseModule, PartnershipModel } from './types';

// ==========================================
// ASSET REGISTRY
// ==========================================
// INSTRUCTIONS:
// 1. Upload your images to the 'assets/images' folder.
// 2. Import them below (uncomment the examples).
// 3. Replace the remote URLs in the ASSETS object with your imported variables.
// ==========================================

// EXAMPLE IMPORTS:
// import imgHeroViz from '../assets/images/hero-viz.jpg';
// import imgFranco from '../assets/images/franco.jpg';

const RAW_IMG_3D_VIZ = 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200';
const RAW_IMG_OOH = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200';
const RAW_IMG_BRANDING = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200';
const RAW_IMG_PACKAGING = 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=1200';
const RAW_IMG_FRANCO = 'import heroFranco from: .assets/images/franco.webp';
const RAW_IMG_ARIANA = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800';

export const ASSETS = {
  hero: {
    viz: RAW_IMG_3D_VIZ, // Replace with: imgHeroViz
    ooh: RAW_IMG_OOH
  },
  services: {
    clarity: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=1200',
    firepower: 'https://images.unsplash.com/photo-1516937941348-c09e554b9631?auto=format&fit=crop&q=80&w=1200',
    partnership: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=1200'
  },
  team: {
    franco: RAW_IMG_FRANCO, // Replace with: imgFranco
    ariana: RAW_IMG_ARIANA
  },
  projects: {
    zero: RAW_IMG_3D_VIZ,
    ooh: RAW_IMG_OOH,
    verve: RAW_IMG_PACKAGING,
    node: RAW_IMG_BRANDING
  }
};

export const NAV_LINKS = [
  { name: 'Studio', path: '/about' }, 
  { name: 'Clarity', path: '/clarity' },
  { name: 'Design Power', path: '/designpower' },
  { name: 'Partnership', path: '/partnership' },
  { name: 'Work', path: '/work' },
  { name: 'Journal', path: '/journal' },
  { name: 'FAQ', path: '/faq' },
];

export const SERVICE_LEGS: ServiceLeg[] = [
  {
    id: 'clarity',
    title: 'I Need Clarity',
    subtitle: 'The No Magic Formula™',
    hoverText: 'Strategy, Courses, & The Truth about Branding.',
    visual: 'Minimalist Strategy',
    path: '/clarity',
    imageUrl: ASSETS.services.clarity
  },
  {
    id: 'designpower',
    title: 'I Need Design Power',
    subtitle: 'The Creative Method™',
    hoverText: 'Identity, 3D Product Viz, & Website Builds.',
    visual: 'High-End Design Execution',
    path: '/designpower',
    imageUrl: ASSETS.services.designpower
  },
  {
    id: 'partner',
    title: 'I Need a Partner',
    subtitle: 'Agency Partnership',
    hoverText: 'White-Label Execution for Studios.',
    visual: 'Technical Partnership',
    path: '/partnership',
    imageUrl: ASSETS.services.partnership
  }
];

export const CLARITY_TIERS: ClarityTier[] = [
    { 
        slug: 'starter-kit',
        name: 'Free Starter Kit', 
        price: '$0', 
        subtitle: 'Brand Community PDF',
        desc: "Short exercises to define your tribe & vibe. Includes audience notes templates and voice checklists.", 
        cta: "Download PDF", 
        features: ["Define Your Tribe", "Brand Beliefs Prompts", "Voice Checklist"],
        timeline: "Instant",
        idealFor: "DIY Founders",
        faqs: [
            { q: "Is this actually free?", a: "Yes. It's a lead magnet, obviously. But it's also the exact same framework we use in our $4k sprints, just condensed. We believe if you do the work, you'll eventually hire us for the execution." },
            { q: "Do I need design skills?", a: "No. This is purely strategic. It's about words, beliefs, and defining your audience. You can do it in a notebook." }
        ]
    },
    { 
        slug: 'workbook',
        name: 'The Workbook', 
        price: '$30', 
        subtitle: 'Culture in 7 Days',
        desc: "Daily exercises to clarify POV, audience truths, and your core message. For early-stage DIY founders.", 
        cta: "Get the Book", 
        features: ["40–60 Page Printable", "Notion Templates", "Daily Tasks"],
        timeline: "1 Week Self-Paced",
        idealFor: "Solo Founders",
        faqs: [
            { q: "Is this a physical book?", a: "No, it is a high-resolution PDF designed for print or digital annotation, plus a Notion dashboard for tracking your progress." },
            { q: "How is this different from the free kit?", a: "The free kit is a sampler. The Workbook is the full meal. It includes the 'Before & After' grid, the 'Enemy' definition, and the complete messaging matrix." }
        ]
    },
    { 
        slug: 'course',
        name: 'The Course', 
        price: '$400', 
        subtitle: 'Franco Brand Formula',
        desc: "Structured lectures, worksheets, and community Q&A. For small-mid brands and teams.", 
        cta: "Join Cohort", 
        features: ["Positioning Modules", "Critique Prompts", "Community Access"],
        timeline: "4 Weeks",
        idealFor: "Teams & Designers",
        faqs: [
            { q: "Do I get feedback on my work?", a: "Yes. The course includes access to our Circle community where we do weekly 'roasts' of student work. It's not a private 1:1, but it's direct feedback." },
            { q: "Can my whole team watch it?", a: "Yes. One license covers your immediate internal team. We actually encourage founders and marketing leads to watch it together to align." }
        ]
    },
    { 
        slug: 'consulting',
        name: 'Consulting Sprint', 
        price: '$4,000', 
        subtitle: 'No Magic Formula™',
        desc: "2–4 week strategy sprint. Workshops, synthesis, and a complete Strategy Pack handoff.", 
        cta: "Inquire Now", 
        features: ["Positioning One-Pager", "Audience Map", "Messaging Matrix", "90-Day Roadmap"],
        timeline: "4 Weeks",
        idealFor: "Funded Startups",
        faqs: [
            { q: "Is this coaching or consulting?", a: "It's consulting. Coaching asks you questions; consulting gives you answers. We audit, we prescribe, and we build the roadmap. You don't just leave with ideas; you leave with a battle plan." },
            { q: "Do you execute the designs too?", a: "This sprint is pure strategy. Execution is separate (see our Firepower tiers). This ensures we lock in the logic before you burn budget on pixels. If you proceed to Firepower, we credit 10% of this fee." },
            { q: "What is the 'Synthesis' phase?", a: "After our workshops, we go dark for 5-7 days. We take your raw brain dump and architect it into a clean, sharp Strategy Playbook. That's the deliverable you pay for." }
        ]
    }
];

export const DESIGNPOWER_TIERS: DesignpowerTier[] = [
    {
        slug: "starter",
        name: "Starter",
        focus: "Core Identity",
        desc: "Logo suite, palette, type styles, and a 10–12 page style guide PDF. For early-stage brands needing a sharp start.",
        deliverables: ["Logo Suite", "Color Palette", "Typography Guidelines", "Mini-Style Guide"],
        timeline: "2 Weeks",
        idealFor: "Pre-seed startups and MVPs.",
        faqs: [
            { q: "Do I get a full brand book?", a: "You get a Mini-Style Guide. It's a condensed 10-12 page document covering your logo usage, color codes, type hierarchy, and basic do's/don'ts. Enough to keep you consistent, not enough to gather dust." },
            { q: "How many logo options do I see?", a: "We present 2 distinct strategic territories. We don't believe in showing 10 bad options to hide the 1 good one. We show you the two paths that actually work." },
            { q: "Can I add business cards?", a: "Yes. Collateral like business cards, social templates, or slide decks can be added as hourly sprints once the core identity is approved." }
        ]
    },
    {
        slug: "builder",
        name: "Builder",
        focus: "Story & Design",
        desc: "Core Identity plus brand storytelling kit and campaign concepts. Translating strategy into copy and visuals.",
        deliverables: ["Core Identity", "Messaging-to-Visuals", "Campaign Concepts (3)", "Storytelling Kit"],
        timeline: "4 Weeks",
        idealFor: "Brands ready to go to market with a voice.",
        faqs: [
            { q: "What constitutes a 'Campaign Concept'?", a: "A Campaign Concept is a big idea that gives your brand a lane for marketing. It includes a headline system, a distinct visual art direction, and examples of how it looks on ads/social." },
            { q: "Who writes the copy?", a: "We do. In the Builder tier, the voice is just as important as the logo. We don't use lorem ipsum here; we write headlines that define your attitude." },
            { q: "Is this enough for a Series A pitch?", a: "Absolutely. This tier is designed specifically to make early-stage companies look funded, dangerous, and ready for scale." }
        ]
    },
    {
        slug: "pro",
        name: "Pro",
        focus: "Digital Presence",
        desc: "Builder tier plus a high-fidelity Webflow site (5-7 pages) with micro-interactions and CMS setup.",
        deliverables: ["Builder Tier", "Webflow Site (Live)", "UX/UI Design", "CMS Setup"],
        timeline: "6-8 Weeks",
        idealFor: "Digital-first products needing conversion power.",
        faqs: [
            { q: "Why Webflow?", a: "Webflow allows us to build high-end, custom interaction design without the plugin bloat and security headaches of WordPress. It is the industry standard for modern, design-led brands." },
            { q: "Can I edit the site myself?", a: "Yes. We build a custom CMS (Content Management System) for your blogs, case studies, or team members. We provide a training video so you can handle day-to-day updates easily." },
            { q: "Does this include SEO?", a: "We build with technical SEO best practices (semantic tags, fast loading, mobile optimization), but ongoing SEO content strategy is a separate discipline." }
        ]
    },
    {
        slug: "flagship",
        name: "Flagship",
        focus: "Full Creative Method™",
        desc: "The complete overhaul. Pro tier plus high-end product visuals (3D/Photo), ad systems, and packaging mockups.",
        deliverables: ["Pro Tier", "3D Renders / Photos", "Campaign Ad System", "Packaging Mockups"],
        timeline: "10+ Weeks",
        idealFor: "Scale-ups and established brands reinventing themselves.",
        faqs: [
            { q: "What kind of 3D assets do we get?", a: "High-fidelity product renders or abstract brand loops created in Cinema 4D + Octane. These are the 'hero' assets that stop the scroll on social and make your website feel premium." },
            { q: "How does the packaging design work?", a: "We handle the graphic design layer of your packaging. We create print-ready dielines and can liaise with your manufacturer to ensure the finish (foils, embossing) is perfect." },
            { q: "Can you handle the launch rollout?", a: "Yes. In the Flagship tier, we don't just build the assets; we help structure the rollout plan to ensure all touchpoints go live in a coordinated, high-impact wave." }
        ]
    }
];

export const PARTNERSHIP_MODELS: PartnershipModel[] = [
    {
        slug: 'discovery',
        title: 'Discovery & Strategy',
        description: 'One-off phase delivery. We handle the deep dive, the brand compass, and the initial positioning.',
        priceLabel: 'Flat Fee',
        details: "This is the entry point for most agencies and founders. We parachute in for 2-4 weeks to audit the brand, interview stakeholders, and build the strategic foundation. You get the roadmap; your team (or ours) executes it.",
        idealFor: "Kickstarting a new client relationship or fixing a stalled rebrand.",
        deliverables: ["Brand Audit", "Stakeholder Interviews", "Strategic Positioning", "Visual Territory Map", "Roadmap Deck"],
        commitment: "2-4 Weeks"
    },
    {
        slug: 'retainer',
        title: 'Activation Retainer',
        description: 'Continuous design + culture embedding. We become your dedicated 3D/Motion/Design department.',
        priceLabel: 'Monthly Recurring',
        details: "We integrate into your Slack. We attend your standups (if needed). We become your high-end production unit. No onboarding friction for every new task. Perfect for maintaining momentum post-launch.",
        idealFor: "Agencies needing scale without headcount, or brands needing consistent high-end output.",
        deliverables: ["Unlimited Design Requests", "Priority 3D/Motion", "Weekly Syncs", "Asset Management", "Slack Access"],
        commitment: "3 Month Minimum"
    },
    {
        slug: 'performance',
        title: 'Project + Success Fee',
        description: 'Outcome-linked execution. We take a lower base fee in exchange for a performance bonus.',
        priceLabel: 'Base + Performance',
        details: "We put skin in the game. If the launch hits specific KPI targets (conversion rate, sales volume, valuation bump), we unlock a success fee. This aligns our incentives perfectly with your growth.",
        idealFor: "E-commerce brands or SaaS launches where metrics are clear and trackable.",
        deliverables: ["Full Scope Execution", "Launch Strategy", "Conversion Optimization", "KPI Tracking"],
        commitment: "Project Duration + 30 Days"
    },
    {
        slug: 'equity',
        title: 'Equity / Partnership',
        description: 'Selective bets on high-potential brands. We invest our craft in exchange for long-term upside.',
        priceLabel: 'Equity / Rev Share',
        details: "For founders with a rocket ship but no fuel. We become co-founders of the brand. We build it, launch it, and iterate it as if it were our own child. We only take 1-2 of these per year.",
        idealFor: "Early-stage startups with validated MVPs and massive scale potential.",
        deliverables: ["Full Brand Build", "Go-To-Market Strategy", "Product Design Consulting", "Investor Deck", "Board Advisory"],
        commitment: "Long Term (12+ Months)"
    }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'COOLO Zero',
    slug: 'coolo-zero',
    description: 'A 3D exploration of transparency and light.',
    category: '3D Design',
    tags: ['3D Design', 'Octane Render', 'C4D'],
    year: 2024,
    imageUrl: ASSETS.projects.zero,
    featured: true,
    client: 'Internal Experiment',
    challenge: 'Redefining brand depth through digital materials that feel tangible yet impossible.',
    role: 'Art Direction, 3D Visualization',
    outcome: 'A viral visual system used to launch the COOLO Zero concept.',
    detailImages: [
        'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600',
        ASSETS.projects.zero,
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1600'
    ],
    story: {
        goal: "We aimed to prove that digital materials can evoke visceral, physical reactions. The mission was to explore the boundaries of Octane Render beyond photorealism, into hyper-surrealism.",
        gap: "The struggle lay in the refraction settings. Standard glass shaders felt cold and lifeless. We spent 40+ hours tweaking the index of refraction (IOR) and subsurface scattering to create a material that felt like 'liquid solidified'.",
        gamble: "We decided to abandon traditional lighting setups entirely. Instead, we lit the entire scene using only the emissive properties of the objects themselves. A risky move that could have resulted in flat, muddy visuals.",
        gain: "The gamble paid off. The self-illuminated aesthetic created a depth that felt infinite. The resulting asset pack was downloaded 12,000 times in the first week.",
        processImages: [
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
        ]
    }
  },
  {
    id: 2,
    title: 'Unmplymnt OOH',
    slug: 'unmplymnt',
    description: 'Streetwear campaign for the post-work era.',
    category: 'Campaign',
    tags: ['OOH', 'Brand Strategy', 'Advertising'],
    year: 2024,
    imageUrl: ASSETS.projects.ooh,
    featured: true,
    client: 'Unmplymnt Co.',
    challenge: 'Creating a cult following through high-contrast, anti-branding OOH displays.',
    role: 'Creative Direction, Campaign Management',
    outcome: 'Sold out first drop in under 12 minutes.',
    detailImages: [
        ASSETS.projects.ooh,
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&q=80&w=1600',
        RAW_IMG_PACKAGING,
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1571216682022-793dd1d29c23?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1552345387-f44fc5e19297?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1600'
    ],
    story: {
        goal: "Unmplymnt needed to launch not just a clothing line, but a manifesto. The goal was to hijack public spaces in major cities with messages that questioned the 'grindset' culture.",
        gap: "Traditional OOH is expensive and slow. We needed a guerilla approach that felt high-end but operated on street rules. We struggled with the balance of legibility vs. artistic abstraction.",
        gamble: "We stripped the logo. The billboards featured zero branding, just cryptic URLs and brutal typography statements like 'YOUR BOSS HATES YOU'.",
        gain: "Curiosity killed the cat, but it built the brand. The mystery drove CTRs through the roof. The site crashed on launch day due to traffic overflow from the QR codes.",
        processImages: [
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
        ]
    }
  },
  {
    id: 3,
    title: 'Verve Skincare',
    slug: 'verve-cosmetics',
    description: 'High-end 3D product viz and campaign Concept.',
    category: 'Packaging',
    tags: ['3D Viz', 'Packaging', 'Conceptual'],
    year: 2023,
    imageUrl: ASSETS.projects.verve,
    client: 'Verve NYC',
    challenge: 'Elevating clinical skincare to high-fashion editorial through 3D environments.',
    role: '3D Viz, Packaging Design',
    outcome: 'Successful series A funding presentation.',
    detailImages: [
        ASSETS.projects.verve,
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&q=80&w=1600',
        ASSETS.projects.zero,
        'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1571781926291-280553fd1f54?auto=format&fit=crop&q=80&w=1600'
    ],
    story: {
        goal: "Verve had the science, but they looked like a generic pharmacy brand. Our mission was to inject 'luxury desire' into clinical formulations without losing the trust factor.",
        gap: "Physical photography was failing to capture the texture of the serums. They looked slimy, not potent. We had to move to full CGI to control the viscosity and light interaction.",
        gamble: "We placed the products in impossible environments—floating in zero-gravity water, balanced on razor edges. We bet on 'surreal science' rather than 'lifestyle bathroom shots'.",
        gain: "The investors got it immediately. The 3D assets showcased the molecular potential of the product visually. Series A funding was secured within 3 weeks of the pitch deck completion.",
        processImages: [
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800'
        ]
    }
  },
  {
    id: 4,
    title: 'Neural Node',
    slug: 'neural-node',
    description: 'Visual identity concept for an AI architecture firm.',
    category: 'Brand Identity',
    tags: ['Identity', 'Motion Design', 'Tech'],
    year: 2024,
    imageUrl: ASSETS.projects.node,
    client: 'Neural Node',
    challenge: 'Humanizing complex technical systems through fluid design language.',
    role: 'Identity Systems, Motion',
    outcome: 'A flexible OS for a global AI player.',
    detailImages: [
        ASSETS.projects.node,
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
        ASSETS.projects.ooh,
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1535378437323-95558417815e?auto=format&fit=crop&q=80&w=1600',
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1600'
    ],
    story: {
        goal: "Neural Node creates AI for architects. They needed a brand that felt structural yet fluid—representing the rigidness of buildings and the adaptability of neural networks.",
        gap: "Every AI brand uses blue dots and circuit boards. We were drowning in cliches. We had to find a visual metaphor that wasn't 'The Matrix'.",
        gamble: "We looked at organic biology—specifically mycelium networks and bone growth algorithms. We built a generative logo that changes density based on the data it processes.",
        gain: "The dynamic identity system allows them to 'brand' their datasets. Every output from their AI now carries a unique, fingerprint-like visual signature that is unmistakably Neural Node.",
        processImages: [
            'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800'
        ]
    }
  }
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All', 'Featured', '3D Design', 'Brand Identity', 'Web Design', 'Campaign', 'Fashion', 'Packaging'
];

export const TEAM_MEMBERS: { [key: string]: TeamMember } = {
  franco: {
    name: 'Franco',
    title: 'Creative Director',
    imageUrl: '.ASSETS/images/franco.webp',
    instagram: 'what.the.franco',
    bio: [
      "The Brains. Franco specializes in Strategy, Art Direction, and 3D Vision.",
      "His 'No Magic Formula' approach strips away the fluff to reveal the raw narrative of a brand. He believes design is a tool for truth, not decoration.",
      "With over a decade in high-end design, he leads the creative soul of the studio from Mount Maunganui, blending 3D craft with hard-hitting strategy.",
      "He believes that if your brand doesn't make the audience's left ear itch—meaning they talk about you when you aren't there—you're just making noise."
    ],
  },
  ariana: {
    name: 'Ariana',
    title: 'Operations Manager',
    imageUrl: ASSETS.images.ariana,
    instagram: 'ariarmndo',
    bio: [
      "The Engine. Ariana manages execution, logistics, and client sanity.",
      "She ensures that Franco's wild 3D visions are grounded in reality and delivered with surgical precision. She is the bridge between the concept and the result.",
      "She is the backbone of COOLO's efficiency and the primary point of contact for our strategic partners and agency collaborators.",
      "Her background in logistics and team management turns creative chaos into a calibrated operating system that never misses a beat."
    ],
  }
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "script-01-micromanagement",
    title: "Script 01: Micromanagement Cycle",
    date: "2024.11.12",
    imageUrl: ASSETS.projects.ooh,
    excerpt: "The client isn't difficult. They are just terrified. Why micromanagement is a symptom of a failed process, not a personality defect.",
    tags: ["Process", "Clients", "Script"],
    readTime: "4 min read",
    author: "Franco",
    content: "Ariana: You know what drives me crazy? The client complains about the slow rollout, but then they micromanage every damn color and headline. What's the real problem there?\n\nYou: Their problem is low trust, high control. They hired an expert team, but they still think their personal taste is more valuable than your expertise. If they're micromanaging, you haven't given them a process that creates trust.\n\nThey are grabbing the steering wheel because they don't believe you know the way to the destination. Show them the map, and they will put their hands back in their lap.\n\nKey Takeaway: MICROMANAGEMENT IS A SYMPTOM OF A FAILED PROCESS."
  },
  {
    slug: "script-02-budget-uncertainty",
    title: "Script 02: Budget of Uncertainty",
    date: "2024.11.08",
    imageUrl: RAW_IMG_BRANDING,
    excerpt: "Indecision is the biggest creative budget tax. Why internal chaos costs more than agency fees.",
    tags: ["Strategy", "Budget", "Management"],
    readTime: "3 min read",
    author: "Franco",
    content: "Ariana: Owners are always whining about how much design costs. But where do they actually waste the most creative budget?\n\nYou: They waste it on internal uncertainty. They spend six months arguing about the brief, changing scope every two weeks, and asking for ten rounds of revisions because they haven't aligned internally. That extra billable hour isn't our fee; it's the tax they pay for their own indecision.\n\nKey Takeaway: INDECISION IS THE BIGGEST CREATIVE BUDGET TAX."
  },
  {
    slug: "script-06-brand-job",
    title: "Script 06: The Brand's True Job",
    date: "2024.10.30",
    imageUrl: RAW_IMG_PACKAGING,
    excerpt: "Stop overcomplicating it. Your brand has one job: To make the sales conversation shorter.",
    tags: ["Strategy", "Sales"],
    readTime: "2 min read",
    author: "Franco",
    content: "Ariana: Hey, strategist, what's the single job description for a company's brand? I need the elevator pitch.\n\nYou: The brand's job is to reduce the friction of the sale. A good brand means your sales team spends less time convincing and more time closing. It creates a pre-sold audience who already trusts the result.\n\nIf your brand is 'pretty' but your sales team is struggling to explain what you do, your brand is failing.\n\nKey Takeaway: THE BRAND'S JOB IS TO CUT THE SALES CYCLE IN HALF."
  },
  {
    slug: "script-11-identity-misunderstanding",
    title: "Script 11: Identity vs. Decoration",
    date: "2024.10.15",
    imageUrl: RAW_IMG_3D_VIZ,
    excerpt: "Why most founders think 'Brand Identity' is a logo, when it's actually a decision-making engine.",
    tags: ["Identity", "Design Theory"],
    readTime: "5 min read",
    author: "Franco",
    content: "Ariana: What's the biggest misconception about brand identity? What does an owner think it is versus what it actually is?\n\nYou: They think it's the logo and the website. No, that's just the uniform. Brand identity is the unique set of rules for making decisions. It's a decision engine, not a damn coloring book.\n\nIt dictates how you speak, who you hire, what products you launch, and yes, what colors you use. But the colors are the last step, not the first.\n\nKey Takeaway: BRAND IDENTITY IS A DECISION ENGINE, NOT A COLORING BOOK."
  },
  {
    slug: "script-20-ceo-time-waste",
    title: "Script 20: The Aesthetic Trap",
    date: "2024.09.22",
    imageUrl: RAW_IMG_BRANDING,
    excerpt: "The dumbest thing a CEO can do is sit in a room and debate font choices. Stop playing art director.",
    tags: ["Efficiency", "Leadership"],
    readTime: "3 min read",
    author: "Franco",
    content: "Ariana: What’s the dumbest, biggest waste of time a CEO does every week trying to fix their brand?\n\nYou: Designing by committee. Bringing ten people into a room to nitpick a font or a color. If you're debating aesthetics, you're not leading. You are wasting payroll.\n\nSet the strategic objective. Let the designers solve the aesthetic problem. Judge the result against the objective, not your personal taste.\n\nKey Takeaway: STOP DEBATING AESTHETICS. IT'S EXPENSIVE PAYROLL."
  }
];

export const PROCESS_STEPS = [
    { title: 'The Deep Dive', desc: 'Pre-work questionnaire to extract raw materials.', time: 'Phase 01' },
    { title: 'Strategy Intensive', desc: '4-Hour collaborative workshop to define foundation.', time: 'Phase 02' },
    { title: 'Synthesis', desc: 'We retreat to craft the strategy playbook.', time: 'Phase 03' },
    { title: 'The Reveal', desc: 'Handover of the Brand Strategy Playbook.', time: 'Phase 04' }
];

export const FAQ_DATA = [
  {
    category: 'The Economics',
    questions: [
      { 
          q: 'Why is the investment higher than a freelancer?', 
          a: "It's a calculation of risk vs. reward. A freelancer executes tasks; we execute outcomes. We charge for the strategic seniority that prevents you from burning budget on the wrong direction. You aren't paying for hours; you're paying for the decade of experience that allows us to solve the problem in minutes." 
      },
      { 
          q: 'Do you accept equity in exchange for services?', 
          a: "Rarely, and only for post-Series A startups where we have a seat at the board. We are an operational unit, not a VC fund. We accelerate velocity; we don't fuel the tank from zero. Cash flow keeps the work sharp and the timelines aggressive." 
      },
      {
          q: 'What are the payment terms?',
          a: "Standard protocol is 50% deposit to secure the calendar block, and 50% upon final delivery of assets (before file handover). For larger Partnership retainers, we operate on a monthly billing cycle paid upfront."
      },
      {
          q: 'Is there a refund policy?',
          a: "No. We sell time, expertise, and intellectual property. Once the work begins, the resources are allocated. We mitigate risk by having clear strategy phases before design execution, so we never move forward without alignment."
      }
    ]
  },
  {
    category: 'The Method',
    questions: [
      {
          q: 'Can we skip the strategy phase?',
          a: "No. Requesting design without strategy is like asking a surgeon to cut without a diagnosis. You might save money on the consult, but the operation will fail. Strategy is the insurance policy for the execution."
      },
      {
          q: 'Why do you not pitch for free?',
          a: "We don't audition. Our portfolio and case studies are the proof. If you need us to solve your specific problem to build trust, you can hire us for a paid Roadmap Session. Free pitching incentivizes flashy, shallow work rather than deep, effective solutions."
      },
      {
          q: 'Why do you only present 2-3 concepts?',
          a: "Because we aren't guessing. We explore hundreds of ideas internally and kill the weak ones so you don't have to. Presenting 10 options is a sign of insecurity, not creativity. We sell certainty, not a menu of 'maybe'."
      },
      {
          q: 'Do you use AI in your workflow?',
          a: "Aggressively. We use AI for research, moodboarding, copy generation, and asset synthesis. It allows us to move 10x faster. If you want 'hand-crafted' slowness, we are not the fit. We optimize for velocity and impact."
      }
    ]
  },
  {
    category: 'The Output',
    questions: [
      {
          q: 'Do I own the source files?',
          a: "Yes. Upon final payment, you own the IP and the source files (Figma, AI, etc.). We hand over the keys. We want you to be able to scale without being tethered to us forever."
      },
      {
          q: 'Why Webflow instead of WordPress?',
          a: "Security, speed, and design freedom. WordPress is a plugin ecosystem prone to breaking. Webflow produces clean code, hosts globally, and allows us to build award-winning interactions without a developer team. It is the modern standard."
      },
      {
          q: 'What if I don’t like the design?',
          a: "We don't do 'Ta-Da!' reveals. We collaborate at every step—Strategy, Wireframes, Stylescapes. By the time we get to final design, it is the logical conclusion of decisions we made together. We haven't missed a target yet because we don't shoot blind."
      }
    ]
  },
  {
    category: 'The Rules',
    questions: [
      {
          q: 'Who will I be working with?',
          a: "Franco and Ariana. Direct access. No account managers shielding the talent. This ensures nothing gets lost in translation, but it also means we protect our deep-work time blocks aggressively."
      },
      {
          q: 'What are your red flags for clients?',
          a: "Designing by committee, requesting 'one more option' without feedback, disappearing for weeks then demanding rush work, or treating vendors like servants. We are partners, not pixel-pushers."
      },
      {
          q: 'Do you handle social media management?',
          a: "No. We build the brand, the assets, and the templates. We give you the gun and the bullets, but you (or your social team) have to pull the trigger daily. We are builders, not daily maintainers."
      }
    ]
  }
];

export const DROPS: Drop[] = [
    {
        slug: 'texture-lab-01',
        title: 'Industrial Noise',
        description: 'High-fidelity grunge textures scanned from abandoned NZ factories.',
        imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
        status: 'Live',
        category: 'Assets',
        price: '$29',
        longDescription: 'A collection of 50+ high-resolution industrial noise textures, scanned from real-world concrete, metal, and paper surfaces in Mount Maunganui industrial zones. Perfect for adding depth and grit to clean digital designs.',
        features: ['50+ Textures', '4K Resolution', 'TIFF & JPG'],
        galleryImages: [
             'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
             'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=800'
        ]
    },
    {
        slug: 'typeface-proto',
        title: 'Protocol Sans',
        description: 'A brutalist grotesque typeface with aggressive ink traps.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        status: 'Coming Soon',
        category: 'Typography',
        price: '$45',
        longDescription: 'Protocol Sans is a workhorse typeface designed for UI and large display use. It features deep ink traps and a mechanical rhythm inspired by DIN, but with more attitude.',
        features: ['3 Weights', 'Variable Font', 'Desktop + Web']
    }
];

export const SCRIPTS_DATA: Script[] = [
  {
    id: 1,
    title: "The Price Objection",
    category: "Sales",
    dialogue: [
      { speaker: "Client", text: "We love the work, but $15k for a logo seems steep." },
      { speaker: "You", text: "It's not $15k for a logo. It's $15k to ensure you don't look like a risk to your investors. The logo is just the file you get at the end. The fee covers the strategic insurance that the symbol is the right one." }
    ],
    overlay: "PRICE IS A MEASURE OF RISK REDUCTION."
  },
  {
    id: 2,
    title: "The 'Make It Pop' Request",
    category: "Feedback",
    dialogue: [
      { speaker: "Client", text: "Can we make it pop more? It feels a bit flat." },
      { speaker: "You", text: "'Pop' is usually code for 'lack of hierarchy'. What you're really seeing is that the primary message isn't fighting hard enough against the background. We don't add noise to make it pop; we increase contrast to make it speak." }
    ],
    overlay: "DIAGNOSE THE PROBLEM, DON'T TAKE THE ORDER."
  },
  {
    id: 3,
    title: "The Deadline Crunch",
    category: "Process",
    dialogue: [
      { speaker: "Client", text: "We need this launched in 2 weeks." },
      { speaker: "You", text: "We can launch in 2 weeks, but we will have to cut the strategy phase. That means we are guessing. If you are okay with guessing with your budget, we can proceed. If you want certainty, we need 4 weeks." }
    ],
    overlay: "FAST, CHEAP, GOOD. PICK TWO."
  },
  {
    id: 4,
    title: "Too Many Options",
    category: "Process",
    dialogue: [
      { speaker: "Client", text: "Can we see a few more routes? Just to explore?" },
      { speaker: "You", text: "I can show you ten mediocre routes, or I can show you the one that actually works. My job isn't to give you choices; it's to give you the solution. Infinite options are just procrastination in disguise." }
    ],
    overlay: "CERTAINTY IS WHAT THEY PAY FOR."
  },
  {
      id: 5,
      title: "The 'My Wife Doesn't Like It'",
      category: "Feedback",
      dialogue: [
          { speaker: "Client", text: "I showed it to my wife/husband and they didn't get it." },
          { speaker: "You", text: "Unless your spouse is the target demographic or a brand expert, their opinion is personal taste, not market data. We design for the customer, not the committee." }
      ],
      overlay: "SUBJECTIVE FEEDBACK KILLS OBJECTIVE SUCCESS."
  }
];

export const FREE_RESOURCES: Resource[] = [
    { 
      id: '01', 
      title: 'Brand Community Starter Kit', 
      format: 'PDF', 
      desc: 'Short exercises to define your tribe & vibe. Includes templates for audience notes and a brand voice checklist.',
      link: '#' 
    },
    { 
      id: '02', 
      title: '3D Aesthetic Protocol', 
      format: 'EBOOK', 
      desc: 'How to use Cinema 4D and Octane to build a visual system that feels more than just digital.',
      link: '#' 
    },
    { 
      id: '03', 
      title: 'Studio Ops Stack', 
      format: 'LIST', 
      desc: 'Ariana\'s internal toolset for managing senior-level creative execution without the bloat.',
      link: '#' 
    },
    {
      id: '04',
      title: 'The Pricing Script',
      format: 'SCRIPT',
      desc: 'The exact words to use when a client says "that\'s too expensive" without lowering your fee.',
      link: '#'
    },
    {
      id: '05',
      title: 'Objection Handler PDF',
      format: 'GUIDE',
      desc: 'A cheat sheet for navigating the 5 most common client pushbacks during a pitch.',
      link: '#'
    }
];

export const WORKBOOKS: Workbook[] = [
    {
        title: 'Culture in 7 Days',
        price: '$30',
        subtitle: 'The Mini-Workbook',
        description: 'Daily exercises to clarify your POV, audience truths, and core message. 40-60 pages of pure tactical work.',
        format: 'PDF + Notion',
        vol: '01',
        features: ['Day 1: POV', 'Day 3: Problems', 'Day 7: Plan']
    },
    {
        title: 'The Strategy Deck',
        price: '$45',
        subtitle: 'Pitch Template',
        description: 'The exact slide deck structure we use to sell 5-figure branding projects. No filler, just persuasion logic.',
        format: 'Figma + Keynote',
        vol: '02',
        features: ['15 Core Slides', 'Grid Systems', 'Script Prompts']
    },
    {
        title: 'Client Ops OS',
        price: '$60',
        subtitle: 'Notion System',
        description: 'Ariana’s complete operating system for managing high-ticket creative clients without the chaos.',
        format: 'Notion Template',
        vol: '03',
        features: ['Onboarding Flow', 'Asset Trackers', 'Feedback Loops']
    },
    {
        title: 'The Brand Audit',
        price: '$45',
        subtitle: 'Diagnostic Tool',
        description: 'A brutal 50-point checklist to audit your own brand or a client\'s. Find the cracks before the market does.',
        format: 'Notion + PDF',
        vol: '04',
        features: ['Visual Audit', 'Messaging Stress Test', 'UX Review']
    },
    {
        title: 'Content Matrix',
        price: '$35',
        subtitle: 'Social Strategy',
        description: 'Never run out of ideas. A modular system for generating high-intent content pillars that convert.',
        format: 'Google Sheets',
        vol: '05',
        features: ['Pillar Definition', 'Hook Generator', 'Calendar View']
    },
    {
        title: 'Proposal Pro',
        price: '$50',
        subtitle: 'Sales Document',
        description: 'The exact proposal template that closed our biggest deals. Move from "maybe" to "signed" faster.',
        format: 'InDesign + Canva',
        vol: '06',
        features: ['Scope Definition', 'Timeline UI', 'Pricing Tables']
    },
    {
        title: 'Naming Protocol',
        price: '$40',
        subtitle: 'Creative Tool',
        description: 'A systematic approach to generating brand names that aren\'t taken and actually sound good.',
        format: 'PDF Guide',
        vol: '07',
        features: ['Brainstorming Matrix', 'Trademark Check', 'Vibe Test']
    },
    {
        title: 'Visual Identity Checklist',
        price: '$20',
        subtitle: 'Quality Control',
        description: 'The pre-flight checklist we use before delivering any identity system. Ensure your files are bulletproof.',
        format: 'Notion',
        vol: '08',
        features: ['File Formats', 'Color Modes', 'Export Settings']
    }
];

export const COURSE_MODULES: CourseModule[] = [
    { mod: '01', title: 'Positioning', desc: 'Finding a tight, credible position you can defend. Stop trying to be everything to everyone.' },
    { mod: '02', title: 'Audience', desc: 'Real people, real needs (JTBD). No fake personas. Understanding the psychology of your buyer.' },
    { mod: '03', title: 'Messaging', desc: 'Building the matrix: Narrative spine, value props, proof points. What you say vs. how you say it.' },
    { mod: '04', title: 'Story', desc: 'The Story Spine and objection handlers. How to weave your facts into a narrative that sticks.' },
    { mod: '05', title: '90-Day Plan', desc: 'Themes, channels, and cadence roadmap. Translating strategy into a content calendar.' },
    { mod: '06', title: 'Case Breakdowns', desc: 'Real-world examples of the formula in action. We dissect successful and failed brands.' }
];
