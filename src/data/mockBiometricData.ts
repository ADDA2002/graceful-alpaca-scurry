export interface BiometricData {
  personnelId: string;
  heartRate: {
    resting: number;
    average: number;
    max: number;
    variability: number;
  };
  sleep: {
    hoursPerNight: number;
    quality: "poor" | "fair" | "good" | "excellent";
    disturbances: number;
  };
  physicalActivity: {
    stepsPerDay: number;
    activeMinutes: number;
    exerciseSessions: number;
  };
  stressMarkers: {
    cortisolLevel: "low" | "normal" | "elevated" | "high";
    skinConductance: number;
    bodyTemperature: number;
  };
  lastUpdated: string;
}

export const mockBiometricData: BiometricData[] = [
  {
    personnelId: "P-001",
    heartRate: { resting: 72, average: 78, max: 145, variability: 45 },
    sleep: { hoursPerNight: 7, quality: "good", disturbances: 1 },
    physicalActivity: { stepsPerDay: 8500, activeMinutes: 45, exerciseSessions: 3 },
    stressMarkers: { cortisolLevel: "normal", skinConductance: 12, bodyTemperature: 98.6 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-002",
    heartRate: { resting: 85, average: 92, max: 165, variability: 32 },
    sleep: { hoursPerNight: 5.5, quality: "poor", disturbances: 3 },
    physicalActivity: { stepsPerDay: 4200, activeMinutes: 20, exerciseSessions: 1 },
    stressMarkers: { cortisolLevel: "elevated", skinConductance: 18, bodyTemperature: 99.1 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-003",
    heartRate: { resting: 68, average: 72, max: 130, variability: 55 },
    sleep: { hoursPerNight: 8, quality: "excellent", disturbances: 0 },
    physicalActivity: { stepsPerDay: 10000, activeMinutes: 60, exerciseSessions: 4 },
    stressMarkers: { cortisolLevel: "low", skinConductance: 8, bodyTemperature: 98.4 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-004",
    heartRate: { resting: 95, average: 105, max: 180, variability: 25 },
    sleep: { hoursPerNight: 4.5, quality: "poor", disturbances: 4 },
    physicalActivity: { stepsPerDay: 3000, activeMinutes: 15, exerciseSessions: 0 },
    stressMarkers: { cortisolLevel: "high", skinConductance: 22, bodyTemperature: 99.4 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-005",
    heartRate: { resting: 74, average: 80, max: 140, variability: 42 },
    sleep: { hoursPerNight: 6.5, quality: "fair", disturbances: 2 },
    physicalActivity: { stepsPerDay: 7000, activeMinutes: 35, exerciseSessions: 2 },
    stressMarkers: { cortisolLevel: "normal", skinConductance: 14, bodyTemperature: 98.7 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-006",
    heartRate: { resting: 88, average: 95, max: 170, variability: 28 },
    sleep: { hoursPerNight: 5, quality: "poor", disturbances: 3 },
    physicalActivity: { stepsPerDay: 3500, activeMinutes: 18, exerciseSessions: 1 },
    stressMarkers: { cortisolLevel: "elevated", skinConductance: 20, bodyTemperature: 99.2 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-007",
    heartRate: { resting: 70, average: 74, max: 135, variability: 50 },
    sleep: { hoursPerNight: 7.5, quality: "good", disturbances: 1 },
    physicalActivity: { stepsPerDay: 9000, activeMinutes: 50, exerciseSessions: 3 },
    stressMarkers: { cortisolLevel: "normal", skinConductance: 10, bodyTemperature: 98.5 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-008",
    heartRate: { resting: 80, average: 88, max: 155, variability: 38 },
    sleep: { hoursPerNight: 6, quality: "fair", disturbances: 2 },
    physicalActivity: { stepsPerDay: 6500, activeMinutes: 30, exerciseSessions: 2 },
    stressMarkers: { cortisolLevel: "normal", skinConductance: 13, bodyTemperature: 98.8 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-009",
    heartRate: { resting: 76, average: 82, max: 148, variability: 40 },
    sleep: { hoursPerNight: 6.5, quality: "fair", disturbances: 1 },
    physicalActivity: { stepsPerDay: 7500, activeMinutes: 40, exerciseSessions: 2 },
    stressMarkers: { cortisolLevel: "normal", skinConductance: 11, bodyTemperature: 98.6 },
    lastUpdated: "2024-12-15T08:00:00Z"
  },
  {
    personnelId: "P-010",
    heartRate: { resting: 92, average: 100, max: 175, variability: 22 },
    sleep: { hoursPerNight: 4, quality: "poor", disturbances: 5 },
    physicalActivity: { stepsPerDay: 2500, activeMinutes: 10, exerciseSessions: 0 },
    stressMarkers: { cortisolLevel: "high", skinConductance: 25, bodyTemperature: 99.5 },
    lastUpdated: "2024-12-15T08:00:00Z"
  }
];
