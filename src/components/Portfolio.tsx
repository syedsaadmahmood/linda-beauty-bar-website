import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Portfolio, PortfolioCategory } from '../data/types';

export function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [categories, setCategories] = useState<PortfolioCategory[]>([]);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const { getPortfolio, getPortfolioCategories } = await import('../utils/adminStorage');
        const [items, cats] = await Promise.all([
          getPortfolio(),
          getPortfolioCategories(),
        ]);
        setPortfolioItems(items);
        setCategories(cats);
      } catch (error) {
        console.error('Error loading portfolio:', error);
        setPortfolioItems([]);
        setCategories([]);
      }
    };
    loadPortfolio();
  }, []);

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
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id}>{cat.name}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => {
                const categoryName = categories.find(c => c.id === item.categoryId)?.name || '';
                return (
                  <div
                    key={item.id}
                    className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative w-full h-full">
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm capitalize">{categoryName.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {categories.map(category => {
            const categoryItems = portfolioItems.filter(item => item.categoryId === category.id);
            return (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
                    >
                      <div className="relative w-full h-full">
                        <ImageWithFallback
                          src={item.imageUrl}
                          alt={item.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm capitalize">{category.name.replace('-', ' ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-charcoal/70 mb-4">
            Ready to transform your look?
          </p>
          <a
            href="https://booking.lindasbeautybar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-blush-pink text-charcoal rounded-lg hover:bg-blush-pink-dark transition-colors cursor-pointer"
          >
            Schedule Your Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
