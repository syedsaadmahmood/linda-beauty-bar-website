import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

const portfolioImages = {
  all: [
    { id: 1, category: 'microblading', alt: 'Microblading before and after' },
    { id: 2, category: 'powder-brows', alt: 'Powder brows transformation' },
    { id: 3, category: 'eyeliner', alt: 'Permanent eyeliner results' },
    { id: 4, category: 'lip-blush', alt: 'Lip blush before and after' },
    { id: 5, category: 'microblading', alt: 'Natural microblading results' },
    { id: 6, category: 'powder-brows', alt: 'Ombre powder brows' },
  ],
  microblading: [
    { id: 1, category: 'microblading', alt: 'Microblading before and after' },
    { id: 5, category: 'microblading', alt: 'Natural microblading results' },
  ],
  'powder-brows': [
    { id: 2, category: 'powder-brows', alt: 'Powder brows transformation' },
    { id: 6, category: 'powder-brows', alt: 'Ombre powder brows' },
  ],
  eyeliner: [
    { id: 3, category: 'eyeliner', alt: 'Permanent eyeliner results' },
  ],
  'lip-blush': [
    { id: 4, category: 'lip-blush', alt: 'Lip blush before and after' },
  ],
};

export function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-charcoal mb-4">Our Work</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            See the stunning transformations we've created for our clients. Each result is tailored to enhance natural beauty.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="microblading">Microblading</TabsTrigger>
            <TabsTrigger value="powder-brows">Powder Brows</TabsTrigger>
            <TabsTrigger value="eyeliner">Eyeliner</TabsTrigger>
            <TabsTrigger value="lip-blush">Lip Blush</TabsTrigger>
          </TabsList>

          {Object.entries(portfolioImages).map(([category, images]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative w-full h-full">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJtYW5lbnQlMjBtYWtldXAlMjBleWVicm93c3xlbnwxfHx8fDE3NjE2MDY1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm capitalize">{image.category.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-charcoal/70 mb-4">
            Ready to transform your look?
          </p>
          <a
            href="https://booking.lindasbeautybar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-blush-pink text-charcoal rounded-lg hover:bg-blush-pink-dark transition-colors"
          >
            Schedule Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
