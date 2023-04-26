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
    createTrabjador_Front
}