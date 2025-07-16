import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

function AuthPage() {
    const [mode, setMode] = useState('login');
    
  return (
    <div className="bg-linear-to-t from-purple-700 to-blue-800 h-screen flex items-center justify-center text-white">
        {mode === 'login' && <LoginForm onSwitch={() => setMode('register')} />}
        {mode === 'register' && <RegisterForm onSwitch={() => setMode('login')} />}
    </div>
  )
}

export default AuthPage