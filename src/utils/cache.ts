/**
 * Cache utility for storing Supabase data with TTL (Time To Live)
 */

const CACHE_PREFIX = 'sb_cache_';
const CACHE_TTL_PREFIX = 'sb_cache_ttl_';
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
}

export function setCache(key: string, data: any, options: CacheOptions = {}): void {
  const ttl = options.ttl || DEFAULT_TTL;
  const expiresAt = Date.now() + ttl;
  
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
    localStorage.setItem(`${CACHE_TTL_PREFIX}${key}`, expiresAt.toString());
  } catch (error) {
    console.error('Error setting cache:', error);
    // If storage is full, clear old cache entries
    clearExpiredCache();
  }
}

export function getCache<T>(key: string): T | null {
  try {
    const cachedData = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    const expiresAt = localStorage.getItem(`${CACHE_TTL_PREFIX}${key}`);
    
    if (!cachedData || !expiresAt) {
      return null;
    }
    
    const expiresAtNum = parseInt(expiresAt, 10);
    
    if (Date.now() > expiresAtNum) {
      // Cache expired, remove it
      removeCache(key);
      return null;
    }
    
    return JSON.parse(cachedData) as T;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
}

export function removeCache(key: string): void {
  localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  localStorage.removeItem(`${CACHE_TTL_PREFIX}${key}`);
}

export function clearExpiredCache(): void {
  const keys = Object.keys(localStorage);
  const now = Date.now();
  
  keys.forEach(key => {
    if (key.startsWith(CACHE_TTL_PREFIX)) {
      const expiresAt = parseInt(localStorage.getItem(key) || '0', 10);
      if (now > expiresAt) {
        const cacheKey = key.replace(CACHE_TTL_PREFIX, '');
        removeCache(cacheKey);
      }
    }
  });
}

export function clearAllCache(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith(CACHE_PREFIX) || key.startsWith(CACHE_TTL_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

// Cache keys
export const CACHE_KEYS = {
  services: 'services',
  testimonials: 'testimonials',
  faq: 'faq',
  portfolio: 'portfolio',
  portfolioCategories: 'portfolio_categories',
  categories: 'categories',
  serviceHighlights: 'service_highlights',
} as const;


