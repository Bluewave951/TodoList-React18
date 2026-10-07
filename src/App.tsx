import './App.css'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const { todos, addTodo, updateTodo, removeTodo, toggleTodo } = useTodos()
  const remaining = todos.filter((t) => !t.completed).length

  return (
    <main className="app">
      <h1>TodoList</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onUpdate={updateTodo} onRemove={removeTodo} />
      {todos.length > 0 && <p className="summary">เหลือ {remaining} จาก {todos.length} รายการ</p>}
    </main>
  )
}

export default App
