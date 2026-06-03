import { ShieldAlert } from "lucide-react";

export function AiDisclaimer() {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-warning/30 bg-warning/10 px-3.5 py-2.5 text-xs text-foreground/80">
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
      <p className="leading-relaxed">
        <span className="font-semibold">Responsible AI:</span> AI can make
        mistakes. Always review and verify outputs before use. Do not enter
        confidential, personal, or sensitive company information.
      </p>
    </div>
  );
}
