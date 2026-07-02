export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  availability: string;
  avatar: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'Consultation' | 'Health Checkup' | 'Diagnostics' | 'Lab Tests';
  duration: string;
  price?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google' | 'Verified Patient';
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorName: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  createdAt: string;
}
