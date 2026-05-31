import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/generated")({
	component: GeneratedPostPage,
});

function GeneratedPostPage() {
	const { postId } = Route.useParams();

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Generated Post
			</h1>
			<p className="mt-2 text-muted-foreground">
				AI-generated content for post: {postId}
			</p>
		</main>
	);
}
