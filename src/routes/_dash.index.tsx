import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  CalendarClock,
  Search,
  MessageSquare,
  Wand2,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { AiDisclaimer } from "@/components/ai-disclaimer";

export const Route = createFileRoute("/_dash/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant Pro" },
      {
        name: "description",
        content:
          "Your AI productivity command center. Automate emails, notes, planning, research and more.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tasks Automated", value: "1,284", change: "+12.5%", icon: Zap },
  { label: "Hours Saved", value: "342h", change: "+8.2%", icon: Clock },
  { label: "AI Generations", value: "5,910", change: "+23.1%", icon: TrendingUp },
  { label: "Completion Rate", value: "96%", change: "+1.4%", icon: CheckCircle2 },
];

const chartData = [
  { d: "Mon", v: 32 },
  { d: "Tue", v: 48 },
  { d: "Wed", v: 41 },
  { d: "Thu", v: 67 },
  { d: "Fri", v: 84 },
  { d: "Sat", v: 39 },
  { d: "Sun", v: 58 },
];

const tools = [
  {
    title: "Smart Email Generator",
    desc: "Draft professional emails in any tone with subject lines.",
    url: "/email",
    icon: Mail,
  },
  {
    title: "Meeting Notes Summarizer",
    desc: "Extract decisions, action items and deadlines instantly.",
    url: "/notes",
    icon: FileText,
  },
  {
    title: "AI Task Planner",
    desc: "Build prioritized daily and weekly schedules.",
    url: "/planner",
    icon: CalendarClock,
  },
  {
    title: "AI Research Assistant",
    desc: "Summarize topics with insights, risks and opportunities.",
    url: "/research",
    icon: Search,
  },
  {
    title: "Workplace AI Chatbot",
    desc: "Ask anything about productivity and workplace tasks.",
    url: "/chat",
    icon: MessageSquare,
  },
  {
    title: "AI Prompt Optimizer",
    desc: "Turn weak prompts into high-quality AI instructions.",
    url: "/prompt",
    icon: Wand2,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500 overflow-hidden rounded-2xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant sm:p-8">
        <p className="text-sm font-medium opacity-90">Welcome back 👋</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl text-primary-foreground">
          Your AI Productivity Command Center
        </h1>
        <p className="mt-2 max-w-xl text-sm opacity-90">
          Automate workplace tasks, write faster, plan smarter and make better
          decisions — all powered by responsible AI.
        </p>
        <Link
          to="/email"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-background/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-background/25"
        >
          Start automating <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500 rounded-xl border border-border bg-card p-4 shadow-card"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <s.icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-xs font-medium text-success">{s.change}</span>
            </div>
            <p className="mt-3 text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Weekly AI Activity</h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="d"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="var(--color-muted-foreground)"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--color-primary)"
                strokeWidth={2.5}
                fill="url(#g)"
                name="Generations"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col justify-center rounded-xl border border-border bg-card p-5 shadow-card">
          <h2 className="mb-3 text-base font-semibold">Responsible AI</h2>
          <AiDisclaimer />
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">AI Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <Link
              key={t.title}
              to={t.url}
              style={{ animationDelay: `${i * 50}ms` }}
              className="animate-in fade-in-0 slide-in-from-bottom-3 fill-mode-both duration-500 group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent transition group-hover:bg-gradient-primary">
                <t.icon className="h-5 w-5 text-accent-foreground transition group-hover:text-primary-foreground" />
              </div>
              <h3 className="mt-3 font-semibold">{t.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open{" "}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
