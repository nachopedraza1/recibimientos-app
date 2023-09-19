import { FC, useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';

import { History } from '@/components/admin';
import { Grid, TextField, MenuItem, Button, Typography } from '@mui/material';


type FormData = {
    name: string,
    method: string,
    amount: number,
}

export const AddEntries: FC = () => {

    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>()

    const onSubmit = async ({ name, method, amount }: FormData) => {
        setLoading(true);

        setLoading(false);
    }

    return (
        <>
            <Grid container alignItems="top" gap={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>

                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={600}> Agregar aporte </Typography>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        type='text'
                        variant='outlined'
                        label='Nombre'
                        placeholder='Ingrese el nombre...'
                        {...register('name', {
                            required: { message: 'Este campo es requerido', value: true },
                            minLength: { message: 'Mínimo 5 caracteres', value: 5 },
                            pattern: { message: 'No puede ingresar números aquí.', value: /^[A-Za-z\s]+$/ }
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        select
                        fullWidth
                        type='text'
                        variant='outlined'
                        label='Método'
                        {...register('method', {
                            required: { message: 'Este campo es requerido', value: true },
                        })}
                        error={!!errors.method}
                        helperText={errors.method?.message}
                        defaultValue=''
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        <MenuItem value='transfer'>Transferencia</MenuItem>
                        <MenuItem value='mercadopago'>Mercado Pago</MenuItem>
                        <MenuItem value='paypal'>Paypal</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        type='number'
                        variant='outlined'
                        label='Monto'
                        placeholder='Monto aportado...'
                        {...register('amount', {
                            required: { message: 'Este campo es requerido', value: true },
                            minLength: { message: 'Minimo 2 números', value: 2 },
                            pattern: { message: 'Solo números', value: /^[0-9]*$/ }
                        })}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                </Grid>

                <Grid item mt={1}>
                    <Button variant='contained' type='submit' disabled={loading}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>

            <History
                type='entries'
                title='Ultimos aportes'
                headRows={['Fecha', 'Nombre', 'Método', 'Estado', 'Monto']}
            />
        </>
    )
}
