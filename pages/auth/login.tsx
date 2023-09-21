import { useContext, useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { NextPage } from 'next'
import Image from 'next/image';
import Link from 'next/link';

import { isEmail } from '@/utils';
import { AuthContext } from '@/context/auth';
import { useForm } from 'react-hook-form';

import { CustomDivider } from '@/components/ui';
import { MainLayout } from '@/components/layouts';
import { Box, Button, CircularProgress, Grid, TextField, Typography, FormControlLabel, Checkbox, IconButton } from '@mui/material';

type FormData = {
    email: string;
    password: string;
};

const LoginPage: NextPage = () => {

    const [submitted, setSubmitted] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const { loginUser } = useContext(AuthContext);

    const onLogin = async ({ email, password }: FormData) => {
        setSubmitted(true);
        await loginUser(email, password)
        setSubmitted(false);
    }

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    return (
        <MainLayout title='Ingresar | Recibimientos CAB' containerPageClass="auth-container">
            <form onSubmit={handleSubmit(onLogin)} noValidate className="auth-box">
                <Grid container direction='column' gap={2}>
                    <Box>
                        <Typography variant='h4'> Iniciar sesión</Typography>
                        <span className='mini-divider' />
                    </Box>

                    <TextField
                        fullWidth
                        type='email'
                        label="Email"
                        placeholder='Ingresa tu email...'
                        {...register('email', {
                            required: 'El campo requerido.',
                            validate: isEmail
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        type='password'
                        label="Contraseña"
                        placeholder='Ingresa tu contraseña...'
                        {...register('password', {
                            required: 'El campo requerido.',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <FormControlLabel control={<Checkbox color='primary' />} label="Recordame" />

                    <Button variant="contained" type="submit" size='large' disabled={submitted}>
                        {submitted ? <CircularProgress size={25} /> : "Ingresar"}
                    </Button>

                    <CustomDivider />

                    <Box className="auth-providers">
                        <IconButton onClick={() => signIn(providers.google.id)}>
                            <Image src='/google.png' width={33} height={33} alt='Ingresar con google' />
                        </IconButton>
                        <IconButton>
                            <Image src='/twitter.png' width={33} height={33} alt='Ingresar con twitter' />
                        </IconButton>
                        <IconButton>
                            <Image src='/facebook.png' width={33} height={33} alt='Ingresar con facebook' />
                        </IconButton>
                    </Box>

                    <Typography textAlign="center" mt={1}>
                        No tienes cuenta ?
                        <Link href='/auth/register' className="link" >
                            Registrate
                        </Link>
                    </Typography>
                </Grid>
            </form>
        </MainLayout>
    )
}


export default LoginPage;