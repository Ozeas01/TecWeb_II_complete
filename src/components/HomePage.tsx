import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Palette, Zap, ArrowRight, Brain, Bell, Laptop, X, Play, 
  Pause, ChevronLeft, ChevronRight, HelpCircle, Map, Briefcase, 
  FileText, MessageSquare, PhoneCall, Github, Linkedin, Globe, User,
  GraduationCap, BookOpen, School, Info, Sparkles, Compass
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import AuthModal from './AuthModal';
import type { UserData } from '../types';

interface HomePageProps {
  onGameSelect: (game: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGameSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimer = useRef<any>(null);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<UserData | null>(null);
  const isLoggedIn = !!user;

  const slides = [
    {
      title: "Construa o Futuro do Zero",
      subtitle: "A Programação Abre Portas",
      description: "Escrever código dá a você o poder de transformar qualquer ideia em realidade, construindo softwares e ferramentas incríveis do absoluto zero.",
      image: "/slide1.png",
      gradient: "from-blue-600 via-indigo-600 to-blue-700",
      glowColor: "rgba(37, 99, 235, 0.35)",
      bgAccent: "bg-blue-500/5",
      borderAccent: "border-blue-500/10",
      btnClass: "bg-white text-blue-600 hover:bg-blue-50 hover:scale-105"
    },
    {
      title: "Desafie sua Mente Diariamente",
      subtitle: "Desenvolva sua Lógica",
      description: "Aprender a programar aprimora sua capacidade de resolver problemas complexos e estruturar raciocínios com precisão cirúrgica.",
      image: "/slide2.png",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      glowColor: "rgba(6, 182, 212, 0.35)",
      bgAccent: "bg-cyan-500/5",
      borderAccent: "border-cyan-500/10",
      btnClass: "bg-white text-cyan-600 hover:bg-cyan-50 hover:scale-105"
    },
    {
      title: "Domine a Web Moderna",
      subtitle: "Aprenda HTML, CSS e JavaScript",
      description: "Esteja à frente no mercado digital dominando a tríade essencial da web e criando interfaces incríveis, limpas e interativas.",
      image: "/slide3.png",
      gradient: "from-indigo-600 via-blue-600 to-indigo-700",
      glowColor: "rgba(99, 102, 241, 0.35)",
      bgAccent: "bg-indigo-500/5",
      borderAccent: "border-indigo-500/10",
      btnClass: "bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105"
    }
  ];

  const quickResources = [
    {
      title: "Mapas Mentais",
      description: "Visualize a arquitetura da web",
      icon: Map,
      hoverColor: "hover:border-orange-500 hover:text-orange-600"
    },
    {
      title: "Dúvidas Frequentes",
      description: "Central de respostas rápidas",
      icon: HelpCircle,
      hoverColor: "hover:border-blue-500 hover:text-blue-600"
    },
    {
      title: "Cheat Sheets",
      description: "Guias rápidos de referência",
      icon: FileText,
      hoverColor: "hover:border-amber-500 hover:text-amber-600"
    },
    {
      title: "Comunidade Discord",
      description: "Conecte-se com outros alunos",
      icon: MessageSquare,
      hoverColor: "hover:border-emerald-500 hover:text-emerald-600"
    },
    {
      title: "Central de Vagas",
      description: "Oportunidades no mercado dev",
      icon: Briefcase,
      hoverColor: "hover:border-purple-500 hover:text-purple-600"
    },
    {
      title: "Fale com o Suporte",
      description: "Atendimento especializado",
      icon: PhoneCall,
      hoverColor: "hover:border-rose-500 hover:text-rose-600"
    }
  ];

  const games = [
    {
      id: 'html-drag-drop',
      title: 'Desafio HTML',
      subtitle: 'Drag & Drop',
      description: 'Arraste tags HTML para suas categorias e domine a estrutura das páginas web.',
      icon: Code2,
      difficulty: 'Iniciante',
      estimatedTime: '10-15 min',
      gradient: 'from-orange-500 via-red-500 to-rose-600',
      glowColor: 'rgba(249, 115, 22, 0.15)',
      tagColor: 'text-orange-600 bg-orange-50 border-orange-200/50',
      btnGradient: 'from-orange-500 to-rose-600 hover:from-orange-450 hover:to-rose-550',
    },
    {
      id: 'css-selector',
      title: 'CSS Selector',
      subtitle: 'Master',
      description: 'Identifique elementos usando seletores CSS e aprenda a estilizar com precisão.',
      icon: Palette,
      difficulty: 'Intermediário',
      estimatedTime: '15-20 min',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      glowColor: 'rgba(59, 130, 246, 0.15)',
      tagColor: 'text-blue-600 bg-blue-50 border-blue-200/50',
      btnGradient: 'from-blue-500 to-cyan-500 hover:from-blue-450 hover:to-cyan-450',
    },
    {
      id: 'javascript-quiz',
      title: 'JavaScript',
      subtitle: 'Logic Puzzle',
      description: 'Complete códigos, corrija bugs e resolva desafios de lógica JavaScript.',
      icon: Zap,
      difficulty: 'Intermediário',
      estimatedTime: '20-25 min',
      gradient: 'from-yellow-500 via-amber-500 to-orange-500',
      glowColor: 'rgba(234, 179, 8, 0.15)',
      tagColor: 'text-amber-700 bg-amber-50 border-amber-200/55',
      btnGradient: 'from-yellow-500 to-orange-500 hover:from-yellow-450 hover:to-orange-450',
    },
  ];

  // Auto scroll effect
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimer.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
    } else {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    }
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [isAutoplay]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const toggleAutoplay = () => {
    setIsAutoplay((prev) => !prev);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden text-slate-800 flex flex-col">
      
      {/* Soft background glow circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-[30%] w-[450px] h-[450px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Custom Navigation Header matching the GOL style */}
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-40 w-full">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Main Pill Menu */}
          <div className="bg-slate-100/90 border border-slate-200/50 backdrop-blur-sm rounded-full py-1.5 pl-4 pr-6 flex items-center gap-5 sm:gap-8 shadow-sm">
            {/* Logo/Slogan (Blue themed brand) */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-1.5 rounded-full shadow-sm">
                <Laptop className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-slate-855 tracking-tight text-sm hidden sm:inline">
                Web<span className="text-blue-600">Learning</span>
              </span>
            </motion.div>
            
            {/* Divider */}
            <div className="w-[1px] h-4 bg-slate-200" />

            {/* Navigation links inside pill */}
            <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 relative">
              {[
                { name: 'Alunos', href: '#students', hasDropdown: false, icon: GraduationCap },
                { name: 'Professores', href: '#teachers', hasDropdown: false, icon: BookOpen },
                { name: 'UFC Sobral', href: '#ufc', hasDropdown: true, icon: School },
              ].map((link) => {
                const IconComponent = link.icon;
                return (
                  <div 
                    key={link.name} 
                    className="relative group"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if ((link.name === 'Alunos' || link.name === 'Professores') && !isLoggedIn) {
                          e.preventDefault();
                          setAuthMode('login');
                          setIsAuthModalOpen(true);
                        }
                      }}
                      className="relative px-3.5 py-1.5 transition-colors duration-200 hover:text-blue-600 z-10 flex items-center gap-2"
                    >
                      {hoveredLink === link.name && (
                        <motion.span
                          layoutId="nav-hover-pill"
                          className="absolute inset-0 bg-blue-600/10 rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        />
                      )}
                      <IconComponent className="h-4.5 w-4.5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span>{link.name}</span>
                    </a>
                    {link.hasDropdown && hoveredLink === link.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50">
                        <a href="#sobre" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-650 hover:bg-slate-50 hover:text-blue-600 rounded-lg">
                          <Info className="h-4 w-4 text-slate-400" />
                          <span>Sobre</span>
                        </a>
                        <a href="#info" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-650 hover:bg-slate-50 hover:text-blue-600 rounded-lg">
                          <HelpCircle className="h-4 w-4 text-slate-400" />
                          <span>Informações</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Authentication buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-100 transition-colors">
               <User className="h-4 w-4 text-blue-600" />
               <span className="text-sm font-bold text-slate-700">{user?.name}</span>
            </div>
          ) : (
            <>
              <motion.button 
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                whileHover={{ scale: 1.04, borderColor: 'rgb(37 99 235)', color: 'rgb(37 99 235)' }}
                whileTap={{ scale: 0.98 }}
                className="border border-slate-300 bg-white text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
              >
                Acessar conta
              </motion.button>
              <motion.button 
                onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
                whileHover={{ scale: 1.04, backgroundColor: 'rgb(29 78 216)' }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-blue-600/10 transition-all cursor-pointer border-none"
              >
                Criar conta
              </motion.button>
            </>
          )}
          
          {/* Notification bell */}
          <motion.div 
            whileHover={{ rotate: [0, -12, 12, -12, 12, 0] }}
            transition={{ duration: 0.5 }}
            className="relative p-2.5 bg-white hover:bg-slate-50 rounded-full border border-slate-200 shadow-sm cursor-pointer transition-all text-slate-555"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full" />
          </motion.div>
        </div>
      </nav>

      {/* Main Interactive Carousel Banner (Itaú style) */}
      {/* Main Interactive Carousel Banner (Itaú style) - Full screen edge-to-edge */}
      <div className="relative w-full mb-12">
        <div className="relative overflow-hidden bg-slate-900 border-y border-slate-200/50">
          
          {/* Slides display */}
          <div className="relative min-h-[460px] md:min-h-[500px] flex flex-col md:flex-row overflow-hidden">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0 flex flex-col md:flex-row w-full h-full"
              >
                
                {/* Left Side: Text and Buttons with rich slide gradient aligned with standard 7xl grid */}
                <div className={`w-full md:w-3/5 p-8 sm:p-12 md:p-16 lg:pl-24 xl:pl-[calc((100vw-1216px)/2+2rem)] flex flex-col justify-center bg-gradient-to-br ${slides[currentSlide].gradient} text-white relative z-20`}>
                  <div className="max-w-xl">
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm inline-block mb-4">
                      {slides[currentSlide].subtitle}
                    </span>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                      {slides[currentSlide].title}
                    </h1>
                    
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-8">
                      {slides[currentSlide].description}
                    </p>

                    {/* Action Button: Opens pop-up modal with spring effect */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className={`inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer border-none ${slides[currentSlide].btnClass}`}
                    >
                      <Brain className="h-5 w-5" />
                      Começar Agora
                      <ArrowRight className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Generated Image visual */}
                <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-transparent to-black/10 hidden md:block z-10 pointer-events-none" />
                  
                  {/* Slide Image Asset */}
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Bottom Navigation & Autoplay Panel (Itaú style controls) */}
          <div className="absolute bottom-6 left-8 md:left-16 lg:left-24 xl:left-[calc((100vw-1216px)/2+2rem)] z-30 flex items-center gap-6 bg-black/35 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 text-white">
            
            {/* Arrows */}
            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrevSlide}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextSlide}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Bullets/Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === i ? 'w-5 bg-white' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Ir para slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="w-[1px] h-4 bg-white/20" />

            {/* Play/Pause Control */}
            <button 
              onClick={toggleAutoplay}
              className="flex items-center gap-1.5 hover:text-white/80 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isAutoplay ? (
                <>
                  <Pause className="h-3 w-3" />
                  <span>pausar</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3" />
                  <span>iniciar</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* Dynamic Intro Section: O que é o WebLearning */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-blue-800/5 rounded-3xl border border-blue-100/50 p-6 md:p-8 shadow-sm relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid md:grid-cols-3 gap-6 items-center relative z-10">
            {/* Main Info Column */}
            <div className="md:col-span-1 space-y-3">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block">
                Sobre o Jogo
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                O que é o <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">WebLearning</span>?
              </h2>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                Uma plataforma gamificada projetada para você dominar o desenvolvimento web na prática e de forma divertida.
              </p>
            </div>

            {/* Quick Cards Column */}
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 hover:border-blue-400 transition-all duration-300 cursor-pointer"
              >
                <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl w-fit mb-3 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Brain className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-white transition-colors duration-300">Como funciona?</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
                  Encare desafios interativos de HTML, CSS e JavaScript. Complete códigos, ordene tags e decifre seletores em tempo real.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 hover:border-blue-400 transition-all duration-300 cursor-pointer"
              >
                <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl w-fit mb-3 group-hover:bg-white/20 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-white transition-colors duration-300">Para que serve?</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
                  Para testar suas habilidades, fixar o conteúdo das aulas de forma leve e ver sua evolução no ranking.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Shortcuts / Features Grid Section (Itaú Style) */}
      <div className="w-full relative overflow-hidden py-16 my-8">
        {/* Animated Gradient Background layer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-850 -z-10"
        />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-white rounded-[32px] border border-blue-100/50 p-8 sm:p-10 md:p-12 shadow-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-slate-100 pb-6">
              <div>
                {/* Visual badge/pill above title */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider uppercase mb-3 border border-blue-100/50 w-fit">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Atalhos Rápidos
                </div>
                
                {/* Title with icon and infinite rotation animation */}
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100/30 flex items-center justify-center"
                  >
                    <Compass className="h-6 w-6" />
                  </motion.div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Resolva as questões do dia a dia
                  </h2>
                </div>
                
                {/* Subtitle */}
                <p className="text-sm text-slate-550 mt-2 font-medium">
                  Acesse atalhos rápidos e ferramentas de suporte ao estudo
                </p>
              </div>
              
              {/* Creative side accent or status indicator */}
              <div className="flex items-center gap-2 text-[11px] text-blue-650 font-bold bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100/20 w-fit self-start md:self-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>6 Ferramentas Disponíveis</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickResources.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.03,
                      boxShadow: "0 25px 40px -10px rgba(59, 130, 246, 0.22), 0 12px 20px -8px rgba(59, 130, 246, 0.08)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                    className="group bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-blue-400 rounded-[28px] p-6 sm:p-8 flex flex-col justify-between min-h-[190px] cursor-pointer transition-colors duration-300 relative overflow-hidden shadow-sm"
                  >
                    {/* Subtle hover gradient background glow in card corner */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/0 group-hover:bg-blue-500/10 rounded-full blur-2xl transition-all duration-500" />

                    {/* Icon Container with glowing ring on hover */}
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl w-fit border border-blue-100/30 group-hover:border-blue-200 relative transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      {/* Ring animation on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover:bg-blue-500/10 group-hover:scale-130 transition-all duration-500" />
                      
                      <IconComponent className="h-6 w-6 relative z-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                    
                    <div className="mt-6 relative z-10">
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-800 group-hover:text-blue-700 transition-colors duration-300 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-2 leading-relaxed transition-colors duration-300 group-hover:text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    {/* Creative bottom highlight line that expands on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative max-w-4xl mx-auto px-4 mb-20 mt-8 w-full">
        <div className="flex items-center justify-center gap-8 sm:gap-16 border-y border-slate-100 py-6">
          {[
            { value: '3', label: 'Jogos de Teste', color: 'text-orange-500' },
            { value: '24', label: 'Desafios Ativos', color: 'text-blue-600' },
            { value: '3', label: 'Níveis por Jogo', color: 'text-emerald-600' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-3xl sm:text-4xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up Modal containing the Game Selection */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop blur with exit animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-10 max-w-5xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-250 text-slate-550 hover:text-slate-800 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Escolha seu Desafio</h2>
                <p className="text-slate-500 text-base font-semibold">Selecione o assunto e comece a praticar instantaneamente</p>
              </div>

              {/* Game Cards Grid inside Modal */}
              <motion.div 
                className="grid md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {games.map((game) => (
                  <motion.div
                    key={game.id}
                    variants={itemVariants}
                    className="group relative bg-white rounded-3xl border border-slate-200/60 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-xl"
                    onClick={() => {
                      setIsModalOpen(false);
                      onGameSelect(game.id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { 
                      if (e.key === 'Enter' || e.key === ' ') { 
                        e.preventDefault(); 
                        setIsModalOpen(false);
                        onGameSelect(game.id); 
                      } 
                    }}
                    aria-label={`Jogar ${game.title} ${game.subtitle}`}
                    whileHover={{
                      boxShadow: `0 20px 45px -10px ${game.glowColor}`,
                    }}
                  >
                    {/* Card header with gradient matching box */}
                    <div className={`h-32 bg-gradient-to-br ${game.gradient} relative overflow-hidden flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                      <game.icon className="h-14 w-14 text-white relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Card body */}
                    <div className="p-6 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-855 group-hover:text-orange-500 transition-colors leading-tight">{game.title}</h3>
                          <span className="text-sm font-bold text-slate-400">{game.subtitle}</span>
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed mb-5 font-medium h-12 overflow-hidden">
                        {game.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${game.tagColor}`}>
                          {game.difficulty}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">⏱ {game.estimatedTime}</span>
                      </div>

                      {/* Play button */}
                      <button className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${game.btnGradient} text-white font-bold py-3 px-4 rounded-xl shadow-md border-none`}>
                        <span>Jogar</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* High-Quality Corporate Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-200 pt-16 pb-8 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-1.5 rounded-full">
                  <Laptop className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  Web<span className="text-blue-600">Learning</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                Uma plataforma completa e gamificada desenvolvida para impulsionar suas habilidades em programação de forma prática, direta e divertida.
              </p>
              
              {/* Social networks */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://github.com" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-200 transition-colors shadow-sm">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-200 transition-colors shadow-sm">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="https://google.com" className="p-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-200 transition-colors shadow-sm">
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Games/Contents */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase mb-4">Conteúdos</h4>
              <ul className="space-y-2.5 text-xs text-slate-550 font-medium">
                <li><a href="#html" onClick={() => setIsModalOpen(true)} className="hover:text-orange-500 transition-colors">Desafio HTML</a></li>
                <li><a href="#css" onClick={() => setIsModalOpen(true)} className="hover:text-orange-500 transition-colors">CSS Selector Master</a></li>
                <li><a href="#js" onClick={() => setIsModalOpen(true)} className="hover:text-orange-500 transition-colors">JavaScript Logic Puzzle</a></li>
                <li><a href="#mindmaps" className="hover:text-orange-500 transition-colors">Mapas Mentais</a></li>
              </ul>
            </div>

            {/* Column 3: Corporate/Resources */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase mb-4">Recursos</h4>
              <ul className="space-y-2.5 text-xs text-slate-550 font-medium">
                <li><a href="#faq" className="hover:text-blue-600 transition-colors">Dúvidas Frequentes</a></li>
                <li><a href="#cheatsheets" className="hover:text-blue-600 transition-colors">Cheat Sheets</a></li>
                <li><a href="#discord" className="hover:text-blue-600 transition-colors">Comunidade Discord</a></li>
                <li><a href="#jobs" className="hover:text-blue-600 transition-colors">Vagas Dev</a></li>
              </ul>
            </div>

            {/* Column 4: Contact/Help */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 tracking-wide uppercase mb-4">Fale Conosco</h4>
              <ul className="space-y-2.5 text-xs text-slate-550 font-medium">
                <li><span className="text-slate-500">Email:</span> suporte@weblearning.com</li>
                <li><span className="text-slate-500">Telefone:</span> 0800 700 9000</li>
                <li><span className="text-slate-500">Horário:</span> Seg a Sex, das 9h às 18h</li>
                <li><a href="#help" className="hover:text-orange-500 transition-colors">Central de Ajuda</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar: Copyright / Rights */}
          <div className="border-t border-slate-200/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-semibold">
            <div>
              &copy; {new Date().getFullYear()} WebLearning Games. Todos os direitos reservados.
            </div>
            <div className="flex gap-4">
              <a href="#terms" className="hover:text-slate-600">Termos de uso</a>
              <a href="#privacy" className="hover:text-slate-600">Políticas de privacidade</a>
              <a href="#cookies" className="hover:text-slate-600">Configuração de cookies</a>
            </div>
          </div>

        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode}
        onLogin={(userData) => {
          setUser(userData);
          // O usuário logou! Agora ele pode iniciar o jogo normalmente.
        }}
      />
    </div>
  );
};

export default HomePage;