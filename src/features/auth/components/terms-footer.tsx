import { FieldDescription } from "@/components/ui/field"

export function TermsFooter() {
  return (
    <FieldDescription className="px-6 text-center">
      By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
      <a href="#">Privacy Policy</a>.
    </FieldDescription>
  )
}
