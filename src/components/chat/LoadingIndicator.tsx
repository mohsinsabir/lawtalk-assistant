import { Bot } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ai-bubble flex items-center justify-center border border-border">
          <Bot className="w-4 h-4 text-primary animate-pulse-soft" />
        </div>
        <div className="bg-ai-bubble rounded-2xl rounded-tl-sm px-4 py-3 border border-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-sm text-muted-foreground ml-2">Analyzing legal reference...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
