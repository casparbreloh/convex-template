import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client.ts"

import { OTPForm } from "./components/otp-form"
import { SignInForm } from "./components/sign-in-form"

export function SignIn() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const navigate = useNavigate({ from: "/sign-in" })
  const { email } = useSearch({ from: "/_auth/sign-in" })

  async function handleSignIn(email: string) {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    })

    if (error) {
      toast.error(error.message)
      return
    }

    await navigate({ search: { email } })
  }

  async function handleVerifyOTP(otp: string) {
    if (!email) {
      await navigate({ search: {} })
      return
    }

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    })

    if (error) {
      toast.error(error.message)
      return
    }

    await queryClient.resetQueries()
    await router.invalidate()
    await navigate({ to: "/" })
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
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
