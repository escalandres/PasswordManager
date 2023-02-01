import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App';
import ResetPassword from './components/ResetPassword'
import PasswordGallery from './components/PasswordGallery';
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/change-password",
      element: <ResetPassword/>
    },
    {
      path: "/password-gallery",
      element: <PasswordGallery/>
    },
  ]
);
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router}/>
  // </React.StrictMode>,
)
