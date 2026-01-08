import { Project, TeamMember, JournalPost, ServiceLeg, ProjectCategory, Drop, FirepowerTier, ClarityTier, Script, Resource, Workbook, CourseModule, PartnershipModel } from './types';

// ==========================================
// ASSET REGISTRY
// ==========================================
// INSTRUCTIONS:
// 1. Upload your real images to the 'assets/images' folder in GitHub.
// 2. Update these paths below to match your real filenames.
// ==========================================

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200';

export const ASSETS = {
  hero: {
    viz: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', 
    ooh: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
  },
  services: {
    clarity: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=1200',
    firepower: 'https://images.unsplash.com/photo-1516937941348-c09e554b9631?auto=format&fit=crop&q=80&w=1200',
    partnership: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&q=80&w=1200'
  },
  team: {
    franco: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    ariana: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'The Blueprint Zero',
    slug: 'blueprint-zero',
    description: 'A 3D vision for high-end digital identity.',
    category: '3D Design',
    tags: ['3D Design', 'Strategy', 'Creative Direction'],
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    client: 'Internal Initiative',
    challenge: 'Define brand depth using digital materials that evoke a visceral reaction.',
    role: 'Art Direction, 3D Execution',
    outcome: 'A viral visual system that established COOLO\'s technical baseline.',
    story: {
        goal: "Create a visual language that felt like a bridge between physical architecture and digital speed.",
        gap: "Most 3D renders felt floaty or synthetic. We needed 'mass'.",
        gamble: "We ignored standard lighting setups, relying entirely on self-emissive geometry to carve out form.",
        gain: "A signature self-illuminated aesthetic that differentiates our brand from standard flat-design agencies.",
        processImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG]
    }
  },
  {
    id: 2,
    title: 'Senior Unit Sprint',
    slug: 'senior-unit-sprint',
    description: 'The strategy behind the Senior-Only model.',
    category: 'Brand Identity',
    tags: ['Positioning', 'Messaging', 'Operations'],
    year: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    featured: true,
    client: 'COOLO Studio',
    challenge: 'Communicate high-end strategy without the agency fluff.',
    story: {
        goal: "Replace the 15-person agency team with 2 specialized senior operators.",
        gap: "Standard agency hand-offs lead to 40% loss in clarity during execution.",
        gamble: "Removing account managers entirely. Clients only talk to the people doing the work.",
        gain: "300% faster delivery cycles and zero strategic drift.",
        processImages: [PLACEHOLDER_IMG, PLACEHOLDER_IMG]
    }
  }
];

export const NAV_LINKS = [
  { name: 'Studio', path: '/about' }, 
  { name: 'Clarity', path: '/clarity' },
  { name: 'Firepower', path: '/firepower' },
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
    id: 'firepower',
    title: 'I Need Firepower',
    subtitle: 'The Creative Method™',
    hoverText: 'Identity, 3D, and Webflow builds.',
    visual: 'High-End Execution',
    path: '/firepower',
    imageUrl: ASSETS.services.firepower
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
        slug: 'consulting',
        name: 'Consulting Sprint', 
        price: '$4,000', 
        subtitle: 'The No Magic Formula™',
        desc: "2–4 week strategy sprint. We diagnose the friction and build the brand OS.", 
        cta: "Inquire Now", 
        features: ["Positioning One-Pager", "Audience Map", "Messaging Matrix", "90-Day Roadmap"],
        timeline: "4 Weeks",
        idealFor: "Funded Startups and Scale-ups."
    }
];

export const FIREPOWER_TIERS: FirepowerTier[] = [
    {
        slug: "flagship",
        name: "Flagship",
        focus: "Full Creative Method™",
        desc: "Complete visual identity, 3D product visuals, and a custom Webflow build.",
        deliverables: ["Identity System", "3D Renders", "Campaign Logic", "Webflow Site"],
        timeline: "10 Weeks",
        idealFor: "Brands needing market dominance visuals."
    }
];

export const PARTNERSHIP_MODELS: PartnershipModel[] = [
    {
        slug: 'scale',
        title: 'Scale Partnership',
        description: 'Elite white-label unit for senior agencies.',
        priceLabel: 'Flat Fee',
        details: "We plug into your agency process as the 'Design Firepower' unit. You handle account management; we handle the craft.",
        idealFor: "Agencies needing high-end 3D and Webflow expertise.",
        deliverables: ["3D Visuals", "UI/UX Design", "Webflow Dev"],
        commitment: "Project-based"
    }
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All', 'Featured', '3D Design', 'Brand Identity', 'Web Design', 'Strategy'
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

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "script-01-micromanagement",
    title: "Script 01: The Trust Cycle",
    date: "2024.11.12",
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    excerpt: "Why micromanagement is actually a symptom of a failed strategy phase.",
    tags: ["Process", "Clients", "Intel"],
    readTime: "4 min read",
    author: "Franco",
    content: "Micromanagement happens when trust is broken or never built. We build trust through a rigid strategy process that makes subjective arguments impossible."
  }
];

export const PROCESS_STEPS = [
    { title: 'The Deep Dive', desc: 'Pre-work questionnaire to extract raw materials.', time: 'Phase 01' },
    { title: 'Strategy Intensive', desc: '4-Hour collaborative workshop.', time: 'Phase 02' },
    { title: 'Synthesis', desc: 'We craft the brand playbook.', time: 'Phase 03' },
    { title: 'The Reveal', desc: 'Handoff of the Brand OS.', time: 'Phase 04' }
];

export const FAQ_DATA = [
  {
    category: 'Economics',
    questions: [
      { 
          q: 'Why is the investment higher than a freelancer?', 
          a: "A freelancer executes tasks. We execute outcomes. You're paying for the strategic seniority that prevents costly re-designs in 6 months." 
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
    }
];
export const FREE_RESOURCES: Resource[] = [];
export const WORKBOOKS: Workbook[] = [];
export const COURSE_MODULES: CourseModule[] = [];
