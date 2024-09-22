import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import logo from '../../assets/logo.svg'

import Image from 'next/image'

import styles from './header.module.scss'

export function Header() {
  const currrentDateFormatted = format(
    new Date(),
    "eeee, dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  )

  return (
    <header className={styles.header}>
      <Image src={logo} alt="Logo" priority />
      <h1>Bem-vindo de volta, Marcus</h1>
      <p>
        {currrentDateFormatted.charAt(0).toUpperCase() +
          currrentDateFormatted.slice(1)}
      </p>
    </header>
  )
}
