import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import type { Priority } from '../types/todo'
import { PRIORITIES, PRIORITY_META } from '../utils/priority'

interface Props {
  value: Priority
  onChange: (value: Priority) => void
}

export function PrioritySelector({ value, onChange }: Props) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, v: Priority | null) => v && onChange(v)}
      aria-label="ความสำคัญ"
      sx={{ flexShrink: 0, '& .MuiToggleButton-root': { flex: { xs: 1, md: 'none' } } }}
    >
      {PRIORITIES.map((p) => {
        const { label, color } = PRIORITY_META[p]
        return (
          <Tooltip key={p} title={`ความสำคัญ: ${label}`}>
            <ToggleButton
              value={p}
              aria-label={`ความสำคัญ ${label}`}
              sx={{
                px: 1.5,
                gap: 0.75,
                '&::before': { content: '""', width: 10, height: 10, borderRadius: '50%', bgcolor: color },
                '&.Mui-selected, &.Mui-selected:hover': { bgcolor: `${color}22`, color, borderColor: color },
              }}
            >
              {label}
            </ToggleButton>
          </Tooltip>
        )
      })}
    </ToggleButtonGroup>
  )
}
