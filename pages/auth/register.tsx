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
import { Box, Button, CircularProgress, Grid, TextField, Typography, IconButton } from '@mui/material';


type FormData = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage: NextPage = () => {

    const [submitted, setSubmitted] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const { registerUser } = useContext(AuthContext);

    const onRegister = async ({ name, email, password }: FormData) => {
        setSubmitted(true);
        await registerUser(name, email, password)
        setSubmitted(false);
    }

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    return (
        <MainLayout title='Registro | Recibimientos CAB' containerPageClass="auth-container">
            <form onSubmit={handleSubmit(onRegister)} noValidate className="auth-box">
                <Grid container direction='column' gap={2}>
                    <Box>
                        <Typography variant='h4'>Crear cuenta</Typography>
                        <span className='mini-divider' />
                    </Box>

                    <TextField
                        fullWidth
                        type='text'
                        label="Nombre completo"
                        placeholder='Ingresa tu nombre completo...'
                        {...register('name', {
                            required: 'El campo requerido.',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                            maxLength: { value: 20, message: 'Máximo 20 caracteres' },
                            pattern: { value: /^[A-Za-z\s]+$/, message: 'No se permiten números.' }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        fullWidth
                        type='email'
                        label="Email"
                        placeholder='Ingresa tu email...'
                        {...register('email', {
                            required: 'El campo requerido.',
                            validate: isEmail,
                            maxLength: { value: 35, message: 'Máximo 35 caracteres' },
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
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                            maxLength: { value: 25, message: 'Máximo 25 caracteres' },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button variant="contained" type="submit" size='large' disabled={submitted}>
                        {submitted ? <CircularProgress size={25} /> : "Registrarme"}
                    </Button>

                    <CustomDivider />

                    <Box className='auth-providers'>
                        <IconButton onClick={() => signIn(providers.google.id)}>
                            <Image src='/google.png' width={33} height={33} alt='Ingresar con google' />
                        </IconButton>
                        <IconButton disabled>
                            <Image src='/twitter.png' width={33} height={33} alt='Ingresar con twitter' />
                        </IconButton>
                        <IconButton disabled>
                            <Image src='/facebook.png' width={33} height={33} alt='Ingresar con facebook' />
                        </IconButton>
                    </Box>

                    <Typography textAlign="center" mt={1}>
                        Ya tienes cuenta ?
                        <Link href='/auth/login' className="link" >
                            Ingresar
                        </Link>
                    </Typography>
                </Grid>
            </form>
        </MainLayout>
    )
}


export default RegisterPage;