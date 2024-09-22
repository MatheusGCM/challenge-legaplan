'use client'
import { useState } from 'react'

import {
  Button,
  Header,
  ModalDeleteTask,
  ModalLayout,
  Task,
  ModalAddTask,
} from '@/components'

import { type TasksProps, useTask } from '@/hooks/use-task'

import styles from './home.module.scss'

export default function Home() {
  const [taskDeletionId, setTaskDeletionId] = useState<string>('')
  const {
    tasks,
    isVisibleAddTaskModal,
    isVisibleDeleteTaskModal,
    toggleTaskCompletion,
    toggleVisibilityDeleteTaskModal,
    toggleVisibilityAddTaskModal,
    handleAddTask,
    deleteTask,
  } = useTask()

  const tasksNotCompleted = tasks.filter(({ isCompleted }) => !isCompleted)
  const tasksCompleted = tasks.filter(({ isCompleted }) => isCompleted)

  function handleDeleteTask(taskId: string) {
    toggleVisibilityDeleteTaskModal()
    setTaskDeletionId(taskId)
  }

  function renderTasks(taskList: TasksProps[], title: string) {
    return (
      <>
        <p className={styles.title}>{title}</p>
        {taskList.map(item => (
          <Task
            key={item.id}
            onCompleteTaskClicked={() => toggleTaskCompletion(item.id)}
            onDeleteTaskClicked={() => handleDeleteTask(item.id)}
            {...item}
          />
        ))}
      </>
    )
  }

  return (
    <>
      <Header />
      <main className={styles.containerMain}>
        <div className={styles.containerTasksAndButton}>
          <div className={styles.containerTasks}>
            {renderTasks(
              tasksNotCompleted,
              tasks.length ? 'Suas tarefas de hoje' : 'Sem tarefas hoje'
            )}
            {!!tasksCompleted.length &&
              renderTasks(tasksCompleted, 'Tarefas finalizadas')}
          </div>

          <Button
            variant="primary"
            label="Adicionar nova tarefa"
            onClick={toggleVisibilityAddTaskModal}
          />
        </div>
      </main>
      {isVisibleAddTaskModal && (
        <ModalLayout title="Nova tarefa">
          <ModalAddTask
            onCancelClicked={toggleVisibilityAddTaskModal}
            onAddClicked={handleAddTask}
          />
        </ModalLayout>
      )}
      {isVisibleDeleteTaskModal && (
        <ModalLayout title="Deletar tarefa">
          <ModalDeleteTask
            onCancelClicked={toggleVisibilityDeleteTaskModal}
            onDeleteClicked={() => deleteTask(taskDeletionId)}
          />
        </ModalLayout>
      )}
    </>
  )
}
