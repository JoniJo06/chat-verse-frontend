export interface DarkMode {
    darkMode: boolean
}

export enum DarkModeActionTypes {
    TOGGLE_DARK_MODE = '@@darkMode/TOGGLE_DARK_MODE',
    TOGGLE_DARK_MODE_FAILURE = '@@darkMode/TOGGLE_DARK_MODE_FAILURE',
}

export interface DarkModeState {
    readonly loading: boolean;
    readonly data: DarkMode;
    readonly errors?: string;
}