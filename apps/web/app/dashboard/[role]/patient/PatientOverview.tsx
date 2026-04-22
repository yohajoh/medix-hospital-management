import { Heart, Thermometer, Waves, Droplets } from "lucide-react";
import { Badge } from "../../_components/Badge";
import { ProgressBar } from "../../_components/ProgressBar";
import { ActionButton } from "../../_components/ActionButton";
import { QrCode } from "../../_components/QrCode";

type VitalCard = {
  label: string;
  value: string;
  unit: string;
  meta: string;
  icon: React.ReactNode;
};

const vitals: VitalCard[] = [
  {
    label: "HEART RATE",
    value: "72",
    unit: "BPM",
    meta: "~ 2% from last week",
    icon: <Heart size={18} className="text-[color:var(--dash-accent)]" />,
  },
  {
    label: "BLOOD PRESSURE",
    value: "118/76",
    unit: "mmHg",
    meta: "Optimal Range",
    icon: <Waves size={18} className="text-slate-500" />,
  },
  {
    label: "TEMPERATURE",
    value: "98.6",
    unit: "°F",
    meta: "Stable",
    icon: <Thermometer size={18} className="text-[color:var(--dash-accent)]" />,
  },
  {
    label: "SPO2",
    value: "99",
    unit: "%",
    meta: "Excellent",
    icon: <Droplets size={18} className="text-slate-500" />,
  },
];

type Appointment = {
  date: string;
  month: string;
  doctor: string;
  specialty: string;
  time: string;
  location: string;
};

const appointments: Appointment[] = [
  {
    date: "28",
    month: "OCT",
    doctor: "Dr. Elena Rodriguez",
    specialty: "Cardiology - Routine Checkup",
    time: "09:30 AM",
    location: "Room 402, Block B",
  },
  {
    date: "05",
    month: "NOV",
    doctor: "Dr. Marcus Chen",
    specialty: "Dermatology - Consultation",
    time: "02:15 PM",
    location: "Telemedicine Call",
  },
];

type LabResult = {
  category: string;
  name: string;
  value: string;
  unit: string;
  status: "Normal" | "Elevated";
};

const labResults: LabResult[] = [
  { category: "LIPID PANEL", name: "Cholesterol", value: "192", unit: "mg/dL", status: "Normal" },
  { category: "CBC", name: "Hemoglobin", value: "14.2", unit: "g/dL", status: "Normal" },
  { category: "METABOLIC", name: "Glucose", value: "106", unit: "mg/dL", status: "Elevated" },
];

type Prescription = {
  name: string;
  instructions: string;
  pill: string;
  tag: string;
  tone: "neutral" | "warm";
};

const prescriptions: Prescription[] = [
  {
    name: "Lisinopril 10mg",
    instructions: "1 tablet daily - Morning",
    pill: "12 REFILLS LEFT",
    tag: "",
    tone: "neutral",
  },
  {
    name: "Atorvastatin 20mg",
    instructions: "1 tablet nightly",
    pill: "EXPIRES DEC 2023",
    tag: "",
    tone: "warm",
  },
];

export function PatientOverview() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {vitals.map((v) => (
          <div key={v.label} className="dash-card p-6">
            <div className="flex items-center justify-between">
              <div className="text-[11px] tracking-[0.18em] font-extrabold text-slate-500">
                {v.label}
              </div>
              <div className="h-9 w-9 rounded-xl grid place-items-center bg-black/4 border border-black/5">
                {v.icon}
              </div>
            </div>
            <div className="mt-6 flex items-end gap-2">
              <div className="text-[44px] font-extrabold dash-kpi-value leading-none text-slate-800">
                {v.value}
              </div>
              <div className="pb-1 text-[12px] font-semibold text-slate-500">
                {v.unit}
              </div>
            </div>
            <div className="mt-3 text-[12px] dash-muted font-semibold">
              {v.meta}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[20px] font-extrabold tracking-tight">
              Upcoming Appointments
            </h2>
            <button
              type="button"
              className="text-[12px] font-semibold text-slate-700 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="dash-glass p-4 space-y-3">
            {appointments.map((a) => (
              <div
                key={`${a.date}${a.month}${a.time}`}
                className="dash-card bg-white/80 p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-black/4 border border-black/5 grid place-items-center text-center">
                    <div className="leading-tight">
                      <div className="text-[18px] font-extrabold">{a.date}</div>
                      <div className="text-[10px] font-semibold text-slate-500">
                        {a.month}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">
                      {a.doctor}
                    </div>
                    <div className="text-[12px] dash-muted mt-0.5">
                      {a.specialty}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900">{a.time}</div>
                  <div className="text-[12px] dash-muted mt-0.5">
                    {a.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-[20px] font-extrabold tracking-tight">
              Active Prescriptions
            </h2>
            <ActionButton
              label="Refill Request"
              method="requestRefill"
              className="h-10 px-4 rounded-2xl"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map((p) => (
              <div
                key={p.name}
                className={`dash-card p-5 ${
                  p.tone === "warm"
                    ? "bg-[linear-gradient(90deg,rgba(255,215,180,0.85)_0%,rgba(255,205,160,0.75)_100%)]"
                    : "bg-white/75"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-extrabold text-slate-900">{p.name}</div>
                  <div className="h-10 w-10 rounded-xl bg-black/4 border border-black/5" />
                </div>
                <div className="text-[12px] dash-muted mt-1">
                  {p.instructions}
                </div>
                <div className="mt-4">
                  <Badge tone={p.tone === "warm" ? "warning" : "accent"}>
                    {p.pill}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="dash-glass p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[18px] font-extrabold tracking-tight">
                Recent Lab Results
              </h3>
            </div>
            <div className="space-y-3">
              {labResults.map((r) => (
                <div
                  key={r.name}
                  className="dash-card bg-white/75 p-4 flex items-start justify-between"
                >
                  <div>
                    <div className="text-[10px] font-extrabold tracking-[0.18em] text-slate-500">
                      {r.category}
                    </div>
                    <div className="font-extrabold text-slate-900 mt-0.5">
                      {r.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">
                      {r.value}{" "}
                      <span className="text-[11px] font-semibold text-slate-500">
                        {r.unit}
                      </span>
                    </div>
                    <div className="mt-1">
                      <Badge
                        tone={r.status === "Normal" ? "success" : "warning"}
                      >
                        {r.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full h-10 rounded-2xl border border-black/5 bg-white/65 font-semibold text-sm"
            >
              View Full Records
            </button>
          </div>

          <div className="dash-glass p-6">
            <h3 className="text-[18px] font-extrabold tracking-tight">
              Quick Check-in
            </h3>
            <p className="mt-2 text-sm dash-muted">
              Show this QR code at the reception desk for faster arrival
              processing.
            </p>
            <div className="mt-5 flex justify-center">
              <QrCode value="MEDIX-PATIENT-SARAH-QR" size={118} />
            </div>
          </div>
        </div>
      </section>

      <section className="dash-glass p-6">
        <div className="flex items-center justify-between">
          <div className="font-extrabold text-slate-900">Vitals Trend</div>
          <div className="text-xs dash-muted">Last 7 days</div>
        </div>
        <div className="mt-4">
          <ProgressBar value={72} max={100} />
        </div>
      </section>
    </div>
  );
}

