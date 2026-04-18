import type { JSX } from "react";

const footerColumns = [
  {
    title: "Product",
    links: ["Precision Dashboards", "EHR Partner Hub", "Lab Node Analytics", "Pharmacy Sync"],
  },
  {
    title: "Resources",
    links: ["API Documentation", "Case Studies", "Compliance Pipeline", "Interoperability Standards"],
  },
  {
    title: "Company",
    links: ["Roadmap", "Methodologies", "Security Assurances", "Privacy Policy"],
  },
  {
    title: "Support",
    links: ["Technical Help Center", "Security Escalations", "Privacy Policy", "Terms of Service"],
  },
];

export function SiteFooter(): JSX.Element {
  return (
    <footer className="bg-[linear-gradient(130deg,#061022_0%,#0f2341_56%,#08142a_100%)] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-4xl font-black tracking-[-0.03em]">Clinical Architect</h3>
            <p className="mt-3 text-sm leading-7 text-(--ca-footer-subtext)">
              Empowering clinicians with high-fidelity intelligence systems for better outcomes and operational precision.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-black">{column.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-(--ca-footer-subtext)">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.16em] text-(--ca-footer-subtext)">
          © 2035 Clinical Architect Protect. All rights reserved. Precision in care.
        </div>
      </div>
    </footer>
  );
}
