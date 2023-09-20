import { FC } from 'react';
import { useForm } from 'react-hook-form'

import { create } from '@/database/crudActions';
import { usePaginationRequest } from '@/hooks';

import { CustomTable } from '@/components';
import { Grid, TextField, MenuItem, Button, Typography } from '@mui/material';


type FormData = {
    name: string,
    method: string,
    amount: number,
}

export const AddEntries: FC = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('entries');

    const { handleSubmit, register, formState: { errors } } = useForm<FormData>()

    const onSubmit = ({ name, amount, method }: FormData) => {
        create({ name, amount, method }, 'entries');
    }

    return (
        <>
            <Grid container alignItems="top" gap={2} component={'form'} onSubmit={handleSubmit(onSubmit)} className='fadeIn'>

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
                        <MenuItem value='transferencia'>Transferencia</MenuItem>
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
                    <Button variant='contained' type='submit' disabled={isLoading}>
                        Agregar
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="h6" fontWeight={600} mt={2} mb={1}> Ultimos aportes </Typography>
            <CustomTable
                headRows={['Fecha', 'Nombre', 'Método', 'Estado', 'Monto']}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
                results={results}
                totalText='Ingresos totales:'
                extendedTable
            />
        </>
    )
}
