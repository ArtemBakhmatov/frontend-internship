import { expect, test, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { api } from '../api/client'

// Мок сервера
const server = setupServer(
  http.get('http://localhost:3001/items', () => {
    return HttpResponse.json([{ id: 1, name: 'Test Item' }])
  })
)

// Запуск сервера перед тестами
beforeAll(() => server.listen())

// Сброс хендлеров после каждого теста
afterEach(() => server.resetHandlers())

// Остановка сервера после тестов
afterAll(() => server.close())

test('fetches items from API', async () => {
  const response = await api.get('/items')
  expect(response.data).toEqual([{ id: 1, name: 'Test Item' }])
})