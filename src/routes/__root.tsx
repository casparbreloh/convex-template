import type { ConvexQueryClient } from "@convex-dev/react-query"
import type { QueryClient } from "@tanstack/react-query"
import type { ConvexReactClient } from "convex/react"

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouteContext,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"

import { Toaster } from "@/components/ui/sonner"
import { authClient, authQueryOptions } from "@/lib/auth"
import "@/styles/index.css"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}>()({
  beforeLoad: async ({ context }) => {
    const token = await context.queryClient.ensureQueryData({
      ...authQueryOptions,
      revalidateIfStale: true,
    })
    if (token) context.convexQueryClient.serverHttpClient?.setAuth(token)
    return { isAuthenticated: !!token, token }
  },
  component: RootComponent,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Convex Template",
      },
    ],
  }),
})

function RootComponent() {
  const { convexClient, token } = useRouteContext({ from: "__root__" })

  return (
    <RootDocument>
      <ConvexBetterAuthProvider client={convexClient} authClient={authClient} initialToken={token}>
        <Outlet />
      </ConvexBetterAuthProvider>
      <Toaster position="top-center" />
      <TanStackDevtools
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
