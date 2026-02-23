import type * as React from "react"

import { Link, useLocation } from "@tanstack/react-router"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavGroup({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>{children}</SidebarMenu>
    </SidebarGroup>
  )
}

export function NavGroupItem({
  title,
  url,
  icon,
}: {
  title: string
  url: string
  icon?: React.ReactElement
}) {
  const { pathname } = useLocation()

  const isActive = (to: string) => {
    const p = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
    const t = to !== "/" && to.endsWith("/") ? to.slice(0, -1) : to
    return p === t
  }

  return (
    <Link to={url}>
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive(url)} tooltip={title}>
          {icon}
          <span>{title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </Link>
  )
}
