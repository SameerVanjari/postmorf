import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { PostStatusBadge } from "@/components/PostStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { usePost, useUpdatePost } from "@/hooks/use-posts";

export const Route = createFileRoute("/posts/$postId/edit")({
  component: EditPostPage,
});

function EditPostPage() {
  const { postId } = Route.useParams();
  const { data: post, isLoading, error } = usePost(postId);
  const updatePost = useUpdatePost();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-8 flex items-center gap-4">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="max-w-2xl flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  if (!post || error) {
    return (
      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-lg font-semibold">Post not found</h2>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/posts">Back to Posts</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updatePost.mutate({ id: post.id, title, content });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-[24px] font-semibold leading-tight tracking-tight">
            Edit Post
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <PostStatusBadge status={post.status} />
            <span className="text-sm text-muted-foreground">
              Last updated{" "}
              {new Date(post.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
        <Button
          className="gap-1.5"
          onClick={handleSave}
          disabled={updatePost.isPending}
        >
          <Save className="h-4 w-4" />
          {updatePost.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px] resize-y font-mono text-sm"
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <Label>Platforms</Label>
          <div className="flex flex-wrap gap-1.5">
            {post.platforms.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-[12px] capitalize"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <Label>Tags</Label>
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
        </div>
      </div>
    </div>
  );
}
