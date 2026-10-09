import { Container, CssBaseline, ThemeProvider, Typography, type PaletteMode } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { ChecklistPanel } from './components/ChecklistPanel'
import { ConfirmDeleteDialog } from './components/ConfirmDeleteDialog'
import { FeedbackSnackbar, type Feedback } from './components/FeedbackSnackbar'
import { FilterBar } from './components/FilterBar'
import { HeroHeader } from './components/HeroHeader'
import { NavTabs } from './components/NavTabs'
import { QuickAddBar } from './components/QuickAddBar'
import { TabPanel } from './components/TabPanel'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import { getTheme } from './theme'
import type { Filter, Priority, SortBy, TodoUpdates } from './types/todo'
import { PRIORITY_META } from './utils/priority'

const MODE_KEY = 'todolist-26-mode'

function loadMode(): PaletteMode {
  try {
    return localStorage.getItem(MODE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const EMPTY_TEXT: Record<Filter, string> = {
  all: 'ว่างแล้ว! เพิ่มงานแรกของคุณเลย 🎉',
  active: 'ไม่มีงานค้าง เยี่ยมมาก! ✨',
  completed: 'ยังไม่มีงานที่เสร็จ ลุยกันเลย 💪',
}

export default function App() {
  // Central state: every child reports changes back up through these callbacks.
  const { todos, addTodo, updateTodo, removeTodo, toggleTodo, restoreTodo } = useTodos()
  const [activeTab, setActiveTab] = useState(0)
  const [filter, setFilter] = useState<Filter>('all')
  const [sortBy, setSortBy] = useState<SortBy>('dueDate')
  const [mode, setMode] = useState<PaletteMode>(loadMode)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const pendingDelete = todos.find((t) => t.id === pendingDeleteId) ?? null

  const theme = useMemo(() => getTheme(mode), [mode])
  const notify = useCallback((f: Omit<Feedback, 'key'>) => setFeedback({ ...f, key: Date.now() }), [])

  const onAdd = useCallback(
    (title: string, priority: Priority, dueDate: string) => {
      addTodo(title, priority, dueDate)
      notify({ message: `เพิ่มงาน "${title.trim()}" แล้ว`, severity: 'success' })
    },
    [addTodo, notify],
  )

  const onToggle = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id)
      toggleTodo(id)
      if (todo && !todo.completed) notify({ message: `เยี่ยม! ทำ "${todo.title}" เสร็จแล้ว 🎉`, severity: 'success' })
    },
    [todos, toggleTodo, notify],
  )

  const onEdit = useCallback(
    (id: string, updates: TodoUpdates) => {
      updateTodo(id, updates)
      notify({ message: 'บันทึกการแก้ไขแล้ว', severity: 'info' })
    },
    [updateTodo, notify],
  )

  // Step 1: TodoItem asks to delete -> open the confirm dialog.
  const onDelete = useCallback((id: string) => setPendingDeleteId(id), [])

  // Step 2: user confirms in the dialog -> actually remove.
  const confirmDelete = useCallback(
    (id: string) => {
      const todo = todos.find((t) => t.id === id)
      setPendingDeleteId(null)
      if (!todo) return
      removeTodo(id)
      notify({ message: `ลบ "${todo.title}" แล้ว`, severity: 'warning', undo: () => restoreTodo(todo) })
    },
    [todos, removeTodo, restoreTodo, notify],
  )

  const onToggleMode = useCallback(() => {
    setMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(MODE_KEY, next)
      } catch {
        /* storage unavailable */
      }
      return next
    })
  }, [])

  const counts = useMemo(() => {
    const done = todos.filter((t) => t.completed).length
    return { all: todos.length, active: todos.length - done, completed: done }
  }, [todos])

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((t) =>
      filter === 'active' ? !t.completed : filter === 'completed' ? t.completed : true,
    )
    return [...filtered].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      if (sortBy === 'priority') {
        const diff = PRIORITY_META[b.priority].rank - PRIORITY_META[a.priority].rank
        if (diff) return diff
      }
      return a.dueDate.localeCompare(b.dueDate) || a.createdAt - b.createdAt
    })
  }, [todos, filter, sortBy])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HeroHeader done={counts.completed} total={counts.all} mode={mode} onToggleMode={onToggleMode} />

      <Container component="main" maxWidth="md" sx={{ pb: 6, px: { xs: 2, sm: 3 } }}>
        <NavTabs value={activeTab} activeCount={counts.active} onChange={setActiveTab} />

        <TabPanel index={0} value={activeTab}>
          <QuickAddBar onAdd={onAdd} />
          <FilterBar
            filter={filter}
            sortBy={sortBy}
            counts={counts}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
          />
          <TodoList
            todos={visibleTodos}
            emptyText={EMPTY_TEXT[filter]}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </TabPanel>

        <TabPanel index={1} value={activeTab}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Checklist 5 จุดตรวจสอบ
          </Typography>
          <ChecklistPanel />
        </TabPanel>
      </Container>

      <ConfirmDeleteDialog
        todo={pendingDelete}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={confirmDelete}
      />
      <FeedbackSnackbar feedback={feedback} onClose={() => setFeedback(null)} />
    </ThemeProvider>
  )
}
