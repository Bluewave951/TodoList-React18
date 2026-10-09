import dayjs from 'dayjs'

export const DATE_FORMAT = 'YYYY-MM-DD'

export const today = () => dayjs().format(DATE_FORMAT)

export const quickDates = () => [
  { label: 'วันนี้', value: dayjs().format(DATE_FORMAT) },
  { label: 'พรุ่งนี้', value: dayjs().add(1, 'day').format(DATE_FORMAT) },
  { label: 'สัปดาห์หน้า', value: dayjs().add(7, 'day').format(DATE_FORMAT) },
]

export type DueTone = 'overdue' | 'today' | 'soon' | 'later'

export function relativeDue(dueDate: string): { text: string; tone: DueTone } {
  const diff = dayjs(dueDate).startOf('day').diff(dayjs().startOf('day'), 'day')
  if (diff < 0) return { text: `เลยกำหนด ${-diff} วัน`, tone: 'overdue' }
  if (diff === 0) return { text: 'วันนี้', tone: 'today' }
  if (diff === 1) return { text: 'พรุ่งนี้', tone: 'soon' }
  return { text: `เหลือ ${diff} วัน`, tone: diff <= 3 ? 'soon' : 'later' }
}

export function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'สวัสดีตอนเช้า ☀️'
  if (h < 17) return 'สวัสดีตอนบ่าย 🌤️'
  return 'สวัสดีตอนเย็น 🌙'
}
