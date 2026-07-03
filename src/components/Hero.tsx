import React from 'react';
import { Calendar, Phone, MapPin, Award, Shield, Users, Clock, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data';

interface HeroProps {
  onBookClick: () => void;
  onLocationClick: () => void;
}

export default function Hero({ onBookClick, onLocationClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200" id="clinic-hero">
      {/* Subtle layout grid background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_20%,rgba(30,58,138,0.04),rgba(255,255,255,0))]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-fade-in">
          
          {/* Left Section: Large Typography & Details */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-8">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 text-blue-800 text-xs font-black uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>Ranked #1 Clinic • Colaba, Mumbai</span>
            </div>

            {/* Huge Display Heading */}
            <div className="space-y-4">
              <h1 className="text-[64px] sm:text-[80px] lg:text-[100px] font-black leading-[0.85] tracking-tighter text-blue-900 font-display">
                CARE<br />
                BEYOND<br />
                <span className="text-blue-800 text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-900">CURE.</span>
              </h1>
              <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl">
                Apollo Clinic Colaba offers world-class clinical care, experienced specialist doctors, multi-profile full body checkups, and fast diagnostic tests. Experience premium healthcare with digital reports shared within an hour.
              </p>
            </div>

            {/* Google Rating Overview with Yellow Accent Box */}
            <div className="flex items-center gap-4 bg-white p-4 border border-slate-200 shadow-sm">
              <div className="bg-yellow-400 text-slate-900 px-4 py-2 font-black text-2xl font-display leading-none">
                {CLINIC_INFO.rating}
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-500 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {CLINIC_INFO.totalReviews} Global Reviews
                </span>
              </div>
            </div>

            {/* Quick Location & Status Info (Stark Thick Borders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full pt-2">
              <div className="border-l-4 border-blue-800 pl-4 py-1">
                <p className="text-[11px] uppercase font-black text-slate-400 tracking-wider mb-1">Clinic Location</p>
                <p className="text-xs font-bold leading-relaxed text-slate-800">
                  Ground Floor, Eucharistic Congress Bldg 1, Convent Street, Apollo Bandar, Colaba, Mumbai 400001
                </p>
              </div>
              <div className="border-l-4 border-blue-800 pl-4 py-1">
                <p className="text-[11px] uppercase font-black text-slate-400 tracking-wider mb-1">Branch Status</p>
                <p className="text-xs font-bold text-slate-800">
                  Currently Closed<br />
                  <span className="text-blue-800 font-extrabold">Opens 8:00 AM, Friday</span>
                </p>
              </div>
            </div>

            {/* Core Action Buttons with Stark Rectangular Styles */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-4">
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2.5 bg-blue-800 hover:bg-blue-900 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer shadow-md"
                id="hero-book-btn"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer"
                id="hero-call-btn"
              >
                <Phone className="w-4 h-4 text-blue-800" />
                <span>Call {CLINIC_INFO.phoneFormatted}</span>
              </a>

              <button
                onClick={onLocationClick}
                className="flex items-center justify-center gap-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-widest px-8 py-4.5 transition-all cursor-pointer"
                id="hero-location-btn"
              >
                <MapPin className="w-4 h-4 text-blue-800" />
                <span>Find Clinic</span>
              </button>
            </div>
          </div>

          {/* Right Section: Hero Image & Key Metrics */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hero Image Block */}
            <div className="bg-white border-4 border-slate-950 p-2 shadow-sm relative group">
              <img
                src="/src/assets/images/clinic_doctor_hero_1783095470282.jpg"
                alt="Apollo Clinic Colaba Specialist Doctor"
                className="w-full h-auto object-cover border-2 border-slate-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-slate-950 text-white border border-slate-800 px-3 py-1 text-[9px] font-black uppercase tracking-widest">
                Apollo Bandar Medical Team
              </div>
            </div>

            {/* Stark Grid of Core Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {/* Metric 1 - Brand */}
              <div className="bg-white p-4 border-2 border-slate-200 flex flex-col justify-between space-y-2">
                <Shield className="w-4 h-4 text-blue-900" />
                <div>
                  <span className="block text-lg font-black text-blue-900 font-display uppercase tracking-tight">APOLLO</span>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Healthcare Brand</span>
                </div>
              </div>

              {/* Metric 2 - Speed */}
              <div className="bg-white p-4 border-2 border-slate-200 flex flex-col justify-between space-y-2">
                <Clock className="w-4 h-4 text-blue-900" />
                <div>
                  <span className="block text-lg font-black text-blue-900 font-display uppercase tracking-tight">1 HOUR</span>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Lab Report Email</span>
                </div>
              </div>

              {/* Metric 3 - Patients */}
              <div className="bg-white p-4 border-2 border-slate-200 flex flex-col justify-between space-y-2">
                <Users className="w-4 h-4 text-blue-900" />
                <div>
                  <span className="block text-lg font-black text-blue-900 font-display uppercase tracking-tight">870+</span>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Happy Patients</span>
                </div>
              </div>

              {/* Metric 4 - Experience */}
              <div className="bg-white p-4 border-2 border-slate-200 flex flex-col justify-between space-y-2">
                <Award className="w-4 h-4 text-blue-900" />
                <div>
                  <span className="block text-lg font-black text-blue-900 font-display uppercase tracking-tight">15+ YRS</span>
                  <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Average Exp.</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
