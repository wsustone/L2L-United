// CRM Dropdown Constants - Must match database enums exactly

export const PROJECT_STATUSES = [
  'Discovery Phase',
  'Drawings Received',
  'Priced',
  'Internal Review',
  'Proposal Sent',
  'Client Review',
  'Contracted',
  'PO Issued',
  'A&E',
  'In Production',
  'Shipped',
  'Onsite',
  'Installation',
  'Complete',
] as const;

export const PROJECT_IMPORTANCE = [
  'Contracted',
  'High',
  'Medium',
  'Low',
] as const;

export const PROJECT_TIMELINE = [
  'Discovery Phase',
  '30 Days Out',
  '3 Months Out',
  '6 Months Out',
  '1 Year Out',
  '1 Year +',
] as const;

export const PROJECT_TYPES = [
  'Single Family',
  'Multi Family',
  'Industrial',
  'Modular',
  'Mutli-Story',
  'Commercial',
  'Military',
] as const;

export const PROJECT_SCOPES = [
  'TBD',
  'A&E Only',
  'Panel Supply',
  'Panel Installation',
  'Fit Out & Finish',
  'A&E & Panel Supply',
  'A&E & Panel Sup+Ins.',
  'A&E, Panel S+I, & F/F',
] as const;

export const ACTIVITY_TYPES = [
  'call',
  'email',
  'meeting',
  'sms',
  'note',
  'status_change',
  'task_completed',
  'document_uploaded',
] as const;

export const TASK_STATUSES = [
  'open',
  'done',
  'snoozed',
] as const;

// Status colors for badges and kanban columns
export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Discovery Phase': { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500' },
  'Drawings Received': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500' },
  'Priced': { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500' },
  'Internal Review': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500' },
  'Proposal Sent': { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500' },
  'Client Review': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500' },
  'Contracted': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
  'PO Issued': { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500' },
  'A&E': { bg: 'bg-teal-500/20', text: 'text-teal-400', border: 'border-teal-500' },
  'In Production': { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500' },
  'Shipped': { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500' },
  'Onsite': { bg: 'bg-lime-500/20', text: 'text-lime-400', border: 'border-lime-500' },
  'Installation': { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500' },
  'Complete': { bg: 'bg-green-600/20', text: 'text-green-300', border: 'border-green-600' },
};

export const IMPORTANCE_COLORS: Record<string, { bg: string; text: string }> = {
  'Contracted': { bg: 'bg-green-500/20', text: 'text-green-400' },
  'High': { bg: 'bg-red-500/20', text: 'text-red-400' },
  'Medium': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
  'Low': { bg: 'bg-blue-500/20', text: 'text-blue-400' },
};

export const ACTIVITY_ICONS: Record<string, string> = {
  'call': '📞',
  'email': '📧',
  'meeting': '🤝',
  'sms': '💬',
  'note': '📝',
  'status_change': '🔄',
  'task_completed': '✅',
  'document_uploaded': '📎',
};

export type ProjectStatus = typeof PROJECT_STATUSES[number];
export type ProjectImportance = typeof PROJECT_IMPORTANCE[number];
export type ProjectTimeline = typeof PROJECT_TIMELINE[number];
export type ProjectType = typeof PROJECT_TYPES[number];
export type ProjectScope = typeof PROJECT_SCOPES[number];
export type ActivityType = typeof ACTIVITY_TYPES[number];
export type TaskStatus = typeof TASK_STATUSES[number];
