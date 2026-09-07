export interface WellnessResponse {
  id: string;
  personnelId: string;
  date: string;
  sleepQuality: number; // 1-5
  stressLevel: number; // 1-5
  mood: "excellent" | "good" | "fair" | "poor" | "very-poor";
  energyLevel: number; // 1-5
  workLifeBalance: number; // 1-5
  socialSupport: number; // 1-5
  physicalSymptoms: string[];
  notes: string;
  biometricData?: {
    heartRate?: number;
    bloodPressure?: string;
    steps?: number;
  };
}

export const mockWellnessData: WellnessResponse[] = [
  {
    id: "W-001",
    personnelId: "P-001",
    date: "2024-12-01",
    sleepQuality: 3,
    stressLevel: 4,
    mood: "fair",
    energyLevel: 3,
    workLifeBalance: 2,
    socialSupport: 4,
    physicalSymptoms: ["headache", "fatigue"],
    notes: "Feeling overwhelmed with recent deployment schedule"
  },
  {
    id: "W-002",
    personnelId: "P-001",
    date: "2024-12-08",
    sleepQuality: 2,
    stressLevel: 5,
    mood: "poor",
    energyLevel: 2,
    workLifeBalance: 1,
    socialSupport: 3,
    physicalSymptoms: ["insomnia", "muscle tension", "headache"],
    notes: "High stress due to upcoming evaluation and overtime"
  },
  {
    id: "W-003",
    personnelId: "P-002",
    date: "2024-12-05",
    sleepQuality: 4,
    stressLevel: 2,
    mood: "good",
    energyLevel: 4,
    workLifeBalance: 3,
    socialSupport: 4,
    physicalSymptoms: [],
    notes: "Feeling good overall, managing workload well"
  },
  {
    id: "W-004",
    personnelId: "P-003",
    date: "2024-12-10",
    sleepQuality: 5,
    stressLevel: 1,
    mood: "excellent",
    energyLevel: 5,
    workLifeBalance: 5,
    socialSupport: 5,
    physicalSymptoms: [],
    notes: "Excellent week, feeling very positive"
  },
  {
    id: "W-005",
    personnelId: "P-004",
    date: "2024-12-02",
    sleepQuality: 2,
    stressLevel: 5,
    mood: "very-poor",
    energyLevel: 1,
    workLifeBalance: 1,
    socialSupport: 2,
    physicalSymptoms: ["insomnia", "chest tightness", "fatigue", "anxiety"],
    notes: "Critical stress levels, multiple deployments, considering medical leave"
  },
  {
    id: "W-006",
    personnelId: "P-004",
    date: "2024-12-09",
    sleepQuality: 1,
    stressLevel: 5,
    mood: "very-poor",
    energyLevel: 1,
    workLifeBalance: 1,
    socialSupport: 2,
    physicalSymptoms: ["insomnia", "chest tightness", "fatigue", "anxiety", "palpitations"],
    notes: "Urgent need for intervention - critical stress indicators"
  },
  {
    id: "W-007",
    personnelId: "P-005",
    date: "2024-12-07",
    sleepQuality: 4,
    stressLevel: 2,
    mood: "good",
    energyLevel: 4,
    workLifeBalance: 4,
    socialSupport: 5,
    physicalSymptoms: [],
    notes: "Good balance between work and personal life"
  },
  {
    id: "W-008",
    personnelId: "P-006",
    date: "2024-12-03",
    sleepQuality: 3,
    stressLevel: 4,
    mood: "fair",
    energyLevel: 3,
    workLifeBalance: 2,
    socialSupport: 3,
    physicalSymptoms: ["fatigue", "irritability"],
    notes: "Struggling with frequent transfers and irregular schedule"
  },
  {
    id: "W-009",
    personnelId: "P-007",
    date: "2024-12-11",
    sleepQuality: 4,
    stressLevel: 2,
    mood: "good",
    energyLevel: 4,
    workLifeBalance: 4,
    socialSupport: 4,
    physicalSymptoms: [],
    notes: "Adjusting well to new role"
  },
  {
    id: "W-010",
    personnelId: "P-008",
    date: "2024-12-06",
    sleepQuality: 3,
    stressLevel: 3,
    mood: "fair",
    energyLevel: 3,
    workLifeBalance: 3,
    socialSupport: 4,
    physicalSymptoms: ["occasional headaches"],
    notes: "Moderate stress from operational tempo"
  },
  {
    id: "W-011",
    personnelId: "P-009",
    date: "2024-12-04",
    sleepQuality: 4,
    stressLevel: 2,
    mood: "good",
    energyLevel: 4,
    workLifeBalance: 4,
    socialSupport: 5,
    physicalSymptoms: [],
    notes: "Feeling supported by team and leadership"
  },
  {
    id: "W-012",
    personnelId: "P-010",
    date: "2024-12-08",
    sleepQuality: 2,
    stressLevel: 4,
    mood: "poor",
    energyLevel: 2,
    workLifeBalance: 2,
    socialSupport: 3,
    physicalSymptoms: ["fatigue", "anxiety", "appetite changes"],
    notes: "Concerned about health and workload balance"
  }
];