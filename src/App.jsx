import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/form'
import ResumesContext, {Provider} from './context/resumes'
import Login from './components/login'
import  {app,database} from './fireBaseConfig'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './pages/navBar'
import SignUp from './pages/signUp'
import LogOut from './components/logOut'
import MyPage from './pages/listResumes'
import DownloadResume from './components/downloadResume'
function App() {
  const { userLogin } = useContext(ResumesContext);

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes> 
         
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/logout' element={<LogOut/>}></Route>
      <Route path='/list' element={<MyPage/>}></Route>
      <Route path='/form' element={<Form/>}></Route>
      <Route path='/resume/:index' element={<DownloadResume/>}></Route>
      </Routes>
      </BrowserRouter>
     
   

  
  )
}

export default App
