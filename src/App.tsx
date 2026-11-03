import React, { useState } from 'react';
import { 
  MessageSquare, Terminal, Folder, Music, Image, FileText, 
  Shield, Bot, Cpu, Sparkles, CheckCircle2, ChevronRight, Activity,
  Layers, AlertTriangle, ShieldCheck
} from 'lucide-react';
import { EmbedSimulator } from './components/EmbedSimulator';
import { CommandsExplorer } from './components/CommandsExplorer';
import { CodeExporter } from './components/CodeExporter';
import { MusicPlayerSimulator } from './components/MusicPlayerSimulator';
import { BannerManager } from './components/BannerManager';
import { PromptViewer } from './components/PromptViewer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'commands' | 'music' | 'banners' | 'prompt'>('simulator');

  const navigationTabs = [
    { id: 'simulator', label: 'Discord Simulator', icon: MessageSquare, badge: 'Live Demo' },
    { id: 'code', label: 'Modular Code & Handlers', icon: Folder, badge: 'Architecture' },
    { id: 'commands', label: '100 Commands Directory', icon: Terminal, badge: 'Dual Prefix & Slash' },
    { id: 'music', label: 'Voice Audio & 25 Filters', icon: Music, badge: 'FFmpeg' },
    { id: 'banners', label: 'Banners System', icon: Image, badge: 'Top & Bottom' },
    { id: 'prompt', label: 'Master Prompt', icon: FileText, badge: 'Export' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0f1012] text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500/30 selection:text-white">
      {/* Top Global Status Header */}
      <header className="bg-[#18191c] border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Bot Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                {/* DND Status Indicator Badge */}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-[#18191c] rounded-full flex items-center justify-center" title="Presence Status: Do Not Disturb (DND)">
                  <div className="w-1.5 h-0.5 bg-white rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-base tracking-tight">New York Automation</span>
                  <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded uppercase tracking-wider border border-blue-500/30">
                    APP
                  </span>
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline">• Los Angeles &amp; NYRP</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    v2.0.0 Discord.js v14
                  </span>
                  <span>•</span>
                  <span>100 Activities Rotating</span>
                  <span>•</span>
                  <span className="text-cyan-400">Modular Handlers</span>
                </div>
              </div>
            </div>

            {/* Quick Feature Badges */}
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-300">
                <Activity className="w-3.5 h-3.5 text-red-400" />
                <span>Anti-Ping: <b>3 Strikes &amp; 24h Mute</b></span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-300">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI: <b>Groq &amp; Sapling</b></span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Roblox: <b>Bloxlink Server API v4</b></span>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                      isActive 
                        ? 'bg-slate-950 text-cyan-300' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'simulator' && <EmbedSimulator />}
        {activeTab === 'code' && <CodeExporter />}
        {activeTab === 'commands' && <CommandsExplorer />}
        {activeTab === 'music' && <MusicPlayerSimulator />}
        {activeTab === 'banners' && <BannerManager />}
        {activeTab === 'prompt' && <PromptViewer />}
      </main>

      {/* Footer */}
      <footer className="bg-[#18191c] border-t border-slate-800 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-slate-300 font-semibold">
              Los Angeles Roleplay &amp; New York City Roleplay Discord Bot Hub
            </div>
            <div>
              Built with Discord.js v14 • SQLite Better-SQLite3 • Cookie API Transcripts • Bloxlink Server API v4 • Groq AI
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              100% Modular Structure
            </span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">src/commands/</span>
            <span>•</span>
            <span className="text-purple-400 font-mono">src/handlers/</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
