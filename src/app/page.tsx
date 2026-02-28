"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Fingerprint, Globe2, FileText, Twitter, Instagram, Facebook, HelpCircle, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { joinWaitlist } from "./actions/waitlist";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Parallax interaction values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A] overflow-hidden selection:bg-[#1A1A1A] selection:text-white flex flex-col md:flex-row relative font-sans">
      
      {/* LEFT CONTENT */}
      <div className="w-full md:w-1/2 flex flex-col justify-between p-6 md:p-12 lg:p-20 z-10 min-h-screen md:h-screen md:overflow-y-auto bg-white/50 backdrop-blur-3xl md:bg-transparent md:backdrop-blur-none border-b md:border-b-0 border-[#E5E5E5] relative shadow-none md:shadow-none">
        
        {/* Artistic subtle noise overlay for left panel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-between items-center relative z-10"
        >
          <div>
            <div className="text-xl md:text-2xl font-bold tracking-tighter">BOADERLESS</div>
          </div>
          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#666] bg-[#F2F2F2] px-3 py-1.5 rounded-sm border border-[#E5E5E5]">
            System v1.0
          </div>
        </motion.div>

        {/* Main Copy */}
        <div className="mt-20 md:mt-0 my-auto py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-12 h-1 bg-[#1A1A1A] mb-8"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[3.5rem] leading-[1] md:text-[5rem] lg:text-[6rem] font-medium tracking-tighter mb-6 md:mb-8"
          >
            The agentic visa 
            <br />
            <span className="text-[#A0A0A0]">tool.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base text-[#666] max-w-lg mb-10 md:mb-12 font-light leading-relaxed"
          >
            An agentic visa agent (also called a visa consultant, immigration agent, or visa facilitator) is a tool that assists individuals through the entire visa process from determining eligibility to submission, tracking, and communication with the relevant immigration authority.
            <br/><br/>
            They act on behalf of the applicant (with permission)* to ensure the visa application process is handled correctly and efficiently.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <form 
              className="relative flex items-center group" 
              action={async (formData) => {
                const button = document.getElementById('waitlist-submit');
                if (button) (button as HTMLButtonElement).disabled = true;
                
                const res = await joinWaitlist(formData);
                
                if (res.success) {
                  const form = document.getElementById('waitlist-form') as HTMLFormElement;
                  form?.reset();
                  alert(res.message);
                } else if (res.error) {
                  alert(res.error);
                }
                
                if (button) (button as HTMLButtonElement).disabled = false;
              }}
              id="waitlist-form"
            >
              <input
                type="email"
                name="email"
                placeholder="Initialize access (Email)"
                className="w-full bg-[#FAFAFA] md:bg-white border border-[#E5E5E5] rounded-none py-4 pl-5 md:pl-6 pr-16 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] focus:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]"
                required
              />
              <button
                type="submit"
                id="waitlist-submit"
                className="absolute right-1 top-1 bottom-1 aspect-square bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#333] hover:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Join Waitlist"
              >
                <ArrowUpRight size={18} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </form>
            <div className="mt-5 flex items-center gap-2 text-[10px] md:text-[11px] text-[#888] uppercase tracking-wider font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Accepting beta participants
            </div>
          </motion.div>
        </div>
        
        {/* Footer info & Socials (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 hidden md:flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mt-12"
        >
          <div className="text-[#A0A0A0] text-[10px] md:text-xs max-w-[200px] leading-relaxed font-mono tracking-wide uppercase">
            Boaderless acts on your behalf with complete mechanical precision.
          </div>

          {/* Social & Support Links */}
          <div className="flex gap-4 md:gap-5 text-[#888]">
            <a href="#" className="hover:text-[#1A1A1A] transition-colors" aria-label="Twitter/X">
              <Twitter size={16} strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors" aria-label="Instagram">
              <Instagram size={16} strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors" aria-label="Facebook">
              <Facebook size={16} strokeWidth={1.5} />
            </a>
            <div className="w-px h-4 bg-[#E5E5E5] self-center mx-1 hidden sm:block" />
            <a href="#" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider" aria-label="Support">
              <HelpCircle size={15} strokeWidth={1.5} />
              <span className="hidden sm:inline">Support</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* PREMIUM 3D RIGHT CONTENT */}
      <div 
        className="w-full md:w-1/2 h-[75vh] md:h-screen relative flex items-center justify-center bg-[#F5F5F7] overflow-hidden border-t md:border-t-0 md:border-l border-[#E5E5E5] perspective-[2000px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Deep perspective wrapper */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Animated Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-blue-100/40 via-purple-100/30 to-transparent blur-3xl pointer-events-none" style={{ transform: "translateZ(-400px)" }} />

          {/* Holographic Rings (Core) */}
          <motion.div 
            animate={{ rotateZ: 360, rotateX: [60, 65, 60] }}
            transition={{ rotateZ: { duration: 40, repeat: Infinity, ease: "linear" }, rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute rounded-full border border-black-[0.03] w-[500px] h-[500px] md:w-[600px] md:h-[600px] pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-200px)' }}
          />
          <motion.div 
            animate={{ rotateZ: -360, rotateX: [50, 45, 50] }}
            transition={{ rotateZ: { duration: 50, repeat: Infinity, ease: "linear" }, rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute rounded-full border border-black/5 w-[400px] h-[400px] md:w-[500px] md:h-[500px] pointer-events-none"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-100px)' }}
          />

          {/* Central Connecting Data Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateZ(0px)' }}>
            <svg 
              className="w-[600px] h-[600px] opacity-60 hidden md:block overflow-visible" 
              viewBox="0 0 600 600"
            >
              {/* Soft backdrop lines */}
              <path d="M 200 150 Q 300 300 400 450 M 400 150 Q 300 300 200 450 M 300 100 L 300 500" fill="transparent" stroke="#000000" strokeOpacity="0.04" strokeWidth="2" strokeDasharray="6 6" />
              
              {/* Animated Stream 1 */}
              <motion.path 
                d="M 200 150 Q 300 300 400 450" 
                fill="transparent" 
                stroke="url(#gradientStream)" 
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* Animated Stream 2 */}
              <motion.path 
                d="M 400 150 Q 300 300 200 450" 
                fill="transparent" 
                stroke="url(#gradientStream2)" 
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "linear" }}
              />
              
              <defs>
                <linearGradient id="gradientStream" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0" />
                  <stop offset="50%" stopColor="#1A1A1A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gradientStream2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#888888" stopOpacity="0" />
                  <stop offset="50%" stopColor="#888888" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#888888" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Data Nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: Math.random() * 500 - 250, x: Math.random() * 500 - 250, opacity: 0, scale: 0 }}
              animate={{ 
                y: [null, Math.random() * 500 - 250],
                x: [null, Math.random() * 500 - 250],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0] 
              }}
              transition={{ repeat: Infinity, duration: 6 + Math.random() * 8, ease: "easeInOut" }}
              className="absolute w-1.5 h-1.5 rounded-full bg-black/30 blur-[0.5px] z-0"
              style={{ transform: `translateZ(${Math.random() * 600 - 300}px)` }}
            />
          ))}

          {/* Top Left Card - Eligibility */}
          <motion.div 
            initial={{ x: -120, y: -160 }}
            animate={{ y: [-160, -170, -160] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            style={{ transform: 'translateZ(-100px)' }}
            className="absolute z-20"
          >
            <div className="w-64 sm:w-72 md:w-80 p-6 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.06)] rounded-2xl relative overflow-hidden group hover:bg-white/80 transition-all duration-500 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                  <Globe2 size={16} className="text-[#1A1A1A]" strokeWidth={1.5} />
                </div>
                <div className="px-2 py-1 rounded-md bg-black/5 border border-black/5 flex items-center gap-1.5">
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-1 rounded-full bg-[#1A1A1A]" />
                  <span className="text-[9px] font-mono tracking-widest text-[#666]">PHASE 1</span>
                </div>
              </div>
              <h3 className="text-base font-medium tracking-tight mb-2 text-[#1A1A1A]">Automated Eligibility</h3>
              <p className="text-xs text-[#666] leading-relaxed">Cross-referencing applicant metadata against deterministic immigration requirements seamlessly.</p>
            </div>
          </motion.div>

          {/* Middle Right Card - Compilation */}
          <motion.div 
            initial={{ x: 100, y: -20 }}
            animate={{ y: [-20, -10, -20] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            style={{ transform: 'translateZ(100px)' }}
            className="absolute z-30"
          >
            <div className="w-64 sm:w-72 md:w-80 p-6 bg-white/70 backdrop-blur-2xl border border-white/90 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] rounded-2xl relative overflow-hidden group hover:bg-white/90 transition-all duration-500 ring-1 ring-black/5 cursor-default">
              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                  <FileText size={16} className="text-[#1A1A1A]" strokeWidth={1.5} />
                </div>
                <div className="px-2 py-1 rounded-md bg-black/5 border border-black/5 flex items-center gap-1.5">
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="w-1 h-1 rounded-full bg-[#1A1A1A]" />
                  <span className="text-[9px] font-mono tracking-widest text-[#666]">PHASE 2</span>
                </div>
              </div>
              
              {/* Micro progression bar */}
              <div className="w-full h-1 bg-black/5 rounded-full mb-4 overflow-hidden">
                 <motion.div 
                   className="h-full bg-[#1A1A1A]" 
                   initial={{ width: "20%" }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
                 />
              </div>

              <h3 className="text-base font-medium text-[#1A1A1A] tracking-tight mb-2">Smart Compilation</h3>
              <p className="text-xs text-[#666] leading-relaxed">Algorithmic generation of necessary state forms, resolving conflicting document requirements.</p>
            </div>
          </motion.div>

          {/* Bottom Left Card - Execution  */}
          <motion.div 
            initial={{ x: -80, y: 140 }}
            animate={{ y: [140, 150, 140] }}
            transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
            style={{ transform: 'translateZ(250px)' }}
            className="absolute z-40"
          >
             <div className="w-64 sm:w-72 md:w-80 p-6 bg-[#18181B]/95 backdrop-blur-2xl border border-[#27272A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-2xl relative overflow-hidden group cursor-default transition-all duration-500 hover:border-[#3F3F46]">
              {/* Advanced Glare Effect on Dark Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                 <div className="w-10 h-10 rounded-xl bg-[#27272A] border border-[#3F3F46] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                  <Fingerprint size={16} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="px-2 py-1 rounded-md bg-white/10 border border-white/5 flex items-center gap-1.5">
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="w-1 h-1 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                  <span className="text-[9px] font-mono tracking-widest text-[#A0A0A0]">EXECUTION</span>
                </div>
              </div>
              <h3 className="text-base font-medium text-white tracking-tight mb-2 relative z-10">Direct Submission</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed relative z-10">Autonomous payload delivery and persistent status tracking via secured state APIs.</p>
            </div>
          </motion.div>

        </motion.div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.05)] origin-center" />
      </div>

      {/* Footer info & Socials (Mobile Only) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full flex md:hidden flex-col sm:flex-row justify-between items-start sm:items-center gap-8 p-8 sm:p-12 bg-white relative z-20 border-t border-[#E5E5E5]"
      >
        <div className="text-[#A0A0A0] text-[10px] sm:text-xs max-w-[200px] leading-relaxed font-mono tracking-wide uppercase">
          Boaderless acts on your behalf with complete mechanical precision.
        </div>

        {/* Social & Support Links */}
        <div className="flex gap-4 sm:gap-5 text-[#888]">
          <a href="#" className="hover:text-[#1A1A1A] transition-colors" aria-label="Twitter/X">
            <Twitter size={16} strokeWidth={1.5} />
          </a>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors" aria-label="Instagram">
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <a href="#" className="hover:text-[#1A1A1A] transition-colors" aria-label="Facebook">
            <Facebook size={16} strokeWidth={1.5} />
          </a>
          <div className="w-px h-4 bg-[#E5E5E5] self-center mx-1 hidden sm:block" />
          <a href="#" className="hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider" aria-label="Support">
            <HelpCircle size={15} strokeWidth={1.5} />
            <span className="hidden sm:inline">Support</span>
          </a>
        </div>
      </motion.div>

    </div>
  );
}
