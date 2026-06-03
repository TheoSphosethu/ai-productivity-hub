import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AiOutputProps {
  content: string;
  loading: boolean;
  emptyHint?: string;
}

export function AiOutput({ content, loading, emptyHint }: AiOutputProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Output
        </div>
        {content && !loading && (
          <Button size="sm" variant="ghost" onClick={copy} className="h-8 gap-1.5">
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </Button>
        )}
      </div>
      <div className="min-h-[260px] flex-1 overflow-auto p-5">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <p className="text-sm">Generating with AI…</p>
          </div>
        ) : content ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose-chat max-w-none text-sm text-foreground/90"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            {emptyHint ?? "Your AI-generated result will appear here."}
          </div>
        )}
      </div>
    </div>
  );
}
