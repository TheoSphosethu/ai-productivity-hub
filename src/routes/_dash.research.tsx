import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

import { FeatureShell } from "@/components/feature-shell";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_dash/research")({
  head: () => ({
    meta: [{ title: "AI Research Assistant — Workplace AI Pro" }],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const { content, loading, generate } = useAi("research");
  const [input, setInput] = useState("");

  return (
    <FeatureShell
      title="AI Research Assistant"
      description="Summarize topics or articles and surface insights, risks, opportunities and recommendations."
      icon={Search}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div>
            <Label htmlFor="topic" className="mb-2 block">
              Topic or article text
            </Label>
            <Textarea
              id="topic"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a topic to research (e.g. 'Impact of AI agents on customer support') or paste an article to analyze…"
              className="min-h-[240px] resize-none"
            />
          </div>
          <Button onClick={() => generate(input)} disabled={loading} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Research & Analyze
          </Button>
        </div>
        <AiOutput content={content} loading={loading} emptyHint="Summary, insights, risks, opportunities and recommendations will appear here." />
      </div>
    </FeatureShell>
  );
}
