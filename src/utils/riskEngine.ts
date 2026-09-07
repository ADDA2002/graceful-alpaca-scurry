import { HRIndicator } from "@/data/mockHRData";
import { WellnessResponse } from "@/data/mockWellnessData";
import { BiometricData } from "@/data/mockBiometricData";

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export interface RiskFactor {
  factor: string;
  category: "workload" | "deployment" | "personal" | "operational" | "health";
  severity: "low" | "medium" | "high";
  score: number; // Contribution to total risk score
  description: string;
}

export interface RiskAssessment {
  personnelId: string;
  overallScore: number; // 0-100
  riskLevel: RiskLevel;
  factors: RiskFactor[];
  recommendation: string;
  confidence: number; // 0-100
  lastUpdated: string;
  explanation: string; // AI explainability - why this score was assigned
}

export class PredictiveRiskEngine {
  /**
   * Calculate comprehensive risk assessment based on HR indicators, wellness data, and biometric data
   */
  static calculateRisk(
    hrData: HRIndicator,
    wellnessData: WellnessResponse[],
    biometricData?: BiometricData
  ): RiskAssessment {
    const factors: RiskFactor[] = [];
    let totalScore = 0;
    let maxPossibleScore = 0;

    // Workload factors (max 25)
    const workloadScore = this.assessWorkload(hrData);
    if (workloadScore.contribution > 0) {
      factors.push(workloadScore);
      totalScore += workloadScore.score;
      maxPossibleScore += 25;
    }

    // Deployment factors (max 30)
    const deploymentScore = this.assessDeployment(hrData);
    if (deploymentScore.contribution > 0) {
      factors.push(deploymentScore);
      totalScore += deploymentScore.score;
      maxPossibleScore += 30;
    }

    // Transfer and stability factors (max 20)
    const stabilityScore = this.assessStability(hrData);
    if (stabilityScore.contribution > 0) {
      factors.push(stabilityScore);
      totalScore += stabilityScore.score;
      maxPossibleScore += 20;
    }

    // Wellness indicators (max 25)
    const wellnessScore = this.assessWellness(wellnessData);
    if (wellnessScore.contribution > 0) {
      factors.push(wellnessScore);
      totalScore += wellnessScore.score;
      maxPossibleScore += 25;
    }

    // Biometric factors (max 20) - optional
    if (biometricData) {
      const biometricScore = this.assessBiometrics(biometricData);
      if (biometricScore.contribution > 0) {
        factors.push(biometricScore);
        totalScore += biometricScore.score;
        maxPossibleScore += 20;
      }
    }

    // Normalize score to 0-100
    const normalizedScore = maxPossibleScore > 0
      ? Math.min(100, (totalScore / maxPossibleScore) * 100)
      : 0;

    const riskLevel = this.determineRiskLevel(normalizedScore);
    const confidence = this.calculateConfidence(hrData, wellnessData, biometricData);
    const recommendation = this.generateRecommendation(riskLevel, factors);
    const explanation = this.generateExplanation(riskLevel, factors, normalizedScore);

    return {
      personnelId: hrData.personnelId,
      overallScore: Math.round(normalizedScore),
      riskLevel,
      factors: factors.sort((a, b) => b.score - a.score),
      recommendation,
      confidence,
      lastUpdated: new Date().toISOString().split('T')[0],
      explanation
    };
  }

  private static assessWorkload(hrData: HRIndicator): RiskFactor & { contribution: number } {
    let score = 0;
    const reasons: string[] = [];

    // High overtime
    if (hrData.dutySchedule.overtimeHours > 200) {
      score += 15;
      reasons.push("excessive overtime hours");
    } else if (hrData.dutySchedule.overtimeHours > 100) {
      score += 8;
      reasons.push("elevated overtime hours");
    }

    // Irregular shifts
    if (hrData.dutySchedule.irregularShifts > 8) {
      score += 10;
      reasons.push("frequent irregular shifts");
    } else if (hrData.dutySchedule.irregularShifts > 4) {
      score += 5;
      reasons.push("moderate irregular shifts");
    }

    // High training load
    if (hrData.training.highIntensityTrainings > 6) {
      score += 8;
      reasons.push("high-intensity training load");
    }

    if (score === 0) {
      return {
        factor: "Workload",
        category: "workload",
        severity: "low",
        score: 0,
        contribution: 0,
        description: "Workload is within normal parameters"
      };
    }

    return {
      factor: "High Workload",
      category: "workload",
      severity: score > 15 ? "high" : "medium",
      score,
      contribution: score,
      description: `Elevated workload indicators: ${reasons.join(", ")}`
    };
  }

