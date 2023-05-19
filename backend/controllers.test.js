const pool = require('./src/connection_db'); // Replace with the actual database pool library you're using
const { addDescription, createCliente, createReview, createTrabajador, getReview, getTrabajador, getTrabajadores, loginCliente, loginTrabajador } = require('./src/controllers/controllers');

// Mock the database pool
jest.mock('./src/connection_db', () => ({
  query: jest.fn(),
}));

test("addDescription function creates a description", async ()=>{
  const req = {
    params: jest.fn(),
    body:{
      descripcion:'holaSoyUnaDescripcion',
      cedula: '1234567'
    }
  }

  const res = {json: jest.fn()}
  const next = jest.fn()

  await addDescription(req, res, next)
  
  expect(pool.query).toHaveBeenCalledWith(`UPDATE trabajador SET descripcion = '${req.body.descripcion}' WHERE cedula = ${req.body.cedula};`)
  expect(res.json).toHaveBeenCalledWith({message: 'success.'})
  expect(next).not.toHaveBeenCalled()
})


test("addDescription function fails to create a description", async ()=>{
  const req = {
    params: jest.fn(),
    body:{
      descripcion:'holaSoyUnaDescripcion',
      cedula: '12345'
    }
  }
  const error = new Error('Error de prueba')
  const res = {json: jest.fn()}
  const next = jest.fn()

  pool.query.mockRejectedValueOnce(error);
  await addDescription(req, res, next)
  
  
  expect(pool.query).toHaveBeenCalledWith(`UPDATE trabajador SET descripcion = '${req.body.descripcion}' WHERE cedula = ${req.body.cedula};`)
  expect(res.json).not.toHaveBeenCalled()
  expect(next).toHaveBeenCalled()
})

