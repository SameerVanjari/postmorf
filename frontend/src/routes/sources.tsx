import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sources")({
	component: SourcesPage,
});

function SourcesPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Source Posts
			</h1>
			<p className="mt-2 text-muted-foreground">
				Imported source content browser.
			</p>
		</main>
	);
}
