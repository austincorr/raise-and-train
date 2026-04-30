import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, Flame, Trophy, Users, Clock, Zap, ChevronRight, ChevronLeft, Plus, Minus, 
  Play, Target, TrendingUp, Award, Send, Sparkles, Timer, Utensils, Home, Dumbbell, 
  Salad, Medal, Bell, X, Check, ArrowRight, Calendar, CalendarDays, Heart, BookOpen,
  Brain, HeartHandshake, Sun, Moon, Phone, PhoneOff, Coffee, Smile, MessageCircle,
  Lightbulb, Feather, Compass, Star, Quote, PenLine, Headphones, BookMarked
} from 'lucide-react';

/* ============ PILLAR THEME COLORS ============ */
const PILLARS = {
  physical: { color: '#dcfc1f', glow: 'rgba(220,252,31,0.15)', label: 'PHYSICAL', icon: Dumbbell },
  spiritual: { color: '#c4a8ff', glow: 'rgba(196,168,255,0.15)', label: 'SPIRITUAL', icon: Feather },
  mental:    { color: '#60a5fa', glow: 'rgba(96,165,250,0.15)', label: 'MENTAL', icon: Brain },
  social:    { color: '#fb923c', glow: 'rgba(251,146,60,0.15)', label: 'SOCIAL', icon: HeartHandshake }
};