  private static assessDeployment(hrData: HRIndicator): RiskFactor & { contribution: number } {
    let score = 0;
    const reasons: string[] = [];

    // Long cumulative deployment
    if (hrData.deployments.totalDays > 700) {
      score += 20;
      reasons.push("extensive cumulative deployment time");
    } else if (hrData.deployments.totalDays > 365) {
      score += 12;
      reasons.push("significant cumulative deployment time");
    }

    // Multiple deployments
    if (hrData.deployments.totalDeployments > 5) {
      score += 10;
      reasons.push("frequent deployment rotations");
    } else if (hrData.deployments.totalDeployments > 3) {
      score += 6;
      reasons.push("multiple deployments");
    }

    // Recent deployment
    if (hrData.deployments.lastDeploymentDate) {
      const lastDate = new Date(hrData.deployments.lastDeploymentDate);
      const monthsAgo = (Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsAgo < 3) {
        score += 5;
        reasons.push("recent deployment");
      }
    }

    if (score === 0) {
      return {
        factor: "Deployment",
        category: "deployment",
        severity: "low",
        score: 0,
        contribution: 0,
        description: "Deployment history within normal range"
      };
    }

    return {
      factor: "Deployment Impact",
      category: "deployment",
      severity: score > 15 ? "high" : "medium",
      score,
      contribution: score,
      description: `Deployment-related stress factors: ${reasons.join(", ")}`
    };
  }

  private static assessStability(hrData: HRIndicator): RiskFactor & { contribution: number } {
    let score = 0;
    const reasons: string[] = [];

    // Frequent transfers
    if (hrData.transfers.totalTransfers > 4) {
      score += 12;
      reasons.push("multiple recent transfers");
    } else if (hrData.transfers.totalTransfers > 2) {
      score += 6;
      reasons.push("several transfers");
    }

    // Recent transfer
    if (hrData.transfers.yearsSinceLastTransfer < 2) {
      score += 8;
      reasons.push("recent transfer");
    }

    // High sick leave
    if (hrData.leaveUsage.sickLeaveDays > 14) {
      score += 10;
      reasons.push("elevated sick leave usage");
    } else if (hrData.leaveUsage.sickLeaveDays > 7) {
      score += 5;
      reasons.push("moderate sick leave usage");
    }

    if (score === 0) {
      return {
        factor: "Stability",
        category: "personal",
        severity: "low",
        score: 0,
        contribution: 0,
        description: "Personal and professional stability is good"
      };
    }

    return {
      factor: "Stability Concerns",
      category: "personal",
      severity: score > 12 ? "high" : "medium",
      score,
      contribution: score,
      description: `Stability indicators: ${reasons.join(", ")}`
    };
  }

  private static assessWellness(wellnessData: WellnessResponse[]): RiskFactor & { contribution: number } {
    if (wellnessData.length === 0) {
      return {
        factor: "Wellness",
        category: "health",
        severity: "low",
        score: 0,
        contribution: 0,
        description: "No recent wellness data available"
      };
    }

    const latest = wellnessData.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];

    let score = 0;
    const reasons: string[] = [];

    // High stress level
    if (latest.stressLevel >= 5) {
      score += 15;
      reasons.push("very high self-reported stress");
    } else if (latest.stressLevel >= 4) {
      score += 8;
      reasons.push("elevated stress levels");
    }

    // Poor sleep
    if (latest.sleepQuality <= 2) {
      score += 8;
      reasons.push("poor sleep quality");
    }

    // Poor work-life balance
    if (latest.workLifeBalance <= 2) {
      score += 7;
      reasons.push("poor work-life balance");
    }

    // Low energy
    if (latest.energyLevel <= 2) {
      score += 5;
      reasons.push("low energy levels");
    }

    // Multiple physical symptoms
    if (latest.physicalSymptoms.length >= 4) {
      score += 10;
      reasons.push("multiple physical symptoms");
    } else if (latest.physicalSymptoms.length >= 2) {
      score += 5;
      reasons.push("several physical symptoms");
    }

    if (score === 0) {
      return {
        factor: "Wellness",
        category: "health",
        severity: "low",
        score: 0,
        contribution: 0,
        description: "Wellness indicators are positive"
      };
    }

