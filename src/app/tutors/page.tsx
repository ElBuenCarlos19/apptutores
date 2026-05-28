'use client';
import { useState } from 'react';
import { TutorCard } from '@/components/tutors/TutorCard';
import { mockTutors } from '@/lib/mockData';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

export default function TutorsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTutors = mockTutors.filter(tutor =>
        tutor.subjects.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase())) ||
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Encuentra a tu Tutor Ideal</h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Explora nuestra lista de tutores expertos en diversas áreas. Usa el buscador para encontrar a alguien especializado en el tema que necesitas.
                    </p>
                </div>

                <div className="mb-10 max-w-2xl relative">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={24} />
                    <Input
                        type="text"
                        placeholder="Busca por materia, nombre o palabras clave..."
                        className="pl-14 py-7 text-lg rounded-2xl shadow-sm border-slate-200 bg-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredTutors.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTutors.map(tutor => (
                            <TutorCard key={tutor.id} tutor={tutor} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 glass-card border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-700 mb-3">No se encontraron tutores</h3>
                        <p className="text-slate-500">Prueba con otras palabras clave o materias para encontrar tu tutor ideal.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
