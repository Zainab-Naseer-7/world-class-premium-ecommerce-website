/**
 * AURA & CO. — Haute Horlogerie & High Luxury Atelier
 * Curated Luxury Products Dataset
 */

const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AED: { symbol: 'د.إ', rate: 3.67, label: 'AED (د.إ)' },
  PKR: { symbol: '₨', rate: 278.5, label: 'PKR (₨)' }
};

const PRODUCTS = [
  {
    id: 'aura-01',
    name: 'Chronographe Éternel Tourbillon',
    category: 'horology',
    categoryName: 'Haute Horlogerie',
    priceUSD: 4850,
    originalPriceUSD: 5400,
    rating: 4.95,
    reviewsCount: 42,
    badge: 'Limited to 50 Pieces',
    badgeType: 'limited',
    inStock: true,
    stockCount: 4,
    description: 'An exceptional hand-wound tourbillon timepiece featuring an open-worked skeleton dial, sapphire crystal caseback, and hand-stitched alligator leather strap.',
    story: 'Crafted in the Vallée de Joux, Switzerland, requiring over 180 hours of hand-finishing by master horologists.',
    specs: {
      'Case Diameter': '41mm',
      'Movement': 'Calibre A-88 Manual Tourbillon (72h Reserve)',
      'Material': '18k Rose Gold & Grade 5 Titanium',
      'Glass': 'Double Anti-Reflective Domed Sapphire',
      'Water Resistance': '50 Metres (5 ATM)'
    },
    colors: [
      { name: 'Rose Gold & Obsidian', hex: '#b76e79', active: true },
      { name: 'Platinum & Slate', hex: '#e5e4e2', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1547996160-71dfa63582d8?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-02',
    name: 'Le Grand Voyageur Leather Holdall',
    category: 'leather',
    categoryName: 'Fine Leather',
    priceUSD: 2450,
    originalPriceUSD: 2750,
    rating: 4.9,
    reviewsCount: 68,
    badge: 'Artisan Crafted',
    badgeType: 'artisan',
    inStock: true,
    stockCount: 7,
    description: 'Handcrafted in Florence using full-grain vegetable-tanned Tuscan calfskin, finished with palladium-plated brass hardware and suede lining.',
    story: 'Tanned using traditional organic chestnut bark extracts over 60 days for an unparalleled patina that matures with each journey.',
    specs: {
      'Dimensions': '52cm x 30cm x 26cm (Cabin Approved)',
      'Leather': 'Full-Grain Tuscan Vachetta Leather',
      'Hardware': 'Palladium-Plated Solid Brass',
      'Lining': 'Sand Micro-Suede with Monogram Clasp',
      'Origin': 'Florence, Italy'
    },
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4513', active: true },
      { name: 'Midnight Onyx', hex: '#1C1C1C', active: false },
      { name: 'Imperial Forest', hex: '#1E3A2F', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-03',
    name: 'Santal Impérial Extrait de Parfum',
    category: 'parfumerie',
    categoryName: 'Haute Parfumerie',
    priceUSD: 680,
    originalPriceUSD: 750,
    rating: 4.98,
    reviewsCount: 114,
    badge: 'Masterpiece',
    badgeType: 'bestseller',
    inStock: true,
    stockCount: 12,
    description: 'An opulent 32% pure oil concentration marrying rare aged Mysore sandalwood, saffron from Kashmir, Damask rose, and smoldering Cambodian oud.',
    story: 'Distilled in Grasse, France by legendary third-generation master perfumer. Sealed in a bespoke crystal flacon with 24k gold leaf collar.',
    specs: {
      'Volume': '100ml / 3.4 fl. oz.',
      'Concentration': 'Extrait de Parfum (32% Pure Essence)',
      'Top Notes': 'Cardamom, Kashmiri Saffron, Pink Peppercorn',
      'Heart Notes': 'Orris Butter, Turkish Rose Absolute, Cedar',
      'Base Notes': 'Aged Mysore Sandalwood, Oud, Ambergris'
    },
    colors: [
      { name: 'Smoked Obsidian Flacon', hex: '#262421', active: true }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-04',
    name: 'Constellation Solitaire Diamond Ring',
    category: 'jewelry',
    categoryName: 'Fine Jewelry',
    priceUSD: 8900,
    originalPriceUSD: 9800,
    rating: 5.0,
    reviewsCount: 29,
    badge: 'Certified GIA',
    badgeType: 'limited',
    inStock: true,
    stockCount: 2,
    description: 'A breathtaking 2.50ct cushion-cut VVS1 Flawless diamond suspended in our signature micro-pavé 18k yellow gold and platinum architectural band.',
    story: 'Ethically mined with conflict-free provenance tracking, hand-set under microscopic precision in Antwerp.',
    specs: {
      'Main Stone': '2.50 Carat Cushion Brilliant',
      'Clarity / Color': 'VVS1 Clarity, D Flawless Color',
      'Precious Metal': '950 Platinum & 18k Yellow Gold',
      'Certification': 'GIA Verified Dossier Included',
      'Band Width': '2.1mm Micro-Pavé'
    },
    colors: [
      { name: '18k Yellow Gold & Platinum', hex: '#e6ca65', active: true },
      { name: 'Pure Platinum 950', hex: '#d9d9d9', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-05',
    name: 'Aero-Titanium Aviator Sunglasses',
    category: 'eyewear',
    categoryName: 'Designer Eyewear',
    priceUSD: 850,
    originalPriceUSD: 950,
    rating: 4.88,
    reviewsCount: 53,
    badge: 'Ultralight',
    badgeType: 'bestseller',
    inStock: true,
    stockCount: 9,
    description: 'Engineered from featherlight Japanese beta-titanium with 24k gold accents and polarized barberini mineral crystal lenses with zero distortion.',
    story: 'Precision laser cut in Sabae, Fukui prefecture, requiring 240 artisan steps over five months.',
    specs: {
      'Frame Weight': 'Just 16.5 Grams',
      'Lens Material': 'Barberini Polarized Mineral Glass',
      'Frame Construction': '100% Japanese Beta-Titanium',
      'UV Protection': '100% UV400 Protection & Hydrophobic Coat',
      'Dimensions': '54-18-145mm'
    },
    colors: [
      { name: 'Brushed Gold & Tobacco', hex: '#d4af37', active: true },
      { name: 'Matte Gunmetal & Polar Blue', hex: '#4f555c', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-06',
    name: 'Nautique Perpetual Calendar Chrono',
    category: 'horology',
    categoryName: 'Haute Horlogerie',
    priceUSD: 6200,
    originalPriceUSD: 6900,
    rating: 4.97,
    reviewsCount: 38,
    badge: 'Collector Edition',
    badgeType: 'limited',
    inStock: true,
    stockCount: 3,
    description: 'An icon of maritime elegance with deep marine sunburst guilloché dial, astronomical moonphase indicator, and integrated link bracelet.',
    story: 'Equipped with a self-winding automatic manufacture movement accurate to within 1 second per year on astronomical moonphase tracking.',
    specs: {
      'Case': '39.5mm 904L Marine Stainless Steel',
      'Functions': 'Perpetual Calendar, Moonphase, Flyback Chrono',
      'Power Reserve': '65 Hours Automatic Winding',
      'Bezel': 'Ceramic Inlay with Liquidmetal® Markers',
      'Water Resistance': '150 Metres (15 ATM)'
    },
    colors: [
      { name: 'Deep Ocean Blue & Silver', hex: '#192841', active: true },
      { name: 'Emerald Sunburst', hex: '#0f382c', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-07',
    name: 'Atelier Signature Envelope Clutch',
    category: 'leather',
    categoryName: 'Fine Leather',
    priceUSD: 1850,
    originalPriceUSD: 2100,
    rating: 4.92,
    reviewsCount: 47,
    badge: 'Iconic Design',
    badgeType: 'bestseller',
    inStock: true,
    stockCount: 8,
    description: 'Sculpted from box-calf leather with magnetic gold-plated sculptural closure and detachable woven curb chain strap for evening elegance.',
    story: 'Hand-sewn with wax-coated French linen threads using the timeless double-saddle stitch technique.',
    specs: {
      'Dimensions': '28cm x 17cm x 5cm',
      'Leather': 'French Box-Calf with Micro-Grain Finish',
      'Chain': 'Removable 18k Gilded Brass Serpent Chain',
      'Interior': 'Two Gusseted Compartments & Card Slots',
      'Closure': 'Concealed Magnetic Jewel Clasp'
    },
    colors: [
      { name: 'Noir Ébène', hex: '#111111', active: true },
      { name: 'Bordeaux Grand Cru', hex: '#4c1524', active: false },
      { name: 'Crème de Cachemire', hex: '#e8dfd8', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-08',
    name: 'Soleil Doré Colombian Emerald Pendant',
    category: 'jewelry',
    categoryName: 'Fine Jewelry',
    priceUSD: 7200,
    originalPriceUSD: 7900,
    rating: 4.96,
    reviewsCount: 31,
    badge: 'One of a Kind',
    badgeType: 'limited',
    inStock: true,
    stockCount: 1,
    description: 'An exceptional 3.8ct Muzo Colombian emerald of incandescent clarity, haloed by marquise-cut F/VS diamonds on an 18k solid yellow gold chain.',
    story: 'Originating from the legendary Muzo mine with minor cedarwood oil treatment only. Hand-crafted in Geneva atelier.',
    specs: {
      'Center Gem': '3.80 Carat Octagonal Muzo Emerald',
      'Accent Stones': '1.15ct Total Marquise Diamonds',
      'Metal': 'Solid 18k Fairmined Yellow Gold',
      'Chain Length': '45cm Adjustable Diamond Cut Cable',
      'Origin Certificate': 'Gübelin Gem Lab Report Included'
    },
    colors: [
      { name: '18k Yellow Gold', hex: '#d4af37', active: true }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-09',
    name: 'Cuir & Ambre Soir Eau de Parfum',
    category: 'parfumerie',
    categoryName: 'Haute Parfumerie',
    priceUSD: 520,
    originalPriceUSD: 580,
    rating: 4.89,
    reviewsCount: 76,
    badge: 'Bespoke Blend',
    badgeType: 'artisan',
    inStock: true,
    stockCount: 15,
    description: 'A deeply sensual nocturnal composition of smoked Spanish labdanum, aged bourbon vanilla, rare white amber, and supple glove leather.',
    story: 'Aged in French oak casks for six months before hand-bottling to achieve mature olfactory equilibrium.',
    specs: {
      'Volume': '100ml / 3.4 fl. oz.',
      'Concentration': 'Eau de Parfum Intense (26% Essence)',
      'Opening': 'Bergamot from Calabria, Leather Accord',
      'Heart': 'Bourbon Vanilla Bean, Labdanum Resinoid',
      'Drydown': 'White Amber, Benzoin of Siam, Tonka'
    },
    colors: [
      { name: 'Amber Smoked Glass', hex: '#633918', active: true }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-10',
    name: 'Palazzo Geometric Optical Frame',
    category: 'eyewear',
    categoryName: 'Designer Eyewear',
    priceUSD: 690,
    originalPriceUSD: 780,
    rating: 4.87,
    reviewsCount: 39,
    badge: 'New Season',
    badgeType: 'new',
    inStock: true,
    stockCount: 6,
    description: 'Hexagonal silhouette sculpted from layered Japanese bio-acetate with wire-core temples engraved with Roman palazzo arch motifs.',
    story: 'Constructed using plant-derived eco-acetate buffed by hand with pumice powder for an extraordinary silky luster.',
    specs: {
      'Material': '10mm Custom Japanese Bio-Acetate',
      'Hinges': '7-Barrel Custom German Engineered Hinges',
      'Bridge': 'Keyhole Ergonomic Universal Fit',
      'Engraving': 'Laser Guilloché Temple Core Wire',
      'Dimensions': '50-20-148mm'
    },
    colors: [
      { name: 'Dark Tortoiseshell & Gold', hex: '#4a2c11', active: true },
      { name: 'Crystal Champagne & Silver', hex: '#d9cdbe', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-11',
    name: 'Executive Minimalist Card Case & Clip',
    category: 'leather',
    categoryName: 'Fine Leather',
    priceUSD: 490,
    originalPriceUSD: 550,
    rating: 4.93,
    reviewsCount: 88,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    inStock: true,
    stockCount: 20,
    description: 'Slimline wallet crafted in French Epsom leather with RFID shielding and an integrated magnetic 18k gold-plated bill clip.',
    story: 'Sleek, feather-thin architecture that slips effortlessly into the breast pocket of an Italian tailored suit.',
    specs: {
      'Capacity': '6 Card Slots, Central Bill Compartment',
      'Shielding': 'Aero-grade RFID Signal Blocking Mesh',
      'Leather': 'French Epsom Scratch-Resistant Calf',
      'Clip': 'Solid Brass with 18k Satin Gold Finish',
      'Dimensions': '10cm x 7.5cm x 0.6cm'
    },
    colors: [
      { name: 'Onyx Black', hex: '#161616', active: true },
      { name: 'Monaco Blue', hex: '#1b263b', active: false },
      { name: 'Caramel Hazelnut', hex: '#93582e', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 'aura-12',
    name: 'Celestial Diamond Tennis Bracelet',
    category: 'jewelry',
    categoryName: 'Fine Jewelry',
    priceUSD: 6500,
    originalPriceUSD: 7200,
    rating: 4.99,
    reviewsCount: 52,
    badge: 'Heritage Collection',
    badgeType: 'artisan',
    inStock: true,
    stockCount: 5,
    description: 'A continuous ribbon of 5.20 carats of brilliant-cut round diamonds in a flexible four-prong 18k white gold tennis setting with double safety lock.',
    story: 'Engineered with articulated micro-hinges that drape gracefully along the wrist like molten liquid crystal.',
    specs: {
      'Total Carat Weight': '5.20ctw Natural Diamonds',
      'Color & Clarity': 'E-F Color, VS1+ Clarity',
      'Setting Metal': '18k White Gold (Available in Yellow Gold)',
      'Length': '17.5cm / 7.0 inches (Bespoke Sizing Free)',
      'Locking Mechanism': 'Concealed Box Clasp with Dual Safety Catches'
    },
    colors: [
      { name: '18k White Gold', hex: '#eaeaea', active: true },
      { name: '18k Yellow Gold', hex: '#d4af37', active: false }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85'
    ]
  }
];

const PROMO_CODES = {
  'AURA10': { type: 'percent', value: 10, description: '10% Privileged Collector Discount' },
  'VIP2026': { type: 'fixed', value: 150, description: '$150 Exclusive Salon Gift' },
  'CONCIERGE': { type: 'shipping', value: 0, description: 'Complimentary White-Glove Courier Delivery' }
};

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The Chronographe Éternel arrived in a hand-lacquered walnut box with an authenticated certificate of origin. The finishing on the tourbillon cage easily rivals Patek and Vacheron. An absolute triumph.",
    author: "Lord Julian Hastings",
    title: "Horology Collector & Patron",
    location: "Mayfair, London",
    verified: true,
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    quote: "Aura & Co.'s bespoke white-glove concierge is beyond anything I have experienced online. The leather holdall has traveled with me to Tokyo, Milan, and Zurich — the patina it has developed is stunning.",
    author: "Elena Rostova",
    title: "Architectural Director",
    location: "Geneva, Switzerland",
    verified: true,
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    quote: "Santal Impérial is the pinnacle of haute parfumerie. Deep, mysterious, and extraordinarily long-lasting. I receive compliments everywhere from boardroom meetings in Manhattan to galas in Dubai.",
    author: "Tariq Al-Mansoor",
    title: "Private Equity Executive",
    location: "Dubai, UAE",
    verified: true,
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

const CRAFTSMANSHIP_STEPS = [
  {
    step: '01',
    title: 'Sovereign Provenance',
    subtitle: 'Uncompromising Materials',
    description: 'We source only ethically certified 18k Fairmined gold, GIA certified conflict-free diamonds, and full-grain Tuscan hides tanned with natural plant extracts.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '02',
    title: 'Atelier Handcraft',
    subtitle: 'Generational Mastery',
    description: 'Each creation is brought to life by master artisans in Switzerland, Florence, and Antwerp through hundreds of hours of delicate hand-tooling and assembly.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '03',
    title: 'Lifetime Concierge',
    subtitle: 'Perpetual Assurance',
    description: 'Every piece is accompanied by a registered certificate of authenticity, complimentary worldwide white-glove delivery, and lifetime atelier maintenance.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  }
];
