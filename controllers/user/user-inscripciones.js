const model = require("../../models/inscripciones");

const all = async (req, res) => {
    const id = req.id;

    try {
        const inscripcionPorIdUsuario = await model.getByUserId(id);
      
        if (inscripcionPorIdUsuario.length === 0) {
            res.json({
                estado: "Success",
                mensaje: `No se encontraron inscripciones para el usuario con ID: ${id}`
            })
        } else {
            res.json({
                estado: "Success",
                mensaje: inscripcionPorIdUsuario
            })
        };
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const single = async (req, res) => {
    const id = req.params.id;
    const idUser = req.id;

    try {
        const inscripcion = await model.getSingleByUserId(id, idUser);
        if (inscripcion.length === 0) {
            res.json({
                estado: "Success",
                mensaje: `No se encontró inscripción con ID: ${id}`
            })
        } else {
            res.json({
                estado: "Success",
                mensaje: inscripcion
            })
        };
        
    } catch (error) {
        res.json({
            estado: "Error.",
            mensaje: error
        });
    }; 
};

const create = async (req, res) => {
    const obj = {
        id_usuario: req.body.id_usuario,
        id_clase: req.body.id_clase
    };
    
    try {
        const nueva = await model.create(obj);
        res.json({
            estado: "Success",
            mensaje: nueva});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const modify = async (req, res) => {
    const obj = {
        id_usuario: req.id,
        id_clase: req.body.id_clase
    };
    const {id} = req.params;

    try {
        const modificar = await model.modify(obj, id);

        if (modificar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: modificar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna inscripción con ID: ${id}`
            });
        };
        
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const del = async (req, res) => {
    const {id} = req.params;
    
    try {
        const borrar = await model.del(id);

        if (borrar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: borrar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ninguna inscripción con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

module.exports = {all, single, create, modify, del};