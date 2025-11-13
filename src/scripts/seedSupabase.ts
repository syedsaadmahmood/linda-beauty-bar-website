/**
 * Seed script to populate Supabase with initial data from JSON files
 * Run this script once to migrate all JSON data to Supabase
 * 
 * Usage: Import and call seedSupabase() from browser console or run as a one-time script
 * 
 * IMPORTANT: Make sure you've created the database tables first!
 * Run the SQL commands from src/schema/supabase-schema.sql in your Supabase SQL Editor.
 */

import { supabase, TABLES } from '../lib/supabase';
import { servicesData, testimonials, faqCategories, portfolioCategories, portfolio, categories, serviceHighlights, getCategoryByName } from '../data/data';
import * as lucideReact from 'lucide-react';

// Helper function to check if a table exists
async function checkTableExists(tableName: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from(tableName)
      .select('id')
      .limit(1);
    
    // If we get a "table not found" error, return false
    if (error && error.message?.includes('schema cache')) {
      return false;
    }
    // If we get any other error, assume table exists but may be empty
    return !error || !error.message?.includes('schema cache');
  } catch (error) {
    return false;
  }
}

// Helper: Transform Service to DB row
function serviceToDbRow(service: any): any {
  // Convert category name to category ID
  let categoryId: string;
  if (service.categoryId) {
    // Already has categoryId
    categoryId = service.categoryId;
  } else if (service.category) {
    // Has category name, need to convert to ID
    const category = getCategoryByName(service.category);
    if (!category) {
      throw new Error(`Category "${service.category}" not found for service "${service.id}". Make sure categories are seeded first.`);
    }
    categoryId = category.id;
  } else {
    throw new Error(`Service "${service.id}" has no category or categoryId`);
  }

  return {
    id: service.id,
    title: service.title,
    description: service.description,
    long_description: service.longDescription,
    price: service.price,
    duration: service.duration,
    deposit: service.deposit || null,
    category_id: categoryId,
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
  };
}

// Helper: Transform Testimonial to DB row
function testimonialToDbRow(testimonial: any): any {
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
  };
}

// Helper: Transform Category to DB row
function categoryToDbRow(category: any): any {
  // Get icon name from component
  let iconName = 'Droplet';
  if (typeof category.icon === 'string') {
    iconName = category.icon;
  } else {
    // Try to find icon name
    const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
    for (const name of iconNames) {
      if (lucideReact[name as keyof typeof lucideReact] === category.icon) {
        iconName = name;
        break;
      }
    }
  }

  return {
    id: category.id,
    name: category.name,
    icon_name: iconName,
  };
}

// Helper: Transform ServiceHighlight to DB row
function serviceHighlightToDbRow(highlight: any): any {
  // Get icon name from component
  let iconName = 'Droplet';
  if (typeof highlight.icon === 'string') {
    iconName = highlight.icon;
  } else {
    // Try to find icon name
    const iconNames = ['Brush', 'Smile', 'Heart', 'Eye', 'Dumbbell', 'Sparkles', 'Droplet', 'Star', 'Flower', 'Gem', 'Palette', 'Wand2'];
    for (const name of iconNames) {
      if (lucideReact[name as keyof typeof lucideReact] === highlight.icon) {
        iconName = name;
        break;
      }
    }
  }

  return {
    id: `highlight-${highlight.categoryId}`,
    category_id: highlight.categoryId,
    title: highlight.title,
    description: highlight.description,
    icon_name: iconName,
  };
}

