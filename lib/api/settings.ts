import { cache } from "react";
import { apiGet } from "@/lib/api/http";
import { mapSettings } from "@/lib/api/mappers";
import type { ApiSettings, SiteSettings } from "@/lib/types";

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const json = await apiGet<{ data: ApiSettings }>("/settings");
  return mapSettings(json.data);
});
