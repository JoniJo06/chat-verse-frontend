import {Dispatch} from 'redux'
import { DarkModeType } from '../Types'

export const toggleDarkMode = () => {
    return (dispatch: Dispatch<DarkModeType>) => {
        dispatch({
            type: 'toggle'
        })
    }
}