import { queryOptions } from "@tanstack/react-query"

import { getAuth } from "@/lib/functions.ts"

export const authQueryOptions = queryOptions({
  queryKey: ["auth"],
  queryFn: async () => (await getAuth()) ?? null,
  staleTime: 1000 * 60 * 2,
  gcTime: 1000 * 60 * 5,
})
