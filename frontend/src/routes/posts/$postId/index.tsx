import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Share2, Trash2 } from "lucide-react";
import { PostStatusBadge } from "@/components/PostStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { usePost } from "@/hooks/use-posts";
import { marked } from "marked";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetailPage,
});

function renderMarkdown(content: string): string {
  const html = marked.parse(content, { async: false }) as string;
  return html
    .replace(/<h1/g, '<h1 class="text-[22px] font-semibold leading-tight tracking-tight mt-8 mb-3 first:mt-0"')
    .replace(/<h2/g, '<h2 class="text-[18px] font-semibold leading-snug mt-6 mb-2"')
    .replace(/<h3/g, '<h3 class="text-[16px] font-semibold leading-snug mt-5 mb-2"')
    .replace(/<p>/g, '<p class="text-[14px] leading-relaxed text-foreground/85 mb-4">')
    .replace(/<ul/g, '<ul class="list-disc pl-6 mb-4 space-y-1"')
    .replace(/<ol/g, '<ol class="list-decimal pl-6 mb-4 space-y-1"')
    .replace(/<li/g, '<li class="text-[14px] leading-relaxed text-foreground/85"')
    .replace(/<strong/g, '<strong class="font-semibold text-foreground"')
    .replace(/<em/g, '<em class="italic"')
    .replace(/<blockquote/g, '<blockquote class="border-l-2 border-primary/30 pl-4 italic text-muted-foreground mb-4"')
    .replace(/<code>/g, '<code class="rounded bg-muted px-1.5 py-0.5 text-[13px] font-mono">')
    .replace(/<pre/g, '<pre class="rounded-md bg-muted p-4 text-[13px] font-mono overflow-auto mb-4"')
    .replace(/<hr/g, '<hr class="my-6 border-border"')
    .replace(/<a /g, '<a class="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary" ');
}

function PostDetailPage() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-[1fr_280px] gap-8">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col gap-4">
            <Card className="border-border">
              <CardContent className="pt-5">
                <Skeleton className="h-16" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-lg font-semibold">Post not found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The post you're looking for doesn't exist.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/posts">Back to Posts</Link>
          </Button>
        </div>
      </div>
    );
  }

  const createdDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedLabel =
    post.updatedAt !== post.createdAt
      ? ` · Updated ${new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`
      : "";

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <div className="mb-10 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-[28px] font-semibold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Created {createdDate}{updatedLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link to="/posts/$postId/edit" params={{ postId: post.id }}>
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-3.5 w-3.5" />
            Share
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-8">
        <div>
          <div
            className="markdown-body"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: rendered via marked
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(post.content),
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <PostStatusBadge status={post.status} />
          </div>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-[13px] font-medium text-muted-foreground">
                Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {post.platforms.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-[12px] capitalize text-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {post.tags.length > 0 && (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[12px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {post.sourcePostId && (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[12px] text-muted-foreground">
                  Generated from source post
                </p>
              </CardContent>
            </Card>
          )}

          {post.scheduledAt && (
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-[13px] font-medium text-muted-foreground">
                  Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] text-amber-600 dark:text-amber-400">
                  {new Date(post.scheduledAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          )}

          <Separator />
        </div>
      </div>
    </div>
  );
}
