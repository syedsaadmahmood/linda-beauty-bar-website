# Migration Guide: JSON to Supabase

## Overview

This application has been migrated from JSON file-based storage to Supabase. All data is now stored in Supabase with caching support.

## Important Changes

1. **Data Source**: The app now fetches data exclusively from Supabase (no JSON fallbacks)
2. **Caching**: Data is cached locally with TTL (Time To Live) for performance
3. **Seed Script**: A seed script is available to migrate JSON data to Supabase

## Setup Steps

### 1. Complete Supabase Setup

Follow the instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
- Create Supabase project
- Set up database tables
- Create storage bucket
- Configure RLS policies

### 2. Seed Database

After setting up Supabase, seed the database:

1. Log into the admin panel at `/admin`
2. Navigate to "Seed Data" in the sidebar
3. Click "Seed Database" button
4. This will import all data from JSON files into Supabase

Alternatively, you can run the seed script programmatically:

```typescript
import { seedSupabase } from './src/scripts/seedSupabase';
await seedSupabase();
```

### 3. Verify Data

After seeding, verify that:
- Services page loads correctly
- Testimonials are showing
- Blog posts are visible
- FAQ categories appear
- Portfolio images load

## Cache Configuration

Data is cached with the following TTL (Time To Live):

- **Services**: 5 minutes
- **Testimonials**: 5 minutes
- **Blog Posts**: 10 minutes
- **FAQ Categories**: 15 minutes
- **Portfolio Images**: 10 minutes

Cache is automatically cleared when data is updated through the admin panel.

## Removing JSON Files (Optional)

After successfully seeding Supabase and verifying everything works, you can optionally remove the JSON data files:

⚠️ **Important**: Only do this after confirming everything works with Supabase!

```bash
# Optional: Remove JSON data files (keep for backup initially)
# rm src/data/services.ts
# rm src/data/testimonials.ts
# rm src/data/blog.ts
# rm src/data/faq.ts
# rm src/data/portfolio.ts
```

**Recommendation**: Keep the JSON files as backup/seed source. They're only used by the seed script now.

## Error Handling

If Supabase is unavailable or data is missing:
- The app will show empty states
- Check browser console for error messages
- Ensure Supabase is properly configured
- Re-run the seed script if needed

## Troubleshooting

### "No data found in Supabase" errors

1. Verify Supabase environment variables are set
2. Check that tables exist and have data
3. Run the seed script again
4. Check browser console for specific errors

### Cache issues

1. Clear cache from SEO Settings page
2. Or manually clear browser localStorage
3. Refresh the page

### Images not loading

1. Verify storage bucket exists and is public
2. Check storage policies allow public read
3. Verify images were uploaded correctly

## Rollback (if needed)

If you need to rollback to JSON-based storage:

1. Revert `src/utils/adminStorage.ts` to previous version
2. Restore JSON fallback logic
3. Update frontend components to handle sync loading

However, this is not recommended as Supabase provides better scalability and features.







