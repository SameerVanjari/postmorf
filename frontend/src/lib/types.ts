export type PostStatus = "draft" | "published" | "scheduled" | "crafting";

export interface Post {
	id: string;
	title: string;
	content: string;
	excerpt: string;
	status: PostStatus;
	platforms: string[];
	createdAt: string;
	updatedAt: string;
	scheduledAt: string | null;
	sourcePostId: string | null;
	tags: string[];
}

export interface Platform {
	id: string;
	name: string;
	icon: string;
}

export interface Account {
	id: string;
	platformId: string;
	handle: string;
	avatar: string;
	displayName: string;
}

export interface SourcePost {
	id: string;
	url: string;
	title: string;
	content: string;
	platform: string;
	importedAt: string;
}

export interface DashboardStats {
	totalPosts: number;
	draftPosts: number;
	publishedPosts: number;
	scheduledPosts: number;
}
