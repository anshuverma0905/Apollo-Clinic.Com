import React from 'react';
import { Phone, Star, Calendar, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface NavbarProps {
  onBookClick: () => void;
  onReviewsClick: () => void;
  onServicesClick: () => void;
  onLocationClick: () => void;
}

export default function Navbar({ onBookClick, onReviewsClick, onServicesClick, onLocationClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200" id="clinic-navbar">
      {/* Top Banner with timing */}
      <div className="bg-blue-950 text-white text-[11px] py-2 px-4 border-b border-blue-900 font-sans tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="font-bold text-slate-200">Opens 8:00 AM • Colaba Branch, South Mumbai</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200">
            <a href={`tel:${CLINIC_INFO.phone}`} className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors font-bold">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              <span>{CLINIC_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-blue-900 font-display">
              APOLLO CLINIC
            </span>
            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-slate-400 font-sans">
              Colaba, Mumbai
            </span>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2">
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-black text-slate-900">{CLINIC_INFO.rating}</span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span>{CLINIC_INFO.totalReviews} Global Reviews</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={onServicesClick}
              className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-900 px-2 py-1 transition-all cursor-pointer"
              id="nav-services-btn"
            >
              Services
            </button>
            <button
              onClick={onReviewsClick}
              className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-900 px-2 py-1 transition-all cursor-pointer"
              id="nav-reviews-btn"
            >
              Reviews
            </button>
            <button
              onClick={onLocationClick}
              className="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-900 px-2 py-1 transition-all cursor-pointer"
              id="nav-location-btn"
            >
              Contact
            </button>

            {/* Quick Action Book Appointment Button */}
            <button
              onClick={onBookClick}
              className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer hover:shadow-lg active:scale-95"
              id="nav-book-appointment-btn"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Online</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
