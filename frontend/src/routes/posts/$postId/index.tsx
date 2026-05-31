import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId/")({
	component: PostDetailPage,
});

function PostDetailPage() {
	const { postId } = Route.useParams();

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Post Detail
			</h1>
			<p className="mt-2 text-muted-foreground">Viewing post: {postId}</p>
		</main>
	);
}
