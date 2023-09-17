import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios, { isAxiosError } from 'axios';

import { AuthContext, authReducer } from '@/context/auth';
import { alertSnack } from '@/utils';

import { IUser } from '@/interfaces';

export interface AuthState {
    authenticated: boolean;
    user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
    authenticated: false,
    user: undefined,
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const router = useRouter();

    const { data, status } = useSession();

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user! as IUser })

            const alertWelcome = localStorage.getItem('alertShow');
            if (!alertWelcome) {
                setTimeout(() => {
                    alertSnack(`Bienvenido ${data?.user?.name!}`, 'success');
                }, 1500);
                localStorage.setItem('alertShow', 'true');
            }
        }
    }, [status])

    const loginUser = async (email: string, password: string) => {
        try {
            const resp = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (resp?.error) {
                alertSnack('Usuario o contraseña incorrectos', 'error');
            } else {
                router.replace('/');
            }
        } catch (error) {
            console.log(error);
            alertSnack('Error del servidor, comunicarse con un administrador.', 'error');
        }
    }

    const registerUser = async (name: string, email: string, password: string) => {
        try {
            const { data } = await axios.post('/api/auth/register', { name, email, password })
            dispatch({ type: '[Auth] - Login', payload: data.user });
            await signIn('credentials', { email, password });
        } catch (error) {
            if (isAxiosError(error)) {
                return alertSnack(error.response?.data.message, 'error')
            }
        }
    }

    const logoutUser = async () => {
        await signOut();
        dispatch({ type: '[Auth] - Logout' });
        localStorage.removeItem('alertShow')
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            loginUser,
            logoutUser,
            registerUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
};