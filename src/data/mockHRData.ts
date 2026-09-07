export interface HRIndicator {
  personnelId: string;
  leaveUsage: {
    frequency: number; // Number of leave requests in last 12 months
    totalDays: number;
    sickLeaveDays: number;
    emergencyLeave: number;
  };
  deployments: {
    totalDeployments: number;
    totalDays: number;
    lastDeploymentDate: string;
    deploymentLocations: string[];
  };
  transfers: {
    totalTransfers: number;
    yearsSinceLastTransfer: number;
  };
  dutySchedule: {
    irregularShifts: number; // Number of irregular shift assignments
    overtimeHours: number;
    nightShifts: number;
  };
  training: {
    coursesCompleted: number;
    highIntensityTrainings: number;
    upcomingTrainings: number;
  };
  performanceMetrics: {
    lastReviewScore: number; // 1-5
    commendations: number;
    incidents: number;
  };
}

export const mockHRData: HRIndicator[] = [
  {
    personnelId: "P-001",
    leaveUsage: { frequency: 2, totalDays: 14, sickLeaveDays: 2, emergencyLeave: 0 },
    deployments: { totalDeployments: 5, totalDays: 540, lastDeploymentDate: "2024-06-15", deploymentLocations: ["Region A", "Region C", "Region F"] },
    transfers: { totalTransfers: 3, yearsSinceLastTransfer: 2 },
    dutySchedule: { irregularShifts: 4, overtimeHours: 120, nightShifts: 15 },
    training: { coursesCompleted: 12, highIntensityTrainings: 6, upcomingTrainings: 2 },
    performanceMetrics: { lastReviewScore: 4, commendations: 5, incidents: 0 }
  },
  {
    personnelId: "P-002",
    leaveUsage: { frequency: 4, totalDays: 28, sickLeaveDays: 8, emergencyLeave: 1 },
    deployments: { totalDeployments: 3, totalDays: 365, lastDeploymentDate: "2024-03-20", deploymentLocations: ["Region B", "Region D"] },
    transfers: { totalTransfers: 2, yearsSinceLastTransfer: 3 },
    dutySchedule: { irregularShifts: 8, overtimeHours: 200, nightShifts: 30 },
    training: { coursesCompleted: 8, highIntensityTrainings: 4, upcomingTrainings: 1 },
    performanceMetrics: { lastReviewScore: 3, commendations: 2, incidents: 2 }
  },
  {
    personnelId: "P-003",
    leaveUsage: { frequency: 1, totalDays: 7, sickLeaveDays: 0, emergencyLeave: 0 },
    deployments: { totalDeployments: 0, totalDays: 0, lastDeploymentDate: "", deploymentLocations: [] },
    transfers: { totalTransfers: 0, yearsSinceLastTransfer: 2 },
    dutySchedule: { irregularShifts: 2, overtimeHours: 40, nightShifts: 8 },
    training: { coursesCompleted: 5, highIntensityTrainings: 2, upcomingTrainings: 3 },
    performanceMetrics: { lastReviewScore: 4, commendations: 1, incidents: 0 }
  },
  {
    personnelId: "P-004",
    leaveUsage: { frequency: 6, totalDays: 42, sickLeaveDays: 5, emergencyLeave: 2 },
    deployments: { totalDeployments: 8, totalDays: 900, lastDeploymentDate: "2024-11-01", deploymentLocations: ["Region A", "Region B", "Region C", "Region E"] },
    transfers: { totalTransfers: 5, yearsSinceLastTransfer: 1 },
    dutySchedule: { irregularShifts: 12, overtimeHours: 350, nightShifts: 50 },
    training: { coursesCompleted: 18, highIntensityTrainings: 10, upcomingTrainings: 0 },
    performanceMetrics: { lastReviewScore: 5, commendations: 12, incidents: 1 }
  },
  {
    personnelId: "P-005",
    leaveUsage: { frequency: 3, totalDays: 21, sickLeaveDays: 3, emergencyLeave: 0 },
    deployments: { totalDeployments: 2, totalDays: 180, lastDeploymentDate: "2024-08-10", deploymentLocations: ["Region D"] },
    transfers: { totalTransfers: 1, yearsSinceLastTransfer: 4 },
    dutySchedule: { irregularShifts: 5, overtimeHours: 90, nightShifts: 12 },
    training: { coursesCompleted: 10, highIntensityTrainings: 3, upcomingTrainings: 1 },
    performanceMetrics: { lastReviewScore: 4, commendations: 4, incidents: 0 }
  },
  {
    personnelId: "P-006",
    leaveUsage: { frequency: 7, totalDays: 49, sickLeaveDays: 14, emergencyLeave: 3 },
    deployments: { totalDeployments: 4, totalDays: 420, lastDeploymentDate: "2024-05-25", deploymentLocations: ["Region A", "Region C"] },
    transfers: { totalTransfers: 4, yearsSinceLastTransfer: 1 },
    dutySchedule: { irregularShifts: 10, overtimeHours: 280, nightShifts: 40 },
    training: { coursesCompleted: 9, highIntensityTrainings: 5, upcomingTrainings: 2 },
    performanceMetrics: { lastReviewScore: 3, commendations: 2, incidents: 3 }
  },
  {
    personnelId: "P-007",
    leaveUsage: { frequency: 2, totalDays: 14, sickLeaveDays: 1, emergencyLeave: 0 },
    deployments: { totalDeployments: 1, totalDays: 90, lastDeploymentDate: "2024-09-15", deploymentLocations: ["Region B"] },
    transfers: { totalTransfers: 1, yearsSinceLastTransfer: 1 },
    dutySchedule: { irregularShifts: 3, overtimeHours: 60, nightShifts: 10 },
    training: { coursesCompleted: 4, highIntensityTrainings: 1, upcomingTrainings: 2 },
    performanceMetrics: { lastReviewScore: 4, commendations: 1, incidents: 0 }
  },
  {
    personnelId: "P-008",
    leaveUsage: { frequency: 3, totalDays: 25, sickLeaveDays: 4, emergencyLeave: 0 },
    deployments: { totalDeployments: 6, totalDays: 720, lastDeploymentDate: "2024-07-20", deploymentLocations: ["Region A", "Region B", "Region D", "Region E"] },
    transfers: { totalTransfers: 2, yearsSinceLastTransfer: 3 },
    dutySchedule: { irregularShifts: 6, overtimeHours: 150, nightShifts: 20 },
    training: { coursesCompleted: 15, highIntensityTrainings: 8, upcomingTrainings: 1 },
    performanceMetrics: { lastReviewScore: 4, commendations: 6, incidents: 1 }
  },
  {
    personnelId: "P-009",
    leaveUsage: { frequency: 2, totalDays: 18, sickLeaveDays: 2, emergencyLeave: 1 },
    deployments: { totalDeployments: 4, totalDays: 450, lastDeploymentDate: "2024-10-05", deploymentLocations: ["Region C", "Region D"] },
    transfers: { totalTransfers: 2, yearsSinceLastTransfer: 2 },
    dutySchedule: { irregularShifts: 5, overtimeHours: 100, nightShifts: 18 },
    training: { coursesCompleted: 11, highIntensityTrainings: 4, upcomingTrainings: 0 },
    performanceMetrics: { lastReviewScore: 4, commendations: 3, incidents: 0 }
  },
  {
    personnelId: "P-010",
    leaveUsage: { frequency: 8, totalDays: 56, sickLeaveDays: 21, emergencyLeave: 2 },
    deployments: { totalDeployments: 2, totalDays: 180, lastDeploymentDate: "2024-04-12", deploymentLocations: ["Region A"] },
    transfers: { totalTransfers: 3, yearsSinceLastTransfer: 1 },
    dutySchedule: { irregularShifts: 7, overtimeHours: 180, nightShifts: 25 },
    training: { coursesCompleted: 7, highIntensityTrainings: 3, upcomingTrainings: 1 },
    performanceMetrics: { lastReviewScore: 3, commendations: 1, incidents: 2 }
  }
];