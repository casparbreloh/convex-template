import { convexQuery } from "@convex-dev/react-query"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { api } from "../../../convex/_generated/api"

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
})

const TITLE_TEXT = `
 ██╗  ██╗███████╗██╗     ██╗      ██████╗
 ██║  ██║██╔════╝██║     ██║     ██╔═══██╗
 ███████║█████╗  ██║     ██║     ██║   ██║
 ██╔══██║██╔══╝  ██║     ██║     ██║   ██║
 ██║  ██║███████╗███████╗███████╗╚██████╔╝
 ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝

 ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
 ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
 ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
 ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
 ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝
 `

function RouteComponent() {
  const healthCheck = useQuery(convexQuery(api.healthCheck.get))

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-muted-foreground text-sm">
              {healthCheck.isLoading
                ? "Checking..."
                : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
