import { createFileRoute } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { PostCard } from "../components/PostCard";
import { posts } from "../data/mockData";

export const Route = createFileRoute("/saved")({
	component: SavedPage,
});

function SavedPage() {
	const savedPosts = posts.filter((p) => p.status === "draft");

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8">
				<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
					Saved
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Your bookmarked and saved content.
				</p>
			</div>

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
		</main>
	);
}
