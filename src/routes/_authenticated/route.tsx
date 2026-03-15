import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router"
import { Authenticated, Unauthenticated } from "convex/react"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const Route = createFileRoute("/_authenticated")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Authenticated>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="@container h-svh overflow-y-auto [scrollbar-gutter:stable]">
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </Authenticated>
      <Unauthenticated>
        <Navigate to="/sign-in" />
      </Unauthenticated>
    </>
  )
}
