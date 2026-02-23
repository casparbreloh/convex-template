import {
  customAction,
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions"
import {
  type Rules,
  wrapDatabaseReader,
  wrapDatabaseWriter,
} from "convex-helpers/server/rowLevelSecurity"
import { Triggers } from "convex-helpers/server/triggers"

import type { DataModel } from "./_generated/dataModel"

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
import { authComponent } from "./auth"

const triggers = new Triggers<DataModel>()

// Register triggers for cascading deletes:
// triggers.register("tableName", async (ctx, change) => {
//   if (change.operation === "delete") {
//     // cascade delete related records
//   }
// })

function rules(_user: Awaited<ReturnType<typeof authComponent.getAuthUser>>) {
  return {
    // Define row-level security rules per table:
    // tableName: {
    //   read: async (ctx, doc) => doc.userId === user._id,
    //   modify: async (ctx, doc) => doc.userId === user._id,
    //   insert: async (ctx, doc) => doc.userId === user._id,
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

export const authenticatedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    return {
      user,
      db: wrapDatabaseReader(ctx, ctx.db, rules(user)),
    }
  }),
)

export const authenticatedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    return {
      user,
      db: wrapDatabaseWriter(ctx, ctx.db, rules(user)),
    }
  }),
)

export const authenticatedAction = customAction(
  action,
  customCtx(async (ctx) => {
    const user = await authComponent.getAuthUser(ctx)
    return { user }
  }),
)
