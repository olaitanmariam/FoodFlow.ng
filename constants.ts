
import { RegionOption, Parcel, CropCycle, Advisory } from './types';

export const REGIONS: RegionOption[] = [
  {
    value: 'west-africa',
    label: 'West Africa',
    crops: ['Maize', 'Cassava', 'Yam', 'Cocoa']
  },
  {
    value: 'east-africa',
    label: 'East Africa',
    crops: ['Coffee', 'Tea', 'Maize', 'Sorghum']
  },
  {
    value: 'asia',
    label: 'South/Southeast Asia',
    crops: ['Rice', 'Sugarcane', 'Palm Oil', 'Rubber']
  }
];

export const MOCK_PARCELS: Parcel[] = [
  { id: 'par-1', userId: 'user-1', name: 'North Field A-1', hectares: 2.5, soilType: 'Loamy', irrigationType: 'Manual' },
  { id: 'par-2', userId: 'user-1', name: 'Riverbank Plot', hectares: 1.2, soilType: 'Clay', irrigationType: 'Drip' },
  { id: 'par-3', userId: 'user-1', name: 'East Plateau', hectares: 3.8, soilType: 'Sandy', irrigationType: 'Rain-fed' }
];

export const MOCK_CYCLES: CropCycle[] = [
  { 
    id: 'cyc-1', 
    parcelId: 'par-1', 
    cropType: 'Maize', 
    stage: 'Maturity', 
    status: 'Active', 
    plantedAt: '2025-03-12', 
    targetHarvestAt: '2025-06-20', 
    projectedYieldKg: 4500 
  },
  { 
    id: 'cyc-2', 
    parcelId: 'par-2', 
    cropType: 'Rice', 
    stage: 'Vegetative', 
    status: 'Active', 
    plantedAt: '2025-04-05', 
    targetHarvestAt: '2025-08-15', 
    projectedYieldKg: 2100 
  }
];

export const MOCK_ADVISORIES: Advisory[] = [
  {
    id: 'adv-1',
    cycleId: 'cyc-1',
    action: 'Harvest Immediately',
    reason: 'Storm surge probability exceeds 90% threshold for maturity stage.',
    confidence: 94,
    risk: 'High',
    impactSavedKg: 3600,
    createdAt: new Date().toISOString()
  }
];
