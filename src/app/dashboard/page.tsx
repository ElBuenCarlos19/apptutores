'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/context/BookingsContext';
import { Button } from '@/components/ui/Button';
import { Clock, CheckCircle, Video, Calendar, X, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const { bookings, cancelBooking } = useBookings();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div></div>;

    const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
    const totalBookings = bookings.length;

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center gap-6 mb-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-indigo-100 shadow-md relative z-10" />
                    <div className="relative z-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">¡Hola, {user.name}!</h1>
                        <p className="text-slate-600 mt-1 capitalize font-medium">Perfil de {user.role}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Upcoming Classes */}
                        <div className="glass-card p-8 border-slate-200 border bg-white">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Clock className="text-indigo-600" /> Próximas Clases
                            </h2>

                            {upcomingBookings.length === 0 ? (
                                <div className="text-center py-16 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-400">
                                        <Clock size={32} />
                                    </div>
                                    <p className="text-slate-500 mb-6 font-medium">No tienes clases programadas actualmente.</p>
                                    <Link href="/tutors">
                                        <Button size="lg" className="shadow-lg shadow-indigo-100 font-semibold">Explorar Tutores</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingBookings.map(booking => (
                                        <div key={booking.id} className="bg-gradient-to-r from-white to-indigo-50/30 border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all relative group">
                                            <div className="flex flex-col sm:flex-row gap-5 items-start">
                                                <img
                                                    src={booking.tutorAvatar}
                                                    alt={booking.tutorName}
                                                    className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-100 shadow-sm"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-slate-900">{booking.tutorName}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100">
                                                                    <BookOpen size={12} className="inline mr-1" />{booking.subject}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => cancelBooking(booking.id)}
                                                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                                            title="Cancelar reserva"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                                                            <Calendar size={14} className="text-indigo-500" />
                                                            <span className="font-medium">{booking.date}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                                                            <Clock size={14} className="text-indigo-500" />
                                                            <span className="font-medium">{booking.time}</span>
                                                        </div>
                                                    </div>

                                                    {/* Meet Link */}
                                                    <div className="mt-4">
                                                        <a
                                                            href={booking.meetLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 text-green-700 rounded-xl hover:bg-green-100 hover:border-green-300 transition-all text-sm font-semibold group/link"
                                                        >
                                                            <Video size={16} className="text-green-600" />
                                                            Unirse a Google Meet
                                                            <ExternalLink size={14} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                                                        </a>
                                                        <p className="text-xs text-slate-400 mt-2 font-mono">{booking.meetLink}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="text-center pt-4">
                                        <Link href="/tutors">
                                            <Button variant="outline" className="gap-2">
                                                <BookOpen size={16} /> Agendar otra clase
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <div className="glass-card p-8 border-slate-200 border bg-white">
                            <h2 className="text-lg font-bold text-slate-900 mb-5">Mis Estadísticas</h2>
                            <div className="space-y-4">
                                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between transition-colors hover:border-indigo-200">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="text-indigo-500" size={24} />
                                        <span className="font-semibold text-slate-700">Clases agendadas</span>
                                    </div>
                                    <span className="text-2xl font-black text-indigo-600">{upcomingBookings.length}</span>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between transition-colors hover:border-indigo-200">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="text-green-500" size={24} />
                                        <span className="font-semibold text-slate-700">Total reservas</span>
                                    </div>
                                    <span className="text-2xl font-black text-green-600">{totalBookings}</span>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center justify-between transition-colors hover:border-indigo-200">
                                    <div className="flex items-center gap-3">
                                        <Video className="text-emerald-500" size={24} />
                                        <span className="font-semibold text-slate-700">Links de Meet</span>
                                    </div>
                                    <span className="text-2xl font-black text-emerald-600">{upcomingBookings.length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick info */}
                        <div className="glass-card p-8 border-slate-200 border bg-white">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">💡 Información</h2>
                            <div className="space-y-3 text-sm text-slate-600">
                                <p className="flex items-start gap-2">
                                    <span className="text-indigo-500 mt-0.5">•</span>
                                    Cada reserva genera un link de Google Meet automáticamente.
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-indigo-500 mt-0.5">•</span>
                                    Puedes cancelar una clase antes de que inicie.
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="text-indigo-500 mt-0.5">•</span>
                                    Las clases duran 1 hora con soporte incluido.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
