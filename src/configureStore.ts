
import { Store, createStore, applyMiddleware } from "redux";

// import createSagaMiddleware from "redux-saga";

import thunk from "redux-thunk";

import { routerMiddleware } from "connected-react-router";

// import { BrowserHistory, History } from "history";

import { ApplicationState, createRootReducer } from "./Redux";
import { composeWithDevTools } from 'redux-devtools-extension';


const configureStore = (
  history: History,
  initialState: ApplicationState,
): Store<ApplicationState>  =>{
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),

  );
  return store;
}
export default configureStore