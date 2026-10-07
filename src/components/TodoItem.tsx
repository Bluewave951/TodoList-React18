import { useState, type KeyboardEvent } from 'react'
import { CircleCheck, Pencil, RotateCcw, Save, Trash2, X } from 'lucide-react'
import type { Todo } from '../types/todo'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onRemove }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.title)

  const startEdit = () => {
    setDraft(todo.title)
    setEditing(true)
  }

  const save = () => {
    if (!draft.trim()) return
    onUpdate(todo.id, draft)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') setEditing(false)
  }

  const handleRemove = () => {
    if (confirm(`ต้องการลบ "${todo.title}" ใช่หรือไม่?`)) onRemove(todo.id)
  }

  return (
    <li className={`todo-item${todo.completed ? ' done' : ''}`}>
      <input
        type="checkbox"
        aria-label={`เสร็จแล้ว: ${todo.title}`}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {editing ? (
        <>
          <input
            className="edit-input"
            aria-label="แก้ไขรายการ"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={save}>
            <Save size={16} aria-hidden />บันทึก
          </button>
          <button className="secondary" onClick={() => setEditing(false)}>
            <X size={16} aria-hidden />ยกเลิก
          </button>
        </>
      ) : (
        <>
          <span className="title">{todo.title}</span>
          <button className={todo.completed ? 'secondary' : 'success'} onClick={() => onToggle(todo.id)}>
            {todo.completed ? <RotateCcw size={16} aria-hidden /> : <CircleCheck size={16} aria-hidden />}
            {todo.completed ? 'ยกเลิกเสร็จ' : 'ทำเสร็จแล้ว'}
          </button>
          <button className="secondary" onClick={startEdit}>
            <Pencil size={16} aria-hidden />แก้ไข
          </button>
          <button className="danger" onClick={handleRemove}>
            <Trash2 size={16} aria-hidden />ลบ
          </button>
        </>
      )}
    </li>
  )
}
