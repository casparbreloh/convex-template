import selfHosting from "@convex-dev/static-hosting/convex.config.js"
import { defineApp } from "convex/server"

const app = defineApp()

app.use(selfHosting)

export default app
