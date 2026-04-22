import type { PersonCard, TagCard, TechCard, Testimonial } from "./types";

export const navItems = ["Specialties", "Doctors", "Facilities", "Patients", "About"];

export const institutionLogos = ["METROCARE", "ST.JUDE'S", "GENOME HQ"];

export const ecosystemCards: TagCard[] = [
  {
    title: "Unified EHR Integration",
    description:
      "Real time synchronization with legacy EHR systems using FHIR and HL7 standards for seamless clinical continuity.",
    icon: "\uD83D\uDCC4",
    tags: ["FHIR 4.0", "HL7 v2"],
  },
  {
    title: "Automated Lab Workflows",
    description:
      "Direct bi-directional data from diagnostic hardware for clinician dashboards, reducing manual entry by 40%.",
    icon: "\uD83E\uDDEA",
    tags: ["OE READY", "EOMN ENXO"],
  },
  {
    title: "Pharmacy Intelligence",
    description: "Predictive inventory management and e-prescribing modules prevent unsafe interactions in all audits.",
    icon: "\uD83D\uDC8A",
    tags: ["E-PRESCRIBE", "AUDITED"],
  },
];

export const centerCards: TagCard[] = [
  {
    title: "Oncology",
    description: "Oncology is a trauma-informed clinical pathway with precision care.",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=900&q=80",
    cta: "Learn More",
  },
  {
    title: "Cardiology",
    description: "Advanced diagnostics and coordinated interventions for every cardiac profile.",
    image: "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=900&q=80",
    cta: "Learn More",
  },
  {
    title: "Neurology",
    description: "Data-rich clinical decision support for brain and nerve disorders.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
    cta: "Learn More",
  },
  {
    title: "Orthopedics",
    description: "Sports medicine, arthroscopy, and rehabilitation with digital post-op plans.",
    image: "https://images.unsplash.com/photo-1580281658629-8ff6f47c9f7f?auto=format&fit=crop&w=900&q=80",
    cta: "Learn More",
  },
];

export const specialistCards: PersonCard[] = [
  {
    title: "Name A. Name",
    role: "Speciality",
    description: "Professional with broad operational and interventional expertise.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80",
    cta: "View Profile",
  },
  {
    title: "Doctor L. Demm",
    role: "Speciality",
    description: "Professional with current evidence-focused bedside and outpatient practice.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80",
    cta: "View Profile",
  },
  {
    title: "Doctor V. Smith",
    role: "Necrology",
    description: "Clinic notes as a brief interdisciplinary coordination layer for every case.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    cta: "View Profile",
  },
  {
    title: "Name P. Name",
    role: "Orthopedics",
    description: "Evidence-driven diagnostics and minimally invasive treatment pathways.",
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80",
    cta: "View Profile",
  },
];

export const technologyCards: TechCard[] = [
  {
    title: "Robotic Surgery",
    description:
      "Data-guided precision systems engineered for minimally invasive procedures across high-complexity cases.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    cta: "Learn More",
    align: "left",
  },
  {
    title: "Advanced Imaging",
    description:
      "Integrated imaging and AI-assisted interpretation modules for faster diagnosis and reduced variation.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
    cta: "Learn More",
    align: "right",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "I never felt alone. The care team shared updates quickly and helped my family understand every decision.",
    name: "Nama Bilmars",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "I saw true coordination between nurses and doctors. The process felt safe, clear, and consistent.",
    name: "Jansh Roltan",
    role: "Patient",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=200&q=80",
  },
];
