import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    service: 'Microblading',
    rating: 5,
    text: 'Linda is an absolute artist! My eyebrows look so natural and perfectly shaped. I wake up every morning feeling confident. Best decision I\'ve ever made!',
    date: 'October 2025',
  },
  {
    id: 2,
    name: 'Emily Chen',
    service: 'Powder Brows',
    rating: 5,
    text: 'I was nervous at first, but Linda made me feel so comfortable. The results are stunning - my brows look like I just had them filled in with makeup. Absolutely love it!',
    date: 'September 2025',
  },
  {
    id: 3,
    name: 'Jessica Martinez',
    service: 'Lip Blush',
    rating: 5,
    text: 'The lip blush procedure gave me the perfect natural tint I was looking for. Linda is so professional and talented. I recommend her to everyone!',
    date: 'September 2025',
  },
  {
    id: 4,
    name: 'Amanda Thompson',
    service: 'Permanent Eyeliner',
    rating: 5,
    text: 'I save so much time in the morning now! My eyeliner looks perfect every day. Linda\'s attention to detail is incredible. Thank you for making me feel beautiful!',
    date: 'August 2025',
  },
];

export function Testimonials() {
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
