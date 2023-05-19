import '@testing-library/jest-dom/extend-expect';
const { trabajadores_Front } = require('./src/functions/sqlFunctions');

test('trabajadores_Front envía una solicitud GET al servidor', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({message: 'Trabajadores obtenidos exitosamente'}),
    });
  
    // Mockear la función alert
    global.alert = jest.fn();
  
    // Llamar a la función
    await trabajadores_Front();
  
    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:4000/trabajadores"), {
      method: 'GET'
    };

    // Esperar a que las promesas se resuelvan
    await new Promise(resolve => setTimeout(resolve, 0));
  
    // Verificar que se haya mostrado el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Trabajadores obtenidos exitosamente');
});
  
  


test('trabajadores_Front muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
  // Mockear la función fetch para simular una respuesta no exitosa
  global.fetch = jest.fn().mockResolvedValue({
    status: 500,
    json: jest.fn().mockResolvedValue({}),
  });

  // Mockear la función alert
  global.alert = jest.fn();

  // Llamar a la función
  await trabajadores_Front();

  // Verificar que se haya mostrado el mensaje de error
  expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
});

test('trabajadores_Front maneja errores al enviar la solicitud', async () => {
  // Mockear la función fetch para simular un error al enviar la solicitud
  global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

  // Mockear la función console.error
  global.console.error = jest.fn();

  // Llamar a la función
  await trabajadores_Front();

  // Verificar que se haya mostrado el mensaje de error
  expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
});