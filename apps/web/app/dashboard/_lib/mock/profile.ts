export type MockProfile = {
  name: string;
  subtitle: string;
  initials: string;
  statusLine?: string;
};

export const mockProfiles: Record<string, MockProfile> = {
  patient: {
    name: "Sarah",
    subtitle: "Hospital Core",
    initials: "S",
  },
  nurse: {
    name: "Nurse Elena Vance",
    subtitle: "WARD B - SHIFT AM",
    initials: "EV",
  },
  lab: {
    name: "Dr. Sarah Chen",
    subtitle: "LABORATORY LEAD",
    initials: "SC",
  },
  admin: {
    name: "Admin",
    subtitle: "ADMIN PORTAL",
    initials: "A",
  },
  it: {
    name: "Admin_System_1",
    subtitle: "IT INFRASTRUCTURE",
    initials: "AS",
  },
  insurance: {
    name: "Agent J. Millor",
    subtitle: "Corporate Tier III",
    initials: "JM",
  },
  pharmacy: {
    name: "Dr. Sarah Jenkins",
    subtitle: "Active Shift: 08:00 - 16:00",
    initials: "SJ",
  },
};

