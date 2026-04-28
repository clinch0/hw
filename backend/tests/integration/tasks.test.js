const request = require('supertest');
const app = require('../../src/server');

describe('Tasks API Integration Tests', () => {
  test('GET /api/tasks returns 200 and array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/tasks with valid title returns 201', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'New Integration Task' });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('New Integration Task');
  });

  test('POST /api/tasks with short title returns 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Ab' });
    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  test('PATCH /api/tasks/:id updates status', async () => {
    // Сначала создаём задачу
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task for update' });
    const id = createRes.body.data.id;

    const res = await request(app)
      .patch(`/api/tasks/${id}`)
      .send({ status: 'done' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('done');
  });

  test('DELETE /api/tasks/:id removes task', async () => {
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task for delete' });
    const id = createRes.body.data.id;

    const res = await request(app).delete(`/api/tasks/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(id);
  });
});