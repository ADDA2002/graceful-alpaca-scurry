/**
 * Privacy Management System for Personnel Data
 * Handles consent tracking, data anonymization, and privacy preferences
 */

export interface PrivacyConsent {
  id: string;
  personnelId: string;
  dataType: "hr" | "wellness" | "biometric" | "risk-assessment";
  purpose: "welfare-monitoring" | "performance-analysis" | "health-insights" | "research";
  granted: boolean;
  grantedAt: string;
  expiresAt: string;
  version: string;
}

export interface PrivacySettings {
  personnelId: string;
  dataSharing: boolean;
  analyticsEnabled: boolean;
  researchParticipation: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  dataRetentionDays: number;
  autoAnonymize: boolean;
  lastUpdated: string;
}

export interface AnonymizedData {
  personnelId: string;
  anonymizedId: string;
  anonymizedName: string;
  dataType: string;
  anonymizedData: any;
  exportDate: string;
  exportFormat: "json" | "csv" | "pdf";
}

export class PrivacyManager {
  private static readonly CONSENT_VERSION = "1.0";
  private static readonly DEFAULT_RETENTION_DAYS = 365;

  static createConsent(
    personnelId: string,
    dataType: PrivacyConsent["dataType"],
    purpose: PrivacyConsent["purpose"],
    granted: boolean
  ): PrivacyConsent {
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(now.getDate() + 365); // 1 year default

    return {
      id: `consent-${personnelId}-${dataType}-${Date.now()}`,
      personnelId,
      dataType,
      purpose,
      granted,
      grantedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      version: this.CONSENT_VERSION
    };
  }

  static updatePrivacySettings(
    personnelId: string,
    settings: Partial<PrivacySettings>
  ): PrivacySettings {
    const existing = this.getPrivacySettings(personnelId);
    return {
      ...existing,
      ...settings,
      lastUpdated: new Date().toISOString()
    };
  }

  static getPrivacySettings(personnelId: string): PrivacySettings {
    const key = `privacy-settings-${personnelId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }

    return {
      personnelId,
      dataSharing: true,
      analyticsEnabled: true,
      researchParticipation: false,
      notificationPreferences: {
        email: true,
        push: true,
        sms: false
      },
      dataRetentionDays: this.DEFAULT_RETENTION_DAYS,
      autoAnonymize: true,
      lastUpdated: new Date().toISOString()
    };
  }

  static savePrivacySettings(personnelId: string, settings: PrivacySettings): void {
    localStorage.setItem(`privacy-settings-${personnelId}`, JSON.stringify(settings));
  }

  static canAccessData(
    personnelId: string,
    dataType: PrivacyConsent["dataType"],
    purpose: PrivacyConsent["purpose"]
  ): boolean {
    const consents = this.getConsents(personnelId);
    const relevantConsent = consents.find(
      c => c.dataType === dataType && c.purpose === purpose
    );

    if (!relevantConsent) return false;
    if (!relevantConsent.granted) return false;
    if (new Date(relevantConsent.expiresAt) < new Date()) return false;

    return true;
  }

  static getConsents(personnelId: string): PrivacyConsent[] {
    const key = `consents-${personnelId}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }

    return [];
  }

  static saveConsent(personnelId: string, consent: PrivacyConsent): void {
    const consents = this.getConsents(personnelId);
    const updated = [...consents, consent];
    localStorage.setItem(`consents-${personnelId}`, JSON.stringify(updated));
  }

  static anonymizePersonnelData(
    personnelId: string,
    data: any,
    dataType: string
  ): AnonymizedData {
    const anonymizedId = `anon-${Math.random().toString(36).substr(2, 9)}`;
    const anonymizedName = `User-${Math.random().toString(36).substr(2, 5)}`;

    return {
      personnelId,
      anonymizedId,
      anonymizedName,
      dataType,
      anonymizedData: data,
      exportDate: new Date().toISOString(),
      exportFormat: "json"
    };
  }

  static exportData(
    personnelId: string,
    dataType: string,
    format: "json" | "csv" | "pdf" = "json"
  ): string {
    const key = `data-${personnelId}-${dataType}`;
    const stored = localStorage.getItem(key);
    
    if (!stored) {
      throw new Error(`No data found for ${dataType}`);
    }

    const data = JSON.parse(stored);

    switch (format) {
      case "json":
        return JSON.stringify(data, null, 2);
      case "csv":
        return this.convertToCSV(data);
      case "pdf":
        return this.generatePDF(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  private static convertToCSV(data: any): string {
    if (!Array.isArray(data) || data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === "string" && value.includes(",") 
          ? `"${value}"` 
          : value;
      });
      csvRows.push(values.join(","));
    }

    return csvRows.join("\n");
  }

  static generatePDF(data: any): string {
    // In a real implementation, this would generate a PDF
    // For now, return a JSON representation
    return JSON.stringify(data, null, 2);
  }

  static deleteAllData(personnelId: string): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(personnelId) || key.includes(personnelId)) {
        localStorage.removeItem(key);
      }
    });
  }

  static getDataRetentionExpiry(personnelId: string): Date {
    const settings = this.getPrivacySettings(personnelId);
    const date = new Date();
    date.setDate(date.getDate() + settings.dataRetentionDays);
    return date;
  }

  static isDataExpired(personnelId: string): boolean {
    const expiry = this.getDataRetentionExpiry(personnelId);
    return new Date() > expiry;
  }

  static cleanupExpiredData(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith("data-")) {
        const [_, personnelId, dataType] = key.split("-");
        if (this.isDataExpired(personnelId)) {
          localStorage.removeItem(key);
        }
      }
    });
  }
}