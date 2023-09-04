import { useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { isEmail } from '@/utils';
import { AuthContext } from '@/context/auth';
import { useForm } from 'react-hook-form';

import { Box, Button, CircularProgress, Grid, TextField, Typography, Divider, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import { AuthLayout } from '@/components/layouts';
import styles from './auth.module.css'


type FormData = {
    email: string;
    password: string;
};

const LoginPage: NextPage = () => {

    const { query } = useRouter();

    const [submitted, setSubmitted] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const { loginUser } = useContext(AuthContext);

    const onLogin = async ({ email, password }: FormData) => {
        setSubmitted(true);
        await loginUser(email, password)
        setSubmitted(false);
    }

    return (
        <AuthLayout title='Ingresar | Recibimientos CAB'>
            <form onSubmit={handleSubmit(onLogin)} noValidate>
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

                    <Divider>
                        <Image src='/belgrano-calavera-white.png'
                            alt='Recibimientos Cab'
                            width={40}
                            height={40}
                        />
                    </Divider>

                    <Box className={styles.providers}>
                        <IconButton>
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
                        <Link href={query.p ? `/auth/register?p=${query.p}` : '/auth/register'} className="link" >
                            Registrate
                        </Link>
                    </Typography>
                </Grid>
            </form>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { p = '/' } = query;

    const session = await getSession({ req });

    if (session) {
        return {
            redirect: {
                destination: p?.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

export default LoginPage;