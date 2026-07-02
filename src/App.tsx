import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Phone, MapPin, Star, Clock, AlertCircle, FileText, CheckCircle, 
  Trash2, BookOpen, Languages, Shield, HelpCircle, ArrowRight, HeartPulse 
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import ServicesSection from './components/ServicesSection';
import ReviewsSection from './components/ReviewsSection';
import ClinicInfo from './components/ClinicInfo';
import { CLINIC_INFO } from './data';
import { Appointment } from './types';

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  
  // Section Refs for smooth scrolling
  const bookingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apollo_clinic_bookings');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load appointments', e);
      }
    }
  }, []);

  const handleBookingSuccess = (newBooking: Appointment) => {
    const updated = [newBooking, ...appointments];
    setAppointments(updated);
    localStorage.setItem('apollo_clinic_bookings', JSON.stringify(updated));
  };

  const handleCancelBooking = (id: string) => {
    const updated = appointments.filter((b) => b.id !== id);
    setAppointments(updated);
    localStorage.setItem('apollo_clinic_bookings', JSON.stringify(updated));
  };

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased" id="apollo-clinic-app">
      {/* Navbar */}
      <Navbar
        onBookClick={() => scrollToSection(bookingRef)}
        onReviewsClick={() => scrollToSection(reviewsRef)}
        onServicesClick={() => scrollToSection(servicesRef)}
        onLocationClick={() => scrollToSection(locationRef)}
      />

      {/* Hero Section */}
      <Hero
        onBookClick={() => scrollToSection(bookingRef)}
        onLocationClick={() => scrollToSection(locationRef)}
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Booking & Instructions Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-10" ref={bookingRef}>
            
            {/* Booking Wizard */}
            <div className="scroll-mt-28">
              <BookingForm onBookingSuccess={handleBookingSuccess} />
            </div>

            {/* Health Guidelines & Bilingual Help card (NABL Standards) */}
            <div className="bg-white border-2 border-slate-300 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-yellow-400 text-slate-950 flex items-center justify-center font-black">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-900 text-sm uppercase tracking-wider font-display">
                      {language === 'EN' ? 'Patient Guidelines' : 'मरीजों के लिए दिशानिर्देश'}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Instructions for pathology scans</p>
                  </div>
                </div>

                {/* Language Switcher */}
                <button
                  onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
                  className="flex items-center gap-1.5 bg-white border-2 border-slate-200 hover:border-slate-400 px-3 py-1.5 text-xs font-black text-slate-800 transition-all cursor-pointer uppercase tracking-wider"
                  id="language-toggle-btn"
                >
                  <Languages className="w-3.5 h-3.5 text-blue-900" />
                  <span>{language === 'EN' ? 'Hindi / हिंदी' : 'English / अंग्रेजी'}</span>
                </button>
              </div>

              {/* Guidelines translations */}
              {language === 'EN' ? (
                <div className="space-y-4 text-xs text-slate-600 font-medium">
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-900 text-white font-black flex items-center justify-center shrink-0 text-[10px]">1</span>
                    <p className="leading-relaxed">
                      <strong>Fasting Requirements:</strong> For blood glucose, HbA1c, or full body executive packages, please maintain complete fasting (only water allowed) for <strong>10 to 12 hours</strong> prior to your appointment.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-900 text-white font-black flex items-center justify-center shrink-0 text-[10px]">2</span>
                    <p className="leading-relaxed">
                      <strong>Report Dispatch:</strong> Most biochemical test reports are dispatched digitally to your registered email address within <strong>1 to 2 hours</strong>. X-Ray and Ultrasound reports will be handed over physically or emailed by evening.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-900 text-white font-black flex items-center justify-center shrink-0 text-[10px]">3</span>
                    <p className="leading-relaxed">
                      <strong>Documents to Carry:</strong> Kindly carry previous consultation summaries, prescriptions, and a government ID card (Aadhar, PAN, or Passport) for fast counter check-ins.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs text-slate-600 font-medium">
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-900 text-white font-black flex items-center justify-center shrink-0 text-[10px]">१</span>
                    <p className="leading-relaxed">
                      <strong>उपवास की आवश्यकता:</strong> ब्लड शुगर, लिपिड प्रोफाइल या फुल बॉडी चेकअप के लिए, कृपया टेस्ट से पहले कम से कम <strong>१० से १२ घंटे</strong> का उपवास रखें (केवल पानी की अनुमति है)।
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-900 text-white font-black flex items-center justify-center shrink-0 text-[10px]">२</span>
                    <p className="leading-relaxed">
                      <strong>डिजिटल रिपोर्ट:</strong> अधिकांश रक्त परीक्षणों की रिपोर्ट <strong>१ से २ घंटे</strong> के भीतर आपके पंजीकृत ईमेल पर भेज दी जाती है। एक्स-रे और सोनोग्राफी रिपोर्ट शाम तक मिल जाएगी।
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="w-5 h-5 bg-blue-900 text-white font-black flex items-center justify-center shrink-0 text-[10px]">३</span>
                    <p className="leading-relaxed">
                      <strong>आवश्यक दस्तावेज:</strong> तत्काल सहायता और पंजीकरण के लिए कृपया अपने पुराने पर्चे, पूर्व रिपोर्ट और कोई भी सरकारी पहचान पत्र (आधार या पैन कार्ड) अवश्य लाएं।
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Registrations Sidebar / Active Bookings (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Consultation Timing card */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 border-4 border-slate-950 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
              <div className="flex items-center gap-3 mb-4">
                <HeartPulse className="w-6 h-6 text-yellow-400 shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Fast-Check Clinic</span>
              </div>
              <h4 className="text-lg font-black uppercase tracking-tight font-display">Need assistance immediately?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-2 font-medium">
                If you are suffering from acute symptoms or need instant diagnostic bookings, speak directly with our Colaba frontdesk officers.
              </p>
              
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="text-center bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xs py-3.5 px-6 transition-all uppercase tracking-widest block"
                >
                  Call Clinic: {CLINIC_INFO.phoneFormatted}
                </a>
                <span className="text-slate-400 text-[10px] uppercase font-black tracking-wider block text-center sm:text-left">★ Walk-in open daily before 7:30 PM</span>
              </div>
            </div>

            {/* My Active Appointments Board */}
            <div className="bg-white border-2 border-slate-300 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-900" />
                  <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">My Registered Visits ({appointments.length})</h4>
                </div>
                {appointments.length > 0 && (
                  <span className="text-[9px] bg-yellow-400 text-slate-900 px-2 py-0.5 font-black uppercase tracking-wider">ACTIVE</span>
                )}
              </div>

              {appointments.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No active bookings registered in this browser session.</p>
                  <p className="text-[11px] text-slate-400 italic">Fill out the Booking Form to reserve your priority slot.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {appointments.map((app) => (
                    <div
                      key={app.id}
                      className="bg-slate-50 border-2 border-slate-200 p-4 relative space-y-2"
                    >
                      <button
                        onClick={() => handleCancelBooking(app.id)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-between pr-8">
                        <span className="text-[10px] font-black text-blue-900 font-mono tracking-wider">ID: {app.id}</span>
                        <span className="text-[9px] bg-blue-900 text-white px-2 py-0.5 font-black uppercase tracking-wider">
                          Confirmed
                        </span>
                      </div>

                      <div className="text-xs space-y-1 text-slate-600 font-medium">
                        <p><strong className="text-slate-900">Patient:</strong> {app.patientName}</p>
                        <p><strong className="text-slate-900">Consultant:</strong> {app.doctorName}</p>
                        <p><strong className="text-slate-900">Service:</strong> {app.serviceName}</p>
                        <p className="text-blue-900 font-black uppercase tracking-wider pt-1">
                          Timing: {new Date(app.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} @ {app.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Standard Badges */}
            <div className="bg-yellow-50 border-2 border-yellow-200 p-6 space-y-3">
              <h5 className="text-xs font-black text-blue-900 uppercase tracking-widest">Safety & Accreditation</h5>
              <ul className="space-y-2 text-xs text-slate-700 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>NABL Accreditated laboratory infrastructure</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>Fully-sterilized patient-wait spaces & clinic lounges</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-900 shrink-0" />
                  <span>Qualified nurses trained under Apollo brand protocols</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="scroll-mt-12">
        <ServicesSection onServiceSelect={(srv) => {
          scrollToSection(bookingRef);
        }} />
      </div>

      {/* Reviews Section */}
      <div ref={reviewsRef} className="scroll-mt-12">
        <ReviewsSection />
      </div>

      {/* Timings, Address, Contact & Map Section */}
      <div ref={locationRef} className="scroll-mt-12">
        <ClinicInfo />
      </div>

      {/* Footer Block */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t-4 border-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-base font-black text-white uppercase tracking-wider font-display">Apollo Clinic Colaba</span>
              <p className="text-xs leading-relaxed text-slate-400 font-medium">
                The Colaba Branch provides residents and visitors of South Mumbai with highly professional healthcare packages, NABL blood diagnostics, specialist physicians, and exceptional pediatric/obstetric care.
              </p>
            </div>
            
            <div className="space-y-2 font-medium">
              <span className="font-black text-white uppercase tracking-wider block">Quick Contact Details</span>
              <p>📍 {CLINIC_INFO.address}</p>
              <p>📞 Phone: {CLINIC_INFO.phoneFormatted} / 2202 1122</p>
              <p>✉️ Email: info.colaba@apolloclinic.com</p>
            </div>

            <div className="space-y-2 font-medium">
              <span className="font-black text-white uppercase tracking-wider block">Accreditation</span>
              <p>✅ NABL Certified Pathology</p>
              <p>🛡️ Apollo Brand Standard</p>
              <p>🌟 4.8 Stars (877+ Google Maps Reviews)</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-[10px] space-y-2 font-bold uppercase tracking-wider">
            <p>© {new Date().getFullYear()} Apollo Clinic Colaba, Mumbai. All rights reserved.</p>
            <p className="text-slate-600 max-w-xl mx-auto italic font-medium tracking-normal normal-case">
              Disclaimer: This is a visually high-fidelity, interactive, and completely client-functional preview representing the Apollo Clinic Colaba branch. In emergency medical scenarios, kindly seek immediate hospital assistance.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
