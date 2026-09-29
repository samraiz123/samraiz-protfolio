export const profile = {
  name: 'Samraiz Aziz',
  brand: 'SAMRAIZ AZIZ',
  role: 'Flutter Application Developer',
  positioning: 'Mobile App Developer · AI Integration · Firebase · Web Development',
  location: 'Gulshan-e-Iqbal, Karachi, Pakistan',
  phone: '0318-7507646',
  email: 'samraizshaikh158@gmail.com',
  github: 'https://github.com/samraiz123',
  outfitOracleRepo: 'https://github.com/samraiz123/outfit_oracle',
  linkedin: '',
  instagram: '',
};

export const projects: Project[] = [
  {
    id: 'wasela',
    number: '01',
    name: 'Wasela',
    subtitle: 'Food Rescue & Donation Platform',
    description: 'A Flutter-based platform designed to connect food providers, NGOs, and volunteers to reduce food waste and improve food redistribution.',
    status: 'MOBILE APPLICATION',
    type: 'mobile',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Riverpod'],
    features: ['Role-based authentication', 'Provider dashboard', 'NGO dashboard', 'Volunteer dashboard', 'Food donation management', 'Pickup requests', 'Real-time data'],
    overview: 'A food rescue and donation platform bringing providers, NGOs, and volunteers into one coordinated mobile experience.',
    problem: 'Food that could be redistributed is not always easy to connect with organizations and people who need it.',
    approach: 'A Flutter application with role-specific dashboards, donation management, pickup coordination, and a Firebase-backed real-time data flow.',
    role: 'Flutter application development',
    detailNote: 'Project architecture notes and screen captures can be added as the case study is documented.',
  },
  {
    id: 'outfit-oracle',
    number: '02',
    name: 'Outfit Oracle',
    subtitle: 'AI-Powered Fashion Recommendation App',
    description: 'An AI-focused fashion application designed to provide personalized outfit recommendations based on user preferences and fashion inputs.',
    status: 'AI + MOBILE',
    type: 'ai',
    technologies: ['Flutter', 'AI APIs', 'Computer Vision', 'Firebase', 'Python'],
    features: ['AI recommendations', 'Fashion analysis', 'Outfit generation', 'Image-based experiences', 'Personalized suggestions'],
    overview: 'A mobile fashion assistant exploring how AI can make outfit discovery feel personal and practical.',
    problem: 'Choosing an outfit can involve balancing personal preference with visual inspiration and context.',
    approach: 'A Flutter app concept combining AI APIs and image-based inputs to create personalized recommendations.',
    role: 'Mobile application and AI integration',
    github: profile.outfitOracleRepo,
    detailNote: 'Screenshots, architecture diagrams, and implementation challenges can be added as the project case study is documented.',
  },
  {
    id: 'tailorflow',
    number: '03',
    name: 'TailorFlow',
    subtitle: 'Digital Tailoring Management Platform',
    description: 'An application concept for tailoring businesses to manage customer details, body measurements, orders, teams, and payments.',
    status: 'PRODUCT CONCEPT',
    type: 'concept',
    technologies: ['Flutter', 'Firebase', 'UI/UX', 'Backend APIs'],
    features: ['Customer management', 'Body measurements', 'Orders', 'Workforce management', 'Payments', 'Dashboard'],
    overview: 'A digital tailoring management concept designed around the everyday flow of a tailoring business.',
    approach: 'The proposed product brings customer records, measurements, order progress, workforce, and payment information into one application.',
    role: 'Product and application concept',
    detailNote: 'This is presented as a concept. Screenshots, technical architecture, and implementation challenges are not supplied.',
  },
  {
    id: 'versce-blogs',
    number: '04',
    name: 'Versce Blogs',
    subtitle: 'Blogging & Web Project',
    description: 'A blogging and web project presented as an editorial-style digital publication.',
    status: 'EDITORIAL WEB',
    type: 'editorial',
    technologies: [],
    features: [],
    overview: 'An editorial web project. More detail about its content, implementation, and role can be added when available.',
    detailNote: 'No screenshots, technical details, or feature list have been supplied yet.',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computer Science',
  institution: 'COMSATS University Islamabad, Abbottabad Campus',
  graduation: 'Graduated 2026',
  cgpa: '3.07 / 4.00',
};

export type Project = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  status: string;
  type: 'mobile' | 'ai' | 'concept' | 'editorial';
  technologies: string[];
  features: string[];
  overview: string;
  problem?: string;
  approach?: string;
  role?: string;
  github?: string;
  live?: string;
  detailNote: string;
};

export const experience = [
  {
    role: 'Mobile Application Developer Intern',
    organization: 'Marfah Technology',
    category: 'INDUSTRY EXPERIENCE',
    details: 'Worked on mobile application development, feature implementation, debugging, and improving application functionality.',
  },
  {
    role: 'President',
    organization: 'IET Robotics Club — COMSATS Abbottabad',
    category: 'LEADERSHIP',
    details: 'Led technology-focused initiatives, events, workshops, and student activities while coordinating teams and external collaborations.',
  },
];

export const technologyGroups = [
  { label: 'Mobile', index: '01', technologies: ['Flutter', 'Dart', 'Android'] },
  { label: 'Backend', index: '02', technologies: ['Firebase', 'Firestore', 'Authentication', 'REST APIs'] },
  { label: 'State management', index: '03', technologies: ['Riverpod', 'Provider', 'Bloc'] },
  { label: 'AI integration', index: '04', technologies: ['Gemini API', 'AI features', 'Computer vision'] },
  { label: 'Web', index: '05', technologies: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'] },
  { label: 'Tools', index: '06', technologies: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Figma'] },
];

export const journey = [
  { label: 'Computer Science education', note: education.institution, kind: 'EDUCATION' },
  { label: 'Flutter application development', note: 'Mobile interfaces, application flows, and product implementation', kind: 'FOCUS' },
  { label: 'Mobile application internship', note: 'Marfah Technology', kind: 'INDUSTRY' },
  { label: 'Leadership & technology events', note: 'IET Robotics Club and university activities', kind: 'COMMUNITY' },
  { label: 'AI integration projects', note: 'Exploring AI-powered mobile experiences', kind: 'EXPLORATION' },
  { label: 'Professional development', note: 'Building, learning, and refining the craft', kind: 'ONGOING' },
];

export const services = [
  { number: '01', title: 'Mobile applications', description: 'Production-minded Flutter applications for Android and cross-platform experiences.', tags: ['Flutter', 'Dart', 'Android'] },
  { number: '02', title: 'AI-powered applications', description: 'Integrating AI APIs and intelligent functionality into modern mobile products.', tags: ['AI APIs', 'Computer vision'] },
  { number: '03', title: 'Backend integration', description: 'Firebase, Firestore, authentication, APIs, and cloud-connected application flows.', tags: ['Firebase', 'REST APIs'] },
  { number: '04', title: 'UI/UX implementation', description: 'Turning considered product designs into clear, responsive application interfaces.', tags: ['Flutter UI', 'Figma'] },
  { number: '05', title: 'Web experiences', description: 'Modern responsive websites and interactive web experiences.', tags: ['React', 'TypeScript'] },
];