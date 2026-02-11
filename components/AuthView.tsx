
import React, { useState } from 'react';
import { UserProfile } from '../types.ts';
import { REGIONS } from '../constants.ts';
import { BrandLogo } from './LandingPage.tsx';

interface Props {
  onBack: () => void;
  onSuccess: (user: UserProfile) => void;
}

const USERS_REGISTRY_KEY = 'foodflow_users_registry';

const AuthView: React.FC<Props> = ({ onBack, onSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [farmName, setFarmName] = useState('');
  const [region, setRegion] = useState(REGIONS[0].value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    setTimeout(() => {
      const registryStr = localStorage.getItem(USERS_REGISTRY_KEY);
      const registry: UserProfile[] = registryStr ? JSON.parse(registryStr) : [];

      if (isSignup) {
        if (registry.find(u => u.email === email)) {
          setError('Operational email already registered.');
          setLoading(false);
          return;
        }

        const newUser: UserProfile = {
          id: `usr-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
          name,
          farmName,
          region: REGIONS.find(r => r.value === region)?.label || 'Global',
          email,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        };

        registry.push(newUser);
        localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(registry));
        onSuccess(newUser);
      } else {
        const user = registry.find(u => u.email === email);
        if (user) {
          onSuccess(user);
        } else {
          setError('Credentials not verified or account not found.');
        }
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 p-10 md:p-14 space-y-10 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="text-slate-400 hover:text-slate-600 flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              <span>Exit Portal</span>
            </button>
            <BrandLogo className="w-12 h-12" />
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none uppercase">
              {isSignup ? 'Register Farm' : 'Access Portal'}
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">SDG-2 Operational Protocol v2025</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-xs font-bold border border-red-100 animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Manager Name</label>
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#2c9f45] outline-none font-bold text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Farm Entity</label>
                  <input required type="text" value={farmName} onChange={(e) => setFarmName(e.target.value)} placeholder="Hub Name" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#2c9f45] outline-none font-bold text-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Region</label>
                  <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-sm appearance-none">
                    {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="operator@foodflow.ag" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#2c9f45] outline-none font-bold text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secret Key</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#2c9f45] outline-none font-bold text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center space-x-3 active:scale-95">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>Verifying Node...</span>
                </>
              ) : (
                <span>{isSignup ? 'Complete Hub Registration' : 'Initialize Session'}</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button onClick={() => setIsSignup(!isSignup)} className="text-slate-400 hover:text-[#2c9f45] text-[10px] font-black uppercase tracking-widest transition-colors">
              {isSignup ? 'Existing Operator? Sign In' : "New Farm Entry? Register"}
            </button>
          </div>
      </div>
    </div>
  );
};

export default AuthView;
