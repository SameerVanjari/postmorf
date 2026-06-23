import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  Globe,
  Lightbulb,
  Save,
  Send,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { PlatformAccountSelector } from "@/components/PlatformAccountSelector";
import { PostEditor } from "@/components/PostEditor";
import { useAccounts } from "@/hooks/use-posts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Tone = "professional" | "casual" | "educational" | "provocative";
const TONES: { value: Tone; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "educational", label: "Educational" },
  { value: "provocative", label: "Provocative" },
];

export const Route = createFileRoute("/editor")({
  component: EditorPage,
});

function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState<Tone>("professional");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("");
  const { data: accounts = [] } = useAccounts();

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Dashboard
            </span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">Editor</span>
          </div>
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight">
            Editor Workspace
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Send className="h-3.5 w-3.5" />
            Finalize
          </Button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-[1fr_280px] gap-8">
        {/* Editor area */}
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-border text-[18px] font-semibold h-12 px-4 placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary/20"
          />

          <PostEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing... Markdown is supported."
            minHeight="min-h-[420px]"
          />

          {/* Editor footer metadata */}
          {content.trim() && (
            <div className="flex items-center justify-between text-[12px] text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>{wordCount} Words</span>
                <span>Reading time: {readTime}s</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                <Clock className="h-3 w-3" />
                Draft
              </span>
            </div>
          )}
        </div>

        {/* Sidebar panels */}
        <div className="flex flex-col gap-4">
          {/* Platforms */}
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  Platforms
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <PlatformAccountSelector
                selected={selectedPlatforms}
                onChange={setSelectedPlatforms}
                accounts={accounts}
              />
            </CardContent>
          </Card>

          {/* Tone selector */}
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Type className="h-3.5 w-3.5 text-muted-foreground" />
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  Tone
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-2">
                {TONES.map((tone) => (
                  <button
                    key={tone.value}
                    type="button"
                    onClick={() => setSelectedTone(tone.value)}
                    className={cn(
                      "w-full rounded-md border px-3 py-2 text-left text-[13px] font-medium transition-colors",
                      selectedTone === tone.value
                        ? "border-primary/30 bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  Schedule
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">
                  Publish Date
                </label>
                <Input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="h-9 text-[13px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-muted-foreground">
                  Publish Time
                </label>
                <Input
                  type="time"
                  value={publishTime}
                  onChange={(e) => setPublishTime(e.target.value)}
                  className="h-9 text-[13px]"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full gap-1.5 text-[12px]"
              >
                <Sparkles className="h-3 w-3" />
                Optimize Time
              </Button>
            </CardContent>
          </Card>

          <Separator />

          {/* AI Insights */}
          <Card className="border-border shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  AI Insights
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="rounded-md bg-primary/5 border border-primary/10 p-3">
                <div className="flex items-start gap-2">
                  <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    This post tone is currently{" "}
                    <span className="font-medium text-foreground">
                      85% Professional
                    </span>
                    . Adding a personal anecdote could increase engagement by
                    12%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
