import { RiskLevel } from "./riskEngine";

export interface Intervention {
  id: string;
  type: "counseling" | "workload" | "medical" | "peer-support" | "training" | "leave";
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  timeline: string;
  responsibleParty: string;
}

export interface Recommendation {
  personnelId: string;
  interventions: Intervention[];
  supportResources: string[];
  followUpRequired: boolean;
  followUpTimeline: string;
}

export class InterventionEngine {
  static generateRecommendations(
    riskLevel: RiskLevel,
    factors: Array<{ factor: string; category: string }>
  ): Recommendation {
    const interventions: Intervention[] = [];
    const supportResources: string[] = [];

    // Base interventions for all risk levels
    supportResources.push("Employee Assistance Program (EAP)");
    supportResources.push("Peer Support Network");

    // Risk-level specific interventions
    switch (riskLevel) {
      case "critical":
        interventions.push({
          id: "INT-001",
          type: "medical",
          title: "Immediate Medical Evaluation",
          description: "Schedule urgent medical assessment to evaluate stress-related health impacts",
          priority: "urgent",
          timeline: "Within 24-48 hours",
          responsibleParty: "Medical Officer"
        });
        interventions.push({
          id: "INT-002",
          type: "counseling",
          title: "Intensive Counseling Sessions",
          description: "Weekly counseling sessions with licensed psychologist",
          priority: "urgent",
          timeline: "Start within 1 week",
          responsibleParty: "Welfare Officer"
        });
        interventions.push({
          id: "INT-003",
          type: "workload",
          title: "Immediate Workload Reduction",
          description: "Reduce operational duties and redistribute workload",
          priority: "urgent",
          timeline: "Immediate",
          responsibleParty: "Commander"
        });
        interventions.push({
          id: "INT-004",
          type: "leave",
          title: "Medical Leave Consideration",
          description: "Evaluate eligibility for medical leave",
          priority: "high",
          timeline: "Within 1 week",
          responsibleParty: "Welfare Officer"
        });
        break;

      case "high":
        interventions.push({
          id: "INT-005",
          type: "counseling",
          title: "Structured Counseling Program",
          description: "Bi-weekly counseling sessions with stress management focus",
          priority: "high",
          timeline: "Start within 2 weeks",
          responsibleParty: "Welfare Officer"
        });
        interventions.push({
          id: "INT-006",
          type: "workload",
          title: "Workload Assessment",
          description: "Review and adjust workload distribution",
          priority: "high",
          timeline: "Within 1 week",
          responsibleParty: "Commander"
        });
        interventions.push({
          id: "INT-007",
          type: "peer-support",
          title: "Peer Support Assignment",
          description: "Assign experienced peer supporter for regular check-ins",
          priority: "medium",
          timeline: "Within 2 weeks",
          responsibleParty: "Welfare Officer"
        });
        break;

      case "moderate":
        interventions.push({
          id: "INT-008",
          type: "counseling",
          title: "Stress Management Workshop",
          description: "Enroll in stress management and resilience training",
          priority: "medium",
          timeline: "Within 1 month",
          responsibleParty: "Welfare Officer"
        });
        interventions.push({
          id: "INT-009",
          type: "training",
          title: "Time Management Training",
          description: "Provide training on work-life balance techniques",
          priority: "medium",
          timeline: "Within 1 month",
          responsibleParty: "Training Officer"
        });
        break;

      case "low":
        interventions.push({
          id: "INT-010",
          type: "training",
          title: "Wellness Maintenance Program",
          description: "Continue wellness activities and regular check-ins",
          priority: "low",
          timeline: "Ongoing",
          responsibleParty: "Personnel"
        });
        break;
    }

    // Category-specific interventions
    const categories = factors.map(f => f.category);
    
    if (categories.includes("workload") && !interventions.find(i => i.type === "workload")) {
      interventions.push({
        id: "INT-011",
        type: "workload",
        title: "Workload Review",
        description: "Review current workload and identify adjustment opportunities",
        priority: "medium",
        timeline: "Within 2 weeks",
        responsibleParty: "Commander"
      });
    }

    if (categories.includes("deployment") && !interventions.find(i => i.type === "leave")) {
      interventions.push({
        id: "INT-012",
        type: "leave",
        title: "Recovery Leave",
        description: "Consider scheduled leave for recovery and decompression",
        priority: "medium",
        timeline: "Within 1 month",
        responsibleParty: "Commander"
      });
    }

    if (categories.includes("health") && !interventions.find(i => i.type === "medical")) {
      interventions.push({
        id: "INT-013",
        type: "medical",
        title: "Health Check-up",
        description: "Schedule routine health check-up",
        priority: "low",
        timeline: "Within 1 month",
        responsibleParty: "Medical Officer"
      });
    }

    return {
      personnelId: "",
      interventions: interventions.sort((a, b) => {
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }),
      supportResources,
      followUpRequired: riskLevel === "critical" || riskLevel === "high",
      followUpTimeline: riskLevel === "critical" ? "48 hours" : riskLevel === "high" ? "1 week" : "2 weeks"
    };
  }
}