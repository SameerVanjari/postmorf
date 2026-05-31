import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, FileText, PenLine, Sparkles } from "lucide-react";
import { PostCard } from "../components/PostCard";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { posts } from "../data/mockData";
import type { DashboardStats } from "../lib/types";

export const Route = createFileRoute("/")({
	component: DashboardPage,
});

function computeStats(): DashboardStats {
	return {
		totalPosts: posts.length,
		draftPosts: posts.filter((p) => p.status === "draft").length,
		publishedPosts: posts.filter((p) => p.status === "published").length,
		scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
	};
}

function DashboardPage() {
	const stats = computeStats();
	const recentPosts = [...posts]
		.sort(
			(a, b) =>
				new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
		)
		.slice(0, 4);

	const statCards = [
		{
			label: "Total Posts",
			value: stats.totalPosts,
			icon: FileText,
			className: "text-primary bg-primary/10",
		},
		{
			label: "Drafts",
			value: stats.draftPosts,
			icon: PenLine,
			className: "text-muted-foreground bg-muted",
		},
		{
			label: "Published",
			value: stats.publishedPosts,
			icon: Sparkles,
			className: "text-emerald-600 bg-emerald-50",
		},
		{
			label: "Scheduled",
			value: stats.scheduledPosts,
			icon: CalendarDays,
			className: "text-amber-600 bg-amber-50",
		},
	];

	return (
		<main className="mx-auto max-w-[1200px] px-4 py-8">
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-[24px] font-semibold leading-tight tracking-tight">
						Dashboard
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Overview of your content workspace.
					</p>
				</div>
				<Link
					to="/posts/create"
					className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
				>
					New Post
				</Link>
			</div>

			<div className="mb-10 grid grid-cols-4 gap-4">
				{statCards.map((stat) => (
					<Card key={stat.label} className="border-border">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-[13px] font-medium text-muted-foreground">
								{stat.label}
							</CardTitle>
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-md ${stat.className}`}
							>
								<stat.icon className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-[28px] font-semibold tracking-tight text-foreground">
								{stat.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div>
				<h2 className="mb-4 text-[18px] font-semibold tracking-tight">
					Recent Posts
				</h2>
				<div className="grid grid-cols-2 gap-4">
					{recentPosts.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</main>
	);
}
