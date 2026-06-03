import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

import { FeatureShell } from "@/components/feature-shell";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_dash/notes")({
  head: () => ({
    meta: [{ title: "Meeting Notes Summarizer — Workplace AI Pro" }],
  }),
  component: NotesPage,
});

function NotesPage() {
  const { content, loading, generate } = useAi("notes");
  const [input, setInput] = useState("");

  return (
    <FeatureShell
      title="Meeting Notes Summarizer"
      description="Turn long meeting notes into a clean summary with key decisions, action items and deadlines."
      icon={FileText}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div>
            <Label htmlFor="notes" className="mb-2 block">
              Paste your meeting notes
            </Label>
            <Textarea
              id="notes"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the raw transcript or notes from your meeting here…"
              className="min-h-[260px] resize-none"
            />
          </div>
          <Button onClick={() => generate(input)} disabled={loading} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Summarize Notes
          </Button>
        </div>
        <AiOutput content={content} loading={loading} emptyHint="Summary, decisions, action items and deadlines will appear here." />
      </div>
    </FeatureShell>
  );
}
