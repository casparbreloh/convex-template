import { SidebarInset, SidebarProvider } from "@repo/ui/components/shadcn/sidebar"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { AppSidebar } from "@/components/layout/app-sidebar.tsx"

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) throw redirect({ to: "/sign-in" })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="@container h-svh overflow-y-auto [scrollbar-gutter:stable]">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
