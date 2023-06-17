const assert = require("assert").strict;
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');

require("chromedriver");

const serverUri = "https://forme-app.vercel.app/";
const appTitle = "Forme Home";

const options = new chrome.Options();
options.addArguments('--remote-debugging-port=9222')
options.addArguments('--disable-gpu')
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--headless');
options.setChromeBinaryPath("/usr/bin/google-chrome");


const browser = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .usingServer()
  .build();

function logTitle() {
  return new Promise((resolve, reject) => {
    browser.getTitle().then(function (title) {
      resolve(title);
    });
  });
}

describe("Home Page", function () {
  /**
   * Caso de prueba para la app y obtener título
   */
  it("Cargar la Home Page y obtener el título", function () {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri)
        .then(() => browser.wait(until.titleIs(appTitle), 10000))
        .then(logTitle)
        .then((title) => {
          assert.strictEqual(title, appTitle);
          resolve();
        })
        .catch((err) => reject(err));
    });
  }, 15000);

  /**
   * Test case to check whether the given element is loaded.
   */
  it("Verificar si el botón se carga correctamente", function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: "sel-button" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  }, 15000);

  it('Login page con usuario incorrecto', async () => {
    // // Realizar acciones y verificaciones utilizando Selenium WebDriver
    const usertypeInput = await browser.findElement(By.id('demo-simple-select'));
    await usertypeInput.click();

    const clienteInput = await browser.findElement(By.id('cliente'));
    await clienteInput.click();

    const userInput = await browser.findElement(By.id('email'));
    await userInput.sendKeys('mi_usuario');

    const passwordInput = await browser.findElement(By.id('password'));
    await passwordInput.sendKeys('mi_contraseña');

    const submitButton = await browser.findElement(By.xpath("//button[@type='submit']"));
    await submitButton.click();

    //Logueo incorrecto
    expect(await browser.getCurrentUrl()).toBe('https://forme-app.vercel.app/');
  }, 15000);


});



/**
 * Prueba para la página de Registro
 */
describe("Registro", function () {
  browser.manage().setTimeouts({ implicit: 30000 });
  it("Cargar la página de registro", function () {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri + "/Registro")
        .then(() => browser.wait(until.titleIs("Registro"), 20000))
        // .manage().setTimeouts({ implicit: 10000 })
        .then(logTitle)
        .then((title) => {
          assert.strictEqual(title, "Registro");
          resolve();
        })
        .catch((err) => reject(err));
    });
  });


  /**
   * Test case to check whether the given element is loaded.
   */
  it("Verificar si el botón se carga correctamente", function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: "registrarme" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  }, 10000);

  it('Pagina de registro con usuario fallido', async () => {
    // browser.manage().setTimeouts({ implicit: 10000 });
    // Realizar acciones y verificaciones utilizando Selenium WebDriver
    const usertypeInput = await browser.findElement(By.id('demo-simple-select'));
    await usertypeInput.click();

    const clienteInput = await browser.findElement(By.id('cliente'));
    await clienteInput.click();

    const cedulaInput = await browser.findElement(By.id('cedula'));
    await cedulaInput.sendKeys('100753232');

    const nombreInput = await browser.findElement(By.id('nombre'));
    await nombreInput.sendKeys('Cristian');

    const apellidoInput = await browser.findElement(By.id('apellido'));
    await apellidoInput.sendKeys('Renteria pero más Trujillo');

    const telefonoInput = await browser.findElement(By.id('telefono'));
    await telefonoInput.sendKeys('3134145898');

    const direccionInput = await browser.findElement(By.id('direccion'));
    await direccionInput.sendKeys('Carrera_12');

    const correoInput = await browser.findElement(By.id('correo'));
    await correoInput.sendKeys('micorreo@gmail.com');

    const passwordInput = await browser.findElement(By.id('contraseña'));
    await passwordInput.sendKeys('cristian123');

    const terminosInput = await browser.findElement(By.id('terminos'));
    await terminosInput.click();

    const aceptoInput = await browser.findElement(By.id('acepto'));
    await aceptoInput.click();

    const submitButton = await browser.findElement(By.xpath("//button[@type='submit']"));
    await submitButton.click();

  //  Registro fallido
  expect(await browser.getCurrentUrl()).toBe('https://forme-app.vercel.app/Registro');
}, 15000);


});


