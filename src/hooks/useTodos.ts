import { useEffect, useState } from 'react'
import type { Todo } from '../types/todo'

export const STORAGE_KEY = 'todos'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Todo[]) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, completed: false, createdAt: Date.now() },
    ])
  }

  const updateTodo = (id: string, title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t)))
  }

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  return { todos, addTodo, updateTodo, removeTodo, toggleTodo }
}
