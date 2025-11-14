import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { navigate } from './Router';
import linda from '../assets/linda.png';

export function Hero() {
  return (
    <section id="home" className="relative bg-gradient-to-br from-cream to-blush-pink-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12">
          {/* Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl text-charcoal">
              Wake Up Beautiful Effortlessly,
              <br />
              Every Day
            </h1>
            <p className="text-xl text-charcoal/80">
              Expert permanent makeup services including microblading, powder brows, eyeliner, and lip blush.
              Enhance your natural beauty with our certified specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal">
                <a href="https://booking.lindasbeautybar.com" target="_blank" rel="noopener noreferrer">
                  Book Your Consultation
                </a>
              </Button>
              <Button onClick={() => navigate('/services')} size="lg" variant="outline" className="border-rose-gold text-rose-gold-dark hover:bg-rose-gold-light">
                View Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-blush-pink">
              <div>
                <div className="text-3xl text-blush-pink">6+</div>
                <div className="text-sm text-charcoal/70">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl text-blush-pink">100+</div>
                <div className="text-sm text-charcoal/70">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl text-blush-pink">20+</div>
                <div className="text-sm text-charcoal/70">5-Star Reviews</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={linda}
                alt="Linda, professional permanent makeup artist"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blush-pink rounded-full opacity-20 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-rose-gold rounded-full opacity-20 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
