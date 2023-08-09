import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext<User | null>(null);

interface Props {
    children?: ReactNode
}

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        };
    }, []);

    return (
        <AuthContext.Provider value={ currentUser }>
            { children }
        </AuthContext.Provider>
    )
};