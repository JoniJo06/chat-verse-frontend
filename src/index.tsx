import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
// import{createBrowserHistory} from 'history'
import configureStore from './configureStore';
import App from './App'
// import {History} from 'history'

// const history = createBrowserHistory()

const initialState: any = {}
const store = configureStore(history, initialState)
ReactDOM.render(
      <App store={store} /*history={history}*//>,
  document.getElementById('root')
)
