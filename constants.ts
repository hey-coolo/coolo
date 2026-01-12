import { Project, TeamMember, JournalPost, ServiceLeg, ProjectCategory, Drop, DesignPowerTier, ClarityTier, Script, Resource, Workbook, CourseModule, PartnershipModel } from './types';

// --- ASSETS ---
// These paths now point to your new public/assets folder automatically.

export const ASSETS = {
  team: {
    franco: './assets/team/Franco.webp',
    ariana: './assets/team/Ariana.webp'
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
    description: 'A Brand Built Like Culture, Not a Logo. Brutalist identity system exploring the friction of labor and identity.',
    category: 'Brand Identity', 
    tags: ['Brutalism', 'Typography', 'Strategy'],
    year: 2025,
    imageUrl: './assets/cases/unmplymnt/Hero.webp', 
    featured: true,
    client: 'Internal Project',
    role: 'Strategy, logo & mark system, type system.',
    detailImages: [
        './assets/cases/unmplymnt/detail-1.webp', 
        './assets/cases/unmplymnt/detail-2.webp', 
        './assets/cases/unmplymnt/detail-3.webp', 
        './assets/cases/unmplymnt/detail-4.webp', 
        './assets/cases/unmplymnt/detail-5.webp',
        './assets/cases/unmplymnt/detail-6.webp',
        './assets/cases/unmplymnt/detail-7.webp'
    ],
    story: {
        goal: "UNMPLYNMT began as a belief: that clothing can be more than fashion — it can be a banner for identity.",
        gap: "Most streetwear brands dress their ambition in borrowed codes. UNMPLYNMT was not about nostalgia.",
        gamble: "We developed a visual voice that mirrors that attitude: Typographic Brutality.",
        gain: "Identity done right does not whisper. It moves people.",
        processImages: [
            './assets/cases/unmplymnt/process-1.webp',
            './assets/cases/unmplymnt/process-2.webp',
            './assets/cases/unmplymnt/process-3.webp',
            './assets/cases/unmplymnt/process-5.webp'
        ]
    }
  },
  {
    id: 8,
    title: 'Just Boxes',
    slug: 'just-boxes',
    description: 'Elevating the structural honesty of material packaging.',
    category: 'Packaging',
    tags: ['Packaging', 'Industrial', 'Minimalism'],
    year: 2025,
    imageUrl: './assets/cases/just-boxes/Hero.webp', 
    featured: true,
    client: 'Just Boxes',
    role: 'Creative Direction',
    detailImages: [
        './assets/cases/just-boxes/detail-1.webp',
        './assets/cases/just-boxes/detail-2.webp'
    ],
    story: {
        goal: "Celebrate cardboard as a primary luxury material.",
        gap: "Sustainable packaging is often over-designed.",
        gamble: "No plastic coatings. We used structural folding.",
        gain: "A signature packaging system that is 100% recyclable.",
        processImages: [
            '/assets/cases/just-boxes/detail-1.webp',
            '/assets/cases/just-boxes/detail-2.webp'
        ]
    }
  },    
  {
    id: 2,
    title: 'Surfboard v001',
    slug: 'surfboard-v001',
    description: 'Technical 3D exploration of hydro-dynamic resin surfacing.',
    category: '3D Design',
    tags: ['3D Viz', 'Technical', 'Surfacing'],
    year: 2023,
    imageUrl: './assets/cases/surfboard-v001/Hero.webp',
    featured: true,
    client: 'Concept Art Test',
    role: '3D Artist',
    detailImages: [
        './assets/cases/surfboard-v001/detail-1.webp',
        './assets/cases/surfboard-v001/detail-2.webp',
        './assets/cases/surfboard-v001/detail-3.webp',
        './assets/cases/surfboard-v001/detail-4.webp',
        './assets/cases/surfboard-v001/detail-5.webp'
    ],
    story: {
        goal: "Mimic the exact light refraction of hand-shaped surfboard resin.",
        gap: "Generic 3D surfboard renders lack the 'depth' of real glassing.",
        gamble: "A 2-week deep dive into a single material shader.",
        gain: "The creation of our 'Hydro-Logic' shader library.",
        processImages: [
            './assets/cases/surfboard-v001/process-1.webp',
            './assets/cases/surfboard-v001/process-2.webp'
        ]
    }
  },
  {
    id: 4,
    title: 'The Cartridges',
    slug: 'the-cartridges',
    description: 'Vintage classic snes cartridges. The cartridges popular in the late 80s and early 90s include games using 8-bits, low-resolution pixel matrix screens. Games like super mario, contra ii, mortal kombat, donkey kong, and more.',
    category: '3D Design',
    tags: ['Industrial', 'Hardware', 'Lighting',],
    year: 2021,
    imageUrl: './assets/cases/the-cartridges/Hero.webp',
    featured: false,
    client: 'Concept Art Test',
    role: '3D Artist',
    detailImages: [ 
        './assets/cases/the-cartridges/detail-1.webp', 
        './assets/cases/the-cartridges/detail-2.webp', 
        './assets/cases/the-cartridges/detail-3.webp', 
        './assets/cases/the-cartridges/detail-4.webp'],

        story: {
        goal: "Represent complex modularity through simple, high-res geometric lighting.",
        gap: "Technical products are often shown in flat lighting.",
        gamble: "Using pitch-black environments to force focus.",
        gain: "A set of high-converting visual assets.",
        processImages: [
        './assets/cases/the-cartridges/process-1.webp', 
        './assets/cases/the-cartridges/process-2.webp', 
        './assets/cases/the-cartridges/process-3.webp']
    }
  },
  {
    id: 7,
    title: 'Johney’s Dumpling House',
    slug: 'johneys-dumpling-house',
    description: 'High-energy hospitality branding with a contemporary street-food edge.',
    category: 'Photography',
    tags: ['Hospitality', 'Photography', 'Food Photography'],
    year: 2020,
    imageUrl: './assets/cases/johneys-dumpling-house/Hero.webp',
    featured: true,
    client: 'Jonhey’s Dumpling House',
    role: 'Food Photography',
    detailImages: [
        './assets/cases/johneys-dumpling-house/detail-1.webp',
        './assets/cases/johneys-dumpling-house/detail-2.webp',
        './assets/cases/johneys-dumpling-house/detail-3.webp'
    ],
    story: {
        goal: "Showcase the exquisite craftsmanship of Johney's delectable dumplings but also serve as the visual centerpiece for their festival food stall menus.",
        gap: "Typical dumpling photography can feel flat and generic — not capturing the personality and handmade soul behind the food.",
        gamble: "Injecting energy into the visuals with playful compositions and vibrant lighting that reflect the brand’s street-food spirit.",
        gain: "A library of images that turned menus into memorable brand touchpoints and helped position Johney’s as a standout in busy festival environments.",
        processImages: [
            './assets/cases/johneys-dumpling-house/process-1.webp',
            './assets/cases/johneys-dumpling-house/process-2.webp',
            './assets/cases/johneys-dumpling-house/process-3.webp'
        ]
    }
  },
  {
    id: 6,
    title: 'Franca Austral',
    slug: 'franca-austral',
    description: 'Editorial-led identity design inspired by Southern landscapes.',
    category: 'Brand Identity',
    tags: ['Editorial', 'Strategy', 'Nature'],
    year: 2018,
    imageUrl: './assets/cases/franca-austral/Hero.webp',
    featured: false,
    client: 'Franca Austral Cerveceria',
    role: 'Creative Designer',
    detailImages: [
        './assets/cases/franca-austral/detail-1.webp',
        './assets/cases/franca-austral/detail-2.webp',
        './assets/cases/franca-austral/detail-3.webp',
        './assets/cases/franca-austral/detail-4.webp'

    ],
    story: {
        goal: "Capture the essence of Patagonia coastal landscapes for a craft beer company.",
        gap: "The new brand identity perfectly captures franca austral's essence - their passion for handcrafted beer, love for whales, and coastal location.",
        gamble: "A 60-page brand book with almost zero body copy.",
        gain: "The brand well positioned among customers who enjoy and appreciate natural, quality beer without additives.",
        processImages: [
            './assets/cases/franca-austral/process-1.webp',
            './assets/cases/franca-austral/process-2.webp',
            './assets/cases/franca-austral/process-3.webp',
            './assets/cases/franca-austral/process-4.webp'
            ]
    }
  },
 
{
    id: 5,
    title: 'Pablo Creative',
    slug: 'pablo-creative',
    description: 'Multidisciplinary design studio partnership. Covering photography, graphic design, web, and motion.',
    category: 'Partnership',
    tags: ['Studio', 'Motion', 'Photography', 'Graphic Design'],
    year: 2022,
    imageUrl: '/assets/cases/pablo-creative/Hero.webp', 
    featured: false,
    client: 'Pablo Creative',
    role: 'Design & Motion Lead',
    detailImages: [
        '/assets/cases/pablo-creative/detail-1.webp',
        '/assets/cases/pablo-creative/detail-2.webp',
        '/assets/cases/pablo-creative/detail-3.webp',
        '/assets/cases/pablo-creative/detail-4.webp',
        '/assets/cases/pablo-creative/detail-5.webp',
        '/assets/cases/pablo-creative/detail-6.webp',
        '/assets/cases/pablo-creative/detail-7.webp'
    ],
    story: {
        goal: "Combined innovation with style, to ensure creative work and service met the needs and expectations of clients by collaborating side by side with the owner and Creative Director, Ben.",
        gap: "", // Empty to trigger Gallery Mode
        gamble: "Branding, marketing, vector illustration, photography, videography, web design,motion graphics, gfx, and more.", 
        gain: "A delightful experience collaborating with Ben from Pablo Creative. Ben's keen insight set the tone for our work together.",
        processImages: [
            '/assets/cases/pablo-creative/process-1.webp',
            '/assets/cases/pablo-creative/process-2.webp',
            '/assets/cases/pablo-creative/process-3.webp',
            '/assets/cases/pablo-creative/process-4.webp',
            '/assets/cases/pablo-creative/process-5.webp',
            '/assets/cases/pablo-creative/process-6.webp',
            '/assets/cases/pablo-creative/process-7.webp'
        ] 
    }
  },
  {
    id: 3,
    title: 'Ntegrity',
    slug: 'ntegrity',
    description: 'Operational design support for Australia’s leading non-profit marketing agency.',
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
        '/assets/cases/ntegrity/detail-5.gif'
    ],
    story: {
        goal: "Collaborated seamlessly with the Ntegrity team, to bring creative visions to life.",
        gap: "", // Empty to trigger Gallery Mode
        gamble: "Multidisciplinary role as a Mid-Weight Designer at ntegrity.",
        gain: "Digital design, display ads, social media paid ads, email design, web design, brand guidelines.",
        processImages: [
            '/assets/cases/ntegrity/process-1.webp',
            '/assets/cases/ntegrity/process-2.webp',
            '/assets/cases/ntegrity/process-3.webp',
            '/assets/cases/ntegrity/process-4.gif',
            '/assets/cases/ntegrity/process-5.png'
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
      "The Brains. Franco specializes in Strategy, Art Direction, and 3D Vision.",
      "His 'No Magic Formula' approach strips away the fluff to reveal the raw narrative of a brand.",
      "With over a decade in high-end design, he leads the creative soul of COOLO from Mount Maunganui."
    ],
  },
  ariana: {
    name: 'Ariana',
    title: 'Operations Manager',
    imageUrl: ASSETS.team.ariana, 
    instagram: 'ariarmndo',
    bio: [
      "The Engine. Ariana manages execution, logistics, and client sanity.",
      "She ensures the vision is grounded in reality and delivered with surgical precision.",
      "The backbone of COOLO's efficiency."
    ],
  }
};

