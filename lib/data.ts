export const companyInfo = {
  name: 'Connexus Medical Supplies',
  shortName: 'Connexus Medical',
  tagline: 'Quality Healthcare Solutions',
  phone: '+1 (512) 872-1111',
  email: 'info@connexusmedsupplies.com',
  address: {
    street: '30 N Gould St Suite R',
    city: 'Sheridan',
    state: 'WY',
    zip: '82801',
    full: '30 N Gould St Suite R, Sheridan, WY 82801',
  },
  hours: {
    weekday: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 4:00 PM',
    emergency: 'Emergency: 24/7 Available',
  },
  founded: 2010,
  developer: 'Cubico Technologies',
}

export const products = [
  {
    category: 'Wheelchairs',
    slug: 'wheelchairs',
    description: 'Reliable, comfortable wheelchairs designed for everyday independence and mobility.',
    items: [
      {
        name: 'Standard Wheelchair',
        imageSlot: 'product-standard-wheelchair' as const,
        description: 'Built for everyday comfort and durability. Our standard wheelchair features a lightweight aluminum frame, foldable design, padded armrests, and adjustable footrests — making it ideal for home, clinic, or on-the-go use.',
        features: ['Lightweight aluminum frame', 'Foldable for easy storage', 'Padded armrests', 'Adjustable footrests', 'Durable wheel construction'],
      },
      {
        name: 'Transport Wheelchair',
        imageSlot: 'product-transport-wheelchair' as const,
        description: 'Compact and ultra-lightweight, perfect for travel and short-distance transport. Features swing-away footrests, a compact fold, and smooth-rolling wheels for effortless mobility.',
        features: ['Ultra-lightweight design', 'Compact fold for travel', 'Swing-away footrests', 'Smooth-rolling rear wheels', 'Companion-operated brakes'],
      },
    ],
  },
  {
    category: 'Mobility Aids',
    slug: 'mobility-aids',
    description: 'Supportive tools that keep you moving with confidence and stability.',
    items: [
      {
        name: 'Rollator Walker',
        imageSlot: 'product-rollator-walker' as const,
        description: 'A four-wheel rollator with a built-in seat, storage basket, and ergonomic hand brakes. Provides stable support for those who need a reliable walking companion with the option to rest anytime.',
        features: ['Four-wheel stability', 'Built-in padded seat', 'Under-seat storage basket', 'Ergonomic hand brakes', 'Height-adjustable handles'],
      },
      {
        name: 'Walking Cane',
        imageSlot: 'product-walking-cane' as const,
        description: 'Ergonomically designed for comfort and stability. Features an anti-slip rubber base, cushioned grip, and adjustable height to suit any user — a simple yet essential mobility tool.',
        features: ['Ergonomic cushioned grip', 'Anti-slip rubber base', 'Adjustable height', 'Lightweight construction', 'Stylish and durable'],
      },
    ],
  },
  {
    category: 'Diabetic Care',
    slug: 'diabetic-care',
    description: 'Accurate monitoring tools and supplies to manage diabetes with confidence.',
    items: [
      {
        name: 'Blood Glucose Monitor',
        imageSlot: 'product-glucose-monitor' as const,
        description: 'A digital glucose monitoring system with a large, easy-to-read display, fast 5-second results, built-in memory storage for tracking trends, and auto-coding for hassle-free testing.',
        features: ['Large digital display', 'Fast 5-second results', 'Memory storage for 500+ readings', 'Auto-coding technology', 'Compact and portable'],
      },
      {
        name: 'Diabetic Supply Kit',
        imageSlot: 'product-diabetic-kit' as const,
        description: 'Everything you need in one convenient package — testing strips, sterile lancets, and a durable carrying case. Designed for daily management on the go.',
        features: ['Testing strips included', 'Sterile lancets', 'Durable carrying case', 'Travel-friendly size', 'Compatible with major monitors'],
      },
    ],
  },
  {
    category: 'Orthopedic Braces',
    slug: 'orthopedic-braces',
    description: 'Targeted support and compression for joint recovery and daily comfort.',
    items: [
      {
        name: 'Knee Brace',
        imageSlot: 'product-knee-brace' as const,
        description: 'Hinged knee support with adjustable compression straps and breathable material. Provides stability during recovery and everyday activity without restricting natural movement.',
        features: ['Hinged bilateral support', 'Adjustable compression straps', 'Breathable mesh fabric', 'Non-slip silicone grip', 'Fits left or right knee'],
      },
      {
        name: 'Back Support Belt',
        imageSlot: 'product-back-support' as const,
        description: 'Lumbar support belt with dual compression bands and adjustable sizing. Relieves lower back strain and promotes proper posture during work or recovery.',
        features: ['Dual compression bands', 'Adjustable lumbar sizing', 'Breathable elastic material', 'Ergonomic contouring', 'Discreet under-clothing fit'],
      },
    ],
  },
]

export const services = [
  {
    title: 'Expert Consultation & Fitting',
    description: 'Personalized guidance from our medical equipment specialists to find the right products for your specific needs.',
    icon: 'Users',
  },
  {
    title: 'FDA-Certified Equipment',
    description: 'Every product meets rigorous FDA compliance standards and is thoroughly tested for safety and reliability.',
    icon: 'Shield',
  },
  {
    title: 'Insurance & Billing Support',
    description: 'Our team helps you navigate insurance claims and billing so you can focus on what matters — your health.',
    icon: 'FileText',
  },
  {
    title: 'Ongoing Maintenance',
    description: 'We stand behind our products with continued maintenance support to keep your equipment in top condition.',
    icon: 'Wrench',
  },
  {
    title: 'Personalized Fitting',
    description: 'Custom fitting services to ensure maximum comfort, safety, and effectiveness of every product.',
    icon: 'Heart',
  },
  {
    title: 'Reliable Delivery',
    description: 'Door-to-door delivery with careful handling to ensure your equipment arrives in perfect condition.',
    icon: 'Truck',
  },
]

export const milestones = [
  { year: '2010', title: 'Founded in Sheridan, WY', description: 'Connexus Medical Supplies opened as a small medical equipment store committed to serving the local community.' },
  { year: '2015', title: 'Expanded Product Line', description: 'Grew our catalog to over 500 items across 8 product categories, serving patients and facilities across Wyoming.' },
  { year: '2020', title: 'Regional Recognition', description: 'Named a top medical equipment supplier in the Mountain West region for quality and customer satisfaction.' },
  { year: '2025', title: 'Serving 500+ Customers', description: 'Now delivering over 1,000 products annually to patients, families, and healthcare facilities nationwide.' },
]

export const values = [
  { title: 'Patient First', description: 'Every decision we make is guided by what is best for the patient — their comfort, independence, and wellbeing.' },
  { title: 'Quality Assured', description: 'We only carry FDA-certified products that meet the highest standards of safety, durability, and performance.' },
  { title: 'Expert Team', description: 'Our specialists bring years of experience in medical equipment, offering personalized support and fitting.' },
  { title: 'Fast Delivery', description: 'Reliable door-to-door delivery with careful handling, because your health cannot wait.' },
]
