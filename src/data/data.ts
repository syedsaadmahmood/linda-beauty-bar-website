// Consolidated Data File
// All data types are imported from ./types.ts
// All data arrays are exported here

import { Brush, Smile, Heart, Eye, Dumbbell, Sparkles, Droplet, type LucideIcon } from 'lucide-react';
import type {
  Service,
  Category,
  Testimonial,
  FAQCategory,
  PortfolioCategory,
  Portfolio,
  ServiceHighlight,
} from './types';

export const servicesData: Service[] = [
  // EYEBROW SERVICES
  {
    id: 'ombre-powder-brows',
    title: 'Ombre Powder Brows',
    categoryId: 'eyebrow-services',
    description: 'A semi-permanent makeup technique that creates a soft, shaded brow look',
    longDescription: 'Ombre Powder Brows is a semi-permanent makeup technique that creates a soft, shaded brow look using a pixelated application method. This results in beautifully defined and filled brows with a gradient effect that\'s lighter at the front and gradually darker toward the tail. Perfect for those who want a polished, makeup-filled look that lasts.',
    price: '$350',
    duration: '120 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Soft, powdered makeup look that lasts',
      'Perfect for all skin types, especially oily skin',
      'More defined look than microblading',
      'Longer-lasting results (2-3 years)',
      'Ideal for those who fill in their brows daily',
      'Beautiful gradient effect from light to dark',
      'Less frequent touch-ups required',
      'Great for mature skin or sparse brows',
    ],
    process: [
      'Consultation: Discuss your brow goals and design the perfect shape with an ombre gradient',
      'Brow Mapping: Precise measurements ensure symmetry and ideal shape for your facial structure',
      'Numbing: Topical anesthetic is applied for maximum comfort',
      'Shading: Using a digital machine, we create thousands of tiny dots to build up color gradually',
      'Gradient Creation: The front of the brow is kept lighter for a natural, soft appearance',
      'Color Perfection: Ensure even saturation and the perfect shade for your complexion',
    ],
    aftercare: [
      'Keep brows completely dry for 7-10 days',
      'Apply healing ointment 2-3 times daily',
      'Expect some darkening initially - color will soften during healing',
      'No picking or scratching at scabs',
      'Avoid direct sun exposure and tanning',
      'No swimming, saunas, or steam rooms for 2 weeks',
      'Sleep on your back if possible',
      'No brow makeup during the healing process',
    ],
    faqs: [
      {
        question: 'What\'s the difference between powder brows and microblading?',
        answer: 'Microblading creates hair-like strokes for a natural look, while powder brows create a soft, filled-in effect similar to makeup. Powder brows tend to last longer and work better for oily skin types.',
      },
      {
        question: 'How long do powder brows last?',
        answer: 'Powder brows typically last 2-3 years with proper care. They tend to last longer than microblading.',
      },
      {
        question: 'Is the procedure painful?',
        answer: 'We use numbing cream to minimize discomfort. Most clients rate the sensation as a 2-3 out of 10.',
      },
    ],
  },
  {
    id: 'ombre-brow-annual-touchup',
    title: 'Ombre Brow Annual Touch Up',
    categoryId: 'eyebrow-services',
    description: 'Maintain your ombre brows with an annual refresh',
    longDescription: 'This is an ombre brow annual touch up for clients 3-18 months post last ombre brow appointment. Keep your brows looking fresh and vibrant with regular maintenance.',
    price: '$200',
    duration: '90 min',
    deposit: '$40',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Refresh faded color',
      'Maintain crisp definition',
      'Quick procedure with less downtime',
      'Keep your brows looking perfect year-round',
    ],
    process: [
      'Assessment of existing brows',
      'Color refresh application',
      'Shape refinement if needed',
      'Final review and adjustments',
    ],
    aftercare: [
      'Follow same aftercare as initial procedure',
      'Healing time is typically faster',
      'Keep area clean and dry',
      'Apply healing ointment as directed',
    ],
    faqs: [
      {
        question: 'When should I book my annual touch-up?',
        answer: 'We recommend scheduling your touch-up between 3-18 months after your last appointment to maintain optimal results.',
      },
    ],
  },
  {
    id: 'ombre-brows-4-6-week-touchup',
    title: 'Ombre Brows 4-6 Week Touch Up',
    categoryId: 'eyebrow-services',
    description: 'Perfecting session for recent ombre brow clients',
    longDescription: 'This is a service for previous clients only 4-6 weeks post initial session. This perfecting session ensures your brows heal beautifully and achieve the best possible results.',
    price: '$100',
    duration: '65 min',
    deposit: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Perfect any areas that need additional pigment',
      'Ensure even color saturation',
      'Make minor shape adjustments',
      'Achieve optimal final results',
    ],
    process: [
      'Evaluate healed results',
      'Add pigment to areas as needed',
      'Ensure symmetry and perfection',
      'Final touches for flawless brows',
    ],
    aftercare: [
      'Follow standard aftercare guidelines',
      'Keep brows dry for 7-10 days',
      'Apply healing ointment as directed',
    ],
    faqs: [
      {
        question: 'Is this touch-up required?',
        answer: 'While not mandatory, it\'s highly recommended to achieve the best possible results and ensure even color retention.',
      },
    ],
  },
  {
    id: 'microblading',
    title: 'Microblading',
    categoryId: 'eyebrow-services',
    description: 'Natural looking, fuller brows with hair-like strokes',
    longDescription: 'Microblading is a semi-permanent makeup technique that creates natural-looking eyebrow hair strokes using a manual hand tool with ultra-fine needles. Each stroke is individually placed to mimic the natural direction and pattern of your brow hair, resulting in beautifully defined, yet completely natural-looking eyebrows. Results last 12-18 months.',
    price: '$350',
    duration: '60 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Wake up with perfect brows every day',
      'Save time on your daily makeup routine',
      'Natural-looking, hair-like strokes',
      'Customized shape and color to match your features',
      'Long-lasting results (12-18 months)',
      'Water-resistant and smudge-proof',
      'Ideal for sparse, thin, or over-plucked brows',
    ],
    process: [
      'Consultation: Discuss desired brow shape, color, and style',
      'Brow Mapping: Map out the perfect brow design for your face',
      'Numbing: Topical anesthetic for comfort',
      'Microblading: Create fine, hair-like strokes with specialized hand tool',
      'Color Application: Premium pigments matched to your natural brow color',
      'Final Review: Ensure complete satisfaction with shape and color',
    ],
    aftercare: [
      'Keep the area clean and dry for 7-10 days',
      'Apply provided healing ointment as directed',
      'Avoid getting brows wet during healing period',
      'Do not pick, scratch, or rub the treated area',
      'Avoid sun exposure and tanning beds for 2 weeks',
      'No swimming or excessive sweating for 10 days',
      'Avoid makeup on brow area during healing',
    ],
    faqs: [
      {
        question: 'Does microblading hurt?',
        answer: 'Most clients report minimal discomfort. We use topical numbing cream to ensure comfort throughout the procedure.',
      },
      {
        question: 'How long does microblading last?',
        answer: 'Microblading typically lasts 12-18 months. We recommend annual maintenance to keep brows looking their best.',
      },
    ],
  },
  {
    id: 'microblading-annual-touchup',
    title: 'Microblading Annual Touch Up',
    categoryId: 'eyebrow-services',
    description: 'Annual refresh for microbladed brows',
    longDescription: 'This is an annual touch up 3-18 months post last Microblading session. Keep your hair-stroke brows looking fresh and natural with regular maintenance.',
    price: '$200',
    duration: '90 min',
    deposit: '$40',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Refresh faded strokes',
      'Maintain crisp hair-like definition',
      'Quick maintenance session',
      'Keep natural-looking brows year-round',
    ],
    process: [
      'Assess existing microblading',
      'Refresh faded hair strokes',
      'Add new strokes as needed',
      'Perfect the overall shape',
    ],
    aftercare: [
      'Follow same aftercare as initial procedure',
      'Faster healing time expected',
      'Keep area clean and dry',
      'Apply healing ointment',
    ],
    faqs: [
      {
        question: 'When should I schedule my touch-up?',
        answer: 'Book your annual touch-up between 3-18 months after your last session for best results.',
      },
    ],
  },
  {
    id: 'microblading-4-8-week-touchup',
    title: 'Microblading 4-8 Week Touch Up',
    categoryId: 'eyebrow-services',
    description: 'Perfecting session for recent microblading clients',
    longDescription: 'This is a service for previous clients 4-6 weeks post initial session. Perfect any areas and ensure optimal healing results.',
    price: '$100',
    duration: '60 min',
    deposit: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Perfect stroke retention',
      'Add strokes where needed',
      'Ensure symmetry',
      'Achieve final perfection',
    ],
    process: [
      'Evaluate healed microblading',
      'Add additional strokes as needed',
      'Perfect color and shape',
      'Final adjustments',
    ],
    aftercare: [
      'Follow standard aftercare',
      'Keep brows dry for 7-10 days',
      'Apply healing ointment',
    ],
    faqs: [
      {
        question: 'Is this touch-up necessary?',
        answer: 'Highly recommended to perfect your results and ensure best possible outcome.',
      },
    ],
  },
  {
    id: 'henna-brows',
    title: 'Henna Brows',
    categoryId: 'eyebrow-services',
    description: 'Professional brow mapping, shaping, and henna tint',
    longDescription: 'A professional service that includes precise brow mapping to determine the ideal shape for your face, followed by expert shaping techniques to enhance your natural brows, finished with a henna tint for beautiful definition that lasts.',
    price: '$50',
    duration: '45 min',
    deposit: '$20',
    imageUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Natural plant-based tint',
      'Perfect brow mapping and shaping',
      'Temporary color (lasts 2-4 weeks)',
      'No commitment - great way to try a new shape',
      'Gentle on sensitive skin',
      'Stains the skin for fuller appearance',
    ],
    process: [
      'Professional brow mapping',
      'Expert shaping and hair removal',
      'Custom henna tint application',
      'Perfect your brow color and definition',
    ],
    aftercare: [
      'Avoid water on brows for 24 hours',
      'No oil-based products on brows',
      'Avoid exfoliating the brow area',
      'Reapply every 2-4 weeks as needed',
    ],
    faqs: [
      {
        question: 'How long does henna last?',
        answer: 'Henna tint typically lasts 2-4 weeks, gradually fading with natural skin cell turnover.',
      },
      {
        question: 'Is henna safe for sensitive skin?',
        answer: 'Yes! Henna is a natural, plant-based option that\'s generally gentler than traditional tints.',
      },
    ],
  },

  // LIP SERVICES
  {
    id: 'lip-blush',
    title: 'Lip Blush',
    categoryId: 'lip-services',
    description: 'Semi-permanent lip color for a naturally tinted, fuller look',
    longDescription: 'A semi permanent tattoo that enhances the natural color and shape of your lips, giving them a soft, tinted look. Perfect for a fuller, more defined pout without daily lipstick. Correct asymmetry, enhance shape, and enjoy a youthful appearance.',
    price: '$300',
    duration: '10 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1552256029-4e3aa83bbe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Natural-looking color enhancement',
      'Correct lip asymmetry and improve shape',
      'Wake up with beautifully tinted lips',
      'Reduce appearance of fine lines around lips',
      'Create the illusion of fuller lips',
      'Even out lip color and tone',
      'No more reapplying lipstick throughout the day',
    ],
    process: [
      'Consultation: Discuss desired lip color and shape goals',
      'Color Selection: Choose perfect custom shade for your skin tone',
      'Lip Mapping: Precise measurements ensure symmetry',
      'Numbing: Multiple applications for maximum comfort',
      'Color Application: Build color gradually in layers',
      'Final Adjustments: Ensure symmetry and satisfaction',
    ],
    aftercare: [
      'Expect significant swelling for 2-3 days',
      'Keep lips moisturized with provided ointment',
      'Avoid hot or spicy foods for 1 week',
      'Use a straw for drinking first few days',
      'No kissing or lip contact for 1 week',
      'Avoid sun exposure on lips',
      'Do not peel dry skin - let it shed naturally',
      'Color will appear very dark initially, then lighten 40-50%',
    ],
    faqs: [
      {
        question: 'Will lip blush look natural?',
        answer: 'Yes! We create a subtle, natural tint that enhances your lips\' natural color, not heavy lipstick.',
      },
      {
        question: 'How much swelling should I expect?',
        answer: 'Lips will swell significantly for 2-3 days. This is normal. Ice and keeping your head elevated helps.',
      },
      {
        question: 'How long does lip blush last?',
        answer: 'Lip blush typically lasts 2-3 years. Annual touch-ups help maintain vibrant color.',
      },
    ],
  },
  {
    id: 'lip-blush-annual-touchup',
    title: 'Lip Blush Annual Touch Up',
    categoryId: 'lip-services',
    description: 'Annual refresh for lip blush clients',
    longDescription: 'This is an annual lip blush touch up 3-18 months after last session. Refresh your lip color and maintain that beautiful tinted look.',
    price: '$200',
    duration: '80 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1552256029-4e3aa83bbe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Refresh faded lip color',
      'Maintain definition and shape',
      'Quick maintenance procedure',
      'Keep lips looking youthful',
    ],
    process: [
      'Assess existing lip blush',
      'Color refresh application',
      'Shape refinement if needed',
      'Perfect the final look',
    ],
    aftercare: [
      'Follow same aftercare as initial session',
      'Expect less swelling than first time',
      'Keep lips moisturized',
      'Avoid hot/spicy foods for a few days',
    ],
    faqs: [
      {
        question: 'When should I book my lip blush touch-up?',
        answer: 'Schedule between 3-18 months after your last session to maintain vibrant color.',
      },
    ],
  },
  {
    id: 'lip-blush-4-6-week-touchup',
    title: 'Lip Blush 4-6 Week Touch Up',
    categoryId: 'lip-services',
    description: 'Perfecting session for recent lip blush clients',
    longDescription: 'This is a service for previous clients 4-6 weeks post initial lip blush appointment. Perfect the color and ensure beautiful healing.',
    price: '$100',
    duration: '65 min',
    deposit: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1552256029-4e3aa83bbe2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Perfect color saturation',
      'Ensure even pigment retention',
      'Make any needed adjustments',
      'Achieve optimal final results',
    ],
    process: [
      'Evaluate healed lip blush',
      'Add pigment where needed',
      'Perfect symmetry and color',
      'Final touches',
    ],
    aftercare: [
      'Follow standard aftercare',
      'Keep lips moisturized',
      'Avoid irritating foods',
    ],
    faqs: [
      {
        question: 'Is this touch-up required?',
        answer: 'Highly recommended to perfect your results and ensure the best possible color retention.',
      },
    ],
  },

  // PARAMEDICAL TATTOO SERVICES
  {
    id: '3d-areola-reconstructive',
    title: '3D Areola Reconstructive Tattoo',
    categoryId: 'paramedical-tattoo',
    description: 'Restore natural appearance after mastectomy or breast surgery',
    longDescription: 'Paramedical tattoo procedure that restores the natural look of the nipple after mastectomy, breast surgery, or trauma. Using advanced shading techniques and custom pigments, this service creates a realistic three-dimensional appearance that enhances confidence and body image.',
    price: '$250+',
    duration: '90 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Realistic 3D nipple appearance',
      'Custom color matching',
      'Restore confidence after surgery',
      'Non-invasive procedure',
      'Long-lasting results',
      'Symmetry restoration',
      'Compassionate, private service',
    ],
    process: [
      'Consultation: Discuss goals and assess area',
      'Color Matching: Custom pigment selection',
      'Design: Create realistic 3D areola design',
      'Application: Carefully tattoo with shading techniques',
      'Review: Ensure satisfaction with results',
    ],
    aftercare: [
      'Keep area clean and dry',
      'Apply healing ointment as directed',
      'Avoid tight clothing that may rub',
      'No swimming or soaking for 2 weeks',
      'Protect from sun exposure',
      'Follow all post-surgical care guidelines',
    ],
    faqs: [
      {
        question: 'When can I get this procedure after surgery?',
        answer: 'You should wait until fully healed from surgery, typically 3-6 months. Consult with your surgeon first.',
      },
      {
        question: 'Does insurance cover this?',
        answer: 'Some insurance plans may cover areola tattooing post-mastectomy. We can provide documentation for your claim.',
      },
      {
        question: 'How realistic does it look?',
        answer: 'We use advanced 3D shading techniques to create incredibly realistic results that restore confidence.',
      },
    ],
  },
  {
    id: 'scar-camouflage',
    title: 'Scar Camouflage',
    categoryId: 'paramedical-tattoo',
    description: 'Reduce visibility of scars, stretch marks, and healed injuries',
    longDescription: 'Natural looking paramedical tattooing that blends scar tissue into surrounding skin tone. Minimally invasive, long-lasting results designed to reduce the contrast and visibility of surgical scars, stretch marks, and healed injuries. Consultation required to assess suitability.',
    price: '$150+',
    duration: '45 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Reduce scar visibility',
      'Blend scars with surrounding skin',
      'Boost confidence',
      'Minimally invasive',
      'Long-lasting results',
      'Works on various scar types',
      'Custom color matching',
    ],
    process: [
      'Consultation: Assess scar and discuss goals (required)',
      'Color Matching: Create custom pigment blend',
      'Test Patch: Ensure proper color match',
      'Camouflage Application: Carefully tattoo scar tissue',
      'Blending: Seamlessly blend with surrounding skin',
      'Review and touch-up planning',
    ],
    aftercare: [
      'Keep area clean and dry',
      'Apply healing ointment',
      'Avoid sun exposure for optimal healing',
      'No swimming or soaking for 2 weeks',
      'Protect treated area from friction',
      'Multiple sessions may be needed for best results',
    ],
    faqs: [
      {
        question: 'What types of scars can be treated?',
        answer: 'We can treat surgical scars, stretch marks, burn scars, and injury scars. The scar must be fully healed (at least 1 year old).',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'Most scars require 2-3 sessions for optimal camouflage, depending on scar size and depth.',
      },
      {
        question: 'Is a consultation required?',
        answer: 'Yes, consultation is required to assess if your scar is suitable for camouflage and to plan treatment.',
      },
    ],
  },
  {
    id: 'paramedical-tattoo-complementary',
    title: 'Paramedical Tattoo Complementary Session',
    categoryId: 'paramedical-tattoo',
    description: 'Complimentary perfecting session post initial treatment',
    longDescription: 'This is a complementary session 6 weeks post paramedical tattoo initial session. Allows us to assess healing and perfect the results at no additional charge.',
    price: '$0',
    duration: '40 min',
    deposit: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Complimentary follow-up',
      'Perfect initial results',
      'Ensure optimal healing',
      'Make any needed adjustments',
    ],
    process: [
      'Assess healed results',
      'Add pigment if needed',
      'Perfect color matching',
      'Final touches',
    ],
    aftercare: [
      'Follow standard aftercare',
      'Keep area clean',
      'Protect from sun',
    ],
    faqs: [
      {
        question: 'When should I book this session?',
        answer: 'Schedule this 6 weeks after your initial paramedical tattoo session.',
      },
    ],
  },

  // LASH EXTENSION SERVICES
  {
    id: 'classic-full-set',
    title: 'Classic Full Set',
    categoryId: 'lash-extensions',
    description: 'Natural, timeless lash extensions - one lash per natural lash',
    longDescription: 'A natural and timeless look where one lightweight extension is applied to each natural lash, creating added length, curl, and definition. Perfect for clients who want a simple, elegant enhancement that mimics the look of mascara without the daily effort.',
    price: '$120',
    duration: '150 min',
    deposit: '$20',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Natural, elegant enhancement',
      'Customizable length and curl',
      'Lightweight and comfortable',
      'No daily mascara needed',
      'Wake up ready',
      'Perfect for everyday wear',
      'Subtle definition',
    ],
    process: [
      'Consultation: Discuss desired length and curl',
      'Lash Mapping: Design custom lash look',
      'Application: One extension per natural lash',
      'Careful placement for natural appearance',
      'Final styling and review',
    ],
    aftercare: [
      'Avoid water for 24 hours',
      'No oil-based products near eyes',
      'Brush lashes daily with spoolie',
      'Sleep on your back if possible',
      'Book fill appointments every 2-3 weeks',
      'Use provided lash cleanser',
    ],
    faqs: [
      {
        question: 'How long do lash extensions last?',
        answer: 'With proper care and regular fills every 2-3 weeks, lash extensions can be maintained indefinitely.',
      },
      {
        question: 'Will extensions damage my natural lashes?',
        answer: 'When applied properly by a trained professional, lash extensions do not damage natural lashes.',
      },
    ],
  },
  {
    id: 'wet-lash-full-set',
    title: 'Full Set Of Wet Lash Extensions',
    categoryId: 'lash-extensions',
    description: 'Fully customized wet-look lash extension set',
    longDescription: 'Fully customized eyelash extension set designed just for you! Includes a complementary at-home care package to keep your lashes looking flawless. The wet lash look creates a glossy, freshly-applied mascara appearance.',
    price: '$125',
    duration: '150 min',
    deposit: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Glossy, wet-look finish',
      'Fully customized design',
      'Includes at-home care package',
      'Trendy, modern appearance',
      'Adds drama and definition',
      'Customizable to your style',
    ],
    process: [
      'Consultation: Design your custom wet lash look',
      'Lash Mapping: Plan placement for wet effect',
      'Application: Carefully apply extensions',
      'Wet-look styling technique',
      'Final review and care package',
    ],
    aftercare: [
      'Avoid water for 24 hours',
      'No oil-based products',
      'Brush daily with provided spoolie',
      'Sleep on back to preserve style',
      'Book fills every 2-3 weeks',
      'Use lash cleanser from care package',
    ],
    faqs: [
      {
        question: 'What makes wet lashes different?',
        answer: 'Wet lashes have a glossy, just-applied mascara look that\'s more dramatic than classic sets.',
      },
    ],
  },
  {
    id: 'hybrid-full-set',
    title: 'Hybrid Full Set',
    categoryId: 'lash-extensions',
    description: 'Mix of classic and volume techniques for soft fullness',
    longDescription: 'A beautiful mix of classic and volume techniques, combining individual lashes with lightweight fans. This set gives more fullness than classic while still looking soft and natural. Perfect for those who want dimension and texture.',
    price: '$130',
    duration: '10 min',
    deposit: '$30',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'More fullness than classic',
      'Still soft and natural looking',
      'Mix of textures for dimension',
      'Customizable density',
      'Perfect balance of natural and glam',
      'Longer-lasting than classic alone',
    ],
    process: [
      'Consultation: Determine hybrid ratio',
      'Lash Mapping: Plan classic and volume placement',
      'Mixed Application: Combine techniques strategically',
      'Create dimension and texture',
      'Final styling and review',
    ],
    aftercare: [
      'Avoid water for 24 hours',
      'No oil-based products',
      'Brush lashes daily',
      'Sleep on back when possible',
      'Book fills every 2-3 weeks',
    ],
    faqs: [
      {
        question: 'What\'s the difference between hybrid and classic?',
        answer: 'Hybrid combines classic single lashes with volume fans for more fullness while maintaining a natural look.',
      },
    ],
  },
  {
    id: 'volume-full-set',
    title: 'Volume Full Set',
    categoryId: 'lash-extensions',
    description: 'Lush, fluffy, dramatic lashes with ultra-lightweight fans',
    longDescription: 'A lush, fluffy look created by applying ultra-lightweight fans to each natural lash. Adds noticeable fullness, depth, and drama. Perfect for clients who love bold, glamorous lashes and want maximum impact.',
    price: '$145',
    duration: '150 min',
    deposit: '$45',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Maximum fullness and drama',
      'Fluffy, dimensional look',
      'Ultra-lightweight fans',
      'Bold, glamorous appearance',
      'Perfect for special occasions or daily glam',
      'Creates depth and texture',
      'Long-lasting fullness',
    ],
    process: [
      'Consultation: Discuss desired drama level',
      'Lash Mapping: Plan volume fan placement',
      'Fan Creation: Handcraft lightweight fans',
      'Application: Apply fans to each natural lash',
      'Build fullness and dimension',
      'Final styling for maximum impact',
    ],
    aftercare: [
      'Avoid water for 24 hours',
      'No oil-based products',
      'Gentle brushing daily',
      'Sleep on back to preserve volume',
      'Book fills every 2-3 weeks',
      'Use lash cleanser regularly',
    ],
    faqs: [
      {
        question: 'Will volume lashes look fake?',
        answer: 'Not at all! We use ultra-lightweight fans that look fluffy and dimensional, not heavy or fake.',
      },
      {
        question: 'How many lashes are in each fan?',
        answer: 'We typically use 2-6 lashes per fan, customized to create your desired fullness.',
      },
    ],
  },
  {
    id: 'lash-refill-2-3-weeks',
    title: 'Lash Extension Refill 2-3 Weeks',
    categoryId: 'lash-extensions',
    description: 'Maintenance fill to keep lashes full and voluminous',
    longDescription: 'A maintenance service to fill in any gaps or areas where lash extensions have shed, ensuring a full and voluminous lash look is maintained between full sets. Essential for keeping your lashes looking fresh.',
    price: '$75',
    duration: '110 min',
    deposit: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Maintain full lash look',
      'Fill in naturally shed lashes',
      'Quick maintenance appointment',
      'Keep lashes looking fresh',
      'More cost-effective than new set',
    ],
    process: [
      'Remove any outgrown extensions',
      'Clean lashes thoroughly',
      'Fill in gaps with new extensions',
      'Ensure even fullness',
      'Final styling',
    ],
    aftercare: [
      'Continue regular lash care routine',
      'Brush daily',
      'Use lash cleanser',
      'Book next fill in 2-3 weeks',
    ],
    faqs: [
      {
        question: 'How often should I get fills?',
        answer: 'We recommend fills every 2-3 weeks to maintain optimal fullness.',
      },
      {
        question: 'What if I wait longer than 3 weeks?',
        answer: 'If more than 40-50% of lashes have shed, a new full set may be needed instead of a fill.',
      },
    ],
  },
  {
    id: 'lash-removal-and-bath',
    title: 'Lash Removal And Bath',
    categoryId: 'lash-extensions',
    description: 'Gentle removal and deep cleansing for natural lashes',
    longDescription: 'Gently removes lash extensions without damage to your natural lashes, followed by a deep cleansing bath to eliminate any residue, oils, and buildup. Leaves your natural lashes clean and healthy.',
    price: '$35',
    duration: '55 min',
    deposit: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Safe, gentle removal',
      'No damage to natural lashes',
      'Deep cleansing treatment',
      'Removes all residue and buildup',
      'Healthy, clean natural lashes',
      'Fresh start for new set or lash break',
    ],
    process: [
      'Apply remover gel',
      'Gently remove all extensions',
      'Deep cleansing bath',
      'Remove all adhesive residue',
      'Condition natural lashes',
      'Final assessment',
    ],
    aftercare: [
      'Your natural lashes are now clean and healthy',
      'Continue with good lash hygiene',
      'Consider lash serum for growth',
      'Schedule new set when ready',
    ],
    faqs: [
      {
        question: 'Will removal damage my natural lashes?',
        answer: 'No! Professional removal is gentle and safe when done correctly.',
      },
      {
        question: 'Can I remove extensions at home?',
        answer: 'We strongly recommend professional removal to avoid damaging your natural lashes.',
      },
    ],
  },
  {
    id: 'foreign-lash-fill',
    title: 'Foreign Lash Fill',
    categoryId: 'lash-extensions',
    description: 'Fill service for new clients with existing extensions',
    longDescription: 'This is a 2-3 week lash fill for new clients coming for the first time with existing extensions from another salon. Includes your at-home care package to get you started with proper maintenance.',
    price: '$95',
    duration: '120 min',
    deposit: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Transition to our salon seamlessly',
      'Assessment of existing work',
      'Includes care package',
      'Fresh lashes maintained',
      'Expert evaluation and fill',
    ],
    process: [
      'Assess existing extensions',
      'Remove any problematic lashes',
      'Fill in gaps',
      'Ensure health of natural lashes',
      'Provide care package and education',
    ],
    aftercare: [
      'Follow care package instructions',
      'Brush lashes daily',
      'Use provided cleanser',
      'Book next fill in 2-3 weeks',
    ],
    faqs: [
      {
        question: 'Why is the foreign fill price different?',
        answer: 'We need extra time to assess and work with extensions applied by another technician.',
      },
    ],
  },

  // BODY SCULPTING SERVICES
  {
    id: 'body-sculpting-50min-1area',
    title: 'Body Sculpting 50 Min Session (1 Area)',
    categoryId: 'body-sculpting',
    description: 'Non-invasive body contouring with cavitation, RF, lipo laser & wood therapy',
    longDescription: 'One area only. 60 minute session includes a mix of cavitation, radio frequency, lipo laser, and wood therapy. Non-invasive treatments to target stubborn fat, tighten skin, and contour your body.',
    price: '$80',
    duration: '60 min',
    deposit: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Non-invasive fat reduction',
      'Skin tightening',
      'Body contouring',
      'No downtime',
      'Combines multiple technologies',
      'Visible results after series of treatments',
      'Safe and effective',
    ],
    process: [
      'Consultation and area assessment',
      'Cavitation treatment to target fat',
      'Radio frequency for skin tightening',
      'Lipo laser application',
      'Wood therapy massage and contouring',
      'Post-treatment recommendations',
    ],
    aftercare: [
      'Drink plenty of water',
      'Light exercise recommended',
      'Maintain healthy diet',
      'Avoid alcohol for 24 hours',
      'Multiple sessions recommended for best results',
    ],
    faqs: [
      {
        question: 'How many sessions will I need?',
        answer: 'Most clients see best results with 6-12 sessions, depending on goals and target area.',
      },
      {
        question: 'Is there any downtime?',
        answer: 'No downtime! You can return to normal activities immediately.',
      },
    ],
  },
  {
    id: 'body-sculpting-75min-2areas',
    title: '75 Min Session (2 Areas)',
    categoryId: 'body-sculpting',
    description: 'Extended body sculpting session for two treatment areas',
    longDescription: 'This is a 75 minute session covering up to 2 areas. Includes cavitation, radio frequency, lipo laser, and wood therapy for comprehensive body contouring.',
    price: '$100',
    duration: '75 min',
    deposit: 'None',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Treat two areas in one session',
      'Comprehensive contouring',
      'Multiple technologies combined',
      'Time-efficient',
      'Better value for multiple areas',
      'Effective fat reduction and tightening',
    ],
    process: [
      'Assess both treatment areas',
      'Cavitation on first area',
      'Radio frequency treatment',
      'Lipo laser application',
      'Wood therapy contouring',
      'Repeat process on second area',
    ],
    aftercare: [
      'Drink lots of water to flush fat cells',
      'Light exercise within 24 hours',
      'Healthy eating habits',
      'Avoid alcohol for 24 hours',
    ],
    faqs: [
      {
        question: 'What areas can be treated?',
        answer: 'Common areas include abdomen, flanks, thighs, arms, back, and buttocks.',
      },
    ],
  },
  {
    id: 'non-invasive-butt-lift',
    title: 'Non Invasive Butt Lift',
    categoryId: 'body-sculpting',
    description: 'Vacuum therapy & RF for a rounder, firmer appearance',
    longDescription: 'Uses advanced vacuum therapy and radio frequency to stimulate muscle, boost collagen production, and improve skin elasticity for a rounder, firmer appearance. Non-surgical butt enhancement.',
    price: '$60',
    duration: '35 min',
    deposit: '$25',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Non-surgical butt enhancement',
      'Lift and firm appearance',
      'Improve skin elasticity',
      'Boost collagen production',
      'Enhance natural curves',
      'No downtime or surgery',
      'Stimulate muscle and tissue',
    ],
    process: [
      'Consultation and assessment',
      'Vacuum therapy application',
      'Radio frequency treatment',
      'Muscle stimulation',
      'Contouring massage',
      'Post-treatment care instructions',
    ],
    aftercare: [
      'Drink plenty of water',
      'Maintain healthy diet and exercise',
      'Multiple sessions for best results',
      'Avoid tight clothing immediately after',
    ],
    faqs: [
      {
        question: 'How many sessions do I need?',
        answer: 'Most clients see best results with 8-12 sessions, scheduled 1-2 times per week.',
      },
      {
        question: 'Is this painful?',
        answer: 'No! Most clients find the treatment relaxing with a gentle suction sensation.',
      },
    ],
  },
  {
    id: '20min-cavitation',
    title: '20 Min Cavitation',
    categoryId: 'body-sculpting',
    description: 'Quick ultrasound fat reduction treatment',
    longDescription: 'A quick, non-invasive treatment that uses ultrasound technology to target stubborn fat cells, helping to smooth and contour the body. Perfect as an add-on or standalone treatment.',
    price: '$50',
    duration: '20 min',
    deposit: '$20',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Quick fat reduction treatment',
      'Target stubborn areas',
      'Non-invasive and painless',
      'No downtime',
      'Great as add-on service',
      'Ultrasound technology',
    ],
    process: [
      'Apply gel to treatment area',
      'Cavitation handpiece application',
      'Target stubborn fat deposits',
      'Treatment takes 20 minutes',
    ],
    aftercare: [
      'Drink lots of water',
      'Light exercise recommended',
      'Healthy diet for best results',
    ],
    faqs: [
      {
        question: 'How does cavitation work?',
        answer: 'Ultrasound waves create bubbles in fat cells, breaking them down so your body can naturally eliminate them.',
      },
    ],
  },
  {
    id: '20min-radiofrequency',
    title: '20 Min Radiofrequency',
    categoryId: 'body-sculpting',
    description: 'Skin tightening treatment with heat energy',
    longDescription: 'A skin tightening treatment that uses heat energy to stimulate collagen and elastin, reducing the appearance of fine lines and leaving the skin firm and more youthful.',
    price: '$50',
    duration: '20 min',
    deposit: '$20',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Tighten and firm skin',
      'Stimulate collagen production',
      'Reduce fine lines',
      'Improve skin elasticity',
      'Quick 20-minute treatment',
      'No downtime',
      'Youthful appearance',
    ],
    process: [
      'Clean treatment area',
      'Apply RF handpiece',
      'Controlled heat application',
      'Stimulate collagen deep in skin',
    ],
    aftercare: [
      'Keep skin hydrated',
      'Use sunscreen',
      'Results improve over time',
      'Multiple sessions recommended',
    ],
    faqs: [
      {
        question: 'Does RF hurt?',
        answer: 'No, you\'ll feel gentle warmth. The treatment is comfortable and relaxing.',
      },
    ],
  },
  {
    id: '30min-lipo-laser',
    title: '30 Min Lipo Laser',
    categoryId: 'body-sculpting',
    description: 'Low-level laser technology for body contouring',
    longDescription: 'A safe non-invasive body contouring treatment that uses low-level laser technology to target stubborn fat cells, helping to reduce inches, tighten skin, and improve overall body shape with no downtime.',
    price: '$50',
    duration: '30 min',
    deposit: '$20',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Reduce stubborn fat',
      'Tighten skin',
      'Improve body shape',
      'No downtime',
      'Safe and non-invasive',
      'Comfortable treatment',
      'Reduce inches',
    ],
    process: [
      'Position laser pads on treatment area',
      'Relax during 30-minute treatment',
      'Laser penetrates skin to target fat',
      'Fat cells release contents naturally',
    ],
    aftercare: [
      'Drink plenty of water',
      'Light exercise within 24 hours',
      'Multiple sessions for best results',
      'Maintain healthy lifestyle',
    ],
    faqs: [
      {
        question: 'How many sessions do I need?',
        answer: 'Most clients see results with 6-8 sessions, scheduled 1-2 times per week.',
      },
    ],
  },

  // TEETH WHITENING SERVICES
  {
    id: 'teeth-whitening-60min',
    title: 'Teeth Whitening 60 Min Session',
    categoryId: 'teeth-whitening',
    description: 'Professional laser teeth whitening for a brighter smile',
    longDescription: 'Our professional laser teeth whitening treatment uses advanced technology to safely and effectively lift deep stains caused by coffee, wine, smoking, and aging. Achieve a noticeably brighter, whiter smile in just one session.',
    price: '$150',
    duration: '75 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Noticeably whiter teeth in one session',
      'Safe and effective',
      'Remove coffee, wine, and smoking stains',
      'Professional-grade results',
      'Boost confidence',
      'Advanced laser technology',
      'Long-lasting results',
    ],
    process: [
      'Consultation and shade assessment',
      'Prepare teeth and protect gums',
      'Apply professional whitening gel',
      'Activate with laser technology',
      'Multiple rounds for optimal results',
      'Final shade comparison',
    ],
    aftercare: [
      'Avoid staining foods/drinks for 24-48 hours',
      'No coffee, wine, or dark beverages initially',
      'Use provided touch-up pen if needed',
      'Maintain with good oral hygiene',
      'Consider touch-ups every 6-12 months',
    ],
    faqs: [
      {
        question: 'How white will my teeth get?',
        answer: 'Most clients achieve 4-8 shades lighter in one session, depending on starting color and staining.',
      },
      {
        question: 'Will it hurt?',
        answer: 'Some clients experience temporary sensitivity, but the treatment itself is painless.',
      },
      {
        question: 'How long do results last?',
        answer: 'Results typically last 6-12 months with good care and avoiding heavy staining.',
      },
    ],
  },
  {
    id: 'teeth-whitening-80min',
    title: 'Teeth Whitening 80 Min',
    categoryId: 'teeth-whitening',
    description: 'Extended teeth whitening session for maximum results',
    longDescription: 'Extended 80-minute professional teeth whitening session for those who want maximum whitening results. Perfect for heavily stained teeth or those seeking the brightest possible smile.',
    price: '$180',
    duration: '80 min',
    deposit: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Maximum whitening results',
      'Extended treatment time',
      'Best for heavily stained teeth',
      'Professional laser technology',
      'Dramatic results in one session',
      'Safe and effective',
      'Long-lasting brightness',
    ],
    process: [
      'Comprehensive consultation',
      'Shade assessment and photos',
      'Prepare teeth and protect gums',
      'Apply professional whitening gel',
      'Multiple laser activation rounds',
      'Extended treatment for maximum lift',
      'Final shade comparison',
    ],
    aftercare: [
      'Avoid staining foods for 48 hours',
      'No coffee, wine, or dark beverages',
      'Use sensitivity toothpaste if needed',
      'Maintain with good oral care',
      'Touch-ups available',
    ],
    faqs: [
      {
        question: 'Who needs the 80-minute session?',
        answer: 'Best for heavily stained teeth or those wanting the most dramatic whitening possible.',
      },
      {
        question: 'Can I eat after treatment?',
        answer: 'Yes, but avoid dark or staining foods for 48 hours for best results.',
      },
    ],
  },
  {
    id: 'teeth-whitening-class',
    title: 'Teeth Whitening Class',
    categoryId: 'teeth-whitening',
    description: 'Professional training for beauty professionals',
    longDescription: 'One day class with full kit included, manual, certification, and live model. Learn to offer professional teeth whitening services in your own business. Perfect for beauty professionals looking to expand their service menu.',
    price: '$1,000',
    duration: '420 min',
    deposit: '$500',
    imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&utm_source=figma&utm_medium=referral',
    benefits: [
      'Complete training in one day',
      'Full professional kit included',
      'Certification upon completion',
      'Hands-on practice with live model',
      'Training manual and materials',
      'Add new revenue stream to your business',
      'Expert instruction',
    ],
    process: [
      'Morning: Theory and safety protocols',
      'Product knowledge and technique',
      'Hands-on practice with live model',
      'Afternoon: Business setup and marketing',
      'Q&A and certification',
      'Take home complete kit',
    ],
    aftercare: [
      'Practice techniques learned',
      'Review manual and materials',
      'Start offering services to clients',
      'Ongoing support available',
    ],
    faqs: [
      {
        question: 'What\'s included in the kit?',
        answer: 'Complete professional teeth whitening system, gels, LED light, supplies, and marketing materials.',
      },
      {
        question: 'Do I need experience?',
        answer: 'No prior teeth whitening experience needed. Best for beauty professionals, estheticians, or salon owners.',
      },
      {
        question: 'Will I be certified?',
        answer: 'Yes! You\'ll receive a certification upon completion of the training.',
      },
    ],
  },
];
export const categories: Category[] = [
  {
    id: 'eyebrow-services',
    name: 'Eyebrow Services',
    icon: Brush,
  },
  {
    id: 'lip-services',
    name: 'Lip Services',
    icon: Smile,
  },
  {
    id: 'paramedical-tattoo',
    name: 'Paramedical Tattoo',
    icon: Heart,
  },
  {
    id: 'lash-extensions',
    name: 'Lash Extensions',
    icon: Eye,
  },
  {
    id: 'body-sculpting',
    name: 'Body Sculpting',
    icon: Dumbbell,
  },
  {
    id: 'teeth-whitening',
    name: 'Teeth Whitening',
    icon: Sparkles,
  },
];

