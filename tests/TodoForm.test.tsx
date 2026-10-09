import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
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

describe('App (central state)', () => {
  it('adds, edits, toggles, deletes and undoes via lifted callbacks', async () => {
    render(<App />)
    await userEvent.type(screen.getByLabelText('ชื่องานใหม่'), 'งานเดิม{Enter}')
    expect(screen.getByText('งานเดิม')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'แก้ไขงาน งานเดิม' }))
    const edit = screen.getByLabelText('แก้ไขชื่องาน')
    await userEvent.clear(edit)
    await userEvent.type(edit, 'งานใหม่{Enter}')
    expect(screen.getByText('งานใหม่')).toBeInTheDocument()

    const checkbox = screen.getByRole('checkbox', { name: /งานใหม่/ })
    await userEvent.click(checkbox)
    expect(checkbox).toBeChecked()

    // cancel keeps the task
    await userEvent.click(screen.getByRole('button', { name: 'ลบงาน งานใหม่' }))
    await userEvent.click(await screen.findByRole('button', { name: 'ยกเลิกการลบ' }))
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))
    expect(screen.getByText('งานใหม่')).toBeInTheDocument()

    // confirm removes it
    await userEvent.click(screen.getByRole('button', { name: 'ลบงาน งานใหม่' }))
    await userEvent.click(await screen.findByRole('button', { name: 'ยืนยันลบงาน' }))
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))
    expect(screen.queryByText('งานใหม่')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'เลิกทำ' }))
    expect(screen.getByText('งานใหม่')).toBeInTheDocument()
  })
})
