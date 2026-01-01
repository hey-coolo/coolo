
export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  year: number;
  imageUrl: string;
  client?: string;
  featured?: boolean;
  challenge?: string;
  role?: string;
  outcome?: string;
  detailImages?: string[];
  story?: {
      goal: string; // The Mission / Call to Adventure
      gap: string;  // The Struggle / Process
      gamble: string; // The Solution / Climax
      gain: string; // The Result / New Normal
      processImages: string[]; // Raw sketches, wireframes, messy middle
  };
}

export type ProjectCategory = 'All' | 'Featured' | '3D Design' | 'Brand Identity' | 'Web Design' | 'Campaign' | 'Fashion' | 'Packaging' | 'Motion Design' | 'Digital Art';

export interface ServiceTier {
  title: string;
  price: string;
  description: string;
  cta?: string;
  link?: string;
  comingSoon?: boolean;
}

export interface FirepowerTier {
    slug: string;
    name: string;
    focus: string;
    desc: string;
    deliverables: string[];
    timeline: string;
    idealFor: string;
    price?: string; 
    faqs?: { q: string; a: string }[];
}

export interface ClarityTier {
    slug: string;
    name: string;
    price: string;
    subtitle: string;
    desc: string;
    features: string[];
    cta: string;
    timeline?: string;
    idealFor?: string;
    faqs?: { q: string; a: string }[];
}

export interface PartnershipModel {
    slug: string;
    title: string;
    description: string;
    priceLabel: string;
    details: string;
    idealFor: string;
    deliverables: string[];
    commitment: string;
}

export interface ServiceLeg {
  id: 'clarity' | 'firepower' | 'partner';
  title: string;
  subtitle: string;
  hoverText: string;
  visual: string;
  path: string;
  imageUrl: string;
}

export interface TeamMember {
    name: string;
    title: string;
    imageUrl: string;
    bio: string[];
    instagram?: string;
}

export interface JournalPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    imageUrl: string;
    content: string;
    tags?: string[];
    readTime?: string;
    author?: string;
}

export interface Drop {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    status: 'Live' | 'Coming Soon' | 'Sold Out';
    category: string;
    price: string;
    longDescription: string;
    features?: string[];
    galleryImages?: string[];
}

export interface ScriptDialogue {
  speaker: string;
  text: string;
}

export interface Script {
  id: number;
  title: string;
  category: string;
  dialogue: ScriptDialogue[];
  overlay: string;
}

export interface Resource {
    id: string;
    title: string;
    format: string;
    desc: string;
    link: string;
}

export interface Workbook {
    title: string;
    price: string;
    subtitle: string;
    description: string;
    format: string;
    vol: string;
    features: string[];
}

export interface CourseModule {
    mod: string;
    title: string;
    desc: string;
}
