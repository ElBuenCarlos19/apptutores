import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { BookingsProvider } from '@/context/BookingsContext'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'AppTutores - Aprende a tu ritmo',
  description: 'Plataforma para conectar estudiantes con tutores programados o bajo demanda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased font-sans min-h-screen flex flex-col pt-16">
        <AuthProvider>
          <BookingsProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </BookingsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
