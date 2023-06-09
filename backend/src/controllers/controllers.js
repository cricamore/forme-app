const pool = require('../connection_db')

const getTrabajador = async (req, res , next) => {
    const { cedula, password } = req.body
    try {
        let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='${cedula}' AND password='${password}';`
        const result = await pool.query(sql)

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Trabajador no encontrado"
            })
        }

        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const createTrabajador = async (req, res , next) => {
    const { cedula, direccion, nombre, apellido, telefono, password } = req.body
    try {
        let sql = `INSERT INTO Persona VALUES (${cedula}, '${direccion}', '${nombre}', '${apellido}', '${telefono}', '${password}'); INSERT INTO Trabajador(cedula) VALUES (${cedula});`
        const result = await pool.query(sql)
        console.log(result)

        res.json({ message: 'success' })
    } catch (error) {
        next(error)
    }
}

const createCliente = async (req, res, next) => {
    const { cedula, direccion, nombre, apellido, telefono, password, correo } = req.body
    try {
        let sql = `INSERT INTO Persona VALUES (${cedula}, '${direccion}', '${nombre}', '${apellido}', '${telefono}', '${password}'); INSERT INTO Usuario_app(id_telefono, cedula, email) VALUES ('${telefono}', ${cedula}, '${correo}');`
        const result = await pool.query(sql)
        console.log(result)

        res.json({ message: 'success' })
    } catch (error) {
        next(error)
    }
}

const loginCliente = async (req, res, next) => {
    const { telefono, password } = req.body
    try {
        let sql =`SELECT * FROM Persona NATURAL JOIN Usuario_app WHERE id_telefono='${telefono}' AND password='${password}';`
        
        const result = await pool.query(sql)
        console.log(result)
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Trabajador no encontrado"
            })
        }

        res.json({ message: 'existe' })
    } catch (error) {
        next(error)
    }
}

const loginTrabajador = async (req, res, next) => {
    const { cedula, password } = req.body
    try {
       let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='${cedula}' AND password='${password}';`
        const result = await pool.query(sql)
        console.log(result)

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Trabajador no encontrado"
            })
        }

        res.json({ message: 'existe' })
    } catch (error) {
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

        res.json({ message: 'success.' })
    } catch (error) {
        next(error)
    }
}

const getTrabajadorFullInfo = async (req, res, next) => {

    try {
        let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador`
        const result = await pool.query(sql)
        console.log(result)

        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const getTrabajadorInfo = async (req, res, next) => {
    try {
        const { cedula } = req.params
        let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador AS t WHERE t.cedula='${cedula}'`
        const result = await pool.query(sql)

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Trabajador no encontrado"
            })
        }

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}

const OcuparTrabajador = async (req, res, next) => {
    try {
        const { valor } = req.body;
        const { cedula } = req.params;

        const sql = 'UPDATE trabajador SET ocupado = $1 WHERE cedula = $2 RETURNING *';
        const result = await pool.query(sql, [valor, cedula]);
        // console.log(result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "not found"
            })
        }

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getLabor = async (req, res, next) => {
    try {
        const { labor } = req.params
        let sql = `SELECT * FROM Persona NATURAL JOIN Trabajador NATURAL JOIN Labor WHERE nombreLabor = '${labor}'`
        const result = await pool.query(sql)

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "labor no encontrado"
            })
        }

        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

const getReview = async (req, res, next) => {
    const { cedula } = req.query;
    try {
      let sql = `SELECT resenia FROM trabajador WHERE cedula = ${cedula};`;
      const result = await pool.query(sql);
      console.log(result);
  
      if (result.rows.length === 0) {
        res.json({ review: null }); // No se encontró una reseña para la cédula dada
      } else {
        const reseniasConcatenadas = result.rows[0].resenia;
        const resenias = reseniasConcatenadas.split('|');
  
        res.json({ review: resenias }); // Se encontró una reseña para la cédula dada
      }
    } catch (error) {
      next(error);
    }
  };
  

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

const createReview = async (req, res , next) => {
    const { resenia, cedula } = req.body
    console.log(resenia, cedula)
    try {
        let sql = `UPDATE trabajador SET resenia = CONCAT(resenia, '|${resenia}') WHERE cedula = ${cedula};`
        const result = await pool.query(sql)
        console.log(result)
        
        res.json({message : 'success.'})
    }catch (error) {
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
    getReview,
    getTrabajadores,
    createReview,
    getTrabajadorFullInfo,
    getTrabajadorInfo,
    OcuparTrabajador,
    getLabor
}

