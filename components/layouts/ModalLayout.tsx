import { FC, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { UiContext } from "@/context/ui";

import { Modal, Backdrop, Fade, Box, Typography, Link as MuiLink } from "@mui/material";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '550px',
    bgcolor: '#16171b',
    border: '2px solid #08b8ef',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    "&:focus": {
        outline: "none"
    }
};

interface Props {
    modalType: 'mercadopago' | 'paypal',
    modalStatus: boolean,
    children: ReactNode,
}

export const ModalLayout: FC<Props> = ({ children, modalType, modalStatus }) => {

    const session = useSession();

    const { toggleModal } = useContext(UiContext);


    return (
        <div>
            <Modal
                open={modalStatus}
                onClose={() => toggleModal(modalType)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalStatus}>
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>

                            {children}

                            {!session.data?.user &&
                                <Typography textAlign="center">
                                    Debes
                                    <MuiLink component={Link} href='/auth/login' mx={0.6} fontWeight={600} >
                                        iniciar sesión
                                    </MuiLink>
                                    para continuar.
                                </Typography>
                            }

                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}