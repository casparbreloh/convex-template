import { createFileRoute, redirect } from "@tanstack/react-router"
import { z } from "zod"

import { SignIn } from "@/features/auth/sign-in.tsx"

const searchSchema = z.object({
  email: z.string().optional(),
})

export const Route = createFileRoute("/_auth/sign-in")({
  beforeLoad: async ({ context }) => {
    if (context.isAuthenticated) throw redirect({ to: "/" })
  },
  component: SignIn,
  validateSearch: searchSchema,
})
