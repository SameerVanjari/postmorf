import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/types";
import { PostStatusBadge } from "@/components/PostStatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostCardProps {
  readonly post: Post;
  readonly showPlatforms?: boolean;
}

export function PostCard({ post, showPlatforms = true }: PostCardProps) {
  const platformCount = post.platforms.length;

  return (
    <Link
      to="/posts/$postId"
      params={{ postId: post.id }}
      className="block no-underline transition-colors"
    >
      <Card className="group h-full border-border transition-shadow hover:shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.02)]">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-[15px] font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary">
              {post.title}
            </CardTitle>
            <PostStatusBadge status={post.status} />
          </div>
          <CardDescription className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-[12px] text-muted-foreground">
            <span>
              {new Date(post.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
              {post.status === "scheduled" && post.scheduledAt
                ? ` · Scheduled ${new Date(post.scheduledAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                : ""}
            </span>
            {showPlatforms && platformCount > 0 && (
              <span>
                {platformCount} platform{platformCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
