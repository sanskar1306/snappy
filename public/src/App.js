import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route,redirect} from 'react-router-dom'
import { render } from "react-dom";
import Chat from './pages/Chat'
import Login from './pages/Login'
import SetAvatar from './pages/SetAvatar'
import Register from './pages/Register'
export default function App() {


  return (
    <BrowserRouter>
      <Routes>     
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}
