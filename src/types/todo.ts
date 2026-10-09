export type Priority = 'low' | 'medium' | 'high'
export type Filter = 'all' | 'active' | 'completed'
export type SortBy = 'dueDate' | 'priority'

export interface Todo {
  id: string
  title: string
  priority: Priority
  /** YYYY-MM-DD */
  dueDate: string
  completed: boolean
  createdAt: number
}

export type TodoUpdates = Partial<Pick<Todo, 'title' | 'priority' | 'dueDate' | 'completed'>>
