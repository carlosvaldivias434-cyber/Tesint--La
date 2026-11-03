import React, { useState, useMemo } from 'react';
import { 
  FileCode, Folder, Copy, Check, Download, Terminal, Sparkles, 
  Search, ShieldCheck, Zap, AlertCircle, Layers, Sliders, ChevronRight
} from 'lucide-react';
import { BOT_SOURCE_FILES, SourceFile } from '../data/botSourceFiles';

export const CodeExporter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<SourceFile>(
    BOT_SOURCE_FILES.find(f => f.path.includes('commandHandler')) || BOT_SOURCE_FILES[0]
  );
  const [selectedFolderFilter, setSelectedFolderFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const folderCategories = [
    { id: 'All', label: 'All Files', count: BOT_SOURCE_FILES.length },
    { id: 'Handlers', label: 'Handlers (src/handlers/)', filter: (f: SourceFile) => f.path.includes('src/handlers/') || f.category === 'Handlers' },
    { id: 'Commands', label: 'Commands (src/commands/)', filter: (f: SourceFile) => f.path.includes('src/commands/') || f.category === 'Commands' },
    { id: 'Events', label: 'Events (src/events/)', filter: (f: SourceFile) => f.path.includes('src/events/') || f.category === 'Events' },
    { id: 'Buttons', label: 'Buttons & Selects', filter: (f: SourceFile) => f.path.includes('src/buttons/') || f.path.includes('src/selects/') },
    { id: 'Services', label: 'Services (Bloxlink/Groq/Cookie)', filter: (f: SourceFile) => f.path.includes('src/services/') || f.category === 'Services' },
    { id: 'Config', label: 'Config & Core', filter: (f: SourceFile) => f.category === 'Configuration' || f.category === 'Core Engine' || f.category === 'Database' },
  ];

  const filteredFiles = useMemo(() => {
    return BOT_SOURCE_FILES.filter((file) => {
      // Folder category filter
      let matchesFolder = true;
      if (selectedFolderFilter === 'Handlers') {
        matchesFolder = file.path.includes('src/handlers/') || file.category === 'Handlers';
      } else if (selectedFolderFilter === 'Commands') {
        matchesFolder = file.path.includes('src/commands/') || file.category === 'Commands';
      } else if (selectedFolderFilter === 'Events') {
        matchesFolder = file.path.includes('src/events/') || file.category === 'Events';
      } else if (selectedFolderFilter === 'Buttons') {
        matchesFolder = file.path.includes('src/buttons/') || file.path.includes('src/selects/');
      } else if (selectedFolderFilter === 'Services') {
        matchesFolder = file.path.includes('src/services/') || file.category === 'Services';
      } else if (selectedFolderFilter === 'Config') {
        matchesFolder = file.category === 'Configuration' || file.category === 'Core Engine' || file.category === 'Database';
      }

      // Search filter
      const matchesSearch = 
        file.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFolder && matchesSearch;
    });
  }, [selectedFolderFilter, searchQuery]);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.path.split('/').pop() || 'file.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    const combined = BOT_SOURCE_FILES.map(
      (f) => `// ==================== FILE: ${f.path} ====================\n// ${f.description}\n${f.content}\n\n`
    ).join('\n');
    const blob = new Blob([combined], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'COMPLETE_DISCORD_BOT_CODEBASE.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
              <Folder className="w-3.5 h-3.5" /> Modular Architecture Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Isolated Error Containment
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Discord.js v14 Modular Source Repository</h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Every prefix command and slash command is placed into its own file inside <code className="text-cyan-300 bg-slate-900/80 px-1.5 py-0.5 rounded">src/commands/&lt;category&gt;/&lt;cmd&gt;.js</code>. 
            All routing is managed by dedicated handlers in <code className="text-purple-300 bg-slate-900/80 px-1.5 py-0.5 rounded">src/handlers/</code> so errors are caught instantly and never crash the bot!
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Download className="w-4 h-4" /> Download Complete Codebase
        </button>
      </div>

      {/* Why This Folder Architecture Fixes Errors Faster Card */}
      <div className="bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-slate-900/60 border border-blue-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl shrink-0 mt-0.5 border border-blue-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
              Why this modular folder layout makes debugging & fixing errors 10x faster:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-4 h-4 text-cyan-400" /> 1. Error Isolation
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Inside <code className="text-cyan-300">commandHandler.js</code>, every command runs in its own <code className="text-amber-300">try...catch</code>. If <code className="text-cyan-300">!ban</code> has a typo, only that command errors out—the bot, tickets, anti-ping, and training keep running!
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="font-bold text-purple-300 flex items-center gap-1.5 mb-1">
                  <Terminal className="w-4 h-4 text-purple-400" /> 2. Instant File Pinpointing
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Console logs show the exact file: <code className="text-purple-300">💥 [COMMAND ERROR] in src/commands/moderation/ban.js:28</code>. You don&apos;t have to read 3,000 lines in one file; just open <code className="text-purple-300">ban.js</code>!
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
                  <Layers className="w-4 h-4 text-emerald-400" /> 3. Dedicated Handlers
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  <code className="text-emerald-300">slashHandler.js</code> manages Discord REST slash registration, while <code className="text-emerald-300">buttonHandler.js</code> handles ticket & training buttons cleanly without cluttering commands.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Navigation Tabs & Search */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {folderCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFolderFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedFolderFilter === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files or code..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Code Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* File Tree Left Sidebar */}
        <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-4 shadow-xl space-y-2 lg:col-span-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-cyan-400" /> Files ({filteredFiles.length})
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
              {selectedFolderFilter}
            </span>
          </div>

          <div className="space-y-1 max-h-[580px] overflow-y-auto pr-1">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              const isHandler = file.path.includes('src/handlers/');
              const isCommand = file.path.includes('src/commands/');

              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="truncate flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      isHandler ? 'bg-purple-400' : isCommand ? 'bg-cyan-400' : 'bg-emerald-400'
                    }`} />
                    <span className="truncate">{file.path}</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans shrink-0 ml-1 ${
                    isSelected ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {file.category}
                  </span>
                </button>
              );
            })}

            {filteredFiles.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                No files found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </div>

        {/* Code Content Right Panel */}
        <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl lg:col-span-3 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 bg-[#18191c] border-b border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">{selectedFile.path}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-sans border border-slate-700">
                  {selectedFile.category}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={handleDownloadFile}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-xs flex items-center gap-1 transition-colors"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy File'}
              </button>
            </div>
          </div>

          <div className="p-5 font-mono text-xs text-slate-200 overflow-x-auto max-h-[620px] overflow-y-auto whitespace-pre leading-relaxed select-all selection:bg-cyan-500/30">
            {selectedFile.content}
          </div>
        </div>
      </div>
    </div>
  );
};
