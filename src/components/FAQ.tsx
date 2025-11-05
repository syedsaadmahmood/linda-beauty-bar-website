import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqCategories = [
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
  }
];

export function FAQ() {
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
                {category.questions.map((item) => (
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
              className="inline-flex items-center justify-center px-6 py-3 bg-blush-pink text-white rounded-lg hover:bg-blush-pink-dark transition-colors"
            >
              Call Us
            </a>
            <a 
              href="mailto:info@lindasbeautybar.com" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-blush-pink text-blush-pink rounded-lg hover:bg-blush-pink-light transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
