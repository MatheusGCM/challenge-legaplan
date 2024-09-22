import type { CreateTaskFormData } from '@/components/modal-add-task'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useToggle } from './use-toggle'

export interface TasksProps {
  id: string
  name: string
  isCompleted: boolean
}

export const useTask = () => {
  const [tasks, setTasks] = useState<TasksProps[]>(() => {
    if (typeof window !== 'undefined') {
      const storedTasks = localStorage.getItem('@app:tasks')
      return storedTasks ? JSON.parse(storedTasks) : []
    }
    return []
  })
  const [isVisibleAddTaskModal, toggleVisibilityAddTaskModal] = useToggle(false)
  const [isVisibleDeleteTaskModal, toggleVisibilityDeleteTaskModal] =
    useToggle(false)

  const toggleTaskCompletion = useCallback(
    (taskId: string) => {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
      setTasks(updatedTasks)
    },
    [tasks]
  )

  const handleAddTask = useCallback(
    (data: CreateTaskFormData) => {
      const newTask = {
        id: uuidv4(),
        name: data.name,
        isCompleted: false,
      }
      setTasks(prevTasks => [...prevTasks, newTask])
      toggleVisibilityAddTaskModal()
    },
    [toggleVisibilityAddTaskModal]
  )

  const deleteTask = useCallback(
    (taskId: string) => {
      const filteredTasks = tasks.filter(task => task.id !== taskId)
      setTasks(filteredTasks)
      toggleVisibilityDeleteTaskModal()
    },
    [tasks, toggleVisibilityDeleteTaskModal]
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('@app:tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  return {
    tasks,
    isVisibleAddTaskModal,
    isVisibleDeleteTaskModal,
    toggleVisibilityAddTaskModal,
    toggleVisibilityDeleteTaskModal,
    toggleTaskCompletion,
    handleAddTask,
    deleteTask,
  }
}