describe('createCliente', () => {
    test('should create a new client', async () => {
      // Set up the request and response objects
      const req = {
        body: {
          cedula: '123456789',
          direccion: 'Calle 123',
          nombre: 'John',
          apellido: 'Doe',
          telefono: '555555555',
          password: 'password123',
          correo: 'john.doe@example.com',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the function
      await createCliente(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO Persona VALUES (123456789, 'Calle 123', 'John', 'Doe', '555555555', 'password123'); INSERT INTO Usuario_app(id_telefono, cedula, email) VALUES ('555555555', 123456789, 'john.doe@example.com');"
      );
      
      expect(res.json).toHaveBeenCalledWith({ message: 'success' });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      // Mock the error
      const error = new Error('Database error');
  
      // Set up the mock behavior for the database pool
      pool.query.mockRejectedValueOnce(error);
  
      // Set up the request and response objects
      const req = {
        body: {
          cedula: '123456789',
          direccion: 'Calle 123',
          nombre: 'John',
          apellido: 'Doe',
          telefono: '555555555',
          password: 'password123',
          correo: 'john.doe@example.com',
        },
      };
      const res = {};
      const next = jest.fn();
  
      // Call the function
      await createCliente(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO Persona VALUES (123456789, 'Calle 123', 'John', 'Doe', '555555555', 'password123'); INSERT INTO Usuario_app(id_telefono, cedula, email) VALUES ('555555555', 123456789, 'john.doe@example.com');"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createReview', () => {
    test('should return success message after updating review', async () => {
      const queryResult = {
        rows: [],
      };
  
      pool.query.mockResolvedValueOnce(queryResult);
  
      const req = {
        body: {
          resenia: 'Great worker',
          cedula: '123456789',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await createReview(req, res, next);
  
      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE trabajador SET resenia = CONCAT(resenia, '|Great worker') WHERE cedula = 123456789;"
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'success.' });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      const error = new Error('Database error');
  
      pool.query.mockRejectedValueOnce(error);
  
      const req = {
        body: {
          resenia: 'Great worker',
          cedula: '123456789',
        },
      };
      const res = {};
      const next = jest.fn();
  
      await createReview(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE trabajador SET resenia = CONCAT(resenia, '|Great worker') WHERE cedula = 123456789;"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createTrabajador', () => {
    test('should create a new worker', async () => {
      // Set up the request and response objects
      const req = {
        body: {
          cedula: '123456789',
          direccion: '123 Street',
          nombre: 'John',
          apellido: 'Doe',
          telefono: '1234567890',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the function
      await createTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO Persona VALUES (123456789, '123 Street', 'John', 'Doe', '1234567890', 'password123'); INSERT INTO Trabajador(cedula) VALUES (123456789);"
      );
      
      
      expect(res.json).toHaveBeenCalledWith({ message: 'success' });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      // Mock the error
      const error = new Error('Database error');
  
      // Set up the mock behavior for the database pool
      pool.query.mockRejectedValueOnce(error);
  
      // Set up the request and response objects
      const req = {
        body: {
          cedula: '123456789',
          direccion: '123 Street',
          nombre: 'John',
          apellido: 'Doe',
          telefono: '1234567890',
          password: 'password123',
        },
      };
      const res = {};
      const next = jest.fn();
  
      // Call the function
      await createTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO Persona VALUES (123456789, '123 Street', 'John', 'Doe', '1234567890', 'password123'); INSERT INTO Trabajador(cedula) VALUES (123456789);"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });  

  describe('getReview', () => {
    test('should return reviews for a given cedula if found', async () => {
      // Mock the query result
      const queryResult = {
        rows: [{ resenia: 'Review 1|Review 2|Review 3' }],
      };
  
      // Set up the mock behavior for the database pool
      pool.query.mockResolvedValueOnce(queryResult);
  
      // Set up the request and response objects
      const req = {
        query: {
          cedula: '123456789',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the function
      await getReview(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT resenia FROM trabajador WHERE cedula = 123456789;'
      );
      expect(res.json).toHaveBeenCalledWith({ review: ['Review 1', 'Review 2', 'Review 3'] });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should return null if no reviews are found for the given cedula', async () => {
      // Mock the query result
      const queryResult = {
        rows: [],
      };
  
      // Set up the mock behavior for the database pool
      pool.query.mockResolvedValueOnce(queryResult);
  
      // Set up the request and response objects
      const req = {
        query: {
          cedula: '123456789',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the function
      await getReview(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT resenia FROM trabajador WHERE cedula = 123456789;'
      );
      expect(res.json).toHaveBeenCalledWith({ review: null });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      // Mock the error
      const error = new Error('Database error');
  
      // Set up the mock behavior for the database pool
      pool.query.mockRejectedValueOnce(error);
  
      // Set up the request and response objects
      const req = {
        query: {
          cedula: '123456789',
        },
      };
      const res = {};
      const next = jest.fn();
  
      // Call the function
      await getReview(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT resenia FROM trabajador WHERE cedula = 123456789;'
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getTrabajador', () => {
    test('should return a worker if found', async () => {
      // Mock the query result
      const queryResult = {
        rows: [{ id: 1, nombre: 'Worker 1' }],
      };
  
      // Set up the mock behavior for the database pool
      pool.query.mockResolvedValueOnce(queryResult);
  
      // Set up the request and response objects
      const req = {
        params: {
          id_trabajador: 1,
        },
        body: {
          cedula: '123456789',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();
  
      // Call the function
      await getTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='123456789' AND password='password123';"
      );
      expect(res.json).toHaveBeenCalledWith(queryResult.rows);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should return an error response if worker is not found', async () => {
      // Mock the query result
      const queryResult = {
        rows: [],
      };
  
      // Set up the mock behavior for the database pool
      pool.query.mockResolvedValueOnce(queryResult);
  
      // Set up the request and response objects
      const req = {
        params: {
          id_trabajador: 1,
        },
        body: {
          cedula: '123456789',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();
  
      // Call the function
      await getTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='123456789' AND password='password123';"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Trabajador no encontrado',
      });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      // Mock the error
      const error = new Error('Database error');
  
      // Set up the mock behavior for the database pool
      pool.query.mockRejectedValueOnce(error);
  
      // Set up the request and response objects
      const req = {
        params: {
          id_trabajador: 1,
        },
        body: {
          cedula: '123456789',
          password: 'password123',
        },
      };
      const res = {};
      const next = jest.fn();
  
      // Call the function
      await getTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='123456789' AND password='password123';"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getTrabajadores', () => {
    test('should return a list of workers', async () => {
      // Mock the query result
      const queryResult = {
        rows: [
          { nombre: 'Worker 1' },
          { nombre: 'Worker 2' },
          { nombre: 'Worker 3' },
        ],
      };
  
      // Set up the mock behavior for the database pool
      pool.query.mockResolvedValueOnce(queryResult);
  
      // Set up the request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();
  
      // Call the function
      await getTrabajadores(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT nombre FROM Persona NATURAL JOIN Trabajador'
      );
      expect(res.json).toHaveBeenCalledWith(queryResult.rows);
      expect(res.status).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should return an error response if no workers are found', async () => {
      // Mock the query result
      const queryResult = {
        rows: [],
      };
  
      // Set up the mock behavior for the database pool
      pool.query.mockResolvedValueOnce(queryResult);
  
      // Set up the request and response objects
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();
  
      // Call the function
      await getTrabajadores(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT nombre FROM Persona NATURAL JOIN Trabajador'
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'No se encontraron trabajadores',
      });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      // Mock the error
      const error = new Error('Database error');
  
      // Set up the mock behavior for the database pool
      pool.query.mockRejectedValueOnce(error);
  
      // Set up the request and response objects
      const req = {};
      const res = {};
      const next = jest.fn();
  
      // Call the function
      await getTrabajadores(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT nombre FROM Persona NATURAL JOIN Trabajador'
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('loginCliente', () => {
    test('should return "existe" if the client is found', async () => {
      const queryResult = {
        rows: [{ id: 1, nombre: 'Cliente 1' }],
      };
  
      pool.query.mockResolvedValueOnce(queryResult);
  
      const req = {
        body: {
          telefono: '1234567890',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await loginCliente(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Usuario_app WHERE id_telefono='1234567890' AND password='password123';"
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'existe' });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should return an error response if the client is not found', async () => {
      const queryResult = {
        rows: [],
      };
  
      pool.query.mockResolvedValueOnce(queryResult);
  
      const req = {
        body: {
          telefono: '1234567890',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
  
      await loginCliente(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Usuario_app WHERE id_telefono='1234567890' AND password='password123';"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Trabajador no encontrado' });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
      const error = new Error('Database error');
  
      pool.query.mockRejectedValueOnce(error);
  
      const req = {
        body: {
          telefono: '1234567890',
          password: 'password123',
        },
      };
      const res = {};
      const next = jest.fn();
  
      await loginCliente(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Usuario_app WHERE id_telefono='1234567890' AND password='password123';"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });  

  describe('loginTrabajador', () => {
    test('should return success message if worker is found', async () => {
      const queryResult = {
        rows: [{ id: 1, nombre: 'Worker 1' }],
      };
  
      pool.query.mockResolvedValueOnce(queryResult);
  
      const req = {
        body: {
          cedula: '123456789',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      await loginTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='123456789' AND password='password123';"
      );
      expect(res.json).toHaveBeenCalledWith({ message: 'existe' });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should return an error response if worker is not found', async () => {
      const queryResult = {
        rows: [],
      };
  
      pool.query.mockResolvedValueOnce(queryResult);
  
      const req = {
        body: {
          cedula: '123456789',
          password: 'password123',
        },
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };
      const next = jest.fn();
  
      await loginTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='123456789' AND password='password123';"
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Trabajador no encontrado',
      });
      expect(next).not.toHaveBeenCalled();
    });
  
    test('should pass the error to the next middleware if an error occurs', async () => {
  
      const error = new Error('Database error');
  
      pool.query.mockRejectedValueOnce(error);
  
      const req = {
        body: {
          cedula: '123456789',
          password: 'password123',
        },
      };
      const res = {};
      const next = jest.fn();
  
      await loginTrabajador(req, res, next);
  
      // Assertions
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='123456789' AND password='password123';"
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });