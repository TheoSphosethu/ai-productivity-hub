import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  feature: z.enum([
    "email",
    "notes",
    "planner",
    "research",
    "chat",
    "prompt",
  ]),
  prompt: z.string().min(1).max(12000),
  options: z.record(z.string(), z.string()).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(12000),
      }),
    )
    .max(40)
    .optional(),
});

type AiInput = z.infer<typeof inputSchema>;

function systemPrompt(input: AiInput): string {
  const base =
    "You are an enterprise-grade AI workplace productivity assistant. Be clear, concise, well-structured, and professional. Use markdown formatting (headings, bold, lists) so the output is easy to scan.";

  switch (input.feature) {
    case "email": {
      const tone = input.options?.tone ?? "Professional";
      return `${base}\n\nTask: Write a workplace email in a ${tone} tone based on the user's request.\nReturn this exact markdown structure:\n## Subject Lines\n- (3 compelling subject line options)\n## Full Email\n(complete, ready-to-send email)\n## Short Version\n(a concise 2-3 sentence version)`;
    }
    case "notes":
      return `${base}\n\nTask: Summarize the meeting notes provided. Return this exact markdown structure:\n## Summary\n(2-4 sentence overview)\n## Key Decisions\n(bullet list)\n## Action Items\n(bullet list with owner if mentioned)\n## Deadlines\n(bullet list of dates/timeframes, or "None identified")`;
    case "planner": {
      const range = input.options?.range ?? "daily";
      return `${base}\n\nTask: Create a ${range} schedule from the user's tasks/goals. Return this markdown structure:\n## Prioritized Tasks\n(ordered by priority with High/Medium/Low labels)\n## ${range === "weekly" ? "Weekly Schedule" : "Daily Schedule"}\n(time-blocked plan)\n## Productivity Tips\n(3-5 tailored suggestions)`;
    }
    case "research":
      return `${base}\n\nTask: Research and summarize the topic or article provided. Return this markdown structure:\n## Summary\n## Key Insights\n## Risks\n## Opportunities\n## Recommendations`;
    case "prompt":
      return `${base}\n\nTask: Improve the user's weak AI prompt into a high-quality, high-precision prompt. Return this markdown structure:\n## Optimized Prompt\n(the improved prompt in a code block)\n## Why It's Better\n(bullet list explaining the improvements: clarity, context, role, constraints, output format)`;
    case "chat":
    default:
      return `${base}\n\nYou are a friendly, knowledgeable workplace assistant chatbot. Answer questions about productivity, workplace processes, communication, planning, and professional tasks. Keep answers practical and actionable.`;
  }
}

export const runAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI is not configured." };
    }

    const messages: { role: string; content: string }[] = [
      { role: "system", content: systemPrompt(data) },
    ];
    if (data.history?.length) {
      messages.push(...data.history);
    }
    messages.push({ role: "user", content: data.prompt });

    try {
      const res = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages,
          }),
        },
      );

      if (res.status === 429) {
        return {
          ok: false as const,
          error: "Rate limit reached. Please wait a moment and try again.",
        };
      }
      if (res.status === 402) {
        return {
          ok: false as const,
          error: "AI credits exhausted. Please add credits to continue.",
        };
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { ok: false as const, error: "The AI service returned an error." };
      }

      const json = await res.json();
      const content: string =
        json.choices?.[0]?.message?.content ?? "No response generated.";
      return { ok: true as const, content };
    } catch (err) {
      console.error("AI request failed", err);
      return { ok: false as const, error: "Could not reach the AI service." };
    }
  });
