import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dayjs } from 'dayjs';

import { usePaginationRequest } from '@/hooks';
import { createAction } from '@/database/crudActions';

import { CustomTable } from '@/components/tables';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

import { IMatch } from '@/interfaces';

export const AddMatch: FC = () => {

    const { handleChangePage, isLoading, results } = usePaginationRequest('matches');

    const { handleSubmit, register, formState: { errors } } = useForm<IMatch>()

    const [dateValue, setDateValue] = useState<Dayjs | null>(null);

    const onSubmit = ({ name, objectiveAmount }: IMatch) => {
        createAction({ name, objectiveAmount, dateEvent: dateValue }, 'matches');
    }

    return (
        <>
            <Grid container alignItems='top' gap={2} mb={3} component={'form'} onSubmit={handleSubmit(onSubmit)} className='fadeIn'>

                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={600}> Agregar recibimiento </Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        type='text'
                        variant='outlined'
                        label='Título'
                        placeholder='Título del recibimiento...'
                        {...register('name', {
                            required: { message: 'Este campo es requerido', value: true },
                            minLength: { message: 'Mínimo 4 caracteres', value: 4 },
                            maxLength: { message: 'Máximo 35 caracteres', value: 35 },
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        type='number'
                        variant='outlined'
                        label='Objetivo'
                        placeholder='Monto a juntar...'
                        {...register('objectiveAmount', {
                            required: { message: 'Este campo es requerido', value: true },
                            minLength: { message: 'Minimo 3 números', value: 3 },
                            pattern: { message: 'Solo números', value: /^[0-9]*$/ }
                        })}
                        error={!!errors.objectiveAmount}
                        helperText={errors.objectiveAmount?.message}
                    />
                </Grid>

                <Grid item xs={12} md={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label='Fecha del recibimiento'
                            sx={{ width: '100%' }}
                            onChange={setDateValue}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item mt={1}>
                    <Button variant='contained' type='submit' disabled={isLoading}>
                        Agregar
                    </Button>
                </Grid>

            </Grid>

            <CustomTable
                headRows={['recibimiento', 'título', 'recaudado', 'objetivo', 'Activo', '']}
                handleChangePage={handleChangePage}
                isLoading={isLoading}
                results={results}
                totalText='Gastos totales:'
                tableType='matchesPrivate'
                hiddenTotal
            />
        </>
    )
}
