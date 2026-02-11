
import React, { useState, useEffect } from 'react';
import { BrandLogo } from './LandingPage.tsx';

interface Props {
  onHomeClick: () => void;
  onAboutClick: () => void;
  onLoginClick: () => void;
  onOpenDemo: () => void;
}

const IconSprout = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M7 20h10" /><path d="M12 20V10" /><path d="M12 10a5 5 0 0 1 5 5" /><path d="M12 10a5 5 0 0 0-5 5" /></svg>;
const IconGlobe = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;

const ImpactPage: React.FC<Props> = ({ onHomeClick, onAboutClick, onLoginClick, onOpenDemo }) => {

  useEffect(() => {
    const baseDate = new Date('2026-01-30T09:00:00');

  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-green-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onHomeClick}>
            <BrandLogo className="w-9 h-9" />
            <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">FoodFlow</span>
          </div>

          <ul className="hidden md:flex items-center space-x-10 font-bold text-[11px] uppercase tracking-widest text-slate-500">
            <li><button onClick={onHomeClick} className="hover:text-slate-900 transition-colors">Platform</button></li>
            <li><button onClick={onAboutClick} className="hover:text-slate-900 transition-colors">About</button></li>
            <li><button className="text-[#2c9f45] transition-colors border-b-2 border-[#2c9f45] pb-1">Impact</button></li>
          </ul>

          <button 
            onClick={onLoginClick}
            className="bg-[#2c9f45] text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#23863a] transition-all flex items-center group shadow-md"
          >
            Access Portal <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </nav>
      </header>

      {/* Hero Section with Vibrant Agricultural Field Overlay and Technical Grid */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop" 
            alt="Verified Harvest" 
            className="w-full h-full object-cover brightness-[0.4]"
            loading="eager"
          />
          {/* Gradient Mask consistent with About Page */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900"></div>
          {/* Technical Data Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Subtle noise/texture overlay for realistic finish */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl space-y-8 animate-in slide-in-from-left-10 duration-1000">
            <p className="text-[#2c9f45] font-black uppercase tracking-[0.4em] text-xs">
          
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight uppercase">
              <span className="block">Safeguarding Harvests,</span>
              <span className="block text-[#2c9f45] not-italic">Securing Food.</span>
            </h1>
            <div className="pl-6 border-l-4 border-[#2c9f45]">
              <p className="text-lg md:text-xl text-slate-200 font-medium max-w-xl leading-relaxed">
                Zero Hunger is achieved through practical prevention. We track how everyday farm decisions directly contribute to local food security and waste reduction.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onOpenDemo}
                className="bg-[#2c9f45] text-white px-10 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#23863a] transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Verify Impact Simulation
              </button>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20 flex items-center space-x-4">
                 <div className="text-[#2c9f45]"><IconSprout /></div>
                 <div>
                    <p className="text-[9px] font-black text-white/60 uppercase tracking-widest leading-none mb-1">Impact Goal</p>
                    <p className="text-lg font-bold text-white leading-none">24% Loss Mitigation</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.4em]">OUTCOME FRAMEWORK</p>
            <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight leading-none">Food Security Benchmarks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ImpactCard 
              label="AVAILABILITY (2.1)" 
              title="Preventative Logic" 
              text="Analyze environmental risks to ensure crops reach consumption maturity rather than becoming avoidable field waste." 
              outcome="~15% higher availability."
            />
            <ImpactCard 
              label="STABILITY (2.3)" 
              title="Resilient Timing" 
              text="Empowering farmers to stabilize local supply chains by mitigating climate-induced spoilage windows." 
              outcome="Grounded supply continuity."
            />
            <ImpactCard 
              label="SUSTAINABILITY (2.4)" 
              title="Operational Audit" 
              text="Managing land resources and labor efficiency to maintain long-term production viability for regional hubs." 
              outcome="Sustainable systems (2.4)."
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.4em]">ACCOUNTABILITY</p>
              <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">Traceable Prevention</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              FoodFlow maintains a Sovereign Data Ledger. Every action logged represents a physical quantity of food safeguarded through informed field actions, aiding regional food stability.
            </p>
            <button 
              onClick={onOpenDemo} 
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Start Operational Audit
            </button>
          </div>
          <div className="md:w-1/2 p-12 bg-green-50 rounded-3xl border border-green-100 flex flex-col items-center text-center space-y-4 group">
             <div className="text-[#2c9f45] group-hover:rotate-12 transition-transform"><IconGlobe /></div>
             <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest leading-none mb-1">Measured Pilot Success</p>
             <p className="text-6xl font-bold text-slate-900 tracking-tighter leading-none">24%</p>
             <p className="text-sm text-slate-500 font-bold uppercase tracking-widest leading-none">Reduction in Preventable Loss</p>
             <p className="text-xs text-slate-400 max-w-xs pt-6 border-t border-green-200 mt-4 leading-relaxed italic">Verified mission impact: These metrics reflect physical food preservation at the farm level.</p>
          </div>
        </div>
      </section>

      <footer className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center space-x-3">
             <BrandLogo className="w-7 h-7" />
             <span className="font-bold text-slate-900 uppercase tracking-widest text-xs">FoodFlow Regional Hub</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 Sustainable Harvest Operations · Regional Node Registry</p>
        </div>
      </footer>
    </div>
  );
};

const ImpactCard: React.FC<{ label: string, title: string, text: string, outcome: string }> = ({ label, title, text, outcome }) => (
  <div className="p-10 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-8 group hover:border-[#2c9f45]/30 transition-all">
    <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.4em]">{label}</p>
    <div className="space-y-3">
      <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight leading-none">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{text}</p>
    </div>
    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 rounded-full bg-[#2c9f45]"></div>
        <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-none">{outcome}</p>
      </div>
    </div>
  </div>
);

export default ImpactPage;
