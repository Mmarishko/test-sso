import { ChangeEvent, ReactElement, useRef, useState } from 'react'
import './styles.css'

export function LightInputPage(): ReactElement {
  const [light, setLight] = useState<number>(0.8)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target?.value)
    setLight(+e?.target?.value)
  }

  return (
    <section>
      <div className="range-container">
        <div>
          Light: {light}
          <div
            className="round"
            // style={{ opacity: `${light}` }}
            style={{ background: `rgb(27,158,23,${light})` }}
          ></div>
        </div>
        <div>
          <input
            type="range"
            id="light"
            name="light"
            min={0}
            max={1}
            step={0.01}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  )
}
