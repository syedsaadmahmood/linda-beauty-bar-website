import { Hero } from '../components/Hero';
import { ServicesOverview } from '../components/ServicesOverview';
import { Portfolio } from '../components/Portfolio';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Portfolio />
      <Testimonials />
      <About />
      <FAQ />
    </>
  );
}
