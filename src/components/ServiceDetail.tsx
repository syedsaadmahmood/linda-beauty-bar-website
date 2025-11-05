import { CheckCircle, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ServiceDetailProps {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  duration: string;
  imageUrl: string;
  benefits: string[];
  process: string[];
  aftercare: string[];
  faqs: { question: string; answer: string }[];
}

export function ServiceDetail({
  id,
  title,
  description,
  longDescription,
  price,
  duration,
  imageUrl,
  benefits,
  process,
  aftercare,
  faqs,
}: ServiceDetailProps) {
  return (
    <section id={`service-${id}`} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl text-charcoal mb-4">{title}</h2>
            <p className="text-xl text-charcoal/70 mb-6">{description}</p>
            <p className="text-charcoal/80 mb-6">{longDescription}</p>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blush-pink" />
                <div>
                  <div className="text-sm text-charcoal/60">Starting at</div>
                  <div className="text-blush-pink">{price}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blush-pink" />
                <div>
                  <div className="text-sm text-charcoal/60">Duration</div>
                  <div className="text-charcoal">{duration}</div>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal">
              <a href="https://booking.lindasbeautybar.com" target="_blank" rel="noopener noreferrer">
                Book This Service
              </a>
            </Button>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Benefits */}
        <Card className="mb-8 border-blush-pink-light/30">
          <CardContent className="pt-6">
            <h3 className="text-2xl text-charcoal mb-4">Benefits</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blush-pink flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal/80">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Process */}
        <Card className="mb-8 border-blush-pink-light/30">
          <CardContent className="pt-6">
            <h3 className="text-2xl text-charcoal mb-4">The Process</h3>
            <div className="space-y-4">
              {process.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-8 h-8 bg-blush-pink text-charcoal rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-charcoal/80">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aftercare */}
        <Card className="mb-8 border-blush-pink-light/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-blush-pink flex-shrink-0" />
              <h3 className="text-2xl text-charcoal">Aftercare Instructions</h3>
            </div>
            <ul className="space-y-2">
              {aftercare.map((instruction, index) => (
                <li key={index} className="flex gap-3 text-charcoal/80">
                  <span className="text-blush-pink">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* FAQs */}
        <div>
          <h3 className="text-2xl text-charcoal mb-6">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-blush-pink-light/30">
                <CardContent className="pt-6">
                  <h4 className="text-charcoal mb-2">{faq.question}</h4>
                  <p className="text-charcoal/80">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
