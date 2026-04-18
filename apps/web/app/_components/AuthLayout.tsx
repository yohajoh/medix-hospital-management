import { HeartPulse, HelpCircle } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col font-sans selection:bg-[#1A4F95]/10">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-[#1A4F95] font-black text-xl tracking-tight">
          <HeartPulse className="w-7 h-7 stroke-[2.5]" />
          <span>Clinical Architect Portal</span>
        </div>
        <div className="bg-gray-100 p-1.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
          <HelpCircle className="w-5 h-5 text-[#5A7184]" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(26,79,149,0.04)_0%,_transparent_50%)] pointer-events-none" />
        <div className="z-10 w-full flex flex-col items-center">
          {children}

          {/* Progress Indicator Slider */}
          <div className="mt-12 w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[#1A4F95]/40 rounded-full" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 bg-white/50 backdrop-blur-sm text-[10px] font-bold text-[#A0AEC0] uppercase tracking-[0.1em] gap-4">
        <p>© 2026 CLINICAL ARCHITECT HEALTH SYSTEMS. HIPPA COMPLIANT ENVIRONMENT.</p>
        <div className="flex gap-8">
          <span className="hover:text-[#1A4F95] cursor-pointer">Security Policy</span>
          <span className="hover:text-[#1A4F95] cursor-pointer">Terms of Service</span>
          <span className="hover:text-[#1A4F95] cursor-pointer">System Status</span>
          <span className="hover:text-[#1A4F95] cursor-pointer">Emergency Support</span>
        </div>
      </footer>
    </div>
  );
}
