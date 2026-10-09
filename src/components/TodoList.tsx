import InboxRounded from '@mui/icons-material/InboxRounded'
import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Todo, TodoUpdates } from '../types/todo'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
  emptyText: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, updates: TodoUpdates) => void
}

export function TodoList({ todos, emptyText, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return (
      <Paper sx={{ py: 6, px: 2, textAlign: 'center' }}>
        <InboxRounded sx={{ fontSize: 64, color: 'primary.light', opacity: 0.6 }} aria-hidden />
        <Typography sx={{ mt: 1, color: 'text.secondary' }}>{emptyText}</Typography>
      </Paper>
    )
  }

  return (
    <Box component="ul" aria-label="รายการงาน" sx={{ p: 0, m: 0 }}>
      <Stack spacing={1.5}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            priority={todo.priority}
            dueDate={todo.dueDate}
            completed={todo.completed}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </Stack>
    </Box>
  )
}
