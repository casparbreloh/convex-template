import { getAuthUserId } from "@convex-dev/auth/server"
import { customCtx, customMutation, customQuery } from "convex-helpers/server/customFunctions"
import {
  type Rules,
  wrapDatabaseReader,
  wrapDatabaseWriter,
} from "convex-helpers/server/rowLevelSecurity"
import { Triggers } from "convex-helpers/server/triggers"

import type { DataModel, Id } from "./_generated/dataModel"
import {
  action as baseAction,
  httpAction as baseHttpAction,
  internalAction as baseInternalAction,
  internalMutation as baseInternalMutation,
  internalQuery as baseInternalQuery,
  mutation as baseMutation,
  query as baseQuery,
  type QueryCtx,
} from "./_generated/server"

const triggers = new Triggers<DataModel>()

// Register triggers for cascading deletes:
// triggers.register("tableName", async (ctx, change) => {
//   if (change.operation === "delete") {
//     // cascade delete related records
//   }
// })

function rules(_userId: Id<"users">) {
  return {
    // Define row-level security rules per table:
    // tableName: {
    //   read: async (ctx, doc) => doc.userId === userId,
    //   modify: async (ctx, doc) => doc.userId === userId,
    //   insert: async (ctx, doc) => doc.userId === userId,
    // },
  } satisfies Rules<QueryCtx, DataModel>
}

export const query = baseQuery
export const internalQuery = baseInternalQuery

export const mutation = customMutation(baseMutation, customCtx(triggers.wrapDB))
export const internalMutation = customMutation(baseInternalMutation, customCtx(triggers.wrapDB))

export const action = baseAction
export const internalAction = baseInternalAction
export const httpAction = baseHttpAction

async function requireAuthUserId(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx)
  if (!userId) throw new Error("Not authenticated")
  return userId
}

export const authenticatedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const userId = await requireAuthUserId(ctx)
    return {
      userId,
      db: wrapDatabaseReader(ctx, ctx.db, rules(userId)),
    }
  }),
)

export const authenticatedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await requireAuthUserId(ctx)
    return {
      userId,
      db: wrapDatabaseWriter(ctx, ctx.db, rules(userId)),
    }
  }),
)
