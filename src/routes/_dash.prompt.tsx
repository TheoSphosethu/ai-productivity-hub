import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wand2, Sparkles } from "lucide-react";

import { FeatureShell } from "@/components/feature-shell";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_dash/prompt")({
  head: () => ({
    meta: [{ title: "AI Prompt Optimizer — Workplace AI Pro" }],
  }),
  component: PromptPage,
});

function PromptPage() {
  const { content, loading, generate } = useAi("prompt");
  const [input, setInput] = useState("");

  return (
    <FeatureShell
      title="AI Prompt Optimizer"
      description="Transform weak prompts into high-quality AI instructions — and learn why they work better."
      icon={Wand2}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div>
            <Label htmlFor="weak" className="mb-2 block">
              Your current prompt
            </Label>
            <Textarea
              id="weak"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. write something about marketing"
              className="min-h-[200px] resize-none"
            />
          </div>
          <Button onClick={() => generate(input)} disabled={loading} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Optimize Prompt
          </Button>
        </div>
        <AiOutput content={content} loading={loading} emptyHint="Your optimized prompt and an explanation will appear here." />
      </div>
    </FeatureShell>
  );
}
