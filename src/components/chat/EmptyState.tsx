import { Scale, BookOpen, MessageSquare } from "lucide-react";

interface EmptyStateProps {
  onSendQuestion: (question: string) => void;
}

const sampleQuestions = [
  { icon: BookOpen, text: "What is the punishment for theft?" },
  { icon: MessageSquare, text: "Explain Section 302 of PPC" },
  { icon: Scale, text: "What constitutes criminal negligence?" },
];

const EmptyState = ({ onSendQuestion }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center px-4 animate-fade-in">
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
        {sampleQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSendQuestion(question.text)}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border text-left hover:bg-accent hover:border-primary/50 transition-all duration-200 cursor-pointer group"
          >
            <question.icon className="w-5 h-5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground">
              {question.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
