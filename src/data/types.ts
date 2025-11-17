import { LucideIcon } from 'lucide-react';

// SEO Data Interface
export interface SEOData {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  tags?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

// Service Interfaces
export interface Service extends SEOData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  deposit: string;
  categoryId: string; // References Category.id
  imageUrl: string;
  benefits: string[];
  process: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
  bookingLink?: string; // Optional service-specific booking link
  sort_order?: number; // Per-category sorting
}

// Category Interfaces
export interface Category {
  id: string;
  name: string;
  icon: LucideIcon | string; // Can be component or string (string is converted to component on load)
  sort_order?: number; // Global sorting
}

// Testimonial Interfaces
export interface Testimonial extends SEOData {
  id: number;
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  sort_order?: number; // Global sorting
}


// FAQ Interfaces
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order?: number; // Per-category sorting within FAQ category
}

export interface FAQCategory extends SEOData {
  category: string;
  questions: FAQItem[];
  sort_order?: number; // Global sorting
}

// Portfolio Interfaces
export interface PortfolioCategory {
  id: string;
  name: string;
  sort_order?: number; // Global sorting
}

export interface Portfolio extends SEOData {
  id: number;
  categoryId: string; // References PortfolioCategory.id
  title: string;
  alt: string;
  imageUrl: string;
  sort_order?: number; // Per-category sorting
}

// Service Highlight Interface (for servicesOverview)
export interface ServiceHighlight {
  categoryId: string; // References Category.id
  title: string;
  description: string;
  icon: LucideIcon;
  sort_order?: number; // Global sorting
}

