export function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md mt-16 pb-8 pt-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-xl font-bold tracking-tight text-slate-800">
                    App<span className="text-indigo-600">Tutores</span>
                </div>
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} AppTutores. Todos los derechos reservados.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">Términos</a>
                    <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">Privacidad</a>
                </div>
            </div>
        </footer>
    );
}
