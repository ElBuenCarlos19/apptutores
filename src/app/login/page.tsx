'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            login(email);
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -ml-96 -mt-96 w-[800px] h-[800px] rounded-full bg-indigo-400/20 blur-3xl -z-10" />

            <div className="w-full max-w-md p-8 glass-card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Bienvenido de nuevo</h1>
                    <p className="text-slate-600">Ingresa a tu cuenta para continuar aprendiendo.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
                        <Input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm mb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                            <span className="text-slate-600">Recordarme</span>
                        </label>
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">¿Olvidaste tu contraseña?</a>
                    </div>

                    <Button type="submit" size="lg" className="w-full font-bold">
                        Iniciar Sesión
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-600">
                    ¿No tienes una cuenta?{' '}
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    )
}
