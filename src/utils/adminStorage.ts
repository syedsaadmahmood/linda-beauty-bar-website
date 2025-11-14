import { supabase, TABLES } from '../lib/supabase';
import { getCache, setCache, removeCache, CACHE_KEYS } from './cache';
import type { Service, Testimonial, FAQCategory, PortfolioCategory, Portfolio, Category, ServiceHighlight } from '../data/types';
import * as lucideReact from 'lucide-react';

// Re-export types for convenience
export type { Service, Testimonial, FAQCategory, PortfolioCategory, Portfolio, Category, ServiceHighlight };

// Cache TTL: 5 minutes for most data, 15 minutes for relatively static data
const CACHE_TTL = {
  services: 5 * 60 * 1000,      // 5 minutes
  testimonials: 5 * 60 * 1000,   // 5 minutes
  faq: 15 * 60 * 1000,           // 15 minutes (FAQ rarely changes)
  portfolio: 10 * 60 * 1000,     // 10 minutes
  categories: 15 * 60 * 1000,    // 15 minutes (categories rarely change)
  serviceHighlights: 15 * 60 * 1000, // 15 minutes (highlights rarely change)
};

// Helper: Transform DB row to Service
function dbRowToService(row: any): Service {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    longDescription: row.long_description,
    price: row.price,
    duration: row.duration,
    deposit: row.deposit || '',
    categoryId: row.category_id || row.category, // Support both old and new column names for migration
    imageUrl: row.image_url || '',
    benefits: row.benefits || [],
    process: row.process || [],
    aftercare: row.aftercare || [],
    faqs: row.faqs || [],
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords,
    tags: row.tags || [],
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: row.og_image,
  };
}

// Helper: Transform Service to DB row
function serviceToDbRow(service: Service): any {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    long_description: service.longDescription,
    price: service.price,
    duration: service.duration,
    deposit: service.deposit || null,
    category_id: service.categoryId,
    image_url: service.imageUrl || null,
    benefits: service.benefits || [],
    process: service.process || [],
    aftercare: service.aftercare || [],
    faqs: service.faqs || [],
    meta_title: service.metaTitle || null,
    meta_description: service.metaDescription || null,
    meta_keywords: service.metaKeywords || null,
    tags: service.tags || [],
    og_title: service.ogTitle || null,
    og_description: service.ogDescription || null,
    og_image: service.ogImage || null,
    updated_at: new Date().toISOString(),
  };
}

// Services
export async function getServices(useCache = true): Promise<Service[]> {
  if (useCache) {
    const cached = getCache<Service[]>(CACHE_KEYS.services);
    if (cached) {
      return cached;
    }
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.services)
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching services from Supabase:', error);
      throw error;
    }

    const services = (data || []).map(dbRowToService);

    if (useCache) {
      setCache(CACHE_KEYS.services, services, { ttl: CACHE_TTL.services });
    }

    return services;
  } catch (error) {
    console.error('Error loading services:', error);
    throw error;
  }
}

export async function saveService(service: Service): Promise<void> {
  try {
    const row = serviceToDbRow(service);
    const { error } = await supabase
      .from(TABLES.services)
      .upsert(row, { onConflict: 'id' });

    if (error) throw error;

    removeCache(CACHE_KEYS.services);
  } catch (error) {
    console.error('Error saving service:', error);
    throw error;
  }
}

export async function deleteService(serviceId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.services)
      .delete()
      .eq('id', serviceId);

    if (error) throw error;

    removeCache(CACHE_KEYS.services);
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
}

// Legacy function for backward compatibility (saves all services)
export async function saveServices(data: Service[]): Promise<void> {
  try {
    const rows = data.map(serviceToDbRow);
    const { error } = await supabase
      .from(TABLES.services)
      .upsert(rows, { onConflict: 'id' });

    if (error) throw error;

    removeCache(CACHE_KEYS.services);
  } catch (error) {
    console.error('Error saving services:', error);
    throw error;
  }
}

