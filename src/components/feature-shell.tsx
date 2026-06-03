import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { AiDisclaimer } from "@/components/ai-disclaimer";

interface FeatureShellProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
}

export function FeatureShell({
  title,
  description,
  icon: Icon,
  children,
}: FeatureShellProps) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500 mx-auto flex w-full max-w-6xl flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <AiDisclaimer />
      {children}
    </div>
  );
}
