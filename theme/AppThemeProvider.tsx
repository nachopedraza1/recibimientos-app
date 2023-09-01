import { FC, ReactNode } from 'react'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { pirata } from '.'


export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={pirata}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
