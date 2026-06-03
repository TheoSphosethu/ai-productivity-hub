import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Sparkles } from "lucide-react";

import { FeatureShell } from "@/components/feature-shell";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_dash/email")({
  head: () => ({
    meta: [{ title: "Smart Email Generator — Workplace AI Pro" }],
  }),
  component: EmailPage,
});

const tones = ["Professional", "Friendly", "Persuasive", "Apologetic"] as const;

function EmailPage() {
  const { content, loading, generate } = useAi("email");
  const [tone, setTone] = useState<(typeof tones)[number]>("Professional");
  const [input, setInput] = useState("");

  return (
    <FeatureShell
      title="Smart Email Generator"
      description="Generate polished, ready-to-send professional emails with subject lines and a short version."
      icon={Mail}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div>
            <Label className="mb-2 block">Tone</Label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                    tone === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="brief" className="mb-2 block">
              What is the email about?
            </Label>
            <Textarea
              id="brief"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Ask the design team for updated mockups by Friday and thank them for the quick turnaround last week."
              className="min-h-[180px] resize-none"
            />
          </div>
          <Button
            onClick={() => generate(input, { tone })}
            disabled={loading}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Generate Email
          </Button>
        </div>
        <AiOutput content={content} loading={loading} emptyHint="Your generated email, subject lines and short version will appear here." />
      </div>
    </FeatureShell>
  );
}
