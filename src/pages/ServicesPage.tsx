import { useState, useEffect } from 'react';
import { getServices, getCategories, getAllCategories, getCategoryById, getCategoryIcon, getCategoryNameById } from '../utils/adminStorage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { navigate, useSearchParams } from '../components/Router';
import { SEO } from '../components/SEO';
import type { Category } from '../data/types';
import * as lucideReact from 'lucide-react';

export function ServicesPage() {
  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get('category');
  const [selectedCategoryName, setSelectedCategoryName] = useState('All Services');
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>(['All Services']);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          getServices(),
          getCategories(),
        ]);
        setServices(servicesData);
        setCategories(categoriesData);
        const allCats = await getAllCategories(categoriesData);
        setAllCategories(allCats);
      } catch (error) {
        console.error('Error loading data:', error);
        setServices([]);
        setCategories([]);
        setAllCategories(['All Services']);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const updateSelectedCategory = async () => {
      if (categoryIdFromUrl) {
        const category = await getCategoryById(categoryIdFromUrl, categories);
        if (category) {
          setSelectedCategoryName(category.name);
        } else {
          setSelectedCategoryName('All Services');
        }
      } else {
        setSelectedCategoryName('All Services');
      }
    };
    updateSelectedCategory();
  }, [categoryIdFromUrl, categories]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategoryName(categoryName);
    if (categoryName === 'All Services') {
      navigate('/services');
    } else {
      const category = categories.find(cat => cat.name === categoryName);
      if (category) {
        navigate(`/services?category=${category.id}`);
      }
    }
  };

  // Filter services synchronously using the categories we already have
  const filteredServices = selectedCategoryName === 'All Services'
    ? services
    : services.filter(service => {
        const category = categories.find(cat => cat.id === service.categoryId);
        return category?.name === selectedCategoryName;
      });

  return (
    <>
      <SEO
        metaTitle="Our Services - Linda's Beauty Bar"
        metaDescription="Explore our comprehensive range of beauty services including microblading, powder brows, lip blush, eyeliner, and more."
        tags={['beauty services', 'permanent makeup', 'cosmetic services']}
      />
      <section className="py-20 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl text-charcoal mb-4">Our Services</h1>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Explore our comprehensive range of beauty services designed to enhance your natural beauty and boost your confidence.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allCategories.map((categoryName) => (
            <button
              key={categoryName}
              onClick={() => handleCategoryChange(categoryName)}
              className={`px-6 py-2 rounded-full transition-all cursor-pointer ${
                selectedCategoryName === categoryName
                  ? 'bg-blush-pink text-charcoal'
                  : 'bg-white text-charcoal hover:bg-blush-pink-light border border-blush-pink-light'
              }`}
            >
              {categoryName}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const category = categories.find(cat => cat.id === service.categoryId);
            const categoryName = category?.name || 'Service';
            
            // Get icon component synchronously
            let Icon: any = lucideReact.Droplet;
            if (category) {
              if (typeof category.icon === 'string') {
                const iconName = category.icon.trim();
                Icon = (lucideReact as any)[iconName] || lucideReact.Droplet;
              } else {
                Icon = category.icon;
              }
            }

            return (
              <Card 
                key={service.id} 
                className="hover:shadow-lg transition-all duration-300 border-blush-pink-light/30 bg-white group cursor-pointer"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-blush-pink-light rounded-lg flex items-center justify-center mb-4 group-hover:bg-blush-pink transition-colors">
                    <Icon className="w-6 h-6 text-blush-pink group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xs text-blush-pink mb-2">{categoryName}</div>
                  <CardTitle className="group-hover:text-blush-pink transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-2 line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-blush-pink">{service.price}</div>
                      <div className="text-sm text-charcoal/60">{service.duration}</div>
                    </div>
                  </div>
                  <Button 
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      navigate(`/service/${service.id}`);
                    }}
                    variant="outline" 
                    className="w-full border-blush-pink text-blush-pink hover:bg-blush-pink-light"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-blush-pink-light/30">
            <h2 className="text-3xl text-charcoal mb-4">Ready to Get Started?</h2>
            <p className="text-charcoal/70 mb-6">
              Book your consultation today and let our experts help you achieve your beauty goals.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              <a href="https://booking.lindasbeautybar.com" target="_blank" rel="noopener noreferrer">
                Book Your Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
