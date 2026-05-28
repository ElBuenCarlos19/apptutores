import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TutorCard } from '@/components/tutors/TutorCard'
import { mockTutors } from '@/lib/mockData'
import { ArrowRight, ShieldCheck, Video, Clock } from 'lucide-react'

export default function Home() {
  const topTutors = mockTutors.filter(t => t.rating > 4.7).slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />
        <div className="absolute top-0 right-0 -mr-72 -mt-72 w-[800px] h-[800px] rounded-full bg-indigo-100/50 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 -ml-72 -mb-72 w-[600px] h-[600px] rounded-full bg-purple-100/50 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium w-fit">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Plataforma líder en tutorías online
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Aprende <span className="gradient-text border-b-4 border-indigo-200">cualquier cosa</span> con expertos
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
              Conecta con los mejores tutores y acelera tu aprendizaje. Clases en vivo, horarios flexibles y 100% garantizado.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link href="/tutors" className="w-full">
                <Button size="lg" className="w-full text-lg shadow-indigo-200 shadow-xl gap-2 font-bold group">
                  Encontrar un Tutor
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative lg:h-[600px] hidden lg:flex justify-center items-center">
            {/* Visual */}
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 rotate-6 shadow-2xl opacity-20 transform transition duration-500 hover:rotate-12"></div>
              <div className="absolute inset-0 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-2xl overflow-hidden flex flex-col p-8 justify-between z-10">
                <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-xl">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-200 animate-pulse"></div>
                    <div>
                      <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-8 w-24 bg-indigo-100 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-40 bg-purple-50 rounded-2xl"></div>
                  <div className="h-40 bg-indigo-50 rounded-2xl"></div>
                </div>
                <div className="h-12 bg-indigo-500 rounded-xl w-full text-white font-bold flex items-center justify-center shadow-inner">Clases en Vivo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Calidad Garantizada</h3>
            <p className="text-slate-600">Todos nuestros tutores pasan por un riguroso proceso de verificación.</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <Video size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Clases en Vivo</h3>
            <p className="text-slate-600">Sesiones interactivas con herramientas de pizarra y compartimiento de pantalla.</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Horario Flexible</h3>
            <p className="text-slate-600">Aprende a tu propio ritmo, reserva clases cuando mejor te convenga.</p>
          </div>
        </div>
      </section>

      {/* Top Tutors Section */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Tutores Destacados</h2>
            <p className="text-slate-600">Aprende con los profesionales mejor valorados</p>
          </div>
          <Link href="/tutors">
            <Button variant="outline" className="hidden sm:flex gap-2">
              Ver todos <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/tutors">
            <Button variant="outline" className="w-full gap-2">
              Ver todos los tutores <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  )
}
