import { ChangeEvent, ReactElement, useRef, useState } from 'react'
import './styles.css'

export function AnimationsPage(): ReactElement {
  const [light, setLight] = useState<number>(0.8)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target?.value)
    setLight(+e?.target?.value)
  }

  return (
    <section>
      <div className="square-container animate">
        <div className="square"></div>
      </div>

      <div className="orbit-container">
        <div className="orbit"></div>
        <div className="rotating-element"></div>
      </div>
    </section>
  )
}
