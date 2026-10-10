import type { Category, Product } from '../types';

export const CATEGORIES: Category[] = ['Electronics', 'Fashion', 'Home & Lifestyle'];

export const PRODUCTS: Product[] = [
  {
    id: 'wireless-mouse',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 899,
    stock: 25,
    image: '/images/wireless-mouse.svg',
    description:
      'A lightweight ergonomic mouse with silent switches, an adjustable 800–1600 DPI sensor and up to 12 months of battery life on a single AA cell.',
    tags: ['computer', 'accessories', 'wireless'],
  },
  {
    id: 'mechanical-keyboard',
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 1999,
    stock: 12,
    image: '/images/mechanical-keyboard.svg',
    description:
      'A tenkeyless mechanical keyboard with tactile brown switches, white backlighting and a detachable USB-C cable, built for long coding sessions.',
    tags: ['computer', 'accessories', 'typing'],
  },
  {
    id: 'laptop-stand',
    name: 'Laptop Stand',
    category: 'Electronics',
    price: 1299,
    stock: 18,
    image: '/images/laptop-stand.svg',
    description:
      'Raise your screen to eye level with this foldable aluminium stand. Six height settings, anti-slip pads and support for laptops up to 17 inches.',
    tags: ['computer', 'accessories', 'ergonomic'],
  },
  {
    id: 'headphones',
    name: 'Headphones',
    category: 'Electronics',
    price: 2499,
    stock: 9,
    image: '/images/headphones.svg',
    description:
      'Comfortable over-ear Bluetooth headphones with deep bass, a built-in microphone and up to 30 hours of playback per charge.',
    tags: ['audio', 'wireless', 'music'],
  },
  {
    id: 'usb-c-hub',
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 2999,
    stock: 14,
    image: '/images/usb-c-hub.svg',
    description:
      'Expand a single USB-C port into HDMI 4K output, three USB-A ports, SD and microSD card readers and 100 W pass-through charging.',
    tags: ['computer', 'accessories', 'adapter'],
  },
  {
    id: 'smartwatch',
    name: 'Smartwatch',
    category: 'Electronics',
    price: 4999,
    stock: 0,
    image: '/images/smartwatch.svg',
    description:
      'Track workouts, sleep, heart rate and SpO2 on a bright 1.4-inch AMOLED display. Water resistant to 5 ATM with up to 10 days of battery.',
    tags: ['wearable', 'fitness', 'wireless'],
  },
  {
    id: 'backpack',
    name: 'Backpack',
    category: 'Fashion',
    price: 1499,
    stock: 20,
    image: '/images/backpack.svg',
    description:
      'A 25-litre everyday backpack in water-resistant fabric with a padded 15.6-inch laptop sleeve, bottle pockets and a hidden back pocket.',
    tags: ['bags', 'travel', 'college'],
  },
  {
    id: 't-shirt',
    name: 'T-Shirt',
    category: 'Fashion',
    price: 599,
    stock: 40,
    image: '/images/t-shirt.svg',
    description:
      'A soft, breathable crew-neck T-shirt made from 100% organic cotton. Pre-shrunk, relaxed fit and printed with the Y-School logo.',
    tags: ['clothing', 'cotton', 'casual'],
  },
  {
    id: 'coffee-mug',
    name: 'Coffee Mug',
    category: 'Home & Lifestyle',
    price: 399,
    stock: 35,
    image: '/images/coffee-mug.svg',
    description:
      'A sturdy 350 ml ceramic mug with a matte glaze and a comfortable handle. Microwave and dishwasher safe.',
    tags: ['kitchen', 'drinkware', 'gift'],
  },
  {
    id: 'notebook',
    name: 'Notebook',
    category: 'Home & Lifestyle',
    price: 199,
    stock: 60,
    image: '/images/notebook.svg',
    description:
      'An A5 hardcover notebook with 160 dotted pages of smooth 80 gsm paper, a ribbon bookmark and an elastic closure.',
    tags: ['stationery', 'paper', 'college'],
  },
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    category: 'Home & Lifestyle',
    price: 699,
    stock: 30,
    image: '/images/water-bottle.svg',
    description:
      'A double-wall vacuum insulated stainless steel bottle that keeps drinks cold for 24 hours or hot for 12. Leak-proof lid included.',
    tags: ['drinkware', 'travel', 'fitness'],
  },
  {
    id: 'desk-lamp',
    name: 'Desk Lamp',
    category: 'Home & Lifestyle',
    price: 1799,
    stock: 7,
    image: '/images/desk-lamp.svg',
    description:
      'A flexible-arm LED desk lamp with three colour temperatures, five brightness levels and a USB charging port in the base.',
    tags: ['lighting', 'electronics', 'study'],
  },
];

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
