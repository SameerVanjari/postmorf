import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor")({
	component: EditorPage,
});

function EditorPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Editor Workspace
			</h1>
			<p className="mt-2 text-muted-foreground">
				Rich text editor with sidebar panels.
			</p>
		</main>
	);
}
