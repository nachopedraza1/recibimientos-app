import { createTheme, Typography } from '@mui/material';

export const pirata = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'Poppins',
        h3: {
            fontWeight: 'bold',
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '20px'
                }
            }
        }
    }
});