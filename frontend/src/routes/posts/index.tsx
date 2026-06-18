import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { EmptyState } from "@/components/EmptyState";
import { FilterBar } from "@/components/FilterBar";
import { PageHeader } from "@/components/PageHeader";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts } from "@/hooks/use-posts";

export const Route = createFileRoute("/posts/")({
  component: PostsPage,
});

function PostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: filtered, isLoading } = usePosts(searchQuery);
  const allPosts = filtered ?? [];

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-8">
      <PageHeader
        title="All Posts"
        description={isLoading ? "Loading..." : `${allPosts.length} posts shown`}
        action={
          <Link
            to="/posts/create"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        }
      />

      <div className="mb-6">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          placeholder="Search posts by title, excerpt, or tags..."
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton count
            <Card key={`skel-${i}`} className="border-border">
              <CardHeader className="pb-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : allPosts.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No matching posts" : "No posts yet"}
          description={
            searchQuery
              ? "Try adjusting your search terms."
              : "Create your first post to get started."
          }
          action={
            searchQuery ? undefined : (
              <Button asChild size="sm">
                <Link to="/posts/create">Create Post</Link>
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
