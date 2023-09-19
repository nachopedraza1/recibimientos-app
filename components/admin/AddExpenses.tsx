import { FC, useState } from 'react';
import { useForm } from 'react-hook-form'
import axios from 'axios';

import { History } from '@/components/admin';
import { Grid, TextField, Button, Typography } from '@mui/material';

type FormData = {
    item: string,
    amount: number,
}

export const AddExpenses: FC = () => {

    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>()

    const onSubmit = async ({ item, amount }: FormData) => {
        setLoading(true);
        const { data } = await axios.post('/api/expenses', { name: item, amount });
        setLoading(false);
    }

    return (
        <>
            <Grid container alignItems="top" gap={2} component={'form'} onSubmit={handleSubmit(onSubmit)}>

                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={600}> Agregar gastos </Typography>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        type='text'
                        variant='outlined'
                        label='Producto'
                        placeholder='Ingrese el producto...'
                        {...register('item', {
                            required: { message: 'Este campo es requerido', value: true },
                            minLength: { message: 'Mínimo 3 caracteres', value: 3 },
                        })}
                        error={!!errors.item}
                        helperText={errors.item?.message}
                    />
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
                title='Ultimos gastos'
                type='expenses'
                headRows={['Fecha', 'Producto', 'Monto']}
            />
        </>
    )
}
