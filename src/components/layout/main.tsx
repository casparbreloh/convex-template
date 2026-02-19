import { cn } from "@/lib/utils"

type MainProps = React.HTMLAttributes<HTMLElement>

export function Main({ className, ...props }: MainProps) {
  return (
    <main
      className={cn("@container/main main-container px-4 pt-2 pb-12 sm:pt-4", className)}
      {...props}
    />
  )
}
