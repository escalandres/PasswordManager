import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Login from './components/Login'
import './App.css'
import ResetPassword from './components/ResetPassword'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login />
      {/* <ResetPassword/> */}
    </div>
  )
}

export default App
