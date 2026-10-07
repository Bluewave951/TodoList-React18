import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TodoList({ todos, ...handlers }: Props) {
  if (todos.length === 0) return <p className="empty">ยังไม่มีรายการ</p>

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...handlers} />
      ))}
    </ul>
  )
}
