/**
 * Utility functions for data anonymization and privacy
 */

export const anonymizeId = (id: string): string => {
  // Create anonymized version of personnel ID
  const parts = id.split('-');
  if (parts.length === 2) {
    return `P-XXX-${parts[1]}`;
  }
  return 'P-XXX-XXX';
};

export const anonymizeName = (name: string): string => {
  // Show only first name and last initial
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }
  return parts[0];
};

export const maskSensitiveData = (data: string, visibleChars: number = 4): string => {
  if (data.length <= visibleChars) return data;
  const masked = '*'.repeat(data.length - visibleChars);
  return data.substring(0, visibleChars) + masked;
};

export const generateDisplayId = (index: number): string => {
  return `P-${String(index + 1).padStart(3, '0')}`;
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const calculateDaysAgo = (dateString: string): number => {
  if (!dateString) return 0;
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};