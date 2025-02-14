import React, {useState} from 'react'
import { HashRouter } from 'react-router-dom';
import Authwrapper from './Authentication/Authwrapper'

const App = () => {

  return (
    <div className="h-screen w-screen flex flex-col">
      <HashRouter>
        <Authwrapper/>
      </HashRouter>
    </div>
  )
}

export default App