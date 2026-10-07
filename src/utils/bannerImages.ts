import { ServiceProvider } from '../types';

export const BANNER_IMAGES = {
  nailMakeover: '/src/assets/images/nail_makeover_banner_1791310401888.jpg',
  jewellery: '/src/assets/images/jewellery_luxury_banner_1791310423328.jpg',
  fitness: '/src/assets/images/fitness_training_banner_1791310435080.jpg',
  danceMusic: '/src/assets/images/dance_music_banner_1791310450521.jpg',
  fashionBoutique: '/src/assets/images/home_boutique_craft_1791308100452.jpg',
  wellnessSalon: '/src/assets/images/wellness_nutrition_salon_1791308114033.jpg',
  educationStudy: '/src/assets/images/education_study_banner_1791353888492.jpg',
  playschoolDaycare: '/src/assets/images/playschool_daycare_banner_1791353904942.jpg',
  communityEducation: '/src/assets/images/andour_heights_community_1791308086841.jpg',
};

export function getRelevantBannerImage(provider: ServiceProvider): string {
  // If provider has an explicit cover image set, use it
  if (provider.coverImage) {
    return provider.coverImage;
  }

  // If specific theme key chosen
  if (provider.imageKey === 'nails') return BANNER_IMAGES.nailMakeover;
  if (provider.imageKey === 'jewellery') return BANNER_IMAGES.jewellery;
  if (provider.imageKey === 'fitness') return BANNER_IMAGES.fitness;
  if (provider.imageKey === 'music') return BANNER_IMAGES.danceMusic;
  if (provider.imageKey === 'fashion') return BANNER_IMAGES.fashionBoutique;
  if (provider.imageKey === 'wellness') return BANNER_IMAGES.wellnessSalon;
  if (provider.imageKey === 'education') return BANNER_IMAGES.educationStudy;

  const id = provider.id.toLowerCase();
  const cat = provider.category;
  const name = provider.name.toLowerCase();

  // 1. Daycare & Playschool
  if (id.includes('daycare') || id.includes('playschool') || name.includes('daycare') || name.includes('playschool')) {
    return BANNER_IMAGES.playschoolDaycare;
  }

  // 2. Nail art & makeover
  if (id.includes('nail') || name.includes('nail') || name.includes('makeover')) {
    return BANNER_IMAGES.nailMakeover;
  }

  // 3. Jewellery & Accessories
  if (cat === 'Jewellery & Accessories' || id.includes('jewel') || id.includes('elegant') || id.includes('rangbyvarsha')) {
    return BANNER_IMAGES.jewellery;
  }

  // 4. Health & Fitness (Sports coaching, athlete training, gym)
  if (cat === 'Health & Fitness' || id.includes('fitness') || id.includes('sachin-pal') || id.includes('get-fit')) {
    return BANNER_IMAGES.fitness;
  }

  // 5. Classical Dance, Music & Cultural
  if (cat === 'Dance, Music & Cultural' || id.includes('dance') || id.includes('music') || id.includes('surprakash')) {
    return BANNER_IMAGES.danceMusic;
  }

  // 6. Education, Tuitions, Abacus
  if (cat === 'Education & Coaching' || id.includes('tuition') || id.includes('abacus') || id.includes('coaching')) {
    return BANNER_IMAGES.educationStudy;
  }

  // 7. Clothes & Fashion & Tailoring
  if (cat === 'Clothes & Fashion') {
    return BANNER_IMAGES.fashionBoutique;
  }

  // 8. Arts, Crafts & Festive Decor
  if (cat === 'Arts, Crafts & Decor') {
    return BANNER_IMAGES.fashionBoutique;
  }

  // 9. Beauty & Wellness, Salon & Grooming, Nutritionists
  if (cat === 'Beauty & Wellness' || cat === 'Salon & Grooming') {
    return BANNER_IMAGES.wellnessSalon;
  }

  // 10. Default
  return BANNER_IMAGES.communityEducation;
}
