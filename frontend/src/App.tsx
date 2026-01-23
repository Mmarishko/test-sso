import { lazy, Suspense } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { MainPage } from './pages/MainPage'

// Ленивая загрузка компонентов
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
// const AuthForm = lazy(() => import('./components/AuthForm'))
const AuthForm = lazy(() =>
  import('./components/AuthForm').then((module) => ({
    default: module.AuthForm,
  }))
)

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    children: [
      { path: 'home', Component: HomePage },
      { path: 'main', Component: MainPage },
      { path: 'auth', Component: AuthForm },
    ],
  },
])

function Main() {
  return (
    <main>
      <h1>Заголовок приложения</h1>
      <Outlet />
    </main>
  )
}

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  )
}

export default App
