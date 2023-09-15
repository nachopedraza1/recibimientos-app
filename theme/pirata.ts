import { createTheme } from '@mui/material';

export const pirata = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#08b8ef"
        },
        background: {
            default: "#121112"
        },
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
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
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
                    backgroundColor: '#0f0f0fc6'
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize'
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
                input: {
                    '&:-webkit-autofill': {
                        'WebkitBoxShadow': '0 0 0 100px transparent',
                        'WebkitTextFillColor': '#fff'
                    }
                }
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
        },
        MuiModal: {
            styleOverrides: {
                root: {
                    color: 'white',
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    position: "relative"
                }
            }
        },
    }
});