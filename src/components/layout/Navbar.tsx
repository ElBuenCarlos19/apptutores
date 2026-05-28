'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { LogOut, BookOpen, User as UserIcon } from 'lucide-react';

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed w-full z-50 top-0 border-b border-white/20 bg-white/70 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight text-slate-800 hover:opacity-80 transition-opacity">
                    App<span className="text-indigo-600">Tutores</span>
                </Link>
                <div className="flex gap-4 items-center">
                    <Link href="/tutors" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 flex items-center gap-2">
                        <BookOpen size={18} />
                        Explorar
                    </Link>
                    {user ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2 flex items-center gap-2">
                                <UserIcon size={18} />
                                Dashboard
                            </Link>
                            <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                                <LogOut size={16} /> Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">Iniciar Sesión</Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="default" size="sm">Registrarse</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
