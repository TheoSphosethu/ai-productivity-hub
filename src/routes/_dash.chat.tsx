import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import { MessageSquare, Send, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { runAi } from "@/lib/ai.functions";
import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_dash/chat")({
  head: () => ({
    meta: [{ title: "Workplace AI Chatbot — Workplace AI Pro" }],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "How do I run a more effective stand-up meeting?",
  "Give me tips to beat procrastination today.",
  "How should I prioritize a long to-do list?",
];

function ChatPage() {
  const call = useServerFn(runAi);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await call({
        data: { feature: "chat", prompt: content, history: messages.slice(-12) },
      });
      if (res.ok) {
        setMessages([...next, { role: "assistant", content: res.content }]);
      } else {
        toast.error(res.error);
        setMessages(messages);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-3xl flex-col gap-4 p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Workplace AI Chatbot</h1>
          <p className="text-sm text-muted-foreground">
            Ask anything about productivity and workplace tasks.
          </p>
        </div>
      </div>
      <AiDisclaimer />

      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <div className="flex-1 space-y-4 overflow-auto p-4">
          {messages.length === 0 && !loading && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <Sparkles className="h-8 w-8 text-primary" />
              <p className="text-sm text-muted-foreground">
                Start a conversation or try a suggestion:
              </p>
              <div className="flex flex-col gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-lg border border-border bg-background px-4 py-2 text-sm transition hover:bg-muted"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "prose-chat border border-border bg-muted text-foreground"
                }`}
              >
                {m.role === "user" ? (
                  m.content
                ) : (
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Thinking…
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2 border-t border-border p-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the workplace assistant…"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
