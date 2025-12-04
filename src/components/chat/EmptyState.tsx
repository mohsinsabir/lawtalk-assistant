import { Scale, BookOpen, MessageSquare } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
        <Scale className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Welcome to Legal Assistant
      </h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Ask me about Pakistan Penal Code sections, legal definitions, or punishments for various offenses.
      </p>
      
      <div className="grid gap-3 w-full max-w-md">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-left">
          <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground/80">
            "What is the punishment for theft?"
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-left">
          <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground/80">
            "Explain Section 302 of PPC"
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-left">
          <Scale className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground/80">
            "What constitutes criminal negligence?"
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
