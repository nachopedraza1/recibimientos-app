import { createTheme, Typography } from '@mui/material';

export const pirata = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#08b8ef"
        }
    },
    typography: {
        fontFamily: 'Archivo',
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
                    borderRadius: '20px',
                    color: 'white',
                    fontWeight: 600,
                    letterSpacing: 1,
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: '2px solid #08b8ef',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: "white",
                    "&.MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "gray"
                        }, '&:hover fieldset': {
                            borderColor: 'gray',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: "#08b8ef",
                        },
                    },
                },
                notchedOutline: {
                    borderColor: "gray",
                },
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white'
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'white'
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    "&::before, &::after": {
                        borderColor: "gray",
                    },
                }
            }
        }
    }
});