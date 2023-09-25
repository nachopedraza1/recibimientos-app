
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { isAxiosError } from 'axios';

import { alertSnack } from '@/utils';
import { AuthContext } from '@/context/auth';

import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Backdrop, Box, Fade, Modal, TextField, Typography, Button, Chip } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '550px',
    bgcolor: '#1d1b1b',
    border: '1px solid #08b8ef',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    "&:focus": {
        outline: "none"
    }
};

interface FormData { name: string }

export const ChangeNameModal: FC = () => {

    const { user, logoutUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const onChangeName = async ({ name }: FormData) => {
        try {
            setLoading(true);
            await axios.put('/api/users', { name, id: user?._id });
            setLoading(false)
            alertSnack('Usuario Actualizado.', 'success');
            logoutUser();
        } catch (error) {
            setLoading(false);
            if (isAxiosError(error)) {
                alertSnack(error.response?.data.message, 'error');
            }
        }
    }

    return (
        <>
            <Typography variant="h5" mt={8}> Aun no hay aportes que mostrar. </Typography>
            
            <Typography>
                ¿Tienes aportes, pero aún no los ves reflejados en tu historial?
                <Typography
                    onClick={() => setOpenModal(true)}
                    component='span'
                    color='primary.main'
                    sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                > Vincula tu cuenta.
                </Typography>

            </Typography>


            <Modal
                open={openModal}
                onClose={() => setOpenModal(!openModal)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                sx={{ overflowY: 'scroll' }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                            <Typography variant='h4' textAlign='center'> Vincular cuenta </Typography>
                            <span className='mini-divider'></span>
                            <Typography fontSize={15} mb={2}>
                                Para asegurar que los registros de tus aportes sean precisos y reflejen correctamente las transferencias realizadas,
                                te pedimos que actualices el nombre en tu cuenta.
                                Es esencial que coloques exactamente el nombre de la
                                cuenta desde la cual efectuaste la transferencia.
                            </Typography>

                            <form onSubmit={handleSubmit(onChangeName)}>
                                <TextField
                                    fullWidth
                                    type='text'
                                    label="Nombre"
                                    placeholder='Ingresa tu nombre...'
                                    {...register('name', {
                                        required: 'El campo requerido.',
                                        minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                                        maxLength: { value: 20, message: 'Máximo 20 caracteres' },
                                        pattern: { value: /^[A-Za-z\s]+$/, message: 'No se permiten números.' }
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />

                                <Typography fontSize={15} mb={2} mt={2}>
                                    Esto nos permitirá mantener un historial de aportes preciso
                                    y garantizar que tu contribución se acredite correctamente.
                                </Typography>

                                <Button variant='contained' fullWidth type='submit' disabled={loading}>
                                    Actualizar
                                </Button>

                                <Chip
                                    color='warning'
                                    icon={<FontAwesomeIcon icon={faWarning} />}
                                    label='Al actualizar se cerrará la sesión.'
                                    variant='outlined'
                                    sx={{ width: '100%', mt: 1 }}
                                />

                            </form>
                        </Box>
                    </Box>
                </Fade>
            </Modal >
        </>
    )
}
