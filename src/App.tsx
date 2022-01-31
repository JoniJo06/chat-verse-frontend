import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LandingPage, LoginPage, SignUpPage } from './Pages';
import { AppBar } from './Components';
import { Wrapper } from './App.styles';
import { ApplicationState } from './Redux';
import { AnyAction, Store } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { lightTheme, darkTheme } from './Themes';
import { CssBaseline } from '@mui/material';
import { Socket } from './Redux/Types';
import { ThunkDispatch } from 'redux-thunk';
import { setSocket } from './Redux/Actions';
// import { ServerToClientEvents, ClientToServerEvents } from './Types'
import { Socket as Sockets } from 'socket.io-client';
interface MainProps {
  store: Store<ApplicationState>;
}

interface PropsFromDispatch {
  setSocket: (socket: Socket) => void;
}

interface PropsFromState {
  darkMode: boolean;
  socket: Sockets;
}

type AllProps = MainProps & PropsFromDispatch & PropsFromState;

const App: React.FC<AllProps> = ({ store, darkMode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Wrapper>
          <CssBaseline />
            <BrowserRouter>
          <AppBar>
              <Routes>
                <Route path='home' element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='/' element={<LandingPage />} />
              </Routes>
          </AppBar>
            </BrowserRouter>
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

const mapStateToProps = ({ darkMode, socket }: ApplicationState) => ({
  darkMode: darkMode.data.darkMode,
  socket: socket.data.socket,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => ({
  setSocket: (socket: Socket) => dispatch(setSocket(socket)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
