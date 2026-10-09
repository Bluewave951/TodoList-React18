import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TodoItem, type TodoItemProps } from '../src/components/TodoItem'

const setup = (overrides: Partial<TodoItemProps> = {}) => {
  const props: TodoItemProps = {
    id: '1',
    title: 'อ่านหนังสือ',
    priority: 'high',
    dueDate: '2026-10-10',
    completed: false,
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
    ...overrides,
  }
  render(<TodoItem {...props} />)
  return props
}

describe('TodoItem', () => {
  it('lifts toggle and delete up through callbacks', async () => {
    const props = setup()
    await userEvent.click(screen.getByRole('checkbox', { name: /อ่านหนังสือ/ }))
    expect(props.onToggle).toHaveBeenCalledWith('1')
    await userEvent.click(screen.getByRole('button', { name: 'ลบงาน อ่านหนังสือ' }))
    expect(props.onDelete).toHaveBeenCalledWith('1')
  })

  it('saves edits and returns to view mode', async () => {
    const props = setup()
    await userEvent.click(screen.getByRole('button', { name: 'แก้ไขงาน อ่านหนังสือ' }))
    const input = screen.getByLabelText('แก้ไขชื่องาน')
    await userEvent.clear(input)
    await userEvent.type(input, 'อ่านหนังสือ 2 บท')
    await userEvent.click(screen.getByRole('button', { name: 'บันทึกการแก้ไข' }))
    expect(props.onEdit).toHaveBeenCalledWith('1', expect.objectContaining({ title: 'อ่านหนังสือ 2 บท' }))
    expect(screen.queryByLabelText('แก้ไขชื่องาน')).not.toBeInTheDocument()
  })

  it('cancel restores view mode without saving, empty title is rejected', async () => {
    const props = setup()
    await userEvent.click(screen.getByRole('button', { name: 'แก้ไขงาน อ่านหนังสือ' }))
    await userEvent.clear(screen.getByLabelText('แก้ไขชื่องาน'))
    await userEvent.click(screen.getByRole('button', { name: 'บันทึกการแก้ไข' }))
    expect(props.onEdit).not.toHaveBeenCalled()
    expect(screen.getByText('ชื่องานต้องไม่ว่าง')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'ยกเลิกการแก้ไข' }))
    expect(screen.getByText('อ่านหนังสือ')).toBeInTheDocument()
  })

  it('warns in console when a required prop is missing', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const props = { ...setupProps(), title: undefined } as unknown as TodoItemProps
    render(<TodoItem {...props} />)
    expect(spy.mock.calls.flat().join(' ')).toMatch(/Failed prop type.*title/)
    spy.mockRestore()
  })
})

function setupProps(): TodoItemProps {
  return {
    id: '2',
    title: 'x',
    priority: 'low',
    dueDate: '2026-10-10',
    completed: false,
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
  }
}
