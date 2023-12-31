import { mutate } from 'swr';
import { alertSnack } from '@/utils';
import axios, { isAxiosError } from 'axios';

export const createAction = async (body: {}, route: 'entries' | 'expenses' | 'users' | 'matches') => {
    try {
        await axios.post(`/api/${route}`, body);
        await mutate(`/api/${route}?page=1`);
        alertSnack('Creado con éxito', 'success');
    } catch (error) {
        if (isAxiosError(error)) {
            alertSnack(`${error.response?.data.message}`, 'error');
        }
    }
}

export const deleteAction = async (_id: any, route: 'entries' | 'expenses' | 'matches') => {

    try {
        await axios.delete(`/api/${route}?id=${_id}`);
        await mutate(`/api/${route}?page=1`);
        alertSnack('Eliminado con éxito', 'success');
    } catch (error) {
        if (isAxiosError(error)) {
            alertSnack(`${error.response?.data.message}`, 'error');
        }
    }
}