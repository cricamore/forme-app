const pool = require('../connection_db')

const getTrabajador = async (req, res , next) => {
    const { cedula, password } = req.body
    try {
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

module.exports = {
    getTrabajador
}