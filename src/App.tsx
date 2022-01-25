import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage, LandingPage, LoginPage, SignUpPage } from './Pages'
import { AppBar } from './Components'
import { Wrapper } from './App.styles'
import { ThemeProvider } from '@mui/material/styles'

import { useSelector } from 'react-redux'
import { RootState } from './Redux/Reducers'
import {lightTheme, darkTheme} from "./Themes";

// declare module '@mui/material/styles' {
//   interface Theme {
//
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//
//   }
// }

const App: React.FC = () => {

  const darkMode = useSelector((state: RootState) => state.darkMode)

  return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Wrapper>
      {/*<CssBaseline />*/}
        <BrowserRouter>
          <AppBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path='login' element={<LoginPage />} />
              <Route path='signup' element={<SignUpPage />} />
            </Routes>
          </div>
        </BrowserRouter>
    </Wrapper>
      </ThemeProvider>
  )
}

export default App
