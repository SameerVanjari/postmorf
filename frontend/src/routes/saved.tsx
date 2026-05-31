import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/saved")({
	component: SavedPage,
});

function SavedPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Saved
			</h1>
			<p className="mt-2 text-muted-foreground">
				Your bookmarked and saved content.
			</p>
		</main>
	);
}
