import { useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { isEmail } from '@/utils';
import { AuthContext } from '@/context/auth';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'


type FormData = {
    name: string,
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

    return (
        <form onSubmit={handleSubmit(onRegister)} noValidate>
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" className='bg-fixed'>

                <Grid item xs={5} gap={2} className='box-login'>

                    <Typography variant='h4' fontWeight={600}> Ingresa </Typography>

                    <TextField
                        fullWidth
                        type='text'
                        label="Nombre y Apellido"
                        placeholder='Ingresa tu nombre completo...'
                        {...register('name', {
                            required: 'El campo requerido.',
                            minLength: { value: 6, message: 'Mínimo 6 caracteres' }
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

                    <Button variant="contained" type="submit" disabled={submitted}>
                        {submitted ? <CircularProgress size={25} /> : "Ingresar"}
                    </Button>

                </Grid>
            </Grid >
        </form>
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
        props: {

        }
    }
}

export default RegisterPage;