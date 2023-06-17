
const endpoint = "backend-lbkq.onrender.com"

async function createTrabjador_Front(cedula, nombre, apellido, telefono, direccion, password) {
    try {
        const response = await fetch(`http://${endpoint}/registrartrabajador`, {
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
                password
            }),
        });

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        if(response.status === 200) {
            alert(data.message);
            return data.message
        } else {
            alert("Ha ocurrido un error.");
        }

        // maneja la respuesta del servidor según sea necesario
        console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function createCliente_Front(cedula, nombre, apellido, telefono, direccion, correo, password) {
    try {
        const response = await fetch(`http://${endpoint}/registrarcliente`, {
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
                password
            }),
        });

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        if(response.status === 200) {
            alert(data.message);
            return data.message
        } else {
            alert("Ha ocurrido un error.");
        }

        // maneja la respuesta del servidor según sea necesario
        console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function addDecripcion_Front(cedula, descripcion) {
    console.log(cedula)
    try {
        const response = await fetch(`http://${endpoint}/adddescription`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cedula,
                descripcion
            }),
        });

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        if(response.status === 200) {
            alert(data.message);
        } else {
            alert("Ha ocurrido un error.");
        }

        // maneja la respuesta del servidor según sea necesario
        console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function login_trabajador(cedula, password) {
    console.log(cedula)
    try {
        const response = await fetch(`http://${endpoint}/logintrabajador`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cedula,
                password
            }),
        });

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        if(response.status === 200) {
            alert(data.message);
        } else {
            alert("Ha ocurrido un error.");
        }

        // maneja la respuesta del servidor según sea necesario
        console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function login_cliente(telefono, password) {
    console.log(telefono, password)
    try {
        const response = await fetch(`http://${endpoint}/logincliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                telefono,
                password
            }),
        });

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        if(response.status === 200) {
            alert(data.message);
            return data.message
        } else {
            alert("Ha ocurrido un error.");
        }

        // maneja la respuesta del servidor según sea necesario
        console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function trabajadores_Front() {
    try {
      const response = await fetch(`http://${endpoint}/trabajadores`);
      const data = await response.json();
  
      if (response.status === 200) {
        return data;
      } else {
        alert("Ha ocurrido un error.");
      }
  
    } catch (error) {
      console.error(error);
    }
  }

async function addReview_Front(cedula, resenia) {
    try {
        const response = await fetch(`http://${endpoint}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cedula,
                resenia
            }),
        });

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        if(response.status === 200) {
            alert(data.message);
        } else {
            alert("Ha ocurrido un error.");
        }
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function Trabajadores_info() {
    try {
        const response = await fetch(`http://${endpoint}/trabajadores`)
        const data = await response.json(); // convierte la respuesta del servidor a JSON
        return data
    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function contratar_trabajador(cedula,valor) {
    try {
        const response = await fetch(`http://${endpoint}/contratar/${cedula}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                valor
            }),
        });
        const data = await response.json(); // convierte la respuesta del servidor a JSON
        if(response.status === 200) {
            alert(data.message);
            // return data.message
        } else {
            alert("Ha ocurrido un error.");
        }
        // maneja la respuesta del servidor según sea necesario
        //console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

async function getReview_Front(cedula) {
  try {
    const response = await fetch(`http://${endpoint}/review?cedula=${cedula}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      const reviewsArray = data.review.map((review, index) => ({ name: 'Usuario', text: review }));
      console.log("XD " + reviewsArray)
      return reviewsArray;
    } else {
      throw new Error('Failed to fetch review.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching the review.');
  }
}


async function get_labor(labor) {
    try {
        const response = await fetch(`http://${endpoint}/trabajadorLabor/${labor}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json(); // convierte la respuesta del servidor a JSON
        if(response.status === 200) {
            console.log(data);
            return data;
        } else {
            alert("Ha ocurrido un error.");
        }
        // maneja la respuesta del servidor según sea necesario
        console.log(data);

    } catch (error) {
        // maneja cualquier error que se produzca al enviar la solicitud
        console.error(error);
    }
}

export {
    createTrabjador_Front,
    createCliente_Front, 
    addDecripcion_Front,
    login_cliente,
    login_trabajador,
    trabajadores_Front,
    addReview_Front,
    getReview_Front,
    Trabajadores_info,
    contratar_trabajador,
    get_labor
}
