import { Plus } from 'lucide-react'
import { useState, type FormEvent } from 'react'

interface Props {
  onAdd: (title: string) => void
}

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        aria-label="รายการใหม่"
        placeholder="ต้องทำอะไร?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">
        <Plus size={16} aria-hidden />เพิ่ม
      </button>
    </form>
  )
}
