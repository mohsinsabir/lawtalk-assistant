import { Scale } from "lucide-react";

const ChatHeader = () => {
  return (
    <header className="w-full border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-[900px] mx-auto px-4 py-4 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
          <Scale className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Legal Assistant</h1>
          <p className="text-sm text-muted-foreground">Pakistan Penal Code Reference</p>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
