import AddRounded from '@mui/icons-material/AddRounded'
import { Button, Chip, InputAdornment, Paper, Stack, TextField, Tooltip } from '@mui/material'
import { useState, type FormEvent } from 'react'
import type { Priority } from '../types/todo'
import { quickDates, today } from '../utils/date'
import { PrioritySelector } from './PrioritySelector'

interface Props {
  onAdd: (title: string, priority: Priority, dueDate: string) => void
}

export function QuickAddBar({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState(today())
  const [touched, setTouched] = useState(false)
  const error = touched && !title.trim()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!title.trim()) return
    onAdd(title, priority, dueDate)
    setTitle('')
    setTouched(false)
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} noValidate sx={{ p: { xs: 2, sm: 2.5 } }}>
      <TextField
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="วันนี้จะทำอะไรดี? (กด Enter เพื่อเพิ่ม)"
        error={error}
        helperText={error ? 'กรุณากรอกชื่องาน' : ' '}
        slotProps={{
          htmlInput: { 'aria-label': 'ชื่องานใหม่', maxLength: 120 },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AddRounded color="primary" />
              </InputAdornment>
            ),
            sx: { fontSize: 17, borderRadius: 3 },
          },
        }}
      />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 1.5, md: 2 }} sx={{ alignItems: { xs: 'stretch', md: 'center' } }}
      >
        <PrioritySelector value={priority} onChange={setPriority} />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1, minWidth: 0 }}>
          <TextField
            type="date"
            size="small"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            slotProps={{ htmlInput: { 'aria-label': 'วันครบกำหนด' } }}
            sx={{ width: 160 }}
          />
          {quickDates().map((q) => (
            <Chip
              key={q.label}
              label={q.label}
              size="small"
              clickable
              color={dueDate === q.value ? 'primary' : 'default'}
              variant={dueDate === q.value ? 'filled' : 'outlined'}
              onClick={() => setDueDate(q.value)}
              aria-label={`กำหนดส่ง${q.label}`}
            />
          ))}
        </Stack>
        <Tooltip title="เพิ่มงานลงรายการ">
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddRounded />}
            aria-label="เพิ่มงาน"
            sx={{ ml: { md: 'auto !important' }, borderRadius: 999, px: 3, flexShrink: 0 }}
          >
            เพิ่มงาน
          </Button>
        </Tooltip>
      </Stack>
    </Paper>
  )
}
