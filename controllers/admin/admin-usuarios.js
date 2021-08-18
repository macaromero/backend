const model = require("../../models/usuarios");

const all = async (req, res) => {
    try {
        const usuarios = await model.get();
        res.json({
            estado: "Success",
            mensaje: usuarios
        });
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    };

};

const single = async (req, res) => {
    const id = req.params.id;
    try {
        const usuario = await model.getSingle(id);
        
        if (usuario.length != 0) {
            res.json({
                estado: "Success",
                mensaje: usuario
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún usuario con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        })
    }

};

const enable = async (req, res) => {
    const {id} = req.params;

    try {
        const habilitar = await model.enable(id);
        
        if (habilitar.affectedRows != 0) {
            res.json({
                estado: "Success",
                mensaje: habilitar
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún usuario con ID: ${id}`
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
                mensaje: `No se encontró ningún usuario con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

module.exports = {all, single, enable, del};