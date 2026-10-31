import { authClient } from "./auth-client";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export async function api<T>(
  path: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  if (authenticated) {
    const { data, error } = await authClient.token();
    if (error || !data?.token)
      throw new Error("Please log in again to continue.");
    headers.set("Authorization", `Bearer ${data.token}`);
  }
  let response: Response;
  try {
    response = await fetch(`${baseURL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "The library is temporarily unavailable. Please try again shortly.",
    );
  }
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.message || "We could not complete your request.");
  return data as T;
}
