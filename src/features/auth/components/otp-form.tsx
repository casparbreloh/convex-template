import { useForm } from "@tanstack/react-form"
import { z } from "zod"

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

import { TermsFooter } from "./terms-footer"

type OTPFormProps = {
  email: string
  onSubmit: (otp: string) => Promise<void>
  className?: string
}

const otpFormSchema = z.object({
  otp: z.string().length(6, "Please enter the 6-digit code"),
})

export function OTPForm({ email, onSubmit, className }: OTPFormProps) {
  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onSubmit: otpFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value.otp)
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          void form.handleSubmit()
        }}
      >
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl font-bold">Enter verification code</h1>
                <p className="text-muted-foreground text-sm">We sent a 6-digit code to {email}</p>
              </div>
              <form.Field name="otp">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="sr-only">
                      Verification code
                    </FieldLabel>
                    <InputOTP
                      id={field.name}
                      maxLength={6}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                      onComplete={() => void form.handleSubmit()}
                      disabled={isSubmitting}
                      containerClassName="gap-4"
                    >
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          )}
        </form.Subscribe>
      </form>
      <TermsFooter />
    </div>
  )
}
