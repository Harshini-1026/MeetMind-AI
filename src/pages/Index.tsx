import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingDock from "@/components/FloatingDock";
import BentoDashboard from "@/components/BentoDashboard";
import LiveRecordingView from "@/components/LiveRecordingView";
import UploadFileView from "@/components/UploadFileView";
import DiarizationView from "@/components/DiarizationView";
import SummaryView from "@/components/SummaryView";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const goBack = () => setActiveModule("dashboard");

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeModule === "dashboard" && <BentoDashboard onModuleChange={setActiveModule} />}
            {activeModule === "recording" && <LiveRecordingView onBack={goBack} />}
            {activeModule === "upload" && <UploadFileView onBack={goBack} />}
            {activeModule === "diarization" && <DiarizationView onBack={goBack} />}
            {activeModule === "summary" && <SummaryView onBack={goBack} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <FloatingDock activeModule={activeModule} onModuleChange={setActiveModule} />
    </div>
  );
};

export default Index;
