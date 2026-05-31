import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Pencil, RotateCcw } from "lucide-react";
import { PostStatusBadge } from "../../../components/PostStatusBadge";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { posts } from "../../../data/mockData";

export const Route = createFileRoute("/posts/$postId/generated")({
	component: GeneratedPostPage,
});

function GeneratedPostPage() {
	const { postId } = Route.useParams();
	const post = posts.find((p) => p.id === postId);

	if (!post) {
		return (
			<main className="mx-auto max-w-[1200px] px-4 py-8">
				<div className="flex flex-col items-center justify-center py-24">
					<h2 className="text-lg font-semibold">Post not found</h2>
					<Button asChild variant="outline" className="mt-4">
						<Link to="/posts">Back to Posts</Link>
					</Button>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8 flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => window.history.back()}
					className="h-8 w-8"
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div className="flex-1">
					<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
						Generated Post
					</h1>
					<div className="mt-1 flex items-center gap-3">
						<PostStatusBadge status="crafting" />
						<span className="text-sm text-muted-foreground">
							AI-generated from source content
						</span>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-[1fr_280px] gap-8">
				<div>
					<Card className="border-border">
						<CardHeader className="pb-3">
							<CardTitle className="text-[15px] font-semibold">
								Generated Content
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="prose prose-sm max-w-none">
								<div className="whitespace-pre-wrap text-[14px] leading-relaxed text-foreground">
									{post.content}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-4">
					<Card className="border-border">
						<CardHeader className="pb-3">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								Actions
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<Button className="w-full gap-1.5" size="sm">
								<Check className="h-3.5 w-3.5" />
								Accept & Publish
							</Button>
							<Button
								variant="outline"
								className="w-full gap-1.5"
								size="sm"
								asChild
							>
								<Link to="/posts/$postId/edit" params={{ postId }}>
									<Pencil className="h-3.5 w-3.5" />
									Edit Before Publishing
								</Link>
							</Button>
							<Button variant="ghost" className="w-full gap-1.5" size="sm">
								<RotateCcw className="h-3.5 w-3.5" />
								Regenerate
							</Button>
						</CardContent>
					</Card>

					<Card className="border-border">
						<CardHeader className="pb-2">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								Platforms
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex flex-wrap gap-1.5">
								{post.platforms.map((p) => (
									<span
										key={p}
										className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-[12px] capitalize"
									>
										{p}
									</span>
								))}
							</div>
						</CardContent>
					</Card>

					<Separator />

					<Card className="border-border">
						<CardHeader className="pb-2">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								Source
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-[12px] leading-relaxed text-muted-foreground">
								This post was generated from your source content. Review and
								accept to publish.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
