import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  //@ts-expect-error test: {}
  test: {
    globals: true,
    environment: 'jsdom',  // ← Эта строка критически важна!
    setupFiles: './src/test/setup.ts'  // Опционально (см. шаг 3)
  }
})
