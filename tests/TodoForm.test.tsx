import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from '../src/App'
import { TodoForm } from '../src/components/TodoForm'

describe('TodoForm', () => {
  it('calls onAdd and clears input', async () => {
    const onAdd = vi.fn()
    render(<TodoForm onAdd={onAdd} />)
    const input = screen.getByLabelText('รายการใหม่')
    await userEvent.type(input, 'อ่านหนังสือ{Enter}')
    expect(onAdd).toHaveBeenCalledWith('อ่านหนังสือ')
    expect(input).toHaveValue('')
  })
})

describe('TodoItem (via App)', () => {
  it('edits inline and deletes after confirm', async () => {
    render(<App />)
    await userEvent.type(screen.getByLabelText('รายการใหม่'), 'งานเดิม{Enter}')

    await userEvent.click(screen.getByText('แก้ไข'))
    const edit = screen.getByLabelText('แก้ไขรายการ')
    await userEvent.clear(edit)
    await userEvent.type(edit, 'งานใหม่{Enter}')
    expect(screen.getByText('งานใหม่')).toBeInTheDocument()

    await userEvent.click(screen.getByText('ทำเสร็จแล้ว'))
    expect(screen.getByRole('checkbox')).toBeChecked()
    await userEvent.click(screen.getByText('ยกเลิกเสร็จ'))
    expect(screen.getByRole('checkbox')).not.toBeChecked()

    vi.spyOn(window, 'confirm').mockReturnValue(true)
    await userEvent.click(screen.getByText('ลบ'))
    expect(screen.getByText('ยังไม่มีรายการ')).toBeInTheDocument()
  })
})
