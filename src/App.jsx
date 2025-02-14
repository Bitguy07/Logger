import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom'
import Authwrapper from './Authentication/Authwrapper'

const App = () => {

  return (
    <div className="h-svh  flex items-center justify-center w-screen">
        <BrowserRouter>
          <Authwrapper />
        </BrowserRouter>
    </div>
  )
}

export default App