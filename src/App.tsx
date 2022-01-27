import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage, LandingPage, LoginPage, SignUpPage } from './Pages';
import { AppBar } from './Components';
import { Wrapper } from './App.styles';
import { ApplicationState } from './Redux';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { DarkMode } from './Redux/Types';
import {connect} from "react-redux"
import { lightTheme, darkTheme } from './Themes';
import { CssBaseline } from '@mui/material';

interface MainProps {
  store: Store<ApplicationState>;
  data: DarkMode;
  // loading: boolean;
  // errors?: string;
  // history: History;
}

const App: React.FC<MainProps> = ({ store, data }) => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={data.darkMode ? darkTheme : lightTheme}>
        <Wrapper>
          <CssBaseline />
          <BrowserRouter>
            <AppBar />
            <div className='container'>
              {/*<ConnectedRouter history={history}>*/}

              <Routes>
                <Route path='home' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='/' element={<LandingPage />} />
              </Routes>
              {/*</ConnectedRouter>*/}
            </div>
          </BrowserRouter>
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

const mapStateToProps = ({ darkMode }: ApplicationState) => ({
  data: darkMode.data,
  loading: darkMode.loading,
  errors: darkMode.errors
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
