import { createContext } from 'react';

interface ContextProps {
    authenticated: boolean;
    registerUser: (name: string, email: string, password: string) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps );