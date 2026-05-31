import { createFileRoute } from "@tanstack/react-router";
import { FileText, Image, Sparkles } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { Card, CardContent, CardHeader } from "../components/ui/card";

export const Route = createFileRoute("/artifacts")({
	component: ArtifactsPage,
});

const artifacts = [
	{
		id: "art-1",
		type: "image",
		title: "Hero graphic — How AI Is Transforming Content",
		platform: "linkedin",
		createdAt: "2026-05-29",
	},
	{
		id: "art-2",
		type: "text",
		title: "Thread variant — Brand Voice (Twitter)",
		platform: "twitter",
		createdAt: "2026-05-30",
	},
	{
		id: "art-3",
		type: "image",
		title: "Infographic — Social Media Scheduling Tips",
		platform: "instagram",
		createdAt: "2026-05-31",
	},
];

function ArtifactsPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8">
				<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
					Artifacts
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					{artifacts.length} generated content artifacts.
				</p>
			</div>

			{artifacts.length === 0 ? (
				<EmptyState
					title="No artifacts yet"
					description="Generate content to see AI-created images, text variants, and more here."
				/>
			) : (
				<div className="grid grid-cols-3 gap-4">
					{artifacts.map((artifact) => (
						<Card
							key={artifact.id}
							className="group border-border transition-shadow hover:shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.02)]"
						>
							<CardHeader className="pb-2">
								<div className="mb-2 flex h-32 items-center justify-center rounded-md bg-muted">
									{artifact.type === "image" ? (
										<Image className="h-8 w-8 text-muted-foreground" />
									) : (
										<FileText className="h-8 w-8 text-muted-foreground" />
									)}
								</div>
							</CardHeader>
							<CardContent>
								<div className="flex items-start gap-2">
									{artifact.type === "image" ? (
										<Image className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
									) : (
										<Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-purple-500" />
									)}
									<div className="min-w-0">
										<p className="truncate text-[13px] font-medium leading-snug">
											{artifact.title}
										</p>
										<p className="mt-1 text-[12px] text-muted-foreground">
											{artifact.platform} ·{" "}
											{new Date(artifact.createdAt).toLocaleDateString(
												"en-US",
												{
													month: "short",
													day: "numeric",
												},
											)}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</main>
	);
}
