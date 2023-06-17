import '@testing-library/jest-dom/extend-expect';
const { addReview_Front, getReview_Front, createTrabjador_Front,createCliente_Front,addDecripcion_Front,login_trabajador, login_cliente, trabajadores_Front, Trabajadores_info, get_labor,contratar_trabajador } = require('./src/functions/sqlFunctions');

const endpoint = "https://backend-lbkq.onrender.com"

describe('addReview_Front', () => {
  test('envía una solicitud POST al servidor con los datos proporcionados', async () => {
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
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/review', {
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

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
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

  test('maneja errores al enviar la solicitud', async () => {
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
});




//getReview


describe('getReview_Front', () => {
  test('envía una solicitud GET al servidor con los datos proporcionados', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ review: ['hola', 'reseña', 'no'] }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';

    // Llamar a la función
    const funcion = await getReview_Front(cedula);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith(`https://backend-lbkq.onrender.com/review?cedula=${cedula}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verificar que se haya mostrado el mensaje correcto
    expect(funcion).toEqual([
      { name: 'Usuario', text: 'hola' },
      { name: 'Usuario', text: 'reseña' },
      { name: 'Usuario', text: 'no' },
    ]);
  });

  test('maneja errores al enviar la solicitud con respuesta no exitosa', async () => {
    // Mockear la función fetch para simular una respuesta no exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({ review: ['hola', 'reseña', 'no'] }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';

    try {
      // Llamar a la función
      await getReview_Front(cedula);
    } catch (error) {
      // Verificar que se haya mostrado el mensaje correcto
      expect(error.message).toBe('An error occurred while fetching the review.');
    }
  });

  test('maneja errores al enviar la solicitud con error de red', async () => {
    // Mockear la función fetch para simular un error al enviar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';

    try {
      // Llamar a la función
      await getReview_Front(cedula);
    } catch (error) {
      // Verificar que se haya mostrado el mensaje de error
      expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
    }
  });
});




//createTrabajador

describe('createTrabajador_Front', () => {
  test('envía una solicitud POST al servidor con los datos proporcionados', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Trabajador registrado correctamente' }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    const cedula = '123456789';
    const nombre = 'John';
    const apellido = 'Doe';
    const telefono = '1234567890';
    const direccion = 'Calle 123';
    const password = 'password123';

    await createTrabjador_Front(cedula, nombre, apellido, telefono, direccion, password);

    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/registrartrabajador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cedula,
        nombre,
        apellido,
        telefono,
        direccion,
        password,
      }),
    });

    expect(global.alert).toHaveBeenCalledWith('Trabajador registrado correctamente');
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    global.alert = jest.fn();

    const cedula = '123456789';
    const nombre = 'John';
    const apellido = 'Doe';
    const telefono = '1234567890';
    const direccion = 'Calle 123';
    const password = 'password123';

    await createTrabjador_Front(cedula, nombre, apellido, telefono, direccion, password);

    expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
  });

  test('maneja errores al enviar la solicitud', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    const cedula = '123456789';
    const nombre = 'John';
    const apellido = 'Doe';
    const telefono = '1234567890';
    const direccion = 'Calle 123';
    const password = 'password123';

    // Llamar a la función
    await createTrabjador_Front(cedula, nombre, apellido, telefono, direccion, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});




//CreateCliente_Front


describe('createCliente_Front', () => {
  test('envía una solicitud POST al servidor con los datos proporcionados', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Cliente registrado correctamente' }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const nombre = 'John';
    const apellido = 'Doe';
    const telefono = '1234567890';
    const direccion = 'Calle 123';
    const correo = 'john.doe@example.com';
    const password = 'password123';

    // Llamar a la función
    await createCliente_Front(cedula, nombre, apellido, telefono, direccion, correo, password);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/registrarcliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cedula,
        nombre,
        apellido,
        telefono,
        direccion,
        correo,
        password,
      }),
    });

    // Verificar que se haya mostrado el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Cliente registrado correctamente');
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
    // Mockear la función fetch para simular una respuesta no exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const nombre = 'John';
    const apellido = 'Doe';
    const telefono = '1234567890';
    const direccion = 'Calle 123';
    const correo = 'john.doe@example.com';
    const password = 'password123';

    // Llamar a la función
    await createCliente_Front(cedula, nombre, apellido, telefono, direccion, correo, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
  });

  test('maneja errores al enviar la solicitud', async () => {
    // Mockear la función fetch para simular un error al enviar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const nombre = 'John';
    const apellido = 'Doe';
    const telefono = '1234567890';
    const direccion = 'Calle 123';
    const correo = 'john.doe@example.com';
    const password = 'password123';

    // Llamar a la función
    await createCliente_Front(cedula, nombre, apellido, telefono, direccion, correo, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});





describe('addDecripcion_Front', () => {
  test('envía una solicitud POST al servidor con los datos proporcionados', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Descripción agregada correctamente' }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const descripcion = 'Esta es una descripción';

    // Llamar a la función
    await addDecripcion_Front(cedula, descripcion);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/adddescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cedula,
        descripcion,
      }),
    });

    // Verificar que se haya mostrado el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Descripción agregada correctamente');
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
    // Mockear la función fetch para simular una respuesta no exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const descripcion = 'Esta es una descripción';

    // Llamar a la función
    await addDecripcion_Front(cedula, descripcion);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
  });

  test('maneja errores al enviar la solicitud', async () => {
    // Mockear la función fetch para simular un error al enviar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const descripcion = 'Esta es una descripción';

    // Llamar a la función
    await addDecripcion_Front(cedula, descripcion);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});





describe('login_trabajador', () => {
  test('envía una solicitud POST al servidor con los datos proporcionados', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Inicio de sesión exitoso' }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const password = 'secreto';

    // Llamar a la función
    await login_trabajador(cedula, password);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/logintrabajador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cedula,
        password,
      }),
    });

    // Verificar que se haya mostrado el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Inicio de sesión exitoso');
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
    // Mockear la función fetch para simular una respuesta no exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const password = 'secreto';

    // Llamar a la función
    await login_trabajador(cedula, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
  });

  test('maneja errores al enviar la solicitud', async () => {
    // Mockear la función fetch para simular un error al enviar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const password = 'secreto';

    // Llamar a la función
    await login_trabajador(cedula, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});




describe('login_cliente', () => {
  test('envía una solicitud POST al servidor con los datos proporcionados', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Inicio de sesión exitoso' }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const telefono = '123456789';
    const password = 'secreto';

    // Llamar a la función
    await login_cliente(telefono, password);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/logincliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        telefono,
        password,
      }),
    });

    // Verificar que se haya mostrado el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Inicio de sesión exitoso');
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
    // Mockear la función fetch para simular una respuesta no exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const telefono = '123456789';
    const password = 'secreto';

    // Llamar a la función
    await login_cliente(telefono, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
  });

  test('maneja errores al enviar la solicitud', async () => {
    // Mockear la función fetch para simular un error al enviar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const telefono = '123456789';
    const password = 'secreto';

    // Llamar a la función
    await login_cliente(telefono, password);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});




/*Trabajadores Front*/

describe('trabajadores_Front', () => {
  test('realiza una solicitud GET al servidor y devuelve los datos si la respuesta es exitosa', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue([
        { id: 1, nombre: 'John', apellido: 'Doe' },
        { id: 2, nombre: 'Jane', apellido: 'Smith' },
      ]),
    });

    // Llamar a la función
    const result = await trabajadores_Front();

    // Verificar que se haya llamado a fetch con el URL correcto
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/trabajadores');

    // Verificar que se haya devuelto los datos correctos
    expect(result).toEqual([
      { id: 1, nombre: 'John', apellido: 'Doe' },
      { id: 2, nombre: 'Jane', apellido: 'Smith' },
    ]);
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
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

  test('maneja errores al realizar la solicitud', async () => {
    // Mockear la función fetch para simular un error al realizar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Llamar a la función
    await trabajadores_Front();

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});




//Trabajadores_info


describe('Trabajadores_info', () => {
  test('realiza una solicitud GET al servidor y devuelve los datos si la respuesta es exitosa', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue([
        { id: 1, nombre: 'John', apellido: 'Doe' },
        { id: 2, nombre: 'Jane', apellido: 'Smith' },
      ]),
    });

    // Llamar a la función
    const result = await Trabajadores_info();

    // Verificar que se haya llamado a fetch con el URL correcto
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/trabajadores');

    // Verificar que se haya devuelto los datos correctos
    expect(result).toEqual([
      { id: 1, nombre: 'John', apellido: 'Doe' },
      { id: 2, nombre: 'Jane', apellido: 'Smith' },
    ]);
  });

  test('maneja errores al realizar la solicitud', async () => {
    // Mockear la función fetch para simular un error al realizar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Llamar a la función
    await Trabajadores_info();

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});



//get_labor



describe('get_labor', () => {
  test('realiza una solicitud POST al servidor con el parámetro labor y devuelve los datos si la respuesta es exitosa', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue([
        { id: 1, nombre: 'John', apellido: 'Doe' },
        { id: 2, nombre: 'Jane', apellido: 'Smith' },
      ]),
    });

    // Mockear la función console.log
    global.console.log = jest.fn();

    // Datos de ejemplo
    const labor = 'Electricista';

    // Llamar a la función
    const result = await get_labor(labor);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/trabajadorLabor/Electricista', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Verificar que se haya devuelto los datos correctos
    expect(result).toEqual([
      { id: 1, nombre: 'John', apellido: 'Doe' },
      { id: 2, nombre: 'Jane', apellido: 'Smith' },
    ]);

    // Verificar que se haya mostrado los datos en la consola
    expect(global.console.log).toHaveBeenCalledWith([
      { id: 1, nombre: 'John', apellido: 'Doe' },
      { id: 2, nombre: 'Jane', apellido: 'Smith' },
    ]);
  });

  test('maneja errores al realizar la solicitud', async () => {
    // Mockear la función fetch para simular un error al realizar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const labor = 'Electricista';

    // Llamar a la función
    await get_labor(labor);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});



//contratar_trabajador


describe('contratar_trabajador', () => {
  test('realiza una solicitud POST al servidor con los parámetros cedula y valor y muestra el mensaje si la respuesta es exitosa', async () => {
    // Mockear la función fetch para simular una respuesta exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ message: 'Trabajador contratado exitosamente' }),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const valor = 100;

    // Llamar a la función
    await contratar_trabajador(cedula, valor);

    // Verificar que se haya llamado a fetch con los parámetros correctos
    expect(global.fetch).toHaveBeenCalledWith('https://backend-lbkq.onrender.com/contratar/123456789', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valor,
      }),
    });

    // Verificar que se haya mostrado el mensaje correcto
    expect(global.alert).toHaveBeenCalledWith('Trabajador contratado exitosamente');
  });

  test('muestra un mensaje de error en caso de una respuesta no exitosa', async () => {
    // Mockear la función fetch para simular una respuesta no exitosa
    global.fetch = jest.fn().mockResolvedValue({
      status: 500,
      json: jest.fn().mockResolvedValue({}),
    });

    // Mockear la función alert
    global.alert = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const valor = 100;

    // Llamar a la función
    await contratar_trabajador(cedula, valor);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.alert).toHaveBeenCalledWith('Ha ocurrido un error.');
  });

  test('maneja errores al enviar la solicitud', async () => {
    // Mockear la función fetch para simular un error al enviar la solicitud
    global.fetch = jest.fn().mockRejectedValue(new Error('Error de red'));

    // Mockear la función console.error
    global.console.error = jest.fn();

    // Datos de ejemplo
    const cedula = '123456789';
    const valor = 100;

    // Llamar a la función
    await contratar_trabajador(cedula, valor);

    // Verificar que se haya mostrado el mensaje de error
    expect(global.console.error).toHaveBeenCalledWith(new Error('Error de red'));
  });
});









