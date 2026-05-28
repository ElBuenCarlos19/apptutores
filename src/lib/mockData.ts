export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor';
  avatarUrl?: string;
}

export interface Tutor extends User {
  bio: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviews: number;
}

export const mockUsers: User[] = [
  { id: 'u1', name: 'Juan Pérez', email: 'juan@example.com', role: 'student', avatarUrl: 'https://i.pravatar.cc/150?u=u1' },
];

export const mockTutors: Tutor[] = [
  {
    id: 't1',
    name: 'Ana Gómez',
    email: 'ana@example.com',
    role: 'tutor',
    bio: 'Experta en matemáticas aplicadas con 5 años de experiencia dando clases universitarias.',
    subjects: ['Matemáticas', 'Física'],
    hourlyRate: 20,
    rating: 4.9,
    reviews: 34,
    avatarUrl: 'https://i.pravatar.cc/150?u=t1'
  },
  {
    id: 't2',
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    role: 'tutor',
    bio: 'Desarrollador Full Stack. Te enseño a programar desde cero hasta nivel profesional.',
    subjects: ['Programación', 'Desarrollo Web'],
    hourlyRate: 25,
    rating: 4.8,
    reviews: 12,
    avatarUrl: 'https://i.pravatar.cc/150?u=t2'
  },
  {
    id: 't3',
    name: 'María López',
    email: 'maria@example.com',
    role: 'tutor',
    bio: 'Profesora nativa de inglés. Clases de conversación, gramática y preparación para el TOEFL.',
    subjects: ['Inglés'],
    hourlyRate: 15,
    rating: 5.0,
    reviews: 56,
    avatarUrl: 'https://i.pravatar.cc/150?u=t3'
  },
  {
    id: 't4',
    name: 'Javier Castillo',
    email: 'javier@example.com',
    role: 'tutor',
    bio: 'Especialista en química orgánica. Metodología práctica y adaptada a tus necesidades.',
    subjects: ['Química'],
    hourlyRate: 18,
    rating: 4.7,
    reviews: 21,
    avatarUrl: 'https://i.pravatar.cc/150?u=t4'
  }
];

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: string;
  time: string;
  meetLink: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export function generateMeetLink(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const seg = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
}
