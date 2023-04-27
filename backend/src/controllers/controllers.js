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

const updateEstrellas = async (req, res, next) => {
  const { estrellas } = req.body;
  const { id_trabajador } = req.params;

  try {
    let sql = `UPDATE Trabajador SET estrellas=((${estrellas}+estrellas)/2) 
               WHERE id_trabajador IN (SELECT id_trabajador FROM Usuario_trabajador NATURAL JOIN Trabajador);`
    const result = await pool.query(sql,[estrellas, id_trabajador]);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    updateEstrellas
    getTrabajador
}
