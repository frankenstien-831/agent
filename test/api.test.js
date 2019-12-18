import test from 'ava'
import request from 'supertest'
import server from '../dist'

test.after('cleanup', t => {
  server.close(t)
})

test('GET /: responds with success', async t => {
  const response = await request(server).get('/')
  t.is(response.status, 200)
})

test('Errors: responds with 404 on unknown path', async t => {
  const response = await request(server).post('/whatever')
  t.is(response.status, 404)
})
