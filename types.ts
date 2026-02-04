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
  role?: string;
  detailImages?: string[];
  story?: {
      gain: string;
      processImages: string[];
  };
}

export type ProjectCategory = 'All' | 'Featured' | '3D Design' | 'Brand Identity' | 'Web Design' | 'Campaign' | 'Fashion' | 'Packaging' | 'Motion Design' | 'Digital Art' | 'Strategy' | 'Partnership' | 'Photography';

export interface AuditResult {
  totalScore: number;
  verdict: string;
  pillars: { pillar: string; name: string; score: number; critique: string }[];
  hardQuestions: string[];
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

export interface ClarityTier {
    slug: string;
    name: string;
    subtitle: string;
    desc: string;
    features: string[];
    cta: string;
    timeline?: string;
    idealFor?: string;
    faqs?: { q: string; a: string }[];
}

export interface DesignPowerTier {
    slug: string;
    name: string;
    focus: string;
    desc: string;
    cta: string;
    deliverables: string[];
    timeline: string;
    idealFor: string;
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
  id: 'brand-clarity' | 'design-power' | 'partner';
  title: string;
  subtitle: string;
  hoverText: string;
  visual: string;
  path: string;
  imageUrl: string;
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

export interface Drop {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    status: 'Live' | 'Coming Soon' | 'Sold Out';
}