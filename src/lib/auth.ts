import { convexClient } from "@convex-dev/better-auth/client/plugins"
import { convexBetterAuthReactStart } from "@convex-dev/better-auth/react-start"
import { queryOptions } from "@tanstack/react-query"
import { createServerFn } from "@tanstack/react-start"
import { emailOTPClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  plugins: [convexClient(), emailOTPClient()],
})

export const { handler, getToken, fetchAuthQuery, fetchAuthMutation, fetchAuthAction } =
  convexBetterAuthReactStart({
    convexUrl: process.env.VITE_CONVEX_URL!,
    convexSiteUrl: process.env.VITE_CONVEX_SITE_URL!,
  })

export const getAuth = createServerFn({ method: "GET" }).handler(async () => {
  return await getToken()
})

export const authQueryOptions = queryOptions({
  queryKey: ["auth"],
  queryFn: async () => (await getAuth()) ?? null,
  staleTime: 1000 * 60,
  gcTime: 1000 * 60 * 2,
})
