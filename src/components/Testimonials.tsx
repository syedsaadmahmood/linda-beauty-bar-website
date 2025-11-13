import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useState, useEffect } from 'react';
import type { Testimonial } from '../data/types';

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const { getTestimonials } = await import('../utils/adminStorage');
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials([]);
      }
    };
    loadTestimonials();
  }, []);
  return (
    <section className="py-20 bg-gradient-to-br from-cream to-blush-pink-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-charcoal mb-4">What Our Clients Say</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Read testimonials from our satisfied clients who have experienced the confidence-boosting benefits of permanent makeup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white border-blush-pink-light/30">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-blush-pink text-blush-pink" />
                  ))}
                </div>
                <p className="text-charcoal/80 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-between items-center pt-4 border-t border-blush-pink-light/50">
                  <div>
                    <div className="text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-charcoal/60">{testimonial.service}</div>
                  </div>
                  <div className="text-sm text-charcoal/60">{testimonial.date}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-white rounded-lg shadow-md px-8 py-6">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-4xl text-blush-pink">4.9</div>
                <div className="flex gap-1 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blush-pink text-blush-pink" />
                  ))}
                </div>
                <div className="text-sm text-charcoal/70 mt-1">Average Rating</div>
              </div>
              <div className="h-12 w-px bg-charcoal/20"></div>
              <div className="text-center">
                <div className="text-4xl text-blush-pink">500+</div>
                <div className="text-sm text-charcoal/70 mt-1">5-Star Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