export async function seedSupabase() {
  console.log('Starting Supabase seed...');
  console.log('⚠️  Make sure you\'ve created the database tables first!');
  console.log('   See src/schema/supabase-schema.sql for SQL commands.\n');
  
  // Check if tables exist
  const requiredTables = [
    { name: TABLES.services, displayName: 'services' },
    { name: TABLES.categories, displayName: 'service_categories' },
    { name: TABLES.testimonials, displayName: 'testimonials' },
    { name: 'faq_categories', displayName: 'faq_categories' },
    { name: 'faq_items', displayName: 'faq_items' },
    { name: TABLES.portfolioCategories, displayName: 'portfolio_categories' },
    { name: TABLES.portfolio, displayName: 'portfolio' },
    { name: TABLES.serviceHighlights, displayName: 'service_highlights' },
  ];

  console.log('Checking if tables exist...');
  const missingTables: string[] = [];
  
  for (const table of requiredTables) {
    const exists = await checkTableExists(table.name);
    if (!exists) {
      missingTables.push(table.displayName);
      console.log(`❌ Table '${table.displayName}' not found`);
    } else {
      console.log(`✓ Table '${table.displayName}' exists`);
    }
  }

  if (missingTables.length > 0) {
    const errorMessage = `
❌ ERROR: The following tables are missing:
   ${missingTables.map(t => `- ${t}`).join('\n   ')}

📋 Please create these tables first by running the SQL commands from src/schema/supabase-schema.sql in your Supabase SQL Editor.

Steps:
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and run the SQL commands from src/schema/supabase-schema.sql
4. Then try seeding again
`;
    console.error(errorMessage);
    throw new Error(`Missing tables: ${missingTables.join(', ')}. Please create them first using the SQL in src/schema/supabase-schema.sql`);
  }

  console.log('\nAll tables exist. Proceeding with seeding...\n');
  
  try {
    // Seed Service Categories
    console.log('Seeding service categories...');
    const categoryRows = categories.map(categoryToDbRow);
    const { error: categoriesError } = await supabase
      .from(TABLES.categories)
      .upsert(categoryRows, { onConflict: 'id' });
    
    if (categoriesError) {
      console.error('Error seeding categories:', categoriesError);
      throw categoriesError;
    }
    console.log(`✓ Seeded ${categories.length} categories`);

    // Seed Services
    console.log('Seeding services...');
    const serviceRows = servicesData.map(serviceToDbRow);
    const { error: servicesError } = await supabase
      .from(TABLES.services)
      .upsert(serviceRows, { onConflict: 'id' });
    
    if (servicesError) {
      console.error('Error seeding services:', servicesError);
      throw servicesError;
    }
    console.log(`✓ Seeded ${servicesData.length} services`);

    // Seed Service Highlights
    console.log('Seeding service highlights...');
    const highlightRows = serviceHighlights.map(serviceHighlightToDbRow);
    const { error: highlightsError } = await supabase
      .from(TABLES.serviceHighlights)
      .upsert(highlightRows, { onConflict: 'id' });
    
    if (highlightsError) {
      console.error('Error seeding service highlights:', highlightsError);
      throw highlightsError;
    }
    console.log(`✓ Seeded ${serviceHighlights.length} service highlights`);

    // Seed Testimonials
    console.log('Seeding testimonials...');
    const testimonialRows = testimonials.map(testimonialToDbRow);
    const { error: testimonialsError } = await supabase
      .from(TABLES.testimonials)
      .upsert(testimonialRows, { onConflict: 'id' });
    
    if (testimonialsError) {
      console.error('Error seeding testimonials:', testimonialsError);
      throw testimonialsError;
    }
    console.log(`✓ Seeded ${testimonials.length} testimonials`);

    // Seed FAQ Categories and Items
    console.log('Seeding FAQ categories...');
    for (const faqCategory of faqCategories) {
      // Insert category
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
        }, { onConflict: 'category' })
        .select()
        .single();

      if (categoryError) {
        console.error('Error seeding FAQ category:', categoryError);
        throw categoryError;
      }

      // Insert items for this category
      if (faqCategory.questions && faqCategory.questions.length > 0) {
        const items = faqCategory.questions.map(item => ({
          id: item.id,
          faq_category_id: categoryData.id,
          question: item.question,
          answer: item.answer,
        }));

        const { error: itemsError } = await supabase
          .from('faq_items')
          .upsert(items, { onConflict: 'id' });

        if (itemsError) {
          console.error('Error seeding FAQ items:', itemsError);
          throw itemsError;
        }
      }
    }
    console.log(`✓ Seeded ${faqCategories.length} FAQ categories`);

    // Seed Portfolio Categories
    console.log('Seeding portfolio categories...');
    const portfolioCategoryRows = portfolioCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
    }));
    const { error: portfolioCategoriesError } = await supabase
      .from(TABLES.portfolioCategories)
      .upsert(portfolioCategoryRows, { onConflict: 'id' });
    
    if (portfolioCategoriesError) {
      console.error('Error seeding portfolio categories:', portfolioCategoriesError);
      throw portfolioCategoriesError;
    }
    console.log(`✓ Seeded ${portfolioCategories.length} portfolio categories`);

    // Seed Portfolio Items
    console.log('Seeding portfolio items...');
    const portfolioRows = portfolio.map(item => ({
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
    }));

    const { error: portfolioError } = await supabase
      .from(TABLES.portfolio)
      .upsert(portfolioRows, { onConflict: 'id' });
    
    if (portfolioError) {
      console.error('Error seeding portfolio items:', portfolioError);
      throw portfolioError;
    }
    console.log(`✓ Seeded ${portfolio.length} portfolio items`);

    console.log('\n✅ Supabase seed completed successfully!');
    return { success: true };
  } catch (error: any) {
    console.error('❌ Seed failed:', error);
    
    // Provide helpful error message
    if (error?.message?.includes('schema cache') || error?.message?.includes('table')) {
      console.error('\n💡 TIP: Make sure you\'ve run the SQL commands from src/schema/supabase-schema.sql to create the tables.');
      console.error('   Go to Supabase Dashboard > SQL Editor and run the CREATE TABLE statements.');
    }
    
    return { success: false, error };
  }
}

// Auto-run if called directly (for development)
if (import.meta.hot) {
  // Only in dev mode
  (window as any).seedSupabase = seedSupabase;
}
