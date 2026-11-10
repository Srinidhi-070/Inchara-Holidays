export interface GalleryItem {
  id: string;
  category: 'heritage' | 'nature' | 'coastal' | 'culinary' | 'fleet';
  titleEn: string;
  titleKn: string;
  locationEn: string;
  locationKn: string;
  imageUrl: string;
  captionEn: string;
  captionKn: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-belur',
    category: 'heritage',
    titleEn: 'Chennakeshava Temple Marvel',
    titleKn: 'ಬೇಲೂರು ಚನ್ನಕೇಶವ ಶಿಲ್ಪಕಲೆ',
    locationEn: 'Belur, Hassan',
    locationKn: 'ಬೇಲೂರು, ಹಾಸನ',
    imageUrl: '/images/hoysala_belur.jpg',
    captionEn: '12th-century Hoysala soapstone poetry frozen in architecture, celebrated across millennia.',
    captionKn: '೧೨ನೇ ಶತಮಾನದ ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆಯ ಅದ್ಭುತ ಲೋಕ, ಕಲ್ಲಿನಲ್ಲಿ ಅರಳಿದ ಕಾವ್ಯ.',
  },
  {
    id: 'gal-coorg',
    category: 'nature',
    titleEn: 'Misty Coffee Plantations of Kodagu',
    titleKn: 'ಕೊಡಗಿನ ಮಂಜಿನ ಕಾಫಿ ತೋಟಗಳು',
    locationEn: 'Madikeri, Coorg',
    locationKn: 'ಮಡಿಕೇರಿ, ಕೊಡಗು',
    imageUrl: '/images/western-ghats-hero.jpg',
    captionEn: 'Emerald slopes, gentle monsoon drizzles, and the fragrance of blossoming Arabica beans.',
    captionKn: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಹಸಿರು ಬೆಟ್ಟಗಳು, ತಂಪಾದ ಗಾಳಿ ಮತ್ತು ಪರಿಮಳ ಸೂಸುವ ಕಾಫಿ ಎಸ್ಟೇಟ್‌ಗಳು.',
  },
  {
    id: 'gal-sadya',
    category: 'culinary',
    titleEn: 'Traditional Banana Leaf Sadya',
    titleKn: 'ಸಾಂಪ್ರದಾಯಿಕ ಬಾಳೆ ಎಲೆ ಊಟ',
    locationEn: 'Mysuru & Udupi Kitchens',
    locationKn: 'ಮೈಸೂರು ಮತ್ತು ಉಡುಪಿ ಪಾಕಶಾಲೆ',
    imageUrl: '/images/culinary/banana_leaf_sadya.png',
    captionEn: 'Authentic 100% pure vegetarian feast served hot with Mysore Pak, Rasam, and fresh ghee.',
    captionKn: 'ಬಾಳೆ ಎಲೆಯಲ್ಲಿ ಬಡಿಸುವ ಸಾತ್ವಿಕ ಸಸ್ಯಾಹಾರಿ ಪಂಕ್ತಿಯೂಟ, ಮೈಸೂರು ಪಾಕ್ ಮತ್ತು ಪರಿಶುದ್ಧ ತುಪ್ಪದ ರುಚಿ.',
  },
  {
    id: 'gal-hampi',
    category: 'heritage',
    titleEn: 'Vijayanagara Stone Chariot',
    titleKn: 'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥ',
    locationEn: 'Hampi, Vijayanagara',
    locationKn: 'ಹಂಪಿ, ವಿಜಯನಗರ',
    imageUrl: '/images/destinations/hampi.jpg',
    captionEn: 'UNESCO World Heritage monument standing proud amidst the boulder-strewn Tungabhadra valley.',
    captionKn: 'ತುಂಗಭದ್ರಾ ನದಿಯ ತೀರದಲ್ಲಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಗತವೈಭವ ಸಾರುವ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ.',
  },
  {
    id: 'gal-chikmagalur',
    category: 'nature',
    titleEn: 'Mullayanagiri Clouds & Peaks',
    titleKn: 'ಮುಳ್ಳಯ್ಯನಗಿರಿ ಮೋಡಗಳ ಸಾಗರ',
    locationEn: 'Chikmagalur',
    locationKn: 'ಚಿಕ್ಕಮಗಳೂರು',
    imageUrl: '/images/destinations/chikmagalur.jpg',
    captionEn: 'Highest summit of Karnataka draped in floating clouds and lush shola grasslands.',
    captionKn: 'ಕರ್ನಾಟಕದ ಅತಿ ಎತ್ತರದ ಶಿಖರದಲ್ಲಿ ತೇಲುವ ಮೋಡಗಳ ಸುಂದರ ದೃಶ್ಯ ಮತ್ತು ತಂಗಾಳಿ.',
  },
  {
    id: 'gal-gokarna',
    category: 'coastal',
    titleEn: 'Om Beach Coastal Serenity',
    titleKn: 'ಗೋಕರ್ಣದ ಓಂ ಕಡಲತೀರ',
    locationEn: 'Gokarna, Uttara Kannada',
    locationKn: 'ಗೋಕರ್ಣ, ಉತ್ತರ ಕನ್ನಡ',
    imageUrl: '/images/destinations/gokarna.jpg',
    captionEn: 'Natural Om-shaped bay where Western Ghats cliffs gently touch the Arabian Sea.',
    captionKn: 'ಅರಬ್ಬೀ ಸಮುದ್ರ ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಸಂಧಿಸುವ ಪವಿತ್ರ ಓಂ ಆಕಾರದ ರಮಣೀಯ ಕಡಲತೀರ.',
  },
  {
    id: 'gal-fleet-urbania',
    category: 'fleet',
    titleEn: 'Luxury Chauffeur Urbania & Tempo Fleet',
    titleKn: 'ಐಷಾರಾಮಿ ಅರ್ಬೇನಿಯಾ ಮತ್ತು ಟೆಂಪೋ ಟ್ರಾವೆಲರ್',
    locationEn: 'Mysuru & Bengaluru Hubs',
    locationKn: 'ಮೈಸೂರು & ಬೆಂಗಳೂರು ವಿಭಾಗ',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    captionEn: 'All-India tourist permitted luxury coaches with reclining push-back seating, air-conditioning and GPS.',
    captionKn: 'ಆರಾಮದಾಯಕ ಪುಶ್-ಬ್ಯಾಕ್ ಸೀಟುಗಳು, ಹವಾನಿಯಂತ್ರಿತ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಅನುಭವಿ ಸಾರಥಿಗಳನ್ನೊಳಗೊಂಡ ವಾಹನಗಳು.',
  },
  {
    id: 'gal-mysore-palace',
    category: 'heritage',
    titleEn: 'Mysore Palace Illumination',
    titleKn: 'ಮೈಸೂರು ಅರಮನೆಯ ದೀಪಾಲಂಕಾರ',
    locationEn: 'Mysuru Royal Heritage',
    locationKn: 'ಮೈಸೂರು ರಾಜಮನೆತನ',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    captionEn: 'Nearly 100,000 incandescent lamps illuminating the Indo-Saracenic royal seat of the Wodeyars.',
    captionKn: 'ದಸರಾ ಮತ್ತು ವಾರಾಂತ್ಯದಲ್ಲಿ ಲಕ್ಷ ದೀಪಗಳಿಂದ ಕಂಗೊಳಿಸುವ ಒಡೆಯರ್ ರಾಜವಂಶದ ಹೆಮ್ಮೆಯ ಅರಮನೆ.',
  },
];
