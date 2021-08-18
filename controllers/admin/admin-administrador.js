const model = require("../../models/administradores");
const sha1 = require("sha1");

const single = async (req, res) => {
    const id = req.id;

    try {
        const administrador = await model.getSingle(id);
        
        if (administrador.length != 0) {
            res.json({
                estado: "Success",
                mensaje: administrador
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún administrador con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const modify = async (req, res) => {
    const obj = req.body;
    const id = req.id;
    let pass;

    try {
        const modificar = await model.modify(obj, id);

        if (obj.password != null) {
            pass = await model.modifyPassword(sha1(obj.password), id)
        };

        if (modificar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: modificar
            });
        } else if (pass.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: pass
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún administrador con ID: ${id}`
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
    const id = req.id;

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
                mensaje: `No se encontró ningún administrador con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: errror
        });
    };
};



module.exports = {single, modify, del};