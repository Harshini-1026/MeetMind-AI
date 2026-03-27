import { motion } from "framer-motion";
import { FileText, Users, Clock, Calendar, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";

interface SummaryViewProps {
  onBack: () => void;
}

const meeting = {
  name: "Q3 Business Review & Q4 Planning",
  date: "March 25, 2026",
  duration: "24 min 58 sec",
  persons: 3,
  executive:
    "The team reviewed Q3 performance metrics showing a 15% increase in user engagement and a 20% decrease in support tickets. Three key focus areas were identified for Q4: platform performance optimization, onboarding flow improvements, and third-party integrations. Action items were assigned with deadlines set for mid-April.",
  sections: [
    {
      topic: "Q3 Performance Review",
      points: [
        "User engagement increased by 15% compared to Q2",
        "Support tickets decreased by 20% following UX improvements",
        "New features launched in July contributed to higher retention rates",
        "Customer satisfaction scores improved to 4.6/5.0",
      ],
    },
    {
      topic: "Q4 Roadmap Priorities",
      points: [
        "Performance optimization — reduce load times by 30%",
        "Redesign onboarding flow for new users",
        "Build integrations with Slack, Jira, and Notion",
        "Launch premium tier with advanced analytics",
      ],
    },
    {
      topic: "Action Items",
      points: [
        "Speaker 1: Compile customer feedback report by April 5",
        "Speaker 2: Draft Q4 marketing plan by April 10",
        "Speaker 3: Prepare technical roadmap and resource allocation by April 15",
      ],
    },
  ],
};

const SummaryView = ({ onBack }: SummaryViewProps) => {
  return (
    <div className="pb-24">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Hub
      </button>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Meeting header */}
        <div className="rounded-3xl bento-glass noise-overlay p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-camel-DEFAULT" />
            <span className="text-xs font-medium text-camel-DEFAULT tracking-wider uppercase">AI Generated Summary</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground">{meeting.name}</h2>
          <div className="flex flex-wrap gap-5 mt-5">
            {[
              { icon: Calendar, text: meeting.date },
              { icon: Clock, text: meeting.duration },
              { icon: Users, text: `${meeting.persons} Participants` },
            ].map((meta, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <meta.icon className="w-4 h-4 text-camel-DEFAULT" />
                {meta.text}
              </div>
            ))}
          </div>
        </div>

        {/* Executive summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bento-glass noise-overlay p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl gradient-gold-bright flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-heading font-bold text-foreground">Executive Summary</h3>
          </div>
          <p className="text-foreground/80 leading-relaxed text-[15px]">{meeting.executive}</p>
        </motion.div>

        {/* Detailed sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meeting.sections.map((section, i) => (
            <motion.div
              key={section.topic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-2xl bento-glass noise-overlay p-6 flex flex-col"
            >
              <h4 className="font-heading font-bold text-camel-DEFAULT text-sm mb-4 tracking-wide">{section.topic}</h4>
              <ul className="space-y-3 flex-1">
                {section.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-foreground/75 leading-relaxed">
                    <ChevronRight className="w-3.5 h-3.5 text-olive mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SummaryView;
