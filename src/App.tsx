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
  ChevronRight,
  Zap,
  Factory,
  Phone
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
    image: '/rhino-180.jpg',
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
    image: '/terminator-maxx-s-dlx-160.jpg',
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
    image: '/terminator-maxx-dlx-160.jpg',
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
    image: '/terminator-s-dlx-160.jpg',
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
    image: '/terminator-dlx-160.jpg',
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
    image: '/terminator-160.jpg',
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
    image: '/nexo-120-dlx.jpg',
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
    image: '/nexo-120.jpg',
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
    image: '/nexo-jr.jpg',
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
    image: '/tashu-170-st.jpg',
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
    image: '/160-st-plus.jpg',
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
    image: '/150-st.jpg',
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
    image: '/140-st.jpg',
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
    image: '/160-st-plus.jpg',
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
    image: '/150-st.jpg',
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
    image: '/140-st.jpg',
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
    image: '/160-st-plus.jpg',
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
    image: '/130-nm-plus.jpg',
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
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div
          onClick={() => navigate('home')}
          className="font-black text-xl tracking-widest cursor-pointer"
        >
          <span className="gradient-text">TASHU</span>
          <span className="text-orange-500 ml-1">●</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, screen }) => (
            <button
              key={screen}
              onClick={() => navigate(screen)}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeScreen === screen
                  ? 'text-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => navigate('enquiry')}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors accent-glow"
          >
            Get Quote
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            {navLinks.map(({ label, screen }) => (
              <button
                key={screen}
                onClick={() => navigate(screen)}
                className={`block w-full text-left px-6 py-4 text-sm font-semibold border-b border-white/5 transition-colors ${
                  activeScreen === screen ? 'text-orange-500' : 'text-gray-300 hover:text-white'
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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="airflow-visual absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-semibold text-orange-400 mb-6 tracking-widest uppercase"
      >
        <Zap size={12} /> India's Most Trusted Air Coolers
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 text-6xl md:text-8xl font-black tracking-tight mb-4 leading-none"
      >
        <span className="gradient-text">TASHU</span>
        <br />
        <span className="text-orange-500">COOLERS</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed"
      >
        <span className="block text-2xl md:text-3xl font-black text-orange-500 tracking-widest mb-2">"MAUSAM BADAL DE"</span>
        Engineered for power. Built for durability. Trusted across India.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="relative z-10 flex gap-4 flex-wrap justify-center"
      >
        <button
          onClick={() => onScreenChange('product-list')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold tracking-wide transition-all accent-glow hover:scale-105"
        >
          View Catalogue
        </button>
        <button
          onClick={() => onScreenChange('enquiry')}
          className="glass border border-orange-500/40 text-orange-400 hover:text-white hover:border-orange-500 px-8 py-3.5 rounded-full font-bold tracking-wide transition-all"
        >
          Enquire Now
        </button>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 mt-16 grid grid-cols-3 gap-6 md:gap-16"
      >
        {[
          { val: '6+', label: 'Product Series' },
          { val: '18+', label: 'Models' },
          { val: '8', label: 'Standard Features' },
        ].map(({ val, label }) => (
          <div key={label} className="text-center">
            <div className="text-3xl font-black text-orange-500">{val}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>

    {/* Series grid */}
    <section className="max-w-7xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-2">Our Lineup</div>
        <h2 className="text-4xl font-black mb-2 gradient-text">Product Series</h2>
        <p className="text-gray-500 mb-10">Choose the series that fits your space and need.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCT_SERIES.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => { onSeriesSelect(s.id); onScreenChange('product-list'); }}
            className="product-card text-left glass-light border border-white/10 rounded-xl p-6 transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <Wind size={20} className="text-orange-500" />
            </div>
            <div className="font-bold text-lg mb-1 group-hover:text-orange-500 transition-colors">{s.name}</div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.desc}</p>
            <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
              Explore <ChevronRight size={14} />
            </div>
          </motion.button>
        ))}
      </div>
    </section>

    {/* Features */}
    <section className="py-20 relative overflow-hidden">
      <div className="airflow-visual absolute inset-0 pointer-events-none opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-2">Built In</div>
          <h2 className="text-4xl font-black mb-2 gradient-text">Standard Features</h2>
          <p className="text-gray-500 mb-10">Every Tashu cooler ships with all of these.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COMMON_FEATURES.map(({ name, desc, Icon }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-light border border-white/10 rounded-xl p-5 hover:border-orange-500/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                <Icon size={18} className="text-orange-500" />
              </div>
              <div className="font-bold text-sm mb-1">{name}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass border border-orange-500/20 rounded-2xl p-10 text-center accent-glow"
      >
        <Factory size={36} className="text-orange-500 mx-auto mb-4" />
        <h3 className="text-3xl font-black mb-2 gradient-text">Become a Dealer or Distributor</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Join the Tashu network. Grow your business with India's trusted cooler brand.
        </p>
        <button
          onClick={() => onScreenChange('enquiry')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all hover:scale-105"
        >
          <Phone size={14} className="inline mr-2" />
          Enquire Now
        </button>
      </motion.div>
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
    <div className="pt-28 max-w-7xl mx-auto px-6 pb-20">
      <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-2">All Models</div>
      <h2 className="text-4xl font-black mb-8 gradient-text">Catalogue</h2>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => onSeriesChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
            !activeSeries
              ? 'bg-orange-500 border-orange-500 text-white accent-glow'
              : 'glass-light border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-white'
          }`}
        >
          All
        </button>
        {PRODUCT_SERIES.map(s => (
          <button
            key={s.id}
            onClick={() => onSeriesChange(s.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeSeries === s.id
                ? 'bg-orange-500 border-orange-500 text-white accent-glow'
                : 'glass-light border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-white'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onProductSelect(p)}
            className="product-card glass-light border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all"
          >
            <div className="w-full h-48 overflow-hidden bg-white/5">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
            <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-2">{p.series}</div>
            <h3 className="font-black text-xl mb-1">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-5">{p.tagline}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="glass rounded-lg p-2.5">
                <div className="text-xs text-gray-500 mb-0.5">Air Flow</div>
                <div className="text-xs font-bold text-white">{p.specs.airFlow}</div>
              </div>
              <div className="glass rounded-lg p-2.5">
                <div className="text-xs text-gray-500 mb-0.5">Tank</div>
                <div className="text-xs font-bold text-white">{p.specs.tankCapacity}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold">
              View Details <ChevronRight size={14} />
            </div>
            </div>
          </motion.div>
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
    <div className="pt-28 px-6 pb-20 max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-8 text-gray-400 hover:text-orange-500 transition-colors text-sm font-semibold"
      >
        <ArrowLeft size={16} /> Back to Catalogue
      </button>

      <div className="glass-light border border-white/10 rounded-2xl overflow-hidden mb-6">
        <div className="w-full h-64 overflow-hidden bg-white/5">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-2">{product.series}</div>
          <h2 className="text-4xl font-black mb-1 gradient-text">{product.name}</h2>
          <p className="text-orange-400 font-semibold mb-3">{product.tagline}</p>
          <p className="text-gray-400 leading-relaxed">{product.desc}</p>
        </div>
      </div>

      <h3 className="font-black text-lg mb-4 text-gray-300 uppercase tracking-wider">Specifications</h3>
      <div className="grid grid-cols-2 gap-3 mb-8">
        {Object.entries(product.specs).map(([key, val]) => (
          <div key={key} className="glass-light border border-white/10 rounded-xl p-4">
            <div className="text-xs text-gray-500 capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1')}
            </div>
            <div className="font-bold text-sm text-white">{val}</div>
          </div>
        ))}
      </div>

      {product.features && (
        <div className="glass-light border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="font-black text-base mb-4 text-gray-300 uppercase tracking-wider">Key Features</h3>
          <ul className="flex flex-col gap-3">
            {product.features.map(f => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {product.bestFor && (
        <div className="mb-8">
          <h3 className="font-black text-base mb-4 text-gray-300 uppercase tracking-wider">Best For</h3>
          <div className="flex flex-wrap gap-2">
            {product.bestFor.map(b => (
              <span key={b} className="glass border border-orange-500/20 text-sm px-4 py-1.5 rounded-full text-orange-300 font-semibold">
                {b}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onEnquire}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-black tracking-wide transition-all accent-glow hover:scale-[1.02]"
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
        <div className="glass-light border border-orange-500/20 rounded-2xl p-12 max-w-md w-full accent-glow">
          <CheckCircle2 size={56} className="text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2 gradient-text">Enquiry Submitted!</h2>
          <p className="text-gray-400 mb-8">Our team will reach out to you shortly.</p>
          <button
            onClick={onBackHome}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors text-sm";

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-xs text-orange-500 font-bold tracking-widest uppercase mb-2">Get In Touch</div>
        <h2 className="text-4xl font-black mb-2 gradient-text">Enquire</h2>
        <p className="text-gray-500 mb-8">Fill in your details and we'll reach out.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
          />
          <input
            placeholder="Mobile Number"
            required
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
          <select
            value={formData.enquiryType}
            onChange={e => setFormData({ ...formData, enquiryType: e.target.value })}
            className={inputClass + " cursor-pointer"}
          >
            <option value="Dealer" className="bg-gray-900">Dealer</option>
            <option value="Distributor" className="bg-gray-900">Distributor</option>
            <option value="Wholesaler" className="bg-gray-900">Wholesaler</option>
          </select>
          <input
            placeholder="Interested Product (optional)"
            value={formData.product}
            onChange={e => setFormData({ ...formData, product: e.target.value })}
            className={inputClass}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              required
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              className={inputClass}
            />
            <input
              placeholder="State"
              value={formData.state}
              onChange={e => setFormData({ ...formData, state: e.target.value })}
              className={inputClass}
            />
          </div>
          <textarea
            placeholder="Message (optional)"
            rows={4}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            className={inputClass + " resize-none"}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl font-black tracking-wide transition-all accent-glow hover:scale-[1.02]"
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
    <div className="bg-brand-dark text-white min-h-screen">
      <Navbar onScreenChange={setActiveScreen} activeScreen={activeScreen} />

      <AnimatePresence mode="wait">
        {activeScreen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <HomeScreen
              onScreenChange={setActiveScreen}
              onSeriesSelect={s => setActiveSeries(s)}
            />
          </motion.div>
        )}

        {activeScreen === 'product-list' && (
          <motion.div key="product-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProductList
              onProductSelect={handleProductSelect}
              activeSeries={activeSeries}
              onSeriesChange={setActiveSeries}
            />
          </motion.div>
        )}

        {activeScreen === 'product-detail' && (
          <motion.div key="product-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProductDetail
              product={selectedProduct}
              onBack={() => setActiveScreen('product-list')}
              onEnquire={() => setActiveScreen('enquiry')}
            />
          </motion.div>
        )}

        {activeScreen === 'enquiry' && (
          <motion.div key={`enquiry-${selectedProduct?.id ?? 'none'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
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