export const NAV_LINKS = [
  { 
    name: 'Studio', 
    path: '/about',
    subLinks: [
      { name: 'The Unit', path: '/team' },
      { name: 'Playbook', path: '/playbook' },
      { name: 'Join Us', path: '/join' },
      { name: 'Drops', path: '/drops' }
    ]
  }, 
  { 
    name: 'Clarity', 
    path: '/clarity',
    subLinks: [
      { name: 'Free Resources', path: '/clarity/free-resources' },
      // { name: 'Workbook', path: '/clarity/workbook' }, // HIDDEN: No content yet
      // { name: 'Course', path: '/clarity/course' }      // HIDDEN: No content yet
    ]
  },
  { 
    name: 'Design Power', 
    path: '/design-power',
    subLinks: [
      { name: 'The Basics', path: '/design-power/the-basics' },
      { name: 'The Campaign', path: '/design-power/the-campaign' },
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
  { name: 'FAQ', path: '/faq' },
];

export const SERVICE_LEGS: ServiceLeg[] = [
  {
    id: 'brand-clarity',
    title: 'I Need Brand Clarity',
    subtitle: 'The No Magic Formula™',
    hoverText: 'Strategic deconstruction for high-growth brands.',
    visual: 'Minimalist Strategy',
    path: '/clarity',
    imageUrl: ASSETS.services.clarity
  },
  {
    id: 'design-power',
    title: 'I Need Design Power',
    subtitle: 'The Creative Method™',
    hoverText: 'Identity, 3D, and Webflow builds.',
    visual: 'High-End Execution',
    path: '/design-power',
    imageUrl: ASSETS.services.designPower
  },
  {
    id: 'partner',
    title: 'I Need a Creative Partner',
    subtitle: 'Technical Partnership',
    hoverText: 'Elite white-label unit for senior agencies.',
    visual: 'Scale Ops',
    path: '/partnership',
    imageUrl: ASSETS.services.partnership
  }
];

export const BRAND_CLARITY_TIERS: ClarityTier[] = [
    { 
        slug: 'the-reality-check',
        name: 'The Brand Reality Check', 
        subtitle: 'Free Brand Diagnostic',
        desc: "Is your brand confusing? Your customers probably think so. Use these free tools to check your pulse before you spend a dime.", 
        cta: "Download Free Tools", 
        features: ["5-Minute Brand Audit", "The 'Hard Questions' Form", "Positioning Template", "Immediate Feedback"],
        timeline: "Instant (Self-Paced)",
        idealFor: "Founders who think they might have a branding problem."
    },
    { 
        slug: 'brand-garage-guide',
        name: 'The Brand Garage Guide', 
        subtitle: 'The DIY Kit ($99)',
        desc: "You aren't ready to hire us yet? Cool. Stop guessing and use our guide to define your story yourself. Simple English, no fluff.", 
        cta: "Get the Guide", 
        features: ["7-Day Step-by-Step Plan", "Audience Definition Tools", "Brand Voice Cheatsheet", "No Video Fluff"],
        timeline: "1 Week (Self-Paced)",
        idealFor: "DIY Founders ready to move out of 'Garage Mode'."
    },
    { 
        slug: 'strategy-sessions',
        name: 'The Strategy Sessions', 
        subtitle: 'No Magic Formula™',
        desc: "We sit down. We talk. We fix the confusion. Two sessions to find your truth and write the Playbook that guides your business.", 
        cta: "Book a Chat", 
        features: ["2x Strategy Calls", "The Brand Playbook (PDF)", "The One-Page Cheat Sheet", "Jargon-Free Messaging"],
        timeline: "2–4 Weeks",
        idealFor: "Business owners tired of generic marketing."
    },
    { 
        slug: 'creative-partner',
        name: 'The Creative Partner',
        subtitle: 'Senior Guidance / Ongoing Support',
        desc: "Ongoing strategic partnership. We join your executive team as the 'Strategic Brain'.", 
        cta: "Work With Us", 
        features: ["Visual Identity Design", "Website & Content Direction", "Monthly Creative Support", "Quality Control"],
        timeline: "Ongoing",
        idealFor: "Brands that want to look professional, 24/7."
    }
];

export const DESIGN_POWER_TIERS: DesignPowerTier[] = [
    {
        slug: "the-basics",
        name: "The Basics",
        focus: "Identity Only",
        desc: "You have a business, but you look like a hobby. We fix that. A sharp, professional logo and color system that makes you look expensive.",
        cta: "Get the Look",
        deliverables: ["Primary & Secondary Logos", "Color Palette & Type System", "The 'Rulebook' (Mini Guide)", "Social Media Avatars"],
        timeline: "2–3 Weeks",
        idealFor: "New founders who are embarrassed to hand out their business card."
    },
    {
        slug: "the-campaign",
        name: "The Campaign",
        focus: "Identity + Story",
        desc: "A logo isn't enough. You need to say something. We build your identity AND the ads, content, and concepts you need to actually launch.",
        cta: "Start Speaking",
        deliverables: ["Everything in 'The Face Lift'", "Campaign Concepts", "Ad Mockups & key Art", "Copywriting Headlines"],
        timeline: "4–5 Weeks",
        idealFor: "Brands ready to launch a product or run ads."
    },
    {
        slug: "the-website",
        name: "The Website",
        focus: "Identity + Website",
        desc: "Your only real estate. We build custom sites that move, breathe, and actually convert visitors into customers. No templates.",
        cta: "Build the HQ",
        deliverables: ["Everything in 'The Face Lift'", "Custom Webflow Website", "Mobile Optimized", "CMS Training (You own it)"],
        timeline: "6–8 Weeks",
        idealFor: "Scale-ups who have outgrown their DIY Squarespace site."
    },
    {
        slug: "the-full-flex",
        name: "The Full Flex",
        focus: "The Creative Method™",
        desc: "The nuclear option. We build and rebuild everything. Identity, Website, Product Visuals, and Content Direction. The complete transformation.",
        cta: "Go All In",
        deliverables: ["Full Identity System", "Webflow Website", "3D Product Renders", "Motion & Animation"],
        timeline: "10–12 Weeks",
        idealFor: "Established players ready to dominate the niche."
    }
];

export const PARTNERSHIP_MODELS: PartnershipModel[] = [
    {
        slug: 'scale',
        title: 'Scale Partnership',
        description: 'Elite white-label unit for senior agencies.',
        priceLabel: 'Flat Fee',
        details: "We plug into your agency process as the 'Design Power' unit. You handle account management; we handle the craft.",
        idealFor: "Agencies needing high-end 3D and Webflow expertise.",
        deliverables: ["3D Visuals", "UI/UX Design", "Webflow Dev"],
        commitment: "Project-based"
    },
    {
        slug: 'fractional-cd',
        title: 'Fractional CD',
        description: 'Executive creative leadership for in-house teams.',
        priceLabel: 'Monthly',
        details: "We act as your Creative Director, managing your internal team and external vendors to ensure zero visual drift.",
        idealFor: "Scale-ups with junior designers needing senior direction.",
        deliverables: ["Creative Direction", "Review Protocols", "Hiring Specs"],
        commitment: "3 Months Min."
    },
    {
        slug: 'project-spike',
        title: 'Project Spike',
        description: 'Short-term high-intensity creative sprints.',
        priceLabel: 'Project-based',
        details: "A surgical creative strike. We solve one specific complex problem in a high-speed sprint.",
        idealFor: "Brands needing a specific high-impact campaign or launch site.",
        deliverables: ["Sprinted Asset Pack", "Technical Build"],
        commitment: "2-4 Weeks"
    },
    {
        slug: 'equity',
        title: 'Venture Unit',
        description: 'High-risk, high-reward strategic partnership.',
        priceLabel: 'Equity + Fee',
        details: "We invest our design power into early-stage ventures with massive technical or market potential.",
        idealFor: "Pre-seed/Seed founders with world-class products and zero design.",
        deliverables: ["Full Brand Launch", "Product Design", "Pitch Deck V1"],
        commitment: "Long-term"
    }
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All', 'Featured', '3D Design', 'Brand Identity', 'Web Design', 'Strategy', 'Packaging', 'Partnership'
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "script-01-micromanagement",
    title: "The Trust Cycle",
    date: "2024.11.12",
    imageUrl: './assets/journal/script-01.webp',
    excerpt: "Why micromanagement is actually a symptom of a failed strategy phase.",
    tags: ["Process", "Clients", "Intel"],
    readTime: "4 min read",
    author: "Franco",
    content: "Micromanagement happens when trust is broken or never built. We build trust through a rigid strategy process that makes subjective arguments impossible."
  },
  {
    slug: "3d-as-strategic-asset",
    title: "3D as a Strategic Asset",
    date: "2024.10.05",
    imageUrl: './assets/journal/script-02.webp',
    excerpt: "Moving 3D from 'cool render' to 'conversion tool'.",
    tags: ["3D", "E-commerce", "Strategy"],
    readTime: "6 min read",
    author: "Franco",
    content: "3D visualization isn't just about eye candy. For product-led brands, it's about control. Lighting, materials, and angles that are impossible in physical shoots become repeatable, modular assets."
  },
  {
    slug: "no-magic-formula-logic",
    title: "The Logic of No Magic",
    date: "2024.09.20",
    imageUrl: './assets/journal/script-03.webp',
    excerpt: "Why we killed the 'Creative Guru' trope to save our clients' money.",
    tags: ["Business", "Operations", "Fluff"],
    readTime: "5 min read",
    author: "Franco",
    content: "The 'Creative Guru' model is dangerous. It relies on inspiration, which is fickle. We rely on logic, which is defensible. If your strategy can't survive a stress test of 'Why?', it's just decoration."
  }
];

export const FREE_RESOURCES: Resource[] = [
    { 
        id: '01', 
        title: '5-Minute Brand Reality Check', 
        format: 'PDF', 
        desc: 'Does your brand look like a bad mixtape? If your vibe is all over the place, start here.', 
        link: './docs/audit.pdf' 
    },
    { 
        id: '02', 
        title: 'The No Magic Questionnaire', 
        format: 'PDF', 
        desc: 'The exact questions we ask when the meter is running. Steal our process and diagnose yourself.', 
        link: './docs/questionnaire.pdf' 
    },
    { 
        id: '03', 
        title: 'The Cheat Sheet', 
        format: 'PDF', 
        desc: 'A one-page template. If you can’t explain your business here, you are trying too hard.', 
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
          q: 'Why the 90s aesthetic?',
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