// Testimonials
function dbRowToTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    name: row.name,
    service: row.service,
    rating: row.rating,
    text: row.text,
    date: row.date,
    metaTitle: row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords: row.meta_keywords,
    tags: row.tags || [],
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImage: row.og_image,
  };
}

function testimonialToDbRow(testimonial: Testimonial): any {
  return {
    id: testimonial.id || undefined, // Let DB generate if new
    name: testimonial.name,
    service: testimonial.service,
    rating: testimonial.rating,
    text: testimonial.text,
    date: testimonial.date,
    meta_title: testimonial.metaTitle || null,
    meta_description: testimonial.metaDescription || null,
    meta_keywords: testimonial.metaKeywords || null,
    tags: testimonial.tags || [],
    og_title: testimonial.ogTitle || null,
    og_description: testimonial.ogDescription || null,
    og_image: testimonial.ogImage || null,
    updated_at: new Date().toISOString(),
  };
}

export async function getTestimonials(useCache = true): Promise<Testimonial[]> {
  if (useCache) {
    const cached = getCache<Testimonial[]>(CACHE_KEYS.testimonials);
    if (cached) {
      return cached;
    }
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.testimonials)
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials from Supabase:', error);
      throw error;
    }

    const testimonials = (data || []).map(dbRowToTestimonial);

    if (useCache) {
      setCache(CACHE_KEYS.testimonials, testimonials, { ttl: CACHE_TTL.testimonials });
    }

    return testimonials;
  } catch (error) {
    console.error('Error loading testimonials:', error);
    throw error;
  }
}

export async function saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
  try {
    const row = testimonialToDbRow(testimonial);
    const { data, error } = await supabase
      .from(TABLES.testimonials)
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    removeCache(CACHE_KEYS.testimonials);
    return dbRowToTestimonial(data);
  } catch (error) {
    console.error('Error saving testimonial:', error);
    throw error;
  }
}

export async function deleteTestimonial(testimonialId: number): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.testimonials)
      .delete()
      .eq('id', testimonialId);

    if (error) throw error;

    removeCache(CACHE_KEYS.testimonials);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
}

// Legacy function
export async function saveTestimonials(data: Testimonial[]): Promise<void> {
  try {
    const rows = data.map(testimonialToDbRow);
    const { error } = await supabase
      .from(TABLES.testimonials)
      .upsert(rows, { onConflict: 'id' });

    if (error) throw error;

    removeCache(CACHE_KEYS.testimonials);
  } catch (error) {
    console.error('Error saving testimonials:', error);
    throw error;
  }
}

// FAQ Categories
export async function getFAQCategories(useCache = true): Promise<FAQCategory[]> {
  if (useCache) {
    const cached = getCache<FAQCategory[]>(CACHE_KEYS.faq);
    if (cached) {
      return cached;
    }
  }

  try {
    // Get all FAQ categories
    const { data: categories, error: categoriesError } = await supabase
      .from('faq_categories')
      .select('*')
      .order('category', { ascending: true });

    if (categoriesError) throw categoriesError;

    // Get all FAQ items
    const { data: items, error: itemsError } = await supabase
      .from('faq_items')
      .select('*')
      .order('id', { ascending: true });

    if (itemsError) throw itemsError;

    // Group items by category
    const faqCategories: FAQCategory[] = (categories || []).map((cat: any) => {
      const categoryItems = (items || [])
        .filter((item: any) => item.faq_category_id === cat.id)
        .map((item: any) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }));

      return {
        category: cat.category,
        questions: categoryItems,
        metaTitle: cat.meta_title,
        metaDescription: cat.meta_description,
        metaKeywords: cat.meta_keywords,
        tags: cat.tags || [],
        ogTitle: cat.og_title,
        ogDescription: cat.og_description,
        ogImage: cat.og_image,
      };
    });

    if (useCache) {
      setCache(CACHE_KEYS.faq, faqCategories, { ttl: CACHE_TTL.faq });
    }

    return faqCategories;
  } catch (error) {
    console.error('Error loading FAQ categories:', error);
    throw error;
  }
}

