import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }: { mode: string }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return defineConfig({
    define: {
      'process.env': process.env
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/tests': path.resolve(__dirname, './tests')
      }
    },
    plugins: [react()]
  })
}
