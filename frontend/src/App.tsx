import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="Test">
        <div className="login-form">
          <div>
            <legend> Логин</legend>
            <input type="text" name="login" />
          </div>
          <div>
            <legend> Пароль</legend>
            <input type="password" name="password" />
          </div>
          <button type="submit">Войти</button>
        </div>
        <div>
          <button>Продолжить с VK ID</button>
        </div>
      </header>
    </div>
  )
}

export default App
