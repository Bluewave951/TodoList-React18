import type { Priority } from '../types/todo'

export const PRIORITIES: Priority[] = ['low', 'medium', 'high']

export const PRIORITY_META: Record<Priority, { label: string; color: string; rank: number }> = {
  low: { label: 'ปกติ', color: '#10B981', rank: 0 },
  medium: { label: 'ปานกลาง', color: '#F59E0B', rank: 1 },
  high: { label: 'ด่วน', color: '#EF4444', rank: 2 },
}
