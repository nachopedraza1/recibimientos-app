import { useContext, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import { isEmail } from '@/utils';
import { AuthContext } from '@/context/auth';
import { Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'


type FormData = {
    email: string;
    password: string;
};

const AuthPage: NextPage = () => {

    const [submitted, setSubmitted] = useState<boolean>(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

    const { loginUser } = useContext(AuthContext);

    const onLogin = async ({ email, password }: FormData) => {
        setSubmitted(true);
        await loginUser(email, password)
        setSubmitted(false);
    }

    return (
        <form onSubmit={handleSubmit(onLogin)} noValidate>
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" className='bg-fixed'>

                <Grid item xs={5} gap={2} className='box-login'>

                    <Typography variant='h4' fontWeight={600}> Ingresa </Typography>

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

export default AuthPage;