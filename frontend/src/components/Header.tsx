import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="mx-auto flex h-12 max-w-[1200px] items-center gap-6 px-4">
				<Link
					to="/"
					className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground no-underline"
				>
					<span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[11px] font-bold text-primary-foreground">
						P
					</span>
					PostMorph
				</Link>

				<nav className="flex items-center gap-1 text-sm">
					<Link
						to="/"
						className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
						activeProps={{ className: "bg-accent text-accent-foreground" }}
					>
						Dashboard
					</Link>
					<Link
						to="/posts"
						className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
						activeProps={{ className: "bg-accent text-accent-foreground" }}
					>
						Posts
					</Link>
					<Link
						to="/sources"
						className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
						activeProps={{ className: "bg-accent text-accent-foreground" }}
					>
						Sources
					</Link>
					<Link
						to="/artifacts"
						className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
						activeProps={{ className: "bg-accent text-accent-foreground" }}
					>
						Artifacts
					</Link>
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<Link
						to="/posts/create"
						className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
					>
						New Post
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
