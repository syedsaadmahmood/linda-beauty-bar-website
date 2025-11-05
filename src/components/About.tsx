import { Award, Users, Heart, GraduationCap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

const achievements = [
  {
    icon: Award,
    title: 'Certified Professional',
    description: 'Licensed and certified in permanent makeup with advanced training in all techniques',
  },
  {
    icon: Users,
    title: '5000+ Happy Clients',
    description: 'Over a decade of experience creating natural, beautiful results',
  },
  {
    icon: Heart,
    title: 'Client-Focused',
    description: 'Personalized consultations to understand your unique beauty goals',
  },
  {
    icon: GraduationCap,
    title: 'Educator & Mentor',
    description: 'Founder of Linda\'s Beauty Academy, training the next generation of artists',
  },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxNTk3NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Linda, professional permanent makeup artist"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blush-pink rounded-full opacity-20 -z-10"></div>
          </div>

          <div>
            <h2 className="text-4xl text-charcoal mb-6">About Linda</h2>
            <div className="space-y-4 text-charcoal/80">
              <p>
                Welcome to Linda's Beauty Bar! I'm Linda, a licensed and certified permanent makeup artist with over 10 years of experience in the beauty industry. My passion is helping clients feel confident and beautiful by enhancing their natural features.
              </p>
              <p>
                I specialize in creating customized, natural-looking results that complement your unique facial features and lifestyle. Whether you're looking for perfectly shaped eyebrows, defined eyes, or beautifully tinted lips, I take the time to understand your goals and deliver results that exceed expectations.
              </p>
              <p>
                My commitment to excellence extends beyond my own practice. As the founder of Linda's Beauty Academy, I'm dedicated to training aspiring permanent makeup artists with the highest standards of technique, safety, and artistry.
              </p>
              <p>
                Every client receives personalized attention in a comfortable, sterile environment using only the highest quality pigments and equipment. Your safety and satisfaction are my top priorities.
              </p>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="bg-blush-pink hover:bg-blush-pink-dark text-charcoal">
                <a href="https://booking.lindasbeautybar.com" target="_blank" rel="noopener noreferrer">
                  Book Your Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <Card key={index} className="text-center border-blush-pink-light/30">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blush-pink-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blush-pink" />
                  </div>
                  <h3 className="text-charcoal mb-2">{achievement.title}</h3>
                  <p className="text-sm text-charcoal/70">{achievement.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Academy CTA */}
        <Card className="mt-12 bg-gradient-to-r from-cream to-blush-pink-light border-blush-pink-light">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl text-charcoal mb-4">Linda's Beauty Academy</h3>
                <p className="text-charcoal/80 mb-4">
                  Are you passionate about permanent makeup? Join our professional training program and learn from industry experts. We offer comprehensive courses in microblading, powder brows, and more.
                </p>
                <Button asChild variant="outline" className="border-blush-pink text-blush-pink hover:bg-blush-pink-light">
                  <a href="https://lindasbeautyacademy.com" target="_blank" rel="noopener noreferrer">
                    Learn About Our Academy
                  </a>
                </Button>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1717500252010-d708ec89a0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjB0cmFpbmluZyUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjE3MDUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Linda's Beauty Academy training"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
