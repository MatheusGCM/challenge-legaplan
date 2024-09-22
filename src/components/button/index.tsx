import styles from './button.module.scss'

import type { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  label: string
  variant: 'primary' | 'secondary' | 'danger'
}

export function Button({ label, variant = 'secondary', ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
