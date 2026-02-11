
import React, { useState, useEffect } from 'react';
import { REGIONS } from '../constants.ts';
import { getAdvisory } from '../geminiService.ts';
import { BrandLogo } from './LandingPage.tsx';

interface Props {
  onClose: () => void;
  onComplete: () => void;
}

const IconRain = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6" /><path d="M12 16v6" /><path d="M8 14v6" /></svg>;
const IconHeat = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
const IconWind = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M9.59 4.59A2 2 0 1 1 11 8H2" /><path d="M12.59 19.41A2 2 0 1 0 14 16H2" /><path d="M15.59 12.41A2 2 0 1 1 17 9H2" /></svg>;
const IconCheck = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>;

const DemoModal: React.FC<Props> = ({ onClose, onComplete }) => {
  const [region, setRegion] = useState(REGIONS[0].value);
  const [crop, setCrop] = useState(REGIONS[0].crops[0]);
  const [moisture, setMoisture] = useState(45);
  const [forecast, setForecast] = useState('Heavy Rain');
  const [advisory, setAdvisory] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Setup, 2: Simulating, 3: Outcome
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState('Initializing...');

  const selectedRegionData = REGIONS.find(r => r.value === region);

  useEffect(() => {
    if (selectedRegionData) {
      setCrop(selectedRegionData.crops[0]);
    }
  }, [region, selectedRegionData]);

  const handleRunAdvisory = async () => {
    setLoading(true);
    setStep(2);
    
    const stages = [
      { p: 20, t: 'Synchronizing Regional Satellite Data...' },
      { p: 45, t: 'Analyzing Substrate Moisture Levels...' },
      { p: 70, t: 'Running Predictive Climate Models...' },
      { p: 90, t: 'Finalizing Operational Directive...' }
    ];

    for (const stage of stages) {
      setAnalysisProgress(stage.p);
      setAnalysisText(stage.t);
      await new Promise(r => setTimeout(r, 600));
    }

    const result = await getAdvisory({
      region,
      crop,
      stage: 'Maturity',
      soilType: 'Loamy',
      observedRainfall: forecast,
      irrigationMethod: 'Manual'
    });

    setAdvisory(result);
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-3xl rounded-[3rem] shadow-[0_50px_100px_-25px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center space-x-4">
            <BrandLogo className="w-10 h-10" />
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">Field Logic Engine</h2>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">Operational Simulation v4.2</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Geographic Node</label>
                    <select 
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 focus:border-[#2c9f45] outline-none transition-all cursor-pointer"
                    >
                      {REGIONS.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Target Commodity</label>
                    <select 
                      value={crop}
                      onChange={(e) => setCrop(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-900 focus:border-[#2c9f45] outline-none transition-all cursor-pointer"
                    >
                      {selectedRegionData?.crops.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Soil Moisture</label>
                      <span className="text-xs font-black text-[#2c9f45]">{moisture}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" value={moisture} 
                      onChange={(e) => setMoisture(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2c9f45]" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weather Matrix</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Heavy Rain', icon: <IconRain /> },
                        { label: 'Extreme Heat', icon: <IconHeat /> },
                        { label: 'High Wind', icon: <IconWind /> },
                        { label: 'Stable', icon: <IconCheck /> }
                      ].map(f => (
                        <button
                          key={f.label}
                          onClick={() => setForecast(f.label)}
                          className={`p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all flex items-center justify-center space-x-2 ${forecast === f.label ? 'bg-[#2c9f45] text-white border-[#2c9f45]' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                        >
                          {f.icon}
                          <span>{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleRunAdvisory}
                  className="w-full bg-[#2c9f45] text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#23863a] transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-3"
                >
                  <span>Execute Analysis Sequence</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="py-20 flex flex-col items-center justify-center space-y-12 animate-in zoom-in duration-500">
               <div className="relative w-32 h-32">
                 <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
                 <div 
                   className="absolute inset-0 border-8 border-[#2c9f45] border-t-transparent rounded-full animate-spin"
                 ></div>
                 <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-slate-900">
                   {analysisProgress}%
                 </div>
               </div>
               
               <div className="text-center space-y-4">
                  <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{analysisText}</p>
                  <div className="w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden mx-auto">
                    <div 
                      className="h-full bg-[#2c9f45] transition-all duration-500" 
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">Do not disconnect from regional hub...</p>
               </div>
            </div>
          )}

          {step === 3 && advisory && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="px-3 py-1 bg-green-50 text-[#2c9f45] border border-green-100 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Verification Confirmed
                  </div>
                  <div className="px-3 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest">
                    Confidence: {advisory.confidence}%
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ref: SD-2026-X4</div>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                   <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                </div>
                
                <div className="relative z-10 space-y-10">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-[0.4em]">Operational Directive</p>
                    <h3 className="text-4xl font-bold uppercase tracking-tight leading-tight">{advisory.action}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">System Reasoning</p>
                      <p className="text-sm font-medium leading-relaxed text-slate-300">{advisory.reason}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Loss Prevention Detail</p>
                      <p className="text-sm font-medium leading-relaxed text-slate-300">{advisory.lossReductionDetail}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                    <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                       <p className="text-[8px] font-black text-[#2c9f45] uppercase tracking-widest mb-1">Impact Potential</p>
                       <p className="text-lg font-bold">~18% Yield Recovery</p>
                    </div>
                    <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                       <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-1">Risk Mitigated</p>
                       <p className="text-lg font-bold">{advisory.riskPrevented.split(' ')[0]} Risk</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <button 
                  onClick={onComplete}
                  className="w-full bg-[#2c9f45] text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#23863a] transition-all shadow-2xl active:scale-95 flex items-center justify-center space-x-3"
                >
                  <span>Synchronize with My Dashboard</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7"></path></svg>
                </button>
                <button 
                  onClick={() => { setStep(1); setAdvisory(null); setAnalysisProgress(0); }}
                  className="text-slate-400 hover:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] transition-colors py-2"
                >
                  Re-Run with Different Parameters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
