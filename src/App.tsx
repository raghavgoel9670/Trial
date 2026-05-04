import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from "./supabase";
import { useState } from "react";
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
// --- NAVBAR ---

const Navbar = ({ onScreenChange, activeScreen }: any) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur">
      <div className="max-w-7xl mx-auto flex justify-between p-4">
        <div onClick={() => onScreenChange('home')} className="font-bold text-orange-500 cursor-pointer">
          TASHU
        </div>
        <div className="hidden md:flex gap-6">
          <button onClick={() => onScreenChange('product-list')}>Catalogue</button>
          <button onClick={() => onScreenChange('enquiry')}>Enquire</button>
        </div>
      </div>
    </nav>
  );
};

// --- ENQUIRY (SUPABASE FIXED) ---

const EnquirySection = ({ initialProduct = '', onBackHome }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("🔥 FORM SUBMIT FIRED"); // ADD THIS

    const { error } = await supabase.from('enquiries').insert([
      { ...formData, product: initialProduct }
    ]);

    if (!error) setSubmitted(true);
    else alert('Error submitting');
  };
return (
    <div className="min-h-screen pt-24 px-6">
      {submitted ? (
        <div className="text-center">
          <CheckCircle2 className="mx-auto mb-4" />
          <h2>Submitted</h2>
          <button onClick={onBackHome}>Home</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">

          <input placeholder="Name" required value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })} />

          <input placeholder="Phone" required value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })} />

          <input placeholder="City" required value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })} />

          <textarea placeholder="Message" value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })} />

          <button type="submit" className="bg-orange-500 text-white p-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

// --- APP ---

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="bg-black text-white min-h-screen">

      <Navbar onScreenChange={setActiveScreen} activeScreen={activeScreen} />

      <AnimatePresence>
        {activeScreen === 'home' && (
          <motion.div key="home" className="p-10">
            <h1>TASHU COOLERS</h1>
          </motion.div>
        )}

                {activeScreen === 'product-list' && (
          <div className="p-10">
            {PRODUCTS.map(p => (
              <div key={p.id} onClick={() => {
                setSelectedProduct(p);
                setActiveScreen('product-detail');
              }} className="border p-4 mb-4 cursor-pointer">
                <h3>{p.name}</h3>
              </div>
            ))}
          </div>
        )}

        {activeScreen === 'enquiry' && (
          <EnquirySection
            initialProduct={selectedProduct?.name || ''}
            onBackHome={() => setActiveScreen('home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
