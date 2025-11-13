import { Hero } from '../components/Hero';
import { ServicesOverview } from '../components/ServicesOverview';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <>
      <SEO
        metaTitle="Linda's Beauty Bar - Professional Permanent Makeup Services"
        metaDescription="Expert permanent makeup services including microblading, powder brows, eyeliner, and lip blush. Enhance your natural beauty with our certified specialists."
        tags={['permanent makeup', 'microblading', 'beauty services', 'cosmetic tattooing']}
      />
      <Hero />
      <ServicesOverview />
      <Portfolio />
      <Testimonials />
      <About />
      <FAQ />
    </>
  );
}
