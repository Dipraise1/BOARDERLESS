"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Fingerprint, Globe2, FileText, Twitter, Instagram, Facebook, HelpCircle, Activity } from "lucide-react";
import { useEffect, useState } from "react";

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
            <form className="relative flex items-center group" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Initialize access (Email)"
                className="w-full bg-[#FAFAFA] md:bg-white border border-[#E5E5E5] rounded-none py-4 pl-5 md:pl-6 pr-16 text-sm placeholder:text-[#999] focus:outline-none focus:border-[#1A1A1A] transition-all shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] focus:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 aspect-square bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#333] hover:scale-[0.98] transition-all"
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

      {/* ADVANCED RIGHT CONTENT (3D Interaction Area) */}
      <div 
        className="w-full md:w-1/2 h-[75vh] md:h-screen relative flex items-center justify-center bg-[#F2F2F2] overflow-hidden border-t md:border-t-0 md:border-l border-[#E5E5E5]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Artistic background graphics */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#D4D4D4 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full bg-gradient-to-tr from-[#E5E5E5]/50 to-transparent blur-3xl pointer-events-none" />

        {/* 3D Scene Container with Interactive Tilt */}
        <motion.div 
          style={{ rotateX, rotateY }}
          className="relative w-full h-full perspective-[1000px] md:perspective-[1400px] flex items-center justify-center scale-75 sm:scale-90 md:scale-100 transform-style-3d"
        >
          
          {/* Central Connecting Data Line (SVG) */}
          <motion.svg 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-10 hidden md:block" 
            viewBox="0 0 600 600"
          >
            <motion.path 
              d="M 240 200 C 240 300, 360 300, 360 400" 
              fill="transparent" 
              stroke="#D4D4D4" 
              strokeWidth="1.5" 
              strokeDasharray="4 4" 
            />
            <motion.path 
              d="M 240 200 C 240 300, 360 300, 360 400" 
              fill="transparent" 
              stroke="#1A1A1A" 
              strokeWidth="2" 
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1, opacity: [0, 1, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.svg>

          {/* Floating Data Nodes (Background) */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: Math.random() * 400 - 200, x: Math.random() * 400 - 200, opacity: 0, scale: 0 }}
              animate={{ 
                y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0] 
              }}
              transition={{ repeat: Infinity, duration: 5 + Math.random() * 5, ease: "linear" }}
              className="absolute w-2 h-2 rounded-full bg-[#A0A0A0] shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] z-0"
              style={{ translateZ: Math.random() * -200 }}
            />
          ))}

          {/* Top Card - Eligibility (Pushing back in Z space) */}
          <motion.div 
            initial={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 0.8, opacity: 0, x: -80, y: -120 }}
            animate={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 1, opacity: 1, x: -60, y: -140 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute z-20"
            style={{ translateZ: -100 }}
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="group w-64 sm:w-72 md:w-80 p-6 bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.06)] rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-[#F2F2F2] opacity-50 rounded-full blur-2xl group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center shadow-inner">
                  <Globe2 size={18} className="text-[#1A1A1A]" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2">
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#888]">Process .01</span>
                </div>
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2 relative z-10">Automated Eligibility</h3>
              <p className="text-xs text-[#666] leading-relaxed relative z-10">Matching profile metadata with deterministic global visa requirement algorithms seamlessly.</p>
            </motion.div>
          </motion.div>

          {/* Middle Card - Smart Compilation (Floating in Middle Z space) */}
          <motion.div 
            initial={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 0.8, opacity: 0, x: 0, y: -20 }}
            animate={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 1, opacity: 1, x: 20, y: -30 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute z-30"
            style={{ translateZ: 0 }}
          >
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="group w-64 sm:w-72 md:w-80 p-6 bg-[#FAFAFA]/90 backdrop-blur-2xl border border-white/80 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.1)] rounded-xl relative overflow-hidden ring-1 ring-[#1A1A1A]/5"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center shadow-sm">
                  <FileText size={18} className="text-[#1A1A1A]" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={12} className="text-[#888] animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#888]">Process .02</span>
                </div>
              </div>
              <div className="w-full h-1 bg-[#E5E5E5] rounded-full mb-4 overflow-hidden">
                 <motion.div 
                   className="h-full bg-[#1A1A1A]" 
                   initial={{ width: "0%" }} 
                   animate={{ width: "100%" }} 
                   transition={{ duration: 3, repeat: Infinity }} 
                 />
              </div>
              <h3 className="text-lg font-medium text-[#1A1A1A] tracking-tight mb-2">Smart Compilation</h3>
              <p className="text-xs text-[#666] leading-relaxed">Instantly generating necessary paperwork and resolving missing requirement conflicts.</p>
            </motion.div>
          </motion.div>

          {/* Bottom Card - Direct Execution (Pulling forward in Z space) */}
          <motion.div 
            initial={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 0.8, opacity: 0, x: 70, y: 80 }}
            animate={{ rotateX: 25, rotateY: -35, rotateZ: 5, scale: 1, opacity: 1, x: 100, y: 80 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="absolute z-40"
            style={{ translateZ: 100 }}
          >
             <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="group w-64 sm:w-72 md:w-80 p-6 bg-[#1A1A1A]/95 backdrop-blur-xl border border-[#333] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] rounded-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-transparent to-white/5 opacity-50 pointer-events-none" />
              <div className="flex justify-between items-start mb-8 relative z-10">
                 <div className="w-10 h-10 rounded-full bg-[#333] border border-[#444] flex items-center justify-center shadow-inner">
                  <Fingerprint size={18} className="text-white" strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#A0A0A0] border border-[#333] px-2 py-1 rounded bg-[#222]">Process .03</span>
              </div>
              <h3 className="text-lg font-medium text-white tracking-tight mb-2">Direct Execution</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">Autonomous submission and persistent tracking directly with global immigration authorities.</p>
            </motion.div>
          </motion.div>

        </motion.div>
        
        {/* Desktop overlay gradient for clean fade */}
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F2F2F2] to-transparent pointer-events-none hidden md:block z-50" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F2F2F2] to-transparent pointer-events-none hidden md:block z-50" />
        <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-[#F2F2F2] to-transparent pointer-events-none md:hidden z-50" />
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
