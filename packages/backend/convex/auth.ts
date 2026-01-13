import { createClient, type GenericCtx } from "@convex-dev/better-auth"
import { convex } from "@convex-dev/better-auth/plugins"
import { betterAuth } from "better-auth"
import { emailOTP } from "better-auth/plugins"

import type { DataModel } from "./_generated/dataModel"

import { components } from "./_generated/api"
import authConfig from "./auth.config"

export const authComponent = createClient<DataModel>(components.betterAuth)

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: process.env.SITE_URL!,
    database: authComponent.adapter(ctx),
    plugins: [
      convex({ authConfig }),
      emailOTP({
        async sendVerificationOTP({ email, otp }) {
          console.log(`Send email to ${email} with OTP: ${otp}`)
        },
      }),
    ],
  })
}
