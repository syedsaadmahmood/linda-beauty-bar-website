import { useState, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { navigate } from '../Router';
import { AdminNav } from './AdminNav';

interface AdminLayoutProps {
  children: ReactNode;
  currentSection?: string;
}

export function AdminLayout({ children, currentSection = 'dashboard' }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    const { logout } = await import('./AuthGuard');
    await logout();
    window.location.href = '/';
  };

  const handleNavigation = (section: string) => {
    if (section === 'dashboard') {
      navigate('/admin');
    } else {
      navigate(`/admin?section=${section}`);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 z-40">
        <h1 className="text-xl font-semibold text-charcoal">Admin Panel</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 z-30
            transform transition-transform duration-300 ease-in-out
            lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <AdminNav
            currentSection={currentSection}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6 sm:p-8 lg:p-10 xl:p-12 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

