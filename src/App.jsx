import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Authwrapper from './Authentication/Authwrapper'

const App = () => {

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Base name is nacessay to add for the github pages */}
      <BrowserRouter basename="/Logger"> 
        <Authwrapper />
      </BrowserRouter>
    </div>
  )
}

export default App