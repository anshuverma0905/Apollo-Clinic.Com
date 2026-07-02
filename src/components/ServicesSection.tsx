import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { ClipboardCheck, Sparkles, Stethoscope, Activity, TestTube, CalendarCheck } from 'lucide-react';

interface ServicesSectionProps {
  onServiceSelect: (service: Service) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Offerings', icon: ClipboardCheck },
    { id: 'Consultation', label: 'Consultations', icon: Stethoscope },
    { id: 'Health Checkup', label: 'Health Checkups', icon: Sparkles },
    { id: 'Diagnostics', label: 'Diagnostics', icon: Activity },
    { id: 'Lab Tests', label: 'Pathology Tests', icon: TestTube }
  ];

  const filteredServices = SERVICES.filter((srv) => {
    if (activeTab === 'all') return true;
    return srv.category === activeTab;
  });

  return (
    <div className="bg-white py-16 border-t border-slate-200" id="clinic-services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left max-w-4xl space-y-4 mb-12">
          <span className="text-xs font-black text-blue-800 uppercase tracking-widest block border-l-4 border-blue-800 pl-3">
            Comprehensive Medical Diagnostics
          </span>
          <h3 className="text-3xl sm:text-5xl font-black text-blue-900 tracking-tighter font-display uppercase leading-none">
            OUR SPECIALTIES & SERVICE PACKAGES
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl font-medium leading-relaxed">
            Apollo Clinic Colaba combines state-of-the-art pathology, high-precision imaging systems, and experienced specialist doctors to manage all your clinical needs.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-start items-center gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 border-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-blue-900 border-blue-900 text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border-2 border-slate-200 p-6 hover:border-blue-900 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex justify-between items-start gap-4">
                  <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 border ${
                    srv.category === 'Consultation' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                    srv.category === 'Health Checkup' ? 'bg-yellow-100 text-slate-900 border-yellow-300 font-black' :
                    srv.category === 'Diagnostics' ? 'bg-slate-100 text-slate-800 border-slate-300' :
                    'bg-purple-50 text-purple-800 border-purple-200'
                  }`}>
                    {srv.category}
                  </span>
                  
                  {srv.price && (
                    <span className="text-lg font-black text-blue-900 font-display">{srv.price}</span>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-base uppercase tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
                    {srv.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {srv.description}
                  </p>
                </div>
              </div>

              {/* Action and specs */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                  Est. time: {srv.duration}
                </span>

                <button
                  onClick={() => onServiceSelect(srv)}
                  className="flex items-center gap-1.5 bg-white border-2 border-slate-200 hover:border-blue-900 text-slate-800 hover:bg-blue-900 hover:text-white font-black text-[10px] uppercase tracking-wider px-3.5 py-2 transition-all cursor-pointer active:scale-95"
                  id={`srv-book-btn-${srv.id}`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Corporate Banner */}
        <div className="mt-12 bg-slate-50 border-2 border-slate-300 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h4 className="font-black text-blue-900 text-sm sm:text-base uppercase tracking-tight">Need a custom health package tailored to your workplace?</h4>
            <p className="text-xs text-slate-500 font-medium">We design corporate health checkup panels, wellness programs, and onsite diagnostic screenings in Colaba.</p>
          </div>
          <a
            href="tel:02222021122"
            className="bg-blue-800 hover:bg-blue-900 text-white font-black text-[11px] uppercase tracking-widest py-3.5 px-6 whitespace-nowrap transition-all cursor-pointer"
          >
            Inquire Corporate Plan
          </a>
        </div>

      </div>
    </div>
  );
}
