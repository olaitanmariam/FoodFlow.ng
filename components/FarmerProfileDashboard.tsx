
import React, { useState } from 'react';
import { UserProfile, Parcel, CropCycle, GrowthStage } from '../types.ts';
import { BrandLogo } from './LandingPage.tsx';

interface Props {
  user: UserProfile;
  parcels: Parcel[];
  cycles: CropCycle[];
  onUpdateProfile: (user: UserProfile) => void;
  onUpdateCycles: (cycles: CropCycle[]) => void;
  onLogout: () => void;
}

const IconSprout = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M7 20h10" /><path d="M12 20V10" /><path d="M12 10a5 5 0 0 1 5 5" /><path d="M12 10a5 5 0 0 0-5 5" /></svg>;
const IconLayers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>;

const FarmerProfileDashboard: React.FC<Props> = ({ user, parcels, cycles, onUpdateProfile, onUpdateCycles, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'PROFILE' | 'RECORDS'>('PROFILE');
  const [profileForm, setProfileForm] = useState(user);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateProfile(profileForm);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleUpdateCycleStage = (cycleId: string, stage: GrowthStage) => {
    const updated = cycles.map(c => c.id === cycleId ? { ...c, stage } : c);
    onUpdateCycles(updated);
  };

  const totalHectares = parcels.reduce((acc, curr) => acc + curr.hectares, 0);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <aside className="w-20 bg-slate-900 flex flex-col items-center py-10 space-y-10">
        <BrandLogo className="w-8 h-8" />
        <button onClick={() => window.location.hash = '#/dashboard'} className="p-3 text-slate-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10">
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Farm Management Engine</h2>
          <div className="flex space-x-2">
            <TabButton active={activeTab === 'PROFILE'} onClick={() => setActiveTab('PROFILE')} label="Farm Identity" />
            <TabButton active={activeTab === 'RECORDS'} onClick={() => setActiveTab('RECORDS')} label="Plot Registry" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-4xl mx-auto space-y-10">
            {activeTab === 'PROFILE' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <section className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 space-y-10">
                  <div className="flex items-center space-x-6">
                    <img src={user.avatarUrl} className="w-24 h-24 rounded-full border-4 border-slate-50" alt="Farmer" />
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{user.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.farmName} • {user.region}, {user.locationCountry || 'Global'}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormField label="Manager Full Name">
                        <input type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="input-field" />
                      </FormField>
                      <FormField label="Farm Entity Name">
                        <input type="text" value={profileForm.farmName} onChange={e => setProfileForm({...profileForm, farmName: e.target.value})} className="input-field" />
                      </FormField>
                      <FormField label="Country Location">
                        <input type="text" placeholder="e.g. Kenya, Ghana" value={profileForm.locationCountry || ''} onChange={e => setProfileForm({...profileForm, locationCountry: e.target.value})} className="input-field" />
                      </FormField>
                      <FormField label="Local Timezone">
                        <select value={profileForm.timezone || 'UTC'} onChange={e => setProfileForm({...profileForm, timezone: e.target.value})} className="input-field">
                          <option value="UTC">UTC</option>
                          <option value="GMT">GMT</option>
                          <option value="WAT">West Africa Time</option>
                          <option value="EAT">East Africa Time</option>
                          <option value="IST">India Standard Time</option>
                        </select>
                      </FormField>
                      <FormField label="Total Land Size (Hectares)">
                        <input type="number" value={profileForm.landSize || 0} onChange={e => setProfileForm({...profileForm, landSize: Number(e.target.value)})} className="input-field" />
                      </FormField>
                      <FormField label="Primary Farming Practice">
                        <select value={profileForm.farmingPractice || 'Mixed'} onChange={e => setProfileForm({...profileForm, farmingPractice: e.target.value as any})} className="input-field">
                          <option>Rain-fed</option>
                          <option>Irrigated</option>
                          <option>Mixed</option>
                        </select>
                      </FormField>
                    </div>

                    <div className="flex items-center justify-between pt-6">
                      <button disabled={isSaving} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-slate-800 transition-all">
                        {isSaving ? 'Synchronizing Profile...' : 'Update Records'}
                      </button>
                      {showSuccess && (
                        <span className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest animate-in slide-in-from-right-2">✓ Verified: Local Database Synced</span>
                      )}
                    </div>
                  </form>
                </section>

                <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] flex items-center justify-between group">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Farm Topology Overview</p>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">System manages <span className="font-bold text-slate-900">{parcels.length} plots</span> across <span className="font-bold text-slate-900">{totalHectares} hectares</span>. Verification active for {user.region}.</p>
                   </div>
                   <div className="text-[#2c9f45] group-hover:scale-110 transition-transform"><IconLayers /></div>
                </div>
              </div>
            )}

            {activeTab === 'RECORDS' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex justify-between items-center px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Plot Registry</p>
                  <p className="text-[10px] font-black text-[#2c9f45] uppercase tracking-widest">Data Sovereignty Active</p>
                </div>
                <div className="space-y-4">
                  {cycles.map(cycle => {
                    const parcel = parcels.find(p => p.id === cycle.parcelId);
                    return (
                      <div key={cycle.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-6">
                        <div className="flex items-center space-x-6">
                          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#2c9f45]">
                            <IconSprout />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{parcel?.name} • {parcel?.hectares}ha</p>
                            <h4 className="text-xl font-bold text-slate-900">{cycle.cropType}</h4>
                            <p className="text-[10px] text-slate-400 italic">Planted on {new Date(cycle.plantedAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex flex-col md:items-end space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Lifecycle Phase</label>
                          <select 
                            value={cycle.stage}
                            onChange={e => handleUpdateCycleStage(cycle.id, e.target.value as any)}
                            className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-[#2c9f45] font-black text-xs min-w-[200px]"
                          >
                            <option>Seeding</option>
                            <option>Vegetative</option>
                            <option>Flowering</option>
                            <option>Maturity</option>
                            <option>Harvesting</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                  <button className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-[#2c9f45] hover:text-[#2c9f45] transition-all bg-white/50">
                    + Initialize New Plot Cycle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style>{`
        .input-field {
          width: 100%;
          padding: 1rem;
          background-color: #f8fafc;
          border-width: 2px;
          border-color: #f1f5f9;
          border-radius: 1rem;
          outline: transparent;
          font-weight: 700;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #2c9f45;
        }
      `}</style>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean, onClick: () => void, label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
      active ? 'bg-[#2c9f45] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
  </button>
);

const FormField: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    {children}
  </div>
);

export default FarmerProfileDashboard;
