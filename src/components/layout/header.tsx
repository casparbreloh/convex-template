import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@repo/ui/lib/utils"

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "@container/header flex w-full sticky top-0 z-50 h-12 shrink-0 items-center gap-2 px-2 bg-background",
        className,
      )}
      {...props}
    >
      <SidebarTrigger />
      {children}
    </header>
  )
}
