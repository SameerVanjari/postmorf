import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/create")({
	component: CreatePostPage,
});

function CreatePostPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Create Post
			</h1>
			<p className="mt-2 text-muted-foreground">
				Compose a new post for your platforms.
			</p>
		</main>
	);
}
