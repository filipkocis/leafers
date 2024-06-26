"use client"

import { useEffect, useState } from "react";

type ReturnType<T> = {
  error: string,
  data: null,
  loading: false,
} | {
  data: T,
  error: null,
  loading: false,
} | {
  loading: true,
  error: null,
  data: null,
}

export function useAwait<T>(fn: () => Promise<T>): ReturnType<T> {
  const [data, setData] = useState<Awaited<T> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const awaitData = async () => {
      try {
        const result = await fn();
        setData(result);
      } catch (error: any) {
        const msg = `${error?.message}` || "An error occurred";
        setError(msg);
      } 
      setLoading(false);
    }
    awaitData();
  }, [fn])

  if (loading === true) return { data: null, error: null, loading: true as const }
  if (error != null) return { data: null, error, loading: false as const }
  return { data: data as T, error: null, loading: false as const }
}

type ReturnObject<T> = {
  data: NonNullable<T>,
  error: null
} | {
  error: {
    message: string
  }
  data: null
}

export function useAwaitData<T>(fn: () => Promise<ReturnObject<T>>): ReturnType<NonNullable<T>> {
  const { data, error, loading } = useAwait(fn);

  if (loading) return { data: null, error: null, loading: true as const }
  if (error != null) return { data: null, error, loading: false as const }
  if (data.error) return { data: null, error: data.error.message, loading: false as const }
  return { data: data.data as NonNullable<T>, error: null, loading: false as const }
}
