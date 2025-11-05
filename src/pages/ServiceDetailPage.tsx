import { useParams, navigate } from '../components/Router';
import { servicesData } from '../data/services';
import { ServiceDetail } from '../components/ServiceDetail';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function ServiceDetailPage() {
  const { id } = useParams('/service/:id');
  const service = servicesData.find(s => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-charcoal mb-4">Service Not Found</h1>
          <p className="text-charcoal/70 mb-6">The service you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/services')}
            className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-blush-pink-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigate('/')}
              className="text-charcoal/60 hover:text-blush-pink transition-colors"
            >
              Home
            </button>
            <span className="text-charcoal/40">/</span>
            <button 
              onClick={() => navigate('/services')}
              className="text-charcoal/60 hover:text-blush-pink transition-colors"
            >
              Services
            </button>
            <span className="text-charcoal/40">/</span>
            <span className="text-blush-pink">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Service Detail */}
      <ServiceDetail
        id={service.id}
        title={service.title}
        description={service.description}
        longDescription={service.longDescription}
        price={service.price}
        duration={service.duration}
        imageUrl={service.imageUrl}
        benefits={service.benefits}
        process={service.process}
        aftercare={service.aftercare}
        faqs={service.faqs}
      />

      {/* Related Services */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-charcoal mb-2">Related Services</h2>
            <p className="text-charcoal/70">Explore more services in {service.category}</p>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            {servicesData
              .filter(s => s.category === service.category && s.id !== service.id)
              .slice(0, 3)
              .map(relatedService => (
                <Button
                  key={relatedService.id}
                  onClick={() => navigate(`/service/${relatedService.id}`)}
                  variant="outline"
                  className="border-blush-pink text-blush-pink hover:bg-blush-pink-light"
                >
                  {relatedService.title}
                </Button>
              ))}
            <Button
              onClick={() => navigate('/services')}
              className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
