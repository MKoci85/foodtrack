'use client'
import 'react-toastify/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'

export default function ToastNotification() {
  return (
    <ToastContainer 
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        toastStyle={{background: "linear-gradient(to right, red, purple)"}}
    />
  )
}