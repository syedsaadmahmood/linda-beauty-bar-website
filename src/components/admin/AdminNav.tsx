import { Settings, Package, MessageSquare, HelpCircle, Image, Tags, LogOut, Database, LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminNavProps {
  currentSection?: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Settings },
  { id: 'services', label: 'Services', icon: Package },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'portfolio', label: 'Portfolio', icon: Image },
  { id: 'seo', label: 'SEO Settings', icon: Tags },
  // { id: 'seed', label: 'Seed Data', icon: Database },
];

export function AdminNav({ currentSection = 'dashboard', onNavigate, onLogout }: AdminNavProps) {
  return (
    <aside
      className="w-64 bg-white border-r border-gray-200 flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-6 lg:p-8 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-charcoal">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Content Management</p>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto p-4 lg:p-6 min-h-0">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3.5 rounded-lg
                      transition-colors text-left cursor-pointer
                      ${isActive
                        ? 'bg-blush-pink text-charcoal font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout - Sticky at bottom */}
        <div className="flex-shrink-0 p-4 lg:p-6 border-t border-gray-200 bg-white sticky bottom-0">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