export async function saveFAQCategory(faqCategory: FAQCategory): Promise<void> {
  try {
    // Save or update category
    const { data: categoryData, error: categoryError } = await supabase
      .from('faq_categories')
      .upsert({
        category: faqCategory.category,
        meta_title: faqCategory.metaTitle || null,
        meta_description: faqCategory.metaDescription || null,
        meta_keywords: faqCategory.metaKeywords || null,
        tags: faqCategory.tags || [],
        og_title: faqCategory.ogTitle || null,
        og_description: faqCategory.ogDescription || null,
        og_image: faqCategory.ogImage || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'category' })
      .select()
      .single();

    if (categoryError) throw categoryError;

    const categoryId = categoryData.id;

    // Delete existing items for this category
    await supabase
      .from('faq_items')
      .delete()
      .eq('faq_category_id', categoryId);

    // Insert new items
    if (faqCategory.questions && faqCategory.questions.length > 0) {
      const items = faqCategory.questions.map(item => ({
        id: item.id,
        faq_category_id: categoryId,
        question: item.question,
        answer: item.answer,
        updated_at: new Date().toISOString(),
      }));

      const { error: itemsError } = await supabase
        .from('faq_items')
        .insert(items);

      if (itemsError) throw itemsError;
    }

    removeCache(CACHE_KEYS.faq);
  } catch (error) {
    console.error('Error saving FAQ category:', error);
    throw error;
  }
}

export async function deleteFAQCategory(categoryName: string): Promise<void> {
  try {
    // Get category ID
    const { data: category } = await supabase
      .from('faq_categories')
      .select('id')
      .eq('category', categoryName)
      .single();

    if (category) {
      // Delete items (CASCADE should handle this, but being explicit)
      await supabase
        .from('faq_items')
        .delete()
        .eq('faq_category_id', category.id);

      // Delete category
      await supabase
        .from('faq_categories')
        .delete()
        .eq('id', category.id);
    }

    removeCache(CACHE_KEYS.faq);
  } catch (error) {
    console.error('Error deleting FAQ category:', error);
    throw error;
  }
}

// Legacy function
export async function saveFAQCategories(data: FAQCategory[]): Promise<void> {
  try {
    for (const category of data) {
      await saveFAQCategory(category);
    }
  } catch (error) {
    console.error('Error saving FAQ categories:', error);
    throw error;
  }
}

// Portfolio Categories
export async function getPortfolioCategories(useCache = true): Promise<PortfolioCategory[]> {
  if (useCache) {
    const cached = getCache<PortfolioCategory[]>(CACHE_KEYS.portfolioCategories);
    if (cached) {
      return cached;
    }
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.portfolioCategories)
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching portfolio categories from Supabase:', error);
      throw error;
    }

    const categories = (data || []).map((row: any) => ({
      id: row.id,
      name: row.name,
    }));

    if (useCache) {
      setCache(CACHE_KEYS.portfolioCategories, categories, { ttl: CACHE_TTL.portfolio });
    }

    return categories;
  } catch (error) {
    console.error('Error loading portfolio categories:', error);
    throw error;
  }
}

export async function savePortfolioCategory(category: PortfolioCategory): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.portfolioCategories)
      .upsert({
        id: category.id,
        name: category.name,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) throw error;

    removeCache(CACHE_KEYS.portfolioCategories);
  } catch (error) {
    console.error('Error saving portfolio category:', error);
    throw error;
  }
}

export async function deletePortfolioCategory(categoryId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.portfolioCategories)
      .delete()
      .eq('id', categoryId);

    if (error) throw error;

    removeCache(CACHE_KEYS.portfolioCategories);
  } catch (error) {
    console.error('Error deleting portfolio category:', error);
    throw error;
  }
}

