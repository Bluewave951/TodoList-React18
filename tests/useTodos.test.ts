import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { STORAGE_KEY, useTodos } from '../src/hooks/useTodos'

describe('useTodos', () => {
  it('adds a todo and ignores empty titles', () => {
    const { result } = renderHook(() => useTodos())
    act(() => result.current.addTodo('  ซื้อนม  '))
    act(() => result.current.addTodo('   '))
    expect(result.current.todos).toHaveLength(1)
    expect(result.current.todos[0].title).toBe('ซื้อนม')
  })

  it('updates, toggles and removes a todo', () => {
    const { result } = renderHook(() => useTodos())
    act(() => result.current.addTodo('a'))
    const id = result.current.todos[0].id

    act(() => result.current.updateTodo(id, { title: 'b', priority: 'high' }))
    expect(result.current.todos[0].title).toBe('b')
    expect(result.current.todos[0].priority).toBe('high')

    act(() => result.current.updateTodo(id, { title: '   ' }))
    expect(result.current.todos[0].title).toBe('b')

    act(() => result.current.toggleTodo(id))
    expect(result.current.todos[0].completed).toBe(true)

    act(() => result.current.removeTodo(id))
    expect(result.current.todos).toHaveLength(0)
  })

  it('persists to and loads from localStorage', () => {
    const first = renderHook(() => useTodos())
    act(() => first.result.current.addTodo('เก็บไว้'))
    const second = renderHook(() => useTodos())
    expect(second.result.current.todos[0].title).toBe('เก็บไว้')
  })

  it('falls back to empty list on corrupted storage', () => {
    localStorage.setItem(STORAGE_KEY, '{bad json')
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
  })
})
