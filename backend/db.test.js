const { Pool } = require('pg');
const pool = require('./src/connection_db');

describe('Database Connection', () => {
  test('should create a new Pool object with the correct configuration', () => {
    const expectedOptions = {
      user: 'postgres',
      password: '0u0mJTZ44I7YAeJ70igN',
      host: 'containers-us-west-2.railway.app',
      port: 5940,
      database: 'railway',
    };

    expect(pool).toBeInstanceOf(Pool);
    expect(pool.options).toEqual(expect.objectContaining(expectedOptions));
  });

    test('should pass the error to the next middleware if an error occurs', () => {
        
      const expectedOptions = {
        user: 'postgres',
        password: '0u0mJTZ44I7YAeJ70igN',
        host: 'containers-us-west-2.railway.apphola',
        port: 5940,
        database: 'railway',
      };

        expect(pool).toBeInstanceOf(Pool);
        expect(pool.options).not.toEqual(expect.objectContaining(expectedOptions));
      });
});