import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/connect")({
	component: ConnectPage,
});

function ConnectPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<h1 className="text-[32px] font-semibold leading-tight tracking-tight">
				Connect Account
			</h1>
			<p className="mt-2 text-muted-foreground">
				Connect your social platform accounts.
			</p>
		</main>
	);
}
