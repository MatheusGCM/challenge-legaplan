import { useState } from 'react'

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue)

  function toggle() {
    setValue((prevValue) => !prevValue)
  }

  return [value, toggle]
}
