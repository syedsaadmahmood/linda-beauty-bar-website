import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { useState, useEffect } from 'react';
import type { FAQCategory, FAQItem } from '../data/types';

export function FAQ() {
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const { getFAQCategories } = await import('../utils/adminStorage');
        const data = await getFAQCategories();
        setFaqCategories(data);
      } catch (error) {
        console.error('Error loading FAQ categories:', error);
        setFaqCategories([]);
      }
    };
    loadFAQs();
  }, []);
  return (
    <section id="faq" className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blush-pink-light rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blush-pink" />
          </div>
          <h2 className="text-4xl text-charcoal mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Find answers to common questions about permanent makeup services, procedures, and aftercare.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-2xl text-charcoal mb-4">{category.category}</h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item: FAQItem) => (
                  <AccordionItem key={item.id} value={item.id} className="border-blush-pink-light/30">
                    <AccordionTrigger className="text-left hover:text-blush-pink">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-charcoal/70">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl text-charcoal mb-4">Still Have Questions?</h3>
          <p className="text-charcoal/70 mb-6">
            Can't find the answer you're looking for? We're here to help! Contact us directly and we'll be happy to assist you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+1234567890" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blush-pink text-white rounded-lg hover:bg-blush-pink-dark transition-colors cursor-pointer"
            >
              Call Us
            </a>
            <a 
              href="mailto:info@lindasbeautybar.com" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-blush-pink text-blush-pink rounded-lg hover:bg-blush-pink-light transition-colors cursor-pointer"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
