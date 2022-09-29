import React, { useState } from 'react'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

function App() {
  const adminUser = {
    name: 'mahmoud',
    email: 'mahmoud@gmail.com',
    password: '123456',
  }
  const [user, setUser] = useState({ name: '', email: '' })
  const [error, setError] = useState('')

  const login = (details) => {
    console.log(details)
    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log('logged in successfully')
      setUser({
        name: details.name,
        email: details.email,
      })
    } else {
      console.log('details do not match!')
      setError('details do not match!')
    }
  }
  const logout = () => {
    console.log('logout')
    setUser({ name: '', email: '' })
  }
  return (
    <div className='app'>
      <div className='app_body'>
        {user.email !== '' ? (
          // <div className='welcome'>
          //   <h2>
          //     Welcome, <span>{user.name}</span>
          //   </h2>
          //   <button onClick={logout}>Logout</button>
          // </div>
          <>
            <Sidebar />
            <Chat />
          </>
        ) : (
          <Login login={login} error={error} />
        )}
      </div>
    </div>
  )
}

export default App