// Portfolio Items
export async function getPortfolio(useCache = true): Promise<Portfolio[]> {
  if (useCache) {
    const cached = getCache<Portfolio[]>(CACHE_KEYS.portfolio);
    if (cached) {
      return cached;
    }
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.portfolio)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching portfolio from Supabase:', error);
      throw error;
    }

    const portfolioItems: Portfolio[] = (data || []).map((row: any) => ({
      id: row.id,
      categoryId: row.category_id,
      title: row.title,
      alt: row.alt,
      imageUrl: row.image_url,
      metaTitle: row.meta_title,
      metaDescription: row.meta_description,
      metaKeywords: row.meta_keywords,
      tags: row.tags || [],
      ogTitle: row.og_title,
      ogDescription: row.og_description,
      ogImage: row.og_image,
    }));

    if (useCache) {
      setCache(CACHE_KEYS.portfolio, portfolioItems, { ttl: CACHE_TTL.portfolio });
    }

    return portfolioItems;
  } catch (error) {
    console.error('Error loading portfolio:', error);
    throw error;
  }
}

export async function savePortfolioItem(item: Portfolio): Promise<Portfolio> {
  try {
    const row = {
      id: item.id || undefined,
      category_id: item.categoryId,
      title: item.title,
      alt: item.alt,
      image_url: item.imageUrl,
      meta_title: item.metaTitle || null,
      meta_description: item.metaDescription || null,
      meta_keywords: item.metaKeywords || null,
      tags: item.tags || [],
      og_title: item.ogTitle || null,
      og_description: item.ogDescription || null,
      og_image: item.ogImage || null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from(TABLES.portfolio)
      .upsert(row, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    removeCache(CACHE_KEYS.portfolio);
    return {
      id: data.id,
      categoryId: data.category_id,
      title: data.title,
      alt: data.alt,
      imageUrl: data.image_url,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      metaKeywords: data.meta_keywords,
      tags: data.tags || [],
      ogTitle: data.og_title,
      ogDescription: data.og_description,
      ogImage: data.og_image,
    };
  } catch (error) {
    console.error('Error saving portfolio item:', error);
    throw error;
  }
}

export async function deletePortfolioItem(itemId: number): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.portfolio)
      .delete()
      .eq('id', itemId);

    if (error) throw error;

    removeCache(CACHE_KEYS.portfolio);
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    throw error;
  }
}

// Service Categories
export async function getCategories(useCache = true): Promise<Category[]> {
  if (useCache) {
    const cached = getCache<Category[]>(CACHE_KEYS.categories);
    if (cached) {
      // Normalize cached data to ensure icon is always a string
      const normalized = cached.map((cat: any) => {
        let iconName = 'Droplet';
        
        if (typeof cat.icon === 'string') {
          iconName = cat.icon.trim();
        } else if (cat._iconName && typeof cat._iconName === 'string') {
          iconName = cat._iconName.trim();
        } else if (cat.icon) {
          // Old cached data with component - try to extract name
          const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
          if (typeof cat.icon === 'function' && cat.icon.name) {
            const functionName = cat.icon.name;
            for (const name of iconNames) {
              if (name === functionName || functionName.includes(name)) {
                iconName = name;
                break;
              }
            }
          }
        }
        
        return {
          id: cat.id,
          name: cat.name,
          icon: iconName,
          _iconName: iconName,
        };
      });
      
      // Update cache with normalized data
      setCache(CACHE_KEYS.categories, normalized, { ttl: CACHE_TTL.categories });
      return normalized;
    }
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.categories)
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories from Supabase:', error);
      throw error;
    }

    // Convert icon strings back to LucideIcon components
    const lucideReact = await import('lucide-react');
    const iconMap: Record<string, any> = {
      'Brush': lucideReact.Brush,
      'Smile': lucideReact.Smile,
      'Heart': lucideReact.Heart,
      'Eye': lucideReact.Eye,
      'Dumbbell': lucideReact.Dumbbell,
      'Sparkles': lucideReact.Sparkles,
      'Droplet': lucideReact.Droplet,
      'Star': lucideReact.Star,
      'Flower': lucideReact.Flower,
      'Gem': lucideReact.Gem,
      'Palette': lucideReact.Palette,
      'Wand2': lucideReact.Wand2,
    };

    const categories = (data || []).map((row: any) => {
      // Get icon name from database, ensure it's a valid string
      let iconName = (row.icon_name || 'Droplet').trim();
      
      // Validate icon name exists in iconMap
      if (!iconMap[iconName]) {
        iconName = 'Droplet';
      }
      
      // Store icon as string for easier handling
      return {
        id: row.id,
        name: row.name,
        icon: iconName, // Store as string - will be converted to component when rendering
        _iconName: iconName, // Store original name for reference (redundant but helpful)
      };
    });

    if (useCache) {
      setCache(CACHE_KEYS.categories, categories, { ttl: CACHE_TTL.categories });
    }

    return categories;
  } catch (error) {
    console.error('Error loading categories:', error);
    throw error;
  }
}

