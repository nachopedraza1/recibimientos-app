import { createTheme } from '@mui/material';

export const pirata = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#08b8ef"
        },
        background: {
            default: "#121112",
        },
    },
    typography: {
        fontFamily: 'Poppins',
        h3: {
            fontWeight: 'bold',
        },
        h4: {
            fontWeight: 'bold',
            textAlign: 'center',
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
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'none',
                    borderRadius: '10px 0 0 10px',
                    backgroundColor: '#242527',
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundImage: 'none',
                    backgroundColor: '#242527'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: '10px 10px 10px 30px'
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '35px',
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#242527',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                },
                arrow: {
                    "&::before": {
                        backgroundColor: "#242527",
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize'
                }
            }
        }
    }
});