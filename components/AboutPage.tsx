
import React from 'react';
import { BrandLogo } from './LandingPage.tsx';

interface Props {
  onHomeClick: () => void;
  onLoginClick: () => void;
  onOpenDemo: () => void;
  onImpactClick: () => void;
}

const IconSprout = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M7 20h10" /><path d="M12 20V10" /><path d="M12 10a5 5 0 0 1 5 5" /><path d="M12 10a5 5 0 0 0-5 5" /></svg>;
const IconTrending = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;

const AboutPage: React.FC<Props> = ({ onHomeClick, onLoginClick, onOpenDemo, onImpactClick }) => {
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-green-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[100]">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onHomeClick}>
            <BrandLogo className="w-9 h-9" />
            <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">FoodFlow</span>
          </div>

          <ul className="hidden md:flex items-center space-x-10 font-bold text-[11px] uppercase tracking-widest text-slate-400">
            <li><button onClick={onHomeClick} className="hover:text-slate-900 transition-colors">Platform</button></li>
            <li><button className="text-slate-900 transition-colors border-b-2 border-[#2c9f45] pb-1">About</button></li>
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

      {/* Cinematic Hero Section - Augmented with Scanning Visuals */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2070&auto=format&fit=crop" 
            alt="Precision Agriculture Tech" 
            className="w-full h-full object-cover opacity-50 transition-transform duration-1000"
          />
          {/* Active Data Scanner Animation Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2c9f45]/60 to-transparent absolute animate-scanning"></div>
             <div className="w-full h-[100px] bg-gradient-to-b from-transparent via-[#2c9f45]/5 to-transparent absolute animate-scanning blur-xl"></div>
          </div>

          {/* Gradient Mask consistent with Landing and Impact */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/40"></div>
          {/* Technical Data Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          {/* Subtle noise/texture overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        
        {/* Inner div aligned with ImpactPage container specs */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full space-y-12">
          <div className="space-y-6">
            <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.5em] flex items-center">
              <span className="w-8 h-[1px] bg-[#2c9f45] mr-4"></span>
           
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight uppercase">
              About <br />
              <span className="text-[#2c9f45] not-italic">FoodFlow.</span>
            </h1>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium border-l-4 border-[#2c9f45] pl-8">
              FoodFlow was built for small and medium-scale farmers. We believe generational expertise is the foundation of food security, but it needs reliable support in a volatile climate.
            </p>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onOpenDemo}
              className="px-10 py-5 bg-[#2c9f45] text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.3em] shadow-2xl hover:bg-[#23863a] transition-all active:scale-95"
            >
              Run System Audit
            </button>
            <button 
              onClick={onImpactClick}
              className="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
            >
              Verify Outcomes
            </button>
          </div>
        </div>
      </section>

      {/* Methodology Section - Field Report Style */}
      <section className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">OPERATIONAL PHILOSOPHY</p>
              <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight leading-none">The Biological Co-Pilot.</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Our tool is not here to replace the farmer. It is here to provide the biological timing and regional data that helps you make better decisions every single day. 
            </p>
            <div className="space-y-6">
              <MethodItem number="01" label="Precision Timing" text="Synchronizing harvest windows with real-time atmospheric moisture decay." />
              <MethodItem number="02" label="Loss Mitigation" text="Identifying spoilage vectors before they leave the field node." />
              <MethodItem number="03" label="Sovereign Records" text="Every action belongs to your farm's history, not a central database." />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative p-12 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-[#2c9f45] group-hover:scale-110 transition-transform duration-700">
                  <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
               </div>
               <div className="relative z-10 space-y-6">
                  <p className="text-[9px] font-black text-[#2c9f45] uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full w-fit">FIELD REPORT EXCERPT</p>
                  <p className="text-sm font-mono text-slate-500 leading-relaxed italic">
                    "Traditional farming relies on visual cues that often arrive too late. FoodFlow bridges the gap between observation and action through algorithmic phenology."
                  </p>
                  <div className="pt-6 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">System Calibration: 2026.04</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 px-6 bg-slate-50 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.5em]">OUR COMPASS</p>
            <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">Core Pillars of Trust</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PurposePoint icon={<IconSprout />} title="Resilience" text="We help you prepare for weather shifts and crop health risks before they become preventable losses." />
            <PurposePoint icon={<IconTrending />} title="Growth" text="Using regional data, we suggest the best timing for planting, watering, and harvesting based on logic." />
            <PurposePoint icon={<IconUsers />} title="Sovereignty" text="Your farm data belongs to you. We serve as a co-pilot, not a replacement for your generational judgment." />
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="inline-flex items-center space-x-2 text-[#2c9f45]">
             <span className="w-2 h-2 rounded-full bg-[#2c9f45] animate-pulse"></span>
             <p className="text-[10px] font-black uppercase tracking-widest">Global Node Active</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tighter">Ready to secure <br /> your next harvest?</h2>
          <button 
            onClick={onOpenDemo}
            className="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-xl active:scale-95"
          >
            Start Your First Simulation
          </button>
        </div>
      </section>

      <footer className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={onHomeClick}>
            <BrandLogo className="w-8 h-8" />
            <span className="font-bold text-slate-900 uppercase tracking-widest text-sm">FoodFlow Global</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 FoodFlow Platforms · Built for the Field</p>
          <div className="flex space-x-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <button className="hover:text-slate-900">Privacy</button>
             <button className="hover:text-slate-900">Terms</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const MethodItem: React.FC<{ number: string, label: string, text: string }> = ({ number, label, text }) => (
  <div className="flex items-start space-x-6 group">
    <span className="text-xs font-black text-[#2c9f45] pt-1">{number}</span>
    <div className="space-y-1">
      <h4 className="font-bold text-slate-900 uppercase tracking-tight text-sm group-hover:text-[#2c9f45] transition-colors">{label}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{text}</p>
    </div>
  </div>
);

const PurposePoint: React.FC<{ icon: React.ReactNode, title: string, text: string }> = ({ icon, title, text }) => (
  <div className="p-12 bg-white rounded-[3rem] border border-slate-200 space-y-8 group hover:border-[#2c9f45]/20 transition-all shadow-sm">
    <div className="text-[#2c9f45] group-hover:scale-110 transition-transform duration-500">{icon}</div>
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight leading-none">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm font-medium">{text}</p>
    </div>
  </div>
);

export default AboutPage;