export const allCategories = ['All Services', ...categories.map(cat => cat.name)];

// Helper function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}

// Helper function to get category by name
export function getCategoryByName(name: string): Category | undefined {
  return categories.find(cat => cat.name === name);
}

// Helper function to get category icon by name or ID
export function getCategoryIcon(nameOrId: string): LucideIcon {
  const category = getCategoryByName(nameOrId) || getCategoryById(nameOrId);
  return category ? category.icon : Droplet;
}

// Helper function to get category name from ID
export function getCategoryNameById(id: string): string | undefined {
  const category = getCategoryById(id);
  return category?.name;
}

export const testimonials: Testimonial[] = [
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

export const faqCategories: FAQCategory[] = [
  {
    category: 'General Questions',
    questions: [
      {
        id: 'general-1',
        question: 'What is permanent makeup?',
        answer: 'Permanent makeup, also known as cosmetic tattooing or micropigmentation, is a cosmetic technique that employs tattoos as a means of producing designs that resemble makeup. It involves depositing pigment into the dermal layer of the skin to enhance facial features such as eyebrows, lips, and eyeliner.'
      },
      {
        id: 'general-2',
        question: 'Is permanent makeup really permanent?',
        answer: 'Despite the name, permanent makeup is semi-permanent. While the pigment is deposited into the skin and lasts longer than traditional makeup, it will gradually fade over time (typically 1-5 years depending on the procedure, skin type, and aftercare). Touch-ups are recommended to maintain the desired look.'
      },
      {
        id: 'general-3',
        question: 'Does permanent makeup hurt?',
        answer: 'Most clients experience minimal discomfort during the procedure. We use topical numbing creams to minimize any sensation. The level of discomfort varies by individual pain tolerance and the area being treated. Most clients describe the sensation as tolerable and well worth the results.'
      },
      {
        id: 'general-4',
        question: 'How long does the procedure take?',
        answer: 'The duration varies depending on the service. Eyebrow procedures typically take 2-3 hours, lip procedures take 2-2.5 hours, and eyeliner takes 1.5-2 hours. This includes consultation, numbing time, the actual procedure, and aftercare instructions.'
      }
    ]
  },
  {
    category: 'Before Your Appointment',
    questions: [
      {
        id: 'before-1',
        question: 'How should I prepare for my appointment?',
        answer: 'Avoid alcohol, caffeine, and blood-thinning medications for 24-48 hours before your appointment. Do not tweeze, wax, or tint your brows for at least one week prior. Arrive with a clean face, free of makeup. If you have a history of cold sores and are getting lip work done, consult your doctor about taking antiviral medication.'
      },
      {
        id: 'before-2',
        question: 'Can I wear makeup to my appointment?',
        answer: 'Please arrive with a clean face, free of makeup in the area being treated. You may wear makeup on other areas of your face if desired. This ensures we can properly assess your natural features and skin tone.'
      },
      {
        id: 'before-3',
        question: 'Who is not a good candidate for permanent makeup?',
        answer: 'Permanent makeup may not be suitable for individuals who are pregnant or nursing, undergoing chemotherapy, have certain skin conditions, have diabetes that is not well controlled, have a history of keloid scarring, or are on certain medications. A consultation is required to determine candidacy.'
      },
      {
        id: 'before-4',
        question: 'Can I bring reference photos?',
        answer: 'Absolutely! We encourage you to bring photos of brow shapes, lip colors, or eyeliner styles you like. This helps us understand your aesthetic preferences. During the consultation, we\'ll discuss what will work best for your unique facial features.'
      }
    ]
  },
  {
    category: 'Aftercare & Healing',
    questions: [
      {
        id: 'aftercare-1',
        question: 'What is the healing process like?',
        answer: 'The initial healing takes 7-14 days. During this time, you may experience some tenderness, slight swelling, and the color will appear darker. The treated area will scab and flake as it heals. Full healing and true color results take 4-6 weeks. A touch-up appointment is typically needed 6-8 weeks after the initial procedure.'
      },
      {
        id: 'aftercare-2',
        question: 'How do I care for my permanent makeup after the procedure?',
        answer: 'Keep the area clean and dry for the first 24 hours. Apply the provided aftercare ointment as directed. Avoid getting the area wet, swimming, saunas, and excessive sweating for 10-14 days. Do not pick at scabs or apply makeup to the area until fully healed. Avoid direct sun exposure and tanning beds.'
      },
      {
        id: 'aftercare-3',
        question: 'Can I shower after my procedure?',
        answer: 'Yes, you can shower, but avoid getting the treated area directly wet for the first 7-10 days. When washing your face, use a gentle cleanser and avoid the treated area. Pat dry gently with a clean towel.'
      },
      {
        id: 'aftercare-4',
        question: 'When can I wear makeup again?',
        answer: 'You should avoid applying makeup to the treated area for at least 10-14 days or until completely healed. You can wear makeup on other areas of your face immediately after the procedure. Once healed, you can apply makeup as normal.'
      }
    ]
  },
  {
    category: 'Results & Maintenance',
    questions: [
      {
        id: 'results-1',
        question: 'How long do results last?',
        answer: 'Results typically last 1-5 years depending on the procedure, your skin type, lifestyle, and sun exposure. Eyebrows usually last 1-3 years, lips 2-5 years, and eyeliner 3-5 years. Oily skin types may experience faster fading. Annual touch-ups help maintain optimal results.'
      },
      {
        id: 'results-2',
        question: 'Will the color fade?',
        answer: 'Yes, the pigment will gradually fade over time due to sun exposure, skin regeneration, and other factors. This is why periodic touch-ups are recommended to keep your permanent makeup looking fresh and vibrant. The rate of fading varies by individual.'
      },
      {
        id: 'results-3',
        question: 'When will I see the final results?',
        answer: 'While you\'ll see immediate results, the true final color and shape will be visible after 4-6 weeks once the skin has completely healed. The color will appear darker immediately after the procedure and during the first week, then will lighten during healing.'
      },
      {
        id: 'results-4',
        question: 'How often do I need touch-ups?',
        answer: 'A touch-up is typically needed 6-8 weeks after your initial procedure to perfect the color and shape. After that, annual or bi-annual touch-ups are recommended to maintain the best results, depending on how quickly your skin metabolizes the pigment.'
      }
    ]
  },
  {
    category: 'Specific Services',
    questions: [
      {
        id: 'service-1',
        question: 'What\'s the difference between microblading and powder brows?',
        answer: 'Microblading creates hair-like strokes using a manual blade, giving a natural, feathered look. Powder brows use a machine to create a soft, powdered effect similar to filled-in brows with makeup. Powder brows tend to last longer and work better for oily skin types, while microblading is ideal for those wanting a more natural, hair-stroke appearance.'
      },
      {
        id: 'service-2',
        question: 'Can I get permanent makeup if I have existing tattoos in the area?',
        answer: 'It depends on the existing tattoo. During your consultation, we\'ll assess whether we can work with or around existing permanent makeup or tattoos. In some cases, removal or lightening may be necessary before a new procedure.'
      },
      {
        id: 'service-3',
        question: 'Do you offer scar camouflage?',
        answer: 'Yes, we offer paramedical tattooing services including scar camouflage. This technique can help blend scars with surrounding skin tone. A consultation is required to determine if your scar is a good candidate for this treatment.'
      },
      {
        id: 'service-4',
        question: 'Can I get multiple services in one appointment?',
        answer: 'While it\'s possible to combine some services, we typically recommend spacing procedures apart to ensure proper healing and the best results. During your consultation, we can discuss the best approach for your desired services.'
      }
    ]
  },
  {
    category: 'Pricing & Booking',
    questions: [
      {
        id: 'pricing-1',
        question: 'How much does permanent makeup cost?',
        answer: 'Pricing varies depending on the service. Each service page on our website lists detailed pricing information. Initial procedures typically include a touch-up appointment. We believe in transparent pricing with no hidden fees.'
      },
      {
        id: 'pricing-2',
        question: 'Do you require a deposit?',
        answer: 'Yes, a deposit is required to secure your appointment. This deposit is applied to the cost of your service. Deposits are non-refundable but can be transferred to another date with adequate notice.'
      },
      {
        id: 'pricing-3',
        question: 'Do you offer consultations?',
        answer: 'Yes, we offer complimentary consultations for all new clients. This allows us to discuss your goals, assess your candidacy, review your medical history, and create a customized plan. You can book a consultation through our website.'
      },
      {
        id: 'pricing-4',
        question: 'What is your cancellation policy?',
        answer: 'We require at least 48 hours notice for cancellations or rescheduling. Cancellations made with less than 48 hours notice will forfeit their deposit. We understand emergencies happen and handle these on a case-by-case basis.'
      }
    ]
  },
];

// Portfolio Categories
export const portfolioCategories: PortfolioCategory[] = [
  { id: 'microblading', name: 'Microblading' },
  { id: 'powder-brows', name: 'Powder Brows' },
  { id: 'eyeliner', name: 'Eyeliner' },
  { id: 'lip-blush', name: 'Lip Blush' },
];

// Portfolio Items
export const portfolio: Portfolio[] = [
  {
    id: 1,
    categoryId: 'microblading',
    title: 'Microblading Transformation',
    alt: 'Microblading before and after',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
  },
  {
    id: 2,
    categoryId: 'powder-brows',
    title: 'Powder Brows Results',
    alt: 'Powder brows transformation',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
  },
  {
    id: 3,
    categoryId: 'eyeliner',
    title: 'Permanent Eyeliner',
    alt: 'Permanent eyeliner results',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
  },
  {
    id: 4,
    categoryId: 'lip-blush',
    title: 'Lip Blush Enhancement',
    alt: 'Lip blush before and after',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
  },
  {
    id: 5,
    categoryId: 'microblading',
    title: 'Natural Microblading',
    alt: 'Natural microblading results',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
  },
  {
    id: 6,
    categoryId: 'powder-brows',
    title: 'Ombre Powder Brows',
    alt: 'Ombre powder brows',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
  },
];

export const serviceHighlights: ServiceHighlight[] = [
  {
    categoryId: 'eyebrow-services',
    title: 'Brow Services',
    description: 'From microblading to ombre powder brows and henna tinting - we offer complete eyebrow enhancement services.',
    icon: Brush,
  },
  {
    categoryId: 'lip-services',
    title: 'Lip Blush',
    description: 'Semi-permanent lip color for naturally fuller, beautifully tinted lips without daily lipstick.',
    icon: Smile,
  },
  {
    categoryId: 'lash-extensions',
    title: 'Lash Extensions',
    description: 'Classic, volume, hybrid, and wet lash sets. Wake up with beautiful lashes every day.',
    icon: Eye,
  },
  {
    categoryId: 'paramedical-tattoo',
    title: 'Paramedical Services',
    description: 'Areola reconstruction and scar camouflage tattooing to restore confidence and natural appearance.',
    icon: Heart,
  },
  {
    categoryId: 'body-sculpting',
    title: 'Body Sculpting',
    description: 'Non-invasive body contouring with cavitation, RF, lipo laser, and wood therapy treatments.',
    icon: Dumbbell,
  },
  {
    categoryId: 'teeth-whitening',
    title: 'Teeth Whitening',
    description: 'Professional laser teeth whitening for a brighter, more confident smile in just one session.',
    icon: Sparkles,
  },
];

