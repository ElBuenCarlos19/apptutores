'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { mockTutors, generateMeetLink } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';
import { useBookings } from '@/context/BookingsContext';
import { Button } from '@/components/ui/Button';
import { Star, Clock, Book, CheckCircle, ArrowLeft, Calendar, Video } from 'lucide-react';
import Link from 'next/link';

function getNextDays(count: number) {
    const days: { label: string; value: string; dayName: string }[] = [];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    for (let i = 0; i < count; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        days.push({
            label: `${d.getDate()}/${d.getMonth() + 1}`,
            value: d.toISOString().split('T')[0],
            dayName: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : dayNames[d.getDay()],
        });
    }
    return days;
}

const AVAILABLE_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

export default function TutorProfilePage() {
    const params = useParams();
    const id = params?.id;
    const router = useRouter();
    const { user } = useAuth();
    const { addBooking } = useBookings();

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [booked, setBooked] = useState(false);

    const tutor = mockTutors.find(t => t.id === id);
    const days = getNextDays(7);

    if (!tutor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Tutor no encontrado</h2>
                    <Button onClick={() => router.push('/tutors')} variant="outline">Volver a la lista</Button>
                </div>
            </div>
        )
    }

    const handleBook = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (!selectedDate || !selectedTime) return;

        const meetLink = generateMeetLink();
        const dateObj = new Date(selectedDate + 'T00:00:00');
        const dateLabel = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

        addBooking({
            id: `b${Date.now()}`,
            tutorId: tutor.id,
            tutorName: tutor.name,
            tutorAvatar: tutor.avatarUrl || '',
            subject: tutor.subjects[0],
            date: dateLabel,
            time: selectedTime,
            meetLink,
            status: 'upcoming',
        });

        setBooked(true);
        setTimeout(() => router.push('/dashboard'), 1500);
    };

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] pb-20">
            {/* Cover */}
            <div className="h-64 bg-indigo-900 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-violet-800 opacity-95"></div>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>
                </div>
                <div className="absolute inset-x-0 bottom-6 max-w-7xl mx-auto px-6">
                    <Link href="/tutors" className="inline-flex items-center gap-2 text-indigo-200 hover:text-white mb-4 text-sm font-medium transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit">
                        <ArrowLeft size={16} /> Volver a Tutores
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Info */}
                        <div className="glass-card p-8 border-white bg-white/90">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <img src={tutor.avatarUrl} alt={tutor.name} className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white" />
                                <div className="flex-1 mt-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{tutor.name}</h1>
                                            <div className="flex items-center gap-1 text-sm text-amber-500 font-medium mt-2 bg-amber-50 px-3 py-1 rounded-full w-fit border border-amber-100 shadow-sm">
                                                <Star size={16} className="fill-amber-500" /> {tutor.rating} <span className="text-amber-700/70 font-normal ml-1">({tutor.reviews} reseñas)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {tutor.subjects.map(sub => (
                                            <span key={sub} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-100 flex items-center gap-1.5">
                                                <Book size={14} /> {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Sobre {tutor.name.split(' ')[0]}</h2>
                                <p className="text-slate-600 leading-relaxed text-lg max-w-3xl">
                                    {tutor.bio}
                                </p>
                            </div>
                        </div>

                        {/* Date Selector */}
                        <div className="glass-card p-8 border-white bg-white/90">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar className="text-indigo-600" /> Selecciona una Fecha
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-7 gap-3">
                                {days.map(d => (
                                    <button
                                        key={d.value}
                                        onClick={() => { setSelectedDate(d.value); setSelectedTime(''); }}
                                        className={`p-3 rounded-xl text-center transition-all font-medium border-2 ${selectedDate === d.value
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                                                : 'border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-600'
                                            }`}
                                    >
                                        <div className="text-xs uppercase tracking-wider mb-1 opacity-70">{d.dayName}</div>
                                        <div className="text-lg font-bold">{d.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Selector */}
                        {selectedDate && (
                            <div className="glass-card p-8 border-white bg-white/90 animate-in fade-in">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Clock className="text-indigo-600" /> Selecciona una Hora
                                </h2>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                                    {AVAILABLE_TIMES.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedTime(t)}
                                            className={`p-4 border-2 rounded-xl text-center transition-all font-bold cursor-pointer ${selectedTime === t
                                                    ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                                    : 'border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 hover:shadow-md'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="glass-card p-8 border-indigo-100 bg-white sticky top-24 shadow-2xl shadow-indigo-100/40">
                            <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100">
                                <span className="text-slate-500 font-medium">Precio por hora</span>
                                <span className="text-4xl font-black text-indigo-600">${tutor.hourlyRate}</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-4 text-slate-600">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle size={16} /></div>
                                    <span className="font-medium">Clase en vivo (1 hora)</span>
                                </li>
                                <li className="flex items-start gap-4 text-slate-600">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle size={16} /></div>
                                    <span className="font-medium">Material de estudio incluido</span>
                                </li>
                                <li className="flex items-start gap-4 text-slate-600">
                                    <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle size={16} /></div>
                                    <span className="font-medium">Link de Google Meet incluido</span>
                                </li>
                            </ul>

                            {/* Selection summary */}
                            {selectedDate && selectedTime && !booked && (
                                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                    <p className="text-sm font-semibold text-indigo-800 mb-1">Tu reserva:</p>
                                    <p className="text-sm text-indigo-600">
                                        📅 {days.find(d => d.value === selectedDate)?.dayName} {days.find(d => d.value === selectedDate)?.label} a las {selectedTime}
                                    </p>
                                </div>
                            )}

                            {booked ? (
                                <div className="w-full h-14 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 text-lg font-bold">
                                    <CheckCircle size={20} /> ¡Reservado!
                                </div>
                            ) : (
                                <Button
                                    size="lg"
                                    className={`w-full h-14 text-lg gap-2 shadow-xl shadow-indigo-200/50 ${(!selectedDate || !selectedTime) ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    onClick={handleBook}
                                    disabled={!selectedDate || !selectedTime}
                                >
                                    <Video size={20} />
                                    {!selectedDate ? 'Selecciona fecha y hora' : !selectedTime ? 'Selecciona una hora' : 'Confirmar Reserva'}
                                </Button>
                            )}
                            <div className="text-center text-xs text-slate-400 mt-5 font-semibold uppercase tracking-wider">
                                Reserva sujeta a disponibilidad
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
