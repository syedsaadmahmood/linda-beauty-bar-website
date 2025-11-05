import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: 'Microblading vs. Powder Brows: Which is Right for You?',
    excerpt: 'Understanding the differences between microblading and powder brows can help you choose the perfect technique for your desired look and lifestyle.',
    author: 'Linda',
    date: 'October 15, 2025',
    category: 'Education',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJtYW5lbnQlMjBtYWtldXAlMjBleWVicm93c3xlbnwxfHx8fDE3NjE2MDY1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Complete Aftercare Guide for Permanent Makeup',
    excerpt: 'Proper aftercare is crucial for achieving the best results. Learn the do\'s and don\'ts of caring for your new permanent makeup.',
    author: 'Linda',
    date: 'October 8, 2025',
    category: 'Aftercare',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1632643746039-de953cb0f260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzYxNjA3Nzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'How Long Does Permanent Makeup Last?',
    excerpt: 'Exploring the longevity of different permanent makeup procedures and factors that affect how long your results will last.',
    author: 'Linda',
    date: 'October 1, 2025',
    category: 'FAQ',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYxNTk3NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'Preparing for Your First Permanent Makeup Appointment',
    excerpt: 'Everything you need to know before your appointment to ensure the best possible results and experience.',
    author: 'Linda',
    date: 'September 24, 2025',
    category: 'Tips',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1761470575018-135c213340eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcGElMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2MzQzNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: 'The Science Behind Permanent Makeup Pigments',
    excerpt: 'Learn about the advanced pigment technology used in permanent makeup and why quality matters for lasting, natural results.',
    author: 'Linda',
    date: 'September 17, 2025',
    category: 'Education',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1552256029-4e3aa83bbe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHRhdHRvb3xlbnwxfHx8fDE3NjE3MDUwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    title: 'Common Myths About Permanent Makeup Debunked',
    excerpt: 'Separating fact from fiction about permanent makeup procedures, safety, and results.',
    author: 'Linda',
    date: 'September 10, 2025',
    category: 'Education',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1632643746039-de953cb0f260?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMGVsZWdhbnR8ZW58MXx8fHwxNzYxNjA3Nzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Blog() {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-charcoal mb-4">Educational Blog</h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Stay informed with expert insights, tips, and educational content about permanent makeup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden group border-blush-pink-light/30">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-charcoal/60 mb-2">
                  <span className="px-2 py-1 bg-blush-pink-light text-blush-pink rounded text-xs">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-blush-pink transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-charcoal/60">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-blush-pink hover:text-blush-pink-dark hover:bg-blush-pink-light group/btn">
                  Read More 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-blush-pink text-blush-pink hover:bg-blush-pink-light">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
