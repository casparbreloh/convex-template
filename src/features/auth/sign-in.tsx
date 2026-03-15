import { useAuthActions } from "@convex-dev/auth/react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router"
import { toast } from "sonner"

import { OTPForm } from "./components/otp-form"
import { SignInForm } from "./components/sign-in-form"

export function SignIn() {
  const { signIn } = useAuthActions()
  const queryClient = useQueryClient()
  const router = useRouter()
  const navigate = useNavigate({ from: "/sign-in" })
  const { email } = useSearch({ from: "/_auth/sign-in" })

  async function handleSignIn(email: string) {
    try {
      await signIn("email-otp", { email })
      await navigate({ search: { email } })
    } catch {
      toast.error("Failed to send verification code")
    }
  }

  async function handleVerifyOTP(otp: string) {
    if (!email) {
      await navigate({ search: {} })
      return
    }

    try {
      await signIn("email-otp", { email, code: otp })
      await queryClient.resetQueries()
      await router.invalidate()
      await navigate({ to: "/" })
    } catch {
      toast.error("Invalid verification code")
    }
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 sm:p-10">
      <div className="w-full max-w-sm">
        {!email ? (
          <SignInForm onSubmit={handleSignIn} />
        ) : (
          <OTPForm email={email} onSubmit={handleVerifyOTP} />
        )}
      </div>
    </div>
  )
}
