async function createTrabjador_Front(cedula, nombre, apellido, telefono, direccion, password) {
    try {
        const response = await fetch(`http://localhost:4000/registrartrabajador`, {
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
        const response = await fetch(`http://localhost:4000/registrarcliente`, {
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
        const response = await fetch(`http://localhost:4000/adddescription`, {
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
        const response = await fetch(`http://localhost:4000/logintrabajador`, {
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
        const response = await fetch(`http://localhost:4000/logincliente`, {
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

async function Trabajadores_info() {

    try {
        const response = await fetch(`http://localhost:4000/trabajadores`)

        const data = await response.json(); // convierte la respuesta del servidor a JSON

        return data


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
    Trabajadores_info
}