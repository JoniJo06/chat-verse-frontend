import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer";
import loginReducer from "./loginReducer";

const reducers = combineReducers({
    darkMode: darkModeReducer,
    userLogin: loginReducer,
})

export default reducers;

export type RootState = ReturnType<typeof  reducers>