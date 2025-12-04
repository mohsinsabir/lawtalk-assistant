import React, { useState, useRef, useEffect, KeyboardEvent } from "react";

const API_URL = "https://mohsin65-ppc-legal-assistant-api.hf.space/chat";

type Role = "user" | "assistant";

type ChatMessage = {
  role: Role;
  content: string;
};

function parseLegalReply(reply: string) {
  // Try to extract what’s between “Law Reference:” and “Punishment:”
  const lawRefMatch = reply.match(/Law Reference:\s*([\s\S]*?)\n\s*Punishment:/i);
  const lawReference = lawRefMatch
    ? lawRefMatch[1].trim()
    : reply.split("Punishment:")[0].trim();

  const punishmentPart = reply.split(/Punishment:/i)[1] || "";
  const punishment = punishmentPart.trim();

  return { lawReference, punishment };
}

type AiMessageCardProps = {
  reply: string;
  lastUserQuestion: string;
};

const AiMessageCard: React.FC<AiMessageCardProps> = ({
  reply,
  lastUserQuestion,
}) => {
  const { lawReference, punishment } = parseLegalReply(reply);

  return (
    <div className="bg-slate-900 rounded-2xl p-5 shadow-lg space-y-4 max-w-3xl w-full">
      {/* User asked */}
      <div className="text-xs text-slate-400">
        <span className="font-semibold text-slate-200">User asked: </span>
        <span>{lastUserQuestion}</span>
      </div>

      {/* Law Reference */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span role="img" aria-label="law">
            📘
          </span>
          <span className="font-semibold">Law Reference</span>
        </div>
        <p className="text-sm font-semibold text-slate-100">
          {lawReference || "No section found."}
        </p>
      </div>

      {/* Punishment */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span role="img" aria-label="punishment">
            📄
          </span>
          <span className="font-semibold">Punishment</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-100">
          {punishment || "No punishment details available."}
        </p>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: trimmed }],
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const replyText: string = data.reply ?? "";

      const aiMessage: ChatMessage = {
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        role: "assistant",
        content:
          "Law Reference:\nUnable to fetch legal section.\n\nPunishment:\nThere was an error contacting the legal assistant API. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-xl">
            ⚖️
          </div>
          <div>
            <h1 className="text-lg font-semibold">Legal Assistant</h1>
            <p className="text-xs text-slate-400">
              Pakistan Penal Code Reference
            </p>
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col items-center px-4 md:px-6 py-6">
        <div className="w-full max-w-4xl flex-1 flex flex-col gap-4">
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((m, idx) => {
              if (m.role === "user") {
                return (
                  <div
                    key={idx}
                    className="flex justify-end text-sm text-slate-100"
                  >
                    <div className="max-w-3xl bg-blue-600 rounded-2xl px-4 py-2 shadow">
                      {m.content}
                    </div>
                  </div>
                );
              }

              // assistant message
              const lastUserBefore = [...messages]
                .slice(0, idx)
                .reverse()
                .find((x) => x.role === "user");

              return (
                <div key={idx} className="flex justify-start">
                  <AiMessageCard
                    reply={m.content}
                    lastUserQuestion={lastUserBefore?.content || ""}
                  />
                </div>
              );
            })}

            {loading && (
              <div className="text-xs text-slate-400">Thinking…</div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-slate-800 pt-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
              <textarea
                className="w-full bg-transparent outline-none resize-none text-sm text-slate-100 placeholder:text-slate-500"
                rows={2}
                placeholder="Type your legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  🗑️ Clear
                </button>
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="px-4 py-2 rounded-full bg-blue-600 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-500">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
