import { Project, TeamMember, JournalPost, ServiceLeg, ProjectCategory, Drop, DesignPowerTier, ClarityTier, Script, Resource, Workbook, CourseModule, PartnershipModel } from './types';

// --- ASSETS ---
export const ASSETS = {
  team: {
    franco: '/assets/team/Franco.webp',
    ariana: '/assets/team/Ariana.webp'
  },
  services: {
      clarity: "#FCC803",      // Brand Yellow
      designPower: "#3A0888",  // Brand Purple
      partnership: "#0F0328"   // Brand Navy
  }
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'UNMPLYNMT',
    slug: 'unmplynmt',
    description: `
    A Brand Built Like Culture, Not a Logo. Streetwear is often just a logo slapped on a blank. 
    We wanted to build a brand that felt like a uniform for a new workforce—one that rejects 
    the traditional 9-to-5. We stripped away the polish and embraced "Typographic Brutality," 
    using raw, industrial typefaces and stark, high-contrast imagery. This wasn't about 
    looking pretty; it was about looking inevitable. The result is a visual system that 
    feels less like a clothing brand and more like a movement.`,
    category: 'Brand Identity', 
    tags: ['Brutalism', 'Typography', 'Strategy'],
    year: 2025,
    imageUrl: '/assets/cases/unmplymnt/Hero.webp', 
    featured: true,
    client: 'unmplymnt',
    role: 'Brand Strategy, Logotype & Mark system, Art Direction, Content Creation.',
    detailImages: [
        '/assets/cases/unmplymnt/detail-1.webp', 
        '/assets/cases/unmplymnt/detail-2.webp', 
        '/assets/cases/unmplymnt/detail-3.webp', 
        '/assets/cases/unmplymnt/detail-5.webp',
        '/assets/cases/unmplymnt/detail-6.webp',
        '/assets/cases/unmplymnt/detail-7.webp',
        '/assets/cases/unmplymnt/detail-10.png',
        '/assets/cases/unmplymnt/detail-11.png'
    ],
    story: {
        goal: "",
        gap: "",
        gamble: "",
        gain: "Identity done right does not whisper. It moves people.",
        processImages: [
            '/assets/cases/unmplymnt/process-1.webp',
            '/assets/cases/unmplymnt/process-2.webp',
            '/assets/cases/unmplymnt/process-3.webp',
            '/assets/cases/unmplymnt/process-4.webp',
            '/assets/cases/unmplymnt/process-5.png',
            '/assets/cases/unmplymnt/process-6.png',
            '/assets/cases/unmplymnt/process-7.png',
            '/assets/cases/unmplymnt/process-8.png',
            '/assets/cases/unmplymnt/process-11.png',
            '/assets/cases/unmplymnt/process-12.png',
            '/assets/cases/unmplymnt/process-13.png'

        ]
    }
  },
  {
    id: 2,
    title: 'Surfboard v001',
    slug: 'surfboard-v001',
    description: `
    Concept project. It's beach time and surfing season in Mount Maunganui. 
    As a result, we see surfboards every day up and down the road and the beach. Despite their 
    simple shapes they are full of colour, texture, and designs that inspire us. 
    That's why we jumped into Cinema 4D and started creating high-res board renders.

    It's evident that this isn't 100% engineer-correct. Probably it won't surf well. 
    As mentioned, this is not a real surfboard, but we love how the renders turned out. We love the board design too.
    The materials and textures... mmmm, what a beauty!`,
    category: '3D Design',
    tags: ['3D Design', 'Product Visualization', 'High-Res Rendering'],
    year: 2023,
    imageUrl: '/assets/cases/surfboard-v001/Hero.webp',
    featured: true,
    client: 'Concept Test',
    role: '3D Design, Product Renders',
    detailImages: [
        '/assets/cases/surfboard-v001/detail-1.webp',
        '/assets/cases/surfboard-v001/detail-2.webp',
        '/assets/cases/surfboard-v001/detail-3.webp',
        '/assets/cases/surfboard-v001/detail-4.webp',
        '/assets/cases/surfboard-v001/detail-5.jpg'
    ],
    story: {
        goal: "",
        gap: "",
        gamble: "",
        gain: "We're so happy with the outcome. And we are already working more on new surfboard design projects. We love it.",
        processImages: [
            '/assets/cases/surfboard-v001/process-1.webp',
            '/assets/cases/surfboard-v001/process-2.webp',
            '/assets/cases/surfboard-v001/process-3.jpg',
            '/assets/cases/surfboard-v001/process-4.webp',
            '/assets/cases/surfboard-v001/process-5.webp',
            '/assets/cases/surfboard-v001/process-6.png'
        ]
    }
  },
    {
    id: 3,
    title: 'Ntegrity',
    slug: 'ntegrity',
    description: `
      Operational design support for Australia’s leading non-profit marketing agency. 
      Ntegrity needed more than just a freelancer; they needed a "Design Engine" capable 
      of handling high-volume, high-stakes campaigns for major charities like The Salvation Army. 
      
      We embedded directly into their workflow, executing display ads, social motion, 
      and campaign landing pages with rapid turnaround times. This wasn't just pixel-pushing; 
      it was about maintaining strict brand integrity while delivering the emotional punch 
      required for non-profit fundraising.`,
    category: 'Partnership',
    tags: ['Agency', 'Digital Ads', 'Social Media', 'Events'],
    year: 2022,
    imageUrl: '/assets/cases/ntegrity/Hero.webp', 
    featured: false,
    client: 'Ntegrity Agency',
    role: 'Mid-Weight Designer',
    detailImages: [
        '/assets/cases/ntegrity/detail-1.webp',
        '/assets/cases/ntegrity/detail-2.webp',
        '/assets/cases/ntegrity/detail-3.gif',
        '/assets/cases/ntegrity/detail-4.webp',
        '/assets/cases/ntegrity/detail-5.gif',
        '/assets/cases/ntegrity/detail-6.gif',
        '/assets/cases/ntegrity/detail-7.png'

    ],
    story: {
        goal: "",
        gap: "", 
        gamble: "",
        gain: "High-volume creative output with zero drop in brand fidelity.",
        processImages: [
            '/assets/cases/ntegrity/process-1.webp',
            '/assets/cases/ntegrity/process-2.webp',
            '/assets/cases/ntegrity/process-3.webp',
            '/assets/cases/ntegrity/process-4.gif',
            '/assets/cases/ntegrity/process-5.png',
            '/assets/cases/ntegrity/process-6.png'
        ]
    }
  },
{
    id: 4,
    title: 'Pablo Creative',
    slug: 'pablo-creative',
    description: `
      A true studio-to-studio collaboration. We partnered with Pablo Creative to expand 
      their output capabilities without diluting their vision. Working side-by-side with 
      their Creative Director, we handled everything from vector illustration and motion 
      graphics to on-set photography direction. This project proved that two distinct 
      creative voices could merge to form a louder, more versatile signal.`,
    category: 'Partnership',
    tags: ['Studio', 'Motion', 'Photography', 'Graphic Design'],
    year: 2022,
    imageUrl: '/assets/cases/pablo-creative/Hero.webp', 
    featured: false,
    client: 'Pablo Creative',
    role: 'Associate Creative Direction, Design Execution, Art Assistance',
    detailImages: [
        '/assets/cases/pablo-creative/detail-1.webp',
        '/assets/cases/pablo-creative/detail-2.jpg',
        '/assets/cases/pablo-creative/detail-3.webp',
        '/assets/cases/pablo-creative/detail-4.webp',
        '/assets/cases/pablo-creative/detail-5.webp',
        '/assets/cases/pablo-creative/detail-6.webp',
        '/assets/cases/pablo-creative/detail-7.jpg',
        '/assets/cases/pablo-creative/detail-8.webp',
        '/assets/cases/pablo-creative/detail-9.webp'
    ],
    story: {
        goal: "",
        gap: "", 
        gamble: "", 
        gain: "Seamless integration of two creative units.",
        processImages: [
            '/assets/cases/pablo-creative/process-1.webp',
            '/assets/cases/pablo-creative/process-2.webp',
            '/assets/cases/pablo-creative/process-3.webp',
            '/assets/cases/pablo-creative/process-4.webp',
            '/assets/cases/pablo-creative/process-5.webp',
            '/assets/cases/pablo-creative/process-7.jpg',
            '/assets/cases/pablo-creative/process-8.webp',
            '/assets/cases/pablo-creative/process-9.jpg',
            '/assets/cases/pablo-creative/process-10.jpg'
        ] 
    }
  },