export async function saveCategory(category: Category): Promise<void> {
  try {
    // Convert icon to string - prioritize string type
    let iconName = 'Droplet';
    
    if (typeof category.icon === 'string') {
      // Direct string - use it
      iconName = category.icon.trim();
    } else {
      // Check for _iconName property (from database)
      const categoryWithIconName = category as any;
      if (categoryWithIconName._iconName && typeof categoryWithIconName._iconName === 'string') {
        iconName = categoryWithIconName._iconName.trim();
      } else if (category.icon) {
        // Try to find icon name from component
        const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
        
        // First try direct comparison
        for (const name of iconNames) {
          const IconComponent = lucideReact[name as keyof typeof lucideReact];
          if (IconComponent && IconComponent === category.icon) {
            iconName = name;
            break;
          }
        }
        
        // If direct comparison fails, try to match by function name
        if (iconName === 'Droplet' && typeof category.icon === 'function' && category.icon.name) {
          const functionName = category.icon.name;
          for (const name of iconNames) {
            if (name === functionName || functionName.includes(name)) {
              iconName = name;
              break;
            }
          }
        }
      }
    }

    // Ensure iconName is a valid string and exists in our icon map
    const validIconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
    const finalIconName = validIconNames.includes(iconName) ? iconName.trim() : 'Droplet';
    
    const { error } = await supabase
      .from(TABLES.categories)
      .upsert({
        id: category.id,
        name: category.name,
        icon_name: finalIconName,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Supabase error saving category:', error);
      throw error;
    }

    // Clear cache to force reload
    removeCache(CACHE_KEYS.categories);
  } catch (error) {
    console.error('Error saving category:', error);
    throw error;
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from(TABLES.categories)
      .delete()
      .eq('id', categoryId);

    if (error) throw error;

    removeCache(CACHE_KEYS.categories);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

// Legacy function
export async function saveCategories(data: Category[]): Promise<void> {
  try {
    for (const category of data) {
      await saveCategory(category);
    }
  } catch (error) {
    console.error('Error saving categories:', error);
    throw error;
  }
}

// Service Highlights
async function dbRowToServiceHighlight(row: any): Promise<ServiceHighlight> {
  const iconName = (row.icon_name || 'Droplet').trim();
  
  // Import lucide-react dynamically to ensure it's available
  const lucideReactModule = await import('lucide-react');
  const iconMap: Record<string, any> = {
    'Brush': lucideReactModule.Brush,
    'Smile': lucideReactModule.Smile,
    'Heart': lucideReactModule.Heart,
    'Eye': lucideReactModule.Eye,
    'Dumbbell': lucideReactModule.Dumbbell,
    'Sparkles': lucideReactModule.Sparkles,
    'Droplet': lucideReactModule.Droplet,
    'Star': lucideReactModule.Star,
    'Flower': lucideReactModule.Flower,
    'Gem': lucideReactModule.Gem,
    'Palette': lucideReactModule.Palette,
    'Wand2': lucideReactModule.Wand2,
  };
  
  const Icon = iconMap[iconName] || iconMap['Droplet'];
  
  const highlight: any = {
    categoryId: row.category_id,
    title: row.title,
    description: row.description,
    icon: Icon,
    _iconName: iconName, // Store icon name for cache serialization
  };
  
  return highlight;
}

function serviceHighlightToDbRow(highlight: ServiceHighlight): any {
  // Get icon name - prefer string, then extract from component
  let iconName = 'Droplet';
  if (typeof highlight.icon === 'string') {
    iconName = highlight.icon;
  } else {
    // Try to get name from icon component
    const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
    for (const name of iconNames) {
      const IconComponent = (lucideReact as any)[name];
      if (IconComponent && IconComponent === highlight.icon) {
        iconName = name;
        break;
      }
    }
    // If direct comparison fails, try function name
    if (highlight.icon && typeof highlight.icon === 'function' && highlight.icon.name) {
      const functionName = highlight.icon.name;
      for (const name of iconNames) {
        if (name === functionName || functionName.includes(name)) {
          iconName = name;
          break;
        }
      }
    }
  }
  
  return {
    id: `highlight-${highlight.categoryId}`,
    category_id: highlight.categoryId,
    title: highlight.title,
    description: highlight.description,
    icon_name: iconName,
    display_order: (highlight as any).display_order ?? 0, // Preserve order if provided
    updated_at: new Date().toISOString(),
  };
}

export async function getServiceHighlights(useCache = true): Promise<ServiceHighlight[]> {
  if (useCache) {
    const cached = getCache<any[]>(CACHE_KEYS.serviceHighlights);
    if (cached) {
      // Convert cached icons from strings back to components
      const lucideReactModule = await import('lucide-react');
      const iconMap: Record<string, any> = {
        'Brush': lucideReactModule.Brush,
        'Smile': lucideReactModule.Smile,
        'Heart': lucideReactModule.Heart,
        'Eye': lucideReactModule.Eye,
        'Dumbbell': lucideReactModule.Dumbbell,
        'Sparkles': lucideReactModule.Sparkles,
        'Droplet': lucideReactModule.Droplet,
        'Star': lucideReactModule.Star,
        'Flower': lucideReactModule.Flower,
        'Gem': lucideReactModule.Gem,
        'Palette': lucideReactModule.Palette,
        'Wand2': lucideReactModule.Wand2,
      };
      
      return cached.map((item: any) => {
        // If icon is already a component, use it; otherwise convert from string
        let icon = item.icon;
        if (typeof icon === 'string') {
          icon = iconMap[icon] || iconMap['Droplet'];
        } else if (!icon || typeof icon !== 'function') {
          // If icon is invalid, use default
          icon = iconMap['Droplet'];
        }
        
        return {
          ...item,
          icon,
        };
      });
    }
  }

  try {
    const { data, error } = await supabase
      .from(TABLES.serviceHighlights)
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching service highlights from Supabase:', error);
      throw error;
    }

    const highlights = await Promise.all((data || []).map(dbRowToServiceHighlight));

    if (useCache) {
      // Store with icon names as strings for proper serialization
      const highlightsForCache = highlights.map((h: any) => ({
        categoryId: h.categoryId,
        title: h.title,
        description: h.description,
        icon: typeof h.icon === 'string' ? h.icon : (h._iconName || 'Droplet'),
        _iconName: typeof h.icon === 'string' ? h.icon : (h._iconName || 'Droplet'),
      }));
      setCache(CACHE_KEYS.serviceHighlights, highlightsForCache, { ttl: CACHE_TTL.serviceHighlights });
    }

    return highlights;
  } catch (error) {
    console.error('Error loading service highlights:', error);
    throw error;
  }
}

export async function saveServiceHighlight(highlight: ServiceHighlight): Promise<void> {
  try {
    const row = serviceHighlightToDbRow(highlight);
    const { error } = await supabase
      .from(TABLES.serviceHighlights)
      .upsert(row, { onConflict: 'id' });

    if (error) throw error;

    removeCache(CACHE_KEYS.serviceHighlights);
  } catch (error) {
    console.error('Error saving service highlight:', error);
    throw error;
  }
}

export async function deleteServiceHighlight(categoryId: string): Promise<void> {
  try {
    const highlightId = `highlight-${categoryId}`;
    const { error } = await supabase
      .from(TABLES.serviceHighlights)
      .delete()
      .eq('id', highlightId);

    if (error) throw error;

    removeCache(CACHE_KEYS.serviceHighlights);
  } catch (error) {
    console.error('Error deleting service highlight:', error);
    throw error;
  }
}

// Export all data
export async function exportAllData() {
  const data = {
    services: await getServices(false),
    categories: await getCategories(false),
    testimonials: await getTestimonials(false),
    faq: await getFAQCategories(false),
    portfolioCategories: await getPortfolioCategories(false),
    portfolio: await getPortfolio(false),
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `beauty-bar-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import data
export async function importData(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.services) await saveServices(data.services);
        if (data.categories) await saveCategories(data.categories);
        if (data.testimonials) await saveTestimonials(data.testimonials);
        if (data.faq) await saveFAQCategories(data.faq);
        if (data.portfolioCategories) {
          for (const cat of data.portfolioCategories) {
            await savePortfolioCategory(cat);
          }
        }
        if (data.portfolio) {
          for (const item of data.portfolio) {
            await savePortfolioItem(item);
          }
        }
        
        resolve();
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Reset to defaults (delete all Supabase data)
export async function resetToDefaults(): Promise<void> {
  try {
    await Promise.all([
      supabase.from(TABLES.services).delete().neq('id', ''),
      supabase.from(TABLES.categories).delete().neq('id', ''),
      supabase.from(TABLES.testimonials).delete().neq('id', 0),
      supabase.from('faq_categories').delete().neq('id', 0),
      supabase.from('faq_items').delete().neq('id', ''),
      supabase.from(TABLES.portfolio).delete().neq('id', 0),
      supabase.from(TABLES.portfolioCategories).delete().neq('id', ''),
    ]);
    
    // Clear all cache
    Object.values(CACHE_KEYS).forEach(key => removeCache(key));
  } catch (error) {
    console.error('Error resetting data:', error);
    throw error;
  }
}

// Helper functions to replace data.ts helpers
// These work with categories fetched from Supabase

/**
 * Get category by ID
 * @param id Category ID
 * @param categories Optional categories array (if not provided, will fetch from Supabase)
 */
export async function getCategoryById(id: string, categories?: Category[]): Promise<Category | undefined> {
  const cats = categories || await getCategories();
  return cats.find(cat => cat.id === id);
}

/**
 * Get category by name
 * @param name Category name
 * @param categories Optional categories array (if not provided, will fetch from Supabase)
 */
export async function getCategoryByName(name: string, categories?: Category[]): Promise<Category | undefined> {
  const cats = categories || await getCategories();
  return cats.find(cat => cat.name === name);
}

/**
 * Get category icon component by name or ID
 * @param nameOrId Category name or ID
 * @param categories Optional categories array (if not provided, will fetch from Supabase)
 */
export async function getCategoryIcon(nameOrId: string, categories?: Category[]): Promise<lucideReact.LucideIcon> {
  const cats = categories || await getCategories();
  const category = cats.find(cat => cat.name === nameOrId || cat.id === nameOrId);
  
  if (!category) {
    return lucideReact.Droplet;
  }
  
  // Handle icon - it might be a string or component
  if (typeof category.icon === 'string') {
    const iconName = category.icon.trim();
    const Icon = (lucideReact as any)[iconName];
    return Icon || lucideReact.Droplet;
  }
  
  // If it's already a component, return it
  return category.icon as lucideReact.LucideIcon;
}

/**
 * Get category name by ID
 * @param id Category ID
 * @param categories Optional categories array (if not provided, will fetch from Supabase)
 */
export async function getCategoryNameById(id: string, categories?: Category[]): Promise<string | undefined> {
  const category = await getCategoryById(id, categories);
  return category?.name;
}

/**
 * Get all category names including "All Services"
 * @param categories Optional categories array (if not provided, will fetch from Supabase)
 */
export async function getAllCategories(categories?: Category[]): Promise<string[]> {
  const cats = categories || await getCategories();
  return ['All Services', ...cats.map(cat => cat.name)];
}
