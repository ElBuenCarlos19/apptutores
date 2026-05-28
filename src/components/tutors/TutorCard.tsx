import Link from 'next/link'
import { Tutor } from '@/lib/mockData'
import { Star, Clock, Book } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function TutorCard({ tutor }: { tutor: Tutor }) {
    return (
        <div className="glass-card flex flex-col overflow-hidden h-full group">
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                        <img src={tutor.avatarUrl} alt={tutor.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 group-hover:border-indigo-300 transition-colors" />
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{tutor.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-amber-500 font-medium mt-1">
                                <Star size={16} className="fill-amber-500" /> {tutor.rating} <span className="text-slate-400 font-normal">({tutor.reviews} reseñas)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-indigo-600">${tutor.hourlyRate}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">/ hora</div>
                    </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow relative">
                    {tutor.bio}
                    <span className="absolute bottom-0 right-0 w-8 h-full bg-gradient-to-l from-white/90 to-transparent"></span>
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                    {tutor.subjects.map(sub => (
                        <span key={sub} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100 flex items-center gap-1">
                            <Book size={12} /> {sub}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex gap-3">
                <Link href={`/tutors/${tutor.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-white">Ver Perfil</Button>
                </Link>
                <Link href={`/tutors/${tutor.id}?book=true`} className="flex-1">
                    <Button variant="default" className="w-full flex items-center gap-2 shadow-indigo-200 shadow-lg hover:shadow-indigo-300">
                        <Clock size={16} /> Reservar
                    </Button>
                </Link>
            </div>
        </div>
    )
}
