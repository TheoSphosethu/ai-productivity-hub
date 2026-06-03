import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, Sparkles } from "lucide-react";

import { FeatureShell } from "@/components/feature-shell";
import { AiOutput } from "@/components/ai-output";
import { useAi } from "@/hooks/use-ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_dash/planner")({
  head: () => ({
    meta: [{ title: "AI Task Planner — Workplace AI Pro" }],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const { content, loading, generate } = useAi("planner");
  const [range, setRange] = useState<"daily" | "weekly">("daily");
  const [input, setInput] = useState("");

  return (
    <FeatureShell
      title="AI Task Planner"
      description="Generate prioritized daily or weekly schedules with productivity recommendations."
      icon={CalendarClock}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div>
            <Label className="mb-2 block">Plan type</Label>
            <div className="inline-flex rounded-lg border border-border bg-background p-1">
              {(["daily", "weekly"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition ${
                    range === r
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="tasks" className="mb-2 block">
              List your tasks and goals
            </Label>
            <Textarea
              id="tasks"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Finish quarterly report, prep client demo, 2 team 1:1s, review 3 PRs, gym, inbox zero…"
              className="min-h-[200px] resize-none"
            />
          </div>
          <Button onClick={() => generate(input, { range })} disabled={loading} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Build {range === "weekly" ? "Weekly" : "Daily"} Plan
          </Button>
        </div>
        <AiOutput content={content} loading={loading} emptyHint="Your prioritized schedule and productivity tips will appear here." />
      </div>
    </FeatureShell>
  );
}
