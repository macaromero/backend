const model = require("../../models/precios");

const all = async (req, res) => {
    try {
        const precios = await model.get();
        res.json({
            estado: "Success",
            mensaje: precios});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const single = async (req, res) => {
    const id = req.params.id;

    try {
        const precio = await model.getSingle(id);

        if (precio.length != 0) {
            res.json({
                estado: "Success",
                mensaje: precio
            });
        } else {
            res.json({
                estado: "Success",
                mensaje: `No se encontró ningún precio con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const create = async (req, res) => {
    const obj = req.body;

    try {
        const nuevo = await model.create(obj);
        res.json({
            estado: "Success",
            mensaje: nuevo});
    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

const modify = async (req, res) => {
    const obj = req.body;
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
                mensaje: `No se encontró ningún precio con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
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
                mensaje: `No se encontró ningún precio con ID: ${id}`
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
                mensaje: `No se encontró ningún precio con ID: ${id}`
            });
        };

    } catch (error) {
        res.json({
            estado: "Error",
            mensaje: error
        });
    };
};

module.exports = {all, single, create, modify, enable, del};