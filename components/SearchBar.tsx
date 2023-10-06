import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField, IconButton } from "@mui/material";

interface Props {
    onSearch: any,
}

export const SearchBar: FC<Props> = ({ onSearch }) => {

    const { handleSubmit, register, watch } = useForm<{ query: string }>();

    useEffect(() => {
        const query = watch('query')
        if (!query) return onSearch('');
    }, [watch('query')])


    return (
        <Grid container justifyContent='center' mb={3}>
            <Grid item xs={12} sm={7} md={3.3}>
                <form onSubmit={handleSubmit(onSearch)}>
                    <TextField
                        fullWidth
                        size='small'
                        label='Buscar'
                        placeholder='Buscar aporte...'
                        {...register('query')}
                        InputProps={{
                            sx: { borderRadius: 50 },
                            endAdornment: (
                                <IconButton onClick={handleSubmit(onSearch)}>
                                    <FontAwesomeIcon icon={faSearch} size='sm' />
                                </IconButton>
                            ),
                        }}
                    />
                </form>
            </Grid>
        </Grid>
    )
}
