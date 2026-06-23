import { api } from "../client";
import { toCamelArray, toCamelCase } from "../transformers";
import type { Account } from "@/lib/types";

function mapToAccount(raw: Record<string, unknown>): Account {
  return {
    id: String(raw.id ?? ""),
    platformId: String(raw.platform ?? ""),
    handle: String(raw.username ?? ""),
    avatar: String(raw.profileImage ?? ""),
    displayName: String(raw.displayName ?? ""),
  };
}

export const socialAccountsService = {
  async list(): Promise<Account[]> {
    const data = await api.get<Record<string, unknown>[]>(
      "/social-accounts/",
    );
    return toCamelArray(data).map(mapToAccount);
  },

  async getById(id: string): Promise<Account> {
    const data = await api.get<Record<string, unknown>>(
      `/social-accounts/${id}`,
    );
    return mapToAccount(toCamelCase(data) as Record<string, unknown>);
  },
};
