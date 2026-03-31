import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { TermsFooter } from "./terms-footer";

type SignInFormProps = {
  onSubmit: (email: string) => Promise<void>;
  className?: string;
};

const signInFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export function SignInForm({ onSubmit, className }: SignInFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: signInFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value.email);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-xl font-bold">Welcome</h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email to receive a verification code
                </p>
              </div>
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="m@example.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isSubmitting}
                    />
                    {!field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )}
              </form.Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
              </Field>
            </FieldGroup>
          )}
        </form.Subscribe>
      </form>
      <TermsFooter />
    </div>
  );
}
