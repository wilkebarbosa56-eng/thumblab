import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, History, CreditCard, Download, Trash2, 
  Settings, User, Plus, Search, Wand2, RefreshCw,
  Image as ImageIcon, CheckCircle2, Crown, Zap
} from 'lucide-react';
import { generateThumbnailImage, suggestPrompts } from '../lib/gemini';
import { Thumbnail, User as UserType } from '../types';

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<Thumbnail[]>([]);
  const [user, setUser] = useState<UserType>({
    id: '1',
    email: 'creator@thumblab.ai',
    plan: 'free',
    credits: 10
  });

  const handleGenerate = async () => {
    if (!prompt || user.credits <= 0) return;
    
    setIsGenerating(true);
    try {
      const imageUrl = await generateThumbnailImage(prompt);
      setGeneratedImage(imageUrl);
      
      const newThumbnail: Thumbnail = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        createdAt: Date.now(),
        quality: 'HD'
      };
      
      setHistory(prev => [newThumbnail, ...prev]);
      setUser(prev => ({ ...prev, credits: prev.credits - 1 }));
      setPrompt("");
    } catch (error) {
      alert("Erro ao gerar imagem. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const loadSuggestions = async () => {
    if (!prompt) return;
    const items = await suggestPrompts(prompt);
    setSuggestions(items);
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `thumblab-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-white/5">
          <a href="/" className="logo-container group flex items-center gap-3 transition-all hover:opacity-80 active:scale-95">
            <img 
              src="/logo.png" 
              alt="ThumbLab Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-display font-bold tracking-tight">ThumbLab</span>
          </a>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 text-neon-purple font-medium transition-all">
            <Plus className="w-5 h-5" /> Criar Novo
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
            <History className="w-5 h-5" /> Histórico
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all">
            <Settings className="w-5 h-5" /> Configurações
          </button>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Créditos</span>
              <span className="text-neon-purple font-bold">{user.credits}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-neon-purple transition-all duration-500" style={{ width: `${(user.credits / 10) * 100}%` }} />
            </div>
            <button className="w-full mt-4 py-2 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/30 rounded-xl text-xs font-bold text-neon-purple transition-all flex items-center justify-center gap-2">
              <Crown className="w-3 h-3" /> Upgrade para Pro
            </button>
          </div>
          
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky" alt="Avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user.email}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">{user.plan} Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md z-10">
          <h2 className="text-lg font-bold">Gerador AI</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all"><Search className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-all"><User className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Input Section */}
            <section className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl font-display font-bold">O que vamos criar <span className="text-neon-purple">hoje?</span></h3>
                <p className="text-gray-400">Descreva sua ideia ou use nossos templates de alta conversão.</p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-[2.5rem] blur opacity-15 group-focus-within:opacity-30 transition-opacity" />
                <div className="relative glass-card !p-2 flex items-center gap-2">
                  <div className="pl-4 text-gray-500"><Wand2 className="w-6 h-6" /></div>
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: MrBeast style thumbnail with a shocked expression in a mystery room..."
                    className="flex-1 bg-transparent border-none outline-none py-6 px-4 text-lg font-medium placeholder:text-gray-600"
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="px-8 py-4 bg-neon-purple text-white rounded-2xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:neon-glow-purple transition-all"
                  >
                    {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    Gerar
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button 
                   onClick={loadSuggestions}
                   className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                >
                   <RefreshCw className="w-4 h-4" /> Sugerir Prompts
                </button>
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPrompt(s)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {/* Preview Section */}
            <AnimatePresence mode="wait">
              {generatedImage && (
                <motion.section 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-neon-purple" /> Preview da Sua Thumbnail
                    </h4>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleDownload(generatedImage)}
                        className="px-4 py-2 bg-white text-black rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-all"
                      >
                        <Download className="w-4 h-4" /> Download HD
                      </button>
                      <button className="px-4 py-2 bg-neon-blue/20 border border-neon-blue/30 text-neon-blue rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-neon-blue/30 transition-all">
                        <Crown className="w-4 h-4" /> Unlock 4K
                      </button>
                    </div>
                  </div>
                  <div className="aspect-video glass rounded-3xl overflow-hidden relative group">
                    <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <p className="text-xl font-display font-bold">Thumbnail Gerada com Sucesso ✨</p>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* History Section */}
            <section className="space-y-6 pt-12">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold">Seu <span className="text-neon-pink">Acervo</span></h3>
                <span className="text-sm text-gray-500 font-medium">Renderizações recentes ({history.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((thumb) => (
                  <motion.div 
                    layout
                    key={thumb.id} 
                    className="glass rounded-2xl overflow-hidden group border border-white/5"
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-900">
                      <img src={thumb.url} alt={thumb.prompt} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-2 translate-y-10 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                        <button 
                          onClick={() => handleDownload(thumb.url)}
                          className="p-2 bg-black/60 backdrop-blur-md rounded-lg hover:bg-neon-purple transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg hover:bg-red-500 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 text-left">
                      <p className="text-sm font-medium line-clamp-1 text-gray-300 mb-1">{thumb.prompt}</p>
                      <p className="text-xs text-gray-500">{new Date(thumb.createdAt).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))}
                
                {history.length === 0 && !isGenerating && (
                  <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <ImageIcon className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-500 font-medium">Nenhuma thumbnail gerada ainda. Comece agora!</p>
                  </div>
                )}

                {isGenerating && (
                  <div className="glass rounded-2xl aspect-video flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    <RefreshCw className="w-10 h-10 text-neon-purple animate-spin" />
                    <p className="text-sm font-bold text-gray-400">Criando sua obra-prima...</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
