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
}

// Category Interfaces
export interface Category {
  id: string;
  name: string;
  icon: LucideIcon | string; // Can be component or string (string is converted to component on load)
}

// Testimonial Interfaces
export interface Testimonial extends SEOData {
  id: number;
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
}


// FAQ Interfaces
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQCategory extends SEOData {
  category: string;
  questions: FAQItem[];
}

// Portfolio Interfaces
export interface PortfolioCategory {
  id: string;
  name: string;
}

export interface Portfolio extends SEOData {
  id: number;
  categoryId: string; // References PortfolioCategory.id
  title: string;
  alt: string;
  imageUrl: string;
}

// Service Highlight Interface (for servicesOverview)
export interface ServiceHighlight {
  categoryId: string; // References Category.id
  title: string;
  description: string;
  icon: LucideIcon;
}

