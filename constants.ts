import { Project, TeamMember, JournalPost, ServiceLeg, ProjectCategory, Drop, DesignPowerTier, ClarityTier, Script, Resource, Workbook, CourseModule, PartnershipModel } from './types';

// --- TEAM ASSETS ---
import francoImg from './assets/team/franco.webp';
import arianaImg from './assets/team/Ariana.webp';

// --- PROJECT HERO ASSETS ---
import unmplynmtHero from './assets/cases/unmplymnt/Hero.webp';
import justBoxesHero from './assets/cases/just-boxes/Hero.webp';
import surfboardHero from './assets/cases/surfboard-v001/Hero.webp';
// These are placeholders/files not yet uploaded in the list, verify they exist locally:
import cartridgesHero from './assets/cases/the-cartridges/Hero.webp'; 
import jonheysHero from './assets/cases/jonheys-dumpling-house/Hero.webp'; 
import francaHero from './assets/cases/franca-austral/Hero.webp'; 
import travellerHero from './assets/cases/traveller-entrepreneur/Hero.webp'; 

// --- DETAIL & PROCESS IMAGE IMPORTS ---
// 1. UNMPLYNMT
import unmpDetail1 from './assets/cases/unmplymnt/detail-1.webp';
import unmpDetail2 from './assets/cases/unmplymnt/detail-2.webp';
import unmpDetail3 from './assets/cases/unmplymnt/detail-3.webp';
import unmpDetail4 from './assets/cases/unmplymnt/detail-4.webp';
import unmpDetail5 from './assets/cases/unmplymnt/detail-5.webp';
import unmpDetail6 from './assets/cases/unmplymnt/detail-6.webp';
import unmpDetail7 from './assets/cases/unmplymnt/detail-7.webp';
import unmpProcess1 from './assets/cases/unmplymnt/process-1.webp';
import unmpProcess2 from './assets/cases/unmplymnt/process-2.webp';
import unmpProcess3 from './assets/cases/unmplymnt/process-3.webp';
import unmpProcess5 from './assets/cases/unmplymnt/process-5.webp';

// 2. Just Boxes
import jbDetail1 from './assets/cases/just-boxes/detail-1.webp';
import jbDetail2 from './assets/cases/just-boxes/detail-2.webp';

// 3. Surfboard
import surfDetail1 from './assets/cases/surfboard-v001/detail-1.webp';
import surfDetail2 from './assets/cases/surfboard-v001/detail-2.webp';
import surfDetail3 from './assets/cases/surfboard-v001/detail-3.webp';
import surfDetail4 from './assets/cases/surfboard-v001/detail-4.webp';
import surfDetail5 from './assets/cases/surfboard-v001/detail-5.webp';
import surfProcess1 from './assets/cases/surfboard-v001/process-1.webp';
import surfProcess2 from './assets/cases/surfboard-v001/process-2.webp';


