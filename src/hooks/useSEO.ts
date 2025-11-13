import { useEffect } from 'react';
import type { SEOData } from '../data/types';

interface SEOProps extends SEOData {
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImage?: string;
}

export function useSEO(seoData: SEOProps) {
  useEffect(() => {
    const metaTitle = seoData.metaTitle || seoData.defaultTitle || "Linda's Beauty Bar";
    const metaDescription = seoData.metaDescription || seoData.defaultDescription || "Professional permanent makeup services";
    const metaKeywords = seoData.metaKeywords || '';
    const ogTitle = seoData.ogTitle || metaTitle;
    const ogDescription = seoData.ogDescription || metaDescription;
    const ogImage = seoData.ogImage || seoData.defaultImage || '';

    // Update or create title
    document.title = metaTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update meta description
    updateMetaTag('description', metaDescription);

    // Update meta keywords
    if (metaKeywords) {
      updateMetaTag('keywords', metaKeywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', ogTitle, 'property');
    updateMetaTag('og:description', ogDescription, 'property');
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property');
    }
    updateMetaTag('og:type', 'website', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }

    // Cleanup function
    return () => {
      // Optionally reset to defaults on unmount
    };
  }, [seoData]);
}

