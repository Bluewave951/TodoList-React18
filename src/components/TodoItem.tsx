import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded'
import EditRounded from '@mui/icons-material/EditRounded'
import EventRounded from '@mui/icons-material/EventRounded'
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded'
import SaveRounded from '@mui/icons-material/SaveRounded'
import { Box, Button, Checkbox, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { memo, useState, type KeyboardEvent } from 'react'
import type { Priority, TodoUpdates } from '../types/todo'
import { relativeDue, type DueTone } from '../utils/date'
import { PRIORITY_META } from '../utils/priority'
import { PrioritySelector } from './PrioritySelector'

export interface TodoItemProps {
  id: string
  title: string
  priority: Priority
  dueDate: string
  completed: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updates: TodoUpdates) => void
}

const todoItemPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
  dueDate: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

const TONE_COLOR: Record<DueTone, string> = {
  overdue: 'error.main',
  today: 'warning.main',
  soon: 'secondary.main',
  later: 'text.secondary',
}

function TodoItemBase(props: TodoItemProps) {
  // React 19 no longer reads `propTypes` itself, so run the check explicitly (dev only, deduped by prop-types).
  if (import.meta.env.DEV) PropTypes.checkPropTypes(todoItemPropTypes, props, 'prop', 'TodoItem')

  const { id, title, priority, dueDate, completed, onToggle, onDelete, onEdit } = props
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({ title, priority, dueDate })
  const [touched, setTouched] = useState(false)
  const meta = PRIORITY_META[priority]
  const due = relativeDue(dueDate)
  const draftError = touched && !draft.title.trim()

  const startEdit = () => {
    setDraft({ title, priority, dueDate })
    setTouched(false)
    setIsEditing(true)
  }
  const cancelEdit = () => {
    setDraft({ title, priority, dueDate })
    setIsEditing(false)
  }
  const saveEdit = () => {
    setTouched(true)
    if (!draft.title.trim()) return
    onEdit(id, draft)
    setIsEditing(false)
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <Paper
      component="li"
      sx={{
        listStyle: 'none',
        position: 'relative',
        overflow: 'hidden',
        pl: { xs: 2, sm: 2.5 },
        pr: { xs: 1, sm: 1.5 },
        py: 1.5,
        borderLeft: `5px solid ${meta.color}`,
        opacity: completed && !isEditing ? 0.6 : 1,
        transition: 'transform .18s, box-shadow .18s, opacity .25s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 28px rgba(79,70,229,0.16)' },
        '&:hover .item-actions, &:focus-within .item-actions': { opacity: 1 },
      }}
    >
      {isEditing ? (
        <Stack spacing={1.5} onKeyDown={handleKeyDown}>
          <TextField
            autoFocus
            fullWidth
            size="small"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            error={draftError}
            helperText={draftError ? 'ชื่องานต้องไม่ว่าง' : 'Enter = บันทึก · Esc = ยกเลิก'}
            slotProps={{ htmlInput: { 'aria-label': 'แก้ไขชื่องาน', maxLength: 120 } }}
          />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}>
            <PrioritySelector value={draft.priority} onChange={(p) => setDraft((d) => ({ ...d, priority: p }))} />
            <TextField
              type="date"
              size="small"
              value={draft.dueDate}
              onChange={(e) => setDraft((d) => ({ ...d, dueDate: e.target.value }))}
              slotProps={{ htmlInput: { 'aria-label': 'แก้ไขวันครบกำหนด' } }}
            />
            <Stack direction="row" spacing={1} sx={{ ml: { sm: 'auto !important' } }}>
              <Tooltip title="ยกเลิกการแก้ไข">
                <Button onClick={cancelEdit} startIcon={<CloseRounded />} aria-label="ยกเลิกการแก้ไข" sx={{ flex: { xs: 1, sm: 'none' } }}>
                  ยกเลิก
                </Button>
              </Tooltip>
              <Tooltip title="บันทึกการแก้ไข">
                <Button
                  variant="contained"
                  onClick={saveEdit}
                  startIcon={<SaveRounded />}
                  aria-label="บันทึกการแก้ไข"
                  sx={{ flex: { xs: 1, sm: 'none' } }}
                >
                  บันทึก
                </Button>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title={completed ? 'ทำเครื่องหมายว่ายังไม่เสร็จ' : 'ทำเครื่องหมายว่าเสร็จแล้ว'}>
            <Checkbox
              checked={completed}
              onChange={() => onToggle(id)}
              icon={<RadioButtonUncheckedRounded />}
              checkedIcon={<CheckCircleRounded />}
              color="success"
              slotProps={{ input: { 'aria-label': `${completed ? 'ยกเลิกเสร็จ' : 'ทำเสร็จ'}: ${title}` } }}
            />
          </Tooltip>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                wordBreak: 'break-word',
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'text.secondary' : 'text.primary',
              }}
            >
              {title}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mt: 0.25, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: meta.color, fontWeight: 700 }}>
                ● {meta.label}
              </Typography>
              <Tooltip title={`ครบกำหนด ${dueDate}`}>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: completed ? 'success.main' : TONE_COLOR[due.tone],
                    fontWeight: due.tone === 'overdue' && !completed ? 700 : 400,
                  }}
                >
                  <EventRounded sx={{ fontSize: 14 }} aria-hidden />
                  {completed ? 'เสร็จเรียบร้อย 🎉' : due.text}
                </Typography>
              </Tooltip>
            </Stack>
          </Box>

          <Stack
            direction="row"
            className="item-actions"
            sx={{ flexShrink: 0, opacity: { xs: 1, md: 0.35 }, transition: 'opacity .2s' }}
          >
            <Tooltip title="แก้ไขงาน">
              <IconButton onClick={startEdit} aria-label={`แก้ไขงาน ${title}`} color="primary">
                <EditRounded fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="ลบงาน">
              <IconButton onClick={() => onDelete(id)} aria-label={`ลบงาน ${title}`} color="error">
                <DeleteOutlineRounded fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      )}
    </Paper>
  )
}

TodoItemBase.propTypes = todoItemPropTypes

export const TodoItem = memo(TodoItemBase)