export const ASSETS = {
  team: {
    franco: francoImg,
    ariana: arianaImg
  },
  services: {
      // You can replace these with local imports later if you have them
      clarity: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", 
      designPower: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800",
      partnership: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
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
    imageUrl: unmplynmtHero, 
    featured: true,
    client: 'Internal Project',
    role: 'Strategy, logo & mark system, type system.',
    // HERE IS WHERE YOU ADD THEM:
    detailImages: [
        unmpDetail1, 
        unmpDetail2, 
        unmpDetail3, 
        unmpDetail4, 
        unmpDetail5,
        unmpDetail6,
        unmpDetail7
    ],
    story: {
        goal: "UNMPLYNMT began as a belief: that clothing can be more than fashion — it can be a banner for identity.",
        gap: "Most streetwear brands dress their ambition in borrowed codes. UNMPLYNMT wasn’t about nostalgia.",
        gamble: "We developed a visual voice that mirrors that attitude: Typographic Brutality.",
        gain: "Identity done right doesn’t whisper. It moves people.",
        // ADD PROCESS IMAGES HERE:
        processImages: [
            unmpProcess1,
            unmpProcess2,
            unmpProcess3,
            unmpProcess5
        ]
    }
  },
  {
    id: 2,
    title: 'Just Boxes',
    slug: 'just-boxes',
    description: 'Elevating the structural honesty of material packaging.',
    category: 'Packaging',
    tags: ['Packaging', 'Industrial', 'Minimalism'],
    year: 2024,
    imageUrl: justBoxesHero, 
    featured: true,
    client: 'Just Boxes',
    role: 'Creative Direction',
    detailImages: [
        jbDetail1,
        jbDetail2
    ],
    story: {
        goal: "Celebrate cardboard as a primary luxury material.",
        gap: "Sustainable packaging is often over-designed.",
        gamble: "No plastic coatings. We used structural folding.",
        gain: "A signature packaging system that is 100% recyclable.",
        processImages: [] 
    }
  },
  {
    id: 3,
    title: 'Surfboard v001',
    slug: 'surfboard-v001',
    description: 'Technical 3D exploration of hydro-dynamic resin surfacing.',
    category: '3D Design',
    tags: ['3D Viz', 'Technical', 'Surfacing'],
    year: 2022,
    imageUrl: surfboardHero,
    featured: true,
    client: 'Technical Study',
    role: '3D Artist',
    detailImages: [
        surfDetail1,
        surfDetail2,
        surfDetail3,
        surfDetail4,
        surfDetail5
    ],
    story: {
        goal: "Mimic the exact light refraction of hand-shaped surfboard resin.",
        gap: "Generic 3D surfboard renders lack the 'depth' of real glassing.",
        gamble: "A 2-week deep dive into a single material shader.",
        gain: "The creation of our 'Hydro-Logic' shader library.",
        processImages: [
            surfProcess1,
            surfProcess2
        ]
    }
  },
  {
    id: 4,
    title: 'The Cartridges',
    slug: 'the-cartridges',
    description: 'Hardware visualization focusing on modular industrial aesthetics.',
    category: '3D Design',
    tags: ['Industrial', 'Hardware', 'Lighting'],
    year: 2021,
    imageUrl: cartridgesHero,
    featured: false,
    client: 'Modular Labs',
    role: 'Visualization Lead',
    detailImages: [], // Leave empty until you upload these assets
    story: {
        goal: "Represent complex modularity through simple, high-res geometric lighting.",
        gap: "Technical products are often shown in flat lighting.",
        gamble: "Using pitch-black environments to force focus.",
        gain: "A set of high-converting visual assets.",
        processImages: []
    }
  },
  {
    id: 5,
    title: 'Jonhey’s Dumpling House',
    slug: 'jonheys-dumpling-house',
    description: 'High-energy hospitality branding with a contemporary street-food edge.',
    category: 'Brand Identity',
    tags: ['Hospitality', 'Kinetic Type', 'Logo'],
    year: 2023,
    imageUrl: jonheysHero,
    featured: true,
    client: 'Jonhey’s',
    role: 'Lead Designer',
    detailImages: [],
    story: {
        goal: "Break the 'red and gold' hospitality cliché.",
        gap: "Dumpling houses usually feel traditional.",
        gamble: "Using neon purple and heavy, distorted typography.",
        gain: "Immediate cult-status.",
        processImages: []
    }
  },
  {
    id: 6,
    title: 'Franca Austral',
    slug: 'franca-austral',
    description: 'Editorial-led identity design inspired by Southern landscapes.',
    category: 'Brand Identity',
    tags: ['Editorial', 'Strategy', 'Nature'],
    year: 2023,
    imageUrl: francaHero,
    featured: false,
    client: 'Franca Collective',
    role: 'Art Director',
    detailImages: [],
    story: {
        goal: "Capture the vast silence of southern landscapes.",
        gap: "Nature brands are often cluttered.",
        gamble: "A 60-page brand book with almost zero body copy.",
        gain: "A sophisticated, high-end presence.",
        processImages: []
    }
  },
  {
    id: 7,
    title: 'Traveller to Entrepreneur',
    slug: 'traveller-entrepreneur',
    description: 'Strategic repositioning for a high-performance global nomadic brand.',
    category: 'Strategy',
    tags: ['Positioning', 'Messaging', 'Narrative'],
    year: 2021,
    imageUrl: travellerHero,
    featured: true,
    client: 'Personal Brand',
    role: 'Lead Strategist',
    detailImages: [],
    story: {
        goal: "Pivot an audience from 'lifestyle travel' to 'business technicality'.",
        gap: "The travel content was too casual.",
        gamble: "Cutting 80% of existing content categories.",
        gain: "A 300% increase in inbound consulting leads.",
        processImages: []
    }
  }
];

