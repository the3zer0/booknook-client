"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { errorMessage } from "@/lib/utils";
import type { Book } from "@/types";
export function useBooks(query = "", authenticated = false) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError("");
      try {
        const data = await api<Book[]>(
          `/books${query}`,
          { signal },
          authenticated,
        );
        if (!signal?.aborted) setBooks(data);
      } catch (err) {
        if (!signal?.aborted) setError(errorMessage(err));
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [query, authenticated],
  );
  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [load]);
  return { books, loading, error, reload: () => load() };
}
