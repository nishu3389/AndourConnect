import { ServiceProvider, ServiceItem } from '../types';
import { getRelevantBannerImage } from './bannerImages';

export const PROVIDER_PRICING_CATALOG: Record<string, Record<string, string>> = {
  // Nishal Nails & Makeover
  'nishal-nails-makeover': {
    'Gel Nail Extensions': '₹1,200',
    'Acrylic Nails & French Tips': '₹1,500',
    'Eyelash Extensions & Lash Lift': '₹999',
    'Party Makeup': '₹1,800',
    'Engagement Makeup': '₹3,500',
    'HD Bridal Makeup Packages': '₹5,500',
  },
  // Lendrobe
  'lendrobe': {
    'Designer Lehenga Rental': '₹1,800 / rental',
    'Party Gowns & Indo-Western Dresses': '₹1,200 / rental',
    'Men\'s Kurta & Sherwani Sets': '₹1,500 / rental',
    'Lend Outfits from Your Wardrobe (Earn Rental Income)': 'Free listing (Earn 70%)',
    'Complimentary Fit Adjustment': 'Included with rental',
  },
  // Sachin Pal
  'sachin-pal-fitness': {
    'Back & Knee Pain Rehabilitation': '₹3,500 / month',
    'Marathon & Half-Marathon Conditioning': '₹2,800 / month',
    'Pilates for Core Stability': '₹3,000 / month',
    'Target-Oriented Fat Loss & Muscle Building': '₹4,000 / month',
    'Children\'s Athletic & Agility Sports Training (Ages 6-16)': '₹2,500 / month',
  },
  // House of Shivani
  'house-of-shivani': {
    'Bridal & Arabic Mehendi Art': '₹2,500 onwards',
    'Girls & Ladies Lehenga Customization': '₹1,800',
    'Salwar Suit Tailoring & Neckline Embellishments': '₹650',
    'Designer Gown Alterations': '₹400',
    'Group Festive Mehendi Sessions': '₹350 / hand',
  },
  // Takshvi Creations
  'takshvi-creations': {
    'Pure Cotton Handloom King/Queen Bedsheets': '₹850 – ₹1,200',
    'Jaipuri Reversible Dohars & AC Quilts': '₹1,400',
    'Chanderi & Cotton Unstitched Suit Sets': '₹950',
    'Stitched Ready-to-Wear Daily Kurtis': '₹650',
    'Festive Bedding Gift Packs': '₹1,800',
  },
  // Poonam Ladies Tailor
  'poonam-ladies-tailor': {
    'Designer Saree Blouse Tailoring': '₹450',
    'Pant-Cut & Palazzo Salwar Suits': '₹600',
    'Anarkali & Gown Alterations': '₹350',
    'Kurti Neckline Customization': '₹250',
    'Urgent Same-Day Alterations': '₹150',
  },
  // Salon Services
  'salon-services-sonam': {
    'O3+ & Cheryl\'s Professional Facials': '₹1,100',
    'Rica & Honey Waxing (Full Body)': '₹850',
    'L\'Oreal Deep Conditioning Hair Spa': '₹750',
    'Deluxe Pedicure & Manicure': '₹650',
    'Threading, Bleach & Detan': '₹250',
  },
  // Toys Playschool & Daycare
  'toys-playschool-daycare': {
    'Hourly & Monthly Flexible Daycare': '₹150 / hr or ₹3,500 / mo',
    'Montessori & Sensory Play Activities': 'Included in program',
    'Healthy Evening Snack Assistance': 'Included',
    'Potty Training & Routine Discipline': 'Included',
    'Storytelling, Music & Socializing': 'Included',
  },
  // Elegant Trends
  'elegant-trends': {
    'Bridal & Sangeet Kundan Sets': '₹2,400',
    'Matte Finish Temple Jewellery': '₹1,800',
    'High-grade American Diamond Necklaces': '₹1,950',
    'Festive Jhumkas, Chandbalis & Chokers': '₹450 – ₹850',
    'Matching Bangles & Hair Ornaments': '₹350',
  },
  // Rangbyvarsha
  'rangbyvarsha': {
    'Designer Silk & Zari Rakhis': '₹150 / pair',
    'Laddu Gopal Velvet & Zardozi Poshaks': '₹350 – ₹850',
    'Diwali Urli & Handpainted Tealight Holders': '₹450',
    'Shagun Envelopes & Wedding Trays': '₹250',
    'Customized Spiritual Gift Hampers': '₹1,200',
  },
  // Primary Class Tuition
  'primary-class-tuition': {
    'All Primary Subjects (Maths, EVS, English, Hindi)': '₹2,200 / month',
    'Regular Homework & School Project Assistance': '₹1,800 / month',
    'Handwriting & Reading Fluency Improvement': '₹1,500 / month',
    'Weekly Revision & Practice Tests': 'Included',
    'Small Batch Sizes (Max 5 kids)': 'Included',
  },
  // Abacus
  'abacus-mental-math': {
    'Abacus Foundation to Advanced (Levels 1 to 8)': '₹1,800 / month',
    'Speed Mental Math & Vedic Math Shortcuts': '₹2,000 / month',
    'Concentration & Brain Gym Exercises': 'Included',
    'Preparation for National Math Olympiads': '₹2,500 / batch',
    'Complimentary Demo Assessment Class': 'Free Trial',
  },
  // Atulniye Classes
  'atulniye-classes': {
    'Class 6th–10th Mathematics & Science (CBSE/ICSE)': '₹2,800 / month',
    'NCERT Line-by-Line Mastery & Exemplar Problems': 'Included',
    'Fortnightly Tests & Performance Feedback Reports': 'Included',
    'Board Exam Revision & Sample Paper Drills': '₹3,500 / batch',
    'Individual Doubt Sessions': '₹500 / session',
  },
  // Bhargavi Art's
  'bhargavi-arts': {
    'Customized Wooden & Acrylic Name Plates': '₹950 – ₹1,800',
    'Handcrafted Shubh Labh & Swastik Wall Hangings': '₹350',
    'Designer Bandha War / Floral Door Torans': '₹650',
    'Decoupage & Wood Key Holders': '₹450',
    'Eco-friendly Ganpati Pandal Decor Sets': '₹1,500',
  },
  // Balaji Creation
  'balaji-creation': {
    'Laddu Gopal Seasonal & Festive Poshaks': '₹250 – ₹750',
    'Traditional & Contemporary Bandarwaar': '₹550',
    'Trousseau & Ring Ceremony Gift Tray Decoration': '₹1,200 / set of 5',
    'Temple Asan & Mukut Accessory Sets': '₹350',
    'Return Gift Hampers for Griha Pravesh': '₹800 onwards',
  },
  // REJUVENATE
  'rejuvenate-wellness': {
    'Hydra-Infusion & Deep Glow Facials': '₹1,800',
    'Clinical Chemical Peels (Acne, Pigmentation)': '₹2,200',
    'Hair Fall Scalp Stimulation & Meso Therapy': '₹2,500',
    'Anti-aging Skin Tightening Protocols': '₹3,000',
    'Personalized Skin Regimen Consultations': '₹500 (Free with treatment)',
  },
  // Bite Of Balance With Aishwarya
  'bite-of-balance-aishwarya': {
    'Sustainable Weight Loss & Fat Loss Meal Plans': '₹2,200 / month',
    'PCOS & Thyroid Reversal Nutrition': '₹2,800 / month',
    'Gut Health & IBS Recovery Protocols': '₹2,500 / month',
    'Post-Pregnancy Weight Management': '₹2,800 / month',
    'Weekly 1-on-1 WhatsApp Progress Monitoring': 'Included',
  },
  // Nutritionist Swati
  'nutritionist-swati': {
    'Therapeutic Diets (Diabetes, Hypertension, Fatty Liver)': '₹2,000 / month',
    'Pregnancy Trimester-wise Nutrition Guides': '₹2,500 / month',
    'Postpartum & Lactation Nourishment Meals': '₹2,200 / month',
    'Senior Citizen Nutrition Plans': '₹1,800 / month',
    'Metabolic Health & Cholesterol Balancing': '₹2,000 / month',
  },
  // Shaili Chandra
  'shaili-chandra-wellness': {
    'PCOS & Hormonal Imbalance Lifestyle Coaching': '₹2,500 / month',
    'Diabetes Glucose Stabilization Diet': '₹2,200 / month',
    'Sports & Endurance Athlete Nutrition': '₹3,000 / month',
    'Family Healthy Habits & Meal Prep Strategies': '₹3,500 / month',
    'Stress & Sleep Optimization Protocols': 'Free initial 15-min checkup',
  },
  // Get Fit
  'get-fit-wellness-centre': {
    'Ladies Morning / Evening Fitness Batches': '₹1,800 / month',
    'Core & Posture Strengthening': '₹2,000 / month',
    'Low-Impact Aerobics & Calisthenics': '₹1,800 / month',
    'Senior Citizen Mobility Sessions': '₹1,500 / month',
    'Personal 1-on-1 Fitness Training': '₹3,500 / month',
  },
  // SURPRAKASH Dance & Music
  'surprakash-dance-music': {
    'Kathak Classical Dance (Beginners to Advanced)': '₹2,000 / month',
    'Hindustani Classical & Semi-Classical Vocal Music': '₹2,000 / month',
    'Harmonium & Electronic Keyboard Training': '₹2,200 / month',
    'Govt. Recognized Certification Examinations': 'Nominal board fee',
    'Society Annual Day & Festival Performance Preparation': 'Included in course',
  },
  // Handyman / Misc
  'misc-home-assist': {
    'Urgent Electrician & MCB Tripping Help': '₹150 – ₹250',
    'Plumbing Leak Troubleshooting': '₹200',
    'Lending Society Heavy Drills & Step Ladders': 'Free Tool Share',
    'Water Purifier Filter Change Assistance': '₹250',
    'Elderly Resident Support & Errand Assistance': 'Free Volunteer Support',
  },
};

