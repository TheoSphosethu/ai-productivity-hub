import { useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { runAi } from "@/lib/ai.functions";

type Feature = "email" | "notes" | "planner" | "research" | "chat" | "prompt";

export function useAi(feature: Feature) {
  const call = useServerFn(runAi);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = useCallback(
    async (prompt: string, options?: Record<string, string>) => {
      if (!prompt.trim()) {
        toast.error("Please enter some input first.");
        return;
      }
      setLoading(true);
      setContent("");
      try {
        const res = await call({ data: { feature, prompt, options } });
        if (res.ok) {
          setContent(res.content);
        } else {
          toast.error(res.error);
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [call, feature],
  );

  return { content, loading, generate };
}
