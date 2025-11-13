import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  services: 'services',
  testimonials: 'testimonials',
  faq: 'faq_categories',
  portfolio: 'portfolio',
  portfolioCategories: 'portfolio_categories',
  categories: 'service_categories',
  serviceHighlights: 'service_highlights',
} as const;

// Storage bucket name
export const STORAGE_BUCKET = 'beauty-bar-images';

// Helper function to upload image to Supabase Storage
export async function uploadImage(file: File, folder: string = 'general'): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Helper function to delete image from Supabase Storage
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract file path from URL
    const urlParts = url.split('/');
    const fileNameIndex = urlParts.findIndex(part => part === STORAGE_BUCKET);
    if (fileNameIndex === -1) {
      return; // Not a Supabase storage URL, skip deletion
    }
    
    const filePath = urlParts.slice(fileNameIndex + 1).join('/');
    
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      // Don't throw - deletion is best effort
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw - deletion is best effort
  }
}

