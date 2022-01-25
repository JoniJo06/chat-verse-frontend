import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Theme {
        customBoxBackground: {
            default: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        customBoxBackground?: {
            default?: string;
        };
    }
}

export const lightTheme = createTheme({
    customBoxBackground:{
        default: '#bbb'
    },
    palette:{
        mode: 'light'
    }
})