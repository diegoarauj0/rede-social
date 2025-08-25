import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import paths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react(), paths()],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      proxy: {
        "/api": `${String(env.PROXY_URL || "http://localhost:3000")}`,
      },
      host: true,
    },
  }
})