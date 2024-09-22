import { Button } from '../button'

import styles from './modal-delete-task.module.scss'

interface ModalDeleteTaskProps {
  onCancelClicked(): void
  onDeleteClicked(): void
}

export function ModalDeleteTask({
  onCancelClicked,
  onDeleteClicked,
}: ModalDeleteTaskProps) {
  return (
    <>
      <p className={styles.modalDescription}>
        Tem certeza que você deseja deletar essa tarefa?
      </p>
      <div className={styles.horizontalButtons}>
        <Button
          variant="secondary"
          label="Cancelar"
          onClick={onCancelClicked}
        />
        <Button variant="danger" label="Deletar" onClick={onDeleteClicked} />
      </div>
    </>
  )
}
