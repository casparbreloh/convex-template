import { cn } from "@repo/ui/lib/utils"

type MainProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLElement>
}

export function Main({ className, ...props }: MainProps) {
  return (
    <main
      className={cn("@container/main main-container px-4 pt-2 pb-12 md:pt-4", className)}
      {...props}
    />
  )
}
