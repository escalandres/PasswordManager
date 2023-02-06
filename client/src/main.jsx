import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import App from './App';
// import ResetPassword from './components/ResetPassword'
// import PasswordGallery from './components/PasswordGallery';
// import Dashboard from './components/Dashboard';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <App/>
//     },
//     {
//       path: "/change-password",
//       element: <ResetPassword/>
//     },
//     {
//       path: "/password-gallery",
//       element: <PasswordGallery/>
//     },
//     {
//       path: "/dash",
//       element: <Dashboard/>
//     },
//   ]
// );
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <RouterProvider router={router}/>
    <App />
  // </React.StrictMode>,
)
