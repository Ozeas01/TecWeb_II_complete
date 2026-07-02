import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Palette, Zap, ArrowRight, Brain, Bell, Laptop, X, Play, 
  Pause, ChevronLeft, ChevronRight, HelpCircle, Map, Briefcase, 
  FileText, MessageSquare, PhoneCall, Github, Linkedin, Globe 
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface HomePageProps {
  onGameSelect: (game: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGameSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimer = useRef<any>(null);

  const slides = [
    {
      title: "Construa o Futuro do Zero",
      subtitle: "A Programação Abre Portas",
      description: "Escrever código dá a você o poder de transformar qualquer ideia em realidade, construindo softwares e ferramentas incríveis do absoluto zero.",
      image: "/slide1.png",
      gradient: "from-orange-600 to-rose-600",
      glowColor: "rgba(249, 115, 22, 0.35)",
      bgAccent: "bg-orange-500/5",
      borderAccent: "border-orange-500/10",
      btnClass: "bg-white text-orange-600 hover:bg-orange-50 hover:scale-105"
    },
    {
      title: "Desafie sua Mente Diariamente",
      subtitle: "Desenvolva sua Lógica",
      description: "Aprender a programar aprimora sua capacidade de resolver problemas complexos e estruturar raciocínios com precisão cirúrgica.",
      image: "/slide2.png",
      gradient: "from-blue-600 via-cyan-600 to-blue-700",
      glowColor: "rgba(59, 130, 246, 0.35)",
      bgAccent: "bg-blue-500/5",
      borderAccent: "border-blue-500/10",
      btnClass: "bg-white text-blue-600 hover:bg-blue-50 hover:scale-105"
    },
    {
      title: "Domine a Web Moderna",
      subtitle: "Aprenda HTML, CSS e JavaScript",
      description: "Esteja à frente no mercado digital dominando a tríade essencial da web e criando interfaces incríveis, limpas e interativas.",
      image: "/slide3.png",
      gradient: "from-yellow-600 via-amber-600 to-orange-600",
      glowColor: "rgba(234, 179, 8, 0.35)",
      bgAccent: "bg-yellow-500/5",
      borderAccent: "border-yellow-500/10",
      btnClass: "bg-white text-amber-700 hover:bg-amber-50 hover:scale-105"
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
        <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-[30%] w-[450px] h-[450px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Custom Navigation Header matching the GOL style */}
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-40 w-full">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Main Pill Menu */}
          <div className="bg-slate-100/90 border border-slate-200/50 backdrop-blur-sm rounded-full py-1.5 pl-4 pr-6 flex items-center gap-5 sm:gap-8 shadow-sm">
            {/* Logo/Slogan (Orange themed brand) */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-1.5 rounded-full shadow-sm">
                <Laptop className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-slate-855 tracking-tight text-sm hidden sm:inline">
                Web<span className="text-orange-500">Learning</span>
              </span>
            </motion.div>
            
            {/* Divider */}
            <div className="w-[1px] h-4 bg-slate-200" />

            {/* Navigation links inside pill */}
            <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 relative">
              {[
                { name: 'Alunos', href: '#students' },
                { name: 'Professores', href: '#teachers' },
                { name: 'Mapas mentais', href: '#mindmaps' },
                { name: 'Informações', href: '#info' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-3.5 py-1.5 transition-colors duration-200 hover:text-orange-500 z-10"
                >
                  {hoveredLink === link.name && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-orange-500/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Authentication buttons */}
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.button 
            whileHover={{ scale: 1.04, borderColor: 'rgb(249 115 22)', color: 'rgb(249 115 22)' }}
            whileTap={{ scale: 0.98 }}
            className="border border-slate-300 bg-white text-slate-700 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-sm cursor-pointer"
          >
            Acessar conta
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.04, backgroundColor: 'rgb(234 88 12)' }}
            whileTap={{ scale: 0.98 }}
            className="bg-orange-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-orange-500/10 transition-all cursor-pointer border-none"
          >
            Criar conta
          </motion.button>
          
          {/* Notification bell */}
          <motion.div 
            whileHover={{ rotate: [0, -12, 12, -12, 12, 0] }}
            transition={{ duration: 0.5 }}
            className="relative p-2.5 bg-white hover:bg-slate-50 rounded-full border border-slate-200 shadow-sm cursor-pointer transition-all text-slate-555"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full" />
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

      {/* Corporate Shortcuts / Features Grid Section (Itaú Style) */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Resolva as questões do dia a dia</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Acesse atalhos rápidos e ferramentas de suporte ao estudo</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickResources.map((item, index) => (
            <div
              key={index}
              className={`bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between min-h-[140px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm ${item.hoverColor}`}
            >
              <div className="p-2.5 bg-slate-100 rounded-xl w-fit">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-sm text-slate-850 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium leading-tight">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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
                <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-1.5 rounded-full">
                  <Laptop className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  Web<span className="text-orange-500">Learning</span>
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
                <li><a href="#faq" className="hover:text-orange-500 transition-colors">Dúvidas Frequentes</a></li>
                <li><a href="#cheatsheets" className="hover:text-orange-500 transition-colors">Cheat Sheets</a></li>
                <li><a href="#discord" className="hover:text-orange-500 transition-colors">Comunidade Discord</a></li>
                <li><a href="#jobs" className="hover:text-orange-500 transition-colors">Vagas Dev</a></li>
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

    </div>
  );
};

export default HomePage;