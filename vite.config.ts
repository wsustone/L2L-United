import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Only inject build-time env vars; runtime env vars use import.meta.env
  const buildTimeVars = {
    // Empty defaults - actual values will come from import.meta.env at runtime
    'import.meta.env.SUPABASE_URL': JSON.stringify(''),
    'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(''),
  }

  return {
    plugins: [react()],
    server: {
      port: 5512,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: buildTimeVars,
    build: {
      sourcemap: true,
    },
  }
})
