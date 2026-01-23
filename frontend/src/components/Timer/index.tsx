import { useRef } from 'react'

function Timer() {
  const countRef = useRef<number>(0)
  const increment = () => {
    countRef.current += 1
    console.log(countRef.current)
  }

  return (
    <div>
      <p>Текущее значение: {countRef.current}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  )
}

export default Timer
