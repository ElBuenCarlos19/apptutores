'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && name) {
            // Mock un login directo al crearlo
            login(email);
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -ml-96 -mt-96 w-[800px] h-[800px] rounded-full bg-purple-400/20 blur-3xl -z-10" />

            <div className="w-full max-w-md p-8 glass-card">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Crea tu cuenta</h1>
                    <p className="text-slate-600">Únete a cientos de estudiantes y tutores.</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
                        <Input
                            type="text"
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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

                    <Button type="submit" size="lg" className="w-full font-bold mt-2">
                        Registrarse
                    </Button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Inicia sesión
                    </Link>
                </div>
            </div>
        </div>
    )
}
