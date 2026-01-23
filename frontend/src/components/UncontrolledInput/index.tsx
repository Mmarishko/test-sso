import { useRef } from 'react'

export const UncontrolledInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (): void => {
    console.log(inputRef.current?.value)
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}
