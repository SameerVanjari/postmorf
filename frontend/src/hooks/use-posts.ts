import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { artifactsService, sourcePostsService, socialAccountsService } from "@/api";
import type { Post } from "@/lib/types";

export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: string) => ["posts", id] as const,
  sourcePosts: ["sourcePosts"] as const,
  accounts: ["accounts"] as const,
  stats: ["stats"] as const,
};

export function usePosts(search?: string) {
  return useQuery({
    queryKey: [...queryKeys.posts, search],
    queryFn: async () => {
      const all = await artifactsService.list();
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
    queryFn: () => artifactsService.getById(id),
    enabled: !!id,
  });
}

export function useSourcePosts() {
  return useQuery({
    queryKey: queryKeys.sourcePosts,
    queryFn: () => sourcePostsService.list(),
    staleTime: 60_000,
  });
}

export function useAccounts() {
  return useQuery({
    queryKey: queryKeys.accounts,
    queryFn: () => socialAccountsService.list(),
    staleTime: 120_000,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: () => artifactsService.stats(),
    staleTime: 15_000,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Post, "id" | "createdAt" | "updatedAt">) =>
      artifactsService.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      void queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<Post>) =>
      artifactsService.update(id, data),
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
    mutationFn: (id: string) => artifactsService.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      void queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
}
