import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
	component: PostsPage,
});

function PostsPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				All Posts
			</h1>
			<p className="mt-2 text-muted-foreground">
				Browse and manage your posts.
			</p>
		</main>
	);
}
