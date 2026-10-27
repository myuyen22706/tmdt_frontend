"use client";

import { useCallback, useEffect, useState, type SetStateAction } from "react";
import { apiRequest, ApiError } from "@/lib/api";

interface Loaded<T> {
  key: string;
  data: T | null;
  error: string | null;
}

/** Tải dữ liệu quản trị kèm token; trạng thái "đang tải" suy ra từ việc kết quả có khớp lượt tải hiện tại không. */
export function useAdminApi<T>(path: string | null, token: string | null) {
  const [version, setVersion] = useState(0);
  const [loaded, setLoaded] = useState<Loaded<T> | null>(null);
  const key = `${path}|${token}|${version}`;

  useEffect(() => {
    if (!path || !token) return;
    const controller = new AbortController();
    apiRequest<T>(path, { token, signal: controller.signal })
      .then((data) => setLoaded({ key, data, error: null }))
      .catch((err) => {
        if (controller.signal.aborted) return;
        setLoaded((prev) => ({ key, data: prev?.data ?? null, error: err instanceof ApiError ? err.message : "Không tải được dữ liệu" }));
      });
    return () => controller.abort();
  }, [path, token, key]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);
  const setData = useCallback((update: SetStateAction<T | null>) => {
    setLoaded((prev) => {
      if (!prev) return prev;
      const data = typeof update === "function" ? (update as (p: T | null) => T | null)(prev.data) : update;
      return { ...prev, data };
    });
  }, []);

  return {
    data: loaded?.data ?? null,
    error: loaded?.key === key ? loaded.error : null,
    loading: loaded?.key !== key,
    reload,
    setData,
  };
}
