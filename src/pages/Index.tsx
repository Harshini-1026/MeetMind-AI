import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHome from "@/components/DashboardHome";
import LiveRecording from "@/components/LiveRecording";
import UploadFile from "@/components/UploadFile";
import Diarization from "@/components/Diarization";
import Summary from "@/components/Summary";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

  const renderModule = () => {
    switch (activeModule) {
      case "recording":
        return <LiveRecording />;
      case "upload":
        return <UploadFile />;
      case "diarization":
        return <Diarization />;
      case "summary":
        return <Summary />;
      default:
        return <DashboardHome onModuleChange={setActiveModule} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderModule()}
      </main>
    </div>
  );
};

export default Index;
