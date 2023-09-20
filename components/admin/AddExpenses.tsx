import { FC } from 'react';
import { useForm } from 'react-hook-form'

import { create } from '@/database/crudActions';
import { usePaginationRequest } from '@/hooks';

import { CustomTable } from '@/components';
import { Grid, TextField, Button, Typography } from '@mui/material';

type FormData = {
    item: string,
    amount: number,
}

export const AddExpenses: FC = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('expenses');

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>()

    const onSubmit = ({ item, amount }: FormData) => {
        create({ item, amount }, 'expenses');
    }

    return (
        <>
            <Grid container alignItems="top" gap={2} component={'form'} onSubmit={handleSubmit(onSubmit)} className='fadeIn'>

                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={600}> Agregar gastos </Typography>
                </Grid>

                <Grid item xs={12} md={3}>
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

                <Grid item xs={12} md={3}>
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
                    <Button variant='contained' type='submit' disabled={isLoading}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h6" fontWeight={600} mt={2} mb={1}> Ultimos gastos </Typography>
            <CustomTable
                headRows={['Fecha', 'Producto', 'Monto', '']}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
                results={results}
                totalText='Ingresos totales:'
                extendedTable={false}
            />
        </>
    )
}
