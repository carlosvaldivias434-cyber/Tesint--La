import React, { useState } from 'react';
import { 
  Shield, Hash, MessageSquare, AlertTriangle, Users, BookOpen, 
  HelpCircle, CheckCircle, ExternalLink, RefreshCw, Sparkles, Send, 
  Lock, X, ChevronDown, Check, Star, Radio, Play, Pause, AlertOctagon, Terminal, Copy,
  Bot, Cpu, Code, UserCheck, ShieldAlert
} from 'lucide-react';
import { BANNER_ITEMS } from '../data/bannerConfig';
import { COMMANDS_100 } from '../data/commandsData';
import { ApplicationSimulatorModal } from './ApplicationSimulatorModal';

interface Props {
  onOpenAppModal?: () => void;
}

export const EmbedSimulator: React.FC<Props> = () => {
  const [activeChannel, setActiveChannel] = useState<
    'regulations' | 'assistance' | 'ticket-0014' | 'ticket-0229' | 'applications' | 'promotions' | 
    'infractions' | 'ia-appeal' | 'tripwire' | 'feedback' | 'departments' | 'marketplace' | 
    'training' | 'stats' | 'verify' | 'welcome' | 'repping' | 'antiping' | 'help'
  >('help');

  const [selectedHelpCategory, setSelectedHelpCategory] = useState<string>('Moderation');
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [helpCopiedCommand, setHelpCopiedCommand] = useState<string | null>(null);

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [ticketClaimedBy, setTicketClaimedBy] = useState<string | null>('Aviator62284');
  const [ticketStaffRole, setTicketStaffRole] = useState<'Staff Member' | 'Directive Team'>('Staff Member');
  const [inquiryText, setInquiryText] = useState('When will the server gonna be finished?');
  const [ticketClaimLogs, setTicketClaimLogs] = useState<string[]>([
    '✓ @Aviator62284 has now claimed this ticket.'
  ]);
  const [ticketStatus, setTicketStatus] = useState<'open' | 'closed'>('open');
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState<string>('respect');
  const [selectedPingRoles, setSelectedPingRoles] = useState<string[]>(['session']);
  const [infractionAppealed, setInfractionAppealed] = useState(false);
  const [infractionRevoked, setInfractionRevoked] = useState(false);
  const [appealUnauthorizedError, setAppealUnauthorizedError] = useState(false);
  const [revokedInfractionSample, setRevokedInfractionSample] = useState<'INF-0056' | 'INF-0049'>('INF-0056');
  const [tripwireStyle, setTripwireStyle] = useState<'screenshot' | 'larp'>('screenshot');
  const [trainingMode, setTrainingMode] = useState<'scheduled' | 'ended'>('scheduled');
  const [trainingJoined, setTrainingJoined] = useState(false);
  const [trainingAttendeesList, setTrainingAttendeesList] = useState<string[]>([]);
  const [promotionRevoked, setPromotionRevoked] = useState(false);
  const [promoCodeIndex, setPromoCodeIndex] = useState(43);
  const [infCodeIndex, setInfCodeIndex] = useState(55);
  const [antiPingVisible, setAntiPingVisible] = useState(true);
  const [antiPingCountdown, setAntiPingCountdown] = useState(7);
  const [antiPingStrikeCount, setAntiPingStrikeCount] = useState<number>(3);
  const [antiPingTargetRole, setAntiPingTargetRole] = useState<'Foundation Team' | 'Directive Team'>('Foundation Team');
  const [antiPingOffender, setAntiPingOffender] = useState<string>('cuentagratis1208');
  const [showAntiPingDmModal, setShowAntiPingDmModal] = useState<boolean>(false);
  const [antiPingDbLogs, setAntiPingDbLogs] = useState<Array<{ id: number; user: string; role: string; strikes: number; action: string; time: string; dmStatus: string }>>([
    {
      id: 1,
      user: 'cuentagratis1208',
      role: 'Foundation Team',
      strikes: 1,
      action: 'Warning sent (7s auto-delete)',
      time: 'Today at 6:42 PM',
      dmStatus: 'Delivered (Warning DM)'
    },
    {
      id: 2,
      user: 'cuentagratis1208',
      role: 'Foundation Team',
      strikes: 2,
      action: 'Final warning sent (7s auto-delete)',
      time: 'Today at 6:45 PM',
      dmStatus: 'Delivered (Escalated Warning DM)'
    },
    {
      id: 3,
      user: 'cuentagratis1208',
      role: 'Foundation Team',
      strikes: 3,
      action: '24-Hour Timeout Applied (1440m)',
      time: 'Today at 6:48 PM',
      dmStatus: 'Delivered (24h Mute DM with Reason)'
    }
  ]);

  // Bloxlink Server API v4 State & Roblox Headshot Avatar
  const [bloxlinkActiveTab, setBloxlinkActiveTab] = useState<'discord-to-roblox' | 'roblox-to-discord' | 'update-user'>('discord-to-roblox');
  const [bloxlinkServerId, setBloxlinkServerId] = useState('789699000047370261');
  const [bloxlinkDiscordUserId, setBloxlinkDiscordUserId] = useState('214858075650260992');
  const [bloxlinkRobloxId, setBloxlinkRobloxId] = useState('146941966');
  const [avatarHeadshotUrl, setAvatarHeadshotUrl] = useState('https://images.rbxcdn.com/f04c6e4e0ea90396160533c3938ab15b.png');

  // Verification state (Prefix Only)
  const [robloxInput, setRobloxInput] = useState('Carlos123');
  const [verificationStatus, setVerificationStatus] = useState<'unverified' | 'prompt' | 'verifying' | 'verified' | 'error'>('verified');
  const [verifiedRobloxUser, setVerifiedRobloxUser] = useState({
    username: 'Carlos123',
    displayName: 'Carlos [LARP]',
    userId: '146941966',
    discordTag: '@Carlos',
    discordId: '214858075650260992',
    serverNickname: 'Carlos123 | Carlos',
    verifiedAt: 'November 2, 2026',
    role: 'Verified',
    avatarHeadshot: 'https://images.rbxcdn.com/f04c6e4e0ea90396160533c3938ab15b.png'
  });
  const [verifyLogs, setVerifyLogs] = useState<string[]>([
    '🌐 [BLOXLINK v4] GET /guilds/789699000047370261/discord-to-roblox/214858075650260992 -> 200 { robloxID: "146941966" }',
    '🖼️ [ROBLOX THUMBNAILS] Resolved avatar headshot 150x150 circular PNG.',
    '📝 [NICKNAME SYNC] POST /update-user/214858075650260992 -> Server nickname set to "Carlos123 | Carlos".',
    '🛡️ [ROLES] Added @Verified (1140027663457816657), removed @Unverified.',
    '🎫 [TICKETS] Linked Roblox profile & headshot to ticket #0014.'
  ]);

  // Groq AI Support Assistant State (Tickets)
  const [groqInquiryInput, setGroqInquiryInput] = useState('');
  const [isGroqTyping, setIsGroqTyping] = useState(false);
  const [ticketChatHistory, setTicketChatHistory] = useState<Array<{ sender: 'user' | 'groq' | 'staff'; text: string; time: string; model?: string }>>([
    {
      sender: 'user',
      text: 'When will the server gonna be finished and what are the rules on FRP/VDM?',
      time: 'Today at 5:12 PM'
    },
    {
      sender: 'groq',
      text: 'Hello @Ronaldoiscat! Welcome to Los Angeles & New York City Roleplay support. FRP (Fail Roleplay) and VDM (Vehicle Deathmatch) result in immediate moderator warnings or 24-hour timeouts under server regulation §2. Our next scheduled roleplay session is active now! If you are awaiting whitelisting, run the prefix command `!verify` to link your Roblox account.',
      time: 'Today at 5:12 PM',
      model: 'llama-3.3-70b-versatile'
    }
  ]);

  // Sapling AI Detector State (Staff Applications)
  const [saplingApplicantScore, setSaplingApplicantScore] = useState<number>(3.8);
  const [saplingIsScanning, setSaplingIsScanning] = useState(false);
  const [saplingVerdict, setSaplingVerdict] = useState<'Human Written [PASS]' | 'AI Writing Suspected [FLAGGED]'>('Human Written [PASS]');

  // Anti-ping countdown and auto-disappear effect
  React.useEffect(() => {
    let timer: any;
    if (antiPingVisible && activeChannel === 'antiping' && antiPingStrikeCount < 3 && antiPingCountdown > 0) {
      timer = setInterval(() => {
        setAntiPingCountdown((prev) => {
          if (prev <= 1) {
            setAntiPingVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [antiPingVisible, activeChannel, antiPingCountdown, antiPingStrikeCount]);

  const triggerAntiPingTest = (strike: number = 1) => {
    setAntiPingStrikeCount(strike);
    setAntiPingVisible(true);
    setAntiPingCountdown(7);

    // Record to SQLite Audit Log in state
    const newLog = {
      id: Date.now(),
      user: antiPingOffender,
      role: antiPingTargetRole,
      strikes: strike,
      action:
        strike >= 3
          ? '24-Hour Timeout Applied (1440m)'
          : strike === 2
          ? 'Final warning sent (7s auto-delete)'
          : 'Warning sent (7s auto-delete)',
      time: 'Just now',
      dmStatus:
        strike >= 3
          ? 'Delivered (24h Mute DM with Reason)'
          : strike === 2
          ? 'Delivered (Escalated Warning DM)'
          : 'Delivered (Warning DM)',
    };
    setAntiPingDbLogs((prev) => [newLog, ...prev]);
  };

  // Helper to find banner item
  const getBanner = (id: string) => BANNER_ITEMS.find((b) => b.id === id);

  return (
    <div className="space-y-6">
      {/* Interactive App Modal */}
      <ApplicationSimulatorModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        topBanner={getBanner('applications')?.topBannerDefault || '/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png'}
        bottomBanner={getBanner('applications')?.bottomBannerDefault || '/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png'}
      />

      {/* Cookie API Transcript Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#2b2d31] border border-slate-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Sparkles className="w-5 h-5" /> Cookie API Official Transcript Generated
              </div>
              <button onClick={() => setShowCookieModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>The transcript was successfully processed, encrypted, and uploaded using the official Cookie API endpoint.</p>
              <div className="p-3 bg-[#1e1f22] rounded-xl font-mono text-cyan-300 text-[11px] break-all border border-slate-800">
                https://cookieapi.com/transcripts/larp-ticket-0229-9a84f93b.html
              </div>
              <div className="text-[11px] text-slate-400">
                • 17 messages preserved in sequence<br />
                • Author usernames, IDs, and avatars logged<br />
                • Embeds and staff claim information attached<br />
                • DM transcript copy dispatched to @Ronaldoiscat
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCookieModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Channel Switcher Tabs */}
      <div className="bg-[#1e1f22] border border-slate-800 rounded-2xl p-3 shadow-lg flex flex-wrap gap-1.5 items-center">
        <span className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-cyan-400" /> Channels:
        </span>
        {[
          { id: 'help', label: '📖 #bot-help (!help)', banner: true },
          { id: 'promotions', label: '🎉 #promotions', banner: true },
          { id: 'infractions', label: '⚠️ #infractions', banner: true },
          { id: 'applications', label: '📝 #applications', banner: true },
          { id: 'assistance', label: '📨 #assistance', banner: true },
          { id: 'ticket-0014', label: ticketClaimedBy ? '🟢 #general-0014' : '🔴 #general-0014', banner: true },
          { id: 'tripwire', label: '🛡️ #tripwire', banner: true },
          { id: 'regulations', label: '📌 #regulations', banner: true },
          { id: 'feedback', label: '👔 #staff-feedback', banner: true },
          { id: 'departments', label: '👮 #departments', banner: true },
          { id: 'marketplace', label: '🛍️ #marketplace', banner: true },
          { id: 'training', label: '🎓 #staff-training', banner: true },
          { id: 'stats', label: '📊 #server-stats', banner: false },
          { id: 'verify', label: '✅ #verification', banner: false },
          { id: 'welcome', label: '👋 #welcome', banner: false },
          { id: 'repping', label: '🏙️ #repping-tag', banner: true },
          { id: 'antiping', label: '⛔ #anti-ping', banner: false },
        ].map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              activeChannel === ch.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Main Discord Simulator Screen */}
      <div className="bg-[#313338] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-sans">
        {/* Discord App Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#2b2d31] border-b border-slate-800 text-slate-200">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Hash className="w-4 h-4 text-slate-400" />
            <span>{activeChannel}</span>
            <span className="text-xs font-normal text-slate-400 border-l border-slate-700 pl-2">
              Los Angeles Roleplay • Official Community Server
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold border border-emerald-500/30">
              Bot: DND Status
            </span>
          </div>
        </div>

        {/* Discord Chat Area */}
        <div className="p-6 space-y-6 max-h-[750px] overflow-y-auto">

          {/* ==================== !HELP / /HELP DIRECTORY WITH DROPDOWN ==================== */}
          {activeChannel === 'help' && (
            <div className="space-y-4">
              {/* User Command Message */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-700 flex items-center justify-center font-bold text-white shadow text-sm">
                  CA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300 text-sm hover:underline cursor-pointer">Carlos</span>
                    <span className="text-xs text-slate-400">Today at 4:30 PM</span>
                  </div>
                  <div className="text-xs font-mono bg-[#1e1f22] text-cyan-400 px-2.5 py-1 rounded inline-block mt-1 border border-slate-800">
                    !help
                  </div>
                </div>
              </div>

              {/* Bot Response Header */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  LA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Los Angeles / NYRP Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">Today at 4:30 PM</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Interactive Help Directory • All 100 Prefix &amp; Slash Commands
                  </div>
                </div>
              </div>

              {/* Main Rich Embed */}
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-3xl shadow-2xl">
                {/* Top Banner Header */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162022_a7ae61a6.png"
                  alt="Help Top Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-5">
                  <div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-cyan-400" />
                      LOS ANGELES ROLEPLAY • COMMAND DIRECTORY
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      Welcome to the official <b>Los Angeles Roleplay &amp; New York City Roleplay</b> Command Center. Use the <b>interactive dropdown menu below</b> to explore each section of our <b>100 configured commands</b>. Every command can be invoked using the <code className="bg-[#1e1f22] text-cyan-400 px-1.5 py-0.5 rounded font-mono">!</code> prefix or natively with Discord <code className="bg-[#1e1f22] text-purple-400 px-1.5 py-0.5 rounded font-mono">/</code> Slash commands.
                    </p>
                  </div>

                  {/* Highlights Stat Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-[#1e1f22] p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="text-slate-400 text-[11px]">Total Commands</div>
                      <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">100 Commands</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Prefix Syntax</div>
                      <div className="text-sm font-bold text-white font-mono mt-0.5">!command</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Slash Syntax</div>
                      <div className="text-sm font-bold text-purple-400 font-mono mt-0.5">/command</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">DM Notifications</div>
                      <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">Enabled (DMs)</div>
                    </div>
                  </div>

                  {/* Interactive Discord Select Menu (Dropdown) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                      <span>Select a command section:</span>
                      <span className="text-[11px] text-cyan-400 font-normal">
                        Viewing: <b>{selectedHelpCategory}</b> ({COMMANDS_100.filter(c => c.category === selectedHelpCategory).length} cmds)
                      </span>
                    </label>

                    {/* Custom Styled Select Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                        className="w-full bg-[#1e1f22] hover:bg-[#232428] border border-cyan-500/60 rounded-xl p-3 text-xs sm:text-sm text-white flex items-center justify-between shadow-inner transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {selectedHelpCategory === 'Moderation' && '🛡️'}
                            {selectedHelpCategory === 'Staff' && '👔'}
                            {selectedHelpCategory === 'Tickets' && '🎫'}
                            {selectedHelpCategory === 'Applications' && '📝'}
                            {selectedHelpCategory === 'Music' && '🎵'}
                            {selectedHelpCategory === 'Security' && '🚨'}
                            {selectedHelpCategory === 'Roleplay' && '🚓'}
                            {selectedHelpCategory === 'Marketplace' && '🛍️'}
                            {selectedHelpCategory === 'Verification' && '✅'}
                            {selectedHelpCategory === 'Utility' && '⚙️'}
                          </span>
                          <span className="font-bold text-cyan-300">{selectedHelpCategory}</span>
                          <span className="text-slate-400 text-xs">
                            — {COMMANDS_100.filter(c => c.category === selectedHelpCategory).length} commands
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${helpDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Options Drawer */}
                      {helpDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1e1f22] border border-slate-700 rounded-xl shadow-2xl z-30 max-h-60 overflow-y-auto p-1.5 space-y-1 custom-scrollbar">
                          {[
                            { name: 'Moderation', icon: '🛡️', desc: 'Bans, kicks, mutes, warnings, automated member DMs' },
                            { name: 'Staff', icon: '👔', desc: 'Promotions, infractions, training logs, reviews, duty' },
                            { name: 'Tickets', icon: '🎫', desc: 'Assistance panels, claims, escalations, Cookie API transcripts' },
                            { name: 'Applications', icon: '📝', desc: '15-question app flow, review tools, Sapling AI detection' },
                            { name: 'Music', icon: '🎵', desc: 'YouTube stream, 1s progress bar, 25 FFmpeg audio filters' },
                            { name: 'Security', icon: '🚨', desc: 'Tripwire top banner, Watchdog alerts, anti-ping auto-disappear' },
                            { name: 'Roleplay', icon: '🚓', desc: 'Departments, regulations, dashboard, ER:LC sessions, CAD' },
                            { name: 'Marketplace', icon: '🛍️', desc: 'Store panels, Robux giveaways, reroll, orders queue' },
                            { name: 'Verification', icon: '✅', desc: 'Official Roblox API verify, nickname change, @Verified' },
                            { name: 'Utility', icon: '⚙️', desc: 'Bot presence, Help directory, server statistics' },
                          ].map((cat) => {
                            const isCurrent = selectedHelpCategory === cat.name;
                            const count = COMMANDS_100.filter(c => c.category === cat.name).length;
                            return (
                              <button
                                key={cat.name}
                                onClick={() => {
                                  setSelectedHelpCategory(cat.name);
                                  setHelpDropdownOpen(false);
                                }}
                                className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                  isCurrent ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'hover:bg-[#2b2d31] text-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{cat.icon}</span>
                                  <div>
                                    <div className="font-semibold">{cat.name}</div>
                                    <div className="text-[10px] text-slate-400">{cat.desc}</div>
                                  </div>
                                </div>
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono font-bold">
                                  {count} cmds
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Active Section Command Cards Display */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span>Commands in {selectedHelpCategory}:</span>
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Showing {COMMANDS_100.filter(c => c.category === selectedHelpCategory).length} commands
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                      {COMMANDS_100.filter(c => c.category === selectedHelpCategory).map((cmd) => (
                        <div
                          key={cmd.id}
                          className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 hover:border-slate-700 text-xs space-y-1.5 transition-colors"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                {cmd.name}
                              </span>
                              {cmd.slashName === 'Prefix Only' ? (
                                <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 text-[10px]">
                                  Prefix Only (!verify)
                                </span>
                              ) : (
                                <span className="font-mono font-bold text-purple-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                  /{cmd.slashName}
                                </span>
                              )}
                              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                                {cmd.permission}
                              </span>
                              {cmd.dmsUser && (
                                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-bold border border-amber-500/30">
                                  ✉️ DMs Target
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`${cmd.syntax} | ${cmd.slashSyntax}`);
                                setHelpCopiedCommand(cmd.id);
                                setTimeout(() => setHelpCopiedCommand(null), 1500);
                              }}
                              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 text-[11px] flex items-center gap-1 transition-colors"
                              title="Copy command syntax"
                            >
                              {helpCopiedCommand === cmd.id ? (
                                <span className="text-emerald-400 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Copied
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Copy className="w-3 h-3" /> Copy
                                </span>
                              )}
                            </button>
                          </div>

                          <p className="text-slate-300 leading-relaxed text-xs">
                            {cmd.description}
                          </p>

                          <div className="bg-[#18191c] p-2 rounded-lg font-mono text-[11px] text-slate-300 border border-slate-800/80 flex flex-wrap items-center justify-between gap-1">
                            <div>
                              <span className="text-slate-400 font-sans">Prefix: </span>
                              <span className="text-cyan-300 font-bold">{cmd.syntax}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 font-sans">Slash: </span>
                              <span className="text-purple-300 font-bold">{cmd.slashSyntax}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Command Help Footer */}
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <span>Type <code className="text-cyan-400 font-mono">!help &lt;command&gt;</code> for in-depth parameter guidance.</span>
                    <span className="text-slate-400 font-mono">Los Angeles Roleplay • Page 1 of 10</span>
                  </div>
                </div>

                {/* Bottom Skyline Banner */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== PROMOTIONS ==================== */}
          {activeChannel === 'promotions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    NY
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">New York Automation</span>
                      <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      <span className="text-xs text-slate-400">Today at 4:12 PM</span>
                    </div>
                  </div>
                </div>

                {/* Counter Selector */}
                <div className="flex items-center gap-2 bg-[#1e1f22] p-1.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px] px-1 font-mono">Counter:</span>
                  {[0, 1, 43].map((num) => {
                    const code = `PRO-${String(num).padStart(4, '0')}`;
                    return (
                      <button
                        key={num}
                        onClick={() => setPromoCodeIndex(num)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition-colors ${
                          promoCodeIndex === num ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Promotions Embed with Top & Bottom Banners */}
              <div className="border-l-4 border-blue-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                {/* Top Banner Header */}
                <div className="relative">
                  <img
                    src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                    alt="Promotions Banner"
                    className="w-full max-h-40 object-cover"
                  />
                </div>

                <div className="p-5 space-y-3">
                  <div className="text-xs sm:text-sm text-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span>🪪 <b>Staff Member:</b></span>
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-medium">
                        {promoCodeIndex === 43 ? '@Djshsdhzudyx' : '@Snprx_182'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👤 <b>Promotion:</b></span>
                      <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-semibold">
                        {promoCodeIndex === 43 ? '@Junior Administrator' : '@Internal Affairs Supervisor'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <span>📌 <b>Reason:</b></span>
                      <span className="text-slate-300">
                        {promoCodeIndex === 43 ? 'Fastpassed' : 'Demonstrated leadership & activity'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1.5 font-mono">
                      <span className="text-blue-400">@Joekenz</span> - 
                      <span className="text-cyan-300 font-bold">PRO-{String(promoCodeIndex).padStart(4, '0')}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Banner Strip */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Sub-Thread: Promotion Revocation (Screenshot 1 matching) */}
              <div className="ml-6 pl-4 border-l-2 border-slate-700 space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Promotion Log Thread — PRO-{String(promoCodeIndex).padStart(4, '0')}
                  </div>
                  <button
                    onClick={() => setPromotionRevoked(!promotionRevoked)}
                    className="text-xs text-cyan-400 hover:underline font-mono"
                  >
                    {promotionRevoked ? 'Reset Revocation' : 'Show Screenshot 1 Revocation'}
                  </button>
                </div>

                {promotionRevoked ? (
                  <div className="bg-[#2b2d31] border border-slate-700 rounded-xl p-4 max-w-xl text-xs space-y-2 shadow-xl animate-fade-in">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <span className="text-slate-300 font-bold">✕</span> Promotion Revoked
                    </div>
                    <div className="text-slate-200 leading-relaxed">
                      <b>PRO-0039</b> (<span className="text-amber-400">@Junior Administrator</span>) for <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@Killer2hikids</span> was revoked by <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@joseph5g12345</span>.
                    </div>
                    <div className="border-l-2 border-slate-500 pl-2.5 text-xs text-slate-400">
                      already staff.
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setPromotionRevoked(true)}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> Revoke Promotion Log (!promotion-revoke)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ==================== INFRACTIONS ==================== */}
          {activeChannel === 'infractions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                    NY
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">New York Automation</span>
                      <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      <span className="text-xs text-slate-400">Today at 3:50 PM</span>
                    </div>
                  </div>
                </div>

                {/* Counter Selector */}
                <div className="flex items-center gap-2 bg-[#1e1f22] p-1.5 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 text-[11px] px-1 font-mono">Counter:</span>
                  {[0, 1, 49, 55].map((num) => {
                    const code = `INF-${String(num).padStart(4, '0')}`;
                    return (
                      <button
                        key={num}
                        onClick={() => setInfCodeIndex(num)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition-colors ${
                          infCodeIndex === num ? 'bg-red-500 text-white shadow' : 'bg-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Infractions Embed */}
              <div className="border-l-4 border-red-500 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161755_5e6bf22a.png"
                  alt="Infractions Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-5 space-y-4">
                  <div className="text-xs sm:text-sm text-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span>🪪 <b>Staff Member:</b></span>
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-medium">
                        {infCodeIndex === 55 ? '@Riffle48' : infCodeIndex === 49 ? '@2012TyLane' : '@viljar2013'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⚠️ <b>Punishment:</b></span>
                      <span className="text-red-400 font-bold">
                        {infCodeIndex === 55 ? 'Termination' : infCodeIndex === 49 ? 'Warning' : 'Demotion'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📎 <b>Appealable:</b></span>
                      <span className="text-slate-300">
                        {infCodeIndex === 55 ? 'No' : 'Yes'}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <span>📌 <b>Reason:</b></span>
                      <span className="text-slate-300 leading-relaxed">
                        {infCodeIndex === 55 ? 'Raider' : infCodeIndex === 49 ? 'Improper radio callout protocol' : 'No promotion log to TIA for him, was given TIA a week ago and revoked.'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1 font-mono">
                      <span className="text-blue-400">@Graves</span> - 
                      <span className="text-red-400 font-bold">INF-{String(infCodeIndex).padStart(4, '0')}</span>
                    </div>
                  </div>

                  {/* Buttons Row: Appeal Button & Revoke Button */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveChannel('ia-appeal')}
                      className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors active:scale-95 shadow"
                    >
                      <Shield className="w-3.5 h-3.5" /> Appeal Infraction (Internal Affairs)
                    </button>
                    <button
                      onClick={() => setAppealUnauthorizedError(!appealUnauthorizedError)}
                      className="px-3.5 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors active:scale-95 shadow"
                      title="Test clicking Appeal as someone who did not receive the infraction"
                    >
                      <X className="w-3.5 h-3.5 text-red-400" /> Test Unauthorized Click
                    </button>
                    <button
                      onClick={() => {
                        setInfractionRevoked(!infractionRevoked);
                        setRevokedInfractionSample('INF-0056');
                      }}
                      className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors active:scale-95 shadow"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-400" /> Test Revoke (!infraction-revoke)
                    </button>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161755_5e6bf22a.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Exact Ephemeral Message from Screenshot_2026-11-02_191152_fad942c9.png */}
              {appealUnauthorizedError && (
                <div className="space-y-2 pt-1 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-slate-500">↳</span>
                    <span>New York Automation <span className="bg-[#5865f2] text-white text-[9px] px-1 rounded">APP</span> 7:11 PM</span>
                  </div>
                  <div className="bg-[#2b2d31] border border-red-500/30 rounded-xl p-3.5 max-w-xl text-xs space-y-1 shadow-lg">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <span className="text-red-400 font-bold">✕</span> Only the staff member who received this infraction can appeal it.
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                      <span>👁️ Only you can see this • Dismiss message</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Exact Infraction Revoked Embed from Screenshot_2026-11-02_191148_184fc59e.png & image_549599ab.png */}
              {infractionRevoked && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between max-w-xl">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Output: /infraction-revoke id:{revokedInfractionSample}
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setRevokedInfractionSample('INF-0056')}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          revokedInfractionSample === 'INF-0056' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        INF-0056 (Screenshot)
                      </button>
                      <button
                        onClick={() => setRevokedInfractionSample('INF-0049')}
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          revokedInfractionSample === 'INF-0049' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        INF-0049 (TyLane)
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#2b2d31] border border-blue-500/40 rounded-xl p-4 max-w-xl shadow-xl space-y-2">
                    {/* Blue highlighted header matching Screenshot_2026-11-02_191148_184fc59e.png */}
                    <div className="inline-flex items-center gap-1.5 bg-[#2051d9] text-white text-xs font-black px-2.5 py-1 rounded shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" /> Infraction Revoked
                    </div>

                    <div className="text-xs text-white leading-relaxed">
                      {revokedInfractionSample === 'INF-0056' ? (
                        <>
                          <b>INF-0056</b> (Warning) for <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@jicobg</span> was revoked by <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@joseph5g12345</span>.
                        </>
                      ) : (
                        <>
                          <b>INF-0049</b> (Warning) for <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@2012TyLane</span> was revoked by <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-semibold">@strxlc</span>.
                        </>
                      )}
                    </div>

                    <div className="border-l-2 border-slate-600 pl-2.5 text-xs text-slate-300 font-normal">
                      {revokedInfractionSample === 'INF-0056' ? 'Not GTAD.' : 'Improper evidence'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== INTERNAL AFFAIRS APPEAL TICKET ==================== */}
          {activeChannel === 'ia-appeal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#1e1f22] p-3 rounded-xl border border-slate-800 text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  🔒 Private Ticket: #ia-appeal-inf-0049
                </span>
                <button
                  onClick={() => setActiveChannel('infractions')}
                  className="text-cyan-400 hover:underline"
                >
                  ← Back to Infractions
                </button>
              </div>

              {/* IA Header Card */}
              <div className="border-l-4 border-amber-500 bg-[#2b2d31] rounded-r-xl p-5 max-w-2xl shadow-xl space-y-3">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Shield className="w-5 h-5 text-amber-400" />
                  Internal Affairs — Disciplinary Appeal Tribunal
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Welcome <span className="text-blue-400 font-semibold">@2012TyLane</span>. You have requested an official appeal for <b>INF-0049 (Warning)</b>.
                </p>

                {/* AI Support Assistant Prompting with References */}
                <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> AI Support Assistant (Internal Affairs Knowledge Base)
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    "Hello @2012TyLane. To properly process your appeal for <b>INF-0049</b>, please answer the following according to Section 4.2 of our Staff Disciplinary Code:
                  </p>
                  <div className="text-slate-400 space-y-1 pl-2 border-l-2 border-cyan-500/50">
                    <div>1. Why was this punishment unjustified or based on incomplete information?</div>
                    <div>2. Do you have uncropped video or chat logs to demonstrate compliance?</div>
                    <div>3. Have you reviewed the radio protocol handbook guidelines?</div>
                  </div>
                  <p className="text-slate-300 italic pt-1">
                    Once you post your statement below, our Directive & Internal Affairs team will review it."
                  </p>
                </div>

                {/* User Response Simulation */}
                <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-blue-400 font-bold">@2012TyLane:</div>
                  <p className="text-slate-200">
                    "The video clip used against me was cropped right before the 10-99 panic button callout was transmitted by Dispatch. I was following standard pursuit order 3. Here is the uncropped 2-minute recording."
                  </p>
                </div>

                {/* IA Officer Actions */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setInfractionRevoked(true);
                      setActiveChannel('infractions');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1.5 shadow"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Appeal & Revoke (strxlc)
                  </button>
                  <button
                    onClick={() => setActiveChannel('infractions')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded flex items-center gap-1.5 shadow"
                  >
                    <X className="w-3.5 h-3.5" /> Uphold Punishment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TRIPWIRE (Exact match to image_91cdcf77.png) ==================== */}
          {activeChannel === 'tripwire' && (
            <div className="space-y-4">
              {/* Controls bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e1f22] p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    🛡️ Tripwire Command Execution:
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                    !tripwire (Prefix Command)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTripwireStyle('screenshot')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      tripwireStyle === 'screenshot'
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    Match image_91cdcf77.png
                  </button>
                  <button
                    onClick={() => setTripwireStyle('larp')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      tripwireStyle === 'larp'
                        ? 'bg-cyan-600 text-slate-950 font-bold shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    LARP Community Mode
                  </button>
                </div>
              </div>

              {/* 1. User Prefix Command Invocation */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-700 flex items-center justify-center font-bold text-white shadow text-sm">
                  CA
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-cyan-300 text-sm hover:underline cursor-pointer">Carlos</span>
                    <span className="text-xs text-slate-400">10/25/26, 5:38 PM</span>
                  </div>
                  <div className="text-xs font-mono bg-[#1e1f22] text-cyan-400 px-2.5 py-1 rounded inline-block mt-1 border border-slate-800">
                    !tripwire
                  </div>
                </div>
              </div>

              {/* 2. Bot Message Attribution matching image_91cdcf77.png */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-white shadow-md overflow-hidden">
                  <span className="text-lg">🐎</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {tripwireStyle === 'screenshot' ? 'Stallion' : 'New York / LA Automation'}
                    </span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> APP
                    </span>
                    <span className="text-xs text-slate-400">10/25/26, 5:38 PM</span>
                  </div>
                </div>
              </div>

              {/* Exact Tripwire Embed matching image_91cdcf77.png */}
              <div className="border border-slate-700/80 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-xl shadow-2xl space-y-0">
                {/* Embedded Banner with Red TRIPWIRE typography */}
                <div className="p-3 pb-0">
                  <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-black/80">
                    <img
                      src="/assets/aistudio/image_91cdcf77.png"
                      alt="Tripwire Banner"
                      className="w-full max-h-48 object-contain bg-black"
                    />
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Title: ⚠️ Tripwire */}
                  <div className="flex items-center gap-2 text-white font-extrabold text-base">
                    <span className="text-amber-400 text-lg">⚠️</span> Tripwire
                  </div>

                  {/* Body text matching image_91cdcf77.png */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    Welcome to 🚩 <b>{tripwireStyle === 'screenshot' ? 'Texas State Roleplay' : 'Los Angeles Roleplay'}</b> tripwire. Here is where we catch malicious bots to keep our community safe. We ask that you <b>do not chat in this channel if you are a real user. If you do chat, you will be softbanned.</b>
                  </p>

                  {/* Action Row: Exact 2 Disabled Buttons from image_91cdcf77.png */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <button
                      disabled
                      className="px-3.5 py-2 bg-[#202225] hover:bg-[#202225] text-slate-200 border border-slate-700/80 text-xs font-bold rounded-lg cursor-not-allowed opacity-90 shadow flex items-center gap-1.5"
                    >
                      <span>⚠️</span> 19 Softbans
                    </button>
                    <button
                      disabled
                      className="px-3.5 py-2 bg-[#202225] hover:bg-[#202225] text-slate-200 border border-slate-700/80 text-xs font-bold rounded-lg cursor-not-allowed opacity-90 shadow flex items-center gap-1.5"
                    >
                      <span>🛡️</span> Protecting {tripwireStyle === 'screenshot' ? '5937' : '19,800'} members.
                    </button>
                  </div>
                </div>

                {/* STRICTLY NO BOTTOM BANNER */}
              </div>
            </div>
          )}

          {/* ==================== ASSISTANCE & TICKETS ==================== */}
          {(activeChannel === 'assistance' || activeChannel === 'ticket-0229') && (
            <div className="space-y-6">
              {activeChannel === 'assistance' ? (
                /* Contact Us Channel Panel */
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                      NY
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">New York Automation</span>
                        <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                    <img
                      src="/assets/aistudio/Screenshot_2026-11-02_161959_b2ef633a.png"
                      alt="Assistance Top Banner"
                      className="w-full max-h-40 object-cover"
                    />

                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-base font-bold text-white">
                        📬 Contact us — New York City Roleplay
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Need assistance? Open a ticket and our team will be ready to help. Choose the category that matches your issue below and a private channel will be opened for you.
                      </p>

                      <div className="text-xs text-slate-300 space-y-1.5">
                        <div className="font-semibold text-white">Choose your category:</div>
                        <div className="flex items-start gap-1.5">
                          <span>⚙️ <b>General:</b> Questions, support, and assistance from any staff member.</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span>👥 <b>High Rank:</b> Escalated concerns requiring senior staff attention.</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span>👮 <b>Department:</b> Department-related or high-priority leadership matters.</span>
                        </div>
                      </div>

                      {/* Dropdown Menu */}
                      <div className="pt-2">
                        <button
                          onClick={() => setActiveChannel('ticket-0014')}
                          className="w-full bg-[#1e1f22] hover:bg-[#232428] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-300 flex items-center justify-between"
                        >
                          <span>⚙️ General Support (Open #0014)</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>

                    <img
                      src="/assets/aistudio/Screenshot_2026-11-02_162421_1749c6e8.png"
                      alt="Bottom Strip"
                      className="w-full h-8 object-cover"
                    />
                  </div>
                </div>
              ) : (
                /* Inside The Open Ticket Channel matching image_402500c5.png (#0014) */
                <div className="space-y-4">
                  {/* Channel Top Header matching image_402500c5.png */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e1f22] p-3.5 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{ticketClaimedBy ? '🟢' : '🔴'}</span>
                      <span className="text-white font-extrabold text-sm sm:text-base">
                        General Support <span className="text-slate-400 font-mono">#0014</span>
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {ticketClaimedBy ? '🟢-general-0014' : '🔴-general-0014'}
                      </span>
                    </div>

                    {/* Staff Claim Role Switcher & Back button */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-[#2b2d31] p-1 rounded-lg border border-slate-700 text-[11px]">
                        <span className="text-slate-400 px-1">Role:</span>
                        {(['Staff Member', 'Directive Team'] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => setTicketStaffRole(r)}
                            className={`px-2 py-0.5 rounded font-medium transition-colors ${
                              ticketStaffRole === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveChannel('assistance')}
                        className="text-cyan-400 hover:underline text-xs"
                      >
                        ← Back to Assistance
                      </button>
                    </div>
                  </div>

                  {/* Top Ping above embed matching image_e6baf19e.png */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-[#5865f2]/20 text-[#c9cdfb] font-semibold px-2 py-0.5 rounded">
                      @Support Team
                    </span>
                  </div>

                  {/* Main Ticket Embed matching image_e6baf19e.png */}
                  <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                    <div className="p-6 space-y-4">
                      {/* Embed Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-base font-extrabold text-white">
                          <span>⚙️</span> General Support
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-[#1e1f22] text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                          Bloxlink v4 Synced
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        Hello <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Ronaldoiscat</span> thank you for reaching out to us. Please remain patient as one of our staff members comes to assist you.
                      </p>

                      {/* Roblox Information with circular Avatar Headshot & hyperlinked profile */}
                      <div className="space-y-1.5 text-xs text-slate-200 bg-[#1e1f22]/70 p-3 rounded-xl border border-slate-800">
                        <div className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                          <span>🎲</span> Roblox Information:
                        </div>
                        <div className="flex items-center gap-4 pt-1">
                          <img
                            src={verifiedRobloxUser.avatarHeadshot || 'https://images.rbxcdn.com/f04c6e4e0ea90396160533c3938ab15b.png'}
                            alt="Roblox Avatar Headshot"
                            className="w-14 h-14 rounded-full border-2 border-cyan-500/50 bg-[#141517] shadow shrink-0 object-cover"
                          />
                          <div className="space-y-0.5 text-slate-300 text-xs">
                            <div>
                              <b>Roblox Username:</b>{' '}
                              <a
                                href={`https://www.roblox.com/users/${verifiedRobloxUser.userId}/profile`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-cyan-400 hover:underline font-mono font-bold"
                              >
                                [{verifiedRobloxUser.username}] (https://www.roblox.com/users/{verifiedRobloxUser.userId}/profile)
                              </a>
                            </div>
                            <div><b>Roblox ID:</b> <span className="font-mono text-cyan-300 font-bold">{verifiedRobloxUser.userId}</span></div>
                            <div className="flex items-center gap-1 text-slate-400">
                              <span>Bloxlink Status:</span>
                              <span className="bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-semibold text-[11px] border border-emerald-500/30">
                                Verified Discord-to-Roblox
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Discord Information matching image_e6baf19e.png */}
                      <div className="space-y-1.5 text-xs text-slate-200">
                        <div className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                          <span>💬</span> Discord Information:
                        </div>
                        <div className="pl-2 space-y-0.5 text-slate-300">
                          <div>
                            <b>Discord Account:</b>{' '}
                            <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                              @Ronaldoiscat
                            </span>
                          </div>
                          <div><b>Discord ID:</b> <span className="font-mono text-slate-200">1025813762684502168</span></div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <span>Account Creation:</span>
                            <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded border border-slate-800 text-slate-200 font-mono">
                              Oct 1, 09:57 AM
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* What is your inquiry? Box matching image_e6baf19e.png */}
                      <div className="space-y-1.5 pt-1">
                        <div className="text-xs font-bold text-white">What is your inquiry?</div>
                        <div className="bg-[#1e1f22] p-3 rounded-lg font-mono text-xs text-slate-200 border border-slate-800 shadow-inner">
                          {inquiryText}
                        </div>
                      </div>

                      {/* Action Buttons: Claim (Green) / Unclaim (Red), Close, Escalate */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {ticketClaimedBy ? (
                          /* Claimed State -> Button turns RED "Unclaim" */
                          <button
                            onClick={() => {
                              const staffName = ticketStaffRole === 'Directive Team' ? 'Aviator62284 (Directive Team)' : 'Aviator62284';
                              setTicketClaimedBy(null);
                              setTicketClaimLogs((prev) => [
                                `✕ @${staffName} has unclaimed this ticket.`,
                                ...prev
                              ]);
                            }}
                            className="px-4 py-2 bg-[#da373c] hover:bg-[#b82e33] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                          >
                            <X className="w-3.5 h-3.5" /> Unclaim
                          </button>
                        ) : (
                          /* Unclaimed State -> Button is GREEN "Claim" */
                          <button
                            onClick={() => {
                              const staffName = ticketStaffRole === 'Directive Team' ? 'Aviator62284 (Directive Team)' : 'Aviator62284';
                              setTicketClaimedBy('Aviator62284');
                              setTicketClaimLogs((prev) => [
                                `✓ @${staffName} has now claimed this ticket.`,
                                ...prev
                              ]);
                            }}
                            className="px-4 py-2 bg-[#248046] hover:bg-[#1a6334] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                          >
                            <Check className="w-3.5 h-3.5" /> Claim
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setTicketStatus('closed');
                            setShowCookieModal(true);
                          }}
                          className="px-4 py-2 bg-[#da373c] hover:bg-[#b82e33] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                        >
                          <X className="w-3.5 h-3.5" /> Close
                        </button>
                        <button
                          className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                        >
                          📎 Escalate
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Groq AI Support Assistant Interactive Widget & Human Staff Takeover */}
                  <div className="space-y-3">
                    <div className="bg-[#2b2d31] border border-cyan-500/40 rounded-xl p-4 max-w-2xl text-xs space-y-3 shadow-xl">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold text-white text-xs sm:text-sm">
                            Groq AI Support Assistant
                          </span>
                          <span className="bg-[#f97316]/20 text-[#fb923c] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold border border-orange-500/30">
                            ⚡ llama-3.3-70b-versatile
                          </span>
                        </div>
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                          ticketClaimedBy 
                            ? 'bg-amber-950 text-amber-300 border border-amber-600/30' 
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-600/30'
                        }`}>
                          {ticketClaimedBy ? '● Groq AI Paused (Staff Active)' : '● Groq AI Active'}
                        </span>
                      </div>

                      {/* Interactive Groq Conversation Stream */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {ticketChatHistory.map((msg, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-[#1e1f22] text-slate-200 border border-slate-800'
                                : 'bg-[#1a2333] text-cyan-100 border border-cyan-800/40'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                              <span className="font-bold flex items-center gap-1">
                                {msg.sender === 'user' ? (
                                  <span className="text-[#c9cdfb]">@Ronaldoiscat</span>
                                ) : (
                                  <span className="text-cyan-300 flex items-center gap-1">
                                    <Bot className="w-3 h-3 text-cyan-400" /> Groq AI Assistant
                                  </span>
                                )}
                              </span>
                              <span>{msg.time}</span>
                            </div>
                            <p>{msg.text}</p>
                          </div>
                        ))}

                        {isGroqTyping && (
                          <div className="flex items-center gap-2 text-cyan-400 text-xs italic p-2 bg-[#1e1f22] rounded-lg">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Groq AI is thinking (llama-3.3-70b-versatile)...</span>
                          </div>
                        )}
                      </div>

                      {/* Quick Prompt Buttons */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400 py-1">Quick Inquiries:</span>
                        {[
                          'How do I join the Police Team?',
                          'What is FRP & VDM?',
                          'How do I attend Staff Training?',
                          'Where are server rules posted?'
                        ].map((prompt, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (ticketClaimedBy) return;
                              setTicketChatHistory(prev => [
                                ...prev,
                                { sender: 'user', text: prompt, time: 'Just now' }
                              ]);
                              setIsGroqTyping(true);
                              setTimeout(() => {
                                let reply = 'Please make sure to run prefix command !verify to link your Roblox profile.';
                                if (prompt.includes('Police')) {
                                  reply = 'To join the Miami-Dade / LAPD Police Team, verify your Roblox ID with `!verify`, then submit an application in #applications or attend an open tryout in #announcements.';
                                } else if (prompt.includes('FRP')) {
                                  reply = 'FRP stands for Fail Roleplay and VDM stands for Vehicle Deathmatch. Both violate community regulation §2 and incur an automatic 24-hour timeout or formal strike.';
                                } else if (prompt.includes('Training')) {
                                  reply = 'Staff Training is held in the Police Briefing Room. Trainees must press [Join Training] in #staff-training and complete training within 7 days of appointment!';
                                } else if (prompt.includes('rules')) {
                                  reply = 'Server rules and regulations are permanently displayed in #regulations with live interactive toggle pings and ER:LC live radar statistics.';
                                }
                                setTicketChatHistory(prev => [
                                  ...prev,
                                  { sender: 'groq', text: reply, time: 'Just now', model: 'llama-3.3-70b-versatile' }
                                ]);
                                setIsGroqTyping(false);
                              }, 900);
                            }}
                            disabled={!!ticketClaimedBy}
                            className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                              ticketClaimedBy
                                ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                                : 'bg-[#1e1f22] text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-800'
                            }`}
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>

                      {/* Interactive Custom Inquiry Input */}
                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={groqInquiryInput}
                          onChange={(e) => setGroqInquiryInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && groqInquiryInput.trim() && !ticketClaimedBy) {
                              const q = groqInquiryInput.trim();
                              setGroqInquiryInput('');
                              setTicketChatHistory(prev => [
                                ...prev,
                                { sender: 'user', text: q, time: 'Just now' }
                              ]);
                              setIsGroqTyping(true);
                              setTimeout(() => {
                                setTicketChatHistory(prev => [
                                  ...prev,
                                  {
                                    sender: 'groq',
                                    text: `Thank you for asking! For "${q}", please check our community guides in #regulations or wait for human staff. Trainees must finish staff training within 7 days!`,
                                    time: 'Just now',
                                    model: 'llama-3.3-70b-versatile'
                                  }
                                ]);
                                setIsGroqTyping(false);
                              }, 800);
                            }
                          }}
                          placeholder={ticketClaimedBy ? 'Groq AI is paused because a staff member has claimed this ticket.' : 'Ask Groq AI ticket assistant anything...'}
                          disabled={!!ticketClaimedBy}
                          className="flex-1 bg-[#1e1f22] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 disabled:opacity-60"
                        />
                        <button
                          onClick={() => {
                            if (!groqInquiryInput.trim() || ticketClaimedBy) return;
                            const q = groqInquiryInput.trim();
                            setGroqInquiryInput('');
                            setTicketChatHistory(prev => [
                              ...prev,
                              { sender: 'user', text: q, time: 'Just now' }
                            ]);
                            setIsGroqTyping(true);
                            setTimeout(() => {
                              setTicketChatHistory(prev => [
                                ...prev,
                                {
                                  sender: 'groq',
                                  text: `Regarding "${q}": All roleplay members must follow 10-codes and verify via !verify. If this requires internal affairs review, our staff team is on standby!`,
                                  time: 'Just now',
                                  model: 'llama-3.3-70b-versatile'
                                }
                              ]);
                              setIsGroqTyping(false);
                            }, 800);
                          }}
                          disabled={!!ticketClaimedBy || !groqInquiryInput.trim()}
                          className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow"
                        >
                          <Send className="w-3.5 h-3.5" /> Send
                        </button>
                      </div>
                    </div>

                    {/* Staff Claim Notification Message matching image_5d1a05a6.png */}
                    {ticketClaimLogs.map((log, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 py-1">
                        <span className="text-[11px] text-slate-400 italic">(edited)</span>
                        <span className={log.startsWith('✓') ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {log.startsWith('✓') ? '✓' : '✕'}
                        </span>
                        <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                          @{log.includes('Directive Team') ? 'Aviator62284 (Directive Team)' : 'Aviator62284'}
                        </span>
                        <span>
                          {log.startsWith('✓') ? 'has now claimed this ticket.' : 'has unclaimed this ticket.'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Closed Ticket Transcript Log Card */}
                  {ticketStatus === 'closed' && (
                    <div className="border-l-4 border-slate-500 bg-[#2b2d31] rounded-r-xl p-5 max-w-2xl shadow-xl space-y-3">
                      <div className="font-bold text-white text-base">
                        Ticket #0014 — General Support
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div><b>General Support</b> ticket in <b>New York City Roleplay</b> has been closed.</div>
                        <div>↳ <b>Handled By:</b> <span className="text-blue-400">@Aviator62284</span></div>
                        <div>↳ <b>Closed By:</b> <span className="text-blue-400">@Aviator62284</span></div>
                        <div className="text-slate-400 pt-1">Opened: Nov 1, 2026 • Duration: 4m • Messages: 12</div>
                      </div>

                      {/* Online Transcript Cookie API Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => setShowCookieModal(true)}
                          className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow"
                        >
                          Online Transcript <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ==================== STAFF APPLICATIONS ==================== */}
          {activeChannel === 'applications' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png"
                  alt="Applications Top Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-lg font-bold text-white">Staff Applications</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Interested in joining the staff team? You can get started by completing the application below. Please ensure all information you provide is accurate and detailed, as applications are carefully reviewed to select individuals who will contribute positively to the community and uphold standards. To begin, choose the <b>Staff Application</b> option from the dropdown. After making your selection, you will be added to a private channel with the next steps.
                  </p>

                  <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="font-bold text-white">Staff Applications:</div>
                    <p>Applicants must be 13 years or older. You should have your Roblox username, user ID, timezone, and any other relevant details ready before applying.</p>
                    <p className="text-slate-400">All applications are reviewed by the high-ranking team. You will be notified of the outcome via DM — please be patient. Trolling or submitting false information will result in a permanent blacklist.</p>
                  </div>

                  {/* Dropdown triggers modal */}
                  <div className="pt-2">
                    <button
                      onClick={() => setIsAppModalOpen(true)}
                      className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold p-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
                    >
                      <Sparkles className="w-4 h-4" /> Start 15-Question Interactive Application Flow
                    </button>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162054_f989e959.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Sapling AI Writing Detection Widget for Staff Applications */}
              <div className="bg-[#2b2d31] border border-cyan-500/40 rounded-2xl p-5 max-w-2xl shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-white text-xs sm:text-sm">
                      Sapling AI Writing Detector • Staff Applications Review
                    </span>
                  </div>
                  <span className="bg-purple-950 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/30 font-bold">
                    api.sapling.ai/v1/aidetect
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Every submitted staff application is automatically scanned through the <b>Sapling AI Detection API</b> across all 15 questions to catch ChatGPT-generated responses and ensure genuine human applicants.
                </p>

                {/* Score breakdown bar */}
                <div className="bg-[#1e1f22] p-3.5 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Latest Applicant Scan:</span>
                    <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                      saplingApplicantScore > 60
                        ? 'bg-red-950 text-red-400 border border-red-500/30'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {saplingApplicantScore}% AI Probability — {saplingVerdict}
                    </span>
                  </div>

                  {/* Progress meter */}
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        saplingApplicantScore > 60 ? 'bg-red-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${saplingApplicantScore}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>🟢 0% Human Written</span>
                    <span>Threshold: 60%</span>
                    <span>🔴 100% ChatGPT / AI Generated</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-1 text-xs">
                  <button
                    onClick={() => {
                      setSaplingIsScanning(true);
                      setTimeout(() => {
                        setSaplingApplicantScore(3.8);
                        setSaplingVerdict('Human Written [PASS]');
                        setSaplingIsScanning(false);
                      }, 600);
                    }}
                    className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 rounded-lg font-semibold flex items-center gap-1 active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" /> Test Human Sample (3.8% AI)
                  </button>
                  <button
                    onClick={() => {
                      setSaplingIsScanning(true);
                      setTimeout(() => {
                        setSaplingApplicantScore(96.4);
                        setSaplingVerdict('AI Writing Suspected [FLAGGED]');
                        setSaplingIsScanning(false);
                      }, 600);
                    }}
                    className="px-3 py-1.5 bg-red-600/30 hover:bg-red-600/40 text-red-300 border border-red-500/40 rounded-lg font-semibold flex items-center gap-1 active:scale-95"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" /> Test AI/ChatGPT Sample (96.4% AI)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== REGULATIONS (Screenshots 5 & 6 matching) ==================== */}
          {activeChannel === 'regulations' && (
            <div className="space-y-6">
              {/* Embed 1: Dashboard (Screenshot 5) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162022_a7ae61a6.png"
                  alt="Regulations Header Banner"
                  className="w-full max-h-44 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-xl font-bold text-white tracking-tight">Dashboard</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">🏙️ New York City Roleplay</span> was founded on <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded border border-slate-700 font-mono text-slate-200">April 20, 2024</span>. This is the channel where you can locate all our server information you need to roleplay here at New York. We offer a fun and realistic roleplay experience, so we recommend reading through the important information provided here.
                  </p>

                  {/* Dropdown Menu */}
                  <div className="pt-1">
                    <div className="w-full bg-[#1e1f22] border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-300 flex items-center justify-between cursor-pointer hover:border-slate-600">
                      <span>Navigate the dashboard</span>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Action Buttons: ER:LC Live Map & My ER:LC Statistics */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      🗺️ ER:LC Live Map
                    </button>
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      📊 My ER:LC Statistics
                    </button>
                  </div>
                </div>

                {/* Bottom Skyline Banner */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Banner"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Embed 2: Notifications (Screenshot 6) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_162022_a7ae61a6.png"
                  alt="Regulations Header Banner"
                  className="w-full max-h-44 object-cover"
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>📢</span> Notifications
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Choose what you want to be pinged for. Tick the pings you want and untick the ones you don't, your roles update straight away.
                  </p>

                  {/* Interactive Ping Role Toggles */}
                  <div className="space-y-3 pt-1">
                    {[
                      { id: 'session', name: 'Session Pings', tag: '@Session Ping', desc: 'When an in-game session starts or needs players' },
                      { id: 'announcement', name: 'Announcement Pings', tag: '@Announcement Ping', desc: 'Important server announcements' },
                      { id: 'event', name: 'Event Pings', tag: '@Event Ping', desc: 'Car meets, community events and specials' },
                      { id: 'giveaway', name: 'Giveaway Pings', tag: '@Giveaway Ping', desc: 'New giveaways you can enter' },
                      { id: 'update', name: 'Update Pings', tag: '@Update Ping', desc: 'Server and Discord updates' },
                      { id: 'poll', name: 'Poll Pings', tag: '@Poll Ping', desc: 'Polls where your vote counts' },
                    ].map((item) => {
                      const isSelected = selectedPingRoles.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedPingRoles((prev) =>
                              prev.includes(item.id) ? prev.filter((x) => x !== item.id) : [...prev, item.id]
                            );
                          }}
                          className="p-3 bg-[#1e1f22] hover:bg-[#232428] rounded-xl border border-slate-800 transition-colors cursor-pointer space-y-0.5"
                        >
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-slate-400 font-bold'}>
                              {isSelected ? '✓' : '✕'}
                            </span>
                            <span className="font-bold text-white">{item.name}</span>
                            <span className="text-slate-400">·</span>
                            <span className="bg-[#5865f2]/20 text-[#c9cdfb] text-xs px-1.5 py-0.5 rounded font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 pl-4">{item.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== DEPARTMENTS ==================== */}
          {activeChannel === 'departments' && (
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161919_6c021a34.png"
                  alt="Departments Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    🏢 New York & Florida Whitelisted Departments
                  </h4>
                  <p className="text-xs text-slate-300">
                    Below you can find our whitelisted departments and divisions they have to offer:
                  </p>

                  <div className="space-y-3">
                    <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">👮 Miami-Dade / LAPD Office</div>
                        <div className="text-[11px] text-slate-400">Primary Department • Fully Whitelisted</div>
                      </div>
                      <button className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1">
                        Join <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">🏎️ Highway Patrol (FHP / CHP)</div>
                        <div className="text-[11px] text-slate-400">State Trooper Division • High Speed Intercept</div>
                      </div>
                      <button className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1">
                        Join <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="bg-[#1e1f22] p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">🕵️ Federal Bureau of Investigation (FBI)</div>
                        <div className="text-[11px] text-slate-400">Federal Whitelisted • Special Operations</div>
                      </div>
                      <button className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1">
                        Join <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161919_6c021a34.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== STAFF FEEDBACK ==================== */}
          {activeChannel === 'feedback' && (
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161910_80665326.png"
                  alt="Staff Feedback Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-3">
                  <h4 className="text-base font-bold text-white">Staff Feedback</h4>
                  <div className="text-xs sm:text-sm text-slate-200 space-y-2">
                    <div>🪪 <b>Staff Member:</b> <span className="text-blue-400 font-semibold">@Joekenz</span></div>
                    <div>👤 <b>Rated By:</b> <span className="text-blue-400 font-semibold">@Rasqay8</span></div>
                    <div className="flex items-center gap-1.5 text-amber-400">
                      📈 <b>Rating:</b>
                      <span className="font-bold">5/5</span>
                      <div className="flex text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
                    </div>
                    <div className="pt-1">
                      📌 <b>Comment:</b>
                      <p className="text-slate-300 italic mt-0.5">"He properly assessed my situation, gave me ALL the options to fix it and IMMEDIATELY did what he was supposed to. Amazing staff deserves to be promoted."</p>
                    </div>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161910_80665326.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== MARKETPLACE ==================== */}
          {activeChannel === 'marketplace' && (
            <div className="space-y-4">
              <div className="border-l-4 border-cyan-400 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_163232_052d4018.png"
                  alt="Marketplace Banner"
                  className="w-full max-h-40 object-cover"
                />

                <div className="p-6 space-y-4">
                  <h4 className="text-base font-bold text-white">Marketplace</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Explore our range of products at your own pace, when you find something that fits your needs. For a complete and organized overview of everything we offer, be sure to check the dropdown menu below. You can then open a support ticket through our dashboard to claim any purchases.
                  </p>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow">
                      Claim Purchase
                    </button>
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow">
                      🔢 View Queue
                    </button>
                  </div>
                </div>

                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_163232_052d4018.png"
                  alt="Bottom Strip"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== TRAINING (Screenshots 2 & 3 matching) ==================== */}
          {activeChannel === 'training' && (
            <div className="space-y-6">
              {/* Training State Controller Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e1f22] p-3.5 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    📇 Staff Training State:
                  </span>
                  <span className={`px-2 py-0.5 rounded font-bold font-mono ${
                    trainingMode === 'scheduled'
                      ? 'bg-blue-950 text-cyan-300 border border-cyan-500/30'
                      : 'bg-red-950 text-red-300 border border-red-500/30'
                  }`}>
                    {trainingMode === 'scheduled' ? 'Scheduled (Blue Start Button)' : 'Ended (Red End Button)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTrainingMode('scheduled')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      trainingMode === 'scheduled'
                        ? 'bg-[#5865f2] text-white shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    State: Scheduled (image_da6dd008.png)
                  </button>
                  <button
                    onClick={() => setTrainingMode('ended')}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      trainingMode === 'ended'
                        ? 'bg-[#da373c] text-white shadow'
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    State: Ended (image_a27bb8c8.png)
                  </button>
                </div>
              </div>

              {/* Bot Message Attribution */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">
                      {trainingMode === 'scheduled' ? '5:39 PM' : '6:35 PM'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Embed 1: Staff Training Announcement matching image_da6dd008.png and image_a27bb8c8.png */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl space-y-0">
                <div className="p-6 space-y-4">
                  {/* Header Title with 📇 Icon */}
                  <div className="flex items-center gap-2 text-white font-extrabold text-lg">
                    <span>📇</span> Staff Training
                  </div>

                  {/* Header Description based on Scheduled vs Ended */}
                  {trainingMode === 'scheduled' ? (
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      Greetings, <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Trainee</span>! A training session is being hosted. If you're a Trainee wishing to officially join the staff team, now is your chance.
                    </p>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      This training session has ended. Thank you to everyone who attended.
                    </p>
                  )}

                  {/* Quote Block: 7 Days Termination Warning */}
                  <div className="border-l-2 border-slate-500 pl-3 py-0.5 text-xs text-slate-300 leading-relaxed">
                    You must complete a training within <b>7 days</b> of becoming a Trainee, otherwise it will result in an immediate termination.
                  </div>

                  {/* How to Attend Section */}
                  <div className="text-xs sm:text-sm text-slate-200 space-y-1 pt-1">
                    <div className="font-bold text-white text-sm">How to attend</div>
                    <ol className="list-decimal list-inside space-y-0.5 text-slate-300 text-xs">
                      <li>Press <b>Join Game</b> below to load into the server</li>
                      <li>Go to the <b>Police Team briefing room</b> and wait for your trainer</li>
                      <li>Make sure you are wearing the <b>staff uniform</b></li>
                    </ol>
                  </div>

                  {/* Session Information Fields */}
                  <div className="text-xs text-slate-200 space-y-1.5 pt-1">
                    <div>
                      🛡️ <b>Trainer:</b>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                        {trainingMode === 'scheduled' ? '@NinjaAndy22' : '@Official_jayrii'}
                      </span>
                    </div>

                    {trainingMode === 'scheduled' ? (
                      <div>🕒 <b>Starts:</b> an hour ago ( 5:44 PM )</div>
                    ) : (
                      <div>🕒 <b>Started:</b> 15 minutes ago ( 6:50 PM )</div>
                    )}

                    <div>
                      📌 <b>Status:</b>{' '}
                      <span className={trainingMode === 'scheduled' ? 'text-slate-100 font-semibold' : 'text-slate-300 font-semibold'}>
                        {trainingMode === 'scheduled' ? 'Scheduled' : 'Ended'}
                      </span>
                    </div>

                    {trainingMode === 'ended' && (
                      <div>📅 <b>Ended:</b> 15 minutes ago after 1 minutes</div>
                    )}

                    <div>
                      👥 <b>Attending ({trainingAttendeesList.length}):</b>{' '}
                      {trainingAttendeesList.length === 0 ? (
                        <span className="text-slate-400">Nobody yet</span>
                      ) : (
                        <span className="flex flex-wrap gap-1 mt-1">
                          {trainingAttendeesList.map((user, idx) => (
                            <span key={idx} className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold text-xs">
                              {user}
                            </span>
                          ))}
                        </span>
                      )}
                    </div>

                    <div>
                      📁 <b>Notes:</b> {trainingMode === 'scheduled' ? 'Only an R/A!' : 'R/A'}
                    </div>
                  </div>

                  {/* Footer Notice */}
                  <div className="text-xs text-slate-400 pt-1">
                    {trainingMode === 'scheduled' ? (
                      <span>Press <b>Join Training</b> if you will be attending. Press it again to leave.</span>
                    ) : (
                      <span>This training has finished. Keep an eye out for the next one.</span>
                    )}
                  </div>

                  {/* Interactive Discord Buttons matching Screenshots */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {/* Button 1: Green Join Training (toggles attendee list dynamically) */}
                    <button
                      onClick={() => {
                        if (trainingMode === 'ended') return;
                        if (trainingJoined) {
                          setTrainingJoined(false);
                          setTrainingAttendeesList((prev) => prev.filter((u) => u !== '@Carlos'));
                        } else {
                          setTrainingJoined(true);
                          setTrainingAttendeesList((prev) => [...prev, '@Carlos']);
                        }
                      }}
                      disabled={trainingMode === 'ended'}
                      className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-1.5 shadow transition-all active:scale-95 ${
                        trainingMode === 'ended'
                          ? 'bg-[#248046] text-white/50 cursor-not-allowed opacity-60'
                          : trainingJoined
                          ? 'bg-[#1a6334] text-emerald-200 ring-2 ring-emerald-400'
                          : 'bg-[#248046] hover:bg-[#1a6334] text-white'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      {trainingJoined ? 'Leave Training' : 'Join Training'}
                    </button>

                    {/* Button 2: Blue Start Training (when Scheduled) OR Red End Training (when In-Progress / Ended) */}
                    {trainingMode === 'scheduled' ? (
                      <button
                        onClick={() => setTrainingMode('ended')}
                        className="px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                        title="Click to start / transition to End Training"
                      >
                        Start Training
                      </button>
                    ) : (
                      <button
                        onClick={() => setTrainingMode('scheduled')}
                        className="px-4 py-2 bg-[#da373c] hover:bg-[#b82e33] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                        title="Click to reset back to Scheduled"
                      >
                        End Training
                      </button>
                    )}

                    {/* Button 3: Dark Join Game Link Button */}
                    <button className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all">
                      🎮 Join Game <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Bottom Skyline Banner (image_da6dd008.png & image_a27bb8c8.png) */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="New York State Bottom Banner"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Embed 2: Training Log (Screenshot 2) */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-lg">
                    <span>🗂️</span> Training Log
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 space-y-1.5">
                    <div>
                      👤 <b>Trainee:</b>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@bugyJMALLO</span>{' '}
                      <span className="bg-[#1e1f22] text-slate-400 px-1 py-0.5 rounded font-mono text-xs">( christophermallo )</span>
                    </div>
                    <div>
                      🛡️ <b>Trainer:</b>{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@Aviator62284</span>{' '}
                      <span className="bg-[#1e1f22] text-slate-400 px-1 py-0.5 rounded font-mono text-xs">( georgiastateroleplay0141 )</span>
                    </div>
                    <div>
                      ✓ <b>Result:</b> <span className="font-semibold text-slate-100">Passed</span>
                    </div>
                    <div>
                      📅 <b>Date:</b> <span className="bg-[#1e1f22] px-1.5 py-0.5 rounded text-slate-300">November 2, 2026 at 1:54 PM</span>
                    </div>
                    <div className="pt-1">
                      📌 <b>Notes</b>
                      <div className="border-l-2 border-slate-500 pl-3 mt-1 text-xs text-slate-400">
                        None given
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Skyline Banner */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Banner"
                  className="w-full h-8 object-cover"
                />
              </div>
            </div>
          )}

          {/* ==================== SERVER STATISTICS (Screenshot 4 matching) ==================== */}
          {activeChannel === 'stats' && (
            <div className="space-y-4">
              <div className="bg-[#2b2d31] border border-slate-800 rounded-2xl p-6 max-w-sm shadow-2xl space-y-4 font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-700/80 flex items-center justify-center text-lg text-white font-bold shadow-md">
                    FL
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">Florida Systems</span>
                      <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> APP
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">10/28/26, 8:41 PM</div>
                  </div>
                </div>

                <div className="border border-slate-700 bg-[#2f3136] rounded-xl p-5 space-y-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-white font-extrabold text-base">
                      <span>👥</span> Server Statistics
                    </div>
                    <div className="text-xs text-slate-400">Florida State Roleplay</div>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-slate-200 font-bold mb-1.5 flex items-center gap-1">
                        <span>›</span> Members
                      </div>
                      <div className="bg-[#202225] border border-slate-800 rounded-lg p-2.5 font-bold text-white text-sm tracking-widest text-center shadow-inner">
                        19 , 800
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-200 font-bold mb-1.5 flex items-center gap-1">
                        <span>›</span> Online
                      </div>
                      <div className="bg-[#202225] border border-slate-800 rounded-lg p-2.5 font-bold text-white text-sm tracking-widest text-center shadow-inner">
                        1 , 703
                      </div>
                    </div>

                    <div>
                      <div className="text-slate-200 font-bold mb-1.5 flex items-center gap-1">
                        <span>›</span> Boosts
                      </div>
                      <div className="bg-[#202225] border border-slate-800 rounded-lg p-2.5 font-bold text-white text-sm tracking-widest text-center shadow-inner">
                        36
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-700/60 flex items-center gap-1.5">
                    <span>Requested by</span>
                    <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 py-0.5 rounded font-medium">@Ypjl44</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== VERIFICATION SYSTEM (Bloxlink Server API v4 & Roblox Avatar Headshots) ==================== */}
          {activeChannel === 'verify' && (
            <div className="space-y-6">
              {/* Bloxlink Server API v4 Banner Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#1e1f22] p-4 rounded-xl border border-cyan-500/30">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white">
                      Bloxlink Server API v4 &amp; Roblox Avatar Integration
                    </h4>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      API v4 Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Command: <span className="font-mono text-cyan-400 font-bold bg-[#141517] px-1.5 py-0.5 rounded border border-cyan-500/30">!verify</span>{' '}
                    <span className="text-amber-400 font-semibold">• Strictly Prefix-Only (No slash command registered per specification)</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setVerificationStatus('prompt');
                    }}
                    className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs shadow flex items-center gap-1 active:scale-95"
                  >
                    Run !verify
                  </button>
                  <button
                    onClick={() => {
                      setVerificationStatus('unverified');
                      setVerifyLogs((prev) => [
                        '⚠️ [UNVERIFY] Member unlinked from Bloxlink. Nickname reset, @Verified role removed.',
                        ...prev
                      ]);
                    }}
                    className="px-3 py-1.5 bg-red-600/30 hover:bg-red-600/40 text-red-300 border border-red-500/40 font-semibold rounded-lg text-xs flex items-center gap-1 active:scale-95"
                  >
                    Test !unverify
                  </button>
                </div>
              </div>

              {/* Interactive Bloxlink Server API v4 Endpoints Explorer */}
              <div className="bg-[#2b2d31] border border-slate-700 rounded-xl p-5 max-w-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs sm:text-sm font-bold text-white">Bloxlink Server API v4 Endpoints Explorer</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">Server ID: 789699000047370261</span>
                </div>

                {/* API Method Selector Tabs */}
                <div className="flex gap-1.5 bg-[#1e1f22] p-1.5 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setBloxlinkActiveTab('discord-to-roblox')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-mono font-bold text-[11px] transition-all ${
                      bloxlinkActiveTab === 'discord-to-roblox'
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    GET discord-to-roblox
                  </button>
                  <button
                    onClick={() => setBloxlinkActiveTab('roblox-to-discord')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-mono font-bold text-[11px] transition-all ${
                      bloxlinkActiveTab === 'roblox-to-discord'
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    GET roblox-to-discord
                  </button>
                  <button
                    onClick={() => setBloxlinkActiveTab('update-user')}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-mono font-bold text-[11px] transition-all ${
                      bloxlinkActiveTab === 'update-user'
                        ? 'bg-cyan-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    POST update-user
                  </button>
                </div>

                {/* Tab 1: GET discord-to-roblox */}
                {bloxlinkActiveTab === 'discord-to-roblox' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300">
                      Perform a lookup for the Discord user and resolve their Roblox ID in your Discord server:
                    </div>
                    <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                      <span>GET https://api.blox.link/v4/public/guilds/789699000047370261/discord-to-roblox/214858075650260992</span>
                      <span className="text-emerald-400 font-bold">200 OK</span>
                    </div>
                    <div className="bg-[#141517] p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300">
                      <div className="text-slate-500">// Headers: &#123; "Authorization": "blx_live_948f2190bb" &#125;</div>
                      <div className="text-emerald-400">&#123;</div>
                      <div className="pl-4 text-slate-200">"robloxID": <span className="text-cyan-300">"146941966"</span></div>
                      <div className="text-emerald-400">&#125;</div>
                    </div>
                  </div>
                )}

                {/* Tab 2: GET roblox-to-discord */}
                {bloxlinkActiveTab === 'roblox-to-discord' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300">
                      Performs a reverse lookup in your Discord server for the Roblox user and resolves the linked Discord ID(s):
                    </div>
                    <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                      <span>GET https://api.blox.link/v4/public/guilds/789699000047370261/roblox-to-discord/146941966</span>
                      <span className="text-emerald-400 font-bold">200 OK</span>
                    </div>
                    <div className="bg-[#141517] p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300">
                      <div className="text-slate-500">// Headers: &#123; "Authorization": "blx_live_948f2190bb" &#125;</div>
                      <div className="text-emerald-400">&#123;</div>
                      <div className="pl-4 text-slate-200">"discordIDs": [<span className="text-cyan-300">"214858075650260992"</span>]</div>
                      <div className="text-emerald-400">&#125;</div>
                    </div>
                  </div>
                )}

                {/* Tab 3: POST update-user */}
                {bloxlinkActiveTab === 'update-user' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300">
                      Programmatically update a Discord user (assigns roles, syncs server nickname). Equivalent to running verify in server:
                    </div>
                    <div className="bg-[#1e1f22] p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 flex items-center justify-between">
                      <span>POST https://api.blox.link/v4/public/guilds/789699000047370261/update-user/214858075650260992</span>
                      <span className="text-emerald-400 font-bold">200 OK</span>
                    </div>
                    <div className="bg-[#141517] p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] text-slate-300">
                      <div className="text-slate-500">// Method: POST | Headers: &#123; "Authorization": "key" &#125;</div>
                      <div className="text-emerald-400">&#123;</div>
                      <div className="pl-4 text-slate-200">"addedRoles": [<span className="text-emerald-300">"1140027663457816657"</span>, <span className="text-emerald-300">"1140027663457816658"</span>],</div>
                      <div className="pl-4 text-slate-200">"removedRoles": [<span className="text-red-300">"1140027663457816656"</span>],</div>
                      <div className="pl-4 text-slate-200">"nickname": <span className="text-cyan-300">"Carlos123 | Carlos"</span></div>
                      <div className="text-emerald-400">&#125;</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bot Interaction: Prompting for Username */}
              {verificationStatus === 'prompt' && (
                <div className="bg-[#2b2d31] border border-cyan-500/40 rounded-xl p-5 max-w-xl shadow-xl space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white">
                      🤖
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">Los Angeles RP Verification</span>
                        <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                      </div>
                      <div className="text-xs text-slate-400">Waiting for user input via prefix !verify</div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 bg-[#1e1f22] p-4 rounded-xl border border-slate-800">
                    "Please enter your Roblox username below to begin Bloxlink Server API v4 verification."
                  </div>

                  {/* Input form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={robloxInput}
                      onChange={(e) => setRobloxInput(e.target.value)}
                      placeholder="e.g. Carlos123"
                      className="flex-1 bg-[#1e1f22] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => {
                        setVerificationStatus('verifying');
                        setTimeout(() => {
                          if (robloxInput.toLowerCase().includes('invalid')) {
                            setVerificationStatus('error');
                          } else {
                            setVerificationStatus('verified');
                            setVerifiedRobloxUser({
                              username: robloxInput,
                              displayName: `${robloxInput} [Citizen]`,
                              userId: '146941966',
                              discordTag: '@Carlos',
                              discordId: '214858075650260992',
                              serverNickname: `${robloxInput} | Carlos`,
                              verifiedAt: 'November 2, 2026',
                              role: 'Verified',
                              avatarHeadshot: 'https://images.rbxcdn.com/f04c6e4e0ea90396160533c3938ab15b.png'
                            });
                            setVerifyLogs((prev) => [
                              `🌐 [BLOXLINK v4] GET /discord-to-roblox/214858075650260992 -> 200 { robloxID: "146941966" }`,
                              `🖼️ [AVATAR] Resolved Roblox circular headshot for ${robloxInput}.`,
                              `📝 [NICKNAME] Changed server nickname to "${robloxInput} | Carlos".`,
                              `🛡️ [ROLES] Added @Verified, Removed @Unverified via Bloxlink update-user.`,
                              ...prev,
                            ]);
                          }
                        }, 1200);
                      }}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit !verify
                    </button>
                  </div>
                </div>
              )}

              {/* Loading / Verifying indicator */}
              {verificationStatus === 'verifying' && (
                <div className="bg-[#2b2d31] border border-slate-800 rounded-xl p-5 max-w-xl text-xs text-slate-300 flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
                  <div>
                    <div className="font-bold text-white">Querying Bloxlink Server API v4 &amp; Roblox Thumbnails API...</div>
                    <div className="text-slate-400 text-[11px]">GET https://api.blox.link/v4/public/guilds/789699000047370261/discord-to-roblox/214858075650260992</div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {verificationStatus === 'error' && (
                <div className="bg-red-950/40 border border-red-500/50 rounded-xl p-5 max-w-xl text-xs space-y-2">
                  <div className="text-red-400 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Account Not Found on Bloxlink / Roblox
                  </div>
                  <p className="text-slate-300">
                    The username <b>"{robloxInput}"</b> was not found in Bloxlink Server API v4 or does not exist on Roblox. Please check spelling.
                  </p>
                  <button
                    onClick={() => setVerificationStatus('prompt')}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-xs"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Verification Complete Embed with Roblox Avatar Headshot */}
              {verificationStatus === 'verified' && (
                <div className="border-l-4 border-emerald-500 bg-[#2b2d31] rounded-r-xl overflow-hidden max-w-2xl shadow-xl space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-base tracking-wide">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      LOS ANGELES ROLEPLAY — VERIFICATION COMPLETE
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                      Bloxlink v4 Verified
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Your Roblox account has been successfully linked to your Discord account via <b>Bloxlink Server API v4</b>.
                  </p>

                  <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                    {/* User profile & avatar headshot row */}
                    <div className="flex items-center gap-4 pb-2 border-b border-slate-800">
                      <img
                        src={verifiedRobloxUser.avatarHeadshot || 'https://images.rbxcdn.com/f04c6e4e0ea90396160533c3938ab15b.png'}
                        alt="Roblox Avatar Profile"
                        className="w-16 h-16 rounded-full border-2 border-emerald-400/60 shadow bg-[#141517] object-cover"
                      />
                      <div className="space-y-0.5">
                        <div className="text-white font-extrabold text-sm">{verifiedRobloxUser.username}</div>
                        <div className="text-cyan-400 font-mono text-xs">Roblox ID: {verifiedRobloxUser.userId}</div>
                        <a
                          href={`https://www.roblox.com/users/${verifiedRobloxUser.userId}/profile`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                        >
                          View Official Roblox Profile <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Discord Account:</span>
                      <span className="text-blue-400 font-semibold">{verifiedRobloxUser.discordTag} ({verifiedRobloxUser.discordId})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Server Nickname:</span>
                      <span className="text-emerald-300 font-mono font-semibold">{verifiedRobloxUser.serverNickname}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Assigned Roles:</span>
                      <span className="text-cyan-300 font-mono font-medium">@Verified (1140027663457816657)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30">Verified</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">
                    Your server role has been updated, and your Discord nickname has been changed.<br />
                    Thank you for verifying with <b>Los Angeles Roleplay</b>.
                  </p>

                  {/* Staff Audit Tools */}
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => alert(`[VERIFYINFO]\nDiscord: @Carlos (214858075650260992)\nRoblox: ${verifiedRobloxUser.username} (${verifiedRobloxUser.userId})\nNickname: ${verifiedRobloxUser.serverNickname}\nStatus: Verified via Bloxlink v4\nTickets: Synced with #0014`)}
                      className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded font-medium flex items-center gap-1"
                    >
                      !verifyinfo @Carlos
                    </button>
                    <button
                      onClick={() => alert(`[VERIFYLOOKUP]\nBloxlink v4 reverse lookup:\nGET /roblox-to-discord/${verifiedRobloxUser.userId} -> Found Discord ID 214858075650260992 (@Carlos)`)}
                      className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded font-medium flex items-center gap-1"
                    >
                      !verifylookup {verifiedRobloxUser.username}
                    </button>
                    <button
                      onClick={() => {
                        setVerifyLogs((p) => [
                          `🔄 [REFRESH] Re-synced Bloxlink v4 update-user & Roblox headshot for ${verifiedRobloxUser.username}.`,
                          ...p
                        ]);
                        alert(`Refreshed Bloxlink v4 nickname and Roblox avatar thumbnail!`);
                      }}
                      className="px-3 py-1.5 bg-[#4e5058] hover:bg-[#6d6f78] text-white rounded font-medium flex items-center gap-1"
                    >
                      !verifyrefresh @Carlos
                    </button>
                  </div>
                </div>
              )}

              {/* Live Database Audit Stream */}
              <div className="bg-[#1e1f22] border border-slate-800 rounded-xl p-4 max-w-2xl shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    SQLite &amp; Bloxlink v4 Verification Audit Log (Table: roblox_verifications)
                  </span>
                  <span className="text-emerald-400 text-[11px]">Synced with Tickets &amp; Headshots</span>
                </div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  {verifyLogs.map((log, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-1.5 rounded border border-slate-800/80">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== WELCOME ONBOARDING (image_5d8d56f1.png) ==================== */}
          {activeChannel === 'welcome' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">5:16 PM</span>
                  </div>
                </div>
              </div>

              {/* Exact Message Layout matching image_5d8d56f1.png */}
              <div className="space-y-3 max-w-2xl bg-[#2b2d31] p-5 rounded-2xl border border-slate-800 shadow-xl">
                <div className="text-sm text-slate-200 leading-relaxed">
                  👋 <span className="text-slate-400">[ - ]</span> Welcome <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@all7srule</span> to <b>New York City Roleplay</b>! You are our <b>19,794th</b> member, we hope you enjoy your stay!
                </div>
                <div className="text-xs text-slate-300">
                  Ensure to verify to stop in-game Private Messages.
                </div>

                {/* Buttons Row matching image_5d8d56f1.png */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveChannel('verify')}
                    className="px-4 py-2 bg-[#4e5058] hover:bg-[#6d6f78] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow active:scale-95 transition-all"
                  >
                    Verify <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled
                    className="px-4 py-2 bg-[#2b2d31] border border-slate-700 text-slate-400 text-xs font-mono font-bold rounded cursor-default"
                  >
                    19,794
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== REPPING SERVER TAG (image_64819c0e.png) ==================== */}
          {activeChannel === 'repping' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                  NY
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">New York Automation</span>
                    <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                    <span className="text-xs text-slate-400">5:02 PM</span>
                  </div>
                </div>
              </div>

              {/* Exact Repping Us Embed matching image_64819c0e.png */}
              <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl overflow-hidden max-w-2xl shadow-xl">
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-base">
                    🏙️ Thank You for Repping Us!
                  </div>
                  <div className="border-l-2 border-slate-500 pl-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Thank you <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">@him229456</span> for equipping our <b>NYC</b> server tag! Showing it off helps more people find <b>New York City Roleplay</b>.
                  </div>
                </div>

                {/* Bottom Skyline Strip */}
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_161745_922a4d67.png"
                  alt="Bottom Skyline Strip"
                  className="w-full h-8 object-cover"
                />
              </div>

              {/* Booster Perks Banner */}
              <div className="bg-gradient-to-r from-purple-950/40 via-[#2b2d31] to-slate-900 border border-purple-500/30 rounded-xl p-4 max-w-2xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                  💎 Server Booster Verification Perks
                </div>
                <p className="text-slate-300">
                  When a verified member boosts the Discord server, the bot detects their boost and automatically unlocks custom in-game priority queue, exclusive vehicle skin, and chat colors in ER:LC.
                </p>
              </div>
            </div>
          )}

          {/* ==================== ANTI-PING AUTO-MODERATION (Strikes 1, 2, 3 + Automated 24h Mute + User DM) ==================== */}
          {activeChannel === 'antiping' && (
            <div className="space-y-5">
              {/* Controls bar */}
              <div className="bg-[#1e1f22] p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <h4 className="text-sm font-bold text-white">
                        Progressive Anti-Ping Auto-Moderation (Foundership &amp; Director)
                      </h4>
                      <span className="bg-red-950 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30">
                        Auto-Mute on Strike 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tracks pings to leadership roles. Strikes 1 &amp; 2 issue 7-second auto-disappearing warnings + DMs. Strike 3 executes an automatic 24-hour timeout (mute) + DM with reason.
                    </p>
                  </div>

                  {/* Target role selector */}
                  <div className="flex items-center gap-1.5 bg-[#141517] p-1 rounded-lg border border-slate-800 text-xs shrink-0">
                    <span className="text-[11px] text-slate-400 px-1 font-semibold">Protected Role:</span>
                    <button
                      onClick={() => setAntiPingTargetRole('Foundation Team')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        antiPingTargetRole === 'Foundation Team'
                          ? 'bg-[#5865f2] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      @Foundation Team
                    </button>
                    <button
                      onClick={() => setAntiPingTargetRole('Directive Team')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                        antiPingTargetRole === 'Directive Team'
                          ? 'bg-[#5865f2] text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      @Directive Team
                    </button>
                  </div>
                </div>

                {/* Strike test trigger buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Strike 1 Button */}
                    <button
                      onClick={() => triggerAntiPingTest(1)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs shadow flex items-center gap-1.5 active:scale-95 transition-all ${
                        antiPingStrikeCount === 1
                          ? 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-400/50'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <span>1️⃣</span> Strike 1 (Warning + 7s Disappear + DM)
                    </button>

                    {/* Strike 2 Button */}
                    <button
                      onClick={() => triggerAntiPingTest(2)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs shadow flex items-center gap-1.5 active:scale-95 transition-all ${
                        antiPingStrikeCount === 2
                          ? 'bg-orange-500 text-white font-bold ring-2 ring-orange-400/50'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      <span>2️⃣</span> Strike 2 (Escalated Warning + DM)
                    </button>

                    {/* Strike 3 Button (Mute) */}
                    <button
                      onClick={() => triggerAntiPingTest(3)}
                      className={`px-3.5 py-1.5 rounded-lg font-bold text-xs shadow flex items-center gap-1.5 active:scale-95 transition-all ${
                        antiPingStrikeCount >= 3
                          ? 'bg-red-600 text-white ring-2 ring-red-400/60 animate-pulse'
                          : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-red-900/40'
                      }`}
                    >
                      <span className="text-sm">🚫</span> Strike 3 (Automatic 24h Mute)
                    </button>

                    {/* Reset Button */}
                    <button
                      onClick={() => {
                        setAntiPingStrikeCount(0);
                        setAntiPingVisible(false);
                      }}
                      className="px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg text-xs"
                      title="Clear strikes back to 0"
                    >
                      Reset Strikes (0/3)
                    </button>
                  </div>

                  {/* View User DM Button */}
                  <button
                    onClick={() => setShowAntiPingDmModal(true)}
                    className="px-3 py-1.5 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold rounded-lg text-xs shadow flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>View User DM (Received by @{antiPingOffender})</span>
                    <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded font-mono">
                      {antiPingStrikeCount}/3
                    </span>
                  </button>
                </div>
              </div>

              {/* Chat Message Flow matching image_ef8c4d94.png & Screenshot_2026-11-02_190916_9a4269be.png */}
              <div className="space-y-4">
                {/* 1. Offending user message in channel */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg shrink-0 overflow-hidden shadow">
                    👤
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200 text-sm hover:underline cursor-pointer">
                        {antiPingOffender}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded font-mono">❖ NYC</span>
                      <span className="text-xs text-slate-400">
                        {antiPingStrikeCount >= 3 ? '6:48 PM' : '5:07 PM'}
                      </span>
                    </div>
                    <div className="text-sm text-slate-200 mt-0.5">
                      {antiPingStrikeCount >= 3 ? 'Hi' : 'sup'}{' '}
                      <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1 rounded font-medium">
                        @{antiPingTargetRole}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Bot Response in channel */}
                {antiPingVisible ? (
                  <div className="ml-6 pl-4 border-l-2 border-slate-700 space-y-3 transition-opacity duration-300">
                    {/* Reply attribution */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="text-slate-500">↳</span>
                      <span className="font-semibold text-slate-300">
                        {antiPingOffender}:
                      </span>
                      <span className="italic">{antiPingStrikeCount >= 3 ? '"Hi"' : '"sup"'}</span>
                    </div>

                    {/* Bot header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
                        NY
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">New York Automation</span>
                          <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                          <span className="text-xs text-slate-400">
                            {antiPingStrikeCount >= 3 ? '6:48 PM' : '5:07 PM'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* The Embed: Strike 1/2 Warning VS Strike 3 24h Mute */}
                    {antiPingStrikeCount >= 3 ? (
                      /* Exact Embed from Screenshot_2026-11-02_190916_9a4269be.png */
                      <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl p-5 max-w-xl shadow-2xl space-y-3">
                        <div className="flex items-center gap-2 text-white font-black text-base">
                          <span className="text-red-400">🚫</span> Muted for 24 Hours
                        </div>

                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                            @{antiPingOffender}
                          </span>
                          , you've pinged the <b>{antiPingTargetRole}</b> 3/3 times within 1 day, so you've been muted for 24 hours.
                        </div>

                        <div className="border-l-2 border-slate-500 pl-3 text-xs text-slate-300">
                          If you're replying to one of them, turn the ping off first. The GIF below shows you how.
                        </div>

                        {/* Animated GIF demonstration container */}
                        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#1e1f22]">
                          <img
                            src="/assets/aistudio/image_ef8c4d94.png"
                            alt="Anti Ping Tutorial GIF"
                            className="w-full max-h-60 object-contain bg-black/40"
                          />
                        </div>

                        {/* Mute Active Badge */}
                        <div className="bg-red-950/60 border border-red-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-red-300 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                            <span>TIMEOUT ACTIVE: 24 Hours (1,440 minutes)</span>
                          </div>
                          <span className="text-[11px] text-red-400 font-mono">GuildMember.timeout()</span>
                        </div>
                      </div>
                    ) : (
                      /* Warning Embed with Auto-Disappear (image_ef8c4d94.png) */
                      <div className="border border-slate-700 bg-[#2b2d31] rounded-2xl p-5 max-w-xl shadow-2xl space-y-3">
                        <div className="flex items-center gap-2 text-white font-black text-base">
                          <AlertTriangle className={`w-5 h-5 ${antiPingStrikeCount === 2 ? 'text-orange-400' : 'text-amber-400'}`} />
                          {antiPingStrikeCount === 2 ? "Please Don't Ping (Second Warning)" : "Please Don't Ping"}
                        </div>

                        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <span className="bg-[#5865f2]/20 text-[#c9cdfb] px-1.5 py-0.5 rounded font-semibold">
                            @{antiPingOffender}
                          </span>
                          , you can't ping members of the <b>Foundation Team</b> or <b>Directive Team</b>.
                          {antiPingStrikeCount === 2 && (
                            <span className="block mt-1 text-orange-300 font-semibold">
                              ⚠️ Warning {antiPingStrikeCount}/3: One more ping within 24 hours will automatically mute you for 24 hours!
                            </span>
                          )}
                        </div>

                        <div className="border-l-2 border-slate-500 pl-3 text-xs text-slate-300">
                          If you're replying to one of them, turn the ping off first. The GIF below shows you how.
                        </div>

                        {/* Animated GIF demonstration container */}
                        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#1e1f22]">
                          <img
                            src="/assets/aistudio/image_ef8c4d94.png"
                            alt="Anti Ping Tutorial GIF"
                            className="w-full max-h-60 object-contain bg-black/40"
                          />
                        </div>
                      </div>
                    )}

                    {/* Live Disappearing Countdown Bar (for strike 1/2) */}
                    {antiPingStrikeCount < 3 && (
                      <div className="max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-amber-400 font-semibold">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          ⏱️ Auto-Disappearing in {antiPingCountdown} seconds...
                        </div>
                        <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-400 h-full transition-all duration-1000"
                            style={{ width: `${(antiPingCountdown / 7) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Automated Direct Message (DM) Notification Toast */}
                    <div className="max-w-xl bg-[#1e1f22] border border-cyan-500/30 rounded-xl p-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <span className="text-cyan-400 font-bold">✉️ User DM Dispatched:</span>
                        <span className="text-slate-300">
                          {antiPingStrikeCount >= 3
                            ? 'Delivered automated 24h Mute Notice DM with reason.'
                            : `Delivered Strike ${antiPingStrikeCount}/3 Warning DM to @${antiPingOffender}.`}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowAntiPingDmModal(true)}
                        className="text-cyan-400 hover:text-cyan-300 underline font-semibold text-[11px] shrink-0 ml-2"
                      >
                        Inspect DM
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ml-6 pl-4 border-l-2 border-slate-800 py-3 text-xs text-slate-400 flex items-center gap-2 italic">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>The warning embed and GIF auto-deleted after 7 seconds to keep chat pristine!</span>
                    <button
                      onClick={() => triggerAntiPingTest(antiPingStrikeCount || 1)}
                      className="ml-2 text-cyan-400 hover:underline not-italic font-semibold"
                    >
                      Trigger Again
                    </button>
                  </div>
                )}
              </div>

              {/* SQLite Audit Log Table (antiping_strikes) */}
              <div className="bg-[#1e1f22] border border-slate-800 rounded-xl p-4 max-w-2xl shadow-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SQLite Strike Tracking Table: <code className="text-cyan-300 font-mono">antiping_strikes</code></span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">Sliding Window: 24 Hours</span>
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  {antiPingDbLogs.map((log) => (
                    <div
                      key={log.id}
                      className="bg-slate-900/70 p-2 rounded border border-slate-800 flex flex-wrap items-center justify-between gap-1 text-slate-300"
                    >
                      <div>
                        <span className="text-cyan-400 font-bold">@{log.user}</span>
                        <span className="text-slate-400"> → </span>
                        <span className="text-purple-300">@{log.role}</span>
                        <span className="text-slate-500"> • </span>
                        <span className={`font-bold ${log.strikes >= 3 ? 'text-red-400' : log.strikes === 2 ? 'text-orange-400' : 'text-amber-400'}`}>
                          Strikes: {log.strikes}/3
                        </span>
                        <span className="text-slate-500"> • </span>
                        <span>{log.action}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        {log.dmStatus}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Message (DM) Modal Preview */}
              {showAntiPingDmModal && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                  <div className="bg-[#2b2d31] border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl space-y-4">
                    {/* Header */}
                    <div className="bg-[#1e1f22] p-4 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                        <h3 className="text-sm font-bold text-white">
                          Direct Message Received by @{antiPingOffender}
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowAntiPingDmModal(false)}
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 space-y-4">
                      {/* Bot sender banner in DM */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shadow">
                          NY
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">New York Automation</span>
                            <span className="bg-[#5865f2] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">APP</span>
                            <span className="text-xs text-slate-400">Direct Message</span>
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Sent to your private inbox via bot automated moderation
                          </div>
                        </div>
                      </div>

                      {/* Embed in DM */}
                      {antiPingStrikeCount >= 3 ? (
                        /* Strike 3 DM (Mute with Reason) */
                        <div className="border-l-4 border-red-500 bg-[#1e1f22] rounded-r-xl p-4 space-y-3 shadow">
                          <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <span className="text-red-400">🚫</span> You have been muted for 24 hours
                          </div>
                          <div className="text-xs text-slate-200 space-y-1.5 leading-relaxed">
                            <p>
                              You have been automatically muted in <b>Los Angeles / New York City Roleplay</b>.
                            </p>
                            <div className="bg-[#2b2d31] p-2.5 rounded-lg border border-slate-800 space-y-1">
                              <div><b>Reason:</b> Pinging {antiPingTargetRole} 3/3 times within 1 day.</div>
                              <div><b>Duration:</b> 24 Hours (1,440 minutes)</div>
                              <div><b>Action Taken By:</b> Automation (Auto-Moderation)</div>
                            </div>
                            <p className="text-slate-300 pt-1">
                              When replying to leadership members, you must toggle the "Reply Mention" switch to <b>OFF</b>.
                            </p>
                            <p className="text-[11px] text-slate-400">
                              If you believe this was an error, you may open an appeal ticket once your timeout concludes in #support.
                            </p>
                          </div>
                          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                            Los Angeles Roleplay Moderation • Today at 6:48 PM
                          </div>
                        </div>
                      ) : antiPingStrikeCount === 2 ? (
                        /* Strike 2 DM (Final Warning) */
                        <div className="border-l-4 border-orange-500 bg-[#1e1f22] rounded-r-xl p-4 space-y-3 shadow">
                          <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <AlertTriangle className="w-4 h-4 text-orange-400" />
                            Final Warning: Pinging Leadership (Strike 2/3)
                          </div>
                          <div className="text-xs text-slate-200 space-y-1.5 leading-relaxed">
                            <p>
                              You received your <b>second warning</b> in <b>Los Angeles / New York City Roleplay</b>.
                            </p>
                            <div className="bg-[#2b2d31] p-2.5 rounded-lg border border-slate-800 space-y-1">
                              <div><b>Reason:</b> Pinging {antiPingTargetRole} (Strike 2/3)</div>
                              <div><b>Threshold:</b> 3 pings within 24 hours</div>
                            </div>
                            <div className="bg-orange-950/40 border border-orange-500/30 p-2 rounded text-orange-300 font-semibold text-xs">
                              🚨 <b>NOTICE:</b> Your next ping to Foundation or Directive Team within 24 hours will result in an immediate <b>24-Hour Timeout (Mute)</b>!
                            </div>
                          </div>
                          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                            Los Angeles Roleplay Auto-Moderation • Today at 6:45 PM
                          </div>
                        </div>
                      ) : (
                        /* Strike 1 DM (First Warning) */
                        <div className="border-l-4 border-amber-500 bg-[#1e1f22] rounded-r-xl p-4 space-y-3 shadow">
                          <div className="flex items-center gap-2 text-white font-bold text-sm">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            Warning: Pinging Leadership (Strike 1/3)
                          </div>
                          <div className="text-xs text-slate-200 space-y-1.5 leading-relaxed">
                            <p>
                              You received a warning in <b>Los Angeles / New York City Roleplay</b>.
                            </p>
                            <div className="bg-[#2b2d31] p-2.5 rounded-lg border border-slate-800 space-y-1">
                              <div><b>Reason:</b> Pinging {antiPingTargetRole} (Strike 1/3)</div>
                              <div><b>Strikes:</b> 1/3 strikes within 24 hours</div>
                            </div>
                            <p className="text-slate-300">
                              Please ensure reply pings are turned <b>OFF</b> before responding to leadership. Reaching 3 strikes within 24 hours results in an automatic 24-hour mute.
                            </p>
                          </div>
                          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                            Los Angeles Roleplay Auto-Moderation • Today at 6:42 PM
                          </div>
                        </div>
                      )}

                      {/* Modal Footer */}
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => setShowAntiPingDmModal(false)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg shadow"
                        >
                          Close DM Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
