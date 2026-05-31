import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/edit")({
	component: EditPostPage,
});

function EditPostPage() {
	const { postId } = Route.useParams();

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Edit Post
			</h1>
			<p className="mt-2 text-muted-foreground">Editing post: {postId}</p>
		</main>
	);
}