// ... (KEEP THE REST OF THE FILE EXACTLY AS IT IS: TEAM_MEMBERS, NAV_LINKS, etc.)
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

// ... Rest of the file constants ...
export const NAV_LINKS = [
  { name: 'Studio', path: '/about' }, 
  { name: 'Clarity', path: '/clarity' },
  { name: 'Design Power', path: '/design-power' },
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
    title: 'I Need a Partner',
    subtitle: 'Technical Partnership',
    hoverText: 'Elite white-label unit for senior agencies.',
    visual: 'Scale Ops',
    path: '/partnership',
    imageUrl: ASSETS.services.partnership
  }
];

export const CLARITY_TIERS: ClarityTier[] = [
    { 
        slug: 'clarity-audit',
        name: 'Clarity Audit', 
        subtitle: 'The Diagnostic Phase',
        desc: "A surgical audit of your current brand positioning. We find the leaks in your narrative.", 
        cta: "Book Audit", 
        features: ["Narrative Audit", "Competitor Matrix", "Friction Report", "Immediate Fixes"],
        timeline: "1 Week",
        idealFor: "Founders sensing a plateau but unsure why."
    },
    { 
        slug: 'consulting',
        name: 'Consulting Sprint', 
        subtitle: 'The No Magic Formula™',
        desc: "2–4 week strategy sprint. We diagnose the friction and build the brand OS.", 
        cta: "Inquire Now", 
        features: ["Positioning One-Pager", "Audience Map", "Messaging Matrix", "90-Day Roadmap"],
        timeline: "4 Weeks",
        idealFor: "Funded Startups and Scale-ups needing alignment."
    },
    { 
        slug: 'brand-os',
        name: 'Brand OS', 
        subtitle: 'The Full Protocol',
        desc: "Comprehensive brand strategy and systems design. This is your company's operating manual.", 
        cta: "Secure OS", 
        features: ["Positioning Strategy", "Verbal Identity", "Brand Story Spine", "Campaign Pillars", "9-Month Roadmap"],
        timeline: "8 Weeks",
        idealFor: "Companies preparing for Series A/B or major pivots."
    },
    { 
        slug: 'fractional-strategy',
        name: 'Fractional Strategy', 
        subtitle: 'Senior Guidance',
        desc: "Ongoing strategic partnership. We join your executive team as the 'Strategic Brain'.", 
        cta: "Apply for Retainer", 
        features: ["Monthly Advisory", "Campaign Oversight", "Hiring Assistance", "Board Presentation Prep"],
        timeline: "Retainer",
        idealFor: "Established brands needing senior CD leadership."
    }
];

