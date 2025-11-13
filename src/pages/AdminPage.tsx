import { AuthGuard } from '../components/admin/AuthGuard';
import { AdminLayout } from '../components/admin/AdminLayout';
import { ManageServices } from '../components/admin/ManageServices';
import { ManageTestimonials } from '../components/admin/ManageTestimonials';
import { ManageFAQ } from '../components/admin/ManageFAQ';
import { ManagePortfolio } from '../components/admin/ManagePortfolio';
import { SEOSettings } from '../components/admin/SEOSettings';
import { SeedData } from '../components/admin/SeedData';
import { useSearchParams, navigate } from '../components/Router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Package, MessageSquare, HelpCircle, Image, Tags, Database } from 'lucide-react';

function AdminDashboard() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'dashboard';

  const renderContent = () => {
    switch (section) {
      case 'services':
        return <ManageServices />;
      case 'testimonials':
        return <ManageTestimonials />;
      case 'faq':
        return <ManageFAQ />;
      case 'portfolio':
        return <ManagePortfolio />;
      case 'seo':
        return <SEOSettings />;
      case 'seed':
        return <SeedData />;
      default:
        return <AdminDashboardHome />;
    }
  };

  return (
    <AdminLayout currentSection={section === 'dashboard' ? 'dashboard' : section}>
      {renderContent()}
    </AdminLayout>
  );
}

function AdminDashboardHome() {
  const stats = [
    { label: 'Services', count: 0, icon: Package, href: '/admin?section=services' },
    { label: 'Testimonials', count: 0, icon: MessageSquare, href: '/admin?section=testimonials' },
    { label: 'FAQ', count: 0, icon: HelpCircle, href: '/admin?section=faq' },
    { label: 'Portfolio', count: 0, icon: Image, href: '/admin?section=portfolio' },
    { label: 'SEO Settings', count: 0, icon: Tags, href: '/admin?section=seo' },
    { label: 'Seed Data', count: 0, icon: Database, href: '/admin?section=seed' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-charcoal mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your website content and SEO settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(stat.href)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{stat.label}</CardTitle>
                  <Icon className="w-8 h-8 text-blush-pink" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mt-2">Manage {stat.label.toLowerCase()}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function AdminPage() {
  return (
    <AuthGuard>
      <AdminDashboard />
    </AuthGuard>
  );
}

