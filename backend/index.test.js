const request = require('supertest');
const app = require('./src/index');

describe('Express App', () => {
  let server;

  test('should return 200 on successful server start', async () => {
    const response = await request(app).get('/review'); // Cambia a la ruta válida existente en tu aplicación
    expect(response.status).toBe(200);
  });
});