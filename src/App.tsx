import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { HomePage, LandingPage } from './Pages'
import { AppBar } from './Components'
import { Wrapper } from './App.styles'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import { RootState } from './Redux/Reducers'

//colors
// import {deepOrange} from '@mui/material/colors'
// import {CssBaseline} from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {

  }
  // allow configuration using `createTheme`
  interface ThemeOptions {

  }
}

const App: React.FC = () => {

  const darkMode = useSelector((state: RootState) => state.darkMode)

  const theme = createTheme({
    palette:{
      mode: darkMode ? 'dark' : 'light'
    }
  })
  // const lightTheme = createTheme({
  //   palette: {
  //     mode: 'light',
  //     primary: deepOrange,
  //   },
  // })

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //     primary: {
  //       light:deepOrange['500'],
  //       main: deepOrange[500],
  //       dark: deepOrange[500],
  //       contrastText: deepOrange[500]
  //     },
  //     background: {
  //       paper: deepOrange[500]
  //     }
  //   }
  // })

  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
      {/*<CssBaseline />*/}
        <BrowserRouter>
          <AppBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Wrapper>
  )
}

export default App
