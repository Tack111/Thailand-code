export interface Destination {
  id: number;
  name: string;
  region: string;
  type: string;
  image: string;
  short: string;
  description: string;
  howToGetThere: string;
  bestTime: string;
  cost: string;
  activities: string[];
  rating: number;
  reviewsCount: number;
  location: { lat: number; lng: number; address: string };
  gallery?: string[];
  tips?: string[];
}

export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Railay Beach',
    region: 'South',
    type: 'Beach',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
    short: 'Crystal clear waters and towering limestone cliffs paradise.',
    description: 'Railay Beach is a small peninsula accessible only by boat due to the high limestone cliffs cutting it off from the mainland. It offers stunning beaches, rock climbing, and a relaxed atmosphere that attracts visitors from around the world.',
    howToGetThere: 'Take a ferry from Krabi Town or Ao Nang (approximately 15 minutes) to Railay Beach.',
    bestTime: 'November to April is the ideal time to visit with sunny days and calm seas.',
    cost: 'Budget: $30-50/day | Mid-range: $60-120/day | Luxury: $150+/day',
    activities: ['Rock Climbing', 'Kayaking', 'Snorkeling', 'Sunset Views', 'Beach Relaxation'],
    rating: 4.8,
    reviewsCount: 324,
    location: { lat: 8.0062, lng: 98.8355, address: 'Railay Beach, Krabi, Thailand' },
    gallery: ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80'],
    tips: ['Arrive early to avoid crowds', 'Bring sunscreen and hats', 'Try rock climbing with a local guide'],
  },
  {
    id: 2,
    name: 'Doi Inthanon',
    region: 'North',
    type: 'Mountain',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
    short: "Thailand's highest peak with stunning waterfalls and cool climate.",
    description: "Doi Inthanon is Thailand's highest mountain at 2,565 meters. It features lush forests, stunning waterfalls like Wachirathan, and the famous royal pagodas.",
    howToGetThere: 'Take a 1.5-hour drive from Chiang Mai city center. Tours are available or rent a car for flexibility.',
    bestTime: 'December to February for the coolest weather and clearest views.',
    cost: 'Budget: $20-40/day | Mid-range: $50-80/day | Luxury: $100+/day',
    activities: ['Hiking', 'Waterfall Visits', 'Bird Watching', 'Cultural Tours', 'Photography'],
    rating: 4.7,
    reviewsCount: 256,
    location: { lat: 18.5865, lng: 98.4868, address: 'Chiang Mai, Thailand' },
    gallery: ['https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80'],
    tips: ['Bring warm clothing - it gets chilly at the summit', 'Start early to catch sunrise', 'Wear comfortable hiking shoes'],
  },
  {
    id: 3,
    name: 'Phi Phi Islands',
    region: 'South',
    type: 'Island',
    image: 'https://images.unsplash.com/photo-1589519160732-57fc835526d7?w=800&q=80',
    short: 'Tropical paradise with vibrant marine life and stunning sunsets.',
    description: 'The Phi Phi Islands are a group of six islands known for their stunning beaches, crystal-clear water, and vibrant nightlife. Maya Bay, featured in "The Beach," is a must-visit.',
    howToGetThere: 'Take a ferry or speedboat from Krabi Town or Phuket (approximately 1.5-2 hours).',
    bestTime: 'November to April',
    cost: '$60-200/day',
    activities: ['Snorkeling', 'Scuba Diving', 'Island Hopping', 'Beach Relaxation'],
    rating: 4.9,
    reviewsCount: 512,
    location: { lat: 7.7407, lng: 98.7784, address: 'Krabi, Thailand' },
    gallery: [
      'https://images.unsplash.com/photo-1589519160732-57fc835526d7?w=800&q=80',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    ],
    tips: ['Book tours in advance during peak season', 'Visit Maya Bay early morning', 'Bring reef-safe sunscreen'],
  },
  {
    id: 4,
    name: 'Erawan Falls',
    region: 'West',
    type: 'Waterfall',
    image: 'https://images.unsplash.com/photo-1432405972618-c6b0cbaa5a07?w=800&q=80',
    short: 'Seven-tiered turquoise waterfall in lush jungle setting.',
    description: 'Erawan National Park is home to the famous seven-tiered Erawan Waterfall, named after the three-headed elephant of Hindu mythology. Each tier offers a unique emerald pool perfect for swimming.',
    howToGetThere: 'Take a bus or drive 3 hours from Bangkok, or 1.5 hours from Kanchanaburi town.',
    bestTime: 'July to October',
    cost: '$25-60/day',
    activities: ['Swimming', 'Hiking', 'Wildlife Watching', 'Photography'],
    rating: 4.6,
    reviewsCount: 198,
    location: { lat: 14.2144, lng: 99.0547, address: 'Kanchanaburi, Thailand' },
    gallery: [
      'https://images.unsplash.com/photo-1432405972618-c6b0cbaa5a07?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b84?w=800&q=80',
      'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
    ],
    tips: ['Wear water shoes for the rocky pools', 'Visit weekdays to avoid crowds', 'Bring extra clothes for changing'],
  },
  {
    id: 5,
    name: 'Chiang Rai',
    region: 'North',
    type: 'Nature',
    image: 'https://images.unsplash.com/photo-1528183428842-22f1bd55c7ee?w=800&q=80',
    short: 'Cultural gem with the stunning White Temple and Golden Triangle.',
    description: 'Chiang Rai offers a mix of cultural experiences and natural beauty. Visit the White Temple (Wat Rong Khun), the Golden Triangle, and explore hill tribe villages.',
    howToGetThere: 'Take a 3-hour bus or 1-hour flight from Bangkok, or 3-hour drive from Chiang Mai.',
    bestTime: 'October to February',
    cost: '$35-90/day',
    activities: ['Temple Tours', 'River Cruises', 'Cultural Experiences', 'Shopping'],
    rating: 4.5,
    reviewsCount: 167,
    location: { lat: 19.907, lng: 99.831, address: 'Chiang Rai, Thailand' },
    gallery: [
      'https://images.unsplash.com/photo-1528183428842-22f1bd55c7ee?w=800&q=80',
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e27?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    ],
    tips: ['Dress modestly for temple visits', 'Hire a local guide for hill tribe tours', 'Try the local Northern Thai cuisine'],
  },
  {
    id: 6,
    name: 'Koh Tao',
    region: 'South',
    type: 'Island',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80',
    short: 'Diver\'s paradise with crystal clear waters and vibrant coral reefs.',
    description: 'Koh Tao is a small island known for its excellent diving and snorkeling opportunities. It is one of the best places in the world to get certified as a diver.',
    howToGetThere: 'Take a ferry from Chumphon (1.5 hours) or Surat Thani (3 hours), or fly to Samui then ferry.',
    bestTime: 'January to April',
    cost: '$40-120/day',
    activities: ['Scuba Diving', 'Snorkeling', 'Kayaking', 'Sunset Views'],
    rating: 4.7,
    reviewsCount: 289,
    location: { lat: 10.0995, lng: 99.8383, address: 'Surat Thani, Thailand' },
    gallery: ['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80'],
    tips: ['Get your dive certification here - it\'s affordable', 'Bring underwater camera', 'Stay in a beachfront bungalow'],
  },
];