{
    id: 5,
    title: 'The Cartridges',
    slug: 'the-cartridges',
    description: `
      Nostalgia is usually hazy, but we wanted to make it sharp. We took the iconic 
      SNES cartridges of the 90s—Super Mario, Contra, Mortal Kombat—and treated them 
      like high-end industrial design objects. We placed them in a pitch-black void and 
      used stark, geometric lighting to highlight the physical details: the plastic grain, 
      the sticker gloss, the dust in the grooves. It’s a study in how lighting can 
      transform a cheap plastic toy into a premium artifact.
    `,
    category: '3D Design',
    tags: ['Industrial', 'Hardware', 'Lighting',],
    year: 2021,
    imageUrl: '/assets/cases/the-cartridges/Hero.webp',
    featured: false,
    client: 'Concept Art',
    role: '3D Artist',
    detailImages: [ 
        '/assets/cases/the-cartridges/detail-1.webp', 
        '/assets/cases/the-cartridges/detail-2.webp', 
        '/assets/cases/the-cartridges/detail-3.webp', 
        '/assets/cases/the-cartridges/detail-4.webp'
    ],

        story: {
        goal: "",
        gap: "",
        gamble: "",
        gain: "A set of high-converting, hyper-real visual assets.",
        processImages: [
        '/assets/cases/the-cartridges/process-1.webp', 
        '/assets/cases/the-cartridges/process-2.webp', 
        '/assets/cases/the-cartridges/process-3.webp',
        '/assets/cases/the-cartridges/process-4.jpg',
        '/assets/cases/the-cartridges/process-5.png',
        '/assets/cases/the-cartridges/process-6.jpg',
        '/assets/cases/the-cartridges/process-7.webp',
        '/assets/cases/the-cartridges/process-8.webp',
        
    ]
    }
  },
 {
    id: 6,
    title: 'Johney’s Dumpling House',
    slug: 'johneys-dumpling-house',
    description: `
      Straightforward product photography for festival stalls and food truck menus. 
      The brief was functional: capture the menu items clearly for immediate use at busy events. 
      We focused purely on the food—ensuring it looked appetizing and legible on menu boards 
      in chaotic, high-traffic street food environments. Simple, effective, and ready to sell.`,
    category: 'Photography',
    tags: ['Hospitality', 'Photography', 'Food Photography'],
    year: 2020,
    imageUrl: '/assets/cases/johneys-dumpling-house/Hero.webp',
    featured: true,
    client: 'Jonhey’s Dumpling House',
    role: 'Food Photography',
    detailImages: [
        '/assets/cases/johneys-dumpling-house/detail-1.webp',
        '/assets/cases/johneys-dumpling-house/detail-2.webp',
        '/assets/cases/johneys-dumpling-house/detail-3.webp'
    ],
    story: {
        goal: "",
        gap: "",
        gamble: "",
        gain: "Clear, menu-ready assets for high-volume sales.",
        processImages: [
            '/assets/cases/johneys-dumpling-house/process-1.webp',
            '/assets/cases/johneys-dumpling-house/process-2.webp',
            '/assets/cases/johneys-dumpling-house/process-3.webp'
        ]
    }
  },
 {
    id: 7,
    title: 'Franca Austral',
    slug: 'franca-austral',
    description: `
      A craft beer born at the edge of the world. The brief was simple but heavy: capture 
      the raw, untamed spirit of the Patagonian coast without falling into the trap of 
      "rustic" clichés. We ignored the industry standard of busy, graffiti-laden cans and 
      went the opposite direction—editorial silence. We built a visual identity grounded 
      in white space, ocean-inspired tones, and a stark, whales-tail icon. It’s not just 
      beer packaging; it’s a tribute to the southern landscapes where it’s brewed.`,
    category: 'Brand Identity',
    tags: ['Editorial', 'Strategy', 'Nature'],
    year: 2018,
    imageUrl: '/assets/cases/franca-austral/Hero.webp',
    featured: false,
    client: 'Franca Austral Cerveceria',
    role: 'Creative Designer',
    detailImages: [
        '/assets/cases/franca-austral/detail-1.webp',
        '/assets/cases/franca-austral/detail-2.webp',
        '/assets/cases/franca-austral/detail-3.webp',
        '/assets/cases/franca-austral/detail-4.webp'

    ],
    story: {
        goal: "",
        gap: "",
        gamble: "",
        gain: "A visual identity that whispers quality instead of shouting for attention.",
        processImages: [
            '/assets/cases/franca-austral/process-1.webp',
            '/assets/cases/franca-austral/process-2.webp',
            '/assets/cases/franca-austral/process-3.webp',
            '/assets/cases/franca-austral/process-4.webp',
            '/assets/cases/franca-austral/process-5.png',
            '/assets/cases/franca-austral/process-6.jpg'

            ]
    }
  },
 {
    id: 8,
    title: 'Just Boxes',
    slug: 'just-boxes',
    description: `
      Elevating the structural honesty of material packaging. Sustainable packaging often 
      feels cheap or over-engineered. With Just Boxes, we wanted to celebrate the cardboard 
      itself as a luxury material. We removed all plastic coatings and relied entirely on 
      structural folding and high-quality recycled pulp. The design is stark and utilitarian, 
      proving that you don't need glossy finishes to create a premium unboxing experience. 
      It’s honest, structural, and 100% recyclable.`,
    category: 'Packaging',
    tags: ['Packaging', 'Industrial', 'Minimalism'],
    year: 2025,
    imageUrl: '/assets/cases/just-boxes/Hero.webp', 
    featured: true,
    client: 'Just Boxes',
    role: 'Creative Direction',
    detailImages: [
        '/assets/cases/just-boxes/detail-1.webp',
        '/assets/cases/just-boxes/detail-2.webp'
    ],
    story: {
        goal: "",
        gap: "",
        gamble: "",
        gain: "Packaging that feels expensive but costs the earth nothing.",
        processImages: [
            '/assets/cases/just-boxes/detail-1.webp',
            '/assets/cases/just-boxes/detail-2.webp'
        ]
    }
  }
];

