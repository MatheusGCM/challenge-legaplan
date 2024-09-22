'use client'

import styles from './task.module.scss'
import { Check, Trash } from 'lucide-react'

interface TaskProps {
  name: string
  isCompleted: boolean
  onCompleteTaskClicked?(): void
  onDeleteTaskClicked(): void
}

export function Task({
  name,
  isCompleted,
  onCompleteTaskClicked,
  onDeleteTaskClicked,
}: TaskProps) {
  return (
    <div className={styles.containerTask}>
      <div
        className={styles.containerCheckboxAndName}
        onClick={onCompleteTaskClicked}
        onKeyUp={() => {}}
      >
        <div className={`${styles.checkbox} ${isCompleted && styles.checked}`}>
          {isCompleted ? <Check className={styles.check} /> : null}
        </div>
        <p
          className={`${styles.taskName} ${isCompleted && styles.taskNameCompleted}`}
        >
          {name}
        </p>
      </div>

      <Trash className={styles.trash} onClick={onDeleteTaskClicked} />
    </div>
  )
}
