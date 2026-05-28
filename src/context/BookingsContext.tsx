'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Booking } from '@/lib/mockData';

interface BookingsContextType {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    cancelBooking: (id: string) => void;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export function BookingsProvider({ children }: { children: ReactNode }) {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const addBooking = (booking: Booking) => {
        setBookings(prev => [...prev, booking]);
    };

    const cancelBooking = (id: string) => {
        setBookings(prev => prev.filter(b => b.id !== id));
    };

    return (
        <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking }}>
            {children}
        </BookingsContext.Provider>
    );
}

export const useBookings = () => {
    const context = useContext(BookingsContext);
    if (context === undefined) {
        throw new Error('useBookings must be used within a BookingsProvider');
    }
    return context;
};
