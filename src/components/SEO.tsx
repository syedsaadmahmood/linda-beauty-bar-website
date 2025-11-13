import { useSEO } from '../hooks/useSEO';
import type { SEOData } from '../data/types';

interface SEOProps extends SEOData {
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
}

export function SEO(props: SEOProps) {
  useSEO(props);
  return null; // This component doesn't render anything
}

