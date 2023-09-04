import { createContext } from 'react';
import { IUser } from '@/interfaces';

interface ContextProps {
    authenticated: boolean;
    user?: IUser;
    
    registerUser: (name: string, email: string, password: string) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps );