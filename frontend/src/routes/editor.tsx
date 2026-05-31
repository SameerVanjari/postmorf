import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";

export const Route = createFileRoute("/editor")({
	component: EditorPage,
});

function EditorPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8">
				<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
					Editor Workspace
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Rich text editor with sidebar panels.
				</p>
			</div>

			<div className="grid grid-cols-[1fr_280px] gap-8">
				<div className="space-y-4">
					<Textarea
						placeholder="Start writing... Markdown is supported."
						className="min-h-[500px] resize-y font-mono text-sm"
					/>
					<div className="flex items-center gap-3">
						<Button size="sm">Save Draft</Button>
						<Button variant="outline" size="sm">
							Preview
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					<Card className="border-border">
						<CardHeader className="pb-2">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								Platforms
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-[13px] text-muted-foreground">
								Select platforms to publish to.
							</p>
						</CardContent>
					</Card>

					<Card className="border-border">
						<CardHeader className="pb-2">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								Schedule
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-[13px] text-muted-foreground">
								Set a publish date and time.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
