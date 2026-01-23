import { ReactElement, useRef } from 'react'

export default function FocusInput(): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null)
  const focusInput = (): void => {
    inputRef?.current?.focus()
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        name="myTextInput"
        placeholder="Введите текст"
      />
      <button onClick={focusInput}>Фокус на Input</button>
    </div>
  )
}
