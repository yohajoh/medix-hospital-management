/* eslint-disable @next/next/no-img-element */

import type { JSX } from "react";

import type { Testimonial } from "./types";

interface TestimonialsAppointmentProps {
  testimonials: Testimonial[];
}

export function TestimonialsAppointmentSection({ testimonials }: TestimonialsAppointmentProps): JSX.Element {
  return (
    <section className="bg-(--ca-surface) py-12">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.18fr_0.82fr] lg:px-8">
        <article>
          <h2 className="text-5xl font-black tracking-[-0.04em] text-(--ca-text)">Patient Experiences</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-2xl border border-(--ca-border) bg-(--ca-surface) p-5">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="text-lg font-black text-(--ca-text)">{item.name}</div>
                    <div className="text-xs text-(--ca-text-subtle)">{item.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-(--ca-text-muted)">“{item.quote}”</p>
              </div>
            ))}
          </div>
        </article>

        <aside className="rounded-2xl border border-(--ca-border) bg-(--ca-surface) p-6 shadow-[0_20px_50px_rgba(17,33,58,0.08)]">
          <h3 className="text-5xl font-black tracking-[-0.04em] text-(--ca-text)">Book Appointment</h3>
          <form className="mt-6 space-y-3">
            <label className="sr-only" htmlFor="appointment-first-name">
              First name
            </label>
            <input id="appointment-first-name" className="ca-input" placeholder="First name" />

            <label className="sr-only" htmlFor="appointment-email">
              Email address
            </label>
            <input id="appointment-email" className="ca-input" placeholder="Email address" />

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="appointment-speciality">
                Speciality
              </label>
              <select id="appointment-speciality" className="ca-input" title="Speciality">
                <option>Speciality</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Orthopedics</option>
              </select>

              <label className="sr-only" htmlFor="appointment-date">
                Date
              </label>
              <input id="appointment-date" className="ca-input" type="date" title="Date" />
            </div>
            <button
              type="button"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#2d4f75] bg-(--ca-brand-900) text-base font-semibold text-white shadow-[0_10px_24px_rgba(8,30,56,0.3)]"
            >
              Schedule Appointment
            </button>
          </form>
        </aside>
      </div>
    </section>
  );
}
