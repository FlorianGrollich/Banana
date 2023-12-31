import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage/LoginPage'
import RegistrationPage from './RegistrationPage/RegistrationPage'
import CodeEditor from './CodeEditor/CodeEditor'
import Grid from './GameGrid/Grid'
import NavBar from './NavBar/NavBar'
import { User } from './types/types.d'
import WelcomeSection from './WelcomeSection/WelcomeSection'

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="App min-h-screen bg-slate-900 text-gray-200">
      <Router>
        <NavBar user={user} onLogout={handleLogout} />
        <main className="pt-16">
          <Routes>
            <Route path="/home" element={<Grid />} />
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/editor" element={<CodeEditor />} />
            <Route path="/" element={<WelcomeSection user={user} />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
