const model = require("../models/precios");

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

module.exports = {all, single};