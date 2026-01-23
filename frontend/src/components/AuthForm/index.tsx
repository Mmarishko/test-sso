import { Route, useNavigate } from 'react-router'
import { useAuth } from './../../auth/AuthContext'
import { ChangeEvent, MouseEvent, useState } from 'react'

interface AuthData {
  login: string
  password: string
}

export const AuthForm = () => {
  const [authData, setAuthData] = useState<AuthData>({
    login: '',
    password: '',
  })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (event: MouseEvent) => {
    // Имитация запроса к API
    event.preventDefault()

    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'marina', password: 'secret123' }),
    })
    const data = await res.json()

    login(data.access_token)

    navigate('/home')
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target)

    if (event.target.value)
      setAuthData((prev) => {
        return { ...prev, name: event.target.value }
      })
  }
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {}

  return (
    <section className="Test">
      <form action="submit">
        <div className="login-form">
          <div>
            <legend> Логин</legend>
            <input
              type="text"
              name="login"
              value={authData.login}
              onChange={handleChangeName}
            />
          </div>
          <div>
            <legend> Пароль</legend>
            <input
              type="password"
              name="password"
              value={authData.password}
              onChange={handleChangePassword}
            />
          </div>
          <button type="submit" onClick={(e) => handleLogin(e)}>
            Войти
          </button>
        </div>
      </form>
      {/* <div>
        <button>Продолжить с VK ID</button>
      </div> */}
    </section>
  )
}
