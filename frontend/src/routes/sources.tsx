import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { Button } from "../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { sourcePosts } from "../data/mockData";

export const Route = createFileRoute("/sources")({
	component: SourcesPage,
});

function SourcesPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-6 py-8">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
						Source Posts
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						{sourcePosts.length} imported sources · Import content to generate
						posts.
					</p>
				</div>
			</div>

			{sourcePosts.length === 0 ? (
				<EmptyState
					title="No source content"
					description="Import articles, newsletters, or RSS feeds to use as source material for AI-generated posts."
				/>
			) : (
				<div className="space-y-3">
					{sourcePosts.map((source) => (
						<Link
							key={source.id}
							to={source.url}
							target="_blank"
							rel="noreferrer"
							className="block no-underline"
						>
							<Card className="border-border transition-colors hover:bg-muted/50">
								<CardHeader className="pb-2">
									<div className="flex items-start justify-between gap-4">
										<CardTitle className="text-[15px] font-semibold leading-snug tracking-tight">
											{source.title}
										</CardTitle>
										<ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
									</div>
								</CardHeader>
								<CardContent>
									<p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
										{source.content}
									</p>
									<div className="mt-2 flex items-center gap-3 text-[12px] text-muted-foreground">
										<span className="inline-flex items-center rounded-md border border-border bg-background px-1.5 py-0.5 text-[11px] uppercase">
											{source.platform}
										</span>
										<span>
											Imported{" "}
											{new Date(source.importedAt).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											})}
										</span>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}

			<div className="mt-8 rounded-lg border border-dashed border-border p-8 text-center">
				<h3 className="text-[15px] font-semibold">Connect a new source</h3>
				<p className="mt-1 mb-4 text-[13px] text-muted-foreground">
					Import content from URLs, RSS feeds, or newsletters.
				</p>
				<Button asChild variant="outline" size="sm">
					<Link to="/connect">Connect Account</Link>
				</Button>
			</div>
		</main>
	);
}
