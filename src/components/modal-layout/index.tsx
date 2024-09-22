import type { ComponentProps } from 'react'
import styles from './modal-layout.module.scss'

interface ModalProps extends ComponentProps<'div'> {
  title: string
}

export function ModalLayout({ title, children }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>{title}</h3>
        {children}
      </div>
    </div>
  )
}
