import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"
import { ConvexQueryClient } from "@convex-dev/react-query"
import { QueryClient } from "@tanstack/react-query"
import { createRouter as createTanStackRouter, useRouteContext } from "@tanstack/react-router"
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query"
import { ConvexReactClient } from "convex/react"

import { authClient } from "@/lib/auth-client.ts"

import { routeTree } from "./routeTree.gen"

export function getRouter() {
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL!, {
    unsavedChangesWarning: false,
  })

  const convexQueryClient = new ConvexQueryClient(convex, {
    expectAuth: true,
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: convexQueryClient.queryFn(),
        queryKeyHashFn: convexQueryClient.hashFn(),
      },
    },
  })
  convexQueryClient.connect(queryClient)

  const router = createTanStackRouter({
    routeTree,
    context: { queryClient, convexClient: convex, convexQueryClient },
    defaultNotFoundComponent: () => <div>Not Found</div>,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
    InnerWrap: ({ children }) => {
      const context = useRouteContext({ from: "__root__" })

      return (
        <ConvexBetterAuthProvider
          client={context.convexClient}
          authClient={authClient}
          initialToken={context.token}
        >
          {children}
        </ConvexBetterAuthProvider>
      )
    },
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}
