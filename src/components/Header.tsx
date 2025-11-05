import { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { navigate } from './Router';
import logo from '../assets/logo-1.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Top bar */}
      <div className="bg-blush-pink-light border-b border-blush-pink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:+1234567890" className="flex items-center gap-2 text-charcoal hover:text-blush-pink transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">(123) 456-7890</span>
              </a>
              <a href="mailto:info@lindasbeautybar.com" className="flex items-center gap-2 text-charcoal hover:text-blush-pink transition-colors">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">info@lindasbeautybar.com</span>
              </a>
            </div>
            <div className="text-charcoal">
              <span className="hidden sm:inline">Mon-Sat: 9am-6pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src={logo} 
                alt="Linda's Beauty Bar - Permanent Makeup" 
                className="h-16 sm:h-20 w-auto object-contain"
                style={{ maxWidth: '200px' }}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => navigate('/')} className="text-charcoal hover:text-blush-pink transition-colors">
              Home
            </button>
            <button onClick={() => navigate('/services')} className="text-charcoal hover:text-blush-pink transition-colors">
              Services
            </button>
            <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-charcoal hover:text-blush-pink transition-colors">
              Portfolio
            </button>
            <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-charcoal hover:text-blush-pink transition-colors">
              About
            </button>
            <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-charcoal hover:text-blush-pink transition-colors">
              FAQ
            </button>
            <a 
              href="https://lindasbeautyacademy.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-charcoal hover:text-blush-pink transition-colors"
            >
              Academy
            </a>
            <Button asChild className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal">
              <a href="https://booking.lindasbeautybar.com" target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }} className="text-charcoal hover:text-blush-pink transition-colors text-left">
                Home
              </button>
              <button onClick={() => { navigate('/services'); setMobileMenuOpen(false); }} className="text-charcoal hover:text-blush-pink transition-colors text-left">
                Services
              </button>
              <button onClick={() => { navigate('/'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-charcoal hover:text-blush-pink transition-colors text-left">
                Portfolio
              </button>
              <button onClick={() => { navigate('/'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-charcoal hover:text-blush-pink transition-colors text-left">
                About
              </button>
              <button onClick={() => { navigate('/'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="text-charcoal hover:text-blush-pink transition-colors text-left">
                FAQ
              </button>
              <a 
                href="https://lindasbeautyacademy.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-charcoal hover:text-blush-pink transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Academy
              </a>
              <Button asChild className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal w-full">
                <a href="https://booking.lindasbeautybar.com" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                  Book Now
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
