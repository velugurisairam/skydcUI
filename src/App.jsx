import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Monitor, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Menu, 
  X, 
  ChevronRight, 
  Play, 
  CheckCircle,
  Layers,
  ArrowRight,
  Sparkles,
  Loader2,
  Terminal,
  Command,
  Wifi,
  HardDrive,
  Maximize,
  Code,
  Image as ImageIcon,
  Box,
  Server,
  BarChart3,
  Star,
  ChevronDown,
  ChevronUp,
  Laptop
} from 'lucide-react';

// --- Custom Hook for Scroll Animations ---
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); 
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// --- Custom Hook for Mouse Parallax ---
const useParallax = (sensitivity = 20) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * sensitivity;
      const y = (e.clientY / window.innerHeight - 0.5) * sensitivity;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);

  return offset;
};

// --- Animated Wrapper Component (Memoized for Efficiency) ---
const Reveal = React.memo(({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        willChange: 'opacity, transform'
      }}
      className={`transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
});

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('creators');
  const [activeFaq, setActiveFaq] = useState(null);
  const parallax = useParallax(30); // Hero parallax effect

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother scroll handling
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { name: 'Product', href: '#features' },
    { name: 'How It Works', href: '#steps' },
    { name: 'Performance', href: '#performance' },
    { name: 'Pricing', href: '#footer' },
  ], []);

  const faqs = useMemo(() => [
    { q: "Do I need a fast internet connection?", a: "We recommend at least 15 Mbps for 1080p and 50 Mbps for 4K streaming. Our adaptive bitrate technology ensures smooth performance even on fluctuating connections." },
    { q: "Can I install my own software?", a: "Absolutely. You get full administrator access to a Windows or Linux environment. Install Steam, Adobe Suite, Blender, VS Code, or any custom enterprise software." },
    { q: "Is my data persistent?", a: "Yes. Your storage drive persists between sessions. When you shut down your Personal PC, your files are encrypted and stored safely until you launch it again." },
    { q: "What happens if I forget to shut down?", a: "You can set auto-shutdown timers to prevent accidental charges. We also send notifications if your machine has been idle for an extended period." }
  ], []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
      
      {/* Global Styles for Custom Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes typing {
          0% { width: 0; }
          50% { width: 100%; }
          90% { width: 100%; }
          100% { width: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes grow-bar {
          0% { width: 0; }
          100% { width: var(--target-width); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-grid { animation: grid-move 20s linear infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-grow-bar { animation: grow-bar 1.5s ease-out forwards; }
        
        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .glass-card-hover:hover {
          background: rgba(30, 41, 59, 0.7);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.1);
        }
        .tech-card-gradient {
            background: linear-gradient(145deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.4) 100%);
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(56, 189, 248, 0.6);
        }
        .hero-glow-text {
           background: linear-gradient(to right, #ffffff 20%, #38bdf8 40%, #ffffff 60%, #ffffff 80%);
           background-size: 200% auto;
           color: #000;
           background-clip: text;
           text-fill-color: transparent;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           animation: shine 5s linear infinite;
        }
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .noise-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .shimmer-btn {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% 100%;
          transition: background-position 0.5s;
        }
        .shimmer-btn:hover {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>

      {/* Noise Texture Overlay */}
      <div className="noise-bg"></div>

      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl shadow-blue-900/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="bg-gradient-to-tr from-blue-600 to-cyan-500 p-2 rounded-lg relative">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                SkyDC
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 hover:bg-white/5 rounded-full transition-all">
                Sign In
              </button>
              <button className="relative overflow-hidden bg-white text-slate-900 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] group shimmer-btn">
                <span className="relative z-10 group-hover:text-blue-900 transition-colors">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 px-4 py-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-slate-300 hover:text-cyan-400 pl-2 border-l-2 border-transparent hover:border-cyan-400 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10 my-2" />
              <button className="bg-blue-600 text-white px-4 py-3 rounded-xl text-center font-bold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* REIMAGINED HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center bg-[#020617]">
        
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Cyber Grid Floor */}
            <div className="absolute bottom-0 left-[-50%] right-[-50%] h-[500px] opacity-20"
                 style={{
                    background: 'linear-gradient(transparent 0%, #0ea5e9 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent, black)',
                    transform: 'perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px)',
                 }}>
                 <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                    animation: 'grid-move 20s linear infinite'
                 }}></div>
            </div>
            
            {/* Top Spotlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-[100%] blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            {/* Hero Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left relative">
              <Reveal>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 backdrop-blur-md mb-8 hover:bg-slate-800 transition-all cursor-default shadow-[0_0_20px_rgba(59,130,246,0.15)] group">
                  <span className="relative flex h-2 w-2 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-sm text-slate-300 font-medium tracking-wide group-hover:text-white transition-colors">
                    <span className="text-blue-400 font-bold">New:</span> 24GB VRAM Instances Live
                  </span>
                </div>
              </Reveal>
              
              <Reveal delay={100}>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[1.05]">
                  Infinite <br />
                  <span className="hero-glow-text">Computing.</span>
                </h1>
              </Reveal>
              
              <Reveal delay={200}>
                <p className="max-w-xl mx-auto lg:mx-0 text-xl text-slate-400 mb-12 leading-relaxed">
                  Abandon hardware limitations. Stream a supercomputer to your browser with <span className="text-white font-semibold">zero latency</span>. 
                  Perfect for 3D rendering, ML training, and AAA gaming.
                </p>
              </Reveal>
              
              <Reveal delay={300}>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <button className="w-full sm:w-auto px-10 py-5 bg-white text-black hover:bg-cyan-50 rounded-full font-bold text-lg transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 flex items-center justify-center group relative overflow-hidden">
                    <span className="relative z-10 flex items-center">Start Free Trial <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /></span>
                  </button>
                  
                  <button className="w-full sm:w-auto px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center group">
                    <Play className="mr-3 h-5 w-5 fill-current text-white group-hover:scale-110 transition-transform" />
                    See It In Action
                  </button>
                </div>
              </Reveal>
              
              <Reveal delay={400}>
                <div className="mt-16 flex items-center justify-center lg:justify-start space-x-6 text-slate-500 text-sm border-t border-white/5 pt-8">
                   <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>No credit card required</span>
                   </div>
                   <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Cancel anytime</span>
                   </div>
                </div>
              </Reveal>
            </div>

            {/* Hero Visual - "The Holographic Rig" with Mouse Parallax */}
            <div 
              className="lg:w-1/2 relative lg:h-[700px] flex items-center justify-center perspective-1000"
              style={{
                perspective: '1000px'
              }}
            >
              <div 
                className="relative w-full max-w-xl aspect-square transition-transform duration-100 ease-out"
                style={{
                  transform: `rotateY(${parallax.x}deg) rotateX(${-parallax.y}deg)`
                }}
              >
                
                {/* Central Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 rounded-full blur-[100px] animate-pulse-glow"></div>

                {/* Main Terminal Window */}
                <div className="relative z-20 bg-[#0B1120]/90 backdrop-blur-xl border border-blue-500/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.3)] transform rotate-y-[-10deg] rotate-x-[5deg] animate-float">
                    
                    {/* Window Controls */}
                    <div className="h-10 bg-[#020617] border-b border-white/10 flex items-center px-4 justify-between">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-xs text-slate-500 font-mono flex items-center">
                            <Shield size={10} className="mr-1 text-green-500" /> 
                            SECURE_CONNECTION_ESTABLISHED
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 font-mono text-sm h-[320px] w-[500px] text-blue-100 overflow-hidden relative">
                        <div className="space-y-2">
                            <div className="flex">
                                <span className="text-green-400 mr-2">➜</span>
                                <span className="text-blue-300">~</span>
                                <span className="text-slate-400 ml-2">personal-pc init --gpu=rtx4090</span>
                            </div>
                            
                            <div className="pl-4 border-l border-white/10 space-y-1 text-xs text-slate-400 py-2">
                                <div>[INFO] Allocating isolated environment...</div>
                                <div>[INFO] Mounting 2TB NVMe Storage... <span className="text-green-400">DONE (0.2s)</span></div>
                                <div>[INFO] Initializing NVIDIA Drivers v535.86... <span className="text-green-400">DONE</span></div>
                            </div>

                            <div className="flex pt-2">
                                <span className="text-green-400 mr-2">➜</span>
                                <span className="text-blue-300">~</span>
                                <span className="text-slate-400 ml-2">./run-benchmark.sh</span>
                            </div>

                            {/* Live Stats Visual */}
                            <div className="mt-4 bg-[#020617]/80 rounded-lg p-4 border border-blue-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl -mr-10 -mt-10"></div>
                                <div className="grid grid-cols-2 gap-4 relative z-10">
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">GPU Load</div>
                                        <div className="text-2xl font-bold text-white mb-1">98<span className="text-sm text-slate-500">%</span></div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[98%] shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Memory</div>
                                        <div className="text-2xl font-bold text-white mb-1">18.4<span className="text-sm text-slate-500">GB</span></div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[75%] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-xs border-t border-white/5 pt-3">
                                    <span className="text-slate-400">FPS: <span className="text-green-400 font-bold">144</span></span>
                                    <span className="text-slate-400">Latency: <span className="text-green-400 font-bold">12ms</span></span>
                                </div>
                            </div>
                        </div>

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-4 w-full animate-[scanline_3s_linear_infinite] pointer-events-none"></div>
                    </div>
                </div>

                {/* Floating Elements around Terminal (Reacting to Parallax) */}
                <div 
                  className="absolute -right-12 top-20 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-xl shadow-xl"
                  style={{ transform: `translateZ(50px) translateX(${-parallax.x * 1.5}px) translateY(${-parallax.y * 1.5}px)` }}
                >
                    <Server className="text-blue-400 h-6 w-6" />
                </div>
                <div 
                  className="absolute -left-8 bottom-32 bg-slate-900/90 backdrop-blur border border-slate-700 p-3 rounded-xl shadow-xl"
                  style={{ transform: `translateZ(30px) translateX(${parallax.x * 1.2}px) translateY(${parallax.y * 1.2}px)` }}
                >
                    <Cpu className="text-green-400 h-6 w-6" />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-12 bg-slate-950/50 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
            <p className="text-slate-500 text-sm font-semibold tracking-widest uppercase">Powering Workflows In</p>
        </div>
        <div className="relative w-full">
            <div className="flex whitespace-nowrap animate-marquee">
                {/* Original Set */}
                {[
                  "Unreal Engine 5", "Blender", "Adobe After Effects", "Unity", "Maya", 
                  "TensorFlow", "PyTorch", "Cinema 4D", "Houdini", "VS Code", "Docker", "Kubernetes"
                ].map((item, i) => (
                    <div key={i} className="mx-8 flex items-center space-x-2 text-2xl font-bold text-slate-700 hover:text-cyan-500 transition-colors cursor-default">
                        <span>{item}</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-800 ml-8"></div>
                    </div>
                ))}
                {/* Duplicate Set for smooth loop */}
                {[
                   "Unreal Engine 5", "Blender", "Adobe After Effects", "Unity", "Maya", 
                   "TensorFlow", "PyTorch", "Cinema 4D", "Houdini", "VS Code", "Docker", "Kubernetes"
                ].map((item, i) => (
                    <div key={`dup-${i}`} className="mx-8 flex items-center space-x-2 text-2xl font-bold text-slate-700 hover:text-cyan-500 transition-colors cursor-default">
                        <span>{item}</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-slate-800 ml-8"></div>
                    </div>
                ))}
            </div>
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10"></div>
        </div>
      </section>

      {/* NEW: Launch in 3 Steps */}
      <section id="steps" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Launch Your Supercomputer</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Go from signup to a fully powerful desktop in under 60 seconds.
                    </p>
                </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-900 to-transparent z-0"></div>
                
                <StepCard 
                    delay={0}
                    number="01"
                    title="Create Account"
                    description="Sign up in seconds. No lengthy verification or hardware deposits required."
                    icon={<Users className="text-white" />}
                />
                <StepCard 
                    delay={100}
                    number="02"
                    title="Choose Config"
                    description="Select from Starter, Pro, or Studio tiers based on your workflow needs."
                    icon={<Cpu className="text-white" />}
                />
                <StepCard 
                    delay={200}
                    number="03"
                    title="Connect & Create"
                    description="Launch your desktop in the browser or via our native app. Zero latency."
                    icon={<Zap className="text-white" />}
                />
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Reveal>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Features that scale</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              delay={0}
              icon={<Cpu className="h-8 w-8 text-cyan-400" />}
              title="RTX Enabled GPUs"
              description="Access the latest NVIDIA RTX GPUs for ray-tracing, AI rendering, and heavy computation workloads."
            />
            <FeatureCard 
              delay={100}
              icon={<Zap className="h-8 w-8 text-yellow-400" />}
              title="Low Latency Streaming"
              description="Our proprietary protocol delivers up to 4K 60FPS with sub-millisecond input delay."
            />
            <FeatureCard 
              delay={200}
              icon={<Globe className="h-8 w-8 text-blue-400" />}
              title="Global Coverage"
              description="23+ Data centers worldwide ensure you are always close to your personal workstation."
            />
            <FeatureCard 
              delay={300}
              icon={<Shield className="h-8 w-8 text-green-400" />}
              title="Encrypted & Isolated"
              description="Your data is yours. Every machine is an isolated VM with AES-256 encrypted connections."
            />
            <FeatureCard 
              delay={400}
              icon={<Layers className="h-8 w-8 text-purple-400" />}
              title="Scalable Storage"
              description="Expand your SSD storage on the fly. Keep your heavy assets in the cloud, accessible anywhere."
            />
            <FeatureCard 
              delay={500}
              icon={<Users className="h-8 w-8 text-pink-400" />}
              title="Team Workspaces"
              description="Onboard freelancers or team members in seconds with pre-configured environments."
            />
          </div>
        </div>
      </section>

      {/* Interactive Use Cases */}
      <section id="solutions" className="py-32 relative overflow-hidden bg-[#020617]">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
           <div className={`absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${activeTab === 'creators' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
           <div className={`absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] transition-all duration-1000 ease-in-out ${activeTab === 'engineers' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header & Tab Switcher */}
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        One Platform. <br/>
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r animate-gradient-x ${activeTab === 'creators' ? 'from-blue-400 via-cyan-400 to-emerald-400' : 'from-pink-400 via-purple-400 to-indigo-400'}`}>
                            Infinite Possibilities.
                        </span>
                    </h2>
                    
                    {/* Enhanced Tab Pill */}
                    <div className="inline-flex bg-slate-900/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md relative shadow-2xl">
                        {/* Sliding Background */}
                        <div 
                            className={`absolute top-1.5 bottom-1.5 rounded-full shadow-lg transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-0 ${activeTab === 'creators' ? 'bg-blue-600' : 'bg-purple-600'}`}
                            style={{
                                left: activeTab === 'creators' ? '6px' : '50%',
                                width: 'calc(50% - 9px)',
                                transform: activeTab === 'engineers' ? 'translateX(3px)' : 'translateX(0)' 
                            }}
                        />
                        
                        {['creators', 'engineers'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 ${
                                    activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'
                                } min-w-[160px] flex items-center justify-center`}
                            >
                                {tab === 'creators' ? <ImageIcon size={16} className="mr-2" /> : <Code size={16} className="mr-2" />}
                                For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </Reveal>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Text Content */}
                <div className="relative min-h-[400px]">
                    {activeTab === 'creators' ? (
                        <div className="absolute inset-0 transition-all duration-500 ease-in-out opacity-100 translate-x-0">
                            <Reveal delay={100}>
                                <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                                    <Box className="text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Accelerate your Creative Suite</h3>
                                <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                                    Running After Effects, Blender, or Premiere Pro on a laptop? Stop waiting for render bars. Personal PC gives you desktop-class power on the go.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <ListItem text="Render 10x faster with cloud GPUs" color="text-blue-400" />
                                    <ListItem text="Edit 8K footage without proxies" color="text-blue-400" />
                                    <ListItem text="Collaborate on large assets instantly" color="text-blue-400" />
                                </ul>
                                <button className="text-blue-400 font-bold flex items-center hover:text-blue-300 group/btn">
                                    Explore Creative Workflows <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                                </button>
                            </Reveal>
                        </div>
                    ) : (
                        <div className="absolute inset-0 transition-all duration-500 ease-in-out opacity-100 translate-x-0">
                            <Reveal delay={100}>
                                <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                                    <Terminal className="text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Compile Faster. Build More.</h3>
                                <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                                    Perfect for game development, data science, and heavy compilation tasks. Spin up a fresh environment for every project in seconds.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <ListItem text="Unreal Engine 5 & Unity ready" color="text-purple-400" />
                                    <ListItem text="Linux & Windows dual-boot options" color="text-purple-400" />
                                    <ListItem text="Scalable cores for data processing" color="text-purple-400" />
                                </ul>
                                <button className="text-purple-400 font-bold flex items-center hover:text-purple-300 group/btn">
                                    Explore Engineering Docs <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                                </button>
                            </Reveal>
                        </div>
                    )}
                </div>

                {/* Right Visual Content */}
                <div className="relative group perspective-1000">
                     <Reveal delay={200}>
                        <div className={`absolute -inset-1 rounded-2xl blur-lg opacity-40 transition-colors duration-500 ${activeTab === 'creators' ? 'bg-blue-600' : 'bg-purple-600'}`}></div>
                        
                        <div className="relative glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-[1.02] hover:-rotate-1">
                            {/* Browser Header */}
                            <div className="bg-[#0F172A] px-5 py-3 border-b border-slate-800 flex items-center space-x-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                    <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                </div>
                                <div className="bg-[#1E293B] px-4 py-1.5 rounded-lg text-xs text-slate-400 flex-1 text-center font-mono flex items-center justify-center">
                                    <Shield size={12} className="mr-2" /> 
                                    {activeTab === 'creators' ? 'blender-cloud-session-01' : 'root@vagon-instance-dev'}
                                </div>
                            </div>

                            {/* Dynamic Viewport */}
                            <div className="aspect-[16/10] bg-black relative">
                                {activeTab === 'creators' ? (
                                    <div className="w-full h-full relative overflow-hidden bg-slate-900">
                                        {/* Simulated 3D Viewport */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                                        <img 
                                            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                                            alt="Render" 
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
                                        />
                                        
                                        {/* Floating UI Overlay */}
                                        <div className="absolute top-4 left-4 right-4 flex justify-between text-[10px] font-mono text-slate-400">
                                            <div className="space-y-1">
                                                <div>Perspective</div>
                                                <div>(1) Collection | Camera</div>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <div>FPS: 60</div>
                                                <div>Mem: 14.2 GB</div>
                                            </div>
                                        </div>

                                        {/* Active Render Bar */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex justify-between text-xs text-blue-400 mb-2 font-mono">
                                                <span>Rendering Frame 104/500</span>
                                                <span>82%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[82%] animate-[typing_4s_infinite]"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-[#0d1117] p-6 font-mono text-sm overflow-hidden">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-slate-400 mb-4 border-b border-slate-800 pb-2">
                                                <Terminal size={14} className="mr-2" /> bash — 80x24
                                            </div>
                                            <div><span className="text-purple-400">dev</span>@<span className="text-indigo-400">cloud</span>:~$ docker-compose up -d --build</div>
                                            <div className="text-slate-500 pt-1">Building backend service...</div>
                                            <div className="text-slate-300">[+] Building 4.2s (12/12) <span className="text-green-400">FINISHED</span></div>
                                            <div className="text-slate-300 pl-4">{'=>'} [internal] load build definition from Dockerfile</div>
                                            <div className="text-slate-300 pl-4">{'=>'} [internal] load metadata for docker.io/library/python:3.9</div>
                                            <div className="text-slate-500 pt-2">Training Model (Epoch 4/50)...</div>
                                            
                                            <div className="mt-4 bg-slate-800/50 p-3 rounded border border-slate-700">
                                                 <div className="flex justify-between text-xs mb-1 text-slate-400">
                                                     <span>Loss: 0.2314</span>
                                                     <span>Accuracy: 94.2%</span>
                                                 </div>
                                                 <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                                     <div className="h-full bg-purple-500 w-[65%] animate-pulse"></div>
                                                 </div>
                                            </div>
                                            <div className="text-purple-400 animate-pulse mt-2">_</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                     </Reveal>
                </div>
            </div>
        </div>
      </section>

      {/* NEW: Performance Benchmark */}
      <section id="performance" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Benchmarks Don't Lie</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        See how our Studio tier stacks up against top-tier consumer laptops.
                        <span className="block text-sm mt-2 text-slate-500">Benchmark: Blender Cycles Render (Classroom Scene) - Lower is Better</span>
                    </p>
                </div>
            </Reveal>

            <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BarChart3 size={200} />
                </div>
                
                <div className="space-y-8 relative z-10">
                    <BenchmarkBar 
                        label="Personal PC (Studio Tier)" 
                        value="42s" 
                        width="15%" 
                        color="bg-gradient-to-r from-blue-500 to-cyan-400"
                        icon={<Monitor size={20} />}
                        highlight={true}
                    />
                    <BenchmarkBar 
                        label="High-End Gaming Laptop (RTX 4070)" 
                        value="184s" 
                        width="55%" 
                        color="bg-slate-700"
                        icon={<Laptop size={20} />}
                    />
                    <BenchmarkBar 
                        label="MacBook Pro M3 Max" 
                        value="112s" 
                        width="35%" 
                        color="bg-slate-700"
                        icon={<Laptop size={20} />}
                    />
                    <BenchmarkBar 
                        label="Average Ultrabook" 
                        value="840s" 
                        width="100%" 
                        color="bg-slate-800"
                        icon={<Laptop size={20} />}
                    />
                </div>
            </div>
        </div>
      </section>

      {/* NEW: Testimonials */}
      <section className="py-24 bg-gradient-to-b from-[#020617] to-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Loved by the Best</h2>
                </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
                <TestimonialCard 
                    quote="I rendered a 4,000 frame animation in 2 hours. My laptop would have taken 3 days. This is actual magic."
                    name="Sarah Jenkins"
                    role="3D Artist"
                    delay={0}
                />
                <TestimonialCard 
                    quote="The latency is basically non-existent. I forget I'm streaming. It feels exactly like a local rig."
                    name="David Chen"
                    role="Game Developer"
                    delay={100}
                />
                <TestimonialCard 
                    quote="Being able to spin up a 24GB VRAM instance for LLM training on my iPad is a game changer for my workflow."
                    name="Elena Rodriguez"
                    role="AI Researcher"
                    delay={200}
                />
            </div>
        </div>
      </section>

      {/* Tech Specs (The Engine Room) */}
      <section id="specs" className="py-24 relative bg-[#020617] overflow-hidden">
        {/* Background Beams */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 block">Under the Hood</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Engine Room</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                We've built the world's most powerful consumer cloud infrastructure. 
                Dedicated GPUs, enterprise networking, and blistering fast storage.
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-8">
             {/* GPU Card */}
             <Reveal delay={0}>
                <div className="tech-card-gradient p-1 rounded-3xl h-full group">
                    <div className="bg-[#0B1120] rounded-[22px] p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:translate-y-[-5px]">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Cpu size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Cpu className="text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Graphic Powerhouse</h3>
                            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
                                RTX 4090
                            </div>
                            <p className="text-slate-400 text-sm mb-6">
                                The ultimate GPU for creators and gamers. 24GB GDDR6X VRAM and 16,384 CUDA cores.
                            </p>
                            
                            {/* Visual Bar */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs text-slate-500 font-mono">
                                    <span>Personal PC</span>
                                    <span className="text-green-400">100 TFLOPS</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-full"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-500 font-mono opacity-50">
                                    <span>Avg. Laptop</span>
                                    <span>10 TFLOPS</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden opacity-50">
                                    <div className="h-full bg-slate-500 w-[10%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </Reveal>

             {/* Network Card */}
             <Reveal delay={100}>
                <div className="tech-card-gradient p-1 rounded-3xl h-full group">
                    <div className="bg-[#0B1120] rounded-[22px] p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:translate-y-[-5px]">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Wifi size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                                <Wifi className="text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Zero Latency</h3>
                            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
                                &lt; 15ms
                            </div>
                            <p className="text-slate-400 text-sm mb-6">
                                Our "Holographic Streaming Protocol" predicts frames before they render, creating a feel indistinguishable from local hardware.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="bg-slate-900/50 p-3 rounded-lg text-center border border-white/5">
                                    <div className="text-xs text-slate-500 uppercase">Bitrate</div>
                                    <div className="text-xl font-bold text-white">150 Mbps</div>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg text-center border border-white/5">
                                    <div className="text-xs text-slate-500 uppercase">Res</div>
                                    <div className="text-xl font-bold text-white">4K / 60</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </Reveal>

             {/* Storage Card */}
             <Reveal delay={200}>
                <div className="tech-card-gradient p-1 rounded-3xl h-full group">
                    <div className="bg-[#0B1120] rounded-[22px] p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:translate-y-[-5px]">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <HardDrive size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                                <HardDrive className="text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Instant I/O</h3>
                            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                                7,000 MB/s
                            </div>
                            <p className="text-slate-400 text-sm mb-6">
                                NVMe Gen 4 SSDs mean your projects load instantly. 
                                Expand storage up to 8TB with a single click.
                            </p>
                            
                            <div className="mt-4 p-4 bg-slate-900/80 rounded-lg border border-purple-500/20 font-mono text-xs text-green-400">
                                <div>$ disk_speed_test -w -r</div>
                                <div className="mt-1 text-slate-300">Writing 5GB file... <span className="text-green-400">0.8s</span></div>
                                <div className="text-slate-300">Reading 100GB dataset... <span className="text-green-400">14.2s</span></div>
                            </div>
                        </div>
                    </div>
                </div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* NEW: FAQ Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Common Queries</h2>
                    <p className="text-slate-400">Everything you need to know about cloud computing.</p>
                </div>
            </Reveal>
            
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <Reveal delay={i * 100} key={i}>
                        <div className="glass-panel rounded-xl overflow-hidden">
                            <button 
                                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="text-lg font-medium text-slate-200">{faq.q}</span>
                                {activeFaq === i ? <ChevronUp className="text-blue-400" /> : <ChevronDown className="text-slate-500" />}
                            </button>
                            <div className={`px-6 text-slate-400 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                {faq.a}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-cyan-900/40 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <Reveal>
            <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to upgrade your workflow?</h2>
            <p className="text-cyan-100 text-xl mb-12 max-w-2xl mx-auto">
                Join 10,000+ engineers and creatives building on Personal PC.
                Get <span className="font-bold text-white bg-blue-500/20 px-2 rounded">$20 credit</span> when you sign up today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="bg-white text-slate-950 hover:bg-cyan-50 px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-transform hover:scale-105">
                    Create Free Account
                </button>
                <button className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all">
                    View Documentation
                </button>
            </div>
            <p className="mt-8 text-sm text-cyan-200/60">No credit card required for trial.</p>
            </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-[#020617] pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Monitor className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">SkyDC</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                High-performance cloud desktops for the modern workforce. Built for speed, security, and scale.
              </p>
              <div className="flex space-x-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-cyan-500 transition-colors cursor-pointer flex items-center justify-center text-white/50 hover:text-white">𝕏</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center text-white/50 hover:text-white">in</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-purple-600 transition-colors cursor-pointer flex items-center justify-center text-white/50 hover:text-white">G</div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Cloud Computer</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Application Streaming</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Performance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">© 2024 Personal PC Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-slate-500">
               <a href="#" className="hover:text-white transition-colors">Terms</a>
               <a href="#" className="hover:text-white transition-colors">Privacy</a>
               <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Subcomponents (Memoized)

const FeatureCard = React.memo(({ icon, title, description, delay }) => (
  <Reveal delay={delay} className="h-full">
    <div className="glass-panel glass-card-hover p-8 rounded-3xl h-full transition-all duration-300 group hover:-translate-y-2">
        <div className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10 group-hover:ring-cyan-500/50">
        {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  </Reveal>
));

const StepCard = React.memo(({ number, title, description, icon, delay }) => (
    <Reveal delay={delay} className="h-full relative z-10">
        <div className="bg-[#0B1120] border border-white/10 p-8 rounded-3xl h-full flex flex-col items-center text-center relative group hover:border-blue-500/50 transition-all duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-white/10 w-16 h-16 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="mt-8 mb-4">
                <span className="text-5xl font-black text-slate-800 select-none absolute top-10 left-1/2 -translate-x-1/2 opacity-50 z-0">{number}</span>
                <h3 className="text-xl font-bold text-white relative z-10">{title}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    </Reveal>
));

const BenchmarkBar = React.memo(({ label, value, width, color, icon, highlight = false }) => (
    <Reveal className="w-full">
        <div className="flex items-center mb-2">
            <div className={`p-1.5 rounded-lg mr-3 ${highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                {icon}
            </div>
            <span className={`text-sm font-medium ${highlight ? 'text-white' : 'text-slate-400'}`}>{label}</span>
            <span className="ml-auto text-sm font-mono text-slate-500">{value}</span>
        </div>
        <div className="h-4 w-full bg-slate-800/50 rounded-full overflow-hidden">
            <div 
                className={`h-full rounded-full ${color} relative animate-grow-bar`} 
                style={{ '--target-width': width }}
            >
                {highlight && <div className="absolute inset-0 bg-white/30 animate-pulse"></div>}
            </div>
        </div>
    </Reveal>
));

const TestimonialCard = React.memo(({ quote, name, role, delay }) => (
    <Reveal delay={delay} className="h-full">
        <div className="glass-panel p-8 rounded-2xl h-full relative group">
            <div className="absolute -top-4 left-8 text-6xl text-blue-500/20 font-serif">"</div>
            <p className="text-slate-300 mb-6 relative z-10 italic leading-relaxed">{quote}</p>
            <div className="flex items-center mt-auto border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                    {name.charAt(0)}
                </div>
                <div>
                    <div className="text-white font-bold text-sm">{name}</div>
                    <div className="text-blue-400 text-xs uppercase tracking-wider font-semibold">{role}</div>
                </div>
                <div className="ml-auto flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                </div>
            </div>
        </div>
    </Reveal>
));

const ListItem = React.memo(({ text, color = "text-blue-400" }) => (
  <li className="flex items-center text-slate-300">
    <div className={`bg-white/5 p-1 rounded-full mr-3 ${color.replace('text', 'bg')}/10`}>
        <CheckCircle className={`h-4 w-4 flex-shrink-0 ${color}`} />
    </div>
    <span>{text}</span>
  </li>
));

export default App;