export const DESIGN_POWER_TIERS: DesignPowerTier[] = [
    {
        slug: "foundations",
        name: "Foundations",
        focus: "Visual Identity System",
        desc: "The core aesthetic engine. We build the visual rules that make your brand unmistakable.",
        deliverables: ["Primary & Secondary Logos", "Typography System", "Color Palette", "Basic Brand Guidelines"],
        timeline: "4-6 Weeks",
        idealFor: "Startups needing a professional baseline."
    },
    {
        slug: "flagship",
        name: "Flagship",
        focus: "Full Creative Method™",
        desc: "The complete studio experience. Identity, Custom Webflow build, and signature 3D visuals.",
        deliverables: ["Identity System", "High-End 3D Renders", "Custom Webflow Site", "Motion Guidelines"],
        timeline: "10-12 Weeks",
        idealFor: "Brands ready for market dominance."
    },
    {
        slug: "viz-plus-motion",
        name: "Viz + Motion",
        focus: "Technical Visualization",
        desc: "Surgical 3D visualization and kinetic typography for product-led brands.",
        deliverables: ["4K Product Renders", "Kinetic Type System", "Social Motion Templates", "3D Material Library"],
        timeline: "6-8 Weeks",
        idealFor: "CPG and Tech Hardware brands."
    },
    {
        slug: "retained-power",
        name: "Retained Power",
        focus: "Monthly Senior Unit",
        desc: "Ongoing high-output design partnership. No junior designers, just senior firepower on tap.",
        deliverables: ["Dedicated Design Sprints", "Ongoing Campaign Creative", "Web Maintenance", "Weekly Loom Syncs"],
        timeline: "Monthly",
        idealFor: "Growing companies needing a reliable design partner."
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
  'All', 'Featured', '3D Design', 'Brand Identity', 'Web Design', 'Strategy', 'Packaging'
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "script-01-micromanagement",
    title: "Script 01: The Trust Cycle",
    date: "2024.11.12",
    imageUrl: 'https://images.unsplash.com/photo-1542744095-2ad4870702d4?auto=format&fit=crop&q=80&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
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
        title: 'The Clarity Audit',
        format: 'PDF',
        desc: 'A 15-point checklist to identify narrative leaks in your current brand.',
        link: '#'
    },
    {
        id: '02',
        title: 'No Magic Questionnaire',
        format: 'Notion',
        desc: 'The exact intake form we use to deconstruct high-growth brands.',
        link: '#'
    },
    {
        id: '03',
        title: 'Positioning One-Pager',
        format: 'Template',
        desc: 'A minimalist template to define your core value prop on a single page.',
        link: '#'
    }
];

export const FAQ_DATA = [
  {
    category: 'The Unit',
    questions: [
      {
          q: 'What exactly is a "Senior Unit"?',
          a: "It's a high-output, low-overhead model. You work directly with the experts (Franco and Ariana). No account managers, no junior designers learning on your dime. Just senior design power delivered with surgical precision."
      },
      {
          q: 'Who am I actually working with?',
          a: "You work directly with Franco (Strategy & Design) and Ariana (Ops & Execution). We do not have juniors or interns. When you hire COOLO, you hire us."
      },
      {
          q: 'Where are you based?',
          a: "Mount Maunganui, New Zealand. We operate globally from a place that preserves our sanity and fuels our deep work. We are a remote-first studio that values clarity over geography."
      },
      {
          q: 'Do you work with agencies?',
          a: "Yes. We act as an elite white-label 'Design Power' unit for agencies that need to scale their creative output without adding full-time senior headcount."
      },
      {
          q: 'Are you a full-service agency?',
          a: "No. We are a specialized unit. We do Strategy, Identity, 3D, and Webflow. We don't do SEO, PPC, or social media management. We build the engine; you (or your marketing team) drive it."
      }
    ]
  },
  {
    category: 'Economics & Value',
    questions: [
      { 
          q: 'Why is the investment higher than a freelancer?', 
          a: "A freelancer executes tasks. We execute outcomes. You're paying for the strategic seniority that prevents costly re-designs and narrative pivots in 6 months. We build systems, not just assets." 
      },
      {
          q: 'Do you offer fixed pricing?',
          a: "Our core tiers (Clarity Audit, Brand OS, Flagship) have base starting points, but every project is quoted bespoke based on the complexity of your problem. We don't believe in one-size-fits-all pricing for high-end strategy."
      },
      {
          q: 'What is your typical project lead time?',
          a: "Most strategic audits take 1-2 weeks. Full Brand OS builds take 8 weeks. Website and 3D flagship builds are typically 10-12 weeks. Quality requires a certain velocity of logic."
      },
      {
          q: 'Do you offer payment plans?',
          a: "For our larger builds, we typically structure payments in 2-3 milestones. We are a business partner, and we want the terms to reflect a mutual commitment to excellence."
      },
      {
          q: 'Can I pay for just a logo?',
          a: "Generally, no. A logo without a strategy is just decoration. We only take on identity projects that include at least a foundational strategy phase to ensure the visuals actually work for your business."
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
