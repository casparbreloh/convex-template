import type { ConvexQueryClient } from "@convex-dev/react-query"
import type { QueryClient } from "@tanstack/react-query"
import type { ConvexReactClient } from "convex/react"

import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"
import { Toaster } from "@repo/ui/components/shadcn/sonner"
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

import { authClient } from "@/lib/auth-client.ts"
import { authQueryOptions } from "@/lib/queries.ts"

import appCss from "../index.css?url"

export interface RouterAppContext {
  queryClient: QueryClient
  convexClient: ConvexReactClient
  convexQueryClient: ConvexQueryClient
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
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
    links: [
      {
        href: appCss,
        rel: "stylesheet",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Repo",
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
