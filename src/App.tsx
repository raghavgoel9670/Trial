import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from "./supabase";
import {
  CheckCircle2,
  Droplets,
  Layers,
  Settings,
  Shield,
  Trash2,
  Thermometer,
  Wind,
  ArrowLeft,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// --- Types ---
type Screen = 'home' | 'product-list' | 'product-detail' | 'enquiry';

interface ProductSpec {
  airFlow: string;
  fanSize: string;
  tankCapacity: string;
  ratedPower: string;
  verticalLouvers: string;
  horizontalLouvers: string;
  castorWheels: string;
  dimensions: string;
  honeycombPad?: string;
}

interface Product {
  id: string;
  name: string;
  series: string;
  tagline: string;
  desc: string;
  image: string;
  specs: ProductSpec;
  features?: string[];
  bestFor?: string[];
}

interface SeriesItem {
  id: string;
  name: string;
  desc: string;
}

interface FeatureDef {
  name: string;
  desc: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

// --- Data ---

// Series IDs match the `series` field on each Product exactly
const PRODUCT_SERIES: SeriesItem[] = [
  { id: 'Rhino', name: 'RHINO Series', desc: 'Heavy-duty cooling for large spaces and commercial use.' },
  { id: 'Terminator', name: 'Terminator Series', desc: 'Powerful airflow with rugged design and high performance.' },
  { id: 'Nexo', name: 'NEXO Series', desc: 'Compact and stylish cooling for homes and small spaces.' },
  { id: 'Standard', name: 'Standard Series', desc: 'Reliable and efficient cooling for everyday household needs.' },
  { id: 'Copper Heavy Duty', name: 'Copper Heavy Duty Series', desc: 'Superior cooling performance with heavy duty copper winding technology.' },
  { id: 'Heavy Duty', name: 'Heavy Duty Series', desc: 'Robust construction with superior air delivery for intense heat.' }
];

const PRODUCTS: Product[] = [
  // RHINO
  {
    id: 'rhino-180',
    name: 'Rhino 180',
    series: 'Rhino',
    tagline: 'Strong Means Rhino',
    desc: 'The ultimate powerhouse for large commercial spaces, gyms, and banquets.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '11300 m3/h',
      fanSize: '26 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '750W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '1050 X 590 X 1420 mm'
    },
    features: ['High Strength Body', 'Power Packed Motor', 'Ice Chamber'],
    bestFor: ['Commercial Halls', 'Gyms', 'Restaurants']
  },
  // TERMINATOR
  {
    id: 'terminator-maxx-s-dlx-160',
    name: 'Terminator Maxx S. DLX 160',
    series: 'Terminator',
    tagline: 'Ultra High Performance',
    desc: 'Heavy duty performance with maximum air delivery and tank capacity.',
    image: 'https://images.unsplash.com/photo-1585338007604-f3da7428c5a8?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h / 80t',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '430W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '850 X 630 X 1500 mm',
      honeycombPad: 'Three Sides'
    }
  },
  {
    id: 'terminator-maxx-dlx-160',
    name: 'Terminator Maxx DLX 160',
    series: 'Terminator',
    tagline: 'Rugged Efficiency',
    desc: 'Standard duty performance for medium to large residential spaces.',
    image: 'https://images.unsplash.com/photo-1585338007604-f3da7428c5a8?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h / 80t',
      fanSize: '22 Inches',
      tankCapacity: '125 LTR',
      ratedPower: '430W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '850 X 630 X 1450 mm',
      honeycombPad: 'Three Sides'
    }
  },
  {
    id: 'terminator-s-dlx-160',
    name: 'Terminator S. DLX 160',
    series: 'Terminator',
    tagline: 'Super Deluxe Range',
    desc: 'Engineered for long-lasting performance and superior air throw.',
    image: 'https://images.unsplash.com/photo-1585338007604-f3da7428c5a8?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '430W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '850 X 630 X 1500 mm'
    }
  },
  {
    id: 'terminator-dlx-160',
    name: 'Terminator DLX 160',
    series: 'Terminator',
    tagline: 'Reliable Air Throw',
    desc: 'High performance cooling in a rugged, military-styled design.',
    image: 'https://images.unsplash.com/photo-1585338007604-f3da7428c5a8?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '125 LTR',
      ratedPower: '430W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '850 X 630 X 1450 mm'
    }
  },
  {
    id: 'terminator-160',
    name: 'Terminator 160',
    series: 'Terminator',
    tagline: 'Compact High Flow',
    desc: 'Efficient airflow design for tight spaces without compromising on power.',
    image: 'https://images.unsplash.com/photo-1585338007604-f3da7428c5a8?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '100 LTR',
      ratedPower: '430W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '850 X 630 X 1340 mm'
    }
  },
  // NEXO
  {
    id: 'nexo-120-dlx',
    name: 'Nexo 120 DLX',
    series: 'Nexo',
    tagline: 'Stylish Home Cooling',
    desc: 'Compact design with maximum reliability for modern home aesthetics.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '4200 m3/h',
      fanSize: '17 Inches',
      tankCapacity: '100 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '700 X 570 X 1360 mm'
    }
  },
  {
    id: 'nexo-120',
    name: 'Nexo 120',
    series: 'Nexo',
    tagline: 'Value for Home',
    desc: 'Power cooling in a space-saving footprint.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '4200 m3/h',
      fanSize: '17 Inches',
      tankCapacity: '75 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '700 X 570 X 1240 mm'
    }
  },
  {
    id: 'nexo-jr',
    name: 'Nexo JR',
    series: 'Nexo',
    tagline: 'Compact Power',
    desc: 'Perfect for small rooms and personal spaces.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '2400 m3/h',
      fanSize: '12 Inches',
      tankCapacity: '80 LTR',
      ratedPower: '180W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '550 X 420 X 1120 mm'
    }
  },
  // STANDARD
  {
    id: 'tashu-170-st',
    name: 'Tashu 170 ST',
    series: 'Standard',
    tagline: 'The Reliable Standard',
    desc: 'Superior air delivery with a classic, durable design.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '9500 m3/h',
      fanSize: '24 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '620W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '711 X 584 X 1474 mm'
    }
  },
  {
    id: '160-st-plus-std',
    name: '160 ST+',
    series: 'Standard',
    tagline: 'Performance Plus',
    desc: 'Enhanced air delivery for standard residential needs.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '711 X 584 X 1473 mm'
    }
  },
  {
    id: '150-st',
    name: '150 ST',
    series: 'Standard',
    tagline: 'Efficient Cooling',
    desc: 'Optimal performance with copper heavy duty winding.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '686 X 584 X 1473 mm'
    }
  },
  {
    id: '140-st-std',
    name: '140 ST',
    series: 'Standard',
    tagline: 'Compact Reliability',
    desc: 'Indigenous technology for small to medium room cooling.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '5100 m3/h',
      fanSize: '20 Inches',
      tankCapacity: '130 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '660 X 584 X 1473 mm'
    }
  },
  // COPPER HEAVY DUTY
  {
    id: '160-st-plus-copper',
    name: '160 ST+',
    series: 'Copper Heavy Duty',
    tagline: 'Copper Performance',
    desc: 'Premium series featuring heavy duty copper winding for extreme durability.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '711 X 584 X 1473 mm'
    }
  },
  {
    id: '150-st-copper',
    name: '150 ST',
    series: 'Copper Heavy Duty',
    tagline: 'High Efficiency Copper',
    desc: 'Reliable cooling with long-lasting motor life through copper technology.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '686 X 584 X 1473 mm'
    }
  },
  {
    id: '140-st-copper',
    name: '140 ST',
    series: 'Copper Heavy Duty',
    tagline: 'Compact Copper Power',
    desc: 'Powerful copper-wound motor in a space-saving design.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '5100 m3/h',
      fanSize: '20 Inches',
      tankCapacity: '130 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '660 X 584 X 1473 mm'
    }
  },
  // HEAVY DUTY
  {
    id: '160-st-plus-hd',
    name: '160 ST+',
    series: 'Heavy Duty',
    tagline: 'Robust Construction',
    desc: 'Designed for the most demanding environments.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '6200 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '150 LTR',
      ratedPower: '310W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '711 X 584 X 1473 mm'
    }
  },
  {
    id: '130-nm-plus',
    name: '130 NM+',
    series: 'Heavy Duty',
    tagline: 'Industrial Power',
    desc: 'Built to withstand the toughest summer conditions with simplified maintenance.',
    image: 'https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&q=80&w=800',
    specs: {
      airFlow: '5800 m3/h',
      fanSize: '22 Inches',
      tankCapacity: '100 LTR',
      ratedPower: '400W',
      verticalLouvers: 'Auto Swing',
      horizontalLouvers: 'Manual',
      castorWheels: 'YES',
      dimensions: '855 X 615 X 1370 mm'
    }
  }
];

