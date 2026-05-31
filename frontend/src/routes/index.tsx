import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, FileText, PenLine, Sparkles } from "lucide-react";
import { PostCard } from "../components/PostCard";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { SidebarTrigger } from "../components/ui/sidebar";
import { Skeleton } from "../components/ui/skeleton";
import { useDashboardStats, usePosts } from "../hooks/use-posts";

export const Route = createFileRoute("/")({
	component: DashboardPage,
});

function DashboardPage() {
	const { data: stats, isLoading: statsLoading } = useDashboardStats();
	const { data: allPosts, isLoading: postsLoading } = usePosts();

	const recentPosts = allPosts
		? [...allPosts]
				.sort(
					(a, b) =>
						new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
				)
				.slice(0, 4)
		: [];

	const statCards = stats
		? [
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
			]
		: [];

	return (
		<main className="mx-auto max-w-[1200px] px-6 py-8">
			<div className="mb-8 flex items-center gap-4">
				<SidebarTrigger className="h-8 w-8" />
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
					className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
				>
					New Post
				</Link>
			</div>

			<div className="mb-10 grid grid-cols-4 gap-4">
				{statsLoading
					? Array.from({ length: 4 }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton count
							<Card key={`skel-${i}`} className="border-border">
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-8 w-8 rounded-md" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-8 w-12" />
								</CardContent>
							</Card>
						))
					: statCards.map((stat) => (
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
				{postsLoading ? (
					<div className="grid grid-cols-2 gap-4">
						{Array.from({ length: 4 }).map((_, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton count
							<Card key={`skel-${i}`} className="border-border">
								<CardHeader className="pb-3">
									<Skeleton className="h-5 w-3/4" />
									<Skeleton className="mt-2 h-4 w-full" />
									<Skeleton className="mt-1 h-4 w-2/3" />
								</CardHeader>
								<CardContent>
									<Skeleton className="h-3 w-32" />
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<div className="grid grid-cols-2 gap-4">
						{recentPosts.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				)}
			</div>
		</main>
	);
}
