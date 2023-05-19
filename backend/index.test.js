// const request = require('supertest');
// const app = require('./src/index');

// describe('Express App', () => {
//   let server;

//   test('should return 200 on successful server start', async () => {
//     const response = await request(app).get('/review'); // Cambia a la ruta válida existente en tu aplicación
//     expect(response.status).toBe(200);
//   });
// });

const request = require('supertest');
const app = require('./src/index');
const http = require('http');

describe('Express App', () => {
  let server;

  beforeEach((done) => {
    server = http.createServer(app);
    server.listen(4001, done);
  });

  afterEach((done) => {
    server.close(done);
  });

  test('should return 200 on successful server start', async () => {
    const response = await request(app).get('/review');
    expect(response.status).toBe(200);
  });
});

