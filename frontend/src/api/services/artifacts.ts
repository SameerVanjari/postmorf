import { api } from "../client";
import { toCamelArray, toCamelCase } from "../transformers";
import type { Post, PostStatus } from "@/lib/types";

interface PostCreatePayload {
  title?: string;
  content: string;
  excerpt?: string;
  status?: PostStatus;
  platforms?: string[];
  tags?: string[];
  scheduledAt?: string | null;
  sourcePostId?: string | null;
}

interface PostUpdatePayload {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: PostStatus;
  platforms?: string[];
  tags?: string[];
  scheduledAt?: string | null;
}

interface StatsSummary {
  totalPosts: number;
  draftPosts: number;
  publishedPosts: number;
  scheduledPosts: number;
}

function mapToPost(raw: Record<string, unknown>): Post {
  return {
    id: String(raw.id ?? ""),
    title: String(raw.title ?? ""),
    content: String(raw.finalContent ?? raw.content ?? ""),
    excerpt: String(raw.excerpt ?? ""),
    status: (raw.status as PostStatus) ?? "draft",
    platforms: (raw.platforms as string[]) ?? [],
    createdAt: String(raw.createdAt ?? new Date().toISOString()),
    updatedAt: String(raw.updatedAt ?? new Date().toISOString()),
    scheduledAt: raw.scheduledAt ? String(raw.scheduledAt) : null,
    sourcePostId: raw.sourcePostId ? String(raw.sourcePostId) : null,
    tags: (raw.tags as string[]) ?? [],
  };
}

export const artifactsService = {
  async list(params?: { userId?: string; status?: string }): Promise<Post[]> {
    const searchParams = new URLSearchParams();
    if (params?.userId) searchParams.set("user_id", params.userId);
    if (params?.status) searchParams.set("status", params.status);
    const qs = searchParams.toString();
    const data = await api.get<Record<string, unknown>[]>(
      `/artifacts/${qs ? `?${qs}` : ""}`,
    );
    return toCamelArray(data).map(mapToPost);
  },

  async getById(id: string): Promise<Post> {
    const data = await api.get<Record<string, unknown>>(`/artifacts/${id}`);
    return mapToPost(toCamelCase(data) as Record<string, unknown>);
  },

  async create(payload: PostCreatePayload): Promise<Post> {
    const userId = localStorage.getItem("userId") ??
      "00000000-0000-0000-0000-000000000000";
    const body: Record<string, unknown> = {
      final_content: payload.content,
      title: payload.title ?? null,
      excerpt: payload.excerpt ?? null,
      status: payload.status ?? "draft",
      platforms: payload.platforms ?? [],
      tags: payload.tags ?? [],
      scheduled_at: payload.scheduledAt ?? null,
      source_post_id: payload.sourcePostId ?? null,
      user_id: userId,
    };
    const data = await api.post<Record<string, unknown>>("/artifacts/", body);
    return mapToPost(toCamelCase(data) as Record<string, unknown>);
  },

  async update(id: string, payload: PostUpdatePayload): Promise<Post> {
    const body: Record<string, unknown> = {};
    if (payload.title !== undefined) body.title = payload.title;
    if (payload.content !== undefined) body.final_content = payload.content;
    if (payload.excerpt !== undefined) body.excerpt = payload.excerpt;
    if (payload.status !== undefined) body.status = payload.status;
    if (payload.platforms !== undefined) body.platforms = payload.platforms;
    if (payload.tags !== undefined) body.tags = payload.tags;
    if (payload.scheduledAt !== undefined)
      body.scheduled_at = payload.scheduledAt;
    const data = await api.put<Record<string, unknown>>(
      `/artifacts/${id}`,
      body,
    );
    return mapToPost(toCamelCase(data) as Record<string, unknown>);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/artifacts/${id}`);
  },

  async stats(): Promise<StatsSummary> {
    const data = await api.get<Record<string, unknown>>("/artifacts/stats");
    const camelData = toCamelCase(data) as Record<string, unknown>;
    return {
      totalPosts: (camelData.totalPosts as number) ?? 0,
      draftPosts: (camelData.draftPosts as number) ?? 0,
      publishedPosts: (camelData.publishedPosts as number) ?? 0,
      scheduledPosts: (camelData.scheduledPosts as number) ?? 0,
    };
  },
};