// Helper to generate realistic multiline descriptions for service items
function getServiceItemDescription(serviceName: string, provider: ServiceProvider): string {
  const s = serviceName.toLowerCase();
  if (s.includes('nail') || s.includes('gel') || s.includes('acrylic')) {
    return 'Full cuticle prep, gentle buffing, base primer & long-lasting high-gloss UV cured finish. Custom nail art options available upon request.';
  }
  if (s.includes('lash') || s.includes('eye')) {
    return 'Natural volume lash extensions and keratin lash lift using hypoallergenic glue. Safe for sensitive eyes with zero stinging.';
  }
  if (s.includes('bridal') || s.includes('makeup')) {
    return 'HD waterproof makeup tailored for Indian skin tones. Includes skin prep, premium lashes, dupatta setting, and hair styling assistance.';
  }
  if (s.includes('lehenga') || s.includes('gown') || s.includes('rental')) {
    return 'Pre-sanitized designer outfits ready for pickup. Includes complimentary waist and blouse fit adjustment by our in-house seamstress.';
  }
  if (s.includes('tailor') || s.includes('blouse') || s.includes('suit') || s.includes('alteration')) {
    return 'Precise body measurement at your doorstep or flat. Expert piping, lining, and custom neck patterns delivered within 48-72 hours.';
  }
  if (s.includes('rehab') || s.includes('pain') || s.includes('pilates')) {
    return 'Core-strengthening physio drills to alleviate chronic lumbar and joint discomfort. Safe, progressive posture correction routines.';
  }
  if (s.includes('marathon') || s.includes('fitness') || s.includes('fat loss') || s.includes('muscle')) {
    return 'Structured personal conditioning regimen with weekly progress check-ins, stamina building, and personalized society lawn drills.';
  }
  if (s.includes('mehendi')) {
    return 'Organic Rajasthani dark-stain henna paste prepared fresh at home. Intricate traditional bridal motifs, Arabic florals, and modern patterns.';
  }
  if (s.includes('bedsheet') || s.includes('dohar') || s.includes('kurti') || s.includes('cotton')) {
    return '100% pure long-staple cotton with fast dyes. Breathable fabric tested for zero color bleeding and shrink resistance after multiple washes.';
  }
  if (s.includes('facial') || s.includes('spa') || s.includes('waxing') || s.includes('pedicure')) {
    return 'Clean hygienic session using disposable single-use kits and branded cosmetics. Relaxing pressure-point massage included.';
  }
  if (s.includes('daycare') || s.includes('playschool')) {
    return 'Homely supervised child-care with engaging Montessori sensory games, clean play zone, routine sleep discipline, and evening snacks.';
  }
  if (s.includes('jewel') || s.includes('kundan') || s.includes('necklace') || s.includes('jhumka')) {
    return 'Lead-free anti-tarnish micro-plated jewelry crafted with sparkling CZ & semi-precious stones. Velvet keepsake packaging included.';
  }
  if (s.includes('abacus') || s.includes('math') || s.includes('tuition')) {
    return 'Personalized concept coaching with max 4-5 children per batch. Homework assistance, speed mental math drills, and mock tests included.';
  }
  if (s.includes('dance') || s.includes('music') || s.includes('kathak')) {
    return 'Structured classical curriculum with rhythmic footwork (Tatkar), hand mudras, and vocal riyaaz. Board exam certification track available.';
  }
  return `Customized society service provided directly by ${provider.ownerName} in ${provider.flatNo}. Flexible timing and doorstep consultation available.`;
}

