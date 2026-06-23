import { api } from "../client";
import { toCamelArray, toCamelCase } from "../transformers";
import type { SourcePost } from "@/lib/types";

function mapToSourcePost(raw: Record<string, unknown>): SourcePost {
  return {
    id: String(raw.id ?? ""),
    url: String(raw.sourceUrl ?? ""),
    title: String(raw.title ?? ""),
    content: String(raw.content ?? ""),
    platform: String(raw.sourcePlatform ?? "web"),
    importedAt: String(raw.createdAt ?? new Date().toISOString()),
  };
}

export const sourcePostsService = {
  async list(): Promise<SourcePost[]> {
    const data = await api.get<Record<string, unknown>[]>("/source-posts/");
    return toCamelArray(data).map(mapToSourcePost);
  },

  async getById(id: string): Promise<SourcePost> {
    const data = await api.get<Record<string, unknown>>(`/source-posts/${id}`);
    return mapToSourcePost(toCamelCase(data) as Record<string, unknown>);
  },
};
