import { VariantType, enqueueSnackbar } from "notistack";

export const alertSnack = (message: string, type: VariantType) => {
    enqueueSnackbar(`${message}`, {
        variant: type,
        autoHideDuration: 1500,
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        }
    })
}