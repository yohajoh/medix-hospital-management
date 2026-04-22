import { Badge } from "../../_components/Badge";
import { ProgressBar } from "../../_components/ProgressBar";
import { ActionButton } from "../../_components/ActionButton";
import { PlaceholderPanel } from "../../_components/PlaceholderPanel";

type ShiftAlert = {
  room: string;
  patient: string;
  label: string;
  tone: "danger" | "warning";
};

const alerts: ShiftAlert[] = [
  {
    room: "Room 304-A",
    patient: "Elena Rodriguez",
    label: "HIGH BPM: 118",
    tone: "danger",
  },
  {
    room: "Room 308-C",
    patient: "Mark Thompson",
    label: "TEMP SPIKE: 102.1°F",
    tone: "warning",
  },
];

const tasks = [
  { title: "Vitals Round Ward B-12", due: "Due: 08:30 AM", checked: false },
  { title: "Medication: David Miller", due: "Oral Antibiotics • Room 305", checked: false },
  { title: "Shift Handoff Briefing", due: "Completed task • Nurse-Sereh", checked: true },
  { title: "Post-Op Prep: Room 302", due: "Due: 10:00 AM", checked: false },
];

export function NurseShiftOverview() {
  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-[13px] dash-muted font-semibold">
            Ward B-12 | Morning Shift (07:00 - 18:00)
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton label="Update Vitals" method="updateVitals" />
          <ActionButton label="Administer Meds" method="administerMeds" variant="accent" />
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="dash-glass p-5 bg-[linear-gradient(90deg,rgba(255,205,205,0.55)_0%,rgba(255,235,235,0.60)_100%)] border border-red-200/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge tone="danger">URGENT VITALS ALERTS</Badge>
              </div>
              <div className="text-red-400 text-sm">▲</div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {alerts.map((a) => (
                <div key={a.room} className="dash-card bg-white/75 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-red-100 border border-red-200 grid place-items-center">
                      <span className="text-red-600 font-extrabold">!</span>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-slate-500">
                        {a.room}
                      </div>
                      <div className="font-extrabold text-slate-900">
                        {a.patient}
                      </div>
                      <div className="text-[11px] font-extrabold tracking-wide text-red-700 mt-0.5">
                        {a.label}
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-xl">›</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="dash-card p-6">
              <div className="flex items-center justify-between">
                <Badge tone="accent">ACTIVE</Badge>
              </div>
              <div className="mt-6 text-[34px] font-extrabold tracking-tight">8/10</div>
              <div className="text-sm dash-muted">Patients Assigned</div>
              <ProgressBar className="mt-4" value={80} max={100} />
            </div>
            <div className="dash-card p-6">
              <div className="flex items-center justify-between">
                <Badge tone="warning">PENDING</Badge>
              </div>
              <div className="mt-6 text-[34px] font-extrabold tracking-tight">12</div>
              <div className="text-sm dash-muted">Meds Due Now</div>
              <ProgressBar className="mt-4" value={60} max={100} tone="warning" />
            </div>
            <div className="dash-card p-6">
              <div className="flex items-center justify-between">
                <Badge tone="neutral">SHIFT</Badge>
              </div>
              <div className="mt-6 text-[34px] font-extrabold tracking-tight">65%</div>
              <div className="text-sm dash-muted">Tasks Completed</div>
              <ProgressBar className="mt-4" value={65} max={100} tone="neutral" />
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[20px] font-extrabold tracking-tight">
                Assigned Patient Status
              </h2>
              <button
                type="button"
                className="text-[12px] font-semibold text-slate-700 hover:underline"
              >
                View All Patients
              </button>
            </div>

            <div className="dash-glass p-4 space-y-3">
              <div className="dash-card bg-white/80 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-black/4 border border-black/5" />
                  <div>
                    <div className="font-extrabold text-slate-900">
                      Alice Henderson
                    </div>
                    <div className="text-[12px] dash-muted">
                      B-12 • Room 301 • Severe Hypertension
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-extrabold tracking-[0.18em] text-slate-500">
                    NEXT VITALS
                  </div>
                  <div className="font-extrabold text-slate-900 mt-0.5">08:00 AM</div>
                  <div className="mt-1">
                    <Badge tone="accent">SCHEDULED</Badge>
                  </div>
                </div>
              </div>

              <div className="dash-card bg-white/80 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-black/4 border border-black/5" />
                  <div>
                    <div className="font-extrabold text-slate-900">
                      David Miller
                    </div>
                    <div className="text-[12px] dash-muted">
                      B-12 • Room 305 • Post-Op Recovery
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-extrabold tracking-[0.18em] text-slate-500">
                    NEXT VITALS
                  </div>
                  <div className="font-extrabold text-slate-900 mt-0.5">DUE NOW</div>
                  <div className="mt-1">
                    <Badge tone="warning">PENDING</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="dash-glass p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-extrabold tracking-tight">
                Shift Tasks
              </h3>
              <div className="text-[12px] font-semibold dash-muted">4 Remaining</div>
            </div>
            <div className="mt-4 space-y-3">
              {tasks.map((t) => (
                <label
                  key={t.title}
                  className="dash-card bg-white/75 p-4 flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={t.checked}
                    className="mt-1 h-4 w-4 accent-[color:var(--dash-accent)]"
                    readOnly
                  />
                  <div className="flex-1">
                    <div className="font-extrabold text-slate-900 text-sm">
                      {t.title}
                    </div>
                    <div className="text-[12px] dash-muted mt-0.5">{t.due}</div>
                  </div>
                </label>
              ))}
            </div>
            <button
              type="button"
              className="mt-4 w-full h-10 rounded-2xl border border-black/5 bg-white/65 font-semibold text-sm"
            >
              Add Custom Reminder
            </button>
          </div>

          <div className="dash-glass p-6">
            <h3 className="text-[18px] font-extrabold tracking-tight">
              QR Patient Scan
            </h3>
            <p className="mt-2 text-sm dash-muted">
              Instantly access patient charts and record medication by scanning
              wristbands.
            </p>
          </div>

          <div className="dash-glass p-6">
            <div className="flex items-center justify-between">
              <div className="font-extrabold text-slate-900">Recent</div>
              <Badge tone="neutral">Limited Records Access</Badge>
            </div>
            <div className="mt-4 dash-card bg-white/75 p-4">
              <div className="text-[11px] font-extrabold text-slate-700">
                DR. ARIS SALAZAR
              </div>
              <p className="mt-2 text-sm dash-muted">
                Can you double-check Room 304&apos;s oxygen saturation in 15
                mins?
              </p>
              <div className="mt-3 dash-pill h-10 flex items-center justify-between px-3">
                <span className="text-[12px] font-semibold text-slate-600">
                  Understood, doctor. Will update the vitals entry immediately
                  after.
                </span>
                <span className="h-8 w-8 rounded-xl grid place-items-center bg-[color:var(--dash-accent)] text-white font-extrabold">
                  +
                </span>
              </div>
            </div>
          </div>

          <PlaceholderPanel title="Quick Actions" subtitle="Add additional nurse widgets here." />
        </div>
      </section>
    </div>
  );
}