function getServiceItemDuration(serviceName: string): string {
  const s = serviceName.toLowerCase();
  if (s.includes('month') || s.includes('tuition') || s.includes('coaching') || s.includes('fitness') || s.includes('rehab')) {
    return 'Monthly Batch';
  }
  if (s.includes('rental')) {
    return '3-Day Rental';
  }
  if (s.includes('makeup') || s.includes('bridal')) {
    return '90 – 120 mins';
  }
  if (s.includes('nail') || s.includes('facial') || s.includes('spa')) {
    return '45 – 60 mins';
  }
  if (s.includes('alteration') || s.includes('tailoring')) {
    return '24 – 48 hrs turnaround';
  }
  return 'Flexible Session';
}

export function getProviderServiceItems(provider: ServiceProvider): ServiceItem[] {
  // If provider has custom serviceItems, use them
  if (provider.serviceItems && provider.serviceItems.length > 0) {
    return provider.serviceItems;
  }

  const catalog = PROVIDER_PRICING_CATALOG[provider.id] || {};
  const fallbackImage = getRelevantBannerImage(provider);

  return provider.services.map((serviceName, idx) => {
    // Exact or partial match
    let matchedPrice = catalog[serviceName];

    if (!matchedPrice) {
      // Find key that contains serviceName or vice versa
      const foundKey = Object.keys(catalog).find(
        (k) => k.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(k.toLowerCase())
      );
      if (foundKey) {
        matchedPrice = catalog[foundKey];
      }
    }

    if (!matchedPrice) {
      // Fallback sensible price based on provider price range or category
      if (provider.category === 'Clothes & Fashion') {
        matchedPrice = '₹450 – ₹1,200';
      } else if (provider.category === 'Education & Coaching') {
        matchedPrice = '₹1,800 / month';
      } else if (provider.category === 'Health & Fitness') {
        matchedPrice = '₹2,000 / month';
      } else if (provider.category === 'Beauty & Wellness') {
        matchedPrice = '₹750 – ₹1,800';
      } else if (provider.category === 'Jewellery & Accessories') {
        matchedPrice = '₹350 – ₹1,500';
      } else {
        matchedPrice = 'Fair resident rates';
      }
    }

    // Showcase both variants:
    // Items at even index have an image, items at odd index are non-image (pure text)
    const hasImage = idx % 2 === 0;

    return {
      name: serviceName,
      price: matchedPrice,
      duration: getServiceItemDuration(serviceName),
      description: getServiceItemDescription(serviceName, provider),
      image: hasImage ? (provider.coverImage || fallbackImage) : undefined,
    };
  });
}