export default function WholeApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeData, setNudgeData] = useState(null);
  
  // Workout state
  const [workoutMinutes, setWorkoutMinutes] = useState(20);
  const [trainingGoal, setTrainingGoal] = useState('general');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  
  // AI Coach state
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: "Morning, Sarah. You've got physical & spiritual checked off already. Want to knock out 10 min of reading next, or tackle that text to your sister?" }
  ]);
  const [aiInput, setAiInput] = useState('');
  
  // Pillar scores (today + weekly totals)
  const [scores, setScores] = useState({
    physical: { today: 65, weekly: 487 },
    spiritual: { today: 80, weekly: 412 },
    mental: { today: 30, weekly: 298 },
    social: { today: 20, weekly: 215 }
  });
  const [streak, setStreak] = useState(12);

  const totalToday = Math.round((scores.physical.today + scores.spiritual.today + scores.mental.today + scores.social.today) / 4);
  const totalWeekly = scores.physical.weekly + scores.spiritual.weekly + scores.mental.weekly + scores.social.weekly;

  // Rotating nudge system across all 4 pillars
  useEffect(() => {
    const allNudges = [
      // Physical
      { pillar: 'physical', icon: '🚶', title: "Been sitting a while", action: "Take a 2-min walk", points: 15 },
      { pillar: 'physical', icon: '🦵', title: "Desk break", action: "10 quick squats", points: 20 },
      { pillar: 'physical', icon: '💧', title: "Hydration check", action: "Drink a full glass", points: 5 },
      // Spiritual
      { pillar: 'spiritual', icon: '🙏', title: "Pause for prayer", action: "60 seconds of gratitude", points: 15 },
      { pillar: 'spiritual', icon: '📖', title: "Scripture moment", action: "Read one verse", points: 20 },
      { pillar: 'spiritual', icon: '🧘', title: "Quiet your mind", action: "5 deep breaths", points: 10 },
      // Mental
      { pillar: 'mental', icon: '📚', title: "Feed your brain", action: "Read 1 page", points: 15 },
      { pillar: 'mental', icon: '💡', title: "Learn something", action: "Watch a 5-min lesson", points: 20 },
      { pillar: 'mental', icon: '✍️', title: "Journal moment", action: "Write 3 sentences", points: 15 },
      // Social
      { pillar: 'social', icon: '📵', title: "Phone down time", action: "Be present for 10 min", points: 20 },
      { pillar: 'social', icon: '💬', title: "Reach out", action: "Text someone you love", points: 15 },
      { pillar: 'social', icon: '☕', title: "Real connection", action: "Compliment a stranger", points: 25 }
    ];
    const timer = setTimeout(() => {
      setNudgeData(allNudges[Math.floor(Math.random() * allNudges.length)]);
      setShowNudge(true);
    }, 9000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const completeNudge = () => {
    if (!nudgeData) return;
    setScores(prev => ({
      ...prev,
      [nudgeData.pillar]: {
        today: Math.min(100, prev[nudgeData.pillar].today + Math.round(nudgeData.points / 2)),
        weekly: prev[nudgeData.pillar].weekly + nudgeData.points
      }
    }));
    setShowNudge(false);
  };

  const updatePillar = (pillar, points) => {
    setScores(prev => ({
      ...prev,
      [pillar]: {
        today: Math.min(100, prev[pillar].today + Math.round(points / 3)),
        weekly: prev[pillar].weekly + points
      }
    }));
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", minHeight: '100vh', background: '#0a0a0a', color: '#fafafa', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Fraunces:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .display-font { font-family: 'Archivo Black', sans-serif; letter-spacing: -0.02em; }
        .serif-font { font-family: 'Fraunces', serif; }
        .mono-font { font-family: 'JetBrains Mono', monospace; }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(220, 252, 31, 0.4); } 50% { box-shadow: 0 0 0 12px rgba(220, 252, 31, 0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ringFill { from { stroke-dashoffset: 283; } }
        .fade-in { animation: fadeInUp 0.5s ease-out forwards; }
        .pulse-ring { animation: pulse-glow 2s infinite; }
        .grain::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.06; pointer-events: none; z-index: 1;
        }
        .scrollable::-webkit-scrollbar { width: 4px; }
        .scrollable::-webkit-scrollbar-track { background: #1a1a1a; }
        .scrollable::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        .chip { transition: all 0.2s ease; }
        .chip:hover { transform: translateY(-1px); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-2px); }
        input[type="range"] { accent-color: #dcfc1f; }
      `}</style>
      <div className="grain"></div>

      <div style={{ maxWidth: '440px', margin: '0 auto', minHeight: '100vh', position: 'relative', paddingBottom: '90px' }}>
        
        {/* HEADER */}
        <header style={{ padding: '20px 24px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(20px)', zIndex: 10, borderBottom: '1px solid #1a1a1a' }}>
          <div>
            <div className="mono-font" style={{ fontSize: '10px', color: '#dcfc1f', letterSpacing: '0.2em', marginBottom: '2px' }}>WHOLE · GOOD MORNING</div>
            <div className="display-font" style={{ fontSize: '22px' }}>HEY, SARAH.</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ padding: '6px 10px', border: '1px solid #2a2a2a', borderRadius: '20px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={12} color="#dcfc1f" fill="#dcfc1f" />
              <span className="mono-font" style={{ fontWeight: 600 }}>{streak}</span>
            </div>
          </div>
        </header>

        <main style={{ padding: '0 0 24px' }}>
          {activeTab === 'home' && <HomeView scores={scores} totalToday={totalToday} totalWeekly={totalWeekly} setActiveTab={setActiveTab} streak={streak} />}
          {activeTab === 'physical' && <PhysicalView workoutMinutes={workoutMinutes} setWorkoutMinutes={setWorkoutMinutes} trainingGoal={trainingGoal} setTrainingGoal={setTrainingGoal} fitnessLevel={fitnessLevel} setFitnessLevel={setFitnessLevel} updatePillar={updatePillar} setActiveTab={setActiveTab} />}
          {activeTab === 'spiritual' && <SpiritualView updatePillar={updatePillar} />}
          {activeTab === 'mental' && <MentalView updatePillar={updatePillar} />}
          {activeTab === 'social' && <SocialView updatePillar={updatePillar} />}
          {activeTab === 'ai' && <AICoachView messages={aiMessages} setMessages={setAiMessages} input={aiInput} setInput={setAiInput} />}
          {activeTab === 'history' && <HistoryView />}
          {activeTab === 'compete' && <CompeteView />}
          {activeTab === 'meals' && <MealsView />}
        </main>

        {/* BOTTOM NAV */}
        <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '440px', margin: '0 auto', background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid #1a1a1a', padding: '12px 4px 20px', display: 'flex', justifyContent: 'space-around', zIndex: 20 }}>
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'physical', icon: Dumbbell, label: 'Body' },
            { id: 'spiritual', icon: Feather, label: 'Spirit' },
            { id: 'mental', icon: Brain, label: 'Mind' },
            { id: 'social', icon: HeartHandshake, label: 'Connect' },
            { id: 'ai', icon: Sparkles, label: 'Coach' }
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: 'none', border: 'none', color: activeTab === t.id ? '#dcfc1f' : '#666',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              padding: '4px 4px', cursor: 'pointer', fontSize: '9px', fontWeight: 600,
              transition: 'color 0.2s ease', minWidth: '44px'
            }}>
              <t.icon size={18} strokeWidth={activeTab === t.id ? 2.5 : 2} />
              <span style={{ letterSpacing: '0.03em' }}>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* WELLNESS NUDGE */}
        {showNudge && nudgeData && (
          <div style={{
            position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
            width: 'calc(100% - 32px)', maxWidth: '408px', zIndex: 30,
            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              background: PILLARS[nudgeData.pillar].color,
              color: '#0a0a0a', padding: '16px', borderRadius: '16px',
              display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: `0 20px 40px ${PILLARS[nudgeData.pillar].glow}, 0 0 0 1px rgba(0,0,0,0.1)`
            }}>
              <div style={{ fontSize: '28px' }}>{nudgeData.icon}</div>
              <div style={{ flex: 1 }}>
                <div className="mono-font" style={{ fontSize: '10px', opacity: 0.7, letterSpacing: '0.15em', marginBottom: '2px' }}>
                  {PILLARS[nudgeData.pillar].label} NUDGE · +{nudgeData.points} PTS
                </div>
                <div style={{ fontWeight: 800, fontSize: '15px', lineHeight: 1.2 }}>{nudgeData.title}</div>
                <div style={{ fontSize: '13px', opacity: 0.8 }}>{nudgeData.action}</div>
              </div>
              <button onClick={completeNudge} style={{
                background: '#0a0a0a', color: PILLARS[nudgeData.pillar].color, border: 'none', padding: '10px 14px',
                borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}>
                DONE <Check size={14} />
              </button>
              <button onClick={() => setShowNudge(false)} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', color: '#0a0a0a', opacity: 0.5, padding: '4px'
              }}>
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============ HOME — FOUR PILLAR DASHBOARD ============ */
function HomeView({ scores, totalToday, totalWeekly, setActiveTab, streak }) {
  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      
      {/* HERO: WELLNESS RING */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
        border: '1px solid #2a2a2a',
        borderRadius: '20px', padding: '24px', marginBottom: '20px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px',
          background: 'radial-gradient(circle, rgba(220,252,31,0.08) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div className="mono-font" style={{ fontSize: '10px', color: '#dcfc1f', letterSpacing: '0.2em', marginBottom: '14px' }}>WHOLE SCORE · TODAY</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <WellnessRing scores={scores} totalToday={totalToday} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <div className="display-font" style={{ fontSize: '40px', lineHeight: 1 }}>{totalToday}</div>
              <div style={{ color: '#888', fontSize: '12px' }}>/ 100</div>
            </div>
            <div style={{ fontSize: '11px', color: '#888', marginTop: '4px', marginBottom: '12px' }}>
              {totalToday >= 75 ? "You're balanced. 🌟" : totalToday >= 50 ? "Good rhythm." : "Let's build today."}
            </div>
            <div className="mono-font" style={{ fontSize: '10px', color: '#666', letterSpacing: '0.15em' }}>
              WEEKLY · {totalWeekly} pts
            </div>
          </div>
        </div>
      </div>

      {/* FOUR PILLARS */}
      <SectionLabel text="THE FOUR PILLARS · TODAY" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <PillarCard pillar="physical" score={scores.physical.today} subtitle="Move your body" onClick={() => setActiveTab('physical')} />
        <PillarCard pillar="spiritual" score={scores.spiritual.today} subtitle="Feed your soul" onClick={() => setActiveTab('spiritual')} />
        <PillarCard pillar="mental" score={scores.mental.today} subtitle="Grow your mind" onClick={() => setActiveTab('mental')} />
        <PillarCard pillar="social" score={scores.social.today} subtitle="Be present, connect" onClick={() => setActiveTab('social')} />
      </div>

      {/* DAILY VERSE / INTENTION */}
      <SectionLabel text="MORNING ANCHOR" />
      <div style={{
        background: 'linear-gradient(135deg, rgba(196,168,255,0.08), rgba(96,165,250,0.04))',
        border: '1px solid #2a2a2a',
        borderRadius: '16px', padding: '20px', marginBottom: '20px', position: 'relative'
      }}>
        <Quote size={18} color="#c4a8ff" style={{ marginBottom: '10px' }} />
        <div className="serif-font" style={{ fontSize: '17px', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '10px', color: '#f0f0f0' }}>
          "Be still, and know that I am God."
        </div>
        <div className="mono-font" style={{ fontSize: '10px', color: '#888', letterSpacing: '0.15em' }}>PSALM 46:10</div>
      </div>

      {/* TODAY'S NEXT STEP */}
      <SectionLabel text="WHAT'S NEXT" />
      <NextStepCard scores={scores} setActiveTab={setActiveTab} />

      {/* QUICK ACTIONS */}
      <SectionLabel text="JUMP IN" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <ActionTile icon={Sparkles} label="AI Coach" sub="Plan your day" onClick={() => setActiveTab('ai')} />
        <ActionTile icon={CalendarDays} label="History" sub="View calendar" onClick={() => setActiveTab('history')} />
        <ActionTile icon={Medal} label="Compete" sub="Friends + global" onClick={() => setActiveTab('compete')} />
        <ActionTile icon={Salad} label="Meals" sub="Today's plan" onClick={() => setActiveTab('meals')} />
      </div>
    </div>
  );
}

function WellnessRing({ scores, totalToday }) {
  // Four concentric arcs, each filling based on its pillar score
  const size = 110;
  const center = size / 2;
  const strokeWidth = 8;
  const gap = 3;
  
  const pillars = ['physical', 'spiritual', 'mental', 'social'];
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {pillars.map((p, i) => {
        const radius = (size / 2) - strokeWidth - (i * (strokeWidth + gap));
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (scores[p].today / 100) * circumference;
        return (
          <g key={p} transform={`rotate(-90 ${center} ${center})`}>
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
            <circle cx={center} cy={center} r={radius} fill="none" 
              stroke={PILLARS[p].color} strokeWidth={strokeWidth} 
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          </g>
        );
      })}
    </svg>
  );
}

function PillarCard({ pillar, score, subtitle, onClick }) {
  const p = PILLARS[pillar];
  const Icon = p.icon;
  return (
    <button onClick={onClick} className="card-hover" style={{
      background: '#111', border: `1px solid ${score >= 75 ? p.color : '#2a2a2a'}`,
      borderRadius: '14px', padding: '14px', textAlign: 'left', cursor: 'pointer',
      color: '#fafafa', fontFamily: 'inherit', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', top: 0, right: 0, width: '60px', height: '60px',
        background: `radial-gradient(circle at top right, ${p.glow}, transparent 70%)`
      }}></div>
      <Icon size={18} color={p.color} style={{ marginBottom: '8px' }} />
      <div className="mono-font" style={{ fontSize: '9px', color: p.color, letterSpacing: '0.15em', marginBottom: '4px' }}>{p.label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
        <span className="display-font" style={{ fontSize: '24px' }}>{score}</span>
        <span style={{ fontSize: '11px', color: '#666' }}>/100</span>
      </div>
      <div style={{ fontSize: '11px', color: '#888' }}>{subtitle}</div>
      <div style={{
        marginTop: '10px', height: '3px', background: '#1a1a1a', borderRadius: '2px', overflow: 'hidden'
      }}>
        <div style={{ width: `${score}%`, height: '100%', background: p.color, transition: 'width 0.5s ease' }}></div>
      </div>
    </button>
  );
}

function NextStepCard({ scores, setActiveTab }) {
  // Suggest the lowest-scoring pillar
  const lowest = Object.entries(scores).sort((a, b) => a[1].today - b[1].today)[0];
  const pillar = lowest[0];
  const p = PILLARS[pillar];
  const Icon = p.icon;
  
  const suggestions = {
    physical: { title: '20-min Power Circuit', sub: 'Strength + cardio · no equipment' },
    spiritual: { title: '5-min Scripture + Prayer', sub: 'Today\'s reading: Psalm 23' },
    mental: { title: 'Read 10 pages', sub: 'Continue: Atomic Habits, ch. 4' },
    social: { title: 'Text someone you miss', sub: 'It\'s been 3 weeks since you talked to mom' }
  };
  const s = suggestions[pillar];
  
  return (
    <div onClick={() => setActiveTab(pillar)} className="card-hover" style={{
      background: '#111', border: '1px solid #2a2a2a', borderRadius: '16px',
      padding: '18px', marginBottom: '16px', cursor: 'pointer', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: p.color
      }}></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div className="mono-font" style={{ fontSize: '10px', color: p.color, letterSpacing: '0.15em', marginBottom: '4px' }}>
            ↓ LOWEST · {p.label}
          </div>
          <div style={{ fontWeight: 800, fontSize: '17px', marginBottom: '3px' }}>{s.title}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{s.sub}</div>
        </div>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', background: p.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <ArrowRight size={20} color="#0a0a0a" />
        </div>
      </div>
    </div>
  );
}

/* ============ PHYSICAL VIEW ============ */
function PhysicalView({ workoutMinutes, setWorkoutMinutes, trainingGoal, setTrainingGoal, fitnessLevel, setFitnessLevel, updatePillar, setActiveTab }) {
  const goals = [
    { id: 'general', label: 'General', emoji: '💪' },
    { id: 'hybrid', label: 'Hybrid', emoji: '⚔️' },
    { id: 'ironman', label: 'Ironman', emoji: '🏊' },
    { id: 'strength', label: 'Strength', emoji: '🏋️' },
    { id: 'marathon', label: 'Marathon', emoji: '🏃' },
    { id: 'weightloss', label: 'Fat Loss', emoji: '🔥' },
    { id: 'mobility', label: 'Mobility', emoji: '🧘' },
    { id: 'hyrox', label: 'Hyrox', emoji: '🏟️' },
    { id: 'crossfit', label: 'CrossFit', emoji: '🏆' },
    { id: 'powerlifting', label: 'Powerlift', emoji: '🥇' },
    { id: 'cycling', label: 'Cycling', emoji: '🚴' },
    { id: 'yoga', label: 'Yoga', emoji: '🪷' }
  ];
  const levels = ['beginner', 'intermediate', 'advanced', 'elite'];
  const workout = generateWorkout(workoutMinutes, trainingGoal, fitnessLevel);

  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <PillarHeader pillar="physical" title="MOVE." subtitle="Your body is your vehicle." />

      {/* TIME SLIDER */}
      <SubLabel pillar="physical" text="TIME AVAILABLE" />
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <span className="display-font" style={{ fontSize: '28px' }}>{workoutMinutes}</span>
          <span style={{ color: '#666', fontSize: '13px', marginLeft: '4px', alignSelf: 'flex-end', paddingBottom: '4px' }}>min</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setWorkoutMinutes(Math.max(5, workoutMinutes - 5))} style={pillBtn}><Minus size={14} /></button>
          <input type="range" min="5" max="90" step="5" value={workoutMinutes} onChange={e => setWorkoutMinutes(parseInt(e.target.value))} style={{ flex: 1, height: '4px' }} />
          <button onClick={() => setWorkoutMinutes(Math.min(90, workoutMinutes + 5))} style={pillBtn}><Plus size={14} /></button>
        </div>
        <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
          {[10, 15, 20, 30, 45, 60].map(t => (
            <button key={t} onClick={() => setWorkoutMinutes(t)} style={chipStyle(workoutMinutes === t, '#dcfc1f')}>{t}m</button>
          ))}
        </div>
      </div>

      <SubLabel pillar="physical" text="TRAINING FOR" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '20px' }}>
        {goals.map(g => (
          <button key={g.id} onClick={() => setTrainingGoal(g.id)}
            style={{ ...chipStyle(trainingGoal === g.id, '#dcfc1f'), padding: '12px 6px', flexDirection: 'column', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
            <div style={{ fontSize: '20px' }}>{g.emoji}</div>
            {g.label}
          </button>
        ))}
      </div>

      <SubLabel pillar="physical" text="LEVEL" />
      <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
        {levels.map(l => (
          <button key={l} onClick={() => setFitnessLevel(l)} style={{ ...chipStyle(fitnessLevel === l, '#dcfc1f'), flex: 1, textTransform: 'capitalize' }}>{l}</button>
        ))}
      </div>

      {/* GENERATED WORKOUT */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)', border: '1px solid #dcfc1f', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div className="mono-font" style={{ fontSize: '10px', color: '#dcfc1f', letterSpacing: '0.2em', marginBottom: '4px' }}>GENERATED FOR YOU</div>
            <div className="display-font" style={{ fontSize: '20px', lineHeight: 1.1 }}>{workout.name}</div>
          </div>
          <Sparkles size={20} color="#dcfc1f" />
        </div>
        {workout.blocks.map((block, i) => (
          <div key={i} style={{ padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="mono-font" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#dcfc1f', border: '1px solid #2a2a2a' }}>{String(i + 1).padStart(2, '0')}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>{block.name}</div>
              <div style={{ fontSize: '11px', color: '#888' }}>{block.detail}</div>
            </div>
            <div className="mono-font" style={{ fontSize: '11px', color: '#666' }}>{block.time}</div>
          </div>
        ))}
        <button onClick={() => updatePillar('physical', 50)} style={{ width: '100%', marginTop: '16px', padding: '16px', background: '#dcfc1f', color: '#0a0a0a', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '14px', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          START WORKOUT <ArrowRight size={16} />
        </button>
      </div>

      <button onClick={() => setActiveTab('history')} style={{
        width: '100%', padding: '14px', background: 'transparent', color: '#dcfc1f',
        border: '1px solid #2a2a2a', borderRadius: '12px', fontWeight: 600, fontSize: '13px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
      }}>
        <CalendarDays size={14} /> View Workout History
      </button>
    </div>
  );
}

/* ============ SPIRITUAL VIEW ============ */
function SpiritualView({ updatePillar }) {
  const [tab, setTab] = useState('today');
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [meditationLength, setMeditationLength] = useState(5);
  const [gratitudeText, setGratitudeText] = useState('');
  const [gratitudeList, setGratitudeList] = useState([]);
  const [completedToday, setCompletedToday] = useState({ scripture: false, prayer: false, meditation: false, gratitude: false });

  useEffect(() => {
    if (!meditationActive) return;
    const interval = setInterval(() => {
      setMeditationTime(t => {
        if (t + 1 >= meditationLength * 60) {
          setMeditationActive(false);
          setCompletedToday(c => ({ ...c, meditation: true }));
          updatePillar('spiritual', 30);
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [meditationActive, meditationLength]);

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const todaysReading = {
    reference: 'Psalm 23',
    title: 'The Lord is My Shepherd',
    text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul. He guides me along the right paths for his name's sake.",
    reflection: "Where do you need rest today? What 'quiet waters' is God leading you toward?"
  };

  const completeAction = (key, points) => {
    setCompletedToday(c => ({ ...c, [key]: true }));
    updatePillar('spiritual', points);
  };

  const addGratitude = () => {
    if (!gratitudeText.trim()) return;
    setGratitudeList(g => [...g, { text: gratitudeText, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }]);
    setGratitudeText('');
    if (gratitudeList.length === 0) {
      completeAction('gratitude', 20);
    }
  };

  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <PillarHeader pillar="spiritual" title="STILLNESS." subtitle="Quiet the noise. Hear what matters." />

      <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
        {[
          { id: 'today', label: "Today's Practice" },
          { id: 'meditate', label: 'Meditate' },
          { id: 'gratitude', label: 'Gratitude' }
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '10px 6px', background: tab === t.id ? '#c4a8ff' : 'transparent',
            color: tab === t.id ? '#0a0a0a' : '#888', border: 'none', borderRadius: '9px',
            fontWeight: 700, fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s ease'
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'today' && (
        <>
          {/* SCRIPTURE READING */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(196,168,255,0.08), rgba(196,168,255,0.02))',
            border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div className="mono-font" style={{ fontSize: '10px', color: '#c4a8ff', letterSpacing: '0.2em', marginBottom: '4px' }}>TODAY'S READING</div>
                <div className="display-font" style={{ fontSize: '18px', lineHeight: 1.1 }}>{todaysReading.reference}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{todaysReading.title}</div>
              </div>
              <BookMarked size={20} color="#c4a8ff" />
            </div>
            <div className="serif-font" style={{ fontSize: '15px', lineHeight: 1.6, color: '#e0e0e0', fontStyle: 'italic', marginBottom: '14px' }}>
              "{todaysReading.text}"
            </div>
            <div style={{
              padding: '12px', background: '#0a0a0a', borderRadius: '10px',
              border: '1px solid #1a1a1a', marginBottom: '14px'
            }}>
              <div className="mono-font" style={{ fontSize: '9px', color: '#666', letterSpacing: '0.15em', marginBottom: '4px' }}>REFLECTION</div>
              <div style={{ fontSize: '13px', color: '#bbb', lineHeight: 1.5 }}>{todaysReading.reflection}</div>
            </div>
            <button onClick={() => completeAction('scripture', 25)} disabled={completedToday.scripture}
              style={{ width: '100%', padding: '14px', background: completedToday.scripture ? '#1a1a1a' : '#c4a8ff', color: completedToday.scripture ? '#666' : '#0a0a0a', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: completedToday.scripture ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {completedToday.scripture ? <><Check size={14} /> COMPLETED</> : 'MARK AS READ'}
            </button>
          </div>

          {/* PRAYER PROMPT */}
          <PracticeCard
            pillar="spiritual"
            icon="🙏"
            title="Prayer"
            subtitle="Talk with God"
            duration="3-5 min"
            prompt="Pray for someone who's been on your mind. Thank God for one specific thing today."
            done={completedToday.prayer}
            onComplete={() => completeAction('prayer', 25)}
          />

          {/* QUICK MEDITATION */}
          <PracticeCard
            pillar="spiritual"
            icon="🧘"
            title="Meditation"
            subtitle="Stillness practice"
            duration="5-10 min"
            prompt="Sit with breath. When the mind wanders, return gently."
            done={completedToday.meditation}
            onComplete={() => setTab('meditate')}
            actionLabel="START TIMER"
          />

          {/* GRATITUDE */}
          <PracticeCard
            pillar="spiritual"
            icon="✨"
            title="Gratitude"
            subtitle="Name three blessings"
            duration="2 min"
            prompt="What are three specific things you're grateful for right now?"
            done={completedToday.gratitude}
            onComplete={() => setTab('gratitude')}
            actionLabel="OPEN JOURNAL"
          />
        </>
      )}

      {tab === 'meditate' && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div className="serif-font" style={{ fontSize: '15px', color: '#aaa', fontStyle: 'italic', marginBottom: '24px' }}>
            "Be still, and know."
          </div>
          
          <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 24px' }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
              <circle cx="110" cy="110" r="100" fill="none" stroke="#1a1a1a" strokeWidth="3" />
              <circle cx="110" cy="110" r="100" fill="none" stroke="#c4a8ff" strokeWidth="3"
                strokeDasharray={2 * Math.PI * 100} 
                strokeDashoffset={(2 * Math.PI * 100) * (1 - meditationTime / (meditationLength * 60))}
                strokeLinecap="round"
                transform="rotate(-90 110 110)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="display-font" style={{ fontSize: '36px', color: '#c4a8ff' }}>{fmt(meditationLength * 60 - meditationTime)}</div>
              <div className="mono-font" style={{ fontSize: '10px', color: '#666', letterSpacing: '0.2em', marginTop: '4px' }}>
                {meditationActive ? 'BREATHE' : 'READY'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
            {[3, 5, 10, 15, 20].map(m => (
              <button key={m} onClick={() => !meditationActive && setMeditationLength(m)}
                style={{ ...chipStyle(meditationLength === m, '#c4a8ff'), padding: '8px 14px' }}>{m}m</button>
            ))}
          </div>

          <button onClick={() => { setMeditationActive(!meditationActive); if (!meditationActive) setMeditationTime(0); }}
            style={{ padding: '16px 36px', background: '#c4a8ff', color: '#0a0a0a', border: 'none', borderRadius: '50px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {meditationActive ? <><X size={16} /> STOP</> : <><Play size={16} /> BEGIN</>}
          </button>
        </div>
      )}

      {tab === 'gratitude' && (
        <div>
          <div className="serif-font" style={{ fontSize: '15px', color: '#aaa', fontStyle: 'italic', marginBottom: '20px', textAlign: 'center' }}>
            "Gratitude turns what we have into enough."
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input value={gratitudeText} onChange={e => setGratitudeText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addGratitude()}
              placeholder="I'm grateful for..."
              style={{ flex: 1, padding: '14px 16px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', color: '#fafafa', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }} />
            <button onClick={addGratitude} style={{ background: '#c4a8ff', border: 'none', borderRadius: '12px', padding: '0 18px', cursor: 'pointer' }}>
              <Plus size={18} color="#0a0a0a" />
            </button>
          </div>

          {gratitudeList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
              <Star size={32} style={{ marginBottom: '8px', opacity: 0.4 }} />
              <div style={{ fontSize: '13px' }}>Start with one thing.</div>
            </div>
          )}

          {gratitudeList.map((g, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Star size={16} color="#c4a8ff" fill="#c4a8ff" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="serif-font" style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: 1.4 }}>{g.text}</div>
                <div className="mono-font" style={{ fontSize: '9px', color: '#666', letterSpacing: '0.1em', marginTop: '4px' }}>{g.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ MENTAL VIEW ============ */
function MentalView({ updatePillar }) {
  const [tab, setTab] = useState('today');
  const [readingMinutes, setReadingMinutes] = useState(15);
  const [readingActive, setReadingActive] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [journalEntries, setJournalEntries] = useState([
    { date: 'Yesterday', text: 'Realized I\'ve been on autopilot with the kids in the morning. Want to be more present.', mood: '🤔' }
  ]);
  const [completedToday, setCompletedToday] = useState({ reading: false, learning: false, journal: false });

  useEffect(() => {
    if (!readingActive) return;
    const interval = setInterval(() => {
      setReadingTime(t => {
        if (t + 1 >= readingMinutes * 60) {
          setReadingActive(false);
          setCompletedToday(c => ({ ...c, reading: true }));
          updatePillar('mental', 30);
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [readingActive, readingMinutes]);

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const currentBook = {
    title: 'Atomic Habits',
    author: 'James Clear',
    chapter: 'Chapter 4',
    progress: 38,
    quote: '"You do not rise to the level of your goals. You fall to the level of your systems."'
  };

  const skills = [
    { name: 'Spanish · Duolingo', sub: '12-day streak · 5 min', color: '#fb923c', icon: '🇪🇸' },
    { name: 'Piano · 1 song this week', sub: 'Practice 10 min today', color: '#c4a8ff', icon: '🎹' },
    { name: 'Photography basics', sub: 'Lesson 6 of 12', color: '#60a5fa', icon: '📷' }
  ];

  const completeAction = (key, points) => {
    setCompletedToday(c => ({ ...c, [key]: true }));
    updatePillar('mental', points);
  };

  const saveJournal = (mood) => {
    if (!journalText.trim()) return;
    setJournalEntries(j => [{ date: 'Just now', text: journalText, mood }, ...j]);
    setJournalText('');
    if (!completedToday.journal) completeAction('journal', 25);
  };

  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <PillarHeader pillar="mental" title="GROW." subtitle="A mind in motion stays sharp." />

      <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
        {[
          { id: 'today', label: 'Today' },
          { id: 'read', label: 'Read' },
          { id: 'journal', label: 'Journal' }
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '10px', background: tab === t.id ? '#60a5fa' : 'transparent',
            color: tab === t.id ? '#0a0a0a' : '#888', border: 'none', borderRadius: '9px',
            fontWeight: 700, fontSize: '12px', cursor: 'pointer'
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'today' && (
        <>
          {/* CURRENT BOOK */}
          <div style={{ background: 'linear-gradient(135deg, rgba(96,165,250,0.08), rgba(96,165,250,0.02))', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div>
                <div className="mono-font" style={{ fontSize: '10px', color: '#60a5fa', letterSpacing: '0.2em', marginBottom: '4px' }}>READING NOW</div>
                <div className="display-font" style={{ fontSize: '18px', lineHeight: 1.1 }}>{currentBook.title}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>by {currentBook.author} · {currentBook.chapter}</div>
              </div>
              <BookOpen size={20} color="#60a5fa" />
            </div>
            <div className="serif-font" style={{ fontSize: '14px', lineHeight: 1.6, color: '#bbb', fontStyle: 'italic', marginBottom: '14px', padding: '12px', background: '#0a0a0a', borderRadius: '10px', border: '1px solid #1a1a1a' }}>
              {currentBook.quote}
            </div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                <span className="mono-font" style={{ color: '#666', letterSpacing: '0.15em' }}>PROGRESS</span>
                <span style={{ color: '#60a5fa' }}>{currentBook.progress}%</span>
              </div>
              <div style={{ height: '4px', background: '#1a1a1a', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${currentBook.progress}%`, height: '100%', background: '#60a5fa' }}></div>
              </div>
            </div>
            <button onClick={() => setTab('read')} style={{ width: '100%', padding: '14px', background: '#60a5fa', color: '#0a0a0a', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              START READING SESSION
            </button>
          </div>

          {/* LEARN A SKILL */}
          <SubLabel pillar="mental" text="LEARNING NOW" />
          {skills.map((s, i) => (
            <div key={i} className="card-hover" style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
              onClick={() => !completedToday.learning && completeAction('learning', 25)}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0a0a0a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{s.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{s.sub}</div>
              </div>
              <ChevronRight size={16} color="#444" />
            </div>
          ))}

          <PracticeCard
            pillar="mental"
            icon="✍️"
            title="Journal"
            subtitle="Capture today's thoughts"
            duration="3 min"
            prompt="What's been on your mind? What did you notice today?"
            done={completedToday.journal}
            onComplete={() => setTab('journal')}
            actionLabel="OPEN JOURNAL"
          />
        </>
      )}

      {tab === 'read' && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div className="display-font" style={{ fontSize: '20px', marginBottom: '4px' }}>{currentBook.title}</div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '32px' }}>{currentBook.chapter}</div>

          <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px' }}>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="92" fill="none" stroke="#1a1a1a" strokeWidth="3" />
              <circle cx="100" cy="100" r="92" fill="none" stroke="#60a5fa" strokeWidth="3"
                strokeDasharray={2 * Math.PI * 92}
                strokeDashoffset={(2 * Math.PI * 92) * (1 - readingTime / (readingMinutes * 60))}
                strokeLinecap="round" transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="display-font" style={{ fontSize: '32px', color: '#60a5fa' }}>{fmt(readingMinutes * 60 - readingTime)}</div>
              <div className="mono-font" style={{ fontSize: '10px', color: '#666', letterSpacing: '0.2em', marginTop: '4px' }}>FOCUS TIME</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
            {[10, 15, 20, 30, 45].map(m => (
              <button key={m} onClick={() => !readingActive && setReadingMinutes(m)}
                style={{ ...chipStyle(readingMinutes === m, '#60a5fa'), padding: '8px 14px' }}>{m}m</button>
            ))}
          </div>

          <button onClick={() => { setReadingActive(!readingActive); if (!readingActive) setReadingTime(0); }}
            style={{ padding: '16px 36px', background: '#60a5fa', color: '#0a0a0a', border: 'none', borderRadius: '50px', fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {readingActive ? <><X size={16} /> STOP</> : <><Play size={16} /> START READING</>}
          </button>

          <div style={{ marginTop: '20px', fontSize: '11px', color: '#666' }}>Phone goes in another room. Just you and the page.</div>
        </div>
      )}

      {tab === 'journal' && (
        <div>
          <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
            <textarea value={journalText} onChange={e => setJournalText(e.target.value)}
              placeholder="What's on your mind today?"
              rows="6"
              style={{ width: '100%', background: 'transparent', border: 'none', color: '#fafafa', fontSize: '14px', fontFamily: 'inherit', resize: 'none', outline: 'none', lineHeight: 1.5 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid #2a2a2a', paddingTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['😊', '😐', '😔', '🤔', '🔥'].map(m => (
                  <button key={m} onClick={() => saveJournal(m)} style={{ width: '36px', height: '36px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', fontSize: '18px', cursor: 'pointer' }}>{m}</button>
                ))}
              </div>
              <span className="mono-font" style={{ fontSize: '10px', color: '#666' }}>{journalText.length} chars</span>
            </div>
          </div>

          <SubLabel pillar="mental" text="PAST ENTRIES" />
          {journalEntries.map((e, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="mono-font" style={{ fontSize: '10px', color: '#60a5fa', letterSpacing: '0.15em' }}>{e.date.toUpperCase()}</span>
                <span style={{ fontSize: '16px' }}>{e.mood}</span>
              </div>
              <div className="serif-font" style={{ fontSize: '13px', lineHeight: 1.5, color: '#ddd', fontStyle: 'italic' }}>"{e.text}"</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============ SOCIAL VIEW ============ */
function SocialView({ updatePillar }) {
  const [phoneFreeMinutes, setPhoneFreeMinutes] = useState(0);
  const [phoneFreeActive, setPhoneFreeActive] = useState(false);
  const [phoneFreeTime, setPhoneFreeTime] = useState(0);
  const [completedToday, setCompletedToday] = useState({ reach: false, kindness: false, present: false });

  useEffect(() => {
    if (!phoneFreeActive) return;
    const interval = setInterval(() => {
      setPhoneFreeTime(t => {
        if (t + 1 >= phoneFreeMinutes * 60) {
          setPhoneFreeActive(false);
          setCompletedToday(c => ({ ...c, present: true }));
          updatePillar('social', 35);
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phoneFreeActive, phoneFreeMinutes]);

  const fmt = s => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const peopleToReach = [
    { name: 'Mom', last: '3 weeks ago', tag: 'OVERDUE', urgent: true },
    { name: 'Sister Jen', last: '5 days ago', tag: 'CHECK IN' },
    { name: 'David (college friend)', last: '2 months ago', tag: 'OVERDUE', urgent: true },
    { name: 'Aunt Linda', last: '1 month ago', tag: 'BIRTHDAY SOON' }
  ];

  const kindnessIdeas = [
    { icon: '☕', title: "Pay for stranger's coffee", points: 30 },
    { icon: '💌', title: "Write thank-you note", points: 25 },
    { icon: '🍪', title: "Bring treat to neighbor", points: 30 },
    { icon: '🚗', title: "Let someone merge in traffic", points: 10 },
    { icon: '👏', title: "Compliment a coworker sincerely", points: 15 },
    { icon: '🤝', title: "Help someone carry something", points: 20 }
  ];

  const completeAction = (key, points) => {
    setCompletedToday(c => ({ ...c, [key]: true }));
    updatePillar('social', points);
  };

  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <PillarHeader pillar="social" title="CONNECT." subtitle="Be present. Reach out. Show up." />

      {/* PHONE FREE MODE */}
      <div style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.1), rgba(251,146,60,0.02))', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <div className="mono-font" style={{ fontSize: '10px', color: '#fb923c', letterSpacing: '0.2em', marginBottom: '4px' }}>BE PRESENT</div>
            <div className="display-font" style={{ fontSize: '18px', lineHeight: 1.1 }}>Phone-Free Time</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Put it down. Look up. Connect.</div>
          </div>
          <PhoneOff size={20} color="#fb923c" />
        </div>

        {phoneFreeActive ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="display-font" style={{ fontSize: '48px', color: '#fb923c', lineHeight: 1 }}>
              {fmt(phoneFreeMinutes * 60 - phoneFreeTime)}
            </div>
            <div className="mono-font" style={{ fontSize: '10px', color: '#666', letterSpacing: '0.2em', marginTop: '8px', marginBottom: '20px' }}>
              EYES UP · YOU'VE GOT THIS
            </div>
            <button onClick={() => setPhoneFreeActive(false)} style={{ padding: '12px 28px', background: '#1a1a1a', color: '#fb923c', border: '1px solid #fb923c', borderRadius: '50px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              END EARLY
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {[15, 30, 45, 60, 90, 120].map(m => (
                <button key={m} onClick={() => setPhoneFreeMinutes(m)}
                  style={{ ...chipStyle(phoneFreeMinutes === m, '#fb923c'), flex: '1 0 28%' }}>
                  {m >= 60 ? `${m/60}h` : `${m}m`}
                </button>
              ))}
            </div>
            <button onClick={() => { if (phoneFreeMinutes > 0) { setPhoneFreeActive(true); setPhoneFreeTime(0); } }}
              disabled={phoneFreeMinutes === 0}
              style={{ width: '100%', padding: '14px', background: phoneFreeMinutes ? '#fb923c' : '#1a1a1a', color: phoneFreeMinutes ? '#0a0a0a' : '#666', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: phoneFreeMinutes ? 'pointer' : 'default' }}>
              {phoneFreeMinutes ? `START ${phoneFreeMinutes}-MIN PHONE-FREE` : 'PICK A DURATION'}
            </button>
          </>
        )}
      </div>

      {/* PEOPLE TO REACH OUT TO */}
      <SubLabel pillar="social" text="REACH OUT · YOUR PEOPLE" />
      {peopleToReach.map((p, i) => (
        <div key={i} className="card-hover" style={{ background: '#111', border: `1px solid ${p.urgent ? '#fb923c' : '#2a2a2a'}`, borderRadius: '12px', padding: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => completeAction('reach', 25)}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0a0a0a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fb923c' }}>
            {p.name.split(' ').map(n => n[0]).join('').slice(0,2)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.name}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>Last connect · {p.last}</div>
          </div>
          <span className="mono-font" style={{ fontSize: '9px', padding: '4px 8px', background: p.urgent ? '#fb923c' : '#1a1a1a', color: p.urgent ? '#0a0a0a' : '#888', borderRadius: '6px', fontWeight: 700, letterSpacing: '0.1em' }}>{p.tag}</span>
        </div>
      ))}
      <button style={{ width: '100%', padding: '12px', marginTop: '8px', marginBottom: '20px', background: 'transparent', color: '#888', border: '1px dashed #2a2a2a', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' }}>
        + Add Someone to Your Circle
      </button>

      {/* RANDOM ACT OF KINDNESS */}
      <SubLabel pillar="social" text="ACTS OF KINDNESS · TODAY" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {kindnessIdeas.map((k, i) => (
          <button key={i} onClick={() => !completedToday.kindness && completeAction('kindness', k.points)} 
            className="card-hover" style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', textAlign: 'left', cursor: 'pointer', color: '#fafafa', fontFamily: 'inherit' }}>
            <div style={{ fontSize: '22px', marginBottom: '6px' }}>{k.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '12px', lineHeight: 1.3, marginBottom: '4px' }}>{k.title}</div>
            <div className="mono-font" style={{ fontSize: '9px', color: '#fb923c' }}>+{k.points} PTS</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ AI COACH (now wellness coach) ============ */
function AICoachView({ messages, setMessages, input, setInput }) {
  const scrollRef = useRef(null);
  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages]);

  const quickPrompts = [
    "Plan my next 30 min",
    "I'm feeling overwhelmed",
    "I only have 10 min — what matters most?",
    "I haven't called my mom in weeks"
  ];

  const sendMessage = (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;
    const newMessages = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setInput('');
    setTimeout(() => {
      setMessages([...newMessages, { role: 'ai', text: generateAIResponse(userMsg) }]);
    }, 600);
  };

  return (
    <div className="fade-in" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 170px)' }}>
      <div style={{ marginBottom: '16px' }}>
        <div className="display-font" style={{ fontSize: '28px', lineHeight: 1 }}>AI COACH</div>
        <div style={{ color: '#888', fontSize: '12px', marginTop: '4px' }}>Whole-person guidance · Body, soul, mind, people</div>
      </div>

      <div ref={scrollRef} className="scrollable" style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', marginBottom: '12px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
            <div style={{
              maxWidth: '82%', padding: '12px 14px', borderRadius: '16px',
              background: m.role === 'user' ? '#dcfc1f' : '#1a1a1a',
              color: m.role === 'user' ? '#0a0a0a' : '#fafafa',
              fontSize: '13.5px', lineHeight: 1.5,
              borderBottomRightRadius: m.role === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: m.role === 'ai' ? '4px' : '16px',
              fontWeight: m.role === 'user' ? 600 : 400
            }}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '10px', paddingBottom: '2px' }}>
        {quickPrompts.map(p => (
          <button key={p} onClick={() => sendMessage(p)} style={{ ...chipStyle(false, '#dcfc1f'), whiteSpace: 'nowrap', fontSize: '11px', flexShrink: 0 }}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="What do you need right now?"
          style={{ flex: 1, padding: '14px 16px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '14px', color: '#fafafa', fontSize: '13px', fontFamily: 'inherit', outline: 'none' }} />
        <button onClick={() => sendMessage()} style={{ background: '#dcfc1f', border: 'none', borderRadius: '14px', padding: '0 18px', cursor: 'pointer' }}>
          <Send size={16} color="#0a0a0a" />
        </button>
      </div>
    </div>
  );
}

/* ============ HISTORY VIEW (full pillar history) ============ */
function HistoryView() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split('T')[0]);
  const history = generateMockHistory();

  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dateKey = (d) => new Date(year, month, d).toISOString().split('T')[0];
  const selectedDay = history[selectedDate];
  
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <div className="display-font" style={{ fontSize: '28px', lineHeight: 1, marginBottom: '6px' }}>HISTORY.</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Every practice, all four pillars.</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} style={navArrowBtn}><ChevronLeft size={18} /></button>
        <div className="display-font" style={{ fontSize: '20px' }}>{monthNames[month]} {year}</div>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} style={navArrowBtn}><ChevronRight size={18} /></button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '6px' }}>
        {dayLabels.map((d, i) => <div key={i} className="mono-font" style={{ textAlign: 'center', fontSize: '10px', color: '#666', padding: '4px' }}>{d}</div>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '20px' }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i}></div>;
          const key = dateKey(d);
          const day = history[key];
          const isToday = key === today.toISOString().split('T')[0];
          const isSelected = key === selectedDate;
          return (
            <button key={i} onClick={() => setSelectedDate(key)} style={{
              aspectRatio: '1', background: isSelected ? '#dcfc1f' : day ? '#1a1a1a' : 'transparent',
              border: isToday && !isSelected ? '1px solid #dcfc1f' : day ? '1px solid #2a2a2a' : '1px solid transparent',
              borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '4px', fontFamily: 'inherit'
            }}>
              <div style={{ fontSize: '12px', fontWeight: isToday || day ? 700 : 400, color: isSelected ? '#0a0a0a' : day ? '#fafafa' : '#666' }}>{d}</div>
              {day && (
                <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                  {['physical', 'spiritual', 'mental', 'social'].map(p => day.pillars[p] && (
                    <div key={p} style={{ width: '3px', height: '3px', borderRadius: '50%', background: isSelected ? '#0a0a0a' : PILLARS[p].color }}></div>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedDay ? (
        <div style={{ background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '18px' }}>
          <div className="mono-font" style={{ fontSize: '10px', color: '#dcfc1f', letterSpacing: '0.2em', marginBottom: '12px' }}>
            {formatDate(selectedDate).toUpperCase()} · WHOLE SCORE {selectedDay.score}
          </div>
          {Object.entries(selectedDay.pillars).map(([pillar, activity]) => activity && (
            <div key={pillar} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0', borderTop: '1px solid #1a1a1a' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: PILLARS[pillar].color, marginTop: '5px', flexShrink: 0 }}></div>
              <div style={{ flex: 1 }}>
                <div className="mono-font" style={{ fontSize: '9px', color: PILLARS[pillar].color, letterSpacing: '0.15em', marginBottom: '2px' }}>{PILLARS[pillar].label}</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{activity}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px dashed #2a2a2a', borderRadius: '14px', padding: '24px', textAlign: 'center', color: '#666' }}>
          <Calendar size={28} style={{ marginBottom: '8px', opacity: 0.5 }} />
          <div style={{ fontSize: '13px' }}>No practice logged · {formatDate(selectedDate)}</div>
        </div>
      )}

      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '12px', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '10px' }}>
        {Object.entries(PILLARS).map(([key, p]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: '#888' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.color }}></div>
            {p.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ COMPETE ============ */
function CompeteView() {
  const [mode, setMode] = useState('friends');
  const friends = [
    { rank: 1, name: 'Mike (brother)', pts: 1804, streak: 18, avatar: '🔥' },
    { rank: 2, name: 'You', pts: 1412, streak: 12, avatar: '⚡', you: true },
    { rank: 3, name: 'Jess', pts: 1289, streak: 8, avatar: '🌟' },
    { rank: 4, name: 'Dad', pts: 940, streak: 5, avatar: '💪' }
  ];
  const challenges = [
    { name: '7-Day Whole · Hit 70+ Daily', prize: 'Badge + 500pts', participants: 8421, progress: 68, tag: 'LIVE' },
    { name: 'Phone-Free Hour Streak', prize: 'Featured profile', participants: 3120, progress: 0, tag: 'NEW' },
    { name: 'Reach Out Week · Call 5 People', prize: 'Bragging rights', participants: 1842, progress: 40, tag: 'FRIENDS' }
  ];

  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <div className="display-font" style={{ fontSize: '28px', lineHeight: 1, marginBottom: '6px' }}>COMPETE.</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Race your people across all four pillars.</div>

      <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: '12px', padding: '4px', marginBottom: '20px' }}>
        {['friends', 'global', 'challenges'].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            flex: 1, padding: '10px', background: mode === m ? '#dcfc1f' : 'transparent',
            color: mode === m ? '#0a0a0a' : '#888', border: 'none', borderRadius: '9px',
            fontWeight: 700, fontSize: '12px', textTransform: 'capitalize', cursor: 'pointer'
          }}>{m}</button>
        ))}
      </div>

      {mode === 'friends' && (
        <>
          <div style={{ background: 'linear-gradient(135deg, #dcfc1f, #a8e600)', color: '#0a0a0a', padding: '16px', borderRadius: '14px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Trophy size={24} />
            <div style={{ flex: 1 }}>
              <div className="mono-font" style={{ fontSize: '10px', opacity: 0.6, letterSpacing: '0.15em' }}>WHOLE GRIND · WEEK 42</div>
              <div style={{ fontWeight: 800, fontSize: '15px' }}>Mike leads by 392 whole-points</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>3d 14h remaining</div>
            </div>
          </div>
          {friends.map(f => (
            <div key={f.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: f.you ? 'rgba(220,252,31,0.08)' : '#111', border: f.you ? '1px solid #dcfc1f' : '1px solid #2a2a2a', borderRadius: '12px', marginBottom: '8px' }}>
              <div className="display-font" style={{ fontSize: '18px', width: '28px', textAlign: 'center', color: f.rank === 1 ? '#dcfc1f' : '#666' }}>{f.rank}</div>
              <div style={{ fontSize: '24px' }}>{f.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: f.you ? 700 : 600, fontSize: '14px', color: f.you ? '#dcfc1f' : '#fafafa' }}>{f.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{f.streak}-day streak</div>
              </div>
              <div className="mono-font" style={{ fontSize: '14px', fontWeight: 700 }}>{f.pts}</div>
            </div>
          ))}
        </>
      )}

      {mode === 'global' && (
        <div style={{ background: '#111', border: '1px solid #2a2a2a', padding: '24px', borderRadius: '14px', textAlign: 'center' }}>
          <div className="mono-font" style={{ fontSize: '10px', color: '#666', letterSpacing: '0.2em' }}>GLOBAL WHOLE-RANK</div>
          <div className="display-font" style={{ fontSize: '48px', color: '#dcfc1f', margin: '4px 0' }}>#149</div>
          <div style={{ fontSize: '12px', color: '#888' }}>of 124,582 wholists</div>
          <div style={{ fontSize: '11px', color: '#dcfc1f', marginTop: '6px' }}>↑ 23 spots this week</div>
        </div>
      )}

      {mode === 'challenges' && challenges.map(c => (
        <div key={c.name} style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '16px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <span className="mono-font" style={{ fontSize: '9px', padding: '2px 6px', background: c.tag === 'LIVE' ? '#dcfc1f' : c.tag === 'NEW' ? '#60a5fa' : '#fb923c', color: '#0a0a0a', borderRadius: '6px', fontWeight: 700 }}>{c.tag}</span>
              <div style={{ fontWeight: 700, fontSize: '15px', marginTop: '6px' }}>{c.name}</div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>Prize: {c.prize}</div>
            </div>
            <div style={{ fontSize: '11px', color: '#666' }}>
              <Users size={12} style={{ display: 'inline', marginRight: '3px' }} />
              {c.participants.toLocaleString()}
            </div>
          </div>
          {c.progress > 0 ? (
            <>
              <div style={{ height: '6px', background: '#1a1a1a', borderRadius: '3px', marginBottom: '6px' }}>
                <div style={{ width: `${c.progress}%`, height: '100%', background: '#dcfc1f', borderRadius: '3px' }}></div>
              </div>
              <div className="mono-font" style={{ fontSize: '10px', color: '#dcfc1f' }}>{c.progress}% COMPLETE</div>
            </>
          ) : (
            <button style={{ width: '100%', padding: '10px', background: '#dcfc1f', color: '#0a0a0a', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>JOIN CHALLENGE</button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============ MEALS ============ */
function MealsView() {
  const meals = [
    { type: 'Breakfast', name: 'Overnight oats + berries', time: '2 min', kcal: 380, done: true, tag: 'MAKE-AHEAD' },
    { type: 'Lunch', name: 'Turkey avocado wrap', time: '5 min', kcal: 520, done: true, tag: 'KID-FRIENDLY' },
    { type: 'Snack', name: 'Greek yogurt + honey', time: '1 min', kcal: 180, done: false, tag: 'QUICK' },
    { type: 'Dinner', name: 'Sheet-pan chicken + veg', time: '25 min', kcal: 610, done: false, tag: 'FAMILY' }
  ];
  return (
    <div className="fade-in" style={{ padding: '20px 24px' }}>
      <div className="display-font" style={{ fontSize: '28px', lineHeight: 1, marginBottom: '6px' }}>FUEL.</div>
      <div style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Built around your training and family schedule.</div>
      <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px' }}>
          <span className="mono-font" style={{ color: '#666' }}>DAILY TARGETS</span>
          <span style={{ color: '#dcfc1f', fontWeight: 600 }}>1,690 / 1,900 kcal</span>
        </div>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
          <div style={{ flex: 1.8, height: '6px', background: '#dcfc1f', borderRadius: '3px' }}></div>
          <div style={{ flex: 0.2, height: '6px', background: '#2a2a2a', borderRadius: '3px' }}></div>
        </div>
      </div>
      {meals.map((m, i) => (
        <div key={i} className="card-hover" style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px', opacity: m.done ? 0.5 : 1 }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: m.done ? '#dcfc1f' : '#0a0a0a', border: m.done ? 'none' : '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {m.done ? <Check size={18} color="#0a0a0a" /> : <Utensils size={16} color="#666" />}
          </div>
          <div style={{ flex: 1 }}>
            <div className="mono-font" style={{ fontSize: '9px', color: '#666', letterSpacing: '0.15em' }}>{m.type.toUpperCase()}</div>
            <div style={{ fontWeight: 600, fontSize: '14px', textDecoration: m.done ? 'line-through' : 'none' }}>{m.name}</div>
            <div style={{ fontSize: '11px', color: '#888' }}>{m.time} · {m.kcal} kcal</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============ HELPERS ============ */
function PillarHeader({ pillar, title, subtitle }) {
  const p = PILLARS[pillar];
  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="mono-font" style={{ fontSize: '10px', color: p.color, letterSpacing: '0.25em', marginBottom: '4px' }}>{p.label}</div>
      <div className="display-font" style={{ fontSize: '32px', lineHeight: 1, marginBottom: '6px' }}>{title}</div>
      <div style={{ color: '#888', fontSize: '13px' }}>{subtitle}</div>
    </div>
  );
}

function SubLabel({ pillar, text }) {
  const color = PILLARS[pillar]?.color || '#dcfc1f';
  return <div className="mono-font" style={{ fontSize: '10px', color, letterSpacing: '0.2em', marginBottom: '10px', marginTop: '12px' }}>{text}</div>;
}

function PracticeCard({ pillar, icon, title, subtitle, duration, prompt, done, onComplete, actionLabel }) {
  const p = PILLARS[pillar];
  return (
    <div style={{ background: '#111', border: `1px solid ${done ? p.color : '#2a2a2a'}`, borderRadius: '14px', padding: '16px', marginBottom: '10px', opacity: done ? 0.6 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <div style={{ fontSize: '24px' }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '14px' }}>{title}</div>
          <div style={{ fontSize: '11px', color: '#888' }}>{subtitle} · {duration}</div>
        </div>
        {done && <Check size={18} color={p.color} />}
      </div>
      <div className="serif-font" style={{ fontSize: '13px', fontStyle: 'italic', color: '#aaa', lineHeight: 1.4, marginBottom: '12px' }}>"{prompt}"</div>
      {!done && (
        <button onClick={onComplete} style={{ width: '100%', padding: '10px', background: p.color, color: '#0a0a0a', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
          {actionLabel || 'MARK COMPLETE'}
        </button>
      )}
    </div>
  );
}

function SectionLabel({ text }) {
  return <div className="mono-font" style={{ fontSize: '10px', color: '#666', letterSpacing: '0.2em', marginBottom: '10px', marginTop: '20px' }}>{text}</div>;
}

function ActionTile({ icon: Icon, label, sub, onClick }) {
  return (
    <button onClick={onClick} className="card-hover" style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '14px', padding: '16px', textAlign: 'left', cursor: 'pointer', color: '#fafafa', fontFamily: 'inherit' }}>
      <Icon size={20} color="#dcfc1f" style={{ marginBottom: '8px' }} />
      <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '10px', color: '#888' }}>{sub}</div>
    </button>
  );
}

const pillBtn = {
  width: '36px', height: '36px', borderRadius: '50%',
  background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fafafa',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
};

const navArrowBtn = {
  width: '36px', height: '36px', borderRadius: '10px',
  background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#fafafa',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
};

const chipStyle = (active, color = '#dcfc1f') => ({
  padding: '8px 12px', background: active ? color : '#1a1a1a',
  color: active ? '#0a0a0a' : '#fafafa', border: `1px solid ${active ? color : '#2a2a2a'}`,
  borderRadius: '10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
  fontFamily: 'inherit'
});

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

/* ============ WORKOUT GENERATOR ============ */
function generateWorkout(minutes, goal, level) {
  const names = {
    ironman: 'Triathlon Engine Builder', strength: 'Iron Circuit', marathon: 'Runner\'s Edge',
    weightloss: 'Metabolic Burn', mobility: 'Flow + Release', general: 'Power Pickup Circuit',
    hybrid: 'Hybrid Forge · Strength + Engine', hyrox: 'Hyrox Sim', crossfit: 'WOD: Constantly Varied',
    powerlifting: 'Big Three Builder', cycling: 'Watt Builder', yoga: 'Vinyasa Flow'
  };
  const levelMult = { beginner: 1, intermediate: 1.3, advanced: 1.6, elite: 2 };
  const mult = levelMult[level] || 1;

  if (goal === 'hybrid') return { name: names.hybrid, blocks: [
    { name: 'Dynamic warm-up', detail: 'World\'s greatest stretch', time: '4 min' },
    { name: 'Strength: Trap-bar deadlift', detail: `${Math.round(5*mult)}×4 @ 75%`, time: `${Math.round(minutes * 0.25)} min` },
    { name: 'Engine: Row intervals', detail: `${Math.round(4*mult)} × 500m`, time: `${Math.round(minutes * 0.3)} min` },
    { name: 'Strength: Weighted pull-ups', detail: `${Math.round(6*mult)}×3`, time: `${Math.round(minutes * 0.15)} min` },
    { name: 'Finisher: Burpee + run', detail: '10 + 200m × 3', time: `${Math.round(minutes * 0.2)} min` }
  ]};
  if (goal === 'hyrox') return { name: names.hyrox, blocks: [
    { name: 'Run prep', detail: '800m + drills', time: '5 min' },
    { name: 'SkiErg', detail: '1000m sub-threshold', time: `${Math.round(minutes * 0.2)} min` },
    { name: 'Run interval', detail: '1km @ race pace', time: `${Math.round(minutes * 0.2)} min` },
    { name: 'Sled push', detail: `${Math.round(50*mult)}m`, time: `${Math.round(minutes * 0.15)} min` },
    { name: 'Burpee broad jumps', detail: `${Math.round(15*mult)} reps`, time: `${Math.round(minutes * 0.15)} min` }
  ]};
  if (goal === 'crossfit') return { name: names.crossfit, blocks: [
    { name: 'Warm-up', detail: 'PVC + air squats', time: '5 min' },
    { name: 'Front squat', detail: `Build to ${level === 'beginner' ? '3RM' : '1RM'}`, time: `${Math.round(minutes * 0.35)} min` },
    { name: 'WOD: Cindy', detail: '5 PU, 10 push-ups, 15 squats AMRAP', time: `${Math.round(minutes * 0.4)} min` }
  ]};
  if (goal === 'powerlifting') return { name: names.powerlifting, blocks: [
    { name: 'Activation', detail: 'Band pull-aparts', time: '5 min' },
    { name: 'Back squat', detail: `${Math.round(5*mult)}×5 @ 80%`, time: `${Math.round(minutes * 0.4)} min` },
    { name: 'Bench press', detail: '8×3', time: `${Math.round(minutes * 0.3)} min` },
    { name: 'Barbell row', detail: '8×3', time: `${Math.round(minutes * 0.2)} min` }
  ]};
  if (goal === 'cycling') return { name: names.cycling, blocks: [
    { name: 'Spin-up', detail: 'Z2 spinning', time: '5 min' },
    { name: 'Sweet spot', detail: `${Math.round(3*mult)} × 8 min @ 90% FTP`, time: `${Math.round(minutes * 0.6)} min` },
    { name: 'Cooldown', detail: 'Easy spin', time: '5 min' }
  ]};
  if (goal === 'yoga') return { name: names.yoga, blocks: [
    { name: 'Centering', detail: 'Seated breath', time: '3 min' },
    { name: 'Sun salutation A', detail: '5 rounds', time: `${Math.round(minutes * 0.25)} min` },
    { name: 'Standing series', detail: 'Warriors + triangle', time: `${Math.round(minutes * 0.3)} min` },
    { name: 'Hip openers', detail: 'Pigeon + lizard', time: `${Math.round(minutes * 0.2)} min` },
    { name: 'Savasana', detail: 'Full rest', time: '5 min' }
  ]};

  const blocks = [
    { name: 'Dynamic warm-up', detail: 'Leg swings, lunges', time: '3 min' },
    { name: goal === 'ironman' ? 'Threshold intervals' : goal === 'strength' ? 'Goblet squats' : 'Jumping squats', detail: `${Math.round(12*mult)}×3`, time: `${Math.round(minutes * 0.3)} min` },
    { name: goal === 'marathon' ? 'Tempo run' : 'Push-ups', detail: `${Math.round(10*mult)}×3`, time: `${Math.round(minutes * 0.25)} min` },
    { name: 'Core finisher', detail: 'Plank + climbers', time: `${Math.round(minutes * 0.2)} min` },
    { name: 'Cooldown stretch', detail: 'Hips + hamstrings', time: '3 min' }
  ];
  if (minutes < 15) blocks.splice(2, 2);
  return { name: names[goal], blocks };
}

function generateAIResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('30 min') || m.includes('plan')) return "Here's the move: 15 min strength workout (HIIT circuit), then a 5-min walk to call your mom (knocks out social + physical), then 10 min reading Atomic Habits. That'll bump three pillars in one half-hour.";
  if (m.includes('overwhelm') || m.includes('stress')) return "Slow down. Right now: 2 minutes of deep breathing (spiritual), then write down 3 things you're grateful for. We're not adding to your plate today — we're emptying it. The workout can wait.";
  if (m.includes('10 min') || m.includes('only have')) return "10 min, biggest impact: send a voice note to someone you love (3 min, social), then 5-min walk outside without your phone (physical + social). Skip everything else.";
  if (m.includes('mom') || m.includes("haven't called")) return "I noticed it's been 3 weeks. Don't overthink it — send her one text right now: 'Hey mom, thinking of you. Got 10 min to call later?' Done. That's a +25 social win.";
  if (m.includes('knee') || m.includes('sore')) return "Swapping squats → glute bridges. Keeping intensity up without loading the knee.";
  if (m.includes('harder')) return "Bumping to advanced: plyo variations, 15s rest, AMRAP finisher. Let's go.";
  return "Tell me a bit more — what's pulling at you today?";
}

function generateMockHistory() {
  const history = {};
  const today = new Date();
  const activities = {
    physical: ['Hybrid Forge · 35 min', 'Iron Circuit · 22 min', 'Tempo 5K run', 'Yoga flow · 30 min', 'Sweet spot ride'],
    spiritual: ['Psalm 23 + 5min meditation', 'Morning prayer + gratitude', 'Scripture: Romans 8', '10-min meditation', 'Gratitude journal × 3'],
    mental: ['Read Atomic Habits ch.4', 'Spanish · 15 min', 'Journal entry · morning', 'Read 20 pages of Sapiens', 'Piano practice · 15 min'],
    social: ['Called Mom · 30 min', 'Phone-free dinner', 'Coffee with Jess', 'Wrote thank-you note', 'Helped neighbor with groceries']
  };
  for (let daysAgo = 0; daysAgo < 45; daysAgo++) {
    if (Math.random() > 0.7) continue;
    const d = new Date(today); d.setDate(d.getDate() - daysAgo);
    const key = d.toISOString().split('T')[0];
    const pillars = {};
    let score = 0;
    ['physical', 'spiritual', 'mental', 'social'].forEach(p => {
      if (Math.random() > 0.4) {
        pillars[p] = activities[p][Math.floor(Math.random() * activities[p].length)];
        score += 18 + Math.floor(Math.random() * 12);
      }
    });
    if (Object.keys(pillars).length > 0) history[key] = { pillars, score };
  }
  return history;
}
