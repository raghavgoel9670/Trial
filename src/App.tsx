import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Wind, 
  Zap, 
  ShieldCheck, 
  Factory, 
  Home, 
  Briefcase, 
  ShoppingBag,
  ChevronRight,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Droplets,
  Layers,
  Settings,
  Shield,
  Trash2,
  Thermometer
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

// --- Data ---

const PRODUCT_SERIES = [
  { id: 'rhino', name: 'RHINO Series', desc: 'Heavy-duty cooling for large spaces and commercial use.' },
  { id: 'terminator', name: 'Terminator Series', desc: 'Powerful airflow with rugged design and high performance.' },
  { id: 'nexo', name: 'NEXO Series', desc: 'Compact and stylish cooling for homes and small spaces.' },
  { id: 'standard', name: 'Standard Series', desc: 'Reliable and efficient cooling for everyday household needs.' }, 
  { id: 'copper', name: 'Copper Heavy Duty Series', desc: 'Superior cooling performance with heavy duty copper winding technology.' },
  { id: 'heavy-duty', name: 'Heavy Duty Series', desc: 'Robust construction with superior air delivery for intense heat.' }
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

const COMMON_FEATURES = [
  { name: "Auto Tank Fill", desc: "Float Valve Technology for non-stop performance.", icon: <Droplets /> },
  { name: "Auto Drain", desc: "Motorised water drainage system.", icon: <Trash2 /> },
  { name: "Dust Filter", desc: "Filters out particles for clean, dust-free air.", icon: <Layers /> },
  { name: "Ice Chamber", desc: "Speed up cooling with dedicated ice storage.", icon: <Thermometer /> },
  { name: "Shower Channel", desc: "Even water distribution over EcoCool pads.", icon: <Wind /> },
  { name: "Humidity Control", desc: "Adjust water usage for peak comfort.", icon: <Droplets /> },
  { name: "Anti-Bacterial Tank", desc: "Plastic coating prevents fungal growth.", icon: <Shield /> },
  { name: "DBB Motor", desc: "Heavy Duty Double Ball Bearing with Heat Sink.", icon: <Settings /> }
];

// --- Components ---

const Navbar = ({ onScreenChange, activeScreen }: { onScreenChange: (s: Screen) => void, activeScreen: Screen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || activeScreen !== 'home' ? 'glass bg-brand-dark/80 shadow-xl py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="cursor-pointer flex items-center gap-2" onClick={() => onScreenChange('home')}>
          <span className="font-display text-2xl font-black tracking-tighter text-brand-orange">TASHU</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">Live in today</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => onScreenChange('product-list')} className={`text-xs font-semibold uppercase tracking-widest transition-colors ${activeScreen === 'product-list' ? 'text-brand-orange' : 'text-slate-400 hover:text-brand-orange'}`}>Catalogue</button>
          <a href="#features" className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-brand-orange transition-colors">Technology</a>
          <button onClick={() => onScreenChange('enquiry')} className="bg-brand-orange text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-all accent-glow">Enquire Now</button>
        </div>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-0 left-0 w-full bg-brand-dark shadow-xl pt-24 pb-10 px-6 z-40 md:hidden glass">
            <div className="flex flex-col gap-6 items-center">
              <button onClick={() => { onScreenChange('product-list'); setIsMobileMenuOpen(false); }} className="text-lg font-medium">Catalogue</button>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Technology</a>
              <button onClick={() => { onScreenChange('enquiry'); setIsMobileMenuOpen(false); }} className="w-full bg-brand-orange text-white py-4 rounded-full font-bold uppercase tracking-widest">Enquire Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onScreenChange }: { onScreenChange: (s: Screen) => void }) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-dark">
    <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <h1 className="font-display text-6xl md:text-8xl font-black leading-[0.9] mb-8">
          <span className="gradient-text">Mausam</span> <br/><span className="text-brand-orange">Badal De</span>
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed mb-10 max-w-md">Engineering high-performance air coolers for the harshest Indian summers. Powerful, reliable, indigenously built.</p>
        <div className="flex flex-wrap gap-5">
          <button onClick={() => onScreenChange('product-list')} className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all flex items-center gap-3 shadow-xl shadow-orange-900/20">Explore Catalogue <ArrowRight size={16} /></button>
          <button onClick={() => onScreenChange('enquiry')} className="glass hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all">Enquire Now</button>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
        <div className="relative aspect-square max-w-lg mx-auto glass rounded-3xl overflow-hidden flex items-center justify-center p-12 border-slate-700/50">
          <Wind className="w-24 h-24 text-brand-orange/40 mx-auto mb-8 animate-pulse" />
        </div>
        <div className="absolute -bottom-10 -right-5 md:-right-10 glass p-8 shadow-2xl rounded-2xl max-w-[240px] border-slate-700/30 accent-glow">
          <p className="text-[10px] uppercase font-bold tracking-widest text-brand-orange mb-2">Rhino 180</p>
          <p className="text-sm font-light text-slate-400 leading-relaxed">Air flow up to <span className="text-white font-bold">11300 m3/h</span> for professional spaces.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const SeriesShowcase = ({ onSelectSeries }: { onSelectSeries: (id: string) => void }) => (
  <section className="py-32 px-6 bg-brand-dark">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange mb-3">Series Showcase</h2>
        <h3 className="font-display text-4xl font-extrabold gradient-text">Unmatched Versatility.</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCT_SERIES.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} onClick={() => onSelectSeries(s.id)} className="glass p-10 rounded-3xl border-slate-800 transition-all cursor-pointer group hover:bg-slate-900/50">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-slate-700 group-hover:text-brand-orange mb-6 transition-colors font-bold uppercase">{s.name[0]}</div>
            <h4 className="text-xl font-bold mb-4">{s.name}</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed mb-8">{s.desc}</p>
            <button className="text-[10px] uppercase font-bold tracking-widest text-brand-orange flex items-center gap-2">View Series <ChevronRight size={12}/></button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
    <section id="features" className="py-32 bg-brand-dark/50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-orange mb-3">Core Technology</h2>
                <h3 className="font-display text-4xl font-extrabold gradient-text">What Makes It TASHU.</h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {COMMON_FEATURES.map((f, i) => (
                    <div key={i} className="glass-light p-8 rounded-2xl border-slate-800/50 hover:border-slate-700 transition-all">
                        <div className="text-brand-orange mb-4 opacity-50">{f.icon}</div>
                        <h4 className="text-sm font-bold text-white mb-2">{f.name}</h4>
                        <p className="text-[10px] text-slate-500 font-light leading-snug">{f.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ProductListPage = ({ onBackHome, onSelectProduct, initialFilter }: { onBackHome: () => void, onSelectProduct: (p: Product) => void, initialFilter: string }) => {
    const [filter, setFilter] = useState(initialFilter || 'All');
    
    useEffect(() => {
        setFilter(initialFilter);
    }, [initialFilter]);

    const filteredProducts = useMemo(() => {
        if (filter === 'All') return PRODUCTS;
        // Normalize names for mapping
        return PRODUCTS.filter(p => p.series.toLowerCase().includes(filter.toLowerCase()));
    }, [filter]);

    const filters = ['All', ...PRODUCT_SERIES.map(s => s.name.split(' ')[0])];

    return (
        <section className="min-h-screen pt-32 pb-24 bg-brand-dark relative px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <button onClick={onBackHome} className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest mb-6 hover:text-white transition-colors"><ArrowLeft size={14}/> Back Home</button>
                        <h2 className="font-display text-4xl md:text-5xl font-black gradient-text">Current Catalogue</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {filters.map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-orange text-white accent-glow' : 'glass text-slate-400 hover:text-white'}`}>{f}</button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => onSelectProduct(p)} className="product-card glass p-8 rounded-3xl border-slate-800 cursor-pointer group">
                             <div className="h-48 bg-slate-900 mb-8 rounded-2xl flex items-center justify-center overflow-hidden relative">
                                <img src={p.image} className="w-full h-full object-cover opacity-50 contrast-125 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                                <div className="absolute top-4 right-4 bg-brand-orange/80 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{p.series}</div>
                             </div>
                             <h4 className="text-xl font-bold mb-1">{p.name}</h4>
                             <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mb-6">{p.tagline}</p>
                             <div className="space-y-2 mb-8">
                                <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest"><span>Air Flow</span> <span className="text-white">{p.specs.airFlow}</span></div>
                                <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest"><span>Water Tank</span> <span className="text-white">{p.specs.tankCapacity}</span></div>
                             </div>
                             <button className="w-full glass-light py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-brand-orange group-hover:text-white transition-all">View Details</button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProductDetailPage = ({ product, onBack, onEnquire }: { product: Product, onBack: () => void, onEnquire: (p: string) => void }) => (
    <section className="min-h-screen pt-32 pb-24 bg-brand-dark px-6">
        <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest mb-12 hover:text-white transition-colors"><ArrowLeft size={14}/> Back to Catalogue</button>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass aspect-square rounded-[40px] overflow-hidden border-slate-700/30 flex items-center justify-center p-12">
                        <img src={product.image} className="w-full h-full object-cover opacity-40 mix-blend-screen" />
                    </div>
                </motion.div>

                <div>
                    <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{product.series} SERIES</span>
                    <h2 className="font-display text-5xl md:text-7xl font-black mb-6">{product.name}</h2>
                    <p className="text-xl text-slate-400 font-light leading-relaxed mb-12">{product.desc}</p>
                    
                    <div className="space-y-4 mb-12">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-6 border-b border-slate-800 pb-3">Technical Specifications</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(product.specs).map(([key, val]) => (
                                <div key={key} className="glass-light p-5 rounded-2xl flex flex-col gap-1">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="text-sm font-medium text-white">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button onClick={() => onEnquire(product.name)} className="bg-brand-orange text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-500 accent-glow flex items-center gap-3">Enquire Now <ArrowRight size={16}/></button>
                    </div>
                </div>
            </div>
            
            <div className="mt-32 pt-24 border-t border-slate-800">
                <h3 className="text-2xl font-bold mb-12 text-center">Ideal For</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-10 rounded-3xl text-center"><Home className="mx-auto mb-6 text-brand-orange opacity-40" /> <h4 className="font-bold text-lg mb-2">Residential</h4> <p className="text-xs text-slate-400 font-light">Engineered for bedroom and living space comfort.</p></div>
                    <div className="glass p-10 rounded-3xl text-center"><Briefcase className="mx-auto mb-6 text-brand-orange opacity-40" /> <h4 className="font-bold text-lg mb-2">Workspace</h4> <p className="text-xs text-slate-400 font-light">Silent, consistent airflow for productive work.</p></div>
                    <div className="glass p-10 rounded-3xl text-center"><Factory className="mx-auto mb-6 text-brand-orange opacity-40" /> <h4 className="font-bold text-lg mb-2">Large Spaces</h4> <p className="text-xs text-slate-400 font-light">Maximum reach cooling for halls and restaurants.</p></div>
                </div>
            </div>
        </div>
    </section>
);

const EnquirySection = ({ initialProduct = '', onBackHome }: { initialProduct?: string, onBackHome: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    state: '',
    type: 'Customer',
    product: initialProduct,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-32 pb-24 bg-brand-dark px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-orange-600/5 border border-orange-500/20 p-10 rounded-[40px] flex flex-col accent-glow glass">
          <div className="mb-10 text-center">
              <h2 className="font-display text-4xl font-bold mb-2">Enquire Today</h2>
              <p className="text-xs text-slate-400 italic">Buy, partner, or bulk order with TASHU</p>
          </div>
        {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 text-center">
                <CheckCircle2 className="w-20 h-20 text-brand-orange mx-auto mb-6" />
                <h3 className="font-display text-3xl font-black text-white mb-4">Request Sent</h3>
                <p className="text-slate-400 mb-10">Our representative will get in touch with you within 24 hours.</p>
                <button onClick={onBackHome} className="bg-brand-orange text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all outline-none">Back to Home</button>
            </motion.div>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Full Name</label>
                <input required type="text" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white outline-none" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Mobile</label>
                    <input required type="tel" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white outline-none" placeholder="+91" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Enquiry Type</label>
                    <select className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white appearance-none outline-none" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}><option>Customer</option><option>Dealer</option><option>Bulk Order</option></select></div>
                </div>
                <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Interested Product / Series</label>
                <input type="text" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white outline-none" placeholder="e.g. Rhino 180" value={formData.product} onChange={(e) => setFormData({...formData, product: e.target.value})} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">City</label>
                    <input required type="text" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white outline-none" placeholder="Enter city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} /></div>
                    <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">State</label>
                    <input required type="text" className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white outline-none" placeholder="Enter state" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} /></div>
                </div>
                <div className="flex flex-col gap-1.5"><label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Message</label>
                <textarea rows={3} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-brand-orange text-white resize-none outline-none" placeholder="How can we help?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} /></div>
                <button type="submit" className="mt-4 bg-brand-orange hover:bg-orange-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-xs uppercase tracking-widest">Submit Enquiry</button>
            </form>
        )}
        </div>
      </div>
    </motion.section>
  );
};

const ContactCTA = ({ onEnquire }: { onEnquire: () => void }) => (
    <section className="py-32 bg-brand-dark px-6">
        <div className="max-w-7xl mx-auto glass p-16 rounded-3xl text-center border-slate-700/50 accent-glow">
            <h2 className="font-display text-4xl md:text-6xl font-black mb-10 leading-tight gradient-text inline-block">Mausam <br/> Badal De</h2>
            <div className="mt-4"><button onClick={onEnquire} className="bg-brand-orange text-white px-16 py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl accent-glow">Enquire Now</button></div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-slate-950 py-16 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex gap-8">
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Made in India</span></div>
                <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Engineered Performance</span></div>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">© 2026 TASHU COOLING SYSTEMS PVT LTD.</p>
        </div>
    </footer>
);

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [selectedSeriesFilter, setSelectedSeriesFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeScreen, selectedProduct]);

  return (
    <div className="font-sans text-white selection:bg-brand-orange/30 bg-brand-dark min-h-screen relative overflow-hidden">
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar onScreenChange={(s) => setActiveScreen(s)} activeScreen={activeScreen} />

        <AnimatePresence mode="wait">
          {activeScreen === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hero onScreenChange={(s) => setActiveScreen(s)} />
              <SeriesShowcase onSelectSeries={(id) => { setSelectedSeriesFilter(id); setActiveScreen('product-list'); }} />
              <FeaturesSection />
              <ContactCTA onEnquire={() => setActiveScreen('enquiry')} />
              <Footer />
            </motion.div>
          )}

          {activeScreen === 'product-list' && (
            <ProductListPage 
                key="list"
                initialFilter={selectedSeriesFilter === 'all' ? 'All' : selectedSeriesFilter}
                onBackHome={() => setActiveScreen('home')} 
                onSelectProduct={(p) => { setSelectedProduct(p); setActiveScreen('product-detail'); }}
            />
          )}

          {activeScreen === 'product-detail' && selectedProduct && (
            <ProductDetailPage 
                key="detail"
                product={selectedProduct} 
                onBack={() => setActiveScreen('product-list')}
                onEnquire={(pName) => { setActiveScreen('enquiry'); }}
            />
          )}

          {activeScreen === 'enquiry' && (
            <EnquirySection 
                key="enquiry"
                initialProduct={selectedProduct?.name || ''}
                onBackHome={() => setActiveScreen('home')} 
            />
          )}
        </AnimatePresence>
      </div>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveScreen('enquiry')} className="fixed bottom-8 right-8 z-50 bg-brand-orange text-white w-14 h-14 flex items-center justify-center rounded-full shadow-2xl md:hidden accent-glow">
        <Phone size={24} />
      </motion.button>
    </div>
  );
}

