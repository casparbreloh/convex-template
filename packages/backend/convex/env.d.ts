declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly CONVEX_CLOUD_URL: string
      readonly CONVEX_SITE_URL: string

      readonly SITE_URL: string
    }
  }
}

export {}
