const pool = require('../connection_db')

const getTrabajador = async (req, res , next) => {
    const idTrabajador = req.params.id_trabajador;
    const { cedula, password } = req.body
    try {
        const idTrabajador = req.params.id_trabajador;
        let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='${cedula}' AND password='${password}';`
        const result = await pool.query(sql)
        
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"Trabajador no encontrado"
            })
        }
        
        res.json(result.rows)
    }catch (error) {
        next(error)
    }
}

const createTrabajador = async (req, res , next) => {
    const { cedula, direccion, nombre, apellido, telefono, password } = req.body
    try {
        let sql = `INSERT INTO Persona VALUES (${cedula}, '${direccion}', '${nombre}', '${apellido}',
         '${telefono}', '${password}'); 
         INSERT INTO Trabajador(cedula) VALUES (${cedula});`
        const result = await pool.query(sql)
        console.log(result)
        
        res.json({message : 'success'})
    }catch (error) {
        next(error)
    }
}

const createCliente = async (req, res , next) => {
    const { cedula, direccion, nombre, apellido, telefono, password, correo } = req.body
    try {
        let sql = `INSERT INTO Persona VALUES (${cedula}, '${direccion}', '${nombre}', '${apellido}',
         '${telefono}', '${password}'); 
         INSERT INTO  Usuario_app(id_telefono, cedula, email) VALUES ('${telefono}', ${cedula}, 
         '${correo}');`
        const result = await pool.query(sql)
        console.log(result)
        
        res.json({message : 'success'})
    }catch (error) {
        next(error)
    }
}

const loginCliente = async (req, res , next) => {
    const { telefono, password } = req.body
    try {
        let sql =`SELECT * FROM Persona NATURAL JOIN Usuario_app WHERE id_telefono='${telefono}'
         AND password='${password}';`
        
        const result = await pool.query(sql)
        console.log(result)
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"Trabajador no encontrado"
            })
        }
        
        res.json({message : 'existe'})
    }catch (error) {
        next(error)
    }
}

const loginTrabajador = async (req, res , next) => {
    const { cedula, password } = req.body
    try {
       let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE 
        t.cedula='${cedula}' AND password='${password}';`
        const result = await pool.query(sql)
        console.log(result)
        
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"Trabajador no encontrado"
            })
        }

        res.json({message : 'existe'})
    }catch (error) {
        next(error)
    }
}


const addDescription = async (req, res , next) => {
    const { descripcion, cedula } = req.body
    console.log(descripcion, cedula)
    try {
        let sql = `UPDATE trabajador SET descripcion = '${descripcion}' WHERE cedula = ${cedula};`
        const result = await pool.query(sql)
        console.log(result)
        
        res.json({message : 'success.'})
    }catch (error) {
        next(error)
    }
}

const getTrabajadores = async (req, res, next) => {
    try {
        let sql = `SELECT nombre FROM Persona NATURAL JOIN Trabajador`
        const result = await pool.query(sql)
        
        if(result.rows.length === 0){
            return res.status(404).json({
                message:"No se encontraron trabajadores"
            })
        }
        
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

  
module.exports = {
    getTrabajador,
    createTrabajador,
    createCliente, 
    addDescription,
    loginCliente,
    loginTrabajador,
    getTrabajadores
}

