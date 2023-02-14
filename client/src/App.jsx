import React, { useState } from 'react'
import Login from './components/Login'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ResetPassword from './components/ResetPassword'
import PasswordGallery from './components/PasswordGallery';
import Dashboard from './components/Dashboard';
import './App.css'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "/change-password",
      element: <ResetPassword/>
    },
    {
      path: "/password-gallery",
      element: <PasswordGallery/>
    },
    {
      path: "/dash",
      element: <Dashboard/>
    },
  ]
);
function App() {
  React.useEffect(() => {
    let pagetitle = document.title;

    window.addEventListener("blur",()=>{
      document.title = "Come back here";
    })
    window.addEventListener("focus",()=>{
      document.title = pagetitle;
    })
    
  }, []);
  
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
