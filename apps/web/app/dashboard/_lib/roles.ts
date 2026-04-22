export type DashboardRole =
  | "patient"
  | "nurse"
  | "lab"
  | "admin"
  | "it"
  | "insurance"
  | "pharmacy";

export type RoleNavKey =
  | "overview"
  | "profile"
  | "appointments"
  | "prescriptions"
  | "lab-results"
  | "qr"
  | "billing"
  | "messages"
  | "shift-logs"
  | "logout"
  | "patients"
  | "ward-tasks"
  | "vitals"
  | "qr-scan"
  | "shift-schedule"
  | "dashboard"
  | "test-orders"
  | "sample-collection"
  | "results-entry"
  | "completed-tests"
  | "pending-results"
  | "qr-sample-scan"
  | "user-management"
  | "staff-registration"
  | "role-permissions"
  | "departments"
  | "billing-finance"
  | "reports-analytics"
  | "qr-management"
  | "audit-logs"
  | "access-logs"
  | "security-events"
  | "performance"
  | "db-monitoring"
  | "backup-management"
  | "access-control"
  | "incident-reports"
  | "claims"
  | "approvals"
  | "billing-records"
  | "policy-management"
  | "payment-status"
  | "reports"
  | "prescriptions-queue"
  | "dispensing-history"
  | "inventory"
  | "drug-stock-alerts"
  | "patient-lookup"
  | "validate-rx";

export type RoleNavItem = {
  key: RoleNavKey;
  label: string;
  icon:
    | "home"
    | "user"
    | "calendar"
    | "pill"
    | "flask"
    | "qr"
    | "credit-card"
    | "message"
    | "clipboard"
    | "logout"
    | "users"
    | "check-square"
    | "heart-pulse"
    | "scan"
    | "clock"
    | "layout"
    | "test-tube"
    | "clipboard-edit"
    | "check-circle"
    | "hourglass"
    | "shield"
    | "settings"
    | "building"
    | "bar-chart"
    | "database"
    | "activity"
    | "server"
    | "alert-triangle"
    | "file-text"
    | "badge-check"
    | "receipt"
    | "wallet"
    | "package"
    | "search";
};

export type RoleVariant =
  | "patient"
  | "nurse"
  | "lab"
  | "admin"
  | "it"
  | "insurance"
  | "pharmacy";

export type RoleConfig = {
  role: DashboardRole;
  appName: string;
  moduleName: string;
  roleLabel: string;
  headerTitle: string;
  searchPlaceholder: string;
  variant: RoleVariant;
  sidebarTone: "light" | "dark";
  emergencyCtaLabel?: string;
  primaryAction?: { label: string; actionKey: string };
  secondaryAction?: { label: string; actionKey: string };
  nav: RoleNavItem[];
};

export const DASHBOARD_ROLES: DashboardRole[] = [
  "patient",
  "nurse",
  "lab",
  "admin",
  "it",
  "insurance",
  "pharmacy",
];

export const getRoleConfig = (role: string): RoleConfig => {
  const normalized = role.toLowerCase();
  if (!DASHBOARD_ROLES.includes(normalized as DashboardRole)) {
    return ROLE_CONFIGS.patient;
  }
  return ROLE_CONFIGS[normalized as DashboardRole];
};

