import '@testing-library/jest-dom/extend-expect';
const { addReview_Front } = require('./src/functions/sqlFunctions');

test('addReview_Front envía una solicitud POST al servidor con los datos proporcionados', async () => {
  // Mockear la función fetch para simular una respuesta exitosa
  global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue({ message: 'Reseña agregada correctamente' }),
  });

  // Mockear la función alert
  global.alert = jest.fn();

  // Datos de ejemplo
  const cedula = '123456789';
  const resenia = 'Esta es una reseña';

  // Llamar a la función
  await addReview_Front(cedula, resenia);

  // Verificar que se haya llamado a fetch con los parámetros correctos
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cedula,
      resenia,
    }),
  });

  // Verificar que se haya mostrado el mensaje correcto
  expect(global.alert).toHaveBeenCalledWith('Reseña agregada correctamente');
});


test('addReview_Front muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
  // Mockear la función fetch para simular una respuesta no exitosa
  global.fetch = jest.fn().mockResolvedValue({
    status: 500,
    json: jest.fn().mockResolvedValue({}),
  });

  // Mockear la función alert
  global.alert = jest.fn();

  // Datos de ejemplo
  const cedula = '123456789';
  const resenia = 'Esta es una reseña';

  // Llamar a la función
  await addReview_Front(cedula, resenia);

  // Verificar que se haya mostrado el mensaje de error
  expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
});

test('addReview_Front maneja errores al enviar la solicitud', async () => {
  // Mockear la función fetch para simular un error al enviar la solicitud
  global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

  // Mockear la función console.error
  global.console.error = jest.fn();

  // Datos de ejemplo
  const cedula = '123456789';
  const resenia = 'Esta es una reseña';

  // Llamar a la función
  await addReview_Front(cedula, resenia);

  // Verificar que se haya mostrado el mensaje de error
  expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
});
