import { VariantType, enqueueSnackbar } from "notistack";

export const alertSnack = (message: string, type: VariantType) => {
    enqueueSnackbar(`${message}`, {
        variant: type,
        autoHideDuration: type === 'success' ? 1500 : 3500,
        style: { textTransform: type === 'success' ? 'capitalize' : 'unset' },
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
        }
    })
}