export const TEAM_MEMBERS: { [key: string]: TeamMember } = {
    franco: {
    name: 'Franco',
    title: 'Creative Director',
    imageUrl: ASSETS.team.franco, 
    instagram: 'what.the.franco',
    bio: [
      "Anyone can make things look 'nice.' Franco makes them matter. He operates at the intersection of brutal strategy and high-end visual chaos. He’s the one asking the uncomfortable questions about why you exist before he even touches a pixel.",
      "As the Visual Architect, he treats brand building less like a painting and more like architecture—building systems that are durable, scalable, and unmistakably distinct. He believes there is no magic formula—just rigorous logic, stripped of corporate fluff.",
      "While Ariana keeps the train on the tracks, Franco is the one shoveling coal into the engine, pushing the aesthetic edges and ensuring the work doesn't just 'fit in'—it dominates. He sells clarity, not decoration."
    ],
  },
  ariana: {
    name: 'Ariana',
    title: 'Operations Manager',
    imageUrl: ASSETS.team.ariana, 
    instagram: 'ariarmndo',
    bio: [
      "Ideas are everywhere. Everyone has them. What actually matters is making them real. That’s where Ariana comes in. She’s the person who makes sure the work moves forward instead of living in a Google Doc forever.",
      "While the creative side is pushing ideas, testing edges, and occasionally overcomplicating things, she’s bringing clarity—what’s happening, when it’s happening, and how we’re actually going to pull it off. She runs the timelines, budgets, and logistics that keep projects grounded in reality.",
      "If Franco is the chaos and creative momentum, Ariana is the structure that turns it into something real. She makes sure what we promise is clear, achievable, and delivered properly—no surprises, no stress, no fluff."
    ],
  }
};

