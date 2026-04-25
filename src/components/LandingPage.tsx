import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, Download, Grid, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/20 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <a href="/" className="logo-container group flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 z-20">
          <img 
            src="/logo.png" 
            alt="ThumbLab Logo" 
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className="text-2xl font-display font-bold tracking-tight hidden sm:block">Thumb<span className="text-neon-purple">Lab</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Funcionalidades</a>
          <a href="#" className="hover:text-white transition-colors">Galeria</a>
          <a href="#" className="hover:text-white transition-colors">Preços</a>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all cursor-pointer"
        >
          Entrar
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neon-purple text-xs font-bold tracking-widest uppercase mb-6">
            Inteligência Artificial de Elite
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-tight mb-8">
            Gere Thumbnails <br />
            <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">Virais em Segundos</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            A plataforma definitiva para criadores. Combine o estilo dos maiores canais do mundo com IA de ponta para dominar o CTR.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="group px-8 py-4 bg-neon-purple text-white rounded-2xl font-bold text-lg hover:bg-neon-purple/90 transition-all shadow-xl shadow-neon-purple/20 flex items-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
              Ver Templates
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 text-left">
          {[
            { icon: Zap, title: "Velocidade Extrema", desc: "Resultados em HD renderizados instantaneamente para você nunca perder o timing." },
            { icon: Target, title: "Foco em CTR", desc: "Algoritmos otimizados para cores e contrastes que forçam o clique." },
            { icon: Grid, title: "Estilos Variados", desc: "Do estilo MrBeast ao Minimalismo de Tech. Templates testados por pros." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="glass-card group hover:border-neon-purple/50 transition-colors"
            >
              <div className="w-12 h-12 bg-neon-purple/20 rounded-xl flex items-center justify-center mb-6 border border-neon-purple/30 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-neon-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="relative z-10 py-20 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-display font-bold">Trending <span className="text-neon-pink">Thumbnails</span></h2>
            <button className="text-sm font-medium text-neon-pink hover:underline">Ver todas</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-video bg-gray-900 rounded-xl overflow-hidden border border-white/5 relative group cursor-pointer">
                <img 
                  src={`https://picsum.photos/seed/${n + 10}/800/450`} 
                  alt="Trending" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-xs font-bold text-gray-400">#ViralStyle</span>
                  <p className="text-sm font-bold text-white">Estratégia de Retenção</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
