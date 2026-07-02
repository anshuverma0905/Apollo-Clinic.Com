import React, { useState } from 'react';
import { Calendar, User, ClipboardList, Clock, ArrowRight, ArrowLeft, CheckCircle, Smartphone, Mail, Sparkles } from 'lucide-react';
import { DOCTORS, SERVICES } from '../data';
import { Appointment, Doctor, Service } from '../types';

interface BookingFormProps {
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingForm({ onBookingSuccess }: BookingFormProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Patient details form state
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Generate next 7 days dynamically starting from today
  const getNext7Days = () => {
    const dates = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      
      // Format as YYYY-MM-DD for value
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      dates.push({
        value: dateStr,
        dayName: days[d.getDay()],
        dayNum: d.getDate(),
        monthName: months[d.getMonth()]
      });
    }
    return dates;
  };

  const datesList = getNext7Days();

  const timeSlots = [
    { label: 'Morning Slots', slots: ['08:30 AM', '09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'] },
    { label: 'Afternoon Slots', slots: ['02:15 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:00 PM'] },
    { label: 'Evening Slots', slots: ['05:45 PM', '06:15 PM', '06:45 PM', '07:15 PM', '07:45 PM'] }
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };

  const handleDateTimeSelect = () => {
    if (!selectedDate || !selectedTime) {
      setFormErrors({ date_time: 'Please select both date and time slot' });
      return;
    }
    setFormErrors({});
    setStep(4);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.name = 'Patient name is required';
    if (!patientPhone.trim()) {
      errors.phone = 'Mobile number is required';
    } else if (!/^\+?[0-9]{10,12}$/.test(patientPhone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!patientEmail.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(patientEmail)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookingId = `AP-${Math.floor(100000 + Math.random() * 900000)}`;
    const appointment: Appointment = {
      id: bookingId,
      patientName,
      patientPhone,
      patientEmail,
      doctorName: selectedDoctor ? selectedDoctor.name : 'Any Available Doctor',
      serviceName: selectedService ? selectedService.name : 'General Consultation',
      date: selectedDate,
      time: selectedTime,
      notes,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(appointment);
    onBookingSuccess(appointment);
    setStep(5);
  };

  const resetBookingForm = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setNotes('');
    setFormErrors({});
    setConfirmedBooking(null);
  };

  return (
    <div className="bg-white border-2 border-slate-300 overflow-hidden" id="appointment-booking-wizard">
      {/* Header Indicator */}
      <div className="bg-blue-950 p-6 text-white text-center relative border-b border-slate-200">
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider font-display">Book Clinic Visit Online</h3>
        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mt-1">Immediate Confirmation & Digital Report Delivery</p>

        {/* Progress Tracker (Not shown on final success step) */}
        {step < 5 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs font-black transition-all ${
                    step >= s ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s === 1 && "01"}
                  {s === 2 && "02"}
                  {s === 3 && "03"}
                  {s === 4 && "04"}
                </div>
                {s < 4 && <div className={`w-8 h-0.5 ${step > s ? 'bg-yellow-400' : 'bg-slate-800'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Main Form Area */}
      <div className="p-6 md:p-8">
        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900 border-l-4 border-blue-800 pl-3">
                Step 1: Choose a Medical Service or Health Checkup
              </h4>
              <span className="text-[10px] bg-slate-100 text-slate-800 px-3 py-1 font-bold uppercase tracking-wider">
                10 options available
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {SERVICES.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleServiceSelect(srv)}
                  className="group p-5 border-2 border-slate-200 hover:border-blue-900 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 ${
                        srv.category === 'Consultation' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        srv.category === 'Health Checkup' ? 'bg-yellow-100 text-slate-900 border border-yellow-300' :
                        srv.category === 'Diagnostics' ? 'bg-slate-100 text-slate-850 border border-slate-300' :
                        'bg-purple-50 text-purple-800 border border-purple-250'
                      }`}>
                        {srv.category}
                      </span>
                      {srv.price && (
                        <span className="text-sm font-black text-blue-900 font-display">{srv.price}</span>
                      )}
                    </div>
                    <h5 className="font-black text-slate-900 text-sm mt-2 group-hover:text-blue-900 transition-colors uppercase tracking-tight">{srv.name}</h5>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">{srv.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold pt-2 border-t border-slate-100">
                    <span>Duration: {srv.duration}</span>
                    <span className="text-blue-800 font-black uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Select <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DOCTOR */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(1)}
                className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-800 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">Step 2: Choose Specialist or Clinician</h4>
            </div>

            {selectedService && (
              <div className="p-3 bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Selected Service:</span>
                  <span className="font-black text-blue-900 ml-1 uppercase">{selectedService.name}</span>
                </div>
                <button onClick={() => setStep(1)} className="text-blue-800 font-black uppercase tracking-wider text-[10px] hover:underline cursor-pointer">Change</button>
              </div>
            )}

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
              {/* Optional: Skip/Any available doctor */}
              <div
                onClick={() => handleDoctorSelect({
                  id: 'any',
                  name: 'General Practitioner / Duty Officer',
                  specialty: 'Next Available Medical Officer',
                  qualification: 'MBBS, Clinical Registrar',
                  experience: 'Immediate consultation',
                  availability: 'Available throughout working hours',
                  avatar: ''
                })}
                className="p-4 border-2 border-slate-200 hover:border-blue-900 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 text-blue-900 flex items-center justify-center font-bold text-lg">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900 text-sm uppercase tracking-tight">Next Available Duty Doctor</h5>
                    <p className="text-xs text-slate-500 font-medium">Fastest clinical consulting visit, no specified specialist required</p>
                  </div>
                </div>
                <span className="text-xs text-blue-800 font-black uppercase tracking-wider flex items-center gap-0.5">
                  Select <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              {DOCTORS.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleDoctorSelect(doc)}
                  className="p-4 border-2 border-slate-200 hover:border-blue-900 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover bg-slate-100 border-2 border-slate-200"
                    />
                    <div>
                      <h5 className="font-black text-slate-900 text-sm uppercase tracking-tight">{doc.name}</h5>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-800">{doc.specialty}</p>
                      <p className="text-[11px] text-slate-500 font-bold mt-0.5">{doc.qualification} • {doc.experience}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] bg-slate-100 text-slate-800 px-2 py-1 font-bold uppercase tracking-wider border border-slate-200">
                      {doc.availability}
                    </span>
                    <span className="text-xs text-blue-800 font-black uppercase tracking-wider flex items-center gap-0.5">
                      Select Doctor <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep(2)}
                className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-800 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">Step 3: Select Date & Time</h4>
            </div>

            {/* Quick summary of selected options */}
            <div className="p-3 bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Service:</span>
                <span className="font-black text-slate-900 uppercase">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px]">Consulting:</span>
                <span className="font-black text-slate-900 uppercase">{selectedDoctor?.name}</span>
              </div>
            </div>

            {/* Date Picker Grid */}
            <div className="space-y-3">
              <span className="block text-xs font-black text-slate-500 uppercase tracking-widest">Choose Appointment Date</span>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {datesList.map((dt) => (
                  <button
                    key={dt.value}
                    type="button"
                    onClick={() => {
                      setSelectedDate(dt.value);
                      setFormErrors({});
                    }}
                    className={`p-2.5 border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selectedDate === dt.value
                        ? 'bg-blue-800 border-blue-800 text-white font-black'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 font-bold'
                    }`}
                  >
                    <span className="text-[9px] uppercase font-bold tracking-wider opacity-85">{dt.dayName}</span>
                    <span className="text-base font-black mt-0.5 font-display">{dt.dayNum}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-85">{dt.monthName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-4">
              <span className="block text-xs font-black text-slate-500 uppercase tracking-widest">Available Timing Slots</span>
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {timeSlots.map((section) => (
                  <div key={section.label} className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">{section.label}</span>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {section.slots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setSelectedTime(t);
                            setFormErrors({});
                          }}
                          className={`py-2 px-3 text-xs font-black text-center border-2 transition-all cursor-pointer ${
                            selectedTime === t
                              ? 'bg-blue-900 border-blue-900 text-white font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {formErrors.date_time && (
              <p className="text-xs text-rose-600 font-black uppercase tracking-wider">{formErrors.date_time}</p>
            )}

            {/* Step navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleDateTimeSelect}
                disabled={!selectedDate || !selectedTime}
                className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PATIENT CONTACT FORM */}
        {step === 4 && (
          <form onSubmit={handleSubmitBooking} className="space-y-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-800 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">Step 4: Patient Details</h4>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Medical Service:</span>
                <span className="font-black text-slate-900 uppercase">{selectedService?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Consultant:</span>
                <span className="font-black text-slate-900 uppercase">{selectedDoctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Date & Time:</span>
                <span className="font-black text-blue-900 uppercase">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ''} @ {selectedTime}
                </span>
              </div>
            </div>

            {/* Input fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => {
                    setPatientName(e.target.value);
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full p-3 border-2 text-sm focus:outline-hidden ${
                    formErrors.name ? 'border-rose-500' : 'border-slate-200 focus:border-blue-900'
                  }`}
                />
                {formErrors.name && <p className="text-rose-600 text-[10px] mt-1 font-black uppercase tracking-wider">{formErrors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">Mobile Number *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-xs text-slate-500 font-black">+91</span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={patientPhone}
                      onChange={(e) => {
                        setPatientPhone(e.target.value);
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      className={`w-full p-3 pl-11 border-2 text-sm focus:outline-hidden ${
                        formErrors.phone ? 'border-rose-500' : 'border-slate-200 focus:border-blue-900'
                      }`}
                    />
                  </div>
                  {formErrors.phone && <p className="text-rose-600 text-[10px] mt-1 font-black uppercase tracking-wider">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={patientEmail}
                    onChange={(e) => {
                      setPatientEmail(e.target.value);
                      if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                    }}
                    className={`w-full p-3 border-2 text-sm focus:outline-hidden ${
                      formErrors.email ? 'border-rose-500' : 'border-slate-200 focus:border-blue-900'
                    }`}
                  />
                  {formErrors.email && <p className="text-rose-600 text-[10px] mt-1 font-black uppercase tracking-wider">{formErrors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">Additional Complaints or Health History (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Describe cold/fever history, ongoing medication, or specific test requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border-2 border-slate-200 text-sm focus:outline-hidden focus:border-blue-900"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-widest px-6 py-4.5 transition-all cursor-pointer shadow-md"
              >
                <span>Confirm & Register Visit</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: SUCCESS & CONGRATS */}
        {step === 5 && confirmedBooking && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 bg-yellow-400 text-slate-900 flex items-center justify-center mx-auto font-black text-3xl">
              ✓
            </div>

            <div className="space-y-1.5">
              <h4 className="text-2xl font-black uppercase tracking-tight text-blue-900 font-display">Appointment Registered!</h4>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your slot is confirmed at Apollo Clinic Colaba.</p>
            </div>

            {/* Booking Details Card */}
            <div className="bg-slate-50 border-2 border-slate-300 p-6 text-left max-w-md mx-auto space-y-4">
              <div className="flex justify-between border-b-2 border-slate-200 pb-2">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Booking Reference ID:</span>
                <span className="text-xs font-black text-blue-900 font-mono tracking-wider">{confirmedBooking.id}</span>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <p><strong className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Patient:</strong> <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span></p>
                <p><strong className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Doctor / Clinician:</strong> <span className="font-bold text-slate-900">{confirmedBooking.doctorName}</span></p>
                <p><strong className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Service requested:</strong> <span className="font-bold text-slate-900">{confirmedBooking.serviceName}</span></p>
                <p>
                  <strong className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Timing Slot:</strong>{' '}
                  <span className="text-blue-900 font-black uppercase tracking-wider">
                    {new Date(confirmedBooking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} @ {confirmedBooking.time}
                  </span>
                </p>
                {confirmedBooking.notes && (
                  <p className="pt-2 border-t border-slate-200 text-slate-500 italic">" {confirmedBooking.notes} "</p>
                )}
              </div>
            </div>

            {/* Instruction reminders */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-yellow-50 p-4 max-w-md mx-auto border-2 border-yellow-200 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-900 shrink-0" />
                <span>Guideline email with report-sharing options has been dispatched to <strong className="text-slate-900">{confirmedBooking.patientEmail}</strong>.</span>
              </div>
            </div>

            <button
              onClick={resetBookingForm}
              className="px-8 py-4 bg-blue-900 hover:bg-blue-950 text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
