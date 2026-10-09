import { useCallback, useEffect, useState } from 'react'
import type { Priority, Todo, TodoUpdates } from '../types/todo'
import { today } from '../utils/date'

export const STORAGE_KEY = 'todolist-26'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Todo[]) : []
  } catch {
    return []
  }
}

/** Central todo state; called once from App.tsx (single source of truth). */
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      /* storage unavailable */
    }
  }, [todos])

  const addTodo = useCallback((title: string, priority: Priority = 'medium', dueDate = today()) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, priority, dueDate, completed: false, createdAt: Date.now() },
    ])
  }, [])

  const updateTodo = useCallback((id: string, updates: TodoUpdates) => {
    if (updates.title !== undefined && !updates.title.trim()) return
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, title: (updates.title ?? t.title).trim() } : t,
      ),
    )
  }, [])

  const removeTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }, [])

  const restoreTodo = useCallback((todo: Todo) => {
    setTodos((prev) => (prev.some((t) => t.id === todo.id) ? prev : [...prev, todo]))
  }, [])

  return { todos, addTodo, updateTodo, removeTodo, toggleTodo, restoreTodo }
}
