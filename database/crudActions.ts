import { mutate } from 'swr';
import { alertSnack } from '@/utils';
import axios, { isAxiosError } from 'axios';

export const create = async (body: {}, route: 'entries' | 'expenses' | 'users') => {
    try {
        await axios.post(`/api/${route}`, body);
        mutate(`/api/${route}?page=1`);
        alertSnack('Creado con éxito', 'success');
    } catch (error) {
        if (isAxiosError(error)) {
            alertSnack(`${error.response?.data.message}`, 'error');
        }
    }
}