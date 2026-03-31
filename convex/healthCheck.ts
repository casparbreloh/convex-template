import { authenticatedQuery } from "./functions";

export const get = authenticatedQuery({
  handler: async () => "OK",
});
