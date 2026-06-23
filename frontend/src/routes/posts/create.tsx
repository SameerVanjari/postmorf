import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PlatformAccountSelector } from "@/components/PlatformAccountSelector";
import { PostEditor } from "@/components/PostEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCreatePost, useAccounts } from "@/hooks/use-posts";

export const Route = createFileRoute("/posts/create")({
  component: CreatePostPage,
});

function CreatePostPage() {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const { data: accounts = [] } = useAccounts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleSaveDraft = () => {
    createPost.mutate(
      {
        title: title || "Untitled Draft",
        content,
        excerpt: content.slice(0, 120),
        status: "draft",
        platforms:
          selectedPlatforms.length > 0 ? selectedPlatforms : ["twitter"],
        tags: [],
        scheduledAt: null,
        sourcePostId: null,
      },
      {
        onSuccess: () => {
          navigate({ to: "/posts" });
        },
      },
    );
  };

  const handlePublish = () => {
    createPost.mutate(
      {
        title: title || "Untitled Post",
        content,
        excerpt: content.slice(0, 120),
        status: "published",
        platforms:
          selectedPlatforms.length > 0 ? selectedPlatforms : ["twitter"],
        tags: [],
        scheduledAt: null,
        sourcePostId: null,
      },
      {
        onSuccess: (post) => {
          navigate({ to: "/posts/$postId", params: { postId: post.id } });
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link to="/posts">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <PageHeader
          title="Create Post"
          description="Compose a new post for your platforms."
        />
      </div>

      <div className="max-w-2xl flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Content</Label>
          <PostEditor
            value={content}
            onChange={setContent}
            placeholder="Write your post content..."
          />
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <Label>Platforms</Label>
          <p className="text-xs text-muted-foreground">
            Select where to publish. Connected accounts appear below each
            platform.
          </p>
          <PlatformAccountSelector
            selected={selectedPlatforms}
            onChange={setSelectedPlatforms}
            accounts={accounts}
          />
        </div>

        <Separator />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={handleSaveDraft}
            disabled={createPost.isPending}
          >
            <Save className="h-4 w-4" />
            {createPost.isPending ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            className="gap-1.5"
            onClick={handlePublish}
            disabled={createPost.isPending}
          >
            <Send className="h-4 w-4" />
            {createPost.isPending ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
