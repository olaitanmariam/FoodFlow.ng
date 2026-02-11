
export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  FARMER_DASHBOARD = 'FARMER_DASHBOARD',
  AUTH = 'AUTH',
  ABOUT = 'ABOUT',
  IMPACT = 'IMPACT'
}

export enum DashboardSection {
  OPERATIONS = 'OPERATIONS',
  RECORDS = 'RECORDS',
  IMPACT = 'IMPACT'
}

export interface RegionOption {
  value: string;
  label: string;
  crops: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  farmName: string;
  region: string;
  locationCountry?: string;
  email: string;
  avatarUrl: string;
  landSize?: number;
  farmingPractice?: 'Rain-fed' | 'Irrigated' | 'Mixed';
  timezone?: string;
}

export type SoilType = 'Loamy' | 'Clay' | 'Sandy' | 'Silt' | 'Peat';
export type IrrigationType = 'Manual' | 'Drip' | 'Sprinkler' | 'Rain-fed';
export type GrowthStage = 'Seeding' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvesting';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Parcel {
  id: string;
  userId: string;
  name: string;
  hectares: number;
  soilType: SoilType;
  irrigationType: IrrigationType;
}

export interface CropCycle {
  id: string;
  parcelId: string;
  cropType: string;
  stage: GrowthStage;
  status: 'Active' | 'Harvested' | 'Fallow';
  plantedAt: string;
  targetHarvestAt: string;
  projectedYieldKg: number;
}

export interface Advisory {
  id: string;
  cycleId: string;
  action: string;
  reason: string;
  riskPrevented?: string;
  lossReductionDetail?: string;
  confidence: number;
  risk: RiskLevel;
  impactSavedKg: number;
  createdAt: string;
  isCompleted?: boolean;
  completedAt?: string;
}

export interface ActiveOperation {
  parcel: Parcel;
  cycle: CropCycle;
  latestAdvisory: Advisory | null;
}
