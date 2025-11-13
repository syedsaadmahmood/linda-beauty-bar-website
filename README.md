# Linda's Beauty Bar Website

A modern, responsive website for Linda's Beauty Bar featuring permanent makeup services, portfolio showcase, testimonials, and an admin panel for content management.

**Original Design:** [Figma Design](https://www.figma.com/design/CrKRDNqbSgutdmZLDu3F45/Linda-s-Beauty-Bar-Website)

## Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🗄️ **Supabase Integration** - Cloud database for all content management
- 🔐 **Admin Panel** - Full-featured admin interface for managing content
- 🖼️ **Image Management** - Upload and manage images via Supabase Storage
- 📊 **SEO Optimized** - Built-in SEO fields for all content types
- ⚡ **Fast Performance** - Caching system for optimal load times

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd beauty-bar-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Follow the detailed instructions in [SUPABASE_SETUP.md](./src/guidelines/SUPABASE_SETUP.md)
   - Create a Supabase project
   - Run the SQL schema from `src/schema/supabase-schema.sql`
   - Set up storage bucket and policies from `src/schema/supabase-storage-policies.sql`

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Seed the database** (optional)
   - Log into the admin panel at `/admin`
   - Navigate to "Seed Data" section
   - Click "Seed Database" to import initial data

## Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin panel components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   └── ...             # Page components
├── data/               # Type definitions and static data
├── guidelines/         # Development guidelines and documentation
├── hooks/              # Custom React hooks
├── lib/                # Library configurations (Supabase)
├── pages/               # Page components
├── schema/             # Database schema SQL files
├── scripts/             # Utility scripts (seed, etc.)
├── styles/              # Global styles
└── utils/              # Utility functions (storage, cache)
```

## Admin Panel

Access the admin panel at `/admin` after logging in.

### Features

- **Services Management**
  - Manage individual services
  - Manage service categories
  - Manage service highlights (displayed on homepage)
  
- **Content Management**
  - Testimonials
  - FAQ Categories and Items
  - Portfolio Categories and Items
  
- **SEO Settings**
  - Configure SEO metadata for all content types
  
- **Image Upload**
  - Upload images to Supabase Storage
  - Automatic URL generation

### Admin Login

1. Create an admin user in Supabase Dashboard → Authentication → Users
2. Use the email/password to log into `/admin`

## Database Schema

The application uses the following Supabase tables:

- `service_categories` - Service category definitions
- `services` - Individual service listings
- `service_highlights` - Service highlights for homepage
- `testimonials` - Customer testimonials
- `faq_categories` - FAQ category groupings
- `faq_items` - Individual FAQ questions
- `portfolio_categories` - Portfolio category definitions
- `portfolio` - Portfolio images and items

See `src/schema/supabase-schema.sql` for the complete schema.

## Storage

Images are stored in Supabase Storage bucket: `beauty-bar-images`

- **Public bucket** - Images are publicly accessible
- **Authenticated uploads** - Only logged-in admins can upload
- **Automatic URL generation** - Public URLs generated automatically

See `src/schema/supabase-storage-policies.sql` for storage policies.

## Caching

The application uses localStorage-based caching with TTL:

- **Services/Testimonials:** 5 minutes
- **Portfolio:** 10 minutes
- **FAQ/Categories/Highlights:** 15 minutes

Cache is automatically cleared when data is updated through the admin panel.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Migration Guide

If you're migrating from a previous version, see [MIGRATION_GUIDE.md](./src/guidelines/MIGRATION_GUIDE.md) for detailed instructions.

## Documentation

- [Supabase Setup Guide](./src/guidelines/SUPABASE_SETUP.md) - Detailed Supabase configuration
- [Migration Guide](./src/guidelines/MIGRATION_GUIDE.md) - Migration instructions
- [Database Schema](./src/schema/supabase-schema.sql) - Complete SQL schema
- [Storage Policies](./src/schema/supabase-storage-policies.sql) - Storage bucket policies

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[Add your license here]

## Support

For issues or questions, please [create an issue](link-to-issues) or contact the development team.
