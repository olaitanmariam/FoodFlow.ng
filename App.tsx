
import React, { useState, useEffect, useCallback } from 'react';
import { AppView, UserProfile, Parcel, CropCycle, Advisory } from './types.ts';
import LandingPage from './components/LandingPage.tsx';
import Dashboard from './components/Dashboard.tsx';
import DemoModal from './components/DemoModal.tsx';
import AuthView from './components/AuthView.tsx';
import AboutPage from './components/AboutPage.tsx';
import ImpactPage from './components/ImpactPage.tsx';
import FarmerProfileDashboard from './components/FarmerProfileDashboard.tsx';
import { MOCK_PARCELS, MOCK_CYCLES, MOCK_ADVISORIES } from './constants.ts';

const SESSION_KEY = 'foodflow_user_session';
const DATA_PREFIX = 'foodflow_data_';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [cycles, setCycles] = useState<CropCycle[]>([]);
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hash Router Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/about') {
        setView(AppView.ABOUT);
      } else if (hash === '#/impact') {
        setView(AppView.IMPACT);
      } else if (hash === '#/auth') {
        setView(AppView.AUTH);
      } else if (hash === '#/farmer-profile' && user) {
        setView(AppView.FARMER_DASHBOARD);
      } else if (hash === '#/dashboard' && user) {
        setView(AppView.DASHBOARD);
      } else {
        setView(user ? AppView.DASHBOARD : AppView.LANDING);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user]);

  const loadUserData = useCallback((userId: string) => {
    const key = `${DATA_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setParcels(parsed.parcels || []);
        setCycles(parsed.cycles || []);
        setAdvisories(parsed.advisories || []);
      } catch (e) {
        setParcels(MOCK_PARCELS);
        setCycles(MOCK_CYCLES);
        setAdvisories(MOCK_ADVISORIES);
      }
    } else {
      setParcels(MOCK_PARCELS);
      setCycles(MOCK_CYCLES);
      setAdvisories(MOCK_ADVISORIES);
      saveData(userId, MOCK_PARCELS, MOCK_CYCLES, MOCK_ADVISORIES);
    }
  }, []);

  const saveData = (userId: string, p: Parcel[], c: CropCycle[], a: Advisory[]) => {
    localStorage.setItem(`${DATA_PREFIX}${userId}`, JSON.stringify({ parcels: p, cycles: c, advisories: a }));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem(SESSION_KEY);
    if (savedUser) {
      try {
        const parsedUser: UserProfile = JSON.parse(savedUser);
        setUser(parsedUser);
        loadUserData(parsedUser.id);
      } catch (e) {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, [loadUserData]);

  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    loadUserData(userData.id);
    window.location.hash = '#/dashboard';
  };

  const handleUpdateProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    setUser(null);
    setParcels([]); 
    setCycles([]);
    setAdvisories([]);
    localStorage.removeItem(SESSION_KEY);
    window.location.hash = '#/';
  };

  const updateParcels = (newParcels: Parcel[]) => {
    if (user) {
      setParcels(newParcels);
      saveData(user.id, newParcels, cycles, advisories);
    }
  };

  const updateCycles = (newCycles: CropCycle[]) => {
    if (user) {
      setCycles(newCycles);
      saveData(user.id, parcels, newCycles, advisories);
    }
  };

  const updateAdvisories = (newAdvisories: Advisory[]) => {
    if (user) {
      setAdvisories(newAdvisories);
      saveData(user.id, parcels, cycles, newAdvisories);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 space-y-4">
        <div className="w-10 h-10 border-4 border-[#2c9f45] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Initializing Data Fabric...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {view === AppView.LANDING && (
        <LandingPage 
          onOpenDemo={() => setIsDemoOpen(true)} 
          onLoginClick={() => window.location.hash = '#/auth'}
          onAboutClick={() => window.location.hash = '#/about'}
          onImpactClick={() => window.location.hash = '#/impact'}
        />
      )}

      {view === AppView.ABOUT && (
        <AboutPage 
          onHomeClick={() => window.location.hash = '#/'}
          onLoginClick={() => window.location.hash = '#/auth'}
          onOpenDemo={() => setIsDemoOpen(true)}
          onImpactClick={() => window.location.hash = '#/impact'}
        />
      )}

      {view === AppView.IMPACT && (
        <ImpactPage 
          onHomeClick={() => window.location.hash = '#/'}
          onAboutClick={() => window.location.hash = '#/about'}
          onLoginClick={() => window.location.hash = '#/auth'}
          onOpenDemo={() => setIsDemoOpen(true)}
        />
      )}

      {view === AppView.AUTH && (
        <AuthView 
          onBack={() => window.location.hash = '#/'} 
          onSuccess={handleLoginSuccess} 
        />
      )}

      {view === AppView.DASHBOARD && user && (
        <Dashboard 
          user={user} 
          parcels={parcels}
          cycles={cycles}
          advisories={advisories}
          onLogout={handleLogout} 
          onUpdateParcels={updateParcels}
          onUpdateCycles={updateCycles}
          onUpdateAdvisories={updateAdvisories}
        />
      )}

      {view === AppView.FARMER_DASHBOARD && user && (
        <FarmerProfileDashboard
          user={user}
          parcels={parcels}
          cycles={cycles}
          onUpdateProfile={handleUpdateProfile}
          onUpdateCycles={updateCycles}
          onLogout={handleLogout}
        />
      )}

      {isDemoOpen && (
        <DemoModal 
          onClose={() => setIsDemoOpen(false)} 
          onComplete={() => {
            setIsDemoOpen(false);
            if (!user) window.location.hash = '#/auth';
            else window.location.hash = '#/dashboard';
          }} 
        />
      )}
    </div>
  );
};

export default App;