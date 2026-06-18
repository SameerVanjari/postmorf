import { createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";
import { usePosts } from "@/hooks/use-posts";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
});

function SavedPage() {
  const { data: allPosts } = usePosts();
  const savedPosts = allPosts?.filter((p) => p.status === "draft") ?? [];

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <PageHeader
        title="Saved"
        description="Your bookmarked and saved content."
      />

      {savedPosts.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved posts"
          description="Bookmark posts while browsing to see them here."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