export const NAV_LINKS = [
  { 
    name: 'Studio', 
    path: '/about',
    subLinks: [
      { name: 'The Humans', path: '/team' },
      { name: 'Playbook', path: '/playbook' },
      { name: 'Join Us', path: '/join' },
      { name: 'Drops', path: '/drops' }
    ]
  }, 
  { 
    name: 'Clarity', 
    path: '/clarity',
    subLinks: [
        { name: 'Brand Reality Check', path: '/clarity/reality-check'},
        { name: 'Free Resources', path: '/clarity/free-resources' }
    ]
  },
  { 
    name: 'Design Power', 
    path: '/design-power',
    subLinks: [
      { name: 'The Basics', path: '/design-power/the-basics' },
      { name: 'The Campaign', path: '/design-power/the-campaign' },
      { name: 'The Content', path: '/design-power/the-content' },
      { name: 'The Website', path: '/design-power/the-website' },
      { name: 'The Full Flex', path: '/design-power/the-full-flex' }
    ]
  },
  { 
    name: 'Partnership', 
    path: '/partnership',
    subLinks: [
      { name: 'Scale', path: '/partnership/scale' },
      { name: 'Fractional CD', path: '/partnership/fractional-cd' },
      { name: 'Project Spike', path: '/partnership/project-spike' },
      { name: 'Equity', path: '/partnership/equity' }
    ]
  },
  { name: 'Work', path: '/work' },
  { name: 'Journal', path: '/journal' },
];

