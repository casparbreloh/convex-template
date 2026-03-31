import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { z } from "zod";

import { SignIn } from "@/features/auth/sign-in";

const searchSchema = z.object({
  email: z.string().optional(),
});

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  return (
    <>
      <Authenticated>
        <Navigate to="/" />
      </Authenticated>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
    </>
  );
}
