import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/crafting")({
	component: CraftingPage,
});

function CraftingPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Crafting Post
			</h1>
			<p className="mt-2 text-muted-foreground">
				AI is generating your content.
			</p>
		</main>
	);
}
