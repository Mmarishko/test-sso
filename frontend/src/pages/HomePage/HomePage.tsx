import { KeyboardEvent, MouseEvent } from 'react'
import { useAuth } from '../../auth/AuthContext'
import './styles.css'
import Timer from '../../components/Timer'
import FocusInput from '../../components/FocusInput'
import { UncontrolledInput } from '../../components/UncontrolledInput'
import { createPortal } from 'react-dom'

export default function HomePage() {
  const { accessToken } = useAuth()

  // Здесь можно делать запросы с токеном
  // fetch('/api/data', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // })

  // if (!accessToken) {
  //   return <div>Пожалуйста, войдите в систему</div>
  // }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    // alert('Click')
    console.log(event?.target)
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event?.code === 'Enter' || event?.code === 'Space') alert('KeyDown')
    console.log(event?.target)
  }

  return (
    <main>
      <header>
        <h2 className="header">Профиль пользователя</h2>
      </header>
      <div>
        <div id="root">
          <p>Access token: {accessToken?.substring(0, 20)}...</p>

          <section role="tabpanel" tabIndex={1}>
            <p>Травоядные животные с коротким хоботом, которые живут в лесу.</p>

            <div>
              <a href="#mustache" tabIndex={1}>
                Усы
              </a>
            </div>
            <div>
              <a href="#paws" tabIndex={2}>
                Лапы
              </a>
            </div>
            <div>
              <a href="#tail" tabIndex={1}>
                Хвост
              </a>
            </div>
          </section>

          <section className="events">
            <div>
              <span>тут какой-то длинный текст</span> <Timer />
            </div>
            <div>
              <span>и тут какой-то длинный текст</span> <FocusInput />
            </div>
            <div>
              Неконтролируемый инпут <UncontrolledInput />
            </div>
          </section>

          <section>
            <div>Кнопка - не кнопка</div>
            <div
              id="myButton"
              className="button"
              role="button"
              // tabIndex={0}
              aria-label="Я кнопка"
              onClick={handleClick}
              onKeyDown={handleKeyPress}
            >
              Нажми
            </div>
          </section>

          <section className="tooltip-section">
            <div>
              <h2>Fade in</h2>
              <div className="tooltip-cnt">
                <span className="tooltip-target">Наведи на меня</span>
                <div className="tooltip">Эта подсказка проявилась</div>
              </div>
            </div>

            <div className="transitioned">
              <h2>Slide up</h2>
              <div className="tooltip-cnt">
                <span className="tooltip-target">Наведи на меня</span>
                <div className="tooltip">Это подсказка, которая всплыла</div>
              </div>
            </div>
          </section>
        </div>
        <div id="modal-root"></div>
      </div>
    </main>
  )
}
