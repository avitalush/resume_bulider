import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/form'
import {Provider} from './context/resumes'
import DownloadResume from './components/downloadResume'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Provider>
     <Form/>
<DownloadResume/>
   </Provider>
    </>
  )
}

export default App
