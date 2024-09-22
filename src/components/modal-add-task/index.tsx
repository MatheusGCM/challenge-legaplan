import { z } from 'zod'
import { Button } from '../button'

import styles from './modal-add-task.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const createTaskFormSchema = z.object({
  name: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
})

export type CreateTaskFormData = z.infer<typeof createTaskFormSchema>

interface ModalAddTaskProps {
  onCancelClicked(): void
  onAddClicked(data: CreateTaskFormData): void
}

export function ModalAddTask({
  onAddClicked,
  onCancelClicked,
}: ModalAddTaskProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskFormSchema),
  })
  return (
    <form onSubmit={handleSubmit(onAddClicked)}>
      <div className={styles.containerLabelAndInput}>
        <label htmlFor="task">Título</label>
        <input
          type="text"
          id="task"
          placeholder="Digite"
          {...register('name')}
        />
        <p className={styles.textError}>{errors.name?.message}</p>
      </div>
      <div className={styles.horizontalButtons}>
        <Button
          type="button"
          variant="secondary"
          label="Cancelar"
          onClick={onCancelClicked}
        />
        <Button type="submit" variant="primary" label="Adicionar" />
      </div>
    </form>
  )
}
