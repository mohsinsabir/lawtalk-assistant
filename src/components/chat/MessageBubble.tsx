import { BookOpen, Gavel, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

// Parse AI response to extract law reference and punishment
const parseAIResponse = (content: string) => {
  // Try to find "Section XXX" pattern
  const sectionMatch = content.match(/Section\s+(\d+[A-Z]?)\s*[–-]\s*([^\n]+)/i);
  
  if (sectionMatch) {
    const sectionNumber = sectionMatch[1];
    const sectionTitle = sectionMatch[2].trim();
    
    // Get the rest as punishment/description
    const afterSection = content.substring(content.indexOf(sectionMatch[0]) + sectionMatch[0].length).trim();
    
    return {
      hasStructure: true,
      section: `Section ${sectionNumber} – ${sectionTitle}`,
      punishment: afterSection || "No additional details provided.",
    };
  }
  
  // If no section pattern found, return as plain text
  return {
    hasStructure: false,
    content: content,
  };
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="flex items-start gap-3 max-w-[80%]">
          <div className="bg-user-bubble text-user-bubble-foreground rounded-2xl rounded-tr-sm px-4 py-3 shadow-soft">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-user-bubble/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    );
  }

  const parsed = parseAIResponse(message.content);

  return (
    <div className="flex justify-start animate-slide-up">
      <div className="flex items-start gap-3 max-w-[85%]">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ai-bubble flex items-center justify-center border border-border">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        
        {parsed.hasStructure ? (
          <div className="space-y-3">
            {/* Law Reference Card */}
            <div className="bg-law-card border border-law-card-border/30 rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  📘 Law Reference
                </span>
              </div>
              <p className="text-foreground font-medium">{parsed.section}</p>
            </div>
            
            {/* Punishment Card */}
            <div className="bg-punishment-card border border-punishment-card-border/30 rounded-xl p-4 shadow-soft">
              <div className="flex items-center gap-2 mb-2">
                <Gavel className="w-4 h-4 text-destructive" />
                <span className="text-xs font-semibold text-destructive uppercase tracking-wide">
                  🔨 Punishment
                </span>
              </div>
              <p className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
                {parsed.punishment}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-ai-bubble text-ai-bubble-foreground rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft border border-border">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{parsed.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