export const SERVICE_LEGS: ServiceLeg[] = [
  {
    id: 'brand-clarity',
    title: 'I am Confused',
    subtitle: 'Brand Strategy',
    hoverText: 'We fix your story so people actually listen.',
    visual: 'Logic First',
    path: '/clarity',
    imageUrl: ASSETS.services.clarity
  },
  {
    id: 'design-power',
    title: 'I look average',
    subtitle: 'Design Execution',
    hoverText: 'Identity, 3D, and Webflow. High-res only.',
    visual: 'Visual Power',
    path: '/design-power',
    imageUrl: ASSETS.services.designPower
  },
  {
    id: 'partner',
    title: 'I need a partner',
    subtitle: 'For Agencies',
    hoverText: 'We become your senior design unit.',
    visual: 'Scale Up',
    path: '/partnership',
    imageUrl: ASSETS.services.partnership
  }
];

export const BRAND_CLARITY_TIERS: ClarityTier[] = [
    { 
        slug: 'the-reality-check',
        name: 'The Reality Check', 
        subtitle: 'Brand Diagnostic',
        desc: "Does your brand make sense? Or is it a mess? Use our free tools to check your pulse before you spend money.", 
        cta: "Check Yourself", 
        features: ["AI Brand Audit", "The Hard Questions", "Instant Feedback"],
        timeline: "Instant",
        idealFor: "Founders who suspect their branding is weak."
    },
    { 
        slug: 'brand-garage-guide',
        name: 'The Garage Guide', 
        subtitle: 'DIY Brand Kit',
        desc: "Not ready to hire us? Fine. Don't guess. Use our guide to fix your story yourself. Simple English.", 
        cta: "Get the Guide", 
        features: ["7-Day Plan", "No-BS templates", "Target Audience fix"],
        timeline: "1 Week (DIY)",
        idealFor: "Bootstrappers ready to stop looking like amateurs."
    },
    { 
        slug: 'strategy-sessions',
        name: 'The Strategy Sessions', 
        subtitle: 'We fix it for you',
        desc: "We sit down. We talk. We find the problem. We write the Playbook that guides your whole business.", 
        cta: "Book a Chat", 
        features: ["2x Strategy Calls", "The Brand Playbook", "Your Messaging Cheat Codes"],
        timeline: "2–4 Weeks",
        idealFor: "Business owners tired of confusing marketing."
    },
    { 
        slug: 'creative-partner',
        name: 'The Creative Partner',
        subtitle: 'Ongoing Support',
        desc: "We join your team. We become the 'Creative Brain' that keeps you looking sharp every month.", 
        cta: "Partner Up", 
        features: ["Visual Design", "Web Updates", "Quality Control"],
        timeline: "Monthly",
        idealFor: "Brands that can't afford to look bad."
    }
];

