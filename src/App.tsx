import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage } from './Pages'
import {Wrapper} from './App.styles'

const App: React.FC = () => {
  return (
      <Wrapper>

    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
      </Wrapper>
  )
}

export default App
