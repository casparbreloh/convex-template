import { cn } from "@/lib/utils"

export function Main({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("@container/main main-container px-4 pt-2 pb-12 sm:pt-4", className)}
      {...props}
    />
  )
}