export const ROLE_CONFIGS: Record<DashboardRole, RoleConfig> = {
  patient: {
    role: "patient",
    appName: "ClinicalArchitect",
    moduleName: "Hospital Core",
    roleLabel: "ROLE: PATIENT",
    headerTitle: "Welcome back, Sarah",
    searchPlaceholder: "Search medical records...",
    variant: "patient",
    sidebarTone: "light",
    emergencyCtaLabel: "Emergency Admission",
    primaryAction: { label: "Book Appointment", actionKey: "bookAppointment" },
    secondaryAction: { label: "Download Reports", actionKey: "downloadReports" },
    nav: [
      { key: "overview", label: "Home Overview", icon: "home" },
      { key: "profile", label: "My Profile", icon: "user" },
      { key: "appointments", label: "Appointments", icon: "calendar" },
      { key: "prescriptions", label: "Prescriptions", icon: "pill" },
      { key: "lab-results", label: "Lab Results", icon: "flask" },
      { key: "qr", label: "QR Code", icon: "qr" },
      { key: "billing", label: "Billing History", icon: "credit-card" },
      { key: "messages", label: "Messages", icon: "message" },
      { key: "shift-logs", label: "Shift Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
  nurse: {
    role: "nurse",
    appName: "Hospital Core",
    moduleName: "Hospital Core",
    roleLabel: "ROLE: LEAD NURSE",
    headerTitle: "Shift Overview",
    searchPlaceholder: "Search patients or ward...",
    variant: "nurse",
    sidebarTone: "light",
    emergencyCtaLabel: "Emergency Admission",
    primaryAction: { label: "Administer Meds", actionKey: "administerMeds" },
    secondaryAction: { label: "Update Vitals", actionKey: "updateVitals" },
    nav: [
      { key: "patients", label: "Patients", icon: "users" },
      { key: "ward-tasks", label: "Ward Tasks", icon: "check-square" },
      { key: "vitals", label: "Vitals Entry", icon: "heart-pulse" },
      { key: "prescriptions", label: "Prescriptions", icon: "pill" },
      { key: "qr-scan", label: "QR Patient Scan", icon: "scan" },
      { key: "shift-schedule", label: "Shift Schedule", icon: "clock" },
      { key: "messages", label: "Messages", icon: "message" },
      { key: "shift-logs", label: "Shift Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
  lab: {
    role: "lab",
    appName: "ClinicalArchitect",
    moduleName: "Hospital Core",
    roleLabel: "Role: Lab Technician",
    headerTitle: "Dashboard Overview",
    searchPlaceholder: "Search samples, patients, or tests...",
    variant: "lab",
    sidebarTone: "dark",
    emergencyCtaLabel: "Emergency Admission",
    nav: [
      { key: "dashboard", label: "Dashboard Overview", icon: "layout" },
      { key: "test-orders", label: "Test Orders", icon: "file-text" },
      { key: "sample-collection", label: "Sample Collection", icon: "test-tube" },
      { key: "results-entry", label: "Lab Results Entry", icon: "clipboard-edit" },
      { key: "completed-tests", label: "Completed Tests", icon: "check-circle" },
      { key: "pending-results", label: "Pending Results", icon: "hourglass" },
      { key: "qr-sample-scan", label: "QR Sample Scan", icon: "qr" },
      { key: "messages", label: "Messages", icon: "message" },
      { key: "shift-logs", label: "Shift Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
  admin: {
    role: "admin",
    appName: "ClinicalArchitect",
    moduleName: "Hospital Core",
    roleLabel: "Role: Super Admin",
    headerTitle: "System Overview",
    searchPlaceholder: "Global Administrative Search...",
    variant: "admin",
    sidebarTone: "dark",
    primaryAction: { label: "System Settings", actionKey: "openSystemSettings" },
    secondaryAction: {
      label: "Manage Permissions",
      actionKey: "managePermissions",
    },
    nav: [
      { key: "overview", label: "Dashboard Overview", icon: "layout" },
      { key: "user-management", label: "User Management", icon: "users" },
      { key: "staff-registration", label: "Staff Registration", icon: "badge-check" },
      { key: "role-permissions", label: "Role & Permissions", icon: "shield" },
      { key: "departments", label: "Departments", icon: "building" },
      { key: "appointments", label: "Appointments", icon: "calendar" },
      { key: "billing-finance", label: "Billing & Finance", icon: "wallet" },
      { key: "reports-analytics", label: "Reports & Analytics", icon: "bar-chart" },
      { key: "qr-management", label: "QR Management", icon: "qr" },
      { key: "audit-logs", label: "Audit Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
  it: {
    role: "it",
    appName: "Hospital Core",
    moduleName: "Hospital Core",
    roleLabel: "ROLE: IT ADMINISTRATOR",
    headerTitle: "Infrastructure Command",
    searchPlaceholder: "Search system logs, users, or endpoints...",
    variant: "it",
    sidebarTone: "dark",
    primaryAction: { label: "Incident Response", actionKey: "incidentResponse" },
    secondaryAction: { label: "Monitor Security", actionKey: "monitorSecurity" },
    nav: [
      { key: "overview", label: "System Overview", icon: "layout" },
      { key: "access-logs", label: "User Access Logs", icon: "file-text" },
      { key: "security-events", label: "Security Events", icon: "shield" },
      { key: "performance", label: "System Performance", icon: "activity" },
      { key: "db-monitoring", label: "Database Monitoring", icon: "database" },
      { key: "backup-management", label: "Backup Management", icon: "server" },
      { key: "access-control", label: "Role Access Control", icon: "settings" },
      { key: "incident-reports", label: "Incident Reports", icon: "alert-triangle" },
      { key: "messages", label: "Messages", icon: "message" },
      { key: "shift-logs", label: "Shift Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
  insurance: {
    role: "insurance",
    appName: "Hospital Core",
    moduleName: "Hospital Core",
    roleLabel: "ROLE: INSURANCE AGENT",
    headerTitle: "Claims Overview",
    searchPlaceholder: "Search claims, policies, or IDs...",
    variant: "insurance",
    sidebarTone: "light",
    nav: [
      { key: "overview", label: "Claims Overview", icon: "layout" },
      { key: "claims", label: "Patient Claims", icon: "file-text" },
      { key: "approvals", label: "Approval Requests", icon: "check-square" },
      { key: "billing-records", label: "Billing Records", icon: "receipt" },
      { key: "policy-management", label: "Policy Management", icon: "shield" },
      { key: "payment-status", label: "Payment Status", icon: "wallet" },
      { key: "reports", label: "Reports", icon: "bar-chart" },
      { key: "messages", label: "Messages", icon: "message" },
      { key: "shift-logs", label: "Shift Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
  pharmacy: {
    role: "pharmacy",
    appName: "Hospital Core",
    moduleName: "Pharmacist Central",
    roleLabel: "ROLE: LEAD PHARMACIST",
    headerTitle: "Pharmacist Central",
    searchPlaceholder: "Quick search drugs or Rx IDs...",
    variant: "pharmacy",
    sidebarTone: "light",
    primaryAction: { label: "Start QR Validation", actionKey: "startQrValidation" },
    nav: [
      { key: "overview", label: "Dashboard Overview", icon: "layout" },
      { key: "prescriptions-queue", label: "Prescriptions Queue", icon: "pill" },
      { key: "dispensing-history", label: "Dispensing History", icon: "file-text" },
      { key: "inventory", label: "Inventory", icon: "package" },
      { key: "drug-stock-alerts", label: "Drug Stock Alerts", icon: "alert-triangle" },
      { key: "patient-lookup", label: "Patient Lookup", icon: "search" },
      { key: "qr", label: "QR Scan", icon: "qr" },
      { key: "messages", label: "Messages", icon: "message" },
      { key: "validate-rx", label: "Validate Rx", icon: "badge-check" },
      { key: "shift-logs", label: "Shift Logs", icon: "clipboard" },
      { key: "logout", label: "Logout", icon: "logout" },
    ],
  },
};

