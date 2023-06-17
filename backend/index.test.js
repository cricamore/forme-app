
const request = require('supertest');
const app = require('./src/index');
const http = require('http');
const pool = require('./src/connection_db')

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



describe('Prueba de integración para la creación de tareas', () => {
  afterEach(async () => {
    await pool.query(`DELETE FROM Usuario_app WHERE cedula = 1005631291;
                      DELETE FROM Persona WHERE cedula = 1005631291;`);
  });

  afterAll(() => {
    pool.end();
  });

  it('debería crear una nueva tarea en el backend', async () => {
    newClient = {
      "cedula": 1005631291,
      "direccion": "cra82#24-09",
      "nombre": "Andres",
      "apellido":"Ocampo",
      "telefono":"3057479398",
      "password":"andres123",
      "correo":"andres123@gmail.com"
    }

    const response = await request(app)
      .post('/registrarcliente')
      .send(newClient);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({"message":'success'});
    expect(response.body.message).toBeTruthy(); // Verificar que se haya asignado un ID a la tarea
  });
});
