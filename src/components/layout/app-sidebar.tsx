import type * as React from "react"

import { Home01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link } from "@tanstack/react-router"

import { NavGroup, NavGroupItem } from "@/components/layout/nav-group"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-row">
        <Link to="/">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 cursor-pointer items-center justify-center rounded-lg">
            <HugeiconsIcon className="size-5" icon={Home01Icon} strokeWidth={2} />
          </div>
        </Link>
        <div className="grid flex-1 items-center text-left text-sm leading-tight">
          <span className="truncate font-medium">Convex Template</span>
          <span className="truncate text-xs">Template for Full Stack Convex Applications</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup>
          <NavGroupItem
            title="Example"
            url="/"
            icon={<HugeiconsIcon icon={Home01Icon} strokeWidth={2} />}
          />
        </NavGroup>
      </SidebarContent>
      <SidebarFooter>{/*<NavUser user={data.user} />*/}</SidebarFooter>
    </Sidebar>
  )
}
