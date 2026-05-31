import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	accounts as mockAccounts,
	posts as mockPosts,
	sourcePosts as mockSourcePosts,
} from "../data/mockData";
import type { DashboardStats, Post } from "../lib/types";

async function delay<T>(data: T, ms = 200): Promise<T> {
	return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// Query keys
export const queryKeys = {
	posts: ["posts"] as const,
	post: (id: string) => ["posts", id] as const,
	sourcePosts: ["sourcePosts"] as const,
	accounts: ["accounts"] as const,
	stats: ["stats"] as const,
};

// --- Queries ---

export function usePosts(search?: string) {
	return useQuery({
		queryKey: [...queryKeys.posts, search],
		queryFn: async () => {
			const all = await delay([...mockPosts]);
			if (!search?.trim()) return all;
			const q = search.toLowerCase();
			return all.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.excerpt.toLowerCase().includes(q) ||
					p.tags.some((t) => t.toLowerCase().includes(q)),
			);
		},
		staleTime: 30_000,
	});
}

export function usePost(id: string) {
	return useQuery({
		queryKey: queryKeys.post(id),
		queryFn: async () => {
			const post = await delay(mockPosts.find((p) => p.id === id) ?? null);
			if (!post) throw new Error("Post not found");
			return post;
		},
		enabled: !!id,
	});
}

export function useSourcePosts() {
	return useQuery({
		queryKey: queryKeys.sourcePosts,
		queryFn: () => delay([...mockSourcePosts]),
		staleTime: 60_000,
	});
}

export function useAccounts() {
	return useQuery({
		queryKey: queryKeys.accounts,
		queryFn: () => delay([...mockAccounts]),
		staleTime: 120_000,
	});
}

export function useDashboardStats() {
	return useQuery({
		queryKey: queryKeys.stats,
		queryFn: async () => {
			const all = await delay([...mockPosts]);
			return {
				totalPosts: all.length,
				draftPosts: all.filter((p) => p.status === "draft").length,
				publishedPosts: all.filter((p) => p.status === "published").length,
				scheduledPosts: all.filter((p) => p.status === "scheduled").length,
			} satisfies DashboardStats;
		},
		staleTime: 15_000,
	});
}

// --- Mutations ---

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
			await delay(null, 300);
			const now = new Date().toISOString();
			const newPost: Post = {
				...data,
				id: `post-${Date.now()}`,
				createdAt: now,
				updatedAt: now,
				scheduledAt: data.scheduledAt ?? null,
				sourcePostId: data.sourcePostId ?? null,
			};
			mockPosts.unshift(newPost);
			return newPost;
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
			void queryClient.invalidateQueries({ queryKey: queryKeys.stats });
		},
	});
}

export function useUpdatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { id: string } & Partial<Post>) => {
			await delay(null, 200);
			const post = mockPosts.find((p) => p.id === data.id);
			if (!post) throw new Error("Post not found");
			Object.assign(post, data, { updatedAt: new Date().toISOString() });
			return post;
		},
		onSuccess: (_, variables) => {
			void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
			void queryClient.invalidateQueries({
				queryKey: queryKeys.post(variables.id),
			});
			void queryClient.invalidateQueries({ queryKey: queryKeys.stats });
		},
	});
}

export function useDeletePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await delay(null, 150);
			const index = mockPosts.findIndex((p) => p.id === id);
			if (index === -1) throw new Error("Post not found");
			mockPosts.splice(index, 1);
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
			void queryClient.invalidateQueries({ queryKey: queryKeys.stats });
		},
	});
}
