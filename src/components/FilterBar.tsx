import { Chip, MenuItem, Stack, TextField } from '@mui/material'
import type { Filter, SortBy } from '../types/todo'

interface Props {
  filter: Filter
  sortBy: SortBy
  counts: Record<Filter, number>
  onFilterChange: (f: Filter) => void
  onSortChange: (s: SortBy) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'active', label: 'ยังไม่เสร็จ' },
  { value: 'completed', label: 'เสร็จแล้ว' },
]

export function FilterBar({ filter, sortBy, counts, onFilterChange, onSortChange }: Props) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between', my: 3 }}
    >
      <Stack direction="row" spacing={1} role="group" aria-label="กรองงาน" sx={{ flexWrap: 'wrap', rowGap: 1 }}>
        {FILTERS.map((f) => (
          <Chip
            key={f.value}
            label={`${f.label} (${counts[f.value]})`}
            clickable
            color={filter === f.value ? 'primary' : 'default'}
            variant={filter === f.value ? 'filled' : 'outlined'}
            onClick={() => onFilterChange(f.value)}
            aria-pressed={filter === f.value}
          />
        ))}
      </Stack>
      <TextField
        select
        size="small"
        label="เรียงตาม"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortBy)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="dueDate">วันครบกำหนด</MenuItem>
        <MenuItem value="priority">ความสำคัญ</MenuItem>
      </TextField>
    </Stack>
  )
}
