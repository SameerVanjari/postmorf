import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSourcePosts } from "@/hooks/use-posts";

export const Route = createFileRoute("/sources")({
  component: SourcesPage,
});

function SourcesPage() {
  const { data: sources, isLoading } = useSourcePosts();
  const sourceList = sources ?? [];

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <PageHeader
        title="Source Posts"
        description="Import content to generate posts."
      />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton count
            <Card key={`skel-${i}`} className="border-border">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : sourceList.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-8 py-16 text-center">
          <h3 className="text-[15px] font-semibold">No source content</h3>
          <p className="mt-1 mb-4 text-[13px] text-muted-foreground">
            Import articles, newsletters, or RSS feeds.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sourceList.map((source) => (
            <Card
              key={source.id}
              className="border-border transition-colors hover:bg-muted/50"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-[15px] font-semibold leading-snug tracking-tight">
                    {source.title}
                  </CardTitle>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                  {source.content}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[12px] text-muted-foreground">
                  <span className="inline-flex items-center rounded-md border border-border bg-background px-1.5 py-0.5 text-[11px] uppercase">
                    {source.platform}
                  </span>
                  <span>
                    Imported{" "}
                    {new Date(source.importedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
        <h3 className="text-[15px] font-semibold">Connect a new source</h3>
        <p className="mt-1 mb-4 text-[13px] text-muted-foreground">
          Import content from URLs, RSS feeds, or newsletters.
        </p>
        <Button asChild variant="outline" size="sm">
          <Link to="/connect">Connect Account</Link>
        </Button>
      </div>
    </div>
  );
}
