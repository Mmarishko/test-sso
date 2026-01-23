import { useEffect, useRef, useState } from 'react'
import './styles.css'

const generateColor = () => {
  return (
    '#' +
    Math.floor(Math.random() * 7123456)
      .toString(16)
      .padStart(6, '0')
  )
}

export function MainPage() {
  const [color, setColor] = useState<string>('#123456')
  const [state, setState] = useState<number>(1)
  // const [margin, setMargin] = useState(1)

  // 1. с помощью setInterval

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor(generateColor())
      // setMargin((prev) => prev + 1)
      console.log('setInterval', intervalId)
    }, 1000)

    return () => {
      console.log('clearInterval', intervalId)
      clearInterval(intervalId)
    }
  }, [state])

  // 2. requestAnimationFrame

  // const animationRef = useRef<number | null>(null)
  // const startTimeRef = useRef<number | null>(null)

  // useEffect(() => {
  //   // console.log('newcolor', color)
  // }, [color])

  // const animate = (timestamp) => {
  //   if (!startTimeRef.current) {
  //     startTimeRef.current = timestamp
  //   }

  //   const elapsed = timestamp - Number(startTimeRef.current)

  //   if (elapsed >= 1000) {
  //     setColor(generateColor())

  //     startTimeRef.current = timestamp
  //   }

  //   animationRef.current = requestAnimationFrame(animate)
  // }

  // useEffect(() => {
  //   animationRef.current = requestAnimationFrame(animate)

  //   return () => {
  //     if (animationRef.current) {
  //       cancelAnimationFrame(animationRef.current)
  //     }
  //   }
  // }, [])

  return state ? (
    <div className="table">
      <div
        className="container"
        style={{ backgroundColor: color }}
        // style={{ backgroundColor: color, margin: margin + 'px' }}
      >
        Мой контент тут
      </div>
      <img src="/images/box.jpg" className="image image-left" />
      <div className="left" onClick={() => setState((prev) => prev + 1)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
        consequuntur deserunt eaque neque sunt placeat possimus, corporis
        necessitatibus numquam voluptates suscipit recusandae omnis corrupti
        ipsam eius? Sunt laborum esse molestiae.
      </div>

      <div className="right">
        <p>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            expedita consequatur laboriosam blanditiis animi, rerum distinctio
            sequi, veniam nobis autem et facilis, inventore quas pariatur facere
            minima! Neque, fugit quia?
          </span>
        </p>
        <img src="/images/box.jpg" className="image image-right" />
      </div>
      <div className="thirdContainer">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat fugiat,
        ratione consectetur laboriosam a natus iste aliquam blanditiis incidunt
        fuga praesentium quas quidem commodi architecto quae dolorum. Atque,
        possimus placeat.
      </div>
    </div>
  ) : (
    <table>
      <tr>Я таблицы</tr>
    </table>
  )
}
