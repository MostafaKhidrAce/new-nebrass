const ABSOLUTE_API = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://powderblue-dugong-794830.hostingersite.com/api/v1"
).replace(/\/$/, "");

export function apiBaseUrl(): string {
  if (typeof window === "undefined") return ABSOLUTE_API;
  return "/manara-api";
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type GetOptions = {
  revalidate?: number;
  cache?: RequestCache;
};

export async function apiGet<T>(path: string, options: GetOptions = {}): Promise<T> {
  const url = `${apiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const init: RequestInit & { next?: { revalidate: number } } = {
    headers: { Accept: "application/json" },
  };

  if (options.cache === "no-store") {
    init.cache = "no-store";
  } else {
    init.next = { revalidate: options.revalidate ?? 60 };
  }

  const response = await fetch(url, init);
  if (!response.ok) {
    throw new ApiError(response.status, `API ${response.status} for ${path}`);
  }

  return (await response.json()) as T;
}
