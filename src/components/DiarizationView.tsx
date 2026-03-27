import { motion } from "framer-motion";
import { Users, User, ArrowLeft } from "lucide-react";

interface DiarizationViewProps {
  onBack: () => void;
}

const speakers = [
  { id: 1, name: "Speaker 1", segments: 12, duration: "8m 42s", pct: 35 },
  { id: 2, name: "Speaker 2", segments: 9, duration: "6m 15s", pct: 25 },
  { id: 3, name: "Speaker 3", segments: 15, duration: "10m 03s", pct: 40 },
];

const speakerColors = ["hsl(37,40%,52%)", "hsl(130,22%,40%)", "hsl(63,43%,45%)"];

const timeline = [
  { s: 1, t: "00:00 – 02:15", text: "Let's kick off the meeting. Today we'll be discussing Q3 results and the roadmap for Q4..." },
  { s: 2, t: "02:15 – 05:30", text: "Thanks. Looking at the numbers, we've seen a 15% increase in user engagement..." },
  { s: 3, t: "05:30 – 08:12", text: "That aligns with what we saw on the product side. The new features launched in July..." },
  { s: 1, t: "08:12 – 10:45", text: "Great insights. Let me now share the customer feedback we've been collecting..." },
  { s: 2, t: "10:45 – 14:00", text: "I'd also like to add that the support tickets have decreased by 20%..." },
  { s: 3, t: "14:00 – 18:30", text: "For Q4, I propose we focus on three key areas: performance, onboarding, and integrations..." },
];

const DiarizationView = ({ onBack }: DiarizationViewProps) => {
  return (
    <div className="pb-24">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Hub
      </button>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h2 className="text-3xl font-heading font-extrabold text-foreground">Speaker Diarization</h2>
          <p className="text-muted-foreground text-sm mt-1">Identify who said what in your meeting</p>
        </div>

        {/* Speaker overview bar */}
        <div className="rounded-3xl bento-glass noise-overlay p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-camel-DEFAULT" />
            <span className="text-sm font-medium text-muted-foreground">Conversation Distribution</span>
          </div>
          <div className="flex h-4 rounded-full overflow-hidden gap-1">
            {speakers.map((sp, i) => (
              <motion.div
                key={sp.id}
                initial={{ width: 0 }}
                animate={{ width: `${sp.pct}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ backgroundColor: speakerColors[i] }}
              />
            ))}
          </div>
          <div className="flex gap-6 mt-4">
            {speakers.map((sp, i) => (
              <div key={sp.id} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: speakerColors[i] }} />
                <span className="text-xs text-muted-foreground">{sp.name} · {sp.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Speaker cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {speakers.map((sp, i) => (
            <motion.div
              key={sp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="rounded-2xl bento-glass noise-overlay p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${speakerColors[i]}15`, border: `2px solid ${speakerColors[i]}` }}
                >
                  <User className="w-4 h-4" style={{ color: speakerColors[i] }} />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">{sp.name}</p>
                  <p className="text-xs text-muted-foreground">{sp.segments} segments</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Duration: <span className="text-foreground font-medium">{sp.duration}</span></p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <h3 className="text-lg font-heading font-bold text-foreground mb-3">Timeline</h3>
          {timeline.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.06 }}
              className="rounded-2xl bento-glass p-4 flex gap-4 group hover:border-border/80 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  backgroundColor: `${speakerColors[entry.s - 1]}15`,
                  color: speakerColors[entry.s - 1],
                  border: `2px solid ${speakerColors[entry.s - 1]}`,
                }}
              >
                S{entry.s}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold" style={{ color: speakerColors[entry.s - 1] }}>Speaker {entry.s}</span>
                  <span className="text-xs text-muted-foreground">{entry.t}</span>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed">{entry.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DiarizationView;