/**
 * Prueba para la página de Review
 */
describe("Review", function () {
  browser.manage().setTimeouts({ implicit: 30000 });
  reviewTitle = "Review";
  /**
   * Test case to load our application and check the title.
   */
  it("Cargar la página y obtener el título", function () {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri + "/Review")
        .then(() => browser.wait(until.titleIs(reviewTitle), 20000))
        .then(logTitle)
        .then((title) => {
          assert.strictEqual(title, reviewTitle);
          resolve();
        })
        .catch((err) => reject(err));
    });


  });

  /**
   * Test case to check whether the given element is loaded.
   */
  it("Verificar si el botón se carga correctamente", function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: "sel-button" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  });

  it('Review page', async () => {
    // Agregar una reseña
    const addreview = await browser.findElement(By.id('sel-button'));
    await addreview.click();

    const reseniaInput = await browser.findElement(By.id('sel-rese'));
    await reseniaInput.sendKeys('Esta es una reseña');

    const enviarreseniaInput = await browser.findElement(By.id('enviar-reseña'));
    await enviarreseniaInput.click();

    const submitButton = await browser.findElement(By.xpath("//button[contains(text(), 'Enviar reseña')]"));
    await submitButton.click();

  }, 20000);

});


describe("Client", function () {
  browser.manage().setTimeouts({ implicit: 30000 });
  /**
   * Test case to load our application and check the title.
   */
  it("Cargar la página y obtener el título", function () {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri + "/client")
        .then(() => browser.wait(until.titleIs('Forme Lobby'), 20000))
        // .manage().setTimeouts({ implicit: 10000 })
        .then(logTitle)
        .then((title) => {
          assert.strictEqual(title, 'Forme Lobby');
          resolve();
        })
        .catch((err) => reject(err));
    });
  });

  /**
   * Test case to check whether the given element is loaded.
   */
  it("Verificar si el botón se carga correctamente", function () {
    return new Promise((resolve, reject) => {
      browser
        .findElement({ id: "menu" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  });
}, 20000);

afterAll(function () {
  // End of test use this.
  browser.quit();
});

// async function testCreateTrabajador_Front() {
//   // Configurar el navegador Selenium
//   const options = new chrome.Options();
//   // Opcionalmente, puedes configurar opciones adicionales para el navegador

//   const driver = await new Builder()
//     .forBrowser('chrome')
//     .setChromeOptions(options)
//     .build();

//   try {
//     // Navegar a la página de registro
//     await driver.get('http://forme-app-production.up.railway.app/registro');

//     // Rellenar los campos del formulario
//     await driver.findElement(By.id('cedula')).sendKeys('cedula');
//     await driver.findElement(By.id('nombre')).sendKeys('nombre');
//     await driver.findElement(By.id('apellido')).sendKeys('apellido');
//     await driver.findElement(By.id('telefono')).sendKeys('telefono');
//     await driver.findElement(By.id('direccion')).sendKeys('direccion');
//     await driver.findElement(By.id('password')).sendKeys('password');

//     // Enviar el formulario
//     await driver.findElement(By.id('submit-btn')).click();

//     // Esperar a que aparezca el mensaje de éxito
//     await driver.wait(
//       async () => {
//         const alert = await driver.findElement(By.id('success-alert'));
//         return await alert.isDisplayed();
//       },
//       5000,
//       'El mensaje de éxito no apareció.'
//     );

//     console.log('Prueba exitosa: Trabajador registrado correctamente');
//   } catch (error) {
//     console.error('Error durante la prueba:', error);
//   } finally {
//     // Cerrar el navegador
//     await driver.quit();
//   }
// }

// testCreateTrabajador_Front();
