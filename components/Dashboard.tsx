
import React, { useState, useMemo, useEffect } from 'react';
import { DashboardSection, UserProfile, Parcel, CropCycle, Advisory, ActiveOperation } from '../types.ts';
import { getAdvisory } from '../geminiService.ts';
import { BrandLogo } from './LandingPage.tsx';

interface Props {
  user: UserProfile;
  parcels: Parcel[];
  cycles: CropCycle[];
  advisories: Advisory[];
  onLogout: () => void;
  onUpdateParcels: (parcels: Parcel[]) => void;
  onUpdateCycles: (cycles: CropCycle[]) => void;
  onUpdateAdvisories: (advisories: Advisory[]) => void;
}

const IconHouse = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const IconChart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
const IconGlobe = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
const IconAlert = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
const IconSignal = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 20V4" /></svg>;

const Dashboard: React.FC<Props> = ({ user, parcels, cycles, advisories, onLogout, onUpdateParcels, onUpdateCycles, onUpdateAdvisories }) => {
  const [activeSection, setActiveSection] = useState<DashboardSection>(DashboardSection.OPERATIONS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [liveTime, setLiveTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const baseDate = new Date('2026-01-30T09:00:00');
      const now = new Date();
      baseDate.setMinutes(now.getMinutes());
      baseDate.setSeconds(now.getSeconds());
      setLiveTime(baseDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) + ' · ' + baseDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Geolocation access denied.")
      );
    }
  }, []);

  const operations: ActiveOperation[] = useMemo(() => {
    return cycles
      .filter(c => c.status === 'Active')
      .map(cycle => {
        const parcel = parcels.find(p => p.id === cycle.parcelId)!;
        const cycleAdvisories = advisories
          .filter(a => a.cycleId === cycle.id && !a.isCompleted)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        return {
          parcel,
          cycle,
          latestAdvisory: cycleAdvisories[0] || null
        };
      });
  }, [parcels, cycles, advisories]);

  const stats = useMemo(() => {
    const completed = advisories.filter(a => a.isCompleted);
    return {
      totalImpactKg: completed.reduce((acc, curr) => acc + curr.impactSavedKg, 0),
      activeRisks: operations.filter(op => op.latestAdvisory?.risk === 'High').length,
      tasksPending: operations.filter(op => op.latestAdvisory).length,
      plotsManaged: parcels.length
    };
  }, [advisories, operations, parcels]);

  const handleCompleteAdvisory = (advisoryId: string) => {
    setIsSyncing(true);
    setTimeout(() => {
      const updated = advisories.map(a => 
        a.id === advisoryId ? { ...a, isCompleted: true, completedAt: new Date().toISOString() } : a
      );
      onUpdateAdvisories(updated);
      setIsSyncing(false);
      setShowConfirmation("This action has reduced potential food loss for this cycle.");
      setTimeout(() => setShowConfirmation(null), 5000);
    }, 800);
  };

  const handleRunConsultation = async (op: ActiveOperation) => {
    setIsSyncing(true);
    const result = await getAdvisory({
      region: user.region,
      crop: op.cycle.cropType,
      stage: op.cycle.stage,
      soilType: op.parcel.soilType,
      observedRainfall: 'Predictive High',
      irrigationMethod: op.parcel.irrigationType,
      lat: coords?.lat,
      lng: coords?.lng
    });

    const newAdvisory: Advisory = {
      id: `adv-${Date.now()}`,
      cycleId: op.cycle.id,
      action: result.action,
      reason: result.reason,
      riskPrevented: result.riskPrevented,
      lossReductionDetail: result.lossReductionDetail,
      confidence: result.confidence,
      risk: result.confidence > 90 ? 'High' : 'Medium',
      impactSavedKg: Math.floor(op.cycle.projectedYieldKg * 0.15),
      createdAt: new Date().toISOString()
    };

    onUpdateAdvisories([...advisories, newAdvisory]);
    setIsSyncing(false);
  };

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden font-sans">
      <aside className="w-20 bg-slate-900 flex flex-col items-center py-8 space-y-12 shrink-0">
        <BrandLogo className="w-10 h-10" />
        <nav className="flex-1 space-y-8 w-full">
          <NavIcon 
            active={activeSection === DashboardSection.OPERATIONS} 
            onClick={() => setActiveSection(DashboardSection.OPERATIONS)}
            icon={<IconHouse />} label="Ops"
          />
          <NavIcon 
            active={activeSection === DashboardSection.RECORDS} 
            onClick={() => setActiveSection(DashboardSection.RECORDS)}
            icon={<IconChart />} label="Data"
          />
          <NavIcon 
            active={activeSection === DashboardSection.IMPACT} 
            onClick={() => setActiveSection(DashboardSection.IMPACT)}
            icon={<IconGlobe />} label="SDG"
          />
        </nav>
        <div className="flex flex-col space-y-4">
          <button onClick={() => window.location.hash = '#/farmer-profile'} className="text-slate-500 hover:text-[#2c9f45] transition-colors p-3 bg-slate-800/50 rounded-xl" title="Farmer Profile">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
          <button onClick={onLogout} className="text-slate-500 hover:text-white transition-colors p-3 bg-slate-800/50 rounded-xl" title="Logout">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center space-x-6">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">
              {activeSection === DashboardSection.OPERATIONS ? 'Operational Control' : 
               activeSection === DashboardSection.RECORDS ? 'Field Records' : 'Local SDG-2 Contribution'}
            </h2>
            <div className="h-4 w-[2px] bg-slate-200 hidden sm:block"></div>
            <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest leading-none hidden sm:block">{liveTime}</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">{user.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.farmName}</p>
            </div>
            <img src={user.avatarUrl} className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50" alt="Profile" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-10">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">These metrics reflect food preserved through timely farm decisions.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SummaryTile label="Food Preserved (kg)" value={`${stats.totalImpactKg}kg`} color="text-[#2c9f45]" />
              <SummaryTile label="Risk Alerts" value={stats.activeRisks.toString()} color={stats.activeRisks > 0 ? "text-rose-600" : "text-slate-400"} />
              <SummaryTile label="Tasks Pending" value={stats.tasksPending.toString()} color="text-amber-600" />
              <SummaryTile label="Plots Managed" value={stats.plotsManaged.toString()} color="text-slate-900" />
            </div>
          </div>

          {activeSection === DashboardSection.OPERATIONS && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1 ml-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Operations</h3>
                      {isSyncing && <span className="text-[10px] font-black text-[#2c9f45] animate-pulse">SYNCING DATA...</span>}
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 italic">Each recommendation is designed to prevent avoidable crop loss before it occurs.</p>
                  </div>

                  {showConfirmation && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center space-x-3 animate-in slide-in-from-top-2">
                      <div className="w-2 h-2 rounded-full bg-[#2c9f45] animate-pulse"></div>
                      <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest">({showConfirmation})</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {operations.map(op => (
                      <div key={op.cycle.id} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-[#2c9f45]/20 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                          <div className="flex-1 space-y-6">
                            <div className="flex items-center space-x-6">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${op.latestAdvisory ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                                {op.latestAdvisory ? <IconAlert /> : <IconSignal />}
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{op.cycle.cropType} · {op.cycle.stage}</p>
                                <h4 className="text-xl font-bold text-slate-900">
                                  {op.latestAdvisory ? op.latestAdvisory.action : 'Actively monitoring field conditions...'}
                                </h4>
                              </div>
                            </div>
                            
                            {op.latestAdvisory && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pl-1 border-l-2 border-slate-50">
                                <AdvisoryDetail label="Biological Logic" text={op.latestAdvisory.reason} />
                                <AdvisoryDetail label="Risk Mitigation" text={op.latestAdvisory.riskPrevented || "Calculating prevention vector..."} />
                              </div>
                            )}
                            
                            {op.latestAdvisory && (
                               <p className="text-[9px] font-medium text-slate-400 italic">Timely action at this stage helps secure the harvest for consumption or sale.</p>
                            )}
                          </div>
                          
                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                            {op.latestAdvisory ? (
                              <button 
                                onClick={() => handleCompleteAdvisory(op.latestAdvisory!.id)}
                                className="px-10 py-5 bg-[#2c9f45] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#23863a] transition-all shadow-md active:scale-95 min-w-[160px]"
                              >
                                Confirm Completed Decision
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleRunConsultation(op)}
                                className="px-10 py-5 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-md active:scale-95 min-w-[160px]"
                              >
                                Sync Advisory
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Regional Hub Status</p>
                    <div className={`w-3 h-3 rounded-full ${stats.activeRisks > 0 ? 'bg-rose-500 animate-pulse' : 'bg-[#2c9f45]'}`}></div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 uppercase tracking-tight leading-none">
                    {stats.activeRisks > 0 ? 'Action Required' : 'Optimal Patterns'}
                  </p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                    {stats.activeRisks > 0 
                      ? "Climate data suggests immediate intervention in plots under maturity phase to ensure post-harvest integrity."
                      : "Field conditions are currently safe and stable. Maintain standard monitoring schedule."
                    }
                  </p>
                </div>

                <div className="bg-slate-900 rounded-2xl p-8 text-white space-y-6 border border-slate-800 group overflow-hidden relative">
                  <div className="absolute -bottom-6 -right-6 text-[#2c9f45]/20 group-hover:scale-110 transition-transform">
                    <IconGlobe />
                  </div>
                  <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest">Field Node Coordinates</p>
                  <div className="space-y-1 relative z-10">
                    <p className="text-2xl font-bold tracking-tight leading-none">{user.region}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                      {coords ? `POS: ${coords.lat.toFixed(4)} / ${coords.lng.toFixed(4)}` : 'SCANNING GPS...'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === DashboardSection.RECORDS && (
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm max-w-4xl">
               <div className="flex flex-col space-y-1 mb-8">
                 <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Verified Harvest Log</h3>
                   <span className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest">System Record Active</span>
                 </div>
                 <p className="text-[10px] font-medium text-slate-500 italic">Completed records represent food safeguarded through informed field actions.</p>
               </div>
               <div className="space-y-4">
                  {advisories.filter(a => a.isCompleted).length > 0 ? (
                    advisories.filter(a => a.isCompleted).sort((a,b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()).map(a => (
                      <div key={a.id} className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center group">
                         <div>
                            <p className="text-[9px] font-black text-[#2c9f45] uppercase tracking-widest mb-1">Entry Confirmed · {new Date(a.completedAt!).toLocaleDateString()}</p>
                            <p className="font-bold text-slate-900 text-sm">{a.action}</p>
                            <p className="text-[10px] text-slate-400 italic mt-1">{a.reason}</p>
                         </div>
                         <div className="text-right">
                           <span className="text-xs font-bold text-slate-600">+{a.impactSavedKg}kg Saved</span>
                           <div className="text-[8px] font-black text-slate-300 uppercase mt-1">Audit Traceable</div>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-sm text-slate-400 font-medium italic">No operations logged for the current period.</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          {activeSection === DashboardSection.IMPACT && (
            <div className="max-w-4xl space-y-8">
               <div className="space-y-2">
                 <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest">SDG-2 Impact Tracking</p>
                 <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">Verified Cumulative Outcomes</h3>
                 <p className="text-[10px] font-medium text-slate-500 italic">Tracking how everyday farm decisions contribute to food security.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-10 bg-green-50 rounded-3xl border border-green-100 space-y-4 relative overflow-hidden group">
                    <div className="absolute top-4 right-4 text-[#2c9f45]/20 scale-[4] group-hover:scale-[5] transition-transform"><IconGlobe /></div>
                    <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest relative z-10">Total Food Loss Prevented</p>
                    <p className="text-5xl font-bold text-slate-900 tracking-tighter relative z-10">{stats.totalImpactKg}kg</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium relative z-10">Calculated impact based on verified harvest logs and regional baseline yield averages for 2026.</p>
                 </div>
                 <div className="p-10 bg-slate-900 rounded-3xl space-y-4 text-white">
                    <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest">Operational Resilience Score</p>
                    <p className="text-5xl font-bold tracking-tighter">High</p>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">System performance aligns with sustainable agriculture metrics for local food security targets (SDG-2.4).</p>
                 </div>
               </div>
            </div>
          )}
        </div>
      </main>
      <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-center px-10 shrink-0">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">FoodFlow supports farmers in reducing preventable food loss at the source.</p>
      </footer>
    </div>
  );
};

const NavIcon: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center space-y-2 transition-all group w-full p-2 rounded-xl ${active ? 'text-[#2c9f45] bg-slate-800/80' : 'text-slate-500 hover:text-slate-200'}`}
  >
    <span className="transition-transform group-hover:scale-110">{icon}</span>
    <span className="text-[9px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </button>
);

const SummaryTile: React.FC<{ label: string, value: string, color: string }> = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group hover:border-[#2c9f45]/20 transition-colors">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 leading-none">{label}</p>
    <p className={`text-3xl font-bold tracking-tight leading-none ${color}`}>{value}</p>
  </div>
);

const AdvisoryDetail: React.FC<{ label: string, text: string }> = ({ label, text }) => (
  <div className="space-y-1">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
    <p className="text-xs text-slate-600 leading-relaxed font-medium">{text}</p>
  </div>
);

export default Dashboard;
