import { Email } from "@convex-dev/auth/providers/Email"
import { convexAuth } from "@convex-dev/auth/server"

const EmailOTP = Email({
  id: "email-otp",
  maxAge: 60 * 10,
  async generateVerificationToken() {
    return Math.floor(100000 + Math.random() * 900000).toString()
  },
  async sendVerificationRequest({ identifier: email, token }) {
    console.log(`Send email to ${email} with OTP: ${token}`)
  },
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [EmailOTP],
})
