const { Pool } = require('pg');
const pool = require('./src/connection_db');

describe('Database Connection', () => {
  test('should create a new Pool object with the correct configuration', () => {
    const expectedOptions = {
      user: 'pgadmin',
      password: 'pg123',
      host: 'localhost',
      port: 5432,
      database: 'mande_db',
    };

    expect(pool).toBeInstanceOf(Pool);
    expect(pool.options).toEqual(expect.objectContaining(expectedOptions));
  });

    test('should pass the error to the next middleware if an error occurs', () => {
        
        const expectedOptions = {
          user: 'pgadmin',
          password: 'pg1234',
          host: 'localhost',
          port: 5432,
          database: 'mande_db',
        };

        expect(pool).toBeInstanceOf(Pool);
        expect(pool.options).not.toEqual(expect.objectContaining(expectedOptions));
      });
});