export const DESIGN_POWER_TIERS: DesignPowerTier[] = [
    {
        slug: "the-basics",
        name: "The Basics",
        focus: "Just the Basic to Look the Part",
        desc: "You have a business, but you still look like a hobby-ish. We help fix that. A sharp logo and colours to make you look PRO.",
        cta: "Get Sharp",
        deliverables: ["Logo System", "Colour & Type", "Mini-Rulebook"],
        timeline: "2–4 Weeks",
        idealFor: "New founders embarrassed by their business card."
    },
    {
        slug: "the-campaign",
        name: "The Campaign",
        focus: "Launch Time",
        desc: "A logo isn't enough. You need to sell. We build the ads, the visuals, and the story to launch your products.",
        cta: "Start Selling",
        deliverables: ["Ad Mockups", "Campaign Concept", "Copywriting Headlines"],
        timeline: "4–5 Weeks",
        idealFor: "Brands ready to run ads."
    },
    {
        slug: "the-content",
        name: "The Content",
        focus: "Face Time",
        desc: "Your visual identity is signed off. Now, you need presence. We build the system and the stories so your brand shows up consistently across all your brands touch-points.",
        cta: "Show Yourself",
        deliverables: ["Feed Vibes", "Storytelling Concept", "Captions builders", "SM Design Template"],
        timeline: "2–4 Weeks",
        idealFor: "Brands ready to show up."
    },
    {
        slug: "the-website",
        name: "The Website",
        focus: "Your HQ",
        desc: "We build cool sites that convert visitors into customers with cash to spend. No templates. Custom made or Webflow dev.",
        cta: "Build It",
        deliverables: ["Custom Web Design", "Webflow Dev", "Responsive Ready", "CMS Training"],
        timeline: "6–8 Weeks",
        idealFor: "Scale-ups who outgrew Squarespace."
    },
    {
        slug: "the-full-flex",
        name: "The Full Flex",
        focus: "Everything",
        desc: "The nuclear option. We rebuild everything. Identity, Website, 3D, Strategy. The complete transformation.",
        cta: "Go All In",
        deliverables: ["Full Identity", "Webflow Site", "3D Renders", "Strategy"],
        timeline: "10–12 Weeks",
        idealFor: "Players ready to dominate."
    }
];

export const PARTNERSHIP_MODELS: PartnershipModel[] = [
    {
        slug: 'scale',
        title: 'For Agencies',
        description: 'We are your secret weapon.',
        priceLabel: 'Flat Fee',
        details: "You sell the project. We do the design. You take the credit. We don't care, as long as the work is good.",
        idealFor: "Agencies needing better design power.",
        deliverables: ["3D Visuals", "Webflow Builds"],
        commitment: "Per Project"
    },
    {
        slug: 'fractional-cd',
        title: 'Fractional CD',
        description: 'Your brain for rent.',
        priceLabel: 'Monthly',
        details: "We act as your Creative Director. We manage your juniors and vendors so you don't have to.",
        idealFor: "Startups with messy design teams.",
        deliverables: ["Direction", "Quality Control"],
        commitment: "3 Months Min"
    },
    {
        slug: 'project-spike',
        title: 'The Spike',
        description: 'Fast and loud.',
        priceLabel: 'Fixed Price',
        details: "A surgical strike. We solve one hard visual problem in a very short time.",
        idealFor: "Brands needing a creative assets for yesterday.",
        deliverables: ["High-End Assets"],
        commitment: "2-4 Weeks"
    },
    {
        slug: 'equity',
        title: 'Equity',
        description: 'High risk, high reward.',
        priceLabel: 'Equity + Fee',
        details: "If your idea is world-changing, we invest our design time for a piece of the pie.",
        idealFor: "Pre-seed founders with great tech but zero vibes.",
        deliverables: ["Full Brand Launch"],
        commitment: "Long-term"
    }
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All', 'Featured', '3D Design', 'Brand Identity', 'Web Design', 'Strategy', 'Packaging', 'Partnership'
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "script-01-micromanagement",
    title: "Why Clients Micromanage",
    date: "2024.11.12",
    imageUrl: './assets/journal/script-01.webp',
    excerpt: "It's not them. It's you. Micromanagement is a symptom of bad strategy.",
    tags: ["Process", "Clients"],
    readTime: "4 min read",
    author: "Franco",
    content: "Micromanagement happens when trust is broken. We build trust by having a rigid process. If you can explain 'Why', they won't ask 'Can we make it blue?'."
  },
  {
    slug: "3d-as-strategic-asset",
    title: "3D isn't just candy",
    date: "2024.10.05",
    imageUrl: './assets/journal/script-02.webp',
    excerpt: "Stop using 3D to look cool. Use it to sell products.",
    tags: ["3D", "Strategy"],
    readTime: "6 min read",
    author: "Franco",
    content: "For product brands, 3D desing is about control. Perfect lighting, perfect angles, every time. It's cheaper than a photoshoot and looks 10x more expensive."
  },
  {
    slug: "no-magic-formula-logic",
    title: "The Magic is a Lie",
    date: "2024.09.20",
    imageUrl: './assets/journal/script-03.webp',
    excerpt: "Designing by 'feeling' is dangerous. Design by logic.",
    tags: ["Business", "Fluff"],
    readTime: "5 min read",
    author: "Franco",
    content: "The 'Creative Guru' is dead. We rely on logic. If your strategy can't survive a basic stress test, it's just decoration."
  }
];

export const FREE_RESOURCES: Resource[] = [
    { 
        id: '01', 
        title: 'Brand Reality Check', 
        format: 'APP', 
        desc: 'Is your brand a mess? Use this free tool to find out.', 
        link: './clarity/reality-check' 
    },
    { 
        id: '02', 
        title: 'The Hard Questions', 
        format: 'PDF', 
        desc: 'The exact questions we ask clients. Steal our process.', 
        link: './docs/questionnaire.pdf' 
    },
    { 
        id: '03', 
        title: 'The Cheat Sheet', 
        format: 'PDF', 
        desc: 'If you can’t explain your business on one page, you are trying too hard.', 
        link: './docs/positioning.pdf' 
    }
];

export const QA_DATA = [
  {
    category: 'The Vibe Check',
    questions: [
      {
          q: 'Are you guys an Agency?',
          a: "Please, no. Agencies have timesheets, account managers, and ping-pong tables to hide the burnout. We are a Studio. It’s just us (Franco & Ariana). We do the work. We answer the emails. We give a damn."
      },
      {
          q: 'Why the 90/00s vibes?',
          a: "It was the last time the world felt real. No AI, no algorithms, just raw creativity and good music. We bring that analog soul—tactile, honest, impermanent—into the digital work we do."
      },
      {
          q: 'Can I text you on the weekend?',
          a: "You can try. But unless the server is on fire or aliens have landed, we’re probably surfing, skating, or recharging. We protect our peace so we can be obsessed with your project on Monday."
      }
    ]
  },
  {
    category: 'The Money Talk',
    questions: [
      { 
          q: 'Why no "Cheap" option?', 
          a: "Because cheap builds expensive problems. We could do a $50 logo, but you’d spend $5,000 fixing it next year. We price for longevity. We build engines that run for years, not stickers that peel off in a month." 
      },
      {
          q: 'Do you take equity?',
          a: "If your idea is world-changing and you’re cool, let’s talk. But usually, our landlord prefers cash."
      },
      {
          q: 'Can I split the bill?',
          a: "Standard is 50/50. Half to start the engine, half before we hand over the keys. For the big 'Full Flex' projects, we can break it into three milestones to help cash flow."
      }
    ]
  },
  {
    category: 'The Process',
    questions: [
      {
          q: 'Will you design exactly what I ask for?',
          a: "No. We design what you need. If you want a 'Yes Man' to just move pixels around, there are cheaper options. You hire us to be the experts, to challenge you, and to stop you from making boring decisions."
      },
      {
          q: 'Do you use AI?',
          a: "We use it to handle the boring stuff (coding, resizing, file sorting) so we can spend more time on the human stuff (strategy, story, taste). AI is a tool, not the talent."
      },
      {
          q: 'Webflow or Wordpress?',
          a: "Webflow. Always. Wordpress is like a 2005 Honda Civic with a spoiler—it works, but it breaks down a lot. Webflow is a Tesla."
      },
      {
          q: 'Who owns the work?',
          a: "You do. 100%. Once the final invoice is paid, we hand over every file, vector, and login. It’s your car; we just built the engine."
      }
    ]
  },
  {
    category: 'The Fit',
    questions: [
      {
          q: 'Do you work with boring industries?',
          a: "Boring is a choice. Logistics can be sexy. Accounting can be punk. If you have an open mind, we can make any industry interesting."
      },
      {
          q: 'Can we start tomorrow?',
          a: "Probably not. We usually book 2–4 weeks out. Good strategy takes a minute to marinate. We move fast, but we never rush."
      }
    ]
  }
];

export const DROPS: Drop[] = [];
export const SCRIPTS_DATA: Script[] = [
    {
        id: 1,
        title: "The Logic Pivot",
        category: "Client Ops",
        dialogue: [
            { speaker: "Client", text: "I'm not sure about this font, can we try something rounder?" },
            { speaker: "You", text: "We can, but looking back at our 'Positioning Pillar 02', our goal was to feel technical and precise. A rounder font softens that edge. Does softening the brand help us win with the target audience?" }
        ],
        overlay: "Strategy is the filter for subjective noise."
    },
    {
        id: 2,
        title: "The Discount Trap",
        category: "Pricing",
        dialogue: [
            { speaker: "Client", text: "We love your approach, but we only have 60% of the budget. Can you meet us halfway?" },
            { speaker: "You", text: "I understand the constraint. To meet that number, we would have to remove the 'Audience Stress Test' and the 'Material Audit' from the scope. Are those steps you're comfortable losing, or should we wait until the full budget is unlocked?" }
        ],
        overlay: "Don't lower the price. Lower the scope."
    },
    {
        id: 3,
        title: "The 'I'll know it when I see it' Defense",
        category: "Process",
        dialogue: [
            { speaker: "Client", text: "We don't want to do the strategy phase. Just show us some logos and we'll pick one." },
            { speaker: "You", text: "Guessing is expensive. If we skip strategy, we're designing for your personal taste, not your business objective. We don't design to 'see if you like it'; we design to ensure it works." }
        ],
        overlay: "Subjectivity is the enemy of ROI."
    },
    {
        id: 4,
        title: "Scope Creep Guardrail",
        category: "Project Management",
        dialogue: [
            { speaker: "Client", text: "While you're building the site, can you also just whip up a few social media templates?" },
            { speaker: "You", text: "Absolutely. I'll add those to the 'Phase 02' wishlist. Once the core build is launched, I'll send over a separate scope for the social pack. Sound good?" }
        ],
        overlay: "Park the 'Just one more thing' in Phase 2."
    },
    {
        id: 5,
        title: "Value-Based Anchoring",
        category: "Sales",
        dialogue: [
            { speaker: "Client", text: "Your Brand OS seems expensive for a 2-month project." },
            { speaker: "You", text: "It's expensive for 8 weeks of work. It's an investment for 5 years of unmistakable presence and clear internal alignment. Are we solving for the next 2 months, or the next 5 years?" }
        ],
        overlay: "Charge for the solution, not the hours."
    },
    {
        id: 6,
        title: "The Revision Loop",
        category: "Feedback",
        dialogue: [
            { speaker: "Client", text: "Our team has 14 different opinions on the color palette. Can you show us 5 more options?" },
            { speaker: "You", text: "Too many options lead to decision fatigue. We presented Option A because it specifically targets the 'High-Res Logic' pillar we agreed on. Let's go back to that pillar. Which part of Option A isn't meeting that logic?" }
        ],
        overlay: "Consensus is a design killer. Revert to logic."
    },
    {
        id: 7,
        title: "The Ghosting Protocol",
        category: "Sales",
        dialogue: [
            { speaker: "Client", text: "..." },
            { speaker: "You", text: "It's been a week since we sent the proposal. I'm assuming the timing isn't right or priorities have shifted. I'll close this file for now. Feel free to re-open when you're ready to engage." }
        ],
        overlay: "Close the loop to reclaim your energy."
    },
    {
        id: 8,
        title: "The 'Simple' Change",
        category: "Project Management",
        dialogue: [
            { speaker: "Client", text: "This should be a simple change, right?" },
            { speaker: "You", text: "In design, 'simple' is often the result of complex logic. I'll evaluate how this change impacts the core system and get back to you with the updated timeline." }
        ],
        overlay: "Never agree to 'Simple' without an audit."
    },
    {
        id: 9,
        title: "The Portfolio Trap",
        category: "Sales",
        dialogue: [
            { speaker: "Client", text: "Have you worked in our specific niche (e.g., dog grooming software) before?" },
            { speaker: "You", text: "We specialize in the *process* of brand deconstruction, not the *niche*. An outside perspective often identifies the 'invisible' friction that industry insiders overlook." }
        ],
        overlay: "Process over Niche is where the value lives."
    },
    {
        id: 10,
        title: "Value Negotiation",
        category: "Pricing",
        dialogue: [
            { speaker: "Client", text: "Why is your hourly rate so high?" },
            { speaker: "You", text: "We don't sell hours; we sell outcomes. You're paying for the 10 years of experience that allows us to solve this problem in 10 hours instead of 100." }
        ],
        overlay: "The client pays for the solution, not the clock."
    }
];
export const WORKBOOKS: Workbook[] = [];
export const COURSE_MODULES: CourseModule[] = [];
export const PROCESS_STEPS = [
    { time: "Day 01", title: "Intake", desc: "We download your brain." },
    { time: "Week 01", title: "Strategy", desc: "We define the logic." },
    { time: "Week 04", title: "Execution", desc: "We build the engine." },
    { time: "Launch", title: "Handoff", desc: "You take the keys." }
];