    return {
      factor: "Wellness Concerns",
      category: "health",
      severity: score > 15 ? "high" : "medium",
      score,
      contribution: score,
      description: `Wellness indicators show: ${reasons.join(", ")}`
    };
  }

  private static assessBiometrics(biometricData: BiometricData): RiskFactor & { contribution: number } {
    let score = 0;
    const reasons: string[] = [];

    // Elevated resting heart rate
    if (biometricData.heartRate.resting > 90) {
      score += 10;
      reasons.push("elevated resting heart rate");
    } else if (biometricData.heartRate.resting > 80) {
      score += 5;
      reasons.push("moderately elevated resting heart rate");
    }

    // Low heart rate variability (stress indicator)
    if (biometricData.heartRate.variability < 30) {
      score += 8;
      reasons.push("low heart rate variability");
    } else if (biometricData.heartRate.variability < 40) {
      score += 4;
      reasons.push("reduced heart rate variability");
    }

    // Poor sleep
    if (biometricData.sleep.hoursPerNight < 5) {
      score += 10;
      reasons.push("severe sleep deprivation");
    } else if (biometricData.sleep.hoursPerNight < 6) {
      score += 6;
      reasons.push("insufficient sleep");
    }

    if (biometricData.sleep.quality === "poor") {
      score += 5;
      reasons.push("poor sleep quality");
    }

    // Low physical activity
    if (biometricData.physicalActivity.stepsPerDay < 3000) {
      score += 5;
      reasons.push("very low physical activity");
    } else if (biometricData.physicalActivity.stepsPerDay < 5000) {
      score += 3;
      reasons.push("low physical activity");
    }

    // Elevated stress markers
    if (biometricData.stressMarkers.cortisolLevel === "high") {
      score += 10;
      reasons.push("high cortisol levels");
    } else if (biometricData.stressMarkers.cortisolLevel === "elevated") {
      score += 6;
      reasons.push("elevated cortisol levels");
    }

    if (biometricData.stressMarkers.skinConductance > 20) {
      score += 5;
      reasons.push("elevated skin conductance");
    }

    if (score === 0) {
      return {
        factor: "Biometrics",
        category: "health",
        severity: "low",
        score: 0,
        contribution: 0,
        description: "Biometric indicators are within normal range"
      };
    }

    return {
      factor: "Biometric Stress Indicators",
      category: "health",
      severity: score > 15 ? "high" : "medium",
      score,
      contribution: score,
      description: `Biometric indicators show: ${reasons.join(", ")}`
    };
  }

  private static determineRiskLevel(score: number): RiskLevel {
    if (score >= 75) return "critical";
    if (score >= 55) return "high";
    if (score >= 30) return "moderate";
    return "low";
  }

  private static calculateConfidence(
    hrData: HRIndicator,
    wellnessData: WellnessResponse[],
    biometricData?: BiometricData
  ): number {
    let confidence = 60; // Base confidence

    // More wellness data increases confidence
    if (wellnessData.length > 0) confidence += 15;
    if (wellnessData.length > 2) confidence += 10;

    // Complete HR data increases confidence
    if (hrData.deployments.totalDays > 0) confidence += 5;
    if (hrData.dutySchedule.overtimeHours > 0) confidence += 5;
    if (hrData.training.coursesCompleted > 0) confidence += 5;

    // Biometric data increases confidence
    if (biometricData) confidence += 10;

    return Math.min(95, confidence);
  }

  private static generateRecommendation(riskLevel: RiskLevel, factors: RiskFactor[]): string {
    const recommendations: Record<RiskLevel, string> = {
      low: "Continue current support measures. Regular wellness check-ins recommended.",
      moderate: "Increase monitoring frequency. Consider workload review and stress management resources.",
      high: "Immediate welfare officer intervention recommended. Provide counseling resources and assess workload adjustments.",
      critical: "URGENT: Immediate intervention required. Assign dedicated welfare support, consider medical evaluation, and implement workload reduction."
    };

    return recommendations[riskLevel];
  }

  private static generateExplanation(riskLevel: RiskLevel, factors: RiskFactor[], score: number): string {
    const activeFactors = factors.filter(f => f.score > 0);
    const factorDescriptions = activeFactors.map(f => `${f.factor} (${f.severity})`).join(", ");

    return `Risk score of ${Math.round(score)}/100 (${riskLevel.toUpperCase()}) was calculated based on ${activeFactors.length} contributing factors: ${factorDescriptions || "none significant"}. The AI model weighted workload, deployment history, stability indicators, wellness self-reports, and biometric data to arrive at this assessment.`;
  }
}
