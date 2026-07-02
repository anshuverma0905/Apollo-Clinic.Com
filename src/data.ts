import { Doctor, Service, Review } from './types';

export const CLINIC_INFO = {
  name: 'Apollo Clinic Colaba',
  rating: 4.8,
  totalReviews: 877,
  address: 'Ground Floor, Eucharistic Congress Building No. 1, 5, Convent Street, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001',
  landmark: 'Eucharistic Congress Building (Near Gateway of India)',
  phone: '022 2202 1122',
  phoneFormatted: '+91 22 2202 1122',
  email: 'info.colaba@apolloclinic.com',
  timings: [
    { days: 'Monday - Saturday', hours: '8:00 AM - 8:00 PM' },
    { days: 'Sunday', hours: '9:00 AM - 1:00 PM' }
  ],
  googleMapsLink: 'https://maps.google.com/?q=Apollo+Clinic+Colaba+Mumbai',
  plusCode: 'WRFJ+8G Mumbai, Maharashtra'
};

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh Shinde',
    specialty: 'Internal Medicine / General Physician',
    qualification: 'MD (Internal Medicine), MBBS',
    experience: '18 Years Experience',
    availability: 'Mon - Sat (9:00 AM - 1:00 PM, 5:00 PM - 8:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'doc-2',
    name: 'Dr. Anjali Mehta',
    specialty: 'Consultant Cardiologist',
    qualification: 'DM (Cardiology), MD, MBBS',
    experience: '15 Years Experience',
    availability: 'Mon, Wed, Fri (2:00 PM - 5:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'doc-3',
    name: 'Dr. Cyrus Contractor',
    specialty: 'Pediatrician / Child Specialist',
    qualification: 'MD (Pediatrics), DCH, MBBS',
    experience: '12 Years Experience',
    availability: 'Mon - Sat (10:00 AM - 2:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'doc-4',
    name: 'Dr. Sneha Patil',
    specialty: 'Obstetrics & Gynecology',
    qualification: 'MS (OBGYN), DGO, DNB',
    experience: '10 Years Experience',
    availability: 'Tue, Thu, Sat (3:00 PM - 7:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 'doc-5',
    name: 'Dr. Vikram Malhotra',
    specialty: 'Orthopedics & Joint Specialist',
    qualification: 'MS (Orthopedics), M.Ch (Ortho)',
    experience: '14 Years Experience',
    availability: 'Tue, Thu (11:00 AM - 3:00 PM)',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80'
  }
];

export const SERVICES: Service[] = [
  // Consultations
  {
    id: 'srv-1',
    name: 'General Practitioner Consultation',
    description: 'Diagnosis and treatment for acute illnesses (cold, cough, fever), blood pressure management, and general health evaluations.',
    category: 'Consultation',
    duration: '15 mins',
    price: '₹600'
  },
  {
    id: 'srv-2',
    name: 'Specialist Consultation',
    description: 'Expert opinion and detailed management plan by senior consultants (Cardiology, Orthopedics, Gynecology, Pediatrics).',
    category: 'Consultation',
    duration: '20 mins',
    price: '₹1,000'
  },
  // Health Checkups
  {
    id: 'srv-3',
    name: 'Apollo Executive Full Body Checkup',
    description: 'A comprehensive package including Complete Hemogram, Lipid Profile, Liver Function Test, Renal Function Test, Thyroid Profile (TSH), Blood Sugar, Urine Analysis, and Doctor consultation.',
    category: 'Health Checkup',
    duration: '1 - 2 hours',
    price: '₹3,499'
  },
  {
    id: 'srv-4',
    name: 'Senior Citizen Care Package (Age 60+)',
    description: 'Customized panel evaluating bone health, cardiovascular risk, kidney & liver function, diabetes markers, plus specialist physician review.',
    category: 'Health Checkup',
    duration: '2 hours',
    price: '₹2,999'
  },
  {
    id: 'srv-5',
    name: 'Women Wellness Comprehensive Package',
    description: 'Focused profile featuring Breast Ultrasound/Mammography, Pap smear, Pelvic scan, Thyroid profile, Vitamin D & B12 levels, and Gynecologist check.',
    category: 'Health Checkup',
    duration: '2.5 hours',
    price: '₹3,999'
  },
  // Diagnostics
  {
    id: 'srv-6',
    name: 'Digital X-Ray (Chest / Spine / Joint)',
    description: 'High-definition digital radiography with ultra-low radiation. Reports generated within 1 hour.',
    category: 'Diagnostics',
    duration: '15 mins',
    price: '₹450'
  },
  {
    id: 'srv-7',
    name: 'Ultrasonography (USG Abdomen & Pelvis)',
    description: 'Detailed ultrasound screening of internal abdominal organs, performed by expert radiologists.',
    category: 'Diagnostics',
    duration: '30 mins',
    price: '₹1,200'
  },
  {
    id: 'srv-8',
    name: 'Electrocardiogram (ECG)',
    description: 'Quick cardiac electrical activity recording with immediate physician interpretation.',
    category: 'Diagnostics',
    duration: '10 mins',
    price: '₹350'
  },
  // Lab Tests
  {
    id: 'srv-9',
    name: 'Complete Thyroid Panel (T3, T4, TSH)',
    description: 'Evaluation of thyroid gland performance. Essential for diagnosing hyper/hypothyroidism.',
    category: 'Lab Tests',
    duration: '5 mins',
    price: '₹550'
  },
  {
    id: 'srv-10',
    name: 'HbA1c & Blood Glucose Test',
    description: 'Three-month average blood sugar levels assessment to monitor pre-diabetes and active diabetes control.',
    category: 'Lab Tests',
    duration: '5 mins',
    price: '₹400'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Laveena Ramchandani',
    rating: 5,
    text: 'I’ve been coming to Apollo Clinic for years from UK for my check ups. They are highly professional and take extreme care of patients needs. I took my 83 year old mother for her check up this time. She was looked after so well, clinicians and support staff were extremely patient, soft-spoken and efficient.',
    date: '1 month ago',
    source: 'Google'
  },
  {
    id: 'rev-2',
    author: 'Jim Cross',
    rating: 5,
    text: 'Excellent clinic! I randomly went to Apollo clinic complaining of cold and cough symptoms that had persisted too long. Within one hour I had a chest X-ray and blood work and saw a Dr who prescribed meds. The test results were emailed to me quickly.',
    date: '4 months ago',
    source: 'Google'
  },
  {
    id: 'rev-3',
    author: 'Aditya Deshmukh',
    rating: 5,
    text: 'Awesome facilities, and helpful staff, gave us excellent care. The full body checkup is highly systematic. Everything from blood test to X-ray was finished within 1.5 hours. Very clean and hygienic hospital premises.',
    date: '2 months ago',
    source: 'Verified Patient'
  },
  {
    id: 'rev-4',
    author: 'Priya Sharma',
    rating: 5,
    text: 'Good staff service, polite behaviour and highly professional management. Dr. Rajesh Shinde is very experienced and explained the diagnosis in detail. Highly recommend Apollo Clinic for everyone in South Mumbai.',
    date: '3 weeks ago',
    source: 'Verified Patient'
  },
  {
    id: 'rev-5',
    author: 'Divya Singh',
    rating: 2,
    text: 'The doctors are experienced and the medical services are good. However, they need to improve their report delivery process during rush hours. I had to follow up to receive my digital copy via email, though the staff resolved it after my phone call.',
    date: '1 month ago',
    source: 'Google'
  }
];
