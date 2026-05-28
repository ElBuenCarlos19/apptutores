'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUsers } from '@/lib/mockData';

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Inicializamos a null. En login cambiamos de estado.
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string) => {
        const existing = mockUsers.find(u => u.email === email);
        if (existing) {
            setUser(existing);
        } else {
            setUser({
                id: `u${Math.random().toString(36).substring(2, 9)}`,
                name: email.split('@')[0],
                email,
                role: 'student',
                avatarUrl: `https://i.pravatar.cc/150?u=${email}`
            });
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
