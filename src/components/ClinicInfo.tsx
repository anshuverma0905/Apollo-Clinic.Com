import React, { useState } from 'react';
import { MapPin, Phone, Clock, ShieldCheck, Copy, Check, HeartHandshake, Compass } from 'lucide-react';
import { CLINIC_INFO } from '../data';

export default function ClinicInfo() {
  const [copiedText, setCopiedText] = useState<string>('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="bg-white py-16" id="clinic-location-details-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Clinic Timings & Access (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1 text-blue-800 text-xs font-black uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5" />
                <span>Directions & Timings</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-black text-blue-900 tracking-tighter font-display uppercase leading-none">
                VISIT OUR COLABA CLINIC
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                We are situated at the ground floor for easy wheelchair accessibility. Located in Apollo Bandar, near Mumbai's historic Gateway of India.
              </p>
            </div>

            {/* Address Cards */}
            <div className="space-y-4">
              <div className="bg-slate-50 border-2 border-slate-200 p-5 flex items-start gap-4 hover:border-blue-900 transition-all">
                <div className="w-10 h-10 bg-blue-900 text-white flex items-center justify-center shrink-0 font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Exact Address</span>
                  <p className="text-sm text-slate-900 font-black uppercase tracking-tight leading-relaxed font-display">
                    {CLINIC_INFO.address}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs">
                    <button
                      onClick={() => copyToClipboard(CLINIC_INFO.address, 'addr')}
                      className="text-blue-900 font-black uppercase tracking-wider text-[10px] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {copiedText === 'addr' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                    <span className="text-slate-300">|</span>
                    <a
                      href={CLINIC_INFO.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 font-black uppercase tracking-wider text-[10px] hover:underline flex items-center gap-0.5"
                    >
                      Open in Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Timing info */}
              <div className="bg-slate-50 border-2 border-slate-200 p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-400 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Working Hours</span>
                  <div className="space-y-1">
                    {CLINIC_INFO.timings.map((t) => (
                      <div key={t.days} className="flex justify-between text-xs text-slate-700 font-bold uppercase tracking-wider">
                        <span>{t.days}:</span>
                        <span className="text-slate-950 font-black">{t.hours}</span>
                      </div>
                    ))}
                  </div>
                  <span className="block text-[10px] text-rose-600 font-black uppercase tracking-widest pt-1">
                    * Emergency consults are directed to Fortis / nearest partner hospital
                  </span>
                </div>
              </div>

              {/* Call contact */}
              <div className="bg-slate-50 border-2 border-slate-200 p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center shrink-0 font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone Booking & Help</span>
                  <p className="text-sm text-blue-900 font-black uppercase tracking-wider">{CLINIC_INFO.phoneFormatted} / 2202 1122</p>
                  <p className="text-xs text-slate-500 font-medium">Call for report delivery status, corporate health checkups or physician details.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Mockup (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 p-8 text-white relative overflow-hidden border-4 border-slate-950 lg:h-[480px] flex flex-col justify-between">
            {/* Background elements resembling radar or coordinates */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,165,233,0.15),transparent)]"></div>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-slate-950/40 border-l border-slate-800/80 z-0 hidden sm:block"></div>

            {/* Custom stylized mini map box */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 bg-yellow-400 text-slate-950 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest">
                  Location Map Guide
                </span>
                <h4 className="text-xl font-black uppercase tracking-wider font-display">Colaba Apollo Bandar Area</h4>
                <p className="text-xs text-slate-400 max-w-sm">
                  We are situated inside the Eucharistic Congress Building No. 1, Ground Floor. Directly opposite Convent Street.
                </p>
              </div>

              {/* Plus Code Indicator */}
              <div className="bg-slate-950 border-2 border-slate-800 p-3 text-right text-xs shrink-0">
                <span className="block text-[9px] text-slate-500 uppercase font-black tracking-widest">Google Plus Code</span>
                <strong className="text-yellow-400 tracking-wide font-mono block mt-0.5">{CLINIC_INFO.plusCode}</strong>
              </div>
            </div>

            {/* Simulated Map Illustration */}
            <div className="relative z-10 bg-slate-950 border-2 border-slate-800 h-56 w-full flex items-center justify-center overflow-hidden my-4">
              {/* Map grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="border border-white"></div>
                ))}
              </div>

              {/* Simulated Map Streets */}
              <div className="absolute h-1 bg-slate-800 w-full top-1/2 left-0 -translate-y-1/2 rotate-6"></div>
              <div className="absolute h-1 bg-slate-800 w-full top-1/4 left-0 -translate-y-1/2 -rotate-12"></div>
              <div className="absolute w-1 bg-slate-800 h-full left-1/3 top-0"></div>
              <div className="absolute w-1 bg-slate-800 h-full left-2/3 top-0 -rotate-12"></div>

              {/* Gateway of India label */}
              <div className="absolute right-4 bottom-4 bg-slate-800/85 border border-slate-700 px-2 py-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Gateway of India (~200m)
              </div>

              {/* Colaba Causeway */}
              <div className="absolute left-6 top-6 bg-slate-800/85 border border-slate-700 px-2 py-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Convent Street
              </div>

              {/* Apollo Clinic Pin */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="w-12 h-12 bg-sky-500/20 flex items-center justify-center animate-ping absolute"></div>
                <div className="w-10 h-10 bg-yellow-400 border-2 border-slate-950 flex items-center justify-center text-slate-950 shadow-lg relative z-10 font-bold">
                  <MapPin className="w-5 h-5 fill-slate-950 text-slate-950" />
                </div>
                <div className="bg-slate-900 border-2 border-slate-700 py-1.5 px-3 text-[10px] font-black uppercase tracking-wider mt-2 shadow-xl whitespace-nowrap">
                  Apollo Clinic Colaba
                </div>
              </div>
            </div>

            {/* Bottom Hospital Certifications */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-300">NABL Accredited Lab</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-yellow-400 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-300">ISO 9001:2015 Clinic</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
