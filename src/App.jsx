import React from 'react'
import { HashRouter } from "react-router-dom";
import Authwrapper from './Authentication/Authwrapper'

const App = () => {

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Base name is nacessay to add for the github pages */}
      <HashRouter >
        <Authwrapper />
      </HashRouter>
    </div>
  )
}

export default App