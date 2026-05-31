import type { PostStatus } from "../lib/types";

interface PostStatusBadgeProps {
	readonly status: PostStatus;
}

const statusConfig: Record<PostStatus, { label: string; className: string }> = {
	draft: {
		label: "Draft",
		className: "bg-muted text-muted-foreground border-muted",
	},
	published: {
		label: "Published",
		className: "border-transparent bg-primary/10 text-primary",
	},
	scheduled: {
		label: "Scheduled",
		className: "border-transparent bg-amber-50 text-amber-700",
	},
	crafting: {
		label: "Crafting",
		className: "border-transparent bg-purple-50 text-purple-700",
	},
};

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
	const config = statusConfig[status];

	return (
		<span
			className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider ${config.className}`}
		>
			{config.label}
		</span>
	);
}
