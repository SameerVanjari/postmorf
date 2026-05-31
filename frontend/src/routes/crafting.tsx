import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Sparkles } from "lucide-react";
import { PostStatusBadge } from "../components/PostStatusBadge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";

export const Route = createFileRoute("/crafting")({
	component: CraftingPage,
});

function CraftingPage() {
	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8">
				<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
					Crafting Post
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					AI is generating your content based on source material.
				</p>
			</div>

			<div className="grid grid-cols-[1fr_280px] gap-8">
				<div>
					<Card className="border-border">
						<CardContent className="space-y-4 pt-6">
							<div className="flex items-center gap-3">
								<Loader2 className="h-4 w-4 animate-spin text-primary" />
								<div>
									<p className="text-[14px] font-medium">
										Generating post content...
									</p>
									<p className="text-[12px] text-muted-foreground">
										Estimated time: 30–60 seconds
									</p>
								</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
								<Skeleton className="h-4 w-2/3" />
								<Skeleton className="mt-2 h-4 w-full" />
								<Skeleton className="h-4 w-4/5" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="mt-2 h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-4">
					<Card className="border-border">
						<CardContent className="space-y-4 pt-5">
							<div className="flex items-center justify-between">
								<span className="text-[13px] text-muted-foreground">
									Status
								</span>
								<PostStatusBadge status="crafting" />
							</div>

							<div className="flex items-center justify-between">
								<span className="text-[13px] text-muted-foreground">
									Using source
								</span>
								<span className="text-[13px] font-medium">
									Content Strategy Tips
								</span>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-[13px] text-muted-foreground">
									Target platforms
								</span>
								<span className="text-[13px] font-medium">
									Twitter, LinkedIn
								</span>
							</div>
						</CardContent>
					</Card>

					<Separator />

					<Button
						variant="outline"
						className="w-full gap-1.5 text-destructive hover:text-destructive"
						size="sm"
					>
						Cancel Generation
					</Button>

					<Card className="border-border">
						<CardContent className="pt-5">
							<div className="flex items-center gap-2 text-[13px] text-muted-foreground">
								<Sparkles className="h-3.5 w-3.5" />
								<span>PostMorph AI is optimizing for engagement</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
