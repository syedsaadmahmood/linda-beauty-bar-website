import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { navigate } from './Router';
import { categories } from '../data/data';
import logo from '../assets/logo-2.png';

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity mb-4 block cursor-pointer">
              <img 
                src={logo} 
                alt="Linda's Beauty Bar - Permanent Makeup" 
                className="h-16 w-auto brightness-0 invert object-contain"
                style={{ maxWidth: '180px' }}
              />
            </button>
            <p className="text-sm text-cream/80">
              Your destination for expert permanent makeup services. Enhance your natural beauty with our certified professionals.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush-pink transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush-pink transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cream text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/services')} className="hover:text-blush-pink transition-colors text-cream/80 text-left cursor-pointer">Services</button></li>
              <li><button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blush-pink transition-colors text-cream/80 text-left cursor-pointer">Portfolio</button></li>
              <li><button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blush-pink transition-colors text-cream/80 text-left cursor-pointer">About Us</button></li>
              <li><button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blush-pink transition-colors text-cream/80 text-left cursor-pointer">FAQ</button></li>
              <li><a href="https://lindasbeautyacademy.com" target="_blank" rel="noopener noreferrer" className="hover:text-blush-pink transition-colors text-cream/80 cursor-pointer">Beauty Academy</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-cream text-lg mb-4">Service Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <button 
                    onClick={() => navigate(`/services?category=${category.id}`)} 
                    className="hover:text-blush-pink transition-colors text-cream/80 text-left cursor-pointer"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-cream/80">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Beauty Lane<br />Los Angeles, CA 90210</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-blush-pink transition-colors text-cream/80 cursor-pointer">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@lindasbeautybar.com" className="hover:text-blush-pink transition-colors text-cream/80 cursor-pointer">info@lindasbeautybar.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-sm text-center">
          <p className="text-cream/80">&copy; 2025 Linda's Beauty Bar. All rights reserved.</p>
          <p className="mt-2 text-cream/80">
            <a href="#privacy" className="hover:text-blush-pink transition-colors cursor-pointer">Privacy Policy</a>
            {' · '}
            <a href="#terms" className="hover:text-blush-pink transition-colors cursor-pointer">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
