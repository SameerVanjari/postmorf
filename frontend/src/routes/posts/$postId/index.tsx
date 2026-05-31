import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Edit, Share2, Trash2 } from "lucide-react";
import { PostStatusBadge } from "../../../components/PostStatusBadge";
import { Button } from "../../../components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Skeleton } from "../../../components/ui/skeleton";
import { usePost } from "../../../hooks/use-posts";

export const Route = createFileRoute("/posts/$postId/")({
	component: PostDetailPage,
});

function PostDetailPage() {
	const { postId } = Route.useParams();
	const { data: post, isLoading, error } = usePost(postId);

	if (isLoading) {
		return (
			<main className="mx-auto max-w-[1200px] px-6 py-8">
				<div className="mb-8 flex items-center gap-4">
					<SidebarTrigger className="h-8 w-8" />
					<Skeleton className="h-8 w-64" />
				</div>
				<div className="grid grid-cols-[1fr_280px] gap-8">
					<Card className="border-border">
						<CardContent className="space-y-3 pt-6">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-5/6" />
							<Skeleton className="h-4 w-3/4" />
						</CardContent>
					</Card>
					<div className="space-y-4">
						<Card className="border-border">
							<CardContent className="pt-5">
								<Skeleton className="h-16" />
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		);
	}

	if (!post || error) {
		return (
			<main className="mx-auto max-w-[1200px] px-6 py-8">
				<div className="flex flex-col items-center justify-center py-24">
					<h2 className="text-lg font-semibold">Post not found</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						The post you're looking for doesn't exist.
					</p>
					<Button asChild variant="outline" className="mt-4">
						<Link to="/posts">Back to Posts</Link>
					</Button>
				</div>
			</main>
		);
	}

	const date = new Date(post.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<main className="mx-auto max-w-[1200px] px-6 py-8">
			<div className="mb-8 flex items-center gap-4">
				<SidebarTrigger className="h-8 w-8" />
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
						{post.title}
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Created {date}
						{post.updatedAt !== post.createdAt
							? ` · Updated ${new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric" })}`
							: ""}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="gap-1.5" asChild>
						<Link to="/posts/$postId/edit" params={{ postId: post.id }}>
							<Edit className="h-3.5 w-3.5" />
							Edit
						</Link>
					</Button>
					<Button variant="outline" size="sm" className="gap-1.5">
						<Share2 className="h-3.5 w-3.5" />
						Share
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="h-8 w-8 text-destructive hover:text-destructive"
					>
						<Trash2 className="h-3.5 w-3.5" />
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-[1fr_280px] gap-8">
				<div>
					<Card className="border-border">
						<CardContent className="prose prose-sm max-w-none pt-6">
							<div className="whitespace-pre-wrap text-[14px] leading-relaxed text-foreground">
								{post.content}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-4">
					<Card className="border-border">
						<CardHeader className="pb-2">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								Status
							</CardTitle>
						</CardHeader>
						<CardContent>
							<PostStatusBadge status={post.status} />
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
										className="inline-flex items-center rounded-md border border-border bg-background px-2 py-1 text-[12px] capitalize text-foreground"
									>
										{p}
									</span>
								))}
							</div>
						</CardContent>
					</Card>

					{post.tags.length > 0 && (
						<Card className="border-border">
							<CardHeader className="pb-2">
								<CardTitle className="text-[13px] font-medium text-muted-foreground">
									Tags
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-1.5">
									{post.tags.map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[12px] text-muted-foreground"
										>
											{tag}
										</span>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{post.sourcePostId && (
						<Card className="border-border">
							<CardHeader className="pb-2">
								<CardTitle className="text-[13px] font-medium text-muted-foreground">
									Source
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-[12px] text-muted-foreground">
									Generated from source post
								</p>
							</CardContent>
						</Card>
					)}

					{post.scheduledAt && (
						<Card className="border-border">
							<CardHeader className="pb-2">
								<CardTitle className="text-[13px] font-medium text-muted-foreground">
									Scheduled
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-[13px] text-amber-700">
									{new Date(post.scheduledAt).toLocaleDateString("en-US", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "2-digit",
									})}
								</p>
							</CardContent>
						</Card>
					)}

					<Separator />
				</div>
			</div>
		</main>
	);
}
