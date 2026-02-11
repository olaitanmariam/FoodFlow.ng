
import React, { useState, useEffect } from 'react';
import { REGIONS } from '../constants.ts';

interface Props {
  onOpenDemo: () => void;
  onLoginClick: () => void;
  onAboutClick: () => void;
  onImpactClick: () => void;
}

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-15v15" /></svg>
);
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
);
const IconCloudRain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6" /><path d="M12 16v6" /><path d="M8 14v6" /></svg>
);
const IconSatellite = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M13 7a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" /><path d="M13 14h-4" /><path d="M13 18h-4" /><path d="M7 14h-4" /><path d="M21 14h-4" /><path d="M3 10v4" /><path d="M21 10v4" /><path d="M12 22V18" /><path d="M12 7V2" /></svg>
);
const IconScroll = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
);

export const BrandLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} bg-white rounded-2xl flex items-center justify-center text-[#2c9f45] shadow-sm relative group overflow-hidden border border-slate-200/60`}>
    <svg viewBox="0 0 100 100" className="w-8 h-8 z-10 transition-transform group-hover:scale-110 duration-500">
      <path 
        d="M50 5 C75 5, 95 25, 95 50 C95 75, 75 95, 50 95 C25 95, 5 75, 5 50 C5 25, 25 5, 50 5" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeDasharray="2 2"
        className="opacity-20"
      />
      <path 
        d="M50 20 A10 10 0 1 0 50 40 A10 10 0 1 0 50 20" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M20 55 Q 35 50, 50 55 T 80 55" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M15 68 Q 32 63, 50 68 T 85 68" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M10 82 Q 30 77, 50 82 T 90 82" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="5" 
        strokeLinecap="round" 
      />
      <path 
        d="M50 65 V 45 C 50 45, 52 38, 58 38 C 58 38, 62 45, 50 45" 
        fill="currentColor" 
        className="opacity-90"
      />
      <path 
        d="M50 55 C 50 55, 48 48, 42 48 C 42 48, 38 55, 50 55" 
        fill="currentColor" 
        className="opacity-70"
      />
    </svg>
    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:8px_8px] opacity-20"></div>
  </div>
);

const LandingPage: React.FC<Props> = ({ onOpenDemo, onLoginClick, onAboutClick, onImpactClick }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const baseDate = new Date('2026-01-30T09:00:00');
    setCurrentDate(baseDate.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }));
  }, []);
  
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-800 font-sans selection:bg-green-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <BrandLogo className="w-10 h-10" />
            <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">FoodFlow</span>
          </div>

          <ul className="hidden md:flex items-center space-x-10 font-bold text-[11px] uppercase tracking-widest text-slate-500">
            <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[#2c9f45] transition-colors border-b-2 border-[#2c9f45] pb-1">Platform</button></li>
            <li><button onClick={onAboutClick} className="hover:text-slate-900 transition-colors">About</button></li>
            <li><button onClick={onImpactClick} className="hover:text-slate-900 transition-colors">Impact</button></li>
          </ul>

          <button 
            onClick={onLoginClick}
            className="bg-[#2c9f45] text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#23863a] transition-all flex items-center group shadow-sm"
          >
            Access Portal <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </nav>
      </header>

      <section className="relative min-h-[80vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop" 
            alt="Farm landscape" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
          {/* Unified Brand Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl space-y-8">
           
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight uppercase">
              <span className="block ">Climate-Smart</span>
              <span className="block text-[#2c9f45]">farming decisions.</span>
            </h1>
            <div className="pl-6 border-l-4 border-[#2c9f45]">
              <p className="text-lg md:text-2xl text-slate-200 font-medium max-w-xl leading-relaxed">
                Reduce food loss with timely, data-driven farm operational decisions.
              </p>
            </div>
            <div className="pt-4">
              <button 
                onClick={onOpenDemo}
                className="bg-[#2c9f45] text-white px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#23863a] transition-all shadow-lg active:scale-95"
              >
                Run Field Simulation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
             <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.4em]">PLATFORM CAPABILITIES</p>
             <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">Agricultural Command Center</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PreviewCard icon={<IconMap />} label="Parcel Registry" text="Digitize your farm topology. Map plots for specific soil and regional tracking." />
            <PreviewCard icon={<IconChart />} label="Field Records" text="Maintain a complete history of every crop cycle. Track actions from seeding to storage." />
            <PreviewCard icon={<IconShield />} label="Loss Reduction" text="Improve harvest timing to minimize preventable food waste at the source." />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.4em]">IMPLEMENTATION</p>
            <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">Simple Operational Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <HowStep num="1" icon={<IconEdit />} label="Input Details" text="Define your plot size, crop type, and regional coordinates." />
            <HowStep num="2" icon={<IconCloudRain />} label="Regional Sync" text="The engine syncs with local climate patterns and soil moisture." />
            <HowStep num="3" icon={<IconSatellite />} label="Action Advice" text="Receive clear, actionable suggestions based on biological logic." />
            <HowStep num="4" icon={<IconScroll />} label="Record Audit" text="Every completed action is logged to your farm's performance history." />
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <BrandLogo className="w-8 h-8" />
            <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">FoodFlow Global</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 FoodFlow Platforms · Reliable Ag-Tech</p>
          <div className="flex space-x-10">
             <FooterLink label="Terms" />
             <FooterLink label="Privacy" />
             <FooterLink label="Support" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const PreviewCard: React.FC<{ icon: React.ReactNode, label: string, text: string }> = ({ icon, label, text }) => (
  <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6 transition-all hover:border-[#2c9f45]/30 group">
    <div className="text-[#2c9f45] p-3 bg-green-50 w-fit rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
    <div className="space-y-2">
      <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{label}</h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{text}</p>
    </div>
  </div>
);

const HowStep: React.FC<{ num: string, icon: React.ReactNode, label: string, text: string }> = ({ num, icon, label, text }) => (
  <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 space-y-6 relative group overflow-hidden">
    <div className="absolute top-4 right-4 text-[10px] font-black text-[#2c9f45] bg-green-50 px-2 py-1 rounded border border-green-100">Step {num}</div>
    <div className="text-[#2c9f45] group-hover:translate-x-1 transition-transform">{icon}</div>
    <div className="space-y-2">
      <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{label}</h4>
      <p className="text-xs text-slate-500 leading-relaxed font-medium">{text}</p>
    </div>
  </div>
);

const FooterLink: React.FC<{ label: string }> = ({ label }) => (
  <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#2c9f45] transition-colors">{label}</button>
);

export default LandingPage;