// Icons stored as component references, not JSX instances
const COMMON_FEATURES: FeatureDef[] = [
  { name: "Auto Tank Fill", desc: "Float Valve Technology for non-stop performance.", Icon: Droplets },
  { name: "Auto Drain", desc: "Motorised water drainage system.", Icon: Trash2 },
  { name: "Dust Filter", desc: "Filters out particles for clean, dust-free air.", Icon: Layers },
  { name: "Ice Chamber", desc: "Speed up cooling with dedicated ice storage.", Icon: Thermometer },
  { name: "Shower Channel", desc: "Even water distribution over EcoCool pads.", Icon: Wind },
  { name: "Humidity Control", desc: "Adjust water usage for peak comfort.", Icon: Droplets },
  { name: "Anti-Bacterial Tank", desc: "Plastic coating prevents fungal growth.", Icon: Shield },
  { name: "DBB Motor", desc: "Heavy Duty Double Ball Bearing with Heat Sink.", Icon: Settings }
];

// --- NAVBAR ---

interface NavbarProps {
  onScreenChange: (screen: Screen) => void;
  activeScreen: Screen;
}

const Navbar = ({ onScreenChange, activeScreen }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; screen: Screen }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Catalogue', screen: 'product-list' },
    { label: 'Enquire', screen: 'enquiry' },
  ];

  const navigate = (screen: Screen) => {
    onScreenChange(screen);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div
          onClick={() => navigate('home')}
          className="font-black text-xl text-orange-500 cursor-pointer tracking-widest"
        >
          TASHU
        </div>

        {/* Desktop links — uses activeScreen to highlight current page */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(({ label, screen }) => (
            <button
              key={screen}
              onClick={() => navigate(screen)}
              className={`text-sm font-medium transition-colors ${
                activeScreen === screen
                  ? 'text-orange-500'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10 overflow-hidden"
          >
            {navLinks.map(({ label, screen }) => (
              <button
                key={screen}
                onClick={() => navigate(screen)}
                className={`block w-full text-left px-6 py-4 text-sm font-medium border-b border-white/5 ${
                  activeScreen === screen ? 'text-orange-500' : 'text-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- HOME SCREEN ---

interface HomeScreenProps {
  onScreenChange: (screen: Screen) => void;
  onSeriesSelect: (series: string) => void;
}

const HomeScreen = ({ onScreenChange, onSeriesSelect }: HomeScreenProps) => (
  <div className="pt-20">
    {/* Hero */}
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-black via-gray-900 to-black">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-black tracking-tight mb-4"
      >
        TASHU <span className="text-orange-500">COOLERS</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-gray-400 text-lg md:text-xl max-w-xl mb-8"
      >
        India's trusted air coolers — engineered for power, built for durability.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <button
          onClick={() => onScreenChange('product-list')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded font-semibold transition-colors"
        >
          View Catalogue
        </button>
        <button
          onClick={() => onScreenChange('enquiry')}
          className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-3 rounded font-semibold transition-colors"
        >
          Enquire Now
        </button>
      </motion.div>
    </section>

    {/* Series grid */}
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">Our Series</h2>
      <p className="text-gray-400 mb-8">Find the right cooler for your space.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCT_SERIES.map(s => (
          <button
            key={s.id}
            onClick={() => { onSeriesSelect(s.id); onScreenChange('product-list'); }}
            className="text-left border border-gray-700 rounded-lg p-5 hover:border-orange-500 transition-colors group"
          >
            <div className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">{s.name}</div>
            <p className="text-sm text-gray-400 mb-3">{s.desc}</p>
            <div className="flex items-center gap-1 text-orange-500 text-sm">
              View products <ChevronRight size={14} />
            </div>
          </button>
        ))}
      </div>
    </section>

    {/* Features grid */}
    <section className="bg-gray-900/50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2">Standard Features</h2>
        <p className="text-gray-400 mb-8">Every Tashu cooler comes packed with these.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMMON_FEATURES.map(({ name, desc, Icon }) => (
            <div key={name} className="border border-gray-700 rounded-lg p-4">
              <Icon size={24} className="text-orange-500 mb-2" />
              <div className="font-semibold text-sm mb-1">{name}</div>
              <p className="text-xs text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

// --- PRODUCT LIST ---

interface ProductListProps {
  onProductSelect: (p: Product) => void;
  activeSeries: string | null;
  onSeriesChange: (s: string | null) => void;
}

const ProductList = ({ onProductSelect, activeSeries, onSeriesChange }: ProductListProps) => {
  const filtered = activeSeries
    ? PRODUCTS.filter(p => p.series === activeSeries)
    : PRODUCTS;

  return (
    <div className="pt-24 max-w-7xl mx-auto px-6 pb-16">
      <h2 className="text-3xl font-bold mb-6">Catalogue</h2>

      {/* Series filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => onSeriesChange(null)}
          className={`px-4 py-2 rounded text-sm font-medium border transition-colors ${
            !activeSeries
              ? 'bg-orange-500 border-orange-500 text-white'
              : 'border-gray-600 text-gray-300 hover:border-orange-500'
          }`}
        >
          All
        </button>
        {PRODUCT_SERIES.map(s => (
          <button
            key={s.id}
            onClick={() => onSeriesChange(s.id)}
            className={`px-4 py-2 rounded text-sm font-medium border transition-colors ${
              activeSeries === s.id
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'border-gray-600 text-gray-300 hover:border-orange-500'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div
            key={p.id}
            onClick={() => onProductSelect(p)}
            className="border border-gray-700 rounded-lg p-5 cursor-pointer hover:border-orange-500 transition-colors"
          >
            <div className="text-xs text-orange-500 font-medium mb-1">{p.series}</div>
            <h3 className="font-bold text-lg mb-1">{p.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{p.tagline}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{p.specs.airFlow}</span>
              <span>{p.specs.tankCapacity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- PRODUCT DETAIL ---

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
  onEnquire: () => void;
}

const ProductDetail = ({ product, onBack, onEnquire }: ProductDetailProps) => {
  if (!product) {
    return (
      <div className="pt-32 text-center text-gray-400">
        <p>No product selected.</p>
        <button onClick={onBack} className="mt-4 text-orange-500 underline">
          Back to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 pb-16 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-orange-500 hover:text-orange-400 transition-colors"
      >
        <ArrowLeft size={18} /> Back to Catalogue
      </button>
      <div className="text-xs text-orange-500 font-medium mb-1">{product.series}</div>
      <h2 className="text-3xl font-bold mb-1">{product.name}</h2>
      <p className="text-orange-400 mb-2">{product.tagline}</p>
      <p className="text-gray-300 mb-8">{product.desc}</p>

      <h3 className="font-semibold text-lg mb-3">Specifications</h3>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {Object.entries(product.specs).map(([key, val]) => (
          <div key={key} className="border border-gray-700 rounded-lg p-3">
            <div className="text-xs text-gray-400 capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1')}
            </div>
            <div className="font-semibold text-sm">{val}</div>
          </div>
        ))}
      </div>

      {product.features && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3">Key Features</h3>
          <ul className="flex flex-col gap-2">
            {product.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.bestFor && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3">Best For</h3>
          <div className="flex flex-wrap gap-2">
            {product.bestFor.map(b => (
              <span key={b} className="bg-gray-800 text-sm px-3 py-1 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onEnquire}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition-colors"
      >
        Enquire About This Product
      </button>
    </div>
  );
};

// --- ENQUIRY ---

interface EnquirySectionProps {
  initialProduct?: string;
  onBackHome: () => void;
}

const EnquirySection = ({ initialProduct = '', onBackHome }: EnquirySectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    enquiryType: 'Dealer',
    product: initialProduct,
    city: '',
    state: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from("enquiries")
      .insert([{
        full_name: formData.name,
        mobile: formData.phone,
        enquiry_type: formData.enquiryType,
        interested_product: formData.product,
        city: formData.city,
        state: formData.state,
        message: formData.message,
      }]);

    if (error) {
      alert("Submission failed. Please try again.");
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-6">
        <CheckCircle2 size={64} className="text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Enquiry Submitted!</h2>
        <p className="text-gray-400 mb-6">We'll get back to you shortly.</p>
        <button
          onClick={onBackHome}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-2">Enquire</h2>
        <p className="text-gray-400 mb-8">Fill in your details and we'll reach out.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="p-3 text-black rounded"
          />
          <input
            placeholder="Mobile Number"
            required
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="p-3 text-black rounded"
          />
          <select
            value={formData.enquiryType}
            onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}
            className="p-3 text-black rounded"
          >
            <option value="Dealer">Dealer</option>
            <option value="Distributor">Distributor</option>
            <option value="Wholesaler">Wholesaler</option>
          </select>
          <input
            placeholder="Interested Product"
            value={formData.product}
            onChange={e => setFormData({ ...formData, product: e.target.value })}
            className="p-3 text-black rounded"
          />
          <input
            placeholder="City"
            required
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
            className="p-3 text-black rounded"
          />
          <input
            placeholder="State"
            value={formData.state}
            onChange={e => setFormData({ ...formData, state: e.target.value })}
            className="p-3 text-black rounded"
          />
          <textarea
            placeholder="Message (optional)"
            rows={4}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            className="p-3 text-black rounded"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded font-semibold transition-colors"
          >
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

// --- APP ---

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);

  const handleProductSelect = (p: Product) => {
    setSelectedProduct(p);
    setActiveScreen('product-detail');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar onScreenChange={setActiveScreen} activeScreen={activeScreen} />

      <AnimatePresence mode="wait">
        {activeScreen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomeScreen
              onScreenChange={setActiveScreen}
              onSeriesSelect={s => { setActiveSeries(s); }}
            />
          </motion.div>
        )}

        {activeScreen === 'product-list' && (
          <motion.div key="product-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProductList
              onProductSelect={handleProductSelect}
              activeSeries={activeSeries}
              onSeriesChange={setActiveSeries}
            />
          </motion.div>
        )}

        {activeScreen === 'product-detail' && (
          <motion.div key="product-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProductDetail
              product={selectedProduct}
              onBack={() => setActiveScreen('product-list')}
              onEnquire={() => setActiveScreen('enquiry')}
            />
          </motion.div>
        )}

        {activeScreen === 'enquiry' && (
          // key includes product id so EnquirySection remounts fresh when product changes
          <motion.div key={`enquiry-${selectedProduct?.id ?? 'none'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EnquirySection
              initialProduct={selectedProduct?.name ?? ''}
              onBackHome={() => setActiveScreen('